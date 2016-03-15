


angular.module('myApp.controllers', [])

// 左侧菜单
.controller('sideMenuCtrl', function($scope, $state) {
    // $scope.exitAccount = function() {
    //     $state.go('login');
    // };
})
// 首页
.controller('homeCtrl', function($scope, $ionicSlideBoxDelegate, $state) {
    $scope.go = function(index) {
         $ionicSlideBoxDelegate.slide(index);
    }
    $scope.slideHasChanged = function(index) {
        if(index === 2) {
            $state.go('login');
        }
    };
})

.controller('registerCtrl', function($scope, $ionicNavBarDelegate) {
    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };
})

// 列表页面
.controller('listCtrl', function($scope, $ionicPopup, $timeout, $http, $ionicLoading) {
    $scope.items = [];
    // 预加载
    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
        duration: 3000
    });
    $http.get('./json/indexItems.json')
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
            $http.get('./json/newItems.json')
                .success(function(data) {
                    $scope.items = data.datas;
                    $scope.$broadcast('scroll.refreshComplete');
            })
            .error(function(data){
                console.log('error');
            });
        }, 1000);   
    };

    // 加载更多
    $scope.loadMore = function() {
        // 从指定路径获取数据
        $http.get('./json/moreItems.json').success(function(data) {
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

// 头像列表页面
.controller('listAvatarCtrl',function($scope, $ionicModal, $http, $ionicLoading) {
    $scope.list = [];
    // 预加载
    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><h3>加载中...</h3>',
        duration: 3000
    });
    $http.get('./json/indexItems.json')
        .success(function(data) {
            $scope.list = data.datas;
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
    
})

// 个人中心
.controller('changeProfileCtrl', function($scope, $ionicActionSheet, $ionicBackdrop) {

    // 操作表
    $scope.showActionSheet = function() {
        $ionicBackdrop.retain();
        $ionicActionSheet.show({
            // titleText: 'ActionSheet Example',
            buttons: [{
                text: '<i class="icon ion-ios-camera"></i>拍照'
            }, {
                text: '<i class="icon ion-ios-photos"></i>从图库选择'
            }, ],
            // destructiveText: '删除',
            cancelText: '取消',
            cancel: function() {
                console.log('CANCELLED');
                $ionicBackdrop.release();
            },
            buttonClicked: function(index) {
                console.log('BUTTON CLICKED', index);
                $ionicBackdrop.release();
                return true;
            },
            destructiveButtonClicked: function() {
                console.log('DESTRUCT');
                $ionicBackdrop.release();
                return true;
            }
        });
    };

})

