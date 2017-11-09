/* eslint no-alert: 0 */

'use strict';

//
// Here is how to define your module
// has dependent on mobile-angular-ui
//
var app = angular.module('MobileAngularUiExamples', ['ionic',
  'ngRoute',
  'mobile-angular-ui',
  'ngAnimate',
  'ngMessages',
  'ngCookies',
  'App.Common',
  'App.Admin',
  'App.Auth',
  'App',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

//
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
// in order to avoid unwanted routing.
//
/*
app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: '/../templates/login.html', reloadOnSearch: false});
  $routeProvider.when('/home', {templateUrl: '/../templates/home.html', reloadOnSearch: false});
  $routeProvider.when('/scroll', {templateUrl: '/../templates/scroll.html', reloadOnSearch: false});
  $routeProvider.when('/toggle', {templateUrl: '/../templates/toggle.html', reloadOnSearch: false});
  $routeProvider.when('/tabs', {templateUrl: '/../templates/tabs.html', reloadOnSearch: false});
  $routeProvider.when('/accordion', {templateUrl: '/../templates/accordion.html', reloadOnSearch: false});
  $routeProvider.when('/overlay', {templateUrl: '/../templates/overlay.html', reloadOnSearch: false});
  $routeProvider.when('/forms', {templateUrl: '/../templates/forms.html', reloadOnSearch: false});
  $routeProvider.when('/dropdown', {templateUrl: '/../templates/dropdown.html', reloadOnSearch: false});
  $routeProvider.when('/touch', {templateUrl: '/../templates/touch.html', reloadOnSearch: false});
  $routeProvider.when('/swipe', {templateUrl: '/../templates/swipe.html', reloadOnSearch: false});
  $routeProvider.when('/drag', {templateUrl: '/../templates/drag.html', reloadOnSearch: false});
  $routeProvider.when('/drag2', {templateUrl: '/../templates/drag2.html', reloadOnSearch: false});
  $routeProvider.when('/carousel', {templateUrl: '/../templates/carousel.html', reloadOnSearch: false});
});
*/

app.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     $rootScope.authStatus = false;
   //stateChange event
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      $rootScope.authStatus = toState.authStatus;
      if($rootScope.authStatus){
        
      
      }
    });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    console.log("URL : "+toState.url);
    if(toState.url=='/dashboard'){
      console.log("match : "+toState.url);
      $timeout(function(){
        angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
      },1000);
    } 
  });

});

/*
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html'
      }
    },
  authStatus: false
  })
 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html',
      }
   },
  authStatus: false
  })
//--------------------------------------


  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
    controller: 'DashCtrl'
      }
     },
   authStatus: true
  })


    .state('app.profiles', {
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: 'templates/profiles.html',
          controller: 'ProfilesCtrl'
        }
      }
    })

  .state('app.profile', {
    url: '/profile/:profileId',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});


*/


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: '/../templates/menu.html'//,
 //   controller: 'AppCtrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: '/../templates/tab-signin.html'
      }
    },
  authStatus: false
  })
 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: '/../templates/tab-signup.html',
      }
   },
  authStatus: false
  })
//--------------------------------------


  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: '/../templates/dashboard.html',
        controller: 'DashboardController'
      }
     },
   authStatus: true
  })
  //app/cadastro
  .state('app.cadastro', {
    url: '/cadastro',
    views: {
      'menuContent': {
        templateUrl: '/../templates/tab4DefaultPage.html'//,
   //     controller: 'ProfilesCtrl'
      }
    }
  })
  //app/horarios
  .state('app.horarios', {
    url: '/horarios',
    views: {
      'menuContent': {
        templateUrl: '/../templates/horarios.html'//,
   //     controller: 'ProfilesCtrl'
      }
    }
  })
  //app/notificacao
  .state('app.notificacao', {
    url: '/notificacao',
    views: {
      'menuContent': {
        templateUrl: '/../templates/notificoes.html'//,
   //     controller: 'ProfilesCtrl'
      }
    }
  })
  //app/msg
  .state('app.msg', {
    url: '/msg',
    views: {
      'menuContent': {
        templateUrl: '/../templates/mensagem.html'//,
   //     controller: 'ProfilesCtrl'
      }
    }
  })
  //app/fotos
  .state('app.fotos', {
    url: '/fotos',
    views: {
      'menuContent': {
        templateUrl: '/../templates/fotos.html'//,
   //     controller: 'ProfilesCtrl'
      }
    }
  })


    .state('app.profiles', {
      url: '/profiles',
      views: {
        'menuContent': {
          templateUrl: '/../templates/profiles.html'//,
     //     controller: 'ProfilesCtrl'
        }
      }
    })

  .state('app.profile', {
    url: '/profile/:profileId',
    views: {
      'menuContent': {
        templateUrl: '/../templates/profile-detail.html'//,
    //    controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});


app.run(['$rootScope', '$location', '$cookieStore', '$http',
function ($rootScope, $location, $cookieStore, $http) {
  
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.token;

        $rootScope.currentUser = $rootScope.globals.currentUser;
    }else{
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + 'bXVrZXNoOm0xMjM=';
    }

      $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      $http.defaults.headers.common['Origin'] = '*';
      $http.defaults.headers.common['Referer'] = '*';
      
    $rootScope.isSubmitted = false;

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        console.log('received event: ' + event + ' from: ' + current + ' to go to next: ' + next);
        // redirect to login page if not logged in and trying to access a restricted page

        var sPath = ""
        if($location.hash())
        {
          sPath = $location.hash();
          $location.path(null);
          $location.path(sPath);
          $location.url(null);
          $location.url(sPath);
        }
        else
        {
          sPath = $location.path();
        }

      //  var aa = ['/login','/app/home' ,'/home', '/app/scroll', '/app/forms', '/app/toggle', '/app/tabs', '/app/dropdown','/app'];
     //   aa.indexOf('/logind')

        var restrictedPage = $.inArray(sPath, ['/app/login','/app/fotos','/app/msg','/app/notificacao','/app/horarios','/app/cadastro', '/app/signup','/app/home','/app/dashboard' ,'/home', '/app/scroll', '/app/forms', '/app/toggle', '/app/tabs', '/app/dropdown','/app']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        $rootScope.currentUser = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
          
            if(sPath.indexOf('admin') > -1) {
                $location.path('/admin.login');
            } else if(sPath.indexOf('app') > -1) {
                $location.path('/login');
            } else {
                $location.path('/app');
            }
        }
        
    });
}
]);

//
// `$touch example`
//

app.directive('toucharea', ['$touch', function($touch) {
  // Runs during compile
  return {
    restrict: 'C',
    link: function($scope, elem) {
      $scope.touch = null;
      $touch.bind(elem, {
        start: function(touch) {
          $scope.containerRect = elem[0].getBoundingClientRect();
          $scope.touch = touch;
          $scope.$apply();
        },

        cancel: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        move: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        end: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        }
      });
    }
  };
}]);

//
// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem) {
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if (drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function() {
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function() {
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function() {
        var res = 0;
        if (id === carousel.activeItem) {
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function() {
        return carousel.activeItem;
      }, function() {
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx = touch.distanceX;
          var t0 = touch.startTransform;
          var sign = Dx < 0 ? -1 : 1;
          var angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag) {
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function() {
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
});

app.directive('dragMe', ['$drag', function($drag) {
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);

//
// For this trivial demo we have just a unique MainController
// for everything
//
app.controller('MainController', function($rootScope, $scope) {

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum ' +
    'corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  //
  // 'Scroll' screen
  //
  var scrollItems = [];

  for (var i = 1; i <= 100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    alert('Congrats you scrolled to the end of the list!');
  };

  //
  // Right Sidebar
  //
  $scope.chatUsers = [
    {name: 'Carlos  Flowers', online: true},
    {name: 'Byron Taylor', online: true},
    {name: 'Jana  Terry', online: true},
    {name: 'Darryl  Stone', online: true},
    {name: 'Fannie  Carlson', online: true},
    {name: 'Holly Nguyen', online: true},
    {name: 'Bill  Chavez', online: true},
    {name: 'Veronica  Maxwell', online: true},
    {name: 'Jessica Webster', online: true},
    {name: 'Jackie  Barton', online: true},
    {name: 'Crystal Drake', online: false},
    {name: 'Milton  Dean', online: false},
    {name: 'Joann Johnston', online: false},
    {name: 'Cora  Vaughn', online: false},
    {name: 'Nina  Briggs', online: false},
    {name: 'Casey Turner', online: false},
    {name: 'Jimmie  Wilson', online: false},
    {name: 'Nathaniel Steele', online: false},
    {name: 'Aubrey  Cole', online: false},
    {name: 'Donnie  Summers', online: false},
    {name: 'Kate  Myers', online: false},
    {name: 'Priscilla Hawkins', online: false},
    {name: 'Joe Barker', online: false},
    {name: 'Lee Norman', online: false},
    {name: 'Ebony Rice', online: false}
  ];

  //
  // 'Forms' screen
  //
  $scope.rememberMe = true;
  $scope.email = 'me@example.com';

  $scope.login = function() {
    alert('You submitted the login form');
  };

  //
  // 'Drag' screen
  //
  $scope.notices = [];

  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1)});
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };
});
