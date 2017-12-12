/**
 * Created by Y.Kamesh on 4/12/2015.
 */
angular.module('App.Auth')
    .controller('LoginController', ['$scope', '$rootScope','$state', '$location', 'AuthService', LoginController]);

function LoginController($scope, $rootScope,$state, $location, AuthService) {
    var lc = this;

    (function initController() {
        // reset login status
        AuthService.clearCredentials();
    })();

    lc.login = function () {
        
        console.log('received the login event for user: '+lc.user.email);
        lc.dataLoading = true;
        $rootScope.isSubmitted = true;
        AuthService.login(lc.user.email, lc.user.password, function (response) {
            
            var resp = response;
            if (resp && resp.code==200) {
                AuthService.createJWTToken(resp.result.user, resp.result.token);
                AuthService.setCredentials();
               // $location.path('/app/dashboard');
               $state.go("app.dashboard");
            } else {
                lc.error = resp.result;
                lc.details = resp.details;
                lc.dataLoading = false;
                $rootScope.isSubmitted = false;
            }
        });
    };
};