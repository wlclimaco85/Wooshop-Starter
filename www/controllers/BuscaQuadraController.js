/**
 * Created by Y.Kamesh on 4/13/2015.
 */
angular.module('App')
    .controller('BuscaQuadraController', ['$scope', '$rootScope', '$location', 'AuthService','ngMap', BuscaQuadraController]);

function BuscaQuadraController($scope, $rootScope, $location, AuthService,NgMap) {
    var vm = this;
   
    NgMap.getMap().then(function(map) {
        vm.map = map;
      });
      vm.template = {
        cached: 'custom-cached-info-window-template.html',
        external: '/testapp/partials/custom-info-window-template.html'
      };
      vm.stores = {
        foo: {
          position:[41, -87],
          infoWindow: 'cached',
          items: [1,2,3,4]
        },
        foo2: {
          position:[41, -80],
          infoWindow: 'external',
          items: [5,6,7,8]
        }
      };
      vm.showStore = function(evt, storeId) {
        vm.store = vm.stores[storeId];
        vm.map.showInfoWindow(vm.store.infoWindow, this);
      };
      
        AuthService.fetchAllEmpresa(vm.empresa, function (response) {
            debugger
            var resp = response.data;
            if (resp && resp.code==200) {
                AuthService.createJWTToken(resp.result.user, resp.result.token);
                AuthService.setCredentials();
             //   $location.path('/app');
            } else {
                vm.error = resp.result;
                vm.details = resp.details;
                vm.dataLoading = false;
                $rootScope.isSubmitted = false;
            }
        });
    
};