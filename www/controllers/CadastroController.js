/**
 * Created by Y.Kamesh on 4/13/2015.
 */
angular.module('App')
    .controller('CadastroController', ['$scope', '$rootScope', '$location', 'AuthService', CadastroController]);

function CadastroController($scope, $rootScope, $location, AuthService) {
    var lc = this;
    lc.empresa = {
        endereco : {
            estado : {id : 1,sigla:"MG"},
            cep:'38082243',
            logradouro:'herminio pinti',
            bairro:"vila alvorada",
            numero:'199',
            cidade:'Uberaba',
            referencia:'Proximo a fazu'
        }, 
        quadras : [{nome:"nome",descricao : "descricao",valor : 1.99,comBola : 1,valorBola : 0.51,horarioAberto:[{abertura : "",fecha:""}]}],
        nome:'Quadra 0001',
        nomeResponsavel:'Responsavel 0001',
        email:'wlclimaco@gmail.com',
        telefone:'34988406670'
        
    }
    lc.createForm  = function (oQuadra) {
        debugger
        oQuadra.horarioAberto.push({abertura : "",fecha:""});
    }

    lc.createFormQuadra  = function () {
        debugger
        lc.empresa.quadras.push({comBola : 1,horarioAberto : [{abertura : "",fecha:""}]});
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

    lc.quadra = function(oQuadra)
    {
        var oHorarios = [];
        for(var x=0;x<oQuadra.horarioAberto.length;x++)
        {
            oHorarios.push(new lc.horario(oQuadra.horarioAberto[x]));
        }
        this.id = oQuadra.id;
        this.nome = oQuadra.nome;
        this.descricao = oQuadra.descricao;
        this.tempoJogo = 60;//oQuadra.tempoJogo ;
        this.intervalo = 0;//oQuadra.intervalo;
        this.horarioAberto = oHorarios ? oHorarios : null;
        this.valor = oQuadra.valor ? parseFloat(oQuadra.valor) : 0;
        this.comBola = oQuadra.comBola ? parseInt(oQuadra.comBola) : 0;
        this.valorBola = oQuadra.sex ? parseFloat(oQuadra.valorBola) : 0;
    }

    lc.login = function () {
        
        console.log('received the login event for user: '+lc.empresa.nome);
        lc.dataLoading = true;
        $rootScope.isSubmitted = true;
        
        $.get("http://maps.google.com/maps/api/geocode/json?address="+lc.empresa.endereco.logradouro+"+"+lc.empresa.endereco.numero+"+"+lc.empresa.endereco.bairro+",+"+lc.empresa.endereco.cidade+"+-+"+lc.empresa.endereco.estado.sigla+"&sensor=false", function(data, status){
            console.log(data.results[0].geometry.location)

            lc.empresa.endereco.lat   = data.results[0].geometry.location.lat;
            lc.empresa.endereco.longi = data.results[0].geometry.location.lng;

            var oQuadras = [];
            for(var x=0;x<lc.empresa.quadras.length;x++)
            {
                oQuadras.push(new lc.quadra(lc.empresa.quadras[x]));
            }
            
            lc.empresa.quadras = [];
            lc.empresa.quadras = oQuadras;
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
        });
    };
};