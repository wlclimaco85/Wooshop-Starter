/**
 * Created by Y.Kamesh on 4/6/2015.
 */
var ywp2WebModule = angular.module('YWP2Web',
                                    [   'ionic',
                                        'ngAnimate',
                                        'ngMessages',
                                        'ngRoute',
                                        'ngCookies',
                                        'App.Common',
                                        'App.Admin',
                                        'App.Auth',
                                        'App'
                                    ]);
ywp2WebModule.run(function($rootScope, $ionicPlatform, $ionicLoading, $ionicPopup, $ionicHistory) {
  $ionicPlatform.ready(function() {
    
    // Check for network connection
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'No Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
    }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  $ionicPlatform.registerBackButtonAction(function(e){
    if ($rootScope.backButtonPressedOnceToExit) {
      ionic.Platform.exitApp();
    }

    else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
    }
    else {
      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showShortCenter(
        "Press back button again to exit",function(a){},function(b){}
      );
      setTimeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      },2000);
    }
    e.preventDefault();
    return false;
  },101);
})


ywp2WebModule.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.token;
            $rootScope.currentUser = $rootScope.globals.currentUser;
        }

        $rootScope.isSubmitted = false;

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log('received event: ' + event + ' from: ' + current + ' to go to next: ' + next);debugger
            // redirect to login page if not logged in and trying to access a restricted page
            debugger
            var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/admin.login', '/adm.register', '/admin', '/app', '/dashboard']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            $rootScope.currentUser = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                if($location.path().indexOf('admin') > -1) {
                    $location.path('/admin.login');
                } else if($location.path().indexOf('app') > -1) {
                    $location.path('/login');
                } else {
                    $location.path('/home');
                }
            }
        });
    }
]);