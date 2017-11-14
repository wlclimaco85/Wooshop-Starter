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
            referencia:'9999999',
        }, */
        
        nome:'999999s9',
        nomeResponsavel:'99ws9s999',
        email:'wlclimaco@gmail.com',
        telefone:'999999999',
        horarioAberto:[{abertura : "",fecha:""}]
    }
    lc.createForm  = function () {
        lc.empresa.horarios.push({abertura : "",fecha:""});
    }

    lc.horario = function(oHorario)
    {
       // this.id = oHorario.id;
        this.dom = oHorario.dom ? parseInt(oHorario.dom) : 0;
        this.seg = oHorario.seg ? parseInt(oHorario.seg) : 0;
        this.ter = oHorario.ter ? parseInt(oHorario.ter) : 0;
        this.qua = oHorario.qua ? parseInt(oHorario.qua) : 0;
        this.qui = oHorario.qui ? parseInt(oHorario.qui) : 0;
        this.sex = oHorario.sex ? parseInt(oHorario.sex) : 0;
        this.sab = oHorario.sab ? parseInt(oHorario.sab) : 0;
        this.horaInicial = oHorario.horaInicial.getHours() + ":"+ oHorario.horaInicial.getMinutes();
        this.horaFinal = oHorario.horaFinal.getHours() + ":"+ oHorario.horaFinal.getMinutes();
    }

    lc.login = function () {
        
        console.log('received the login event for user: '+lc.empresa.nome);
        lc.dataLoading = true;
        $rootScope.isSubmitted = true;
        var oHorarios = [];
        for(var x=0;x<lc.empresa.horarioAberto.length;x++)
        {
            oHorarios.push(new lc.horario(lc.empresa.horarioAberto[x]));
        }
        debugger
        lc.empresa.horarioAberto = [];
        lc.empresa.horarioAberto = oHorarios;
        AuthService.addEmpresa(lc.empresa, function (response) {
            
            var resp = response.data;
            if (resp && resp.code==200) {
                AuthService.createJWTToken(resp.result.user, resp.result.token);
                AuthService.setCredentials();
             //   $location.path('/app');
            } else {
                lc.error = resp.result;
                lc.details = resp.details;
                lc.dataLoading = false;
                $rootScope.isSubmitted = false;
            }
        });
    };
};