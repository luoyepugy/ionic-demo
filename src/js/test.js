angular.module('ionicApp', ['ionic'])

.controller('sideMenuCtrl', ['$scope', function($scope) {
    $scope.items = [];
    for(var i = 0; i < 5; i++) {
        $scope.items.push({
            text: 'text' + (i + 1)
        });
    }
}])

.controller('homeCtrl', ['$scope','$ionicPopup','$timeout', function($scope, $ionicPopup, $timeout) {
    $scope.items = [];
    for(var i = 0; i < 10; i++) {
        $scope.items.push({
            text: 'text' + (i + 1)
        });
    }

    // 下拉刷新
    $scope.doRefresh = function() {
        $timeout( function() {  
            //simulate async response  
            $scope.items.push({ 
                text: 'New Item ' + Math.floor(Math.random() * 1000) 
            });  
  
            //Stop the ion-refresher from spinning  
            $scope.$broadcast('scroll.refreshComplete');  
      
        }, 1000);  
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

    $scope.removeItem = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };
}])


.controller('aboutCtrl', ['$scope', '$ionicModal', '$ionicActionSheet', function($scope, $ionicModal, $ionicActionSheet) {

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


    $scope.showActionSheet = function() {
       // 显示操作表
       $ionicActionSheet.show({
         buttons: [
           { text: '<b>Share</b> This' },
           { text: 'Move' }
         ],
         destructiveText: 'Delete',
         titleText: 'Modify your album',
         cancelText: 'Cancel',
         buttonClicked: function(index) {
           return true;
        }
        });
    };
    
}])

.controller('settingCtrl', ['$scope', '$ionicLoading', '$ionicSlideBoxDelegate', function($scope, $ionicLoading, $ionicSlideBoxDelegate) {
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

}]);
