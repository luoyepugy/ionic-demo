
angular.module('myApp', ['ionic', 'myApp.controllers'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(5);
    $ionicConfigProvider.tabs.position("bottom");

    $stateProvider
    // 首页
    .state('home', {
        url: "/home",
        templateUrl: "views/home.html",
        controller: 'homeCtrl'
    })

    // 登录
    .state('login', {
        url: "/login",
        templateUrl: "views/user/login.html"
    })
    // 注册
    .state('register', {
        url: "/register",
        templateUrl: "views/user/register.html",
        controller: 'registerCtrl'
    })
    
    // tabs
    .state('tabs', {
        url: "/tabs",
        "abstract": true,
        templateUrl: "views/tabs/tabs.html"
    })
    .state('tabs.list', {
        url: '/list',
        views:{
            'tabs-list':{
                templateUrl: "views/tabs/tabs-list.html",
                controller:'listCtrl'
            }
        }
    })
    .state('tabs.listDetail', {
        url: '/listDetail/:listId',
        views:{
            'tabs-list':{
                templateUrl: "views/tabs/list-detail.html"
            }
        }
    })
    .state('tabs.listAvatar', {
        url: '/listAvatar',
        views:{
            'tabs-listAvatar':{
                templateUrl: "views/tabs/tabs-listAvatar.html",
                controller:'listAvatarCtrl'
            }
        }
    })
    .state('tabs.listAvatarDetail', {
        url: '/listAvatarDetail',
        views: {
            'tabs-listAvatar': {
                templateUrl: "views/tabs/listAvatar-detail.html"
            }
        }
    })
    .state('tabs.user', {
        url: '/user',
        views:{
            'tabs-user':{
                templateUrl: "views/tabs/tabs-user.html"
            }
        }
    })
    // 修改密码
    .state('tabs.changePwd', {
        url: "/changePwd",
        views:{
            'tabs-user':{
                templateUrl: "views/user/changePwd.html"
            }
        }
    })
    // 编辑资料
    .state('tabs.changeProfile', {
        url: "/changeProfile",
        views:{
            'tabs-user':{
                templateUrl: "views/user/changeProfile.html",
                controller:'changeProfileCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/home');

});