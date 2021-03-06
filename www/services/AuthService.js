/**
 * Created by Y.Kamesh on 4/12/2015.
 * Referred: https://github.com/mpetersen/aes-example
 */

'use strict';
angular.module('App.Auth')
    .service('AuthService', ['Base64', '$http',  '$rootScope', '$timeout', 'BackendCfg',
        function (Base64, $http,  $rootScope, $timeout, BackendCfg) {
            var service = this;
            service.login = function (email, password, callback) {
                
             //   BackendCfg.setupHttp($http);
                // this.createCredentials(email, password);
                var user = {};
                var aesPack = this.encryptPassword(password);
                user.password = password;
                user.email = email;
                console.log('pass: '+user.password);
                console.log('email: '+user.email);
             /*  $http.get('http://localhost:8080/admin/home', user).then(function (response) {
                    callback(response);
                }, function (response) {
                    callback(response);
                });
                */
                //debugger
                 $.ajax
                ({
                    type: "GET",
                    url: 'http://localhost:8080/admin/home',
                  dataType: 'json',
                  async: false,
                  
                  data: user,
                  success: function (response){
                       callback(response);
                  }
              });

               
                console.log('login event posted...')
            };

            service.register = function (user, callback) {
                BackendCfg.setupHttp($http);
                // this.createCredentials(user.email, user.password);

               // var aesPack = this.encryptPassword(user.password);
               var oUser = {};
               
               oUser.password = user.password;
               oUser.email = user.email;
               oUser.name = user.name;
               oUser.lastName = user.lastName;
                
                var authorizationBasic = 'bXVrZXNoOm0xMjM=';
                var url = 'http://localhost:8080/registration'

                $.ajax
                ({
                    type: "POST",
                    url: url,
                  dataType: 'json',
                  async: false,
                  
                  data: oUser,
                  success: function (response){
                       callback(response);
                  }
              });
        /*
              $http.post(url, user).then(function (response) {
                callback(response);
            }, function (response) {
                callback(response);
           });*/
/*
                $.ajax
                ({
                  type: "POST",
                  url: url,
                  dataType: 'json',
                  async: false,
                  data: user,
                  success: function (){
                    alert('Thanks for your comment!'); 
                  }
                });

                $.ajax({
                    type: 'POST',
                    url: url,
                    data: user,
                    crossDomain: true,
                    
                  });

                $.ajax({
                    type: 'POST',
                    url: url,
                    data: user,
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    xhrFields: {
                       withCredentials: true
                    },
                     crossDomain: true,
                    
                    //beforeSend: function (xhr) {
                    //},
                    success: function (result) {
                       var token = result;
                    },
                    //complete: function (jqXHR, textStatus) {
                    //},
                    error: function (req, status, error) {
                    alert(error);
                    }
                });
                
                var request = new XMLHttpRequest();
                request.open('POST', 'http://localhost:8080/user/articles', true);
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                request.setRequestHeader('Authorization', 'Basic ' + 'bXVrZXNoOm0xMjM=');
                request.setRequestHeader('Accept', 'application/json');
                request.send("username=mukesh&password=m123");
                
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                       alert(request.responseText);
                    }
                };

                $http.post('http://localhost:8080/user/articles', {}).then(function (response) {
                    callback(response);
                }, function (response) {
                    callback(response);
               });



            $.ajax({
          method: 'POST',
          url: BackendCfg.url+'/registration',
          contentType:'application/json',
          cache: false,
          setCookies: "432D966205550F9B58BA001D60EA6FA5",
          crossDomain: true,
          dataType: 'json',
          data: user,
          success: function (response) {
            debugger
            console.log("success ");
            console.log(response);
          },
          error: function (xhr) {
            debugger
            console.log("error ");
            console.log(xhr);
          }
}); */
//terra@terra.com.br

       /*          let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
  headers.append('Access-Control-Allow-Credentials', 'true');

  headers.append('GET', 'POST', 'OPTIONS');

  headers.append('Authorization', 'Basic ' + "dddddddddddddddddd");

               // var arr = [1];
                   $.ajax({ 
                   url: BackendCfg.url+'/api/user/register',
                   type: 'POST',
                   contentType:'application/json',
                   headers: headers,
                       data: user,
                       success: function(response){
                         callback(response);
                          }
                     });
                
*/
            }; 

            service.addEmpresa = function (empresa, callback) {
                BackendCfg.setupHttp($http);
                
                // this.createCredentials(user.email, user.password);

               // var aesPack = this.encryptPassword(user.password);
                
                var authorizationBasic = 'bXVrZXNoOm0xMjM=';
                var url = 'http://localhost:8080/empresa/insert'

                $.ajax
                ({
                   
                    type: "POST",
                    url: url,
                  dataType: 'json',
                //  contentType: "charset=utf-8", 
                  contentType: "text/plain; charset=UTF-8" ,
                  data: JSON.stringify(empresa),
                  success: function (response){
                      debugger
                       callback(response);
                  }
              });
            }; 
            service.fetchAllEmpresa = function (empresa, callback) {
                BackendCfg.setupHttp($http);
                
                // this.createCredentials(user.email, user.password);

               // var aesPack = this.encryptPassword(user.password);
                
                var authorizationBasic = 'bXVrZXNoOm0xMjM=';
                var url = 'http://localhost:8080/empresa/fetchAllEmpresa'

                $.ajax
                ({
                   
                    type: "POST",
                    url: 'http://localhost:8080/empresa/fetchAllEmpresa',
                  dataType: 'json',
                //  contentType: "charset=utf-8", 
                  contentType: "text/plain; charset=UTF-8" ,
                 // data: JSON.stringify(empresa),
                  success: function (response){
                      debugger
                       callback(response);
                  }
              });
            };
            service.encryptPassword = function (password) {
                var aesPack = {};
                var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
                aesPack.iv = iv;
                aesPack.salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
                aesPack.keySize = 128;
                aesPack.iterations = 1000;

                var key = CryptoJS.PBKDF2(
                    "biZndDtCMkdeP8K0V15OKMKnSi85",
                    CryptoJS.enc.Hex.parse(aesPack.salt), { keySize: aesPack.keySize/32, iterations: aesPack.iterations });

                var encrypted = CryptoJS.AES.encrypt(password, key, { iv: CryptoJS.enc.Hex.parse(aesPack.iv) });
                aesPack.ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
                return aesPack;
            };

            service.createCredentials = function (email, password) {
                var authdata = Base64.encode(email + ':' + password);

                $rootScope.globals = {
                    currentUser: {
                        email: email,
                        authdata: authdata
                    }
                };

            };

            service.createJWTToken = function (user, token) {
                $rootScope.globals = {
                    currentUser: user,
                    token: token
                };

            };

            service.setCredentials = function () {
            //    $cookieStore.put('globals', $rootScope.globals);
            };

            service.clearCredentials = function () {
                console.log("clearing credentials...");
                $rootScope.globals = {};
            //    $cookieStore.remove('globals');
                $http.defaults.headers.common.Authorization = '';

            };

            return service;
        }])
    .factory('Base64', function () {
        /* jshint ignore:start */

        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };

        /* jshint ignore:end */
    });