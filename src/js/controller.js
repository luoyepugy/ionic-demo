angular.module('myApp.controllers', [])

// 左侧菜单
.controller('sideMenuCtrl', ['$scope', function($scope) {
    $scope.items = [];
    for(var i = 0; i < 5; i++) {
        $scope.items.push({
            text: 'text' + (i + 1)
        });
    }
}])

// 首页
.controller('homeCtrl', function($scope, $ionicPopup, $timeout, $http, $ionicLoading) {
    $scope.items = [];
    // 预加载
    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
        duration: 3000
    });
    $http.get('indexItems.json')
        .success(function(data) {
            $scope.items = data.datas;
    })
    .error(function(data){
      $ionicPopup.alert({
        title: '加载错误!',
        template: '',
        okText: "确定",
        okType: "button-calm"
      });
    })
    .finally(function() {
        $ionicLoading.hide();
    });

    // 下拉刷新
    $scope.doRefresh = function() {
        // 从指定路径获取数据
        $timeout( function() {  
            $http.get('newItems.json')
                .success(function(data) {
                    $scope.items = data.datas;
            })
            .error(function(data){
                console.log('error');
            });
        }, 1000);   
    };

    // 加载更多
    $scope.loadMore = function() {
        // 从指定路径获取数据
        $http.get('moreItems.json').success(function(data) {
            for(var i = 0; i < data.datas.length; i++) {
                $scope.items.push(data.datas[i]);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    // 编辑
    var flag = true;
    $scope.editText = '编辑';
    $scope.showEditBtn = function() {
        if(!flag) {
            $scope.shouldShowDelete = false;
            $scope.shouldShowReorder = false;   
            $scope.editText = '编辑';
            flag = true;
        } else {
            $scope.shouldShowDelete = true;
            $scope.shouldShowReorder = true;
            $scope.editText = '完成';
            flag = false;
        }
    };

    // 排序
    $scope.reorderItem = function(item, fromIndex, toIndex) {
        //把该项移动到数组中
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    // 弹对话框
    $scope.showConfirm = function(item) {
        var confirmPopup = $ionicPopup.confirm({
           title: '删除',
           template: '确定删除吗？',
           okText: '确定',
           cancelText: '取消'
         });
         confirmPopup.then(function(res) {
           if(res) {
             $scope.items.splice($scope.items.indexOf(item), 1);
           } else {
             return;
           }
         });
    };

    // 删除
    $scope.removeItem = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };
})

// 关于
.controller('aboutCtrl',function($scope, $ionicModal, $ionicActionSheet, $ionicBackdrop, $ionicNavBarDelegate) {

    // 模态弹窗
    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.showModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    // 操作表
    $scope.showActionSheet = function() {
        $ionicBackdrop.retain();
       $ionicActionSheet.show({
         buttons: [
           { text: '<b>Share</b> This' },
           { text: 'Move' }
         ],
         destructiveText: 'Delete',
         titleText: 'Modify your album',
         cancelText: 'Cancel',
         cancel: function() {
            $ionicBackdrop.release();
         },
         buttonClicked: function(index) {
           return true;
         }
        });
    };
    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };
})

// 设置
.controller('settingCtrl', function($scope, $ionicLoading, $ionicSlideBoxDelegate) {
    $scope.showLoading = function() {
        $ionicLoading.show({
          template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
          duration: 3000
        });
    };

    $scope.hideLoding = function(){
        $ionicLoading.hide();
    };

    $scope.go = function(index) {
        $ionicSlideBoxDelegate.slide(index);
    };

})


.controller('about2Ctrl', function($scope,$stateParams) {
    $scope.title='about2Ctrl';
});

