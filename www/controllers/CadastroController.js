/**
 * Created by Y.Kamesh on 4/13/2015.
 */
angular.module('App')
    .controller('CadastroController', ['$scope', '$rootScope', '$location', 'AuthService', CadastroController]);

function CadastroController($scope, $rootScope, $location, AuthService) {
    var lc = this;
    lc.empresa = {
     /*   endereco : {
            estado : {id : 1},
            cep:'9999999999',
            logradouro:'999999999',
            numero:'999999999',
            cidade:'9999999',
        }, */
        referencia:'9999999',
        nome:'999999s9',
        nomeResponsavel:'99ws9s999',
        email:'wlclimaco@gmail.com',
        telefone:'999999999'
    }
    lc.login = function () {
        console.log('received the login event for user: '+lc.empresa.nome);
        lc.dataLoading = true;
        $rootScope.isSubmitted = true;
        AuthService.addEmpresa(lc.empresa, function (response) {
            debugger
            var resp = response.data;
            if (resp && resp.code==200) {
                AuthService.createJWTToken(resp.result.user, resp.result.token);
                AuthService.setCredentials();
                $location.path('/app');
            } else {
                lc.error = resp.result;
                lc.details = resp.details;
                lc.dataLoading = false;
                $rootScope.isSubmitted = false;
            }
        });
    };
};