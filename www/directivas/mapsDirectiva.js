/**
 * Created by Y.Kamesh on 4/13/2015.
 */
angular.module('App.map', []).
directive('myMap', inputactionController);

inputactionController.$inject = ['AuthService'];

    function inputactionController(AuthService) {
    // directive link function
    
    var link = function(scope, element, attrs,ngModel ) {
        var map, infoWindow;
        var markers = [];
        
        // map config
        var mapOptions = {
            zoom: 12,
            center: {lat: -19.7483300, lng: -47.9319400},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }    
        
        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }
        
        // show the map and place some markers
        initMap();
        
        AuthService.fetchAllEmpresa({}, function (response) {
            
           scope.$apply(function() {
            scope.empresaList = response;
        });
            for(var x = 0;x< response.length;x++)
            {
                if(response[x] && response[x].endereco)
                {
                    
                    var teste = '<div class="container-fluid">'+
                    '<div class="col-md-12">'+
                    '<span class="label label-default">Nome : '+response[x].nome+'</span> <span class="label label-default"></span>'+
                    '</div>'+
                    '<div class="col-md-12">'+
                    '<span class="label label-default"> Endereço : '+response[x].endereco.logradouro+' '+response[x].endereco.numero+'  '+response[x].endereco.bairro+' </span>'+
                    '</div>'+
                    '<div class="col-md-12">'+
                    '<span class="label label-default">Email : '+response[x].email+'</span>'+
                    '</div>'+
                    '<div class="col-md-12">'+
                    '<span class="label label-default">Telefone :'+response[x].telefone+'</span>'+
                    '</div>'+
                    '<div class="col-md-12">'+
                    '<span class="label label-default">Responsavel : '+response[x].nomeResponsavel+'</span>'+
                    '</div>';
                    for(var y = 0;y < response[x].quadras.length;y++){
                        teste = teste  + '<hr><div class="col-md-12"><span class="label col-md-12 label-default">Quadra : '+response[x].quadras[y].nome+'</span></div>'+
                    '<div class="col-md-12"><span class="label col-md-12 label-default">Valor S/Bola : '+response[x].quadras[y].valor+'</span></div>'+
                    '<div class="col-md-12"><span class="label col-md-12 label-default">Valor C/Bola : '+(response[x].quadras[y].valor + response[x].quadras[y].valorBola) +'</span></div>'+
                    '<div class="col-md-12"><span class="label col-md-12 label-default">Cobertura : '+response[x].quadras[y].cobertura+'</span></div>'+
                    '<div class="col-md-12"><span class="label col-md-12 label-default">Tipo : '+response[x].quadras[y].tipo+'</span></div><hr><br>';
                    }


                    teste = teste  + '<div class="row">'+
                    '<div class="col-md-12">'+
                    '<div class="carousel slide" id="carousel-242657">'+
                    '<ol class="carousel-indicators">'+
                    '<li class="active" data-slide-to="0" data-target="#carousel-242657">'+
                    '</li>'+
                    '<li data-slide-to="1" data-target="#carousel-242657">'+
                    '</li>'+
                    '<li data-slide-to="2" data-target="#carousel-242657">'+
                    '</li>'+
                    '</ol>'+
                    '<div class="carousel-inner">'+
                    '<div class="item active">'+
                    '<img alt="Carousel Bootstrap First" src="http://lorempixel.com/output/sports-q-c-1600-500-1.jpg" />'+
                    '<div class="carousel-caption">'+
                    '</div>'+
                    '</div>'+
                    '<div class="item">'+
                    '<img alt="Carousel Bootstrap Second" src="http://lorempixel.com/output/sports-q-c-1600-500-2.jpg" />'+
                    '<div class="carousel-caption">'+
                            '</div>'+
                    '</div>'+
                    '<div class="item">'+
                    '<img alt="Carousel Bootstrap Third" src="http://lorempixel.com/output/sports-q-c-1600-500-3.jpg" />'+
                    '<div class="carousel-caption">'+
                    '</div>'+
                    '</div>'+
                    '</div> <a class="left carousel-control" href="#carousel-242657" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a> <a class="right carousel-control" href="#carousel-242657" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';

                    setMarker(map, new google.maps.LatLng(response[x].endereco.lat, response[x].endereco.longi), 'London',teste);
                }
            }
          //  setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
          //  setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
          //  setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
          
        });
    };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
};

