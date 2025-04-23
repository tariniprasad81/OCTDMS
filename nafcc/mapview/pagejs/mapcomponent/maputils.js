const maputils = (function($, olMap){
var parameters;
    function pointonmap2() {
                var coodrinatespoints = [83.34, 19.98];
                var geojsonpoint = {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "name": "assetpoint"
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": coodrinatespoints
                            }
                        }
                    ]
                };

                var styleMarker = new ol.style.Style({
                    image: new ol.style.Icon({
                        scale: .7, anchor: [0.5, 1],
                        src: '/images/icon.png'
                    })
                });
                var gjFormatpoint = new ol.format.GeoJSON({
                    featureProjection: 'EPSG:3857',
                    strategy: ol.loadingstrategy.bbox,
                });
                var featurespoint = gjFormatpoint.readFeatures(geojsonpoint);
                var Collection = new ol.Collection();
                vectorSourcepoint.clear();
                var featureOverlaypoint = new ol.layer.Vector({
                    map: olMap,
                    source: vectorSourcepoint,
                    style: [styleMarker],

                    updateWhileAnimating: true,
                    updateWhileInteracting: true
                });

                featureOverlaypoint.getSource().addFeatures(featurespoint);
                olMap.getView().fit(featureOverlaypoint.getSource().getExtent(), { size: olMap.getSize(), maxZoom: 10 });
                // olMap.getView().setZoom(12);
            }



    function pointonmap(coodrinatespoints,additionalAttribute, data,dataimage) {
    console.log(dataimage)
        var geojsonpoint = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetpoint",
                       additionalAttribute, data,dataimage
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": coodrinatespoints
                    }
                }
            ]
        };

        var styleMarker = new ol.style.Style({
            image: new ol.style.Icon({
                scale: .7, anchor: [0.5, 1],
                src: 'images/marker.png'
            })
        });
        var gjFormatpoint = new ol.format.GeoJSON({
            featureProjection: 'EPSG:3857',
            strategy: ol.loadingstrategy.bbox,
        });
        var featurespoint = gjFormatpoint.readFeatures(geojsonpoint);


        var vectorSourcepoint = new ol.source.Vector();
        vectorSourcepoint.addFeatures(featurespoint)
        new ol.layer.Vector({
            map: olMap,
            source: vectorSourcepoint,
            style: [styleMarker],

            updateWhileAnimating: true,
            updateWhileInteracting: true
        });

        olMap.getView().fit(vectorSourcepoint.getExtent(), { size: olMap.getSize(), maxZoom: 10 });
    }

    function polygononmap(coodrinatespoly,additionalAttribute,data,dataimage) {
        console.log(data)
        var geojsonpoly = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetploygon",
                       additionalAttribute, data,dataimage
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": coodrinatespoly
                    }
                }
            ]
        };
        var lineStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#337AFF', width: 5 })
        });
        var gjFormatpoly = new ol.format.GeoJSON({
            featureProjection: 'EPSG:3857',
            strategy: ol.loadingstrategy.bbox,
        });
        var featurespoly = gjFormatpoly.readFeatures(geojsonpoly);

        var vectorSourcepolygon = new ol.source.Vector();
        vectorSourcepolygon.addFeatures(featurespoly);
        new ol.layer.Vector({
            map: olMap,
            source: vectorSourcepolygon,

            style: [lineStyle],

            updateWhileAnimating: true,
            updateWhileInteracting: true
        });


        olMap.getView().fit(vectorSourcepolygon.getExtent(), { size: olMap.getSize(), maxZoom: 15 });
    }

    function lineonmap(coodrinateslines) {
        // var coodrinateslines = [[85.23, 21.44], [85.29, 21.67], [85.35, 21.87]];


        var geojsonline = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetline"
                    },
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coodrinateslines
                    }
                }
            ]
        };

        var lineStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({ color: '#ffcc33', width: 4 })
        });
        var gjFormatline = new ol.format.GeoJSON({
            featureProjection: 'EPSG:3857',
            strategy: ol.loadingstrategy.bbox,
        });

        var featuresline = gjFormatline.readFeatures(geojsonline);
        var vectorSourceline = new ol.source.Vector();
        vectorSourceline.clear();
        var featureOverlayline = new ol.layer.Vector({
            map: olMap,
            source: vectorSourceline,
            style: [lineStyle],
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        featureOverlayline.getSource().addFeatures(featuresline);
        olMap.getView().fit(featureOverlayline.getSource().getExtent(), { size: olMap.getSize(), maxZoom: 15 });
    }

    var image = new ol.style.Style({
                image: new ol.style.Icon({
                        scale:1, anchor:[0.5,1],
                        src:'images/image_icon.png'
                       })
            });

     var image2 = new ol.style.Circle({
                      radius: 5,
                      fill: null,
                      stroke: new ol.style.Stroke({ color: 'red', width: 1 })
                    });

             var styles = {
                      'Point': new ol.style.Style({
                        image: new ol.style.Icon({
                               scale: .7, anchor: [0.5, 1],
                               src: 'images/marker.png'
                           })
                      }),
                      'LineString': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                          color: 'green',
                          width: 1
                        })
                      }),
                      'MultiLineString': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                          color: 'green',
                          width: 1
                        })
                      }),
                      'MultiPoint': new ol.style.Style({
                        image: new ol.style.Icon({
                                                           scale: .7, anchor: [0.5, 1],
                                                           src: 'images/marker.png'
                                                       })
                      }),
                      'MultiPolygon': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                          color: 'yellow',
                          width: 1
                        }),
                        fill: new ol.style.Fill({
                          color: 'rgba(255, 255, 0, 0.1)'
                        })
                      }),
                      'Polygon': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                          color: 'blue',
                          lineDash: [4],
                          width: 3
                        }),
                        fill: new ol.style.Fill({
                          color: 'rgba(0, 0, 255, 0.1)'
                        })
                      }),
                      'GeometryCollection': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                          color: 'magenta',
                          width: 2
                        }),
                        fill: new ol.style.Fill({
                          color: 'magenta'
                        }),
                        image: new ol.style.Circle({
                          radius: 10,
                          fill: null,
                          stroke: new ol.style.Stroke({
                            color: 'magenta'
                          })
                        })
                      }),
                      'Circle': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                          color: 'red',
                          width: 2
                        }),
                        fill: new ol.style.Fill({
                          color: 'rgba(255,0,0,0.2)'
                        })
                      })
                    };

                    var styleFunction = function (feature) {
                      return styles[feature.getGeometry().getType()];

                    };
 function polygononmap2(vectorSourcepolygon2,coodrinatespoly,typea,data,datasingle,assetid,dataimage) {
    let highlight;

        console.log(data)
        var geojsonpoly={};
        geojsonpoly = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetsearch",
                        data,assetid,dataimage,datasingle
                    },
                    "geometry": {
                        "type": typea,
                        "coordinates": coodrinatespoly
                    }
                }
            ]
        };

        var gjFormatpoly = new ol.format.GeoJSON({
            featureProjection: 'EPSG:3857',
            strategy: ol.loadingstrategy.bbox,
        });

        var featurespoly = gjFormatpoly.readFeatures(geojsonpoly);
        //vectorSourcepolygon2.addFeatures(featurespoly);
        //vectorSourcepolygon2.clear();

        var featureOverlay=new ol.layer.Vector({
            source: vectorSourcepolygon2,
            map: olMap,

//            style: function(feature, resolution){
//                                              var S1 =  new ol.style.Style({
//                                                        image: new ol.style.Icon({
//                                                               scale: .7, anchor: [0.5, 1],
//                                                               src: 'images/marker.png'
//                                                           })
//                                                      });
//
//                                              var S2 =  new ol.style.Style({
//                                                          fill: new ol.style.Fill({
//                                                              color: 'rgba(255,255,0, 1)'
//                                                          }),
//                                                          stroke: new ol.style.Stroke({
//                                                              color: 'rgba(255,255,0, 1)'
//                                                          })
//                                                      });
//                                              var S3 =  new ol.style.Style({
//                                                          fill: new ol.style.Fill({
//                                                              color: 'rgb(255,0,0,1)'
//                                                          }),
//                                                          stroke: new ol.style.Stroke({
//                                                              color: 'rgb(255,0,0,1)'
//                                                          })
//                                                      });
//                                              var N =  new ol.style.Style({
//                                                          fill: new ol.style.Fill({
//                                                              color: 'rgba(128,128,128, 1)'
//                                                          }),
//                                                          stroke: new ol.style.Stroke({
//                                                              color: 'rgba(128,128,128, 1)'
//                                                          })
//                                                      });
//                                              var NOA =  new ol.style.Style({
//                                                          fill: new ol.style.Fill({
//                                                              color: 'rgba(0,255,255, 1)'
//                                                          }),
//                                                          stroke: new ol.style.Stroke({
//                                                              color: 'rgba(0,255,255, 1)'
//                                                          })
//                                                      });
//
//
//                                              if (feature.N.data[0].categoryId == 29) {
//                                                  return [S1];
//                                              } else if(feature.get('suitability') == "S2") {
//                                                  return [S2];
//                                              }
//                                              else if(feature.get('suitability') == "S3") {
//                                                  return [S3];
//                                              }
//                                              else if(feature.get('suitability') == "N") {
//                                                  return [N];
//                                              }
//                                              else{
//                                                  return [NOA];
//                                              }
//                                   },
            style: styleFunction,

            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        vectorSourcepolygon2.addFeatures(featurespoly);
        //featureOverlay.getSource().addFeatures(featurespoly);
//
//        if (featurespoly !== highlight) {
//            if (highlight) {
//                featureOverlay.getSource().clear();
//              featureOverlay.getSource().removeFeatures(featurespoly);
//            }
//            if (featurespoly) {
//              featureOverlay.getSource().clear();
//              featureOverlay.getSource().addFeatures(featurespoly);
//            }
//            highlight = featurespoly;
//          }
          //featureOverlay.getSource().removeFeatures(featurespoly);
       // vectorSourcepolygon2.removeFeatures(featurespoly);

        olMap.getView().fit(vectorSourcepolygon2.getExtent(), { size: olMap.getSize(), maxZoom: 10 });
    }

 function catwiseassetmap(vectorSourcepolygon2,coodrinatespoly,typea,assetid) {

     let highlight;

        console.log(assetid)
         var geojsonpoly={};
         geojsonpoly = {
             "type": "FeatureCollection",
             "features": [
                 {
                     "type": "Feature",
                     "properties": {
                         "name": "assetsearch",
                            assetid
                     },
                     "geometry": {
                         "type": typea,
                         "coordinates": coodrinatespoly
                     }
                 }
             ]
         };

         var gjFormatpoly = new ol.format.GeoJSON({
             featureProjection: 'EPSG:3857',
             strategy: ol.loadingstrategy.bbox,
         });

         var featurespoly = gjFormatpoly.readFeatures(geojsonpoly);
         //vectorSourcepolygon2.addFeatures(featurespoly);
         //vectorSourcepolygon2.clear();


         vectorSourcepolygon2.addFeatures(featurespoly);
         //featureOverlay.getSource().addFeatures(featurespoly);
 //
 //        if (featurespoly !== highlight) {
 //            if (highlight) {
 //                featureOverlay.getSource().clear();
 //              featureOverlay.getSource().removeFeatures(featurespoly);
 //            }
 //            if (featurespoly) {
 //              featureOverlay.getSource().clear();
 //              featureOverlay.getSource().addFeatures(featurespoly);
 //            }
 //            highlight = featurespoly;
 //          }
           //featureOverlay.getSource().removeFeatures(featurespoly);
        // vectorSourcepolygon2.removeFeatures(featurespoly);

        // olMap.getView().fit(vectorSourcepolygon2.getExtent(), { size: olMap.getSize(), maxZoom: 10 });
     }

 function allasetmapped(vectorSourcepolygon2,coodrinatespoly,typea,data,datasingle,assetid,dataimage) {
let highlight;

        console.log(data)
        var geojsonpoly={};
        geojsonpoly = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetsearch",
                        data,assetid,dataimage,datasingle
                    },
                    "geometry": {
                        "type": typea,
                        "coordinates": coodrinatespoly
                    }
                }
            ]
        };

        var gjFormatpoly = new ol.format.GeoJSON({
            featureProjection: 'EPSG:3857',
            strategy: ol.loadingstrategy.bbox,
        });

        var featurespoly = gjFormatpoly.readFeatures(geojsonpoly);
        //vectorSourcepolygon2.addFeatures(featurespoly);
        vectorSourcepolygon2.clear();

        var featureOverlay=new ol.layer.Vector({
            source: vectorSourcepolygon2,
            map: olMap,


            style: styleFunction,

            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        vectorSourcepolygon2.addFeatures(featurespoly);
        //featureOverlay.getSource().addFeatures(featurespoly);
//
//        if (featurespoly !== highlight) {
//            if (highlight) {
//                featureOverlay.getSource().clear();
//              featureOverlay.getSource().removeFeatures(featurespoly);
//            }
//            if (featurespoly) {
//              featureOverlay.getSource().clear();
//              featureOverlay.getSource().addFeatures(featurespoly);
//            }
//            highlight = featurespoly;
//          }
          //featureOverlay.getSource().removeFeatures(featurespoly);
       // vectorSourcepolygon2.removeFeatures(featurespoly);

        //olMap.getView().fit(vectorSourcepolygon2.getExtent(), { size: olMap.getSize(), maxZoom: 10 });
    }
    function imageonmap(imgarr, asset) {

        var styleMarker2 = new ol.style.Style({
            image: new ol.style.Icon({
                    scale:1, anchor:[0.5,1],
                    src:'images/image_icon.png'
                   })
        });

        var featuresimage = []
        var asset_name = asset[0]

        asset_name += asset[1] ? ' (' + asset[1] + ')' : ''

        for(x of imgarr){
            featuresimage.push(new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(x.longitude), parseFloat(x.latitude)])),
              name: 'imageasset',
              imgdata: {
                  path: global_image_url+'/'+x.assetId+'/'+x.imageName,
                  name: asset_name
              }
            }))

        }





        var vectorSourceGraphics = new ol.source.Vector();
        vectorSourceGraphics.addFeatures(featuresimage);
//        new ol.layer.Vector({
//        map:olMap,
//        source:vectorSourceGraphics,
//        style:[styleMarker2],
//        updateWhileAnimating:true,
//        updateWhileInteracting:true
//
//        });

    var featureOverlayimage = new ol.layer.Vector({
        map:olMap,
        source:vectorSourceGraphics,
        style:[styleMarker2],
        updateWhileAnimating:true,
        updateWhileInteracting:true

        });
        //olMap.getView().fit(featureOverlayimage.getSource().getExtent(), { size: olMap.getSize(), maxZoom: 15 });

    }
    var popup = new ol.Overlay({
        element: document.getElementById('popup'),
    })
    olMap.addOverlay(popup)
    var popupmodal = new ol.Overlay({
      element:  document.getElementById('myModal'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });
//    var popupmodal = new ol.Overlay({
//            element: document.getElementById('modal-popup'),
//        })
        olMap.addOverlay(popupmodal)
         var container = document.getElementById('popup-data');
         var content1 = document.getElementById('popup-content');
         var closer = document.getElementById('popup-closer');

            var overlay = new ol.Overlay({
                element: container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            closer.onclick = function () {
                overlay.setPosition(undefined);
                closer.blur();

                return false;
            };

           olMap.addOverlay(overlay);

    var asset_viewer = $('#asset_viewer')


    var asset_viewer2 = $('#asset_viewer2')
    olMap.on('singleclick', assetclickevent);
    olMap.on('singleclick', jetty);
//    olMap.on('singleclick', Waterbody);
     olMap.on('singleclick', cycloneshelter);
      olMap.on('singleclick', fishlandingcenter);
     var jettyinfo = "";


    function assetclickevent(evt)
    {



            var view2 = olMap.getView();
            var viewResolution2 = view2.getResolution();
            var sourceodisha = mapapi.state_bnd_4k.getSource();

            var url2 = sourceodisha.getGetFeatureInfoUrl(
                              evt.coordinate, viewResolution2, view2.getProjection(),
                              {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50,'format_options':'callback:parseodisha'});//alert(url);
                                  $.ajax({
                                          type: "GET",
                                          url:url2,
                                          dataType: 'jsonp',
                                          jsonpCallback: 'parseodisha',
                                          contentType:'application/x-www-form-urlencoded; charset=GBK',
                                          success: function (responseodisha) {
                                          if(responseodisha.features.length>0){


                                                                 waterinfo ="";
                                                                  let assetinfo="";
                                                                   $("#pills-profile").html("");

                                                                 document.getElementById("popup-data").style.visibility = 'visible'
                                                                 $("#pills-profile-tab").hide()
                                                                  $("#pills-water-tab").hide()

                                                                   $("#pills-water").hide()
                                                                   // $("#pills-assetsearch-tab").hide()

                                                                  if(!$('#clearTool').is('.d-none')){
                                                                      return;
                                                                  }
                                                                 $('#content_waterbody_id').empty();
                                                                     var  content1="";
                                                  	                    var element = overlay.getElement();
                                                  	                    $(element).popover('dispose');
                                                                          var coordinate = evt.coordinate;
                                                                          var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
                                                                          // var hdms = ol.proj.toLonLat(coordinate);
                                                                          var watersource = mapapi.ofaris_waterbody.getSource();


                                                                        //var soiltexture= mapapi.wmslayer_soiltexture.getSource();
                                                                          var lng1 = parseFloat(coordinate[0]).toFixed(6);
                                                                          var lat1 = parseFloat(coordinate[1]).toFixed(6);
                                                                          var view = olMap.getView();
                                                                          var viewResolution = view.getResolution();
                                                                          var coordinatesNew = ol.proj.transform([evt.coordinate[0], evt.coordinate[1]], 'EPSG:3857', 'EPSG:4326');
                                                                          console.log("cordinates:" + coordinatesNew, $);
                                                                        //content1 = $('<div><p class="my-0">The location: </p></div>')
                                                                         content1 = $("#popup-content");

                                                                          var title = ''

                                                                            var kylinfo = "";
                                                                              $.ajax({
                                                                              type: "POST",
                                                                              url: "https://odisha4kgeo.in/index.php/mapview/showForestRevenueInfo",
                                                                              data: {cordinates: coordinatesNew},
                                                                              beforeSend: function( xhr ) {
                                                                                                       $('#searchLoader3').css("display", "block");
                                                                                                   },
                                                                              dataType : "json",
                                                                              success: function(data){
                                                                              	$('#searchLoader3').css("display", "none");
                                                                                       console.log(data)
                                                                                          kylinfo = "<table class='table table-striped tableq'>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>District</strong></td>";
                                                                                          kylinfo += "<td>"+ data.post.revenue[0].district_name +"</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Block</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.revenue[0].block_name + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Gram Panchayat</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.revenue[0].grampanchayat_name + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Village</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.revenue[0].revenue_village_name + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Thana NO</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.revenue[0].thanano + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Khata No</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.revenue[0].khatano + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Plot No</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.revenue[0].plotno_new + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Police Station</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.police[0].cctns_ps_n + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Land Type</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.ror[0].LandType + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Tenants</strong></td>";
                                                                                          kylinfo += "<td>" + data.post.ror[0].Owner + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "<tr>";
                                                                                          kylinfo += "<td style='color:#2216de;'><strong>Area (Ha.)</strong></td>";
                                                                                          kylinfo += "<td>" + (data.post.ror[0].Area_Acre /2.471).toFixed(2) + "</td>";
                                                                                          kylinfo += "</tr>";
                                                                                          kylinfo += "</table>";
                                                                                          $('#pills-contact').html(kylinfo);

                                                                                          },

                                                                                             error: function (jqXHR, textStatus, errorThrown)
                                                                                                                   {
                                                                                                                       //$.unblockUI();
                                                                                                                       alert('Server not responding!');
                                                                                                                       $('#searchLoader3').css("display", "none");
                                                                                                                   }
                                                                                               });



                                                          if(mapapi.ofaris_waterbody.N.visible == true)
                                              			{
                                              			 $("#pills-tab").removeClass('d-none');
                                                           $('#pills-profile').removeClass('d-none')
                                                           $('#pills-contact').removeClass('d-none')
                                                           $('#pills-home').removeClass('d-none')
                                                           $('#pills-water').removeClass('d-none')
                                              			var url = watersource.getGetFeatureInfoUrl(
                                                              			  evt.coordinate, viewResolution, view.getProjection(),
                                                              			  {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50,'format_options':'callback:parsewaterbody'});//alert(url);
                                                                              $.ajax({
                                                                                      type: "GET",
                                                                                      url:url,
                                                                                      dataType: 'jsonp',
                                                                                      jsonpCallback: 'parsewaterbody',
                                                                                      contentType:'application/x-www-form-urlencoded; charset=GBK',
                                                                                      success: function (data) {
                                                                                      if(data.features.length>0){
                                          //                                            $("#pills-tab").removeClass('d-none');
                                          //                                             $("#pills-profile-tab").show()
                                                                                        $('#imagedta').addClass('d-none')

                                          //                                          $('#pills-profile').removeClass('d-none')
                                          //                                           $('#pills-contact').removeClass('d-none')
                                          //                                           $('#pills-home').removeClass('d-none')
                                                                                      $("#pills-water-tab").show()
                                                                                       $("#pills-water").show()

                                                                                      var distidw= data.features[0].properties.dist_id;
                                                                                       var blockidw= data.features[0].properties.block_id;
                                                                                        var Gpidw= data.features[0].properties.gp_id;
                                                                                        var waterbody_id=data.features[0].properties.wb_id;
                                                                                          console.log(data.features[0].properties);
                                                                                        var   distance_railway_stations="";
                                                                                        var   distance_marketss="";
                                                                                        var soil_type="";
                                                                                        var gwlevel="";

                                                                                        var classtype="";
                                                                                 //getofarisinfo
                                                                                       $.ajax({
                                                                                                                type: "POST",
                                                                                                                url: "https://odisha4kgeo.in/index.php/mapview/getinfoOfaris",
                                                                                                                data: {cordinates: coordinatesNew,dist_id:distidw,block_id:blockidw,gp_id:Gpidw},
                                                                                                                dataType : "json",
                                                                                                                success: function(waterresponse){
                                                                                                                      // document.getElementById("content_district_kyfl_id").innerHTML = data.post.revenue[0].district_name;
                                                                                                                     console.log(waterresponse)
                                                                                                                       $('#soiltext').html(waterresponse.post.soil_texture[0].surface_texture);
                                                                                                                       $('#gwpst').html(waterresponse.post.ground_water_propspect[0].prospects);
                                                                                                                        $('#distdistance').text((waterresponse.post.distance_district_hq[0].distance/1000).toFixed(3) );
                                                                                                                         $('#blockdistance').text((waterresponse.post.distance_block_hq[0].distance/1000).toFixed(3));
                                                                                                                          $('#marketdistance').text((waterresponse.post.distance_market[0].distance/1000).toFixed(3));
                                                                                                                           $('#railwwaydistance').text((waterresponse.post.distance_railway_station[0].distance/1000).toFixed(3));
                                          //
                                                                                                    distance_railway_stationss=(waterresponse.post.distance_block_hq[0].distance/1000).toFixed(3);
                                                                                                    distance_marketss=(waterresponse.post.distance_market[0].distance/1000).toFixed(3);
                                                                                                    soil_type=waterresponse.post.soil_texture[0].surface_texture;
                                                                                                    gwlevel=waterresponse.post.ground_water_propspect[0].prospects;



                                                                                                                }
                                                                                                             })

                                                                                   //getofarisinfo



                                                                                      na="NA";
                                                                                     // classtype="NA";
                                                                                      category="NA";
                                                                                      Owernship_Type="NA";
                                                                                      owner_name="NA";
                                                                                      Dept="NA";
                                                                                      pvt="NA";
                                                                                      GOVT="NA";
                                                                                      AGENCIE="NA"
                                                                                      Usage_type="NA";
                                                                                      Annual_production="NA";
                                                                                      investment_5YR="NA";
                                                                                      schemes="NA";

                                                                                   var classifatcation_type= data.features[0].properties.classification_4;

                                                                                      waterinfo = "<div> <button id='btnrefresh' style='visibility:hidden;float:right;' class='btn'><i class='fa fa-refresh' aria-hidden='true'></i></button> <table class='table table-striped tableq' >";
//                                                                                      waterinfo += "<tr id='selyear' >";
//                                                                                      waterinfo += "<td style='color:#2216de;'><strong> Selected Year:</strong></td>";
//                                                                                      waterinfo += "<td ><select class='form-control form-control-sm' id='yearsel' aria-label='Default select example'><option  value='0'>Select Year</option>";
//                                                                                      waterinfo += "<option value='1'>2020</option>";
//                                                                                      waterinfo += "<option value='2' selected>2021</option></select> </td>";
//                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr id='areaac' style='visibility:visible'>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong> Area in Acre:</strong></td>";
                                                                                      waterinfo += "<td >"+ data.features[0].properties.area_ac.toFixed(3) +"</td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Soil Texture:</strong></td>";
                                                                                      waterinfo += "<td id='soiltext'>  </td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Type:</strong></td>";
                                                                                      waterinfo += "<td>" + data.features[0].properties.classification_4 + "</td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Class:</strong></td>";
                                                                                      waterinfo += "<td id='class_type'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Catagory:</strong></td>";
                                                                                      waterinfo += "<td id='cat_id'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Ownership Type:</strong></td>";
                                                                                      waterinfo += "<td id='ownert'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Name of the Owner:</strong></td>";
                                                                                      waterinfo += "<td id='ownern'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Usage Type:</strong></td>";
                                                                                      waterinfo += "<td id='usage_typee'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Annual Production:</strong></td>";
                                                                                      waterinfo += "<td id='annual_prod'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Investment in 5 year:</strong></td>";
                                                                                      waterinfo += "<td id='investment_five'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Schemes:</strong></td>";
                                                                                      waterinfo += "<td id='schemeidwb'> </td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Annual Min Temp:</strong></td>";
                                                                                      waterinfo += "<td id='anualmintemp'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Annual Max Temp:</strong></td>";
                                                                                      waterinfo += "<td id='anualmaxtemp'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Avg Rainfall:</strong></td>";
                                                                                      waterinfo += "<td id='avgrainfall'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Ground Water Prospect:</strong></td>";
                                                                                      waterinfo += "<td id='gwpst'> </td>";
                                                                                      waterinfo += "</tr>";
                                                                                       waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Distance From District HQ(Km):</strong></td>";
                                                                                      waterinfo += "<td id='distdistance'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Distance From Block HQ (Km):</strong></td>";
                                                                                      waterinfo += "<td id='blockdistance'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                       waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Distance From Market(Km):</strong></td>";
                                                                                      waterinfo += "<td id='marketdistance'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                       waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Distance From Railway Station(Km):</strong></td>";
                                                                                      waterinfo += "<td id='railwwaydistance'></td>";
                                                                                      waterinfo += "</tr>";
                                                                                       waterinfo += "<tr>";
                                                                                      waterinfo += "<td style='color:#2216de;'><strong>Fish  Species:</strong></td>";
                                                                                      waterinfo += "<td id='fish_specss'></td>";;
                                                                                      waterinfo += "</tr>";
                                                                                      waterinfo += "</table></div>";

                                                                                       waterinfo +="<button type='button' class='btn btn-primary' id='mybtnmodal' data-toggle='modal' data-target='#myModal'><i class='fa fa-plus' aria-hidden='true'></i>Add Attribute</button>";
                                                                                       waterinfo +=" <div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";
                                                                                       waterinfo +=" <div class='modal-dialog modal-dialog-centered' role='document'>";
                                                                                       waterinfo +="<div class='modal-content'>";
                                                                                       waterinfo +="<div class='modal-header'><button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
                                                                                       waterinfo +="<span aria-hidden='true'>&times;</span></button></div><div class='modal-body'>";
                                                                                      waterinfo += "<div class='row justify-content-center' id='m-content'> <div class='col-md-12'><span class='anchor' id='formUserEdit'></span>";
                                                                                      waterinfo += "<!-- form user info --> <div class='card card-outline-secondary'> <div class='card-header'><h3 class='mb-0'>Waterbody Details</h3>  </div>";
                                                                                      waterinfo += "  <div class='card-body' ><form autocomplete='off' class='form' role='form'>";
                                                                                      waterinfo +=" <div class='form-group row'><label class='col-lg-3 col-form-label form-control-label'>Class</label>   <div class='col-lg-9'>     <select class='form-control' id='MasterClass' size='0'> ";

                                                                                       waterinfo +="<option value='master_class'>Select Class</option> ";


                                                                                        waterinfo +="</select></div> </div>" ;
                                                                                         waterinfo +=" <div class='form-group row'>  <label class='col-lg-3 col-form-label form-control-label'>Catagory</label> <div class='col-lg-9'> <select class='form-control' id='mastercatagory' size='0'> ";

                                                                                        waterinfo +="<option value='master_cat'>  Select Catagory</option> ";
                                                                                        waterinfo +="</select></div> </div>" ;
                                                                                         // waterinfo +=" <div class='form-group row'>     <label class='col-lg-3 col-form-label form-control-label'>Investment (in last 5 years):</label>   <div class='col-lg-9'>    <input class='form-control' type='text' id='investment' >  </div> </div>";
                                                                                        waterinfo +=" <div class='form-group row'>  <label class='col-lg-3 col-form-label form-control-label'>Scheme  Type</label> <div class='col-lg-9'> <select class='form-control' id='select_scheme' size='0'> ";
                                                                                          waterinfo +="<option value='0'>Select Schemes</options>";


                                                                                         waterinfo +="</select></div> </div>" ;
                                                                                        waterinfo +=" <div class='form-group row'> <label class='col-lg-3 col-form-label form-control-label'>Owner Type</label> <div class='col-lg-9'> <select class='form-control' id='owner_type2' size='0'> ";
                                                                                          waterinfo +="<option value='0'>Select Owner Type</options>";
                                                                                           waterinfo +="<option value='1'>INDIVIDUAL</options>";
                                                                                            waterinfo +="<option value='2'>ORGANIZATION</options>";
                                                                                         waterinfo +="</select></div> </div>" ;
                                                                                          waterinfo +=" <div class='form-group row' id='ownerregiddiv'>     <label class='col-lg-3 col-form-label form-control-label'>Owner Registration No</label>   <div class='col-lg-9'>    <input class='form-control' id='ownerregid' type='text' >  </div> </div>";
                                                                                          waterinfo +=" <div class='form-group row' id='ownernamediv'>     <label class='col-lg-3 col-form-label form-control-label'>Owner Name</label>   <div class='col-lg-9'>    <input class='form-control' id='ownername' type='text' >  </div> </div>";
                                                                                        waterinfo +=" <div class='form-group row' id='onwership_type_div'>  <label class='col-lg-3 col-form-label form-control-label'>Ownership</label> <div class='col-lg-9'> <select class='form-control' id='ownership_type' size='0'> ";
                                                                                         waterinfo +="<option value='0'>Select Ownership</options>";
                                                                                          waterinfo +="<option value='1'>GOVERNMENT</options>";
                                                                                           waterinfo +="<option value='2'>PRIVATE</options>";
                                                                                        waterinfo +="</select></div> </div>" ;
                                                                                        waterinfo +=" <div class='form-group row' id='govtpvtsel'>  <label id='dynamicdrop' class='col-lg-3 col-form-label form-control-label'>Organaisation/Agency</label> <div class='col-lg-9'> <select class='form-control' id='getdeptagencies' size='0'> ";
                                                                                         waterinfo +="<option value='0'>Select Organaisation</options>";

                                                                                          waterinfo +="</select></div> </div>" ;
                                                                                          //dept end
                                                                                            //agencies
                                                                                            waterinfo +=" <div class='form-group row' id='agenciessel'>  <label id='agneciesid' class='col-lg-3 col-form-label form-control-label'>Organaisation/Agency</label> <div class='col-lg-9'> <select class='form-control '  id='agenciesis' size='0'> ";
                                                                                           waterinfo +="<option value='0'>Select Agency</options> ";

                                                                                            waterinfo +="</select></div> </div>" ;

                                                                                            //agencies

                                                                                              //usge type


                                          //                                              waterinfo +=" <div class='form-group row'>  <label class='col-lg-3 col-form-label form-control-label'>Usage  Type</label> <div class='col-lg-9'> <select class='form-control' id='usage_type' size='0'> ";
                                          //                                               waterinfo +="<option value='0'>Select Usage Type</options> ";
                                          //
                                          //                                                 waterinfo +="<option value='2'>Hatchling</options> ";
                                          //                                                   waterinfo +="<option value='3'>General Purpose</options> ";
                                          //                                                     waterinfo +="<option value='4'>Multi Purpose</options> ";
                                          //
                                          //                                              waterinfo +="</select></div> </div>" ;

                                                                                        waterinfo +=" <div id='dynamicaddat'></div>";




                                          //                                             waterinfo +=" <div class='form-group row'>     <label class='col-lg-3 col-form-label form-control-label'>Annual min Temp:</label>   <div class='col-lg-9'>    <input class='form-control' type='text' id='avg_min_temp' >  </div> </div>";
                                          //
                                          //                                             waterinfo +=" <div class='form-group row'>     <label class='col-lg-3 col-form-label form-control-label'>Annual max Temp:</label>   <div class='col-lg-9'>     <input class='form-control' type='text' id='avg_max_temp'> ";
                                          //                                             waterinfo +=" </div> </div>";
                                          //                                              waterinfo +=" <div class='form-group row'>     <label class='col-lg-3 col-form-label form-control-label'>Avg Rainfall:</label>   <div class='col-lg-9'>    <input class='form-control' id='rainfall' type='text' >  </div> </div>";
                                                                                          waterinfo +=" <div class='form-group row'>  <label class='col-lg-3 col-form-label form-control-label'>Fish Species</label> <div class='col-lg-9'> <select class='form-control ' multiple name='[]'   id='fishspecies' size='0'> ";
                                                                                         // waterinfo +="<option value='0'>Select Species</options> ";
                                                                                         waterinfo +="</select></div> </div>" ;

                                                                                        waterinfo +="</div>"; //modal end
                                                                                       waterinfo +=" <div class='modal-footer'><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button><button type='button' id='saveWaterbody' class='btn btn-primary'>Save changes</button></div>";

                                                                                      waterinfo +="    </div> </div></div>";






                                                                          $.ajax({
                                                                              type: "GET",
                                                                              url: service_url + '/getSpeciesByDeptId/1',
                                                                              dataType : "json",
                                                                              success: function(response){
                                                                              selectspecis = $('#fishspecies');
                                                                                $('#fishspecies').html('');
                                                                                    var placeholder = "Select Species";
                                                                                //$('#fishspecies').html('<option value="species">Select Species</option>');
                                                                             // console.log(response);
                                                                              for(i=0;i<response.post[0].length;i++)
                                                                                 {
                                                                                  selectspecis.append("<option class='ddindent' value='" + response.post[0][i].speciesId + "'>" + response.post[0][i].speciesName + "</option>");
                                                                                 }
                                                                                       //$('#fishspecies').select2('destroy');
                                                                                     $("#fishspecies").select2({
                                                                                          width: '100%',
                                                                                          placeholder: placeholder
                                                                                     });


                                                                                      }



                                                                          });


                                                                                      $('#pills-water').html(waterinfo);
                                                                                        var deptidfisheriesss=1;
                                                                                            $.ajax({
                                                                                                   type: "GET",
                                                                                                    url: service_url + '/getAssetClassMByDeptId/' + deptidfisheriesss,

                                                                                                   dataType : "json",
                                                                                                   success: function(response2){
                                                                                                   selectmasterclass = $('#MasterClass');
                                                                                                    $('#MasterClass').html('');
                                                                                                     $('#MasterClass').html('<option value="0">Select Class</option>');
                                                                                                      $('#mastercatagory').html('');
                                                                                                     $('#mastercatagory').html('<option value="tests">Select Catagory</option>');
                                                                                                   console.log(response2);
                                                                                                   for(i=0;i<response2.post[0].length;i++)
                                                                                                   {
                                                                                                     if(response2.post[0][i].name_e=="BRACKISH WATER" || response2.post[0][i].name_e=="FRESH WATER"){
                                                                                                      selectmasterclass.append("<option class='ddindent2' value='" + response2.post[0][i].id + "'>" + response2.post[0][i].name_e + "</option>");
                                                                                                     }

                                                                                                   }


                                                                                                  }
                                                                                            });
                                                                                          var data_wb;
                                                                                             //getassetbywbid
                                                                                          var  wb_idd=  waterbody_id
                                                                                                data_wb = {

                                                                                                        "waterBodyId" : wb_idd,

                                                                                                        "year": ""

                                                                                                        }


                                                                                              $.ajax({
                                                                                                              type: "POST",
                                                                                                               url: service_url + '/assetwaterbodylist',
                                                                                                              data: JSON.stringify(data_wb),
                                                                                                              contentType:"application/json",
                                                                                                              dataType : "json",
                                                                                                              success: function(response){

                                                                                                               console.log("wbid:" + response);
                                                                                                               if(response.status==0)
                                                                                                               {
                                                                                                               $('#class_type').text("Not Tagged")
                                                                                                               $('#cat_id').text("Not Tagged")
                                                                                                               $('#ownert').text("Not Tagged")
                                                                                                               $('#ownern').text("Not Tagged")
                                                                                                               $('#usage_typee').text("Not Tagged")
                                                                                                               $('#annual_prod').text("Not Tagged")
                                                                                                               $('#investment_five').text("Not Tagged")
                                                                                                               $('#fish_specss').text("Not Tagged")
                                                                                                               $('#anualmintemp').text("Not Tagged")
                                                                                                               $('#anualmaxtemp').text("Not Tagged")
                                                                                                               $('#avgrainfall').text("Not Tagged")
                                                                                                               $('#schemeidwb').text("Not Tagged")


                                                                                                               }
                                                                                                               else{
                                                                                                               if(response.post[0].species_list[0].length==0)
                                                                                                               {
                                                                                                               $('#fish_specss').text("Not Available")
                                                                                                               }

                                                                                                                   $('#mybtnmodal').hide()

                                                                                                                  $('#class_type').text(response.post[0].asset_list[0].className)
                                                                                                                  $('#cat_id').text(response.post[0].asset_list[0].categoryName)
                                                                                                                  $('#ownert').text(response.post[0].asset_attribute_list[0][0].ownerType)
                                                      //                                                            if(response.post[0].asset_attribute_list[0][0].ownership=="Select Ownership Type")
                                                      //                                                            {
                                                      //                                                             $('#ownern').text
                                                      //                                                            }
                                                                                                                if(response.post[0].asset_attribute_list[0][0].ownerType=="INDIVIDUAL"){
                                                                                                               $('#ownern').text(response.post[0].asset_attribute_list[0][0].ownerName)

                                                                                                              }
                                                                                                              if(response.post[0].asset_attribute_list[0][0].ownerType=="ORGANIZATION"){
                                                                                                                $('#ownern').text(response.post[0].asset_attribute_list[0][0].ownership)

                                                                                                                }
                                                                                                                  //$('#ownern').text(response.post[0].asset_attribute_list[0][0].ownership)
                                                                                                                  $('#usage_typee').text(response.post[0].asset_attribute_list[0][0].usageType)
                                                                                                                  $('#annual_prod').text(response.post[0].asset_attribute_list[0][0].approxAnnualProduction)
                                                                                                                  $('#investment_five').text(response.post[0].asset_attribute_list[0][0].investmentIn5Yrs)
                                                                                                                  $('#schemeidwb').text(response.post[0].asset_attribute_list[0][0].schemeName)
                                                                                                                  $('#fish_specss').text(response.post[0].species_list[0][0].speciesName)
                                                                                                                  $('#anualmintemp').text(response.post[0].asset_attribute_list[0][0].temperatureMinInCelsius)
                                                                                                                  $('#anualmaxtemp').text(response.post[0].asset_attribute_list[0][0].temperatureMaxInCelsius)
                                                                                                                  $('#avgrainfall').text(response.post[0].asset_attribute_list[0][0].avgAnnualRainfall)

                                                                                                               }




                                                                                                             }
                                                                                                  });

                                                                                             //getassetbywbid
                                                                                           //dropdown on change
                                                                                           $('#yearsel').on('change', function() {
                                                                                                                   data_wb2 = {

                                                                                                                                                         "waterBodyId" : wb_idd,

                                                                                                                                                         "year": yearsel.options[yearsel.selectedIndex].text

                                                                                                                       }
                                                                                                                $.ajax({
                                                                                                                                 type: "POST",
                                                                                                                                  url: service_url + '/assetwaterbodylist',
                                                                                                                                 data: JSON.stringify(data_wb2),
                                                                                                                                 contentType:"application/json",
                                                                                                                                 dataType : "json",
                                                                                                                                 success: function(response){

                                                                                                                                  console.log("wbid2020:" + response);




                                                                                                                              }
                                                                                                                        });
                                                                                             });

                                                                                        $('#mybtnmodal').hide()
                                          //                                              if(localStorage.getItem("authorityArea")=="2"){
                                          //                                                   $('#mybtnmodal').show()
                                          //                                              }
                                          //                                              else{
                                          //                                               $('#mybtnmodal').hide()
                                          //                                              }
                                                                                       if(classifatcation_type =="Lakes/ponds" || classifatcation_type =="Tanks" || classifatcation_type =="Aquaculture ponds/pisciculture" ){
                                                                                                   $('#mybtnmodal').show()
                                                                                            }
                                                                                      $('#areaac').show();
                                                                                     $('#mybtnmodal').click(function(){
                                          //                                                $('#fishspecies').html('');
                                          //                                                 $('#fishspecies').html('<option value="species">Select Species</option>');

                                                                                     		$('#myModal').modal('show')


                                                                                     		$(govtpvtsel).hide()
                                                                                     		$(agenciessel).hide()
                                                                                     		$(ownerregiddiv).hide()
                                                                                     		$(ownernamediv).hide()
                                                                                     		$(onwership_type_div).hide()

                                                                                     		var deptidfisheries=1;
                                                                                          var deptidArd=2;
                                                                                            var classMaster;
                                                                                            var classtype;
                                                                                              var tttt;
                                                                                            $( "#mybtnmodal" ).click(function() {

                                                                                            });

                                                                                           $( document ).ready(function() {


                                                                                                  ///

                                                                                               $.ajax({
                                                                                                          type: "GET",
                                                                                                           url: service_url + '/getAllScheme',

                                                                                                          dataType : "json",
                                                                                                          success: function(response){
                                                                                                           selectschemesag = $('#select_scheme');
                                                                                                            $('#select_scheme').html('');
                                                                                                            $('#select_scheme').html('<option value="testsss">Select Scheme</option>');
                                                                                                          console.log(response);
                                                                                                          for(i=0;i<response.post[0].length;i++)
                                                                                                             {

                                                                                                             selectschemesag.append("<option class='ddindent' value='" + response.post[0][i].schemeId + "'>" + response.post[0][i].name + "</option>");
                                                                                                             }



                                                                                                         }
                                                                                                     });
                                                                                                  //

                                                                                           });




                                                                                              $('#MasterClass').change(function Getcatagory(e) {
                                                                                              $.ajax({
                                                                                                     type: "GET",
                                                                                                      url: service_url + '/getCategoryByClassId/' + MasterClass.options[MasterClass.selectedIndex].value,

                                                                                                     dataType : "json",
                                                                                                     success: function(response){
                                                                                                      var selectmastercatogory = $('#mastercatagory');
                                                                                                       $('#mastercatagory').html('');
                                                                                                       $('#mastercatagory').html('<option value="testss">Select Catagory</option>');
                                                                                                     console.log(response);
                                                                                                     for(i=0;i<response.post.length;i++)
                                                                                                     {
                                                                                                      if(response.post[i].name_e=="BW TANKS & POND" || response.post[i].name_e=="FW TANKS & POND"){
                                                                                                      selectmastercatogory.append("<option class='ddindent' value='" + JSON.stringify(response.post[i].category_id) + "'>" + response.post[i].name_e + "</option>");
                                                                                                      tttt= response.post[i].classCatMappingId;

                                                                                                     }
                                                                                                     }


                                                                                                    }
                                                                                              });

                                                                                              });

                                                                                                $('#mastercatagory').change(function Getdynamicattribute(e) {
                                                                                                var allValues = {};
                                                                                                  //dynamicattribute
                                                                                                  $.ajax({
                                                                                                                 type: "GET",
                                                                                                                 url: service_url + '/allattribute/' + mastercatagory.options[mastercatagory.selectedIndex].value,
                                                                                                                 success: function(data){
                                                                                                                     var adddynamic="";
                                                                                                                     var option;

                                                                                                                     console.log(data);
                                                                                                                     for (var j=0;j<data.post[0].length;j++) {
                                                                                                                     var str="";
                                                                                                                                   if (data.post[0][j].dataType == 'boolean' ){
                                                                                                                                                 adddynamic += '<div class="form-group row">'+
                                                                                                                                                     '<label class="col-lg-3 col-form-label form-control-label" for="' + data.post[0][j].displayName + '">' + data.post[0][j].displayName + '</label>'+
                                                                                                                                                     '<div class="col-lg-9"><input type="checkbox" value="false" id="' + data.post[0][j].name +
                                                                                                                                                     '" required autocomplete="off"/>'+
                                                                                                                                                     '</div></div>';


                                          //                                                                                                            $('#ets').change(function(){
                                          //                                                                                                                  if(this.checked)
                                          //                                                                                                                  $('#ets').prop('checked', true);
                                          //
                                          //                                                                                                                   else
                                          //                                                                                                                      $('#ets').prop('checked', false);
                                          //                                                                                                             });
                                          //                                                                                                             $('#existence_reservoir').change(function(){
                                          //                                                                                                                   if(this.checked)
                                          //                                                                                                                    $('#existence_reservoir').prop('checked', true);
                                          //
                                          //                                                                                                                    else
                                          //                                                                                                                       $('#existence_reservoir').prop('checked', false);
                                          //                                                                                                              });
                                          //                                                                                                             $('#utilization_for_fingerlings_production').change(function(){
                                          //                                                                                                                    if(this.checked)
                                          //                                                                                                                        $('#utilization_for_fingerlings_production').prop('checked', true);
                                          //                                                                                                                     else
                                          //                                                                                                                        $('#utilization_for_fingerlings_production').prop('checked', false);
                                          //                                                                                                               });
                                          //                                                                                                          $('#utilization_for_fish_prod').change(function(){
                                          //                                                                                                                  if(this.checked)
                                          //                                                                                                                    $('#utilization_for_fingerlings_production').prop('checked', true);
                                          //                                                                                                                   else
                                          //                                                                                                                       $('#utilization_for_fingerlings_production').prop('checked', false);
                                          //                                                                                                             });


                                                                                                                                     }

                                                                                                                                         else if (data.post[0][j].dropdown == true){
                                          //                                                                                               var ttttt=data.post[0][j].value
                                          //                                                                                                                 var ddloptions={ttttt };

                                                                                                                                                if(data.post[0][j].attributeId!=384  && data.post[0][j].attributeId!=387 && data.post[0][j].attributeId!=385 && data.post[0][j].attributeId!=383  &&data.post[0][j].attributeId!=85&& data.post[0][j].attributeId!=386 && data.post[0][j].attributeId!=388 && data.post[0][j].attributeId!=310 && data.post[0][j].attributeId!=83){




                                                                                                                                                           adddynamic += '<div class="form-group row">'+
                                                                                                                                                               '<label class="col-lg-3 col-form-label form-control-label" for="' + data.post[0][j].displayName + '">' + data.post[0][j].displayName + '</label>'+
                                                                                                                                                               '<div class="col-lg-9"><select class="form-control ddldynamic"  id="' + data.post[0][j].name + '">"';

                                          //                                                                                                                        adddynamic += '<div class="form-group row">'+
                                          //                                                                                                                                                                                                                                          '<label class="textcase" for="' + data.post[0][j].displayName + '"><b>' + data.post[0][j].displayName + '*</b></label>&nbsp;'+
                                          //                                                                                                                                                                                                                                          '<div class="col-lg-9"><select class="form-control ddldynamic"  id="' + data.post[0][j].name + '"><option value="'+data.post[0][j].attributeId+ '">'+data.post[0][j].value+'</option>"' +
                                          //                                                                                                                                                                                                                                          '"</select>'+
                                          //                                                                                                                                                                                                                                          '</div></div>';
                                          //                                                                                                                      option ='<option value="'+data.post[0][j].attributeId+'">'+data.post[0][j].value+'</option>';
                                          //                                                                                                                      $('.ddldynamic').append(option);
                                          //                                                                                                                      var s = $('<select/>');
                                          //                                                                                                                      var o = [1, 2, 3];
                                          //                                                                                                                      for (var i in o) {
                                          //
                                          //                                                                                                               }

                                                                                                                                             str = data.post[0][j].value;
                                                                                                                                             if(str!=null)
                                                                                                                                             {
                                                                                                                                             var temp = new Array();
                                                                                                                                            // This will return an array with strings "1", "2", etc.
                                                                                                                                            temp = str.split(",");
                                                                                                                                            option="";
                                                                                                                                            for(i=0;i<temp.length;i++)
                                                                                                                                               {
                                                                                                                                                 option+="<option class='ddindent3' value='" + temp[i] + "'>" + temp[i]  + "</option>";

                                                                                                                                                }

                                                                                                                                               adddynamic += option + '</select></div></div>';

                                                                                                                                             }
                                                                                                                                     if(str==null)
                                                                                                                                        {
                                                                                                                                        var temp = new Array();
                                                                                                                                       // This will return an array with strings "1", "2", etc.
                                                                                                                                       temp = str;
                                                                                                                                       option="";

                                                                                                                                            option+="<option class='ddindent3' value='" + temp + "'>" + temp  + "</option>";


                                                                                                                                          adddynamic += option + '</select></div></div>';

                                                                                                                                        }

                                                                                                                                      }

                                                                                                                                   }


                                                                                                                                             else{
                                                                                                                                             if(data.post[0][j].attributeId!=307 && data.post[0][j].attributeId!=308 && data.post[0][j].attributeId!=366 && data.post[0][j].attributeId!=364 && data.post[0][j].attributeId!=365 && data.post[0][j].attributeId!=367 && data.post[0][j].attributeId!=369 && data.post[0][j].attributeId!=383 && data.post[0][j].attributeId!=379 && data.post[0][j].attributeId!=376 && data.post[0][j].attributeId!=377 && data.post[0][j].attributeId!=374 && data.post[0][j].attributeId!=375 && data.post[0][j].attributeId!=83 && data.post[0][j].attributeId!=84){
                                                                                                                                                  adddynamic += "<div class='form-group row'>"+
                                                                                                                                                "<label class='col-lg-3 col-form-label form-control-label'>" + data.post[0][j].displayName + "</label> <div class='col-lg-9'>" +
                                                                                                                                                "<input type='text' class='form-control' id=" + data.post[0][j].name + " 'placeholder=' "+ data.post[0][j].displayName + " required autocomplete='off'/>"+
                                                                                                                                               "</div></div>";
                                                                                                                                                 }

                                                                                                                                             }


                                          //                                                                               option+='<option value='+data["post"][j]["name"]+'>'+data['post'][j]["displayName"]+'</option>';
                                          //                                                                               namearray[data["post"][j]["name"]]=data['post'][j]["displayName"];
                                          //                                                                               datatypearr[data["post"][j]["name"]]=data['post'][j]["dataType"];
                                                                                                                     }
                                                                                                                     $('#dynamicaddat').html(adddynamic);
                                          //                                                                           $('#attr').multiselect('rebuild');
                                          //                                                                           idarray=[];
                                          //                                                                           $('#querytool').html("");
                                                                                                                 }
                                                                                                               });

                                                                                                  //dynamic attribute


                                                                                                           });






                                                                                             if(ownership_type.options[ownership_type.selectedIndex].value=="0"){
                                                                                              $(govtpvtsel).hide()
                                                                                             $(agenciessel).hide()

                                                                                             }
                                                                                             $('#owner_type2').change(function Getownertype_details(e){
                                                                                             var selectownert = $('#owner_type2');
                                                                                              var ownertypet= owner_type2.options[owner_type2.selectedIndex].value
                                                                                               if(ownertypet=="1")
                                                                                               {
                                                                                               $(ownerregiddiv).show()
                                                                                               $(ownernamediv).show()
                                                                                               $(onwership_type_div).hide()
                                                                                                 $(govtpvtsel).hide()
                                                                                                  $(agenciessel).hide()
                                                                                               }
                                                                                               if(ownertypet=="2")
                                                                                               {
                                                                                                $(ownerregiddiv).hide()
                                                                                                $(ownernamediv).hide()
                                                                                                $(onwership_type_div).show()
                                                                                                 $(govtpvtsel).hide()
                                                                                                $(agenciessel).hide()
                                                                                               }
                                                                                             });



                                                                                               $('#ownership_type').change(function Getowner_details(e){
                                                                                               var selectowner = $('#ownership_type');

                                                                                               var ownertype= ownership_type.options[ownership_type.selectedIndex].value
                                                                                                 if(ownertype=="2"){
                                                                                                      $(govtpvtsel).hide()
                                                                                                      $(agenciessel).show()
                                                                                                      var postData = {"deptId":1, "ownership":"PRIVATE" };
                                                                                                      var deptfisheries2=1;
                                                                                                       $.ajax({

                                                                                                                 type: "GET",

                                                                                                                 url: service_url + '/agencies/' + deptfisheries2 + "/PRIVATE",


                                                                                                                 dataType : "json",
                                                                                                                 success: function(response){

                                                                                                                  var selectmasterdeptsag2 = $('#agenciesis');
                                                                                                                   $('#agenciesis').html('');
                                                                                                                   $('#agenciesis').html('<option value="testsss">Select Agency</option>');
                                                                                                                 console.log(response);
                                                                                                                 for(i=0;i<response.post[0].length;i++)
                                                                                                                    {

                                                                                                                    selectmasterdeptsag2.append("<option class='ddindent' value='" + response.post[0][i].agencyId + "'>" + response.post[0][i].name + "</option>");
                                                                                                                    }

                                          //                                                                                     $("#agenciesis").select2({
                                          //                                                                                                             width: '100%',
                                          //
                                          //                                                                                                               });

                                                                                                                }
                                                                                                          });
                                                                                                 }
                                                                                                 if(ownertype=="1"){
                                                                                                             $(agenciessel).hide()
                                                                                                              $(govtpvtsel).show()
                                                                                                         $.ajax({

                                                                                                                       type: "GET",

                                                                                                                       url: service_url + '/agencies/' + deptfisheries2 + "/GOVERNMENT",


                                                                                                                       dataType : "json",
                                                                                                                       success: function(response){

                                                                                                                        var selectmasterdeptsag = $('#getdeptagencies');
                                                                                                                         $('#getdeptagencies').html('');
                                                                                                                         $('#getdeptagencies').html('<option value="testsss">Select Organaisation</option>');
                                                                                                                       console.log(response);
                                                                                                                       for(i=0;i<response.post[0].length;i++)
                                                                                                                          {

                                                                                                                          selectmasterdeptsag.append("<option class='ddindent' value='" + response.post[0][i].agencyId + "'>" + response.post[0][i].name + "</option>");
                                                                                                                          }



                                                                                                                      }
                                                                                                        });




                                                                                                   }

                                                                                               });


                                                                                          //get all specis



                                                                                          //asset entry
                                                  function formatDate(date) {
                                                         var d = new Date(date),
                                                         month = '' + (d.getMonth() + 1),
                                                         day = '' + d.getDate(),
                                                         year = d.getFullYear();
                                                         t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() +"." + d.getMilliseconds() ;

                                                         if (month.length < 2)
                                                         month = '0' + month;
                                                         if (day.length < 2)
                                                         day = '0' + day;

                                                         return [year, month, day].join('-') + " " + t ;

                                                         }

                                                         function formatYear(year) {
                                                                        var d = new Date(year),
                                                                        month = '' + (d.getMonth() + 1),
                                                                        day = '' + d.getDate(),
                                                                        year = d.getFullYear();


                                                                        return [year2] ;

                                                                        }

                                                                  $( "#saveWaterbody" ).click(function() {

                                                                                            Swal.fire({
                                                                                                       title: 'Are You Sure?',

                                                                                                       inputAttributes: {
                                                                                                           autocapitalize: 'off'
                                                                                                       },
                                                                                                       showCancelButton: true,
                                                                                                       confirmButtonText: 'ok',
                                                                                                       cancelButtonText: 'cancel',
                                                                                                       allowOutsideClick: false
                                                                                                   }).then((result) => {
                                                                                                       if (result.dismiss !== 'cancel') {

                                                                                                           var assetAttribute3;
                                                                                                                               var textfish = $('#fishspecies option:selected').toArray().map(item => item.value).join();

                                                                                                                               var organisation2 ="";
                                                                                                                              var ownertype2= ownership_type.options[ownership_type.selectedIndex].value


                                                                                                                                    if(ownertype2=="1"){

                                                                                                                                         organisation2= parseInt($('#getdeptagencies  :selected').val())
                                                                                                                                    }
                                                                                                                                    if(ownertype2=="2")
                                                                                                                                    {

                                                                                                                                  organisation2= parseInt($('#agenciesis  :selected').val())
                                                                                                                                    }

                                                                                                                                var catcl=JSON.parse($('#mastercatagory  :selected').val());

                                                                                                                                if($('#mastercatagory').val() == "61"){
                                                                                                                                    var organisation3 ="";
                                                                                                                                   var ownertype3= ownership_type.options[ownership_type.selectedIndex].value


                                                                                                                                         if(ownertype3=="1"){

                                                                                                                                              organisation3= parseInt($('#getdeptagencies  :selected').val())
                                                                                                                                         }
                                                                                                                                         if(ownertype3=="2")
                                                                                                                                         {

                                                                                                                                       organisation3= parseInt($('#agenciesis  :selected').val())
                                                                                                                                         }


                                                                                                                                       if( $('#ownership_type  :selected').val()!="0")
                                                                                                                                        {
                                                                                                                                          ownershipss=$('#ownership_type  :selected').text()
                                                                                                                                        }
                                                                                                                                        else{
                                                                                                                                              ownershipss="";
                                                                                                                                        }
                                                                                                                                       if( $('#owner_type2  :selected').val()!="0")
                                                                                                                                       {
                                                                                                                                         own_t=$('#owner_type2  :selected').text()
                                                                                                                                       }
                                                                                                                                       else{
                                                                                                                                             own_t="";
                                                                                                                                       }

                                                                                                                                       if($('#avg_annual_rainfall').val()=="")
                                                                                                                                       {
                                                                                                                                          rainfall1=0.0;

                                                                                                                                       }
                                                                                                                                       else
                                                                                                                                       {
                                                                                                                                         rainfall1=parseFloat($('#avg_annual_rainfall').val());
                                                                                                                                       }

                                                                                                                                        assetAttribute3={


                                                                                                                                                  "avgAnnualRainfall": rainfall1,
                                                                                                                                                  "ownerType":own_t,
                                                                                                                                                  "ownership":ownershipss,
                                                                                                                                                  "organizationId":organisation3,
                                                                                                                                                  "approxAnnualProduction": parseInt($('#approx_annual_production').val()),
                                                                                                                                                  "temperatureMinInCelsius": parseInt($('#temperature_min_in_celsius').val()),
                                                                                                                                                  "temperatureMaxInCelsius": parseInt($('#temperature_max_in_celsius').val()),
                                                                                                                                                  "schemeId": parseInt($('#select_scheme  :selected').val()),
                                                                                                                                                  "distanceFromRailwayStationInKm":distance_railway_stationss,
                                                                                                                                                  "distanceFromMarketInKm":distance_marketss,
                                                                                                                                                  "investmentIn_5Yrs": parseInt($('#investment_in_5_yrs').val()),
                                                                                                                                                  "usageType":$('#usage_type  :selected').text(),
                                                                                                                                                  "ownerRegistrationId":parseInt($('#ownerregid').val()),
                                                                                                                                                   "ownerName":$('#ownername').val(),
                                                                                                                                                   "utilizationForFryProd":$('#utilization_for_fry_prod').is(':checked'),
                                                                                                                                                   "utilizationForFishProd":$('#utilization_for_fish_prod').is(':checked'),
                                                                                                                                                   "utilizationForFingerlingsProduction":$('#utilization_for_fingerlings_production').is(':checked'),
                                                                                                                                                   "productionType":$('#production_type').val(),
                                                                                                                                                   "typeOfTank":$('#type_of_tank  :selected').text(),
                                                                                                                                                   "yearOfConstruction":parseInt($('#year_of_construction').val()),
                                                                                                                                                   "waterSource":$('#water_source  :selected').text(),
                                                                                                                                                   "soilType":soil_type,
                                                                                                                                                   "groundWaterLevel":gwlevel,
                                                                                                                                                   "year": new Date().getFullYear(),
                                                                                                                                                   "waterAvailability":$('#water_availability  :selected').text(),
                                                                                                                                                   //"fishSpecies":textfish
                                                                                                                                                }
                                                                                                                                                console.log(assetAttribute3)

                                                                                                                                      }
                                                                                                                                 if($('#mastercatagory').val() == "29"){
                                                                                                                                var organisation4 ="";
                                                                                                                                var ownertype4= ownership_type.options[ownership_type.selectedIndex].value


                                                                                                                                      if(ownertype4=="1"){

                                                                                                                                           organisation3= parseInt($('#getdeptagencies  :selected').val())
                                                                                                                                      }
                                                                                                                                      if(ownertype4=="2")
                                                                                                                                      {

                                                                                                                                    organisation4= parseInt($('#agenciesis  :selected').val())
                                                                                                                                      }


                                                                                                                                    if( $('#ownership_type  :selected').val()!="0")
                                                                                                                                     {
                                                                                                                                       ownershipss=$('#ownership_type  :selected').text()
                                                                                                                                     }
                                                                                                                                     else{
                                                                                                                                           ownershipss="";
                                                                                                                                     }
                                                                                                                                    if( $('#owner_type2  :selected').val()!="0")
                                                                                                                                    {
                                                                                                                                      own_t=$('#owner_type2  :selected').text()
                                                                                                                                    }
                                                                                                                                    else{
                                                                                                                                          own_t="";
                                                                                                                                    }

                                                                                                                                    if($('#avg_annual_rainfall').val()=="")
                                                                                                                                    {
                                                                                                                                       rainfall1=0.0;

                                                                                                                                    }
                                                                                                                                    else
                                                                                                                                    {
                                                                                                                                      rainfall1=parseFloat($('#avg_annual_rainfall').val());
                                                                                                                                    }

                                                                                                                                     assetAttribute3={


                                                                                                                                               "avgAnnualRainfall": rainfall1,
                                                                                                                                               "caaRegistrationNo":$('#caa_registration_no').val(),
                                                                                                                                               "existenceReservoir":$('#existence_reservoir').is(':checked'),
                                                                                                                                                "ets":$('#ets').is(':checked'),
                                                                                                                                                "utilizedFor":$('#utilized_for  :selected').text(),

                                                                                                                                               "ownerType":own_t,
                                                                                                                                               "ownership":ownershipss,
                                                                                                                                               "organizationId":organisation4,
                                                                                                                                               "approxAnnualProduction": parseInt($('#approx_annual_production').val()),
                                                                                                                                               "temperatureMinInCelsius": parseInt($('#temperature_min_in_celsius').val()),
                                                                                                                                               "temperatureMaxInCelsius": parseInt($('#temperature_max_in_celsius').val()),
                                                                                                                                               "schemeId": parseInt($('#select_scheme  :selected').val()),
                                                                                                                                               "distanceFromRailwayStationInKm":distance_railway_stationss,
                                                                                                                                               "distanceFromMarketInKm":distance_marketss,
                                                                                                                                               "investmentIn_5Yrs": parseInt($('#investment_in_5_yrs').val()),
                                                                                                                                               "usageType":$('#usage_type  :selected').text(),
                                                                                                                                               "ownerRegistrationId":parseInt($('#ownerregid').val()),
                                                                                                                                                "ownerName":$('#ownername').val(),

                                                                                                                                                "utilizationForFingerlingsProduction":$('#utilization_for_fingerlings_production').is(':checked'),
                                                                                                           //                                                                         "productionType":$('#production_type').val(),
                                                                                                           //                                                                         "typeOfTank":$('#type_of_tank  :selected').text(),
                                                                                                                                                "yearOfConstruction":parseInt($('#year_of_construction').val()),
                                                                                                                                                "waterSource":$('#water_source  :selected').text(),
                                                                                                                                                "soilType":soil_type,
                                                                                                                                                "groundWaterLevel":gwlevel,
                                                                                                                                                "year": new Date().getFullYear(),
                                                                                                                                                 "waterAvailability":$('#water_availability  :selected').text(),
                                                                                                                                             //   "wateravalibility":"",
                                                                                                                                                //"fishSpecies":textfish
                                                                                                                                             }
                                                                                                                                             console.log(assetAttribute3)

                                                                                                                                 }
                                                                                                                               var assetData = {
                                                                                                                                             "assetName" : "waterbody" ,

                                                                                                                                             "deptId" : deptidfisheries,

                                                                                                                                             "clsCatMappingId" :  tttt,

                                                                                                                                             "classId" : parseInt($('#MasterClass  :selected').val()),

                                                                                                                                             "categoryId" : catcl,

                                                                                                                                             "assetCode" : waterbody_id.toString(), //Warebody id

                                                                                                                                             "description" : "",

                                                                                                                                             "waterBodyId": waterbody_id,

                                                                                                                                             "schemeId" : parseInt($('#select_scheme  :selected').val()),

                                                                                                                                             "longitude" : coordinatesNew[0],

                                                                                                                                             "latitude" : coordinatesNew[1],

                                                                                                                                             "altitude" : 0.0,

                                                                                                                                             "accuracy" : 0.0,

                                                                                                                                             "inchargeName" : "",

                                                                                                                                             "inchargePhone" : 0,

                                                                                                                                             "inchargeImage" : "",

                                                                                                                                             "inchargeDesignation" : "",

                                                                                                                                             "surveyorId" : parseInt(localStorage.getItem("userId")), // Login session user id

                                                                                                                                             "surveyorImage" : "",
                                                                                                                                             "asset_area_type":"P",

                                                                                                                                            "deviceCaptureTime":formatDate(Date())

                                                                                                                                             }

                                                                                                                                      var assetLocations = [];
                                                                                                                                      jsonobjasset = {
                                                                                                                                                        "point_no": "1",
                                                                                                                                                        "lat": coordinatesNew[1],
                                                                                                                                                        "lon": coordinatesNew[0],
                                                                                                                                                        "alt": 0.0,
                                                                                                                                                        "acc": 0.0,
                                                                                                                                                        "deviceCaptureTime":formatDate(Date())
                                                                                                                                                    }
                                                                                                                                      assetLocations.push(jsonobjasset)



                                                                                                                                           var assetImages=[]
                                                                                                                                           var assetAttribute=assetAttribute3;
                                                                                                           //                                                                    var assetAttribute={
                                                                                                           //
                                                                                                           //
                                                                                                           //                                                                               "avgAnnualRainfall": parseFloat($('#rainfall').val()),
                                                                                                           //                                                                               "ownerType":$('#owner_type  :selected').text(),
                                                                                                           //                                                                               "ownership":$('#ownership_type  :selected').text(),
                                                                                                           //                                                                               "organizationId":organisation2,
                                                                                                           //                                                                               "approxAnnualProduction": parseInt($('#annual_pro').val()),
                                                                                                           //                                                                               "temperatureMinInCelsius": parseInt($('#avg_min_temp').val()),
                                                                                                           //                                                                               "temperatureMaxInCelsius": parseInt($('#avg_max_temp').val()),
                                                                                                           //                                                                               "schemeId": parseInt($('#select_scheme  :selected').val()),
                                                                                                           //                                                                               "distanceFromRailwayStationInKm":distance_railway_stationss,
                                                                                                           //                                                                               "distanceFromMarketInKm":distance_marketss,
                                                                                                           //                                                                               "investmentIn_5_yrs": parseInt($('#investment').val()),
                                                                                                           //                                                                               "usageType":$('#usage_type  :selected').text(),
                                                                                                           //                                                                               "ownerRegistrationId":parseInt($('#ownerregid').val()),
                                                                                                           //                                                                                "ownerName":$('#ownername').val(),
                                                                                                           //                                                                                "utilizationForFishProd":false,
                                                                                                           //                                                                                "utilizationForFishProd":false,
                                                                                                           //                                                                                "utilizationForFingerlingsProduction":false,
                                                                                                           //                                                                                "yearOfConstruction":2021,
                                                                                                           //                                                                                "waterSource":"",
                                                                                                           //                                                                                "soilType":soil_type,
                                                                                                           //                                                                                "groundWaterLevel":gwlevel,
                                                                                                           //                                                                                "year": 2021,
                                                                                                           //                                                                                "fishSpecies":textfish
                                                                                                           //                                                                                   }
                                                                                                                                   var  assetFishSpecies = {
                                                                                                                                              "fishSpecies":textfish

                                                                                                                                       }


                                                                                                                   const formData = new FormData();
                                                                                                                   formData.append('assetData', new Blob([JSON.stringify(assetData)], {
                                                                                                                       type: "application/json"
                                                                                                                   }));
                                                                                                                   formData.append('assetImages', new Blob([JSON.stringify(assetImages)], {
                                                                                                                       type: "application/json"
                                                                                                                   }));
                                                                                                                   formData.append('assetAttribute', new Blob([JSON.stringify(assetAttribute)], {
                                                                                                                       type: "application/json"
                                                                                                                   }));
                                                                                                                   formData.append('assetLocations', new Blob([JSON.stringify(assetLocations)], {
                                                                                                                       type: "application/json"
                                                                                                                   }));
                                                                                                                   formData.append('assetFishSpecies', new Blob([JSON.stringify(assetFishSpecies)], {
                                                                                                                           type: "application/json"
                                                                                                                   }));






                                                                                                           var jsonData = {"assetData":assetData,"assetLocations":assetLocations,"assetImages":assetImages,"assetAttribute":assetAttribute};


                                                                                                                           $.ajax({
                                                                                                                                      url: service_url + "/insertAsset2",
                                                                                                                                     type: "post",
                                                                                                                                      // Ignore contentType
                                                                                                                                     contentType: false,
                                                                                                                                     processData: false,
                                                                                                                                     dataType: "json",
                                                                                                                                     data: formData,
                                                                                                                                      //contentType: 'multipart/form-data',
                                                                                                                                      success: function(data){
                                                                                                                                      console.log(data)
                                                                                                                                          if (data.post[0] == "pending"){
                                                                                                                                              document.getElementById("btnrefresh").style.visibility = 'visible';

                                                                                                                                              Swal.fire({
                                                                                                                                                    text: 'Successfully Asset Tagged!',
                                                                                                                                                    icon: 'success',
                                                                                                                                                    confirmButtonText: 'OK'
                                                                                                                                              }).then(
                                                                                                                                                       function () { $("#myModal .close").click();

                                                                                                                                                        $('#mybtnmodal').hide()

                                                                                                                                                        },
                                                                                                                                                       function () { return false; });

                                                                                                                                                $( "#btnrefresh" ).click(function() {
                                                                                                                                                 $.ajax({
                                                                                                                                                                type: "POST",
                                                                                                                                                                 url: service_url + '/assetwaterbodylist',
                                                                                                                                                                data: JSON.stringify(data_wb),
                                                                                                                                                                contentType:"application/json",
                                                                                                                                                                dataType : "json",
                                                                                                                                                                success: function(response){

                                                                                                                                                                 console.log("wbid:" + response);
                                                                                                                                                                 if(response.status==0)
                                                                                                                                                                 {
                                                                                                                                                                 $('#class_type').text("Not Tagged")
                                                                                                                                                                 $('#cat_id').text("Not Tagged")
                                                                                                                                                                 $('#ownert').text("Not Tagged")
                                                                                                                                                                 $('#ownern').text("Not Tagged")
                                                                                                                                                                 $('#usage_typee').text("Not Tagged")
                                                                                                                                                                 $('#annual_prod').text("Not Tagged")
                                                                                                                                                                 $('#investment_five').text("Not Tagged")
                                                                                                                                                                 $('#fish_specss').text("Not Tagged")
                                                                                                                                                                 $('#anualmintemp').text("Not Tagged")
                                                                                                                                                                 $('#anualmaxtemp').text("Not Tagged")
                                                                                                                                                                 $('#avgrainfall').text("Not Tagged")
                                                                                                                                                                 $('#schemeidwb').text("Not Tagged")


                                                                                                                                                                 }
                                                                                                                                                                 else{
                                                                                                                                                                 if(response.post[0].species_list[0].length==0)
                                                                                                                                                                 {
                                                                                                                                                                 $('#fish_specss').text("Not Available")
                                                                                                                                                                 }

                                                                                                                                                                     $('#mybtnmodal').hide()

                                                                                                                                                                    $('#class_type').text(response.post[0].asset_list[0].className)
                                                                                                                                                                    $('#cat_id').text(response.post[0].asset_list[0].categoryName)
                                                                                                                                                                    $('#ownert').text(response.post[0].asset_attribute_list[0][0].ownerType)
                                                                                                                                                                    if(response.post[0].asset_attribute_list[0][0].ownerType=="INDIVIDUAL"){
                                                                                                                                                                     $('#ownern').text(response.post[0].asset_attribute_list[0][0].ownerName)

                                                                                                                                                                    }
                                                                                                                                                                    if(response.post[0].asset_attribute_list[0][0].ownerType=="ORGANIZATION"){
                                                                                                                                                                      $('#ownern').text(response.post[0].asset_attribute_list[0][0].ownership)

                                                                                                                                                                      }

                                                                                                           //                                                            if(response.post[0].asset_attribute_list[0][0].ownership=="Select Ownership Type")
                                                                                                           //                                                            {
                                                                                                           //                                                             $('#ownern').text
                                                                                                           //                                                            }

                                                                                                                                                                    $('#usage_typee').text(response.post[0].asset_attribute_list[0][0].usageType)
                                                                                                                                                                    $('#annual_prod').text(response.post[0].asset_attribute_list[0][0].approxAnnualProduction)
                                                                                                                                                                    $('#investment_five').text(response.post[0].asset_attribute_list[0][0].investmentIn5Yrs)
                                                                                                                                                                    $('#schemeidwb').text(response.post[0].asset_attribute_list[0][0].schemeName)
                                                                                                                                                                    $('#fish_specss').text(response.post[0].species_list[0][0].speciesName)
                                                                                                                                                                    $('#anualmintemp').text(response.post[0].asset_attribute_list[0][0].temperatureMinInCelsius)
                                                                                                                                                                    $('#anualmaxtemp').text(response.post[0].asset_attribute_list[0][0].temperatureMaxInCelsius)
                                                                                                                                                                    $('#avgrainfall').text(response.post[0].asset_attribute_list[0][0].avgAnnualRainfall)

                                                                                                                                                                 }
                                                                                                                                                               }
                                                                                                                                                    });
                                                                                                                                               });
                                                                                                                                          }

                                                                                                                                          else{
                                                                                                                                              console.log(data.errorMessage);
                                                                                                                                          }
                                                                                                                                      }
                                                                                                                                  });

                                                                                                       }
                                                                                                      else
                                                                                                       {
                                                                                                          return false;

                                                                                                       }
                                                                                                   })



                                                                                   });




                                                                                     	});



                                                                                  }

                                                                                }

                                                                                  });


                                              			}

                                          //waterbodydeatils
                                                              var ft = [];
                                                         olMap.forEachFeatureAtPixel(evt.pixel, function(feature){
                                                                          console.log(feature);

                                                                          ft.push(feature);
                                                                          console.log(ft);
                                                                          let assetinfob="";
                                                                          let assetinfo="";
                                                                           if(ft.length > 2)
                                                                           {
                                                                           assetidaa = ft[0].N.assetid;
                                                                           }
                                                                           if(ft.length==1)
                                                                           {
                                                                           assetidaa = ft[0].N.assetid;
                                                                           }

                                                                          let featureProps = feature.getProperties()

                                                                          let data=null

                                                                          switch(featureProps.name){
                                                                              case 'assetploygon':
                                                                               document.getElementById("pills-profile-tab").style.display = "block";
                                                                              // document.getElementById("pills-profile").style.display = "block";
                                                                              $("#pills-tab").removeClass('d-none');
                                                                              $("#pills-profile-tab").show()
                                                                               $('#imagedta').addClass('d-none')

                                                                            $('#pills-profile').removeClass('d-none')
                                                                            $('#pills-contact').removeClass('d-none')
                                                                            $('#pills-home').removeClass('d-none')
                                                                            $('#pills-water').removeClass('d-none')

                                                                           data = featureProps.data
                                                                           assetattributelistcat1=featureProps.additionalAttribute
                                                                            assetattributelistcat=featureProps.additionalAttribute[0]
                                                                           imgdata2=featureProps.dataimage
                                                                            title = data.assetName


                                                                               if(data.assetCode){
                                                                                   title += ' (Code: ' + data.assetCode + ')'
                                                                               }



                                                    if(assetattributelistcat1.categoryId=29)
                                                                           {

                                                                               assetinfob="";
                                          //                                      assetinfob += "<tr>";
                                          //                                      assetinfob += "<td style='color:#2216de;'><strong>Soil Texture:</strong></td>";
                                          //                                      assetinfob += "<td>" + assetattributelistcat.soilType+ "</td>";
                                          //                                      assetinfob += "</tr>";
                                                                                assetinfob += "<tr>";
                                                                                assetinfob += "<td style='color:#2216de;'><strong>Avarage Rainfall</strong></td>";
                                                                                assetinfob += "<td>" + assetattributelistcat.avgAnnualRainfall+ "</td>";
                                                                                assetinfob += "</tr>";
                                                                                assetinfob += "<tr>";
                                                                                assetinfob += "<td style='color:#2216de;'><strong>Ownership Type:</strong></td>";
                                                                                assetinfob += "<td>" + assetattributelistcat.ownerType+ "</td>";
                                                                                assetinfob += "</tr>";
                                                                                assetinfob += "<tr>";
                                                                               assetinfob += "<td style='color:#2216de;'><strong>Usage Type:</strong></td>";
                                                                               assetinfob += "<td>" + assetattributelistcat.usageType+ "</td>";
                                                                               assetinfob += "</tr>";
                                                                            assetinfob += "<tr>";
                                                                           assetinfob += "<td style='color:#2216de;'><strong>Annual Production:</strong></td>";
                                                                           assetinfob += "<td>" + assetattributelistcat.approxAnnualProduction+ "</td>";
                                                                           assetinfob += "</tr>";
                                                                            assetinfob += "<tr>";
                                                                           assetinfob += "<td style='color:#2216de;'><strong>Investment in 5 Yrs:</strong></td>";
                                                                           assetinfob += "<td>" + assetattributelistcat.investmentIn5Yrs+ "</td>";
                                                                           assetinfob += "</tr>";
                                                                            assetinfob += "<tr>";
                                                                           assetinfob += "<td style='color:#2216de;'><strong>Annual Min Temp:</strong></td>";
                                                                           assetinfob += "<td>" + assetattributelistcat.temperatureMinInCelsius+ "</td>";
                                                                           assetinfob += "</tr>";
                                                                             assetinfob += "<tr>";
                                                                           assetinfob += "<td style='color:#2216de;'><strong>Annual Max Temp:</strong></td>";
                                                                           assetinfob += "<td>" + assetattributelistcat.temperatureMaxInCelsius+ "</td>";
                                                                           assetinfob += "</tr>";
                                                                            assetinfob += "<tr>";
                                                                           assetinfob += "<td style='color:#2216de;'><strong>Year Of Construction:</strong></td>";
                                                                           assetinfob += "<td>" + assetattributelistcat.yearOfConstruction+ "</td>";
                                                                           assetinfob += "</tr>";
                                          //                                    assetinfob += "<tr>";
                                          //                                 assetinfob += "<td style='color:#2216de;'><strong>Ground Water Prospect:</strong></td>";
                                          //                                 assetinfob += "<td>" + assetattributelistcat.groundWaterLevel+ "</td>";
                                          //                                 assetinfob += "</tr>";
                                                                             assetinfob += "<tr>";
                                                                           assetinfob += "<td style='color:#2216de;'><strong>Utilised For:</strong></td>";
                                                                           assetinfob += "<td>" + assetattributelistcat.utilizedFor+ "</td>";
                                                                           assetinfob += "</tr>";
                                          //                                   assetinfob += "<tr>";
                                          //                                 assetinfob += "<td style='color:#2216de;'><strong>Distance From Market (kM):</strong></td>";
                                          //                                 assetinfob += "<td>" + assetattributelistcat.distanceFromMarketInKm+ "</td>";
                                          //                                 assetinfob += "</tr>";
                                          //                                    assetinfob += "<tr>";
                                          //                                 assetinfob += "<td style='color:#2216de;'><strong>Distance From Railway Station (kM):</strong></td>";
                                          //                                 assetinfob += "<td>" + assetattributelistcat.distanceFromRailwayStationInKm+ "</td>";
                                          //                                 assetinfob += "</tr>";
                                                                             assetinfob += "<tr>";
                                                                           assetinfob += "<td style='color:#2216de;'><strong>Water Source</strong></td>";
                                                                           assetinfob += "<td>" + assetattributelistcat.waterSource+ "</td>";
                                                                           assetinfob += "</tr>";

                                                                           }
                                                        if(assetattributelistcat1.categoryId=61)
                                                               {

                                                                  assetinfob="";
                                          //                          assetinfob += "<tr>";
                                          //                          assetinfob += "<td style='color:#2216de;'><strong>Soil Texture:</strong></td>";
                                          //                          assetinfob += "<td>" + assetattributelistcat.soilType+ "</td>";
                                          //                          assetinfob += "</tr>";
                                                                    assetinfob += "<tr>";
                                                                    assetinfob += "<td style='color:#2216de;'><strong>Avarage Rainfall</strong></td>";
                                                                    assetinfob += "<td>" + assetattributelistcat.avgAnnualRainfall+ "</td>";
                                                                    assetinfob += "</tr>";
                                                                    assetinfob += "<tr>";
                                                                    assetinfob += "<td style='color:#2216de;'><strong>Ownership Type:</strong></td>";
                                                                    assetinfob += "<td>" + assetattributelistcat.ownerType+ "</td>";
                                                                    assetinfob += "</tr>";
                                                                    assetinfob += "<tr>";
                                                                   assetinfob += "<td style='color:#2216de;'><strong>Usage Type:</strong></td>";
                                                                   assetinfob += "<td>" + assetattributelistcat.usageType+ "</td>";
                                                                   assetinfob += "</tr>";
                                                                assetinfob += "<tr>";
                                                               assetinfob += "<td style='color:#2216de;'><strong>Annual Production:</strong></td>";
                                                               assetinfob += "<td>" + assetattributelistcat.approxAnnualProduction+ "</td>";
                                                               assetinfob += "</tr>";
                                                                assetinfob += "<tr>";
                                                               assetinfob += "<td style='color:#2216de;'><strong>Investment in 5 Yrs:</strong></td>";
                                                               assetinfob += "<td>" + assetattributelistcat.investmentIn5Yrs+ "</td>";
                                                               assetinfob += "</tr>";
                                                                assetinfob += "<tr>";
                                                               assetinfob += "<td style='color:#2216de;'><strong>Annual Min Temp:</strong></td>";
                                                               assetinfob += "<td>" + assetattributelistcat.temperatureMinInCelsius+ "</td>";
                                                               assetinfob += "</tr>";
                                                                 assetinfob += "<tr>";
                                                               assetinfob += "<td style='color:#2216de;'><strong>Annual Max Temp:</strong></td>";
                                                               assetinfob += "<td>" + assetattributelistcat.temperatureMaxInCelsius+ "</td>";
                                                               assetinfob += "</tr>";
                                                                assetinfob += "<tr>";
                                                               assetinfob += "<td style='color:#2216de;'><strong>Year Of Construction:</strong></td>";
                                                               assetinfob += "<td>" + assetattributelistcat.yearOfConstruction+ "</td>";
                                                               assetinfob += "</tr>";
                                          //                        assetinfob += "<tr>";
                                          //                     assetinfob += "<td style='color:#2216de;'><strong>Ground Water Prospect:</strong></td>";
                                          //                     assetinfob += "<td>" + assetattributelistcat.groundWaterLevel+ "</td>";
                                          //                     assetinfob += "</tr>";

                                          //                       assetinfob += "<tr>";
                                          //                     assetinfob += "<td style='color:#2216de;'><strong>Distance From Market (kM):</strong></td>";
                                          //                     assetinfob += "<td>" + assetattributelistcat.distanceFromMarketInKm+ "</td>";
                                          //                     assetinfob += "</tr>";
                                          //                        assetinfob += "<tr>";
                                          //                     assetinfob += "<td style='color:#2216de;'><strong>Distance From Railway Station (kM):</strong></td>";
                                          //                     assetinfob += "<td>" + assetattributelistcat.distanceFromRailwayStationInKm+ "</td>";
                                          //                     assetinfob += "</tr>";
                                          //                       assetinfob += "<tr>";
                                                               assetinfob += "<td style='color:#2216de;'><strong>Water Source</strong></td>";
                                                               assetinfob += "<td>" + assetattributelistcat.waterSource+ "</td>";
                                                               assetinfob += "</tr>";









                                                               }
                                                                                    assetinfo = "<table class='table table-striped tableq'>";
                                                                                  assetinfo += "<tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><strong>Zone Name</strong></td>";
                                                                                  assetinfo += "<td>"+ data.zoneName +"</td>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "<tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><strong>District</strong></td>";
                                                                                  assetinfo += "<td>" + data.districtName + "</td>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><strong>Block</strong></td>";
                                                                                  assetinfo += "<td>" + data.blockName + "</td>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><strong>GP</strong></td>";
                                                                                  assetinfo += "<td>" + data.gpName + "</td>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><strong>Village</strong></td>";
                                                                                  assetinfo += "<td>" + data.villageName + "</td>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><strong>Class</strong></td>";
                                                                                  assetinfo += "<td>" + data.className + "</td>";
                                                                                  assetinfo += "</tr>";
                                                                                   assetinfo += "</tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><strong>Catagory</strong></td>";
                                                                                  assetinfo += "<td>" + data.categoryName + "</td>";
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo +=assetinfob;
                                                                                  assetinfo += "</tr>";
                                                                                  assetinfo += "<td style='color:#2216de;'><div class='picture-gallery-div3 border-bottom pb-2 d-none'> ";
                                                                                  assetinfo += "<p class='text-muted'><strong>Photo Gallery</strong></p><div class='picture-gallery3'></div>";
                                                                                   assetinfo += " <div class='text-center'><a href='#'>All Photos</a></div>";
                                                                                   assetinfo += "</div></td>";

                                                                                   assetinfo += "</tr>";
                                                                                  assetinfo += "</table>";

                                                                                     $('#pills-profile').html(assetinfo);
                                                                                     if(imgdata2.length==0)
                                                                                          {
                                                                                          content1.find('.picture-gallery-div3').addClass('d-none')
                                                                                          }
                                                                                            let photocnt3 = Math.min(3, imgdata2.length)
                                                                                            if(photocnt3 > 0){
                                                                                             $('.picture-gallery3').empty();
                                                                                                let pict3 = content1.find('.picture-gallery3')
                                                                                                content1.find('.picture-gallery-div3').removeClass('d-none')
                                                                                                for(let i = 0; i < photocnt3; i++){
                                                                                                    let p = global_image_url +'/'+ imgdata2[i].assetId+'/'+ imgdata2[i].imageName
                                                                                                    pict3.append($('<div class="col" />').html($('<img class="img-thumbnail"  />').attr('src', p)))
                                                                                                }
                                                                                                //pict3.append('<div class="clearfix"></div>')
                                                                                                content1.find('.picture-gallery-div3 a').on('click', function(e){
                                                                                                    e.preventDefault()
                                                                                                    let photoarr = []
                                                                                                    imgdata2.forEach((p) => {
                                                                                                        photoarr.push({src: global_image_url +'/'+p.assetId+'/'+p.imageName})
                                                                                                    })
                                                                                                    $.fancybox.open(photoarr, {loop : true})
                                                                                                })

                                                                                            }
                                                                                      $("#pills-profile-tab").show()

                                                                                  break;

                                                                              case 'assetline':
                                                                                  title = 'Asset Line'
                                                                                    $("#pills-profile-tab").show()

                                                                                  break;

                                                                              case 'imageasset':
                                                                                $("#pills-tab").addClass('d-none');
                                                                                  $('#pills-profile').addClass('d-none')
                                                                                   $('#pills-contact').addClass('d-none')
                                                                                   $('#pills-home').addClass('d-none')
                                                                                   $('#pills-water').addClass('d-none')


                                                                     title = featureProps.imgdata.name
                                                                      imageinfo="";
                                                                      imageinfo += "<div ><img id='td_img' style='height: 246px; margin: 10px; padding: 6px;box-shadow: 9px 6px 14px #ae9c9c;' class='img-fluid image-error' /><br /></div>";


                                                                      $('#imagedta').removeClass('d-none')
                                                                      $('#imagedta').html(imageinfo);
                                                                      $('#td_img').attr('src', featureProps.imgdata.path);
                                                                       $(".image-error").on("error", function () {
                                                                              $(this).attr("src", "images/no_image.png");
                                                                        });




                                                                                  break;

                                                                  case 'assetpoint':
                                                                                $("#pills-tab").removeClass('d-none');
                                                                              $("#pills-profile-tab").show()
                                                                               $('#imagedta').addClass('d-none')

                                                                            $('#pills-profile').removeClass('d-none')
                                                                            $('#pills-contact').removeClass('d-none')
                                                                            $('#pills-home').removeClass('d-none')
                                                                            $('#pills-water').removeClass('d-none')
                                                                                  data2 = featureProps.data
                                                                              //assetattributelistcat1=featureProps.additionalAttribute
                                                                               assetattributelistcat=featureProps.additionalAttribute[0]
                                                                              imgdata2=featureProps.dataimage
                                                                               title = data2.assetName
                                                                              let asset_id=data2.assetId;
                                                                               var assetinfo2="";

                                                                                  if(data2.assetCode){
                                                                                      title += ' (Code: ' + data2.asset_id + ')'
                                                                                  }



                                                                                        var asset_body = {
                                                                                                              "assetId" : asset_id,
                                                                                                              "year" : "",
                                                                                                              "deptId" : 1
                                                                                                           }
                                                                                          $.ajax({
                                                                                                 url: service_url + '/getAssetViewByAssetId/',
                                                                                                 type:"POST",
                                                                                                 data: JSON.stringify(asset_body),
                                                                                                 dataType: 'json',
                                                                                                 contentType:'application/json',
                                                                                                 //data:JSON.stringify({"assetId":assetId}),
                                                                                                 success: function(response){
                                                                                                     if(response.status != 0){

                                                                                                             appendAssetDetails(response);

                                                                                                             }
                                                                                                             else{
                                                                                                                 console.log(response);
                                                                                                             }
                                                                                                         },
                                                                                                         error: function (response) {
                                                                                                         }
                                                                                                     });

                                                                                           function createScheme(c,v){
                                                                                                            if(c){
                                                                                                                var str = '';
                                                                                                                $.ajax({
                                                                                                                    url: service_url + '/getAllScheme',
                                                                                                                    type: 'GET',
                                                                                                                    dataType: 'json',
                                                                                                                    data: {},
                                                                                                                    success: function (d) {
                                                                                                                       var ar =d.post[0];
                                                                                                                        //var str2 = '';
                                                                                                                        $.each(ar, function (r, scheme) {
                                                                                                                            str += '<option value="' + ar[r].schemeId + '"';
                                                                                                                            if(v == ar[r].schemeId){
                                                                                                                                str += ' selected="selected"';
                                                                                                                            }
                                                                                                                            str += '>' + ar[r].name + '</option>' ;
                                                                                                                        });
                                                                                                                        $("#scheme_id").append(str);
                                                                                                                        $("#scheme_id").prop('disabled',true);

                                                                                                                    },
                                                                                                                    error: function () {
                                                                                                                       // alert('Error!');
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }

                                                                                                        function getAgencyPrivate(agencyValue){
                                                                                                          var deptId=localStorage.getItem("deptId");
                                                                                                            $.ajax({
                                                                                                                url: service_url + '/agencies/' + deptId + '/' + 'PRIVATE',
                                                                                                                type: 'GET',
                                                                                                                dataType: 'json',
                                                                                                                data: {},
                                                                                                                success: function (d) {
                                                                                                                    var ar =d.post[0];
                                                                                                                    var str = '';
                                                                                                                    $.each(ar, function(i, agency){
                                                                                                                        //str += '<option value="' + ar[i].agencyId + '"';
                                                                                                                        if(agencyValue == ar[i].agencyId){
                                                                                                                            str += ar[i].name;
                                                                                                                        }
                                                                                                                        //str += '>' + ar[i].name + '</option>' ;
                                                                                                                    });
                                                                                                                    $("#organization_id").val(str);
                                                                                                                },
                                                                                                                error: function () {
                                                                                                                   // alert('Error!');
                                                                                                                }
                                                                                                            });
                                                                                                        }

                                                                                                        function getAgencyGovt(){
                                                                                                          var deptId=localStorage.getItem("deptId");
                                                                                                            $.ajax({
                                                                                                                url: service_url + '/agencies/' + deptId + '/' + 'GOVERNMENT',
                                                                                                                type: 'GET',
                                                                                                                dataType: 'json',
                                                                                                                data: {},
                                                                                                                success: function (d) {
                                                                                                                    var ar =d.post[0];
                                                                                                                    var str = '';
                                                                                                                    $.each(ar, function(i, agency){
                                                                                                                        //str += '<option value="' + ar[i].agencyId + '"';
                                                                                                                            if(agencyValue == ar[i].agencyId){
                                                                                                                                str += ar[i].name;
                                                                                                                            }
                                                                                                                            //str += '>' + ar[i].name + '</option>' ;
                                                                                                                        });
                                                                                                                    $("#organization_id").text(str);
                                                                                                                },
                                                                                                                error: function () {
                                                                                                                   // alert('Error!');
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        function appendAssetDetails(response){
                                                                                                            var asset_attribute_list = response.post[0].asset_attribute_list;
                                                                                                            var asset_dropdown_list = response.post[0].asset_dropdown_list;
                                                                                                            var ADDITIONAL_ATTRIBUTE_VALUE = response.post[0].additional_attribute_value[0][0];
                                                                                                            var str = '';
                                                                                                            var fields = {};

                                                                                                            const CamelCase = str => {
                                                                                                              let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                                                                                                                              .reduce((result, word) => result + capitalize(word.toLowerCase()))
                                                                                                              return string.charAt(0).toLowerCase() + string.slice(1)
                                                                                                            };

                                                                                                            const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

                                                                                                            for(var i=0; i<asset_attribute_list.length;i++){

                                                                                                                var attribNameID = asset_attribute_list[i].name;
                                                                                                                var camelAttributeNameID = CamelCase(attribNameID);
                                                                                                                var attribName = asset_attribute_list[i].displayName;


                                                                                                                if(asset_attribute_list[i].dataType == 'boolean'){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                        '<label class="textcase col-sm-4 col-form-label" for="' + attribNameID + '">' + attribName + '</label>&nbsp;'+

                                                                                                                        '<input type="checkbox"  class="col-sm-6 form-control form-control-sm" id="' + attribNameID + '" checked=' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] +
                                                                                                                        ' required autocomplete="off"/>'+

                                                                                                                        '</div>';
                                                                                                                    }

                                                                                                                else if(asset_attribute_list[i].dataType == 'numeric'){
                                                                                                                     str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                           '<label class="textcase col-form-label col-sm-4" for="' + attribNameID + '">' + attribName + '</label>&nbsp;'+

                                                                                                                            '<input type="number" class="form-control form-control-sm col-sm-6"   id="' + attribNameID + '" value="'+ ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                                                                                                                               '"placeholder="' + attribName + '" required autocomplete="off"/>'+

                                                                                                                           '</div>';
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "scheme_id" && asset_attribute_list[i].dropdown == true){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                   '<label class="textcase col-sm-5 col-form-label" for="' + asset_attribute_list[i].name + '">' + asset_attribute_list[i].displayName + '</label>'+

                                                                                                                       '<input type="text" class="form-control form-control-sm col-sm-6"   id="' + attribNameID + '" value="'+ ADDITIONAL_ATTRIBUTE_VALUE['schemeName']+
                                                                                                                                                   '"placeholder="' + attribName + '" required autocomplete="off"/>'+



//                                                                                                                   '<select class="form-control col-form-label form-control-sm col-sm-6" style="background-color:##00AAFF;"'+
//                                                                                                                   'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"><option value="0">-- Select Scheme --</option></select>
                                                                                                                    '</div>';
                                                                                                                    var inputfield = $(str);
                                                                                                                    $("#dynamicFields").append(inputfield);
//                                                                                                                    schemeCheck = 1;
//                                                                                                                    schemeValue = ADDITIONAL_ATTRIBUTE_VALUE["schemeId"];
//                                                                                                                    schemeName
//                                                                                                                    createScheme(schemeCheck,schemeValue);
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "owner_type" && asset_attribute_list[i].dropdown == true){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                           '<label class="textcase col-form-label col-sm-5" for="' + asset_attribute_list[i].name + '">' + asset_attribute_list[i].displayName + '</label>'+

                                                                                                                           '<select class="form-control form-control-sm col-sm-6" style="background-color:##00AAFF;"'+
                                                                                                                           'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"><option value="0">-- Select --</option>';

                                                                                                                    for(var j = 0; j < asset_dropdown_list.length; j++){
                                                                                                                        if(asset_dropdown_list[j].attributeId == asset_attribute_list[i].attributeId){
                                                                                                                            str += '<option value="' +asset_dropdown_list[j].value + '"';
                                                                                                                            if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] == asset_dropdown_list[j].value){
                                                                                                                                str += ' selected="selected"';
                                                                                                                            }
                                                                                                                            str += '>' + asset_dropdown_list[j].value + '</option>' ;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    str += '</select>';
                                                                                                                    if(response.post[0].additional_attribute_value[0][0].ownerType == "ORGANIZATION")
                                                                                                                    {
                                                                                                                        ownerTypeValueCheck = 1;
                                                                                                                    }
                                                                                                                    else if(response.post[0].additional_attribute_value[0][0].ownerType == "INDIVIDUAL")
                                                                                                                    {
                                                                                                                        ownerTypeValueCheck = 2;
                                                                                                                    }
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].dropdown){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                            '<label class="textcase  col-form-label col-sm-5" for="' + attribNameID + '">' + attribName + '</label>'+

                                                                                                                            '<select class="form-control form-control-sm col-sm-6" style="background-color:##00AAFF;"'+
                                                                                                                            'id="' + attribNameID + '" name="' + attribName + '"><option value="0">--Select--</option>';
                                                                                                                    str2 = '';
                                                                                                                    for(var j = 0; j < asset_dropdown_list.length; j++){
                                                                                                                        if(asset_dropdown_list[j].attributeId == asset_attribute_list[i].attributeId){
                                                                                                                            str2 += '<option value="' +asset_dropdown_list[j].value + '"';
                                                                                                                            if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] == asset_dropdown_list[j].value){
                                                                                                                                str2 += ' selected="selected"';
                                                                                                                            }
                                                                                                                            str2 += '>' + asset_dropdown_list[j].value + '</option>' ;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    str += str2 + '</select></div>';//'+allValues[attribNameID]+'
                                                                                                                }
                                                                                                                else{
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+
                                                                                                                                '<label class="textcase col-sm-5 col-form-label"  for="' + attribNameID + '">' + attribName + '</label>'+

                                                                                                                                '<input type="text" class="form-control form-control-sm col-sm-6" id="' + attribNameID + '" value="' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                                                                                                                                '"placeholder="' + attribName + '" required autocomplete="off"/>'+
                                                                                                                           '</div>';
                                                                                                                }

                                                                                                                str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                    '<label class="textcase col-sm-5 col-form-label"  for="' + attribNameID + '">' + attribName + '</label>'+

                                                                                                                    '<input type="text" class="form-control form-control-sm col-sm-6" id="' + attribNameID + '" value="' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                                                                                                                    '"placeholder="' + attribName + '" required autocomplete="off"/>'+
                                                                                                               '</div>';

                                                                                                                if(asset_attribute_list[i].name != "scheme_id"){
                                                                                                                    var inputfield = $(str);
                                                                                                                    $("#dynamicFields").append(inputfield);
                                                                                                                    if(asset_attribute_list[i].dataType == 'boolean'){
                                                                                                                        if($("#"+attribNameID).val()=="true"){
                                                                                                                            $("#"+attribNameID).val("Yes");
                                                                                                                        }
                                                                                                                        else{
                                                                                                                            $("#"+attribNameID).val("No");
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else if(asset_attribute_list[i].dataType == 'numeric'){
                                                                                                                        if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === undefined || ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === null)
                                                                                                                            {
                                                                                                                                //$("#"+attribNameID).val("0.0");
                                                                                                                                ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] = 0.0;
                                                                                                                            }
                                                                                                                    }
                                                                                                                    else if(asset_attribute_list[i].dataType == 'integer'){
                                                                                                                        if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === undefined || ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === null)
                                                                                                                            {
                                                                                                                                //$("#"+attribNameID).val("0");
                                                                                                                                ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] = 0;
                                                                                                                            }
                                                                                                                    }
                                                                                                                }
                                                                                                                $("#"+attribNameID).attr('readonly',true);
                                                                                                                $("#desc").attr('readonly',true);

                                                                                                            }
                                                                                                            fish_species = response.post[0].species_list[0].speciesName;
                                                                                                            var finalSpecies = fish_species.split(',');

                                                                                                            if(response.post[0].asset_list[0].categoryId == 61 || response.post[0].asset_list[0].categoryId == 29){
                                                                                                                $("#ddlSpecies").css("display","block");
                                                                                                                //$.ajax({
                                                                                                                //    type: "GET",
                                                                                                                //    url: service_url + '/getSpeciesByDeptId/1',
                                                                                                                //    dataType : "json",
                                                                                                                //    success: function(response){
                                                                                                                //        selectspecies = $('#species_fish');
                                                                                                                //        $('#species_fish').html('');
                                                                                                                //        var placeholder = "Select Species";
                                                                                                                //        for(i=0;i<response.post[0].length;i++){
                                                                                                                //            selectspecies.append("<option class='ddindent' value='" + response.post[0][i].speciesId + "'>" + response.post[0][i].speciesName + "</option>");
                                                                                                                //        }
                                                                                                                //    }
                                                                                                                //});
                                                                                                                //$("#species_fish").select2({
                                                                                                                //    width: '100%',
                                                                                                                //    placeholder: placeholder
                                                                                                                //});
                                                                                                                var option;
                                                                                                                for(var i=0;i<finalSpecies.length;i++){
                                                                                                                    option+="<option>"+finalSpecies[i]+"</option>";
                                                                                                                }
                                                                                                                $("#species_fish").html(option);
                                                                                                            }

                                                                                                            agencyValue = ADDITIONAL_ATTRIBUTE_VALUE["organizationId"];

                                                                                                            //Here ownerType value is organization owner_registration_id
                                                                                                            if(ownerTypeValueCheck == 1){
                                                                                                                $($('#owner_registration_id').parent().get(0)).hide()
                                                                                                                $($('#owner_name').parent().get(0)).hide()
                                                                                                                if(response.post[0].additional_attribute_value[0][0].ownership == "PRIVATE"){
                                                                                                                  getAgencyPrivate(agencyValue);
                                                                                                                }
                                                                                                                else if(response.post[0].additional_attribute_value[0][0].ownership == "GOVERNMENT"){
                                                                                                                getAgencyGovt(agencyValue);
                                                                                                                }
                                                                                                            }
                                                                                                            //Here ownerType value is Individual
                                                                                                            else if(ownerTypeValueCheck == 2){
                                                                                                                $($('#ownership').parent().get(0)).hide()
                                                                                                                $($('#organization_id').parent().get(0)).hide()
                                                                                                            }

                                                                                                        }

                                                                                                        function appendAssetDetailsWithBlankValues(response){

                                                                                                            var asset_attribute_list = response.post[0].asset_attribute_list;
                                                                                                            var asset_dropdown_list = response.post[0].asset_dropdown_list;
                                                                                                            var str = '';
                                                                                                            var fields = {};

                                                                                                            const CamelCase = str => {
                                                                                                              let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                                                                                                                              .reduce((result, word) => result + capitalize(word.toLowerCase()))
                                                                                                              return string.charAt(0).toLowerCase() + string.slice(1)
                                                                                                            };
                                                                                                            const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

                                                                                                            for(var i=0; i<asset_attribute_list.length;i++){
                                                                                                                var attribNameID = asset_attribute_list[i].name;
                                                                                                                var camelAttributeNameID = CamelCase(attribNameID);
                                                                                                                var attribName = asset_attribute_list[i].displayName;
                                                                                                                if(asset_attribute_list[i].dataType == 'boolean'){
                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                        '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '*</b></label>&nbsp;'+
                                                                                                                        '<input type="checkbox"  id="' + attribNameID + '" required autocomplete="off"/>'+
                                                                                                                        '</div>';
                                                                                                                    }
                                                                                                                else if(asset_attribute_list[i].dataType == 'numeric'){
                                                                                                                     str = '<div class="form-group col-md-6">'+
                                                                                                                               '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '*</b></label>&nbsp;'+
                                                                                                                               '<input type="number" class="form-control" id="' + attribNameID + ' "placeholder="' + attribName + '"disabled = "true" value="0.0" required autocomplete="off"/>'+
                                                                                                                           '</div>';
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "scheme_id" && asset_attribute_list[i].dropdown == true){

                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                   '<label class="textcase" for="' + asset_attribute_list[i].name + '"><b>' + asset_attribute_list[i].displayName + '</b></label>'+
                                                                                                                   '<select class="form-control" style="background-color:##00AAFF;"'+
                                                                                                                   'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"disabled="true"><option value="0">-- Select Scheme --</option></select></div>';

                                                                                                                    var inputfield = $(str);
                                                                                                                    $("#dynamicFields").append(inputfield);
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "owner_type" && asset_attribute_list[i].dropdown == true){

                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                           '<label class="textcase" for="' + asset_attribute_list[i].name + '"><b>' + asset_attribute_list[i].displayName + '</b></label>'+
                                                                                                                           '<select class="form-control" style="background-color:##00AAFF;"'+
                                                                                                                           'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"><option value="0">-- Select Owner Type --</option>';

                                                                                                                    str += '</select></div>';
                                                                                                                    if(response.post[0].additional_attribute_value[0].length!=0){
                                                                                                                        if(response.post[0].additional_attribute_value[0][0].ownerType == "ORGANIZATION")
                                                                                                                        {
                                                                                                                            ownerTypeValueCheck = 1;
                                                                                                                        }
                                                                                                                        else if(response.post[0].additional_attribute_value[0][0].ownerType == "INDIVIDUAL")
                                                                                                                        {
                                                                                                                            ownerTypeValueCheck = 2;
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].dropdown){
                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                            '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '</b></label>'+
                                                                                                                            '<select class="form-control" style="background-color:##00AAFF;"'+
                                                                                                                            'id="' + attribNameID + '" name="' + attribName + '"><option value="0">-- Select --</option>';
                                                                                                                    str2 = '';
                                                                                                                }
                                                                                                                else{
                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                                '<label class="textcase"  for="' + attribNameID + '"><b>' + attribName + '*</b></label>'+
                                                                                                                                '<input type="text" class="form-control" id="' + attribNameID + '" value="' +
                                                                                                                                '"placeholder="' + attribName + '" value="0" required autocomplete="off"/>'+
                                                                                                                           '</div>';
                                                                                                                }
                                                                                                                var inputfield = $(str);
                                                                                                                $("#dynamicFields").append(inputfield);
                                                                                                                $("#"+attribNameID).attr('readonly',true);
                                                                                                                $("#"+attribNameID).prop('disabled',true);
                                                                                                                $("#desc").attr('readonly',true);
                                                                                                            }
                                                                                                            var option = "<option>-- Select Species --</option>";
                                                                                                            $("#species_fish").html(option);
                                                                                                        }
                                                                                                    assetinfo ="<div class='container-fluid'>";


                                                                                                    assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                                     assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Asset ID</label>";
                                                                                                     assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                      assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.assetId + '" required autocomplete="off"/>';
                                                                                                       assetinfo +="</div>";
                                                                                                      assetinfo+="</div>";
                                                                                                assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                                 assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Asset Name</label>";
                                                                                             assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                              assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.assetName + '" required autocomplete="off"/>';
                                                                                               assetinfo +="</div>";
                                                                                              assetinfo+="</div>";
                                                                                               assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                               assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Class</label>";
                                                                                               assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.className + '" required autocomplete="off"/>';
                                                                                                 assetinfo +="</div>";
                                                                                                assetinfo+="</div>";
                                                                                                  assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                               assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Category</label>";
                                                                                               assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.categoryName + '" required autocomplete="off"/>';
                                                                                                 assetinfo +="</div>";
                                                                                                assetinfo+="</div>";
                                                                                                 assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                               assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Zone</label>";
                                                                                               assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.zoneName + '" required autocomplete="off"/>';
                                                                                                 assetinfo +="</div>";
                                                                                                assetinfo+="</div>";
                                                                                                 assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                               assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>District</label>";
                                                                                               assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.districtName + '" required autocomplete="off"/>';
                                                                                                 assetinfo +="</div>";
                                                                                                assetinfo+="</div>";
                                                                                                assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                               assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Block</label>";
                                                                                               assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.blockName + '" required autocomplete="off"/>';
                                                                                                 assetinfo +="</div>";
                                                                                                assetinfo+="</div>";
                                                                                                 assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                               assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Gram Panchayat</label>";
                                                                                               assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.gpName + '" required autocomplete="off"/>';
                                                                                                 assetinfo +="</div>";
                                                                                                assetinfo+="</div>";
                                                                                                  assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                               assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Village</label>";
                                                                                               assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                                assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + data2.villageName + '" required autocomplete="off"/>';
                                                                                                 assetinfo +="</div>";
                                                                                                assetinfo+="</div>";






                                                                                             assetinfo +="<div id='dynamicFields'></div>";
                                                                                              assetinfo += "<div class='picture-gallery-div3 border-bottom pb-2 d-none'> ";
                                                                                              assetinfo += "<p class='text-muted'><strong>Photo Gallery</strong></p><div class='picture-gallery3 row'></div>";
                                                                                                 assetinfo += " <div class='text-center'><a href='#'>All Photos</a></div>";
                                                                                                 assetinfo += "</div>";
                                                                                                  assetinfo+="</div>";

                                                                                               $('#pills-profile').html(assetinfo);

                                                                                                if(imgdata2.length==0)
                                                                                                     {
                                                                                                     content1.find('.picture-gallery-div3').addClass('d-none')
                                                                                                     }
                                                                                                       let photocnt4 = Math.min(3, imgdata2.length)
                                                                                                       if(photocnt4 > 0){
                                                                                                        $('.picture-gallery3').empty();
                                                                                                           let pict3 = content1.find('.picture-gallery3')
                                                                                                           content1.find('.picture-gallery-div3').removeClass('d-none')
                                                                                                           for(let i = 0; i < photocnt4; i++){
                                                                                                               let p = global_image_url +'/'+ imgdata2[i].assetId+'/'+ imgdata2[i].imageName
                                                                                                               pict3.append($('<div class="col" />').html($('<img class="img-thumbnail image-error"  style="height:100px;width:100px" />').attr('src', p)))
                                                                                                           }
                                                                                                           //pict3.append('<div class="clearfix"></div>')
                                                                                                           content1.find('.picture-gallery-div3 a').on('click', function(e){
                                                                                                               e.preventDefault()
                                                                                                               let photoarr = []
                                                                                                               imgdata2.forEach((p) => {
                                                                                                                   photoarr.push({src: global_image_url +'/'+p.assetId+'/'+p.imageName})
                                                                                                               })
                                                                                                               $.fancybox.open(photoarr, {loop : true})
                                                                                                           })

                                                                                                       }

                                                                                                $(".image-error").on("error", function () {
                                                                                                    $(this).attr("src", "images/no_image.png");
                                                                                                });
                                                                                                 $("#pills-profile-tab").show()
                                                                                  break;


                                                                              case 'assetsearch':

                                                                                       //data4 = featureProps.assetid
                                                                                        data4 = assetidaa
                                                                                       data2 = featureProps.data
                                                                                       data3 = featureProps.datasingle
                                                                                       console.log(data3)
                                                                                       console.log(data2)


                                                                                        var asset_body = {
                                                                                                              "assetId" : data4,
                                                                                                              "year" : "",
                                                                                                              "deptId" : 1
                                                                                                           }
                                                                                          $.ajax({
                                                                                                 url: service_url + '/getAssetViewByAssetId/',
                                                                                                 type:"POST",
                                                                                                 data: JSON.stringify(asset_body),
                                                                                                 dataType: 'json',
                                                                                                 contentType:'application/json',
                                                                                                 //data:JSON.stringify({"assetId":assetId}),
                                                                                                 success: function(response){
                                                                                                     if(response.status != 0){
                                                                                                      var assetlist=response.post[0].asset_list[0]


                                                                                            assetinfo ="<div class='container-fluid'>";


                                                                                        assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                         assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Asset ID</label>";
                                                                                         assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                          assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.assetId + '" required autocomplete="off"/>';
                                                                                           assetinfo +="</div>";
                                                                                          assetinfo+="</div>";
                                                                                    assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                     assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Asset Name</label>";
                                                                                 assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                  assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.assetName + '" required autocomplete="off"/>';
                                                                                   assetinfo +="</div>";
                                                                                  assetinfo+="</div>";
                                                                                   assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                   assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Class</label>";
                                                                                   assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                    assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.className + '" required autocomplete="off"/>';
                                                                                     assetinfo +="</div>";
                                                                                    assetinfo+="</div>";
                                                                                      assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                   assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Category</label>";
                                                                                   assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                    assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.categoryName + '" required autocomplete="off"/>';
                                                                                     assetinfo +="</div>";
                                                                                    assetinfo+="</div>";

                                                                                      assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Zone</label>";
                                                                                assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                 assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.zoneName + '" required autocomplete="off"/>';
                                                                                  assetinfo +="</div>";
                                                                                 assetinfo+="</div>";
                                                                                   assetinfo += "<div class='form-group row border-bottom pb-2'>";
                                                                                   assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>District</label>";
                                                                                   assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                    assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.districtName + '" required autocomplete="off"/>';
                                                                                     assetinfo +="</div>";
                                                                                    assetinfo+="</div>";
                                                                                    assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                   assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Block</label>";
                                                                                   assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                    assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.blockName + '" required autocomplete="off"/>';
                                                                                     assetinfo +="</div>";
                                                                                    assetinfo+="</div>";
                                                                                     assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                   assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Gram Panchayat</label>";
                                                                                   assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                    assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.gpName + '" required autocomplete="off"/>';
                                                                                     assetinfo +="</div>";
                                                                                    assetinfo+="</div>";
                                                                                      assetinfo += "<div class='form-group row border-bottom pb-2'>";

                                                                                   assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Village</label>";
                                                                                   assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                    assetinfo += '<input type="text" class="form-control form-control-sm" readonly value="' + assetlist.villageName + '" required autocomplete="off"/>';
                                                                                     assetinfo +="</div>";
                                                                                    assetinfo+="</div>";

                                                                                   assetinfo += "<div class='form-group row border-bottom pb-2' style='display:none' id='ddlSpecies'>";

                                                                                    assetinfo += "<label for='staticEmail' class='col-sm-5 col-form-label'>Fish Species</label>";
                                                                                    assetinfo += "<div class='col-sm-6 p-0'>";
                                                                                     assetinfo += '<input type="text" id="species_fish" class="form-control form-control-sm" readonly  required autocomplete="off"/>';
                                                                                      assetinfo +="</div>";
                                                                                     assetinfo+="</div>";




                                                                                 assetinfo +="<div id='dynamicFields'></div>";

                                                                                  assetinfo += "<div class='picture-gallery-div3 border-bottom pb-2 d-none'> ";
                                                                                  assetinfo += "<p class='text-muted'><strong>Photo Gallery</strong></p><div class='picture-gallery3 row'></div>";
                                                                                     assetinfo += " <div class='text-center'><a href='#'>All Photos</a></div>";
                                                                                     assetinfo += "</div>";
                                                                                      assetinfo+="</div>";


                                                                                    $('#pills-profile').html(assetinfo);
                                                                                     imgdata2=response.post[0].asset_image_list;

                                                                                    if(imgdata2.length==0)
                                                                                         {
                                                                                         content1.find('.picture-gallery-div3').addClass('d-none')
                                                                                         }
                                                                                           let photocnt4 = Math.min(3, imgdata2.length)
                                                                                           if(photocnt4 > 0){
                                                                                            $('.picture-gallery3').empty();
                                                                                               let pict3 = content1.find('.picture-gallery3')
                                                                                               content1.find('.picture-gallery-div3').removeClass('d-none')
                                                                                               for(let i = 0; i < photocnt4; i++){
                                                                                                   let p = global_image_url +'/'+ imgdata2[i].assetId+'/'+ imgdata2[i].imageName
                                                                                                   pict3.append($('<div class="col" />').html($('<img class="img-thumbnail image-error"  style="height:100px;width:100px" />').attr('src', p)))
                                                                                               }
                                                                                               //pict3.append('<div class="clearfix"></div>')
                                                                                               content1.find('.picture-gallery-div3 a').on('click', function(e){
                                                                                                   e.preventDefault()
                                                                                                   let photoarr = []
                                                                                                   imgdata2.forEach((p) => {
                                                                                                       photoarr.push({src: global_image_url +'/'+p.assetId+'/'+p.imageName})
                                                                                                   })
                                                                                                   $.fancybox.open(photoarr, {loop : true})
                                                                                               })

                                                                                           }

                                                                                                $(".image-error").on("error", function () {
                                                                                                    $(this).attr("src", "images/no_image.png");
                                                                                                });
                                                                                             $("#pills-profile-tab").show()

                                                                                                             appendAssetDetails(response);

                                                                                                             }
                                                                                                             else{
                                                                                                                 console.log(response);
                                                                                                             }
                                                                                                         },
                                                                                                         error: function (response) {
                                                                                                         }
                                                                                                     });

                                                                                                        function createScheme(c,v){
                                                                                                            if(c){
                                                                                                                var str = '';
                                                                                                                $.ajax({
                                                                                                                    url: service_url + '/getAllScheme',
                                                                                                                    type: 'GET',
                                                                                                                    dataType: 'json',
                                                                                                                    data: {},
                                                                                                                    success: function (d) {
                                                                                                                       var ar =d.post[0];
                                                                                                                        //var str2 = '';
                                                                                                                        $.each(ar, function (r, scheme) {
                                                                                                                            str += '<option value="' + ar[r].schemeId + '"';
                                                                                                                            if(v == ar[r].schemeId){
                                                                                                                                str += ' selected="selected"';
                                                                                                                            }
                                                                                                                            str += '>' + ar[r].name + '</option>' ;
                                                                                                                        });
                                                                                                                        $("#scheme_id").append(str);
                                                                                                                        $("#scheme_id").prop('disabled',true);

                                                                                                                    },
                                                                                                                    error: function () {
                                                                                                                       // alert('Error!');
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        }

                                                                                                        function getAgencyPrivate(agencyValue){
                                                                                                          var deptId=localStorage.getItem("deptId");
                                                                                                            $.ajax({
                                                                                                                url: service_url + '/agencies/' + deptId + '/' + 'PRIVATE',
                                                                                                                type: 'GET',
                                                                                                                dataType: 'json',
                                                                                                                data: {},
                                                                                                                success: function (d) {
                                                                                                                    var ar =d.post[0];
                                                                                                                    var str = '';
                                                                                                                    $.each(ar, function(i, agency){
                                                                                                                        //str += '<option value="' + ar[i].agencyId + '"';
                                                                                                                        if(agencyValue == ar[i].agencyId){
                                                                                                                            str += ar[i].name;
                                                                                                                        }
                                                                                                                        //str += '>' + ar[i].name + '</option>' ;
                                                                                                                    });
                                                                                                                    $("#organization_id").val(str);
                                                                                                                },
                                                                                                                error: function () {
                                                                                                                   // alert('Error!');
                                                                                                                }
                                                                                                            });
                                                                                                        }

                                                                                                        function getAgencyGovt(){
                                                                                                          var deptId=localStorage.getItem("deptId");
                                                                                                            $.ajax({
                                                                                                                url: service_url + '/agencies/' + deptId + '/' + 'GOVERNMENT',
                                                                                                                type: 'GET',
                                                                                                                dataType: 'json',
                                                                                                                data: {},
                                                                                                                success: function (d) {
                                                                                                                    var ar =d.post[0];
                                                                                                                    var str = '';
                                                                                                                    $.each(ar, function(i, agency){
                                                                                                                        //str += '<option value="' + ar[i].agencyId + '"';
                                                                                                                            if(agencyValue == ar[i].agencyId){
                                                                                                                                str += ar[i].name;
                                                                                                                            }
                                                                                                                            //str += '>' + ar[i].name + '</option>' ;
                                                                                                                        });
                                                                                                                    $("#organization_id").text(str);
                                                                                                                },
                                                                                                                error: function () {
                                                                                                                   // alert('Error!');
                                                                                                                }
                                                                                                            });
                                                                                                        }
                                                                                                        function appendAssetDetails(response){

                                                                                                            var asset_attribute_list = response.post[0].asset_attribute_list;
                                                                                                            var asset_dropdown_list = response.post[0].asset_dropdown_list;
                                                                                                            var ADDITIONAL_ATTRIBUTE_VALUE = response.post[0].additional_attribute_value[0][0];
                                                                                                            var str = '';
                                                                                                            var fields = {};

                                                                                                            const CamelCase = str => {
                                                                                                              let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                                                                                                                              .reduce((result, word) => result + capitalize(word.toLowerCase()))
                                                                                                              return string.charAt(0).toLowerCase() + string.slice(1)
                                                                                                            };

                                                                                                            const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

                                                                                                            for(var i=0; i<asset_attribute_list.length;i++){

                                                                                                                var attribNameID = asset_attribute_list[i].name;
                                                                                                                var camelAttributeNameID = CamelCase(attribNameID);
                                                                                                                var attribName = asset_attribute_list[i].displayName;


                                                                                                                if(asset_attribute_list[i].dataType == 'boolean'){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                        '<label class="textcase col-sm-4 col-form-label" for="' + attribNameID + '">' + attribName + '</label>&nbsp;'+

                                                                                                                        '<input type="checkbox"  class="col-sm-6 form-control form-control-sm" id="' + attribNameID + '" checked=' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] +
                                                                                                                        ' required autocomplete="off"/>'+

                                                                                                                        '</div>';
                                                                                                                    }

                                                                                                                else if(asset_attribute_list[i].dataType == 'numeric'){
                                                                                                                     str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                           '<label class="textcase col-form-label col-sm-4" for="' + attribNameID + '">' + attribName + '</label>&nbsp;'+

                                                                                                                            '<input type="number" class="form-control form-control-sm col-sm-6"   id="' + attribNameID + '" value="'+ ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                                                                                                                               '"placeholder="' + attribName + '" required autocomplete="off"/>'+

                                                                                                                           '</div>';
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "scheme_id" && asset_attribute_list[i].dropdown == true){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                   '<label class="textcase col-sm-5 col-form-label" for="' + asset_attribute_list[i].name + '">' + asset_attribute_list[i].displayName + '</label>'+

                                                                                                                       '<input type="text" class="form-control form-control-sm col-sm-6"   id="' + attribNameID + '" value="'+ ADDITIONAL_ATTRIBUTE_VALUE['schemeName']+
                                                                                                                                                   '"placeholder="' + attribName + '" required autocomplete="off"/>'+



//                                                                                                                   '<select class="form-control col-form-label form-control-sm col-sm-6" style="background-color:##00AAFF;"'+
//                                                                                                                   'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"><option value="0">-- Select Scheme --</option></select>
                                                                                                                    '</div>';
                                                                                                                    var inputfield = $(str);
                                                                                                                    $("#dynamicFields").append(inputfield);
//                                                                                                                    schemeCheck = 1;
//                                                                                                                    schemeValue = ADDITIONAL_ATTRIBUTE_VALUE["schemeId"];
//                                                                                                                    schemeName
//                                                                                                                    createScheme(schemeCheck,schemeValue);
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "owner_type" && asset_attribute_list[i].dropdown == true){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                           '<label class="textcase col-form-label col-sm-5" for="' + asset_attribute_list[i].name + '">' + asset_attribute_list[i].displayName + '</label>'+

                                                                                                                           '<select class="form-control form-control-sm col-sm-6" style="background-color:##00AAFF;"'+
                                                                                                                           'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"><option value="0">-- Select --</option>';

                                                                                                                    for(var j = 0; j < asset_dropdown_list.length; j++){
                                                                                                                        if(asset_dropdown_list[j].attributeId == asset_attribute_list[i].attributeId){
                                                                                                                            str += '<option value="' +asset_dropdown_list[j].value + '"';
                                                                                                                            if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] == asset_dropdown_list[j].value){
                                                                                                                                str += ' selected="selected"';
                                                                                                                            }
                                                                                                                            str += '>' + asset_dropdown_list[j].value + '</option>' ;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    str += '</select>';
                                                                                                                    if(response.post[0].additional_attribute_value[0][0].ownerType == "ORGANIZATION")
                                                                                                                    {
                                                                                                                        ownerTypeValueCheck = 1;
                                                                                                                    }
                                                                                                                    else if(response.post[0].additional_attribute_value[0][0].ownerType == "INDIVIDUAL")
                                                                                                                    {
                                                                                                                        ownerTypeValueCheck = 2;
                                                                                                                    }
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].dropdown){
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                            '<label class="textcase  col-form-label col-sm-5" for="' + attribNameID + '">' + attribName + '</label>'+

                                                                                                                            '<select class="form-control form-control-sm col-sm-6" style="background-color:##00AAFF;"'+
                                                                                                                            'id="' + attribNameID + '" name="' + attribName + '"><option value="0">--Select--</option>';
                                                                                                                    str2 = '';
                                                                                                                    for(var j = 0; j < asset_dropdown_list.length; j++){
                                                                                                                        if(asset_dropdown_list[j].attributeId == asset_attribute_list[i].attributeId){
                                                                                                                            str2 += '<option value="' +asset_dropdown_list[j].value + '"';
                                                                                                                            if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] == asset_dropdown_list[j].value){
                                                                                                                                str2 += ' selected="selected"';
                                                                                                                            }
                                                                                                                            str2 += '>' + asset_dropdown_list[j].value + '</option>' ;
                                                                                                                        }
                                                                                                                    }
                                                                                                                    str += str2 + '</select></div>';//'+allValues[attribNameID]+'
                                                                                                                }
                                                                                                                else{
                                                                                                                    str = '<div class="form-group row border-bottom pb-2">'+
                                                                                                                                '<label class="textcase col-sm-5 col-form-label"  for="' + attribNameID + '">' + attribName + '</label>'+

                                                                                                                                '<input type="text" class="form-control form-control-sm col-sm-6" id="' + attribNameID + '" value="' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                                                                                                                                '"placeholder="' + attribName + '" required autocomplete="off"/>'+
                                                                                                                           '</div>';
                                                                                                                }

                                                                                                                str = '<div class="form-group row border-bottom pb-2">'+

                                                                                                                    '<label class="textcase col-sm-5 col-form-label"  for="' + attribNameID + '">' + attribName + '</label>'+

                                                                                                                    '<input type="text" class="form-control form-control-sm col-sm-6" id="' + attribNameID + '" value="' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                                                                                                                    '"placeholder="' + attribName + '" required autocomplete="off"/>'+
                                                                                                               '</div>';

                                                                                                                if(asset_attribute_list[i].name != "scheme_id"){
                                                                                                                    var inputfield = $(str);
                                                                                                                    $("#dynamicFields").append(inputfield);
                                                                                                                    if(asset_attribute_list[i].dataType == 'boolean'){
                                                                                                                        if($("#"+attribNameID).val()=="true"){
                                                                                                                            $("#"+attribNameID).val("Yes");
                                                                                                                        }
                                                                                                                        else{
                                                                                                                            $("#"+attribNameID).val("No");
                                                                                                                        }
                                                                                                                    }
                                                                                                                    else if(asset_attribute_list[i].dataType == 'numeric'){
                                                                                                                        if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === undefined || ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === null)
                                                                                                                            {
                                                                                                                                //$("#"+attribNameID).val("0.0");
                                                                                                                                ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] = 0.0;
                                                                                                                            }
                                                                                                                    }
                                                                                                                    else if(asset_attribute_list[i].dataType == 'integer'){
                                                                                                                        if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === undefined || ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === null)
                                                                                                                            {
                                                                                                                                //$("#"+attribNameID).val("0");
                                                                                                                                ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] = 0;
                                                                                                                            }
                                                                                                                    }
                                                                                                                }
                                                                                                                $("#"+attribNameID).attr('readonly',true);
                                                                                                                $("#desc").attr('readonly',true);

                                                                                                            }

                                                                                                           fish_species = response.post[0].species_list[0].speciesName;
//                                                                                                             var finalSpecies = fish_species.split(',');

                                                                                                            if(response.post[0].asset_list[0].categoryId == 61 || response.post[0].asset_list[0].categoryId == 29){




                                                                                                                $("#ddlSpecies").css("display","flex");
                                                                                                                //$.ajax({
                                                                                                                //    type: "GET",
                                                                                                                //    url: service_url + '/getSpeciesByDeptId/1',
                                                                                                                //    dataType : "json",
                                                                                                                //    success: function(response){
                                                                                                                //        selectspecies = $('#species_fish');
                                                                                                                //        $('#species_fish').html('');
                                                                                                                //        var placeholder = "Select Species";
                                                                                                                //        for(i=0;i<response.post[0].length;i++){
                                                                                                                //            selectspecies.append("<option class='ddindent' value='" + response.post[0][i].speciesId + "'>" + response.post[0][i].speciesName + "</option>");
                                                                                                                //        }
                                                                                                                //    }
                                                                                                                //});
                                                                                                                //$("#species_fish").select2({
                                                                                                                //    width: '100%',
                                                                                                                //    placeholder: placeholder
                                                                                                                //});
//                                                                                                                var option;
//                                                                                                                for(var i=0;i<finalSpecies.length;i++){
//                                                                                                                    option+="<option>"+finalSpecies[i]+"</option>";
//                                                                                                                }
                                                                                                                $("#species_fish").val(fish_species);
                                                                                                            }

                                                                                                            agencyValue = ADDITIONAL_ATTRIBUTE_VALUE["organizationId"];

                                                                                                            //Here ownerType value is organization owner_registration_id
                                                                                                            if(ownerTypeValueCheck == 1){
                                                                                                                $($('#owner_registration_id').parent().get(0)).hide()
                                                                                                                $($('#owner_name').parent().get(0)).hide()
                                                                                                                if(response.post[0].additional_attribute_value[0][0].ownership == "PRIVATE"){
                                                                                                                  getAgencyPrivate(agencyValue);
                                                                                                                }
                                                                                                                else if(response.post[0].additional_attribute_value[0][0].ownership == "GOVERNMENT"){
                                                                                                                getAgencyGovt(agencyValue);
                                                                                                                }
                                                                                                            }
                                                                                                            //Here ownerType value is Individual
                                                                                                            else if(ownerTypeValueCheck == 2){
                                                                                                                $($('#ownership').parent().get(0)).hide()
                                                                                                                $($('#organization_id').parent().get(0)).hide()
                                                                                                            }



                                                                                    }

                                                                                                    function appendAssetDetailsWithBlankValues(response){

                                                                                                            var asset_attribute_list = response.post[0].asset_attribute_list;
                                                                                                            var asset_dropdown_list = response.post[0].asset_dropdown_list;
                                                                                                            var str = '';
                                                                                                            var fields = {};

                                                                                                            const CamelCase = str => {
                                                                                                              let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                                                                                                                              .reduce((result, word) => result + capitalize(word.toLowerCase()))
                                                                                                              return string.charAt(0).toLowerCase() + string.slice(1)
                                                                                                            };
                                                                                                            const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

                                                                                                            for(var i=0; i<asset_attribute_list.length;i++){
                                                                                                                var attribNameID = asset_attribute_list[i].name;
                                                                                                                var camelAttributeNameID = CamelCase(attribNameID);
                                                                                                                var attribName = asset_attribute_list[i].displayName;
                                                                                                                if(asset_attribute_list[i].dataType == 'boolean'){
                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                        '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '*</b></label>&nbsp;'+
                                                                                                                        '<input type="checkbox"  id="' + attribNameID + '" required autocomplete="off"/>'+
                                                                                                                        '</div>';
                                                                                                                    }
                                                                                                                else if(asset_attribute_list[i].dataType == 'numeric'){
                                                                                                                     str = '<div class="form-group col-md-6">'+
                                                                                                                               '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '*</b></label>&nbsp;'+
                                                                                                                               '<input type="number" class="form-control" id="' + attribNameID + ' "placeholder="' + attribName + '"disabled = "true" value="0.0" required autocomplete="off"/>'+
                                                                                                                           '</div>';
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "scheme_id" && asset_attribute_list[i].dropdown == true){

                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                   '<label class="textcase" for="' + asset_attribute_list[i].name + '"><b>' + asset_attribute_list[i].displayName + '</b></label>'+
                                                                                                                   '<select class="form-control" style="background-color:##00AAFF;"'+
                                                                                                                   'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"disabled="true"><option value="0">-- Select Scheme --</option></select></div>';

                                                                                                                    var inputfield = $(str);
                                                                                                                    $("#dynamicFields").append(inputfield);
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].name == "owner_type" && asset_attribute_list[i].dropdown == true){

                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                           '<label class="textcase" for="' + asset_attribute_list[i].name + '"><b>' + asset_attribute_list[i].displayName + '</b></label>'+
                                                                                                                           '<select class="form-control" style="background-color:##00AAFF;"'+
                                                                                                                           'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"><option value="0">-- Select Owner Type --</option>';

                                                                                                                    str += '</select></div>';
                                                                                                                    if(response.post[0].additional_attribute_value[0].length!=0){
                                                                                                                        if(response.post[0].additional_attribute_value[0][0].ownerType == "ORGANIZATION")
                                                                                                                        {
                                                                                                                            ownerTypeValueCheck = 1;
                                                                                                                        }
                                                                                                                        else if(response.post[0].additional_attribute_value[0][0].ownerType == "INDIVIDUAL")
                                                                                                                        {
                                                                                                                            ownerTypeValueCheck = 2;
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                                else if(asset_attribute_list[i].dropdown){
                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                            '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '</b></label>'+
                                                                                                                            '<select class="form-control" style="background-color:##00AAFF;"'+
                                                                                                                            'id="' + attribNameID + '" name="' + attribName + '"><option value="0">-- Select --</option>';
                                                                                                                    str2 = '';
                                                                                                                }
                                                                                                                else{
                                                                                                                    str = '<div class="form-group col-md-6">'+
                                                                                                                                '<label class="textcase"  for="' + attribNameID + '"><b>' + attribName + '*</b></label>'+
                                                                                                                                '<input type="text" class="form-control" id="' + attribNameID + '" value="' +
                                                                                                                                '"placeholder="' + attribName + '" value="0" required autocomplete="off"/>'+
                                                                                                                           '</div>';
                                                                                                                }
                                                                                                                var inputfield = $(str);
                                                                                                                $("#dynamicFields").append(inputfield);
                                                                                                                $("#"+attribNameID).attr('readonly',true);
                                                                                                                $("#"+attribNameID).prop('disabled',true);
                                                                                                                $("#desc").attr('readonly',true);
                                                                                                            }
                                                                                                            var option = "<option>-- Select Species --</option>";
                                                                                                            $("#species_fish").html(option);
                                                                                                        }

                                                                         break;

                                                                              default:
                                                                                  show = false
                                                                          }
                                                                      })

                                          //                                            $('#content_jetty_id').html("");
                                          //                                            $('#jtd').html("");
                                                                                      //$("#jettyid").empty();
                                                                                      //$("#flc").empty();
                                                                                      //$("#cyclone_shlt").empty();

                                                                                      //$('#jettyid').html("");

                                                                                    $.ajax({
                                                                                        type: "POST",
                                                                                        url: "https://odisha4kgeo.in/index.php/mapview/showForestRevenueInfo",
                                                                                        data: {cordinates: coordinatesNew},
                                                                                        dataType : "json",
                                                                                        success: function(data){
                                                                                              // document.getElementById("content_district_kyfl_id").innerHTML = data.post.revenue[0].district_name;


                                                                                               content1.find('.content_district_kyfl').text(data.post.revenue[0].district_name)
                                                                                               content1.find('.content_block_kyfl').text(data.post.revenue[0].block_name)
                                                                                               content1.find('.content_gp_kyfl').text(data.post.revenue[0].grampanchayat_name)
                                                                                               content1.find('.content_village_kyfl').text(data.post.revenue[0].revenue_village_name)



                                                                                                // document.getElementById("jettytext").style.visibility = 'hidden';
                                                                                        }
                                                                                     })


                                                                                      overlay.setPosition(evt.coordinate);
                                                                                      $('#pills-tab a').on('click', function (event) {
                                                                                        event.preventDefault()
                                                                                        $(this).tab('show')
                                                                                      })




                                       }

                                    }

                             });








     }
//$(element2).modal('show');
//      function assetclickevent(evt)
//         {
//                             if(!$('#clearTool').is('.d-none')){
//                                 return;
//                             }
//
//     			                    var element1 = popupmodal.getElement();
//                                     var coordinate = evt.coordinate;
//                                     var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
//                                     // var hdms = ol.proj.toLonLat(coordinate);
//
//                                     var lng = parseFloat(coordinate[0]).toFixed(6);
//                                     var lat = parseFloat(coordinate[1]).toFixed(6);
//                                     var coordinatesNew = ol.proj.transform([evt.coordinate[0], evt.coordinate[1]], 'EPSG:3857', 'EPSG:4326');
//                                     console.log("cordinates:" + coordinatesNew, $);
//                                     var content = $('<div><p class="my-0">The location: </p></div>')
//                                     var title = ''
//                                     var show = true
//                                      content = $(asset_viewer2.html());
//                                    // content = $(modalassets.html());
////                                                                   $.ajax({
////                                                                       type: "POST",
////                                                                       url: "https://odisha4kgeo.in/index.php/mapview/showForestRevenueInfo",
////                                                                       data: {cordinates: coordinatesNew},
////                                                                       dataType : "json",
////                                                                       success: function(data){
////                                                                                if(data.status == 0){
////                                                                                show= false;
////                                                                                content.addClass("d-none")
////                                                                                 $(element).popover('hide');
////                                                                                } else{
////                                                                              content.find('.content_district_kyfl').innerHTML(data.post.revenue[0].district_name)
////                                                                              content.find('.content_block_kyfl').text(data.post.revenue[0].block_name)
////                                                                              content.find('.content_gp_kyfl').text(data.post.revenue[0].grampanchayat_name)
////                                                                              content.find('.content_village_kyfl').text(data.post.revenue[0].revenue_village_name)
////
////                                                                                }
////
////                                                                               // document.getElementById("jettytext").style.visibility = 'hidden';
////                                                                       }
////                                                                    })
//
//                                                 // document.getElementById("content_district").innerHTML = "Jetty";
//                                                 //content.find('.content_district_kyfl').text="test";
//                                                 content.append('<code>Location: ' + hdms + '</code>')
//                                                 let open = content.find('.picture-gallery1')
//                                                 content.find('.picture-gallery-div1').removeClass('d-none')
//                                                 open.append('<div class="clearfix"></div>')
//                                                 content.find('.picture-gallery-div1 a').on('click', function(e){
//                                                 content.innerHTML = 'Loading...' ;
//
//                                               e.preventDefault();
//
//                                              var  location_deatils = "kyflinfo.html?cordinates=" + coordinatesNew;
//                                                 window.open(location_deatils, '_blank');
//                                               })
//
//
//
//                                                 popupmodal.setPosition(coordinate);
//                                                 $(element1).popover({
//                                                     container: element1,
//                                                     placement: 'auto',
//                                                     animation: false,
//                                                     html: true,
//                                                     content:content,
//                                                     title: title
//                                                 });
//                                                 $(element1).popover('show');
//
//
//
//
//          }





 function jetty(evt)
    {
                 var show = true
                $("#jettyid").empty();
              $("#flc").empty();
              $("#cyclone_shlt").empty();
            var jettydata;
                var element = popup.getElement();
    			var view = olMap.getView();
    			var viewResolution = view.getResolution();
    			var source = mapapi.ofaris_notified_jetty_limit.getSource();
                content = $(asset_viewer2.html());
    			var coords = evt.coordinate;
                coords = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');
                var lng = parseFloat(coords[0]).toFixed(6);
                var lat = parseFloat(coords[1]).toFixed(6);
    		    jettyinfo = "<table class='table table-hover table-stripped table-bordered'><tr><td>Latitude:</td><td>" + lat + "</td></tr><tr><td>Longitude:</td><td>" + lng + "</td></tr>";
    			var url = source.getGetFeatureInfoUrl(
    			  evt.coordinate, viewResolution, view.getProjection(),
    			  {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50,'format_options':'callback:getJson'});//alert(url);
                    $.ajax({
                            type: "GET",
                            url:url,
                            dataType: 'jsonp',
                            jsonpCallback: 'getJson',
                            contentType:'application/x-www-form-urlencoded; charset=GBK',
                            success: function (data) {
                            if(data.features.length>0){
                              $('#content_jetty_id').html("");

                              $("#jettyid").html("<td id='jtd' style='color:#2216de;'></td><td id='content_jetty_id'></td>")
                             // $('#jtd').html("");
                             // $('#jettyid').html("");

//                             document.getElementById("content_jetty_id").style.visibility = 'visible';
                               jettydata = data.features[0].properties.jetty_name;
//                    jettyinfo += "<tr><td>" + "Jetty Name" + ":</td><td>" + data.features[0].properties.jetty_name + "</td></tr>";
//                    var name = data.features[0].properties.jetty_name;
//                    content1.innerHTML = jettyinfo + '</table>';
//                    document.getElementById("popup-data").style.visibility = 'visible';
//                    //document.getElementById("popup").style.visibility = 'hidden';
//                    overlay.setPosition(evt.coordinate);

                       //document.getElementById("jettytext").style.visibility = 'visible';
                           //document.getElementById("jettytext").innerHTML = "Jetty";
                           //$("#jettyid").removeClass("d-none")
                           //$('#jtd').html("Jetty");
                        // $('#content_jetty_id').html(jettydata);
                         //content1.find('#content_jetty_id').text(jettydata)
                            document.getElementById("jtd").innerHTML = "<strong>Jetty</strong>";
                          document.getElementById("content_jetty_id").innerHTML = jettydata;

                        }

                      }

                        });
                         //document.getElementById("jettytext").style.visibility = 'visible';

    }


     function cycloneshelter(evt)
        {
                     $("#jettyid").empty();
                      $("#flc").empty();
                      $("#cyclone_shlt").empty();
                    var show = true

                    var cyclonedata;
                    var element = popup.getElement();
        			var view = olMap.getView();
        			var viewResolution = view.getResolution();
        			var source = mapapi.ofaris_multi_cyclone.getSource();
                    content = $(asset_viewer2.html());
        			var coords = evt.coordinate;
                    coords = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');
                    var lng = parseFloat(coords[0]).toFixed(6);
                    var lat = parseFloat(coords[1]).toFixed(6);
        		   // jettyinfo = "<table class='table table-hover table-stripped table-bordered'><tr><td>Latitude:</td><td>" + lat + "</td></tr><tr><td>Longitude:</td><td>" + lng + "</td></tr>";

        			if(mapapi.ofaris_multi_cyclone.N.visible == true)
        			{
        			var url = source.getGetFeatureInfoUrl(
                        			  evt.coordinate, viewResolution, view.getProjection(),
                        			  {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50,'format_options':'callback:parsecyclone'});//alert(url);
                                        $.ajax({
                                                type: "GET",
                                                url:url,
                                                dataType: 'jsonp',
                                                jsonpCallback: 'parsecyclone',
                                                contentType:'application/x-www-form-urlencoded; charset=GBK',
                                                success: function (data) {
                                                if(data.features.length>0){
                                                 $('#cyclone_st_tst').html("");
                                                 $("#cyclone_shlt").html("<td id='cyclone_st' style='color:#2216de;'></td><td id='cyclone_st_tst'></td>")

                    //                             document.getElementById("content_jetty_id").style.visibility = 'visible';
                                                   cyclonedata =data.features[0].properties.name;
                    //                    jettyinfo += "<tr><td>" + "Jetty Name" + ":</td><td>" + data.features[0].properties.jetty_name + "</td></tr>";
                    //                    var name = data.features[0].properties.jetty_name;
                    //                    content1.innerHTML = jettyinfo + '</table>';
                    //                    document.getElementById("popup-data").style.visibility = 'visible';
                    //                    //document.getElementById("popup").style.visibility = 'hidden';
                    //                    overlay.setPosition(evt.coordinate);


                                               document.getElementById("cyclone_st").innerHTML = "<strong>Cyclone Shelter</strong>";
                                              document.getElementById("cyclone_st_tst").innerHTML = cyclonedata;

                                            }

                                          }

                                            });

        			}

                             //document.getElementById("jettytext").style.visibility = 'visible';

        }
       function fishlandingcenter(evt)
              {
                        $("#jettyid").empty();
                         $("#flc").empty();
                         $("#cyclone_shlt").empty();
                          var show = true

                          var fishlandingcenterdata;
                          var element = popup.getElement();
              			var view = olMap.getView();
              			var viewResolution = view.getResolution();
              			var source = mapapi.ofaris_fish_landing_center.getSource();
                          content = $(asset_viewer2.html());
              			var coords = evt.coordinate;
                          coords = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');
                          var lng = parseFloat(coords[0]).toFixed(6);
                          var lat = parseFloat(coords[1]).toFixed(6);
              		    fishinfo = "<table class='table table-hover table-stripped table-bordered'><tr><td>Latitude:</td><td>" + lat + "</td></tr><tr><td>Longitude:</td><td>" + lng + "</td></tr>";

              			if(mapapi.ofaris_fish_landing_center.N.visible == true)
              			{
              			var url = source.getGetFeatureInfoUrl(
                              			  evt.coordinate, viewResolution, view.getProjection(),
                              			  {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50,'format_options':'callback:parsefish'});//alert(url);
                                              $.ajax({
                                                      type: "GET",
                                                      url:url,
                                                      dataType: 'jsonp',
                                                      jsonpCallback: 'parsefish',
                                                      contentType:'application/x-www-form-urlencoded; charset=GBK',
                                                      success: function (data) {
                                                      if(data.features.length>0){
                                                             $('#flc_id').html("");
                                                              $("#flc").html("<td id='flcc' style='color:#2216de;'></td><td id='flc_id'></td>")
                          //                             document.getElementById("content_jetty_id").style.visibility = 'visible';
                                                         fishlandingcenterdata =data.features[0].properties.fish_landing_center;



                                                    document.getElementById("flcc").innerHTML = "<strong>Fish Landing Center</strong>";
                                                    document.getElementById("flc_id").innerHTML = fishlandingcenterdata;

                                                  }

                                                }

                                                  });

              			}

                                   //document.getElementById("jettytext").style.visibility = 'visible';

              }
//    function assetmorekyfl(coordinatesnew,hdms){
//    content = $(asset_viewer.html());
//
//             $.ajax({
//                                                                  type: "POST",
//                                                                  url: "https://odisha4kgeo.in/index.php/mapview/showForestRevenueInfo",
//                                                                  data: {cordinates: coordinatesnew},
//                                                                  dataType : "json",
//                                                                  success: function(data){
//                                                                content.append('<code>Location: ' + hdms + '</code>')
//                                                                let open = content.find('.picture-gallery1')
//                                                                content.find('.picture-gallery-div1').removeClass('d-none')
//                                                                open.append('<div class="clearfix"></div>')
//                                                                content.find('.picture-gallery-div1 a').on('click', function(e){
//                                                                content.innerHTML = 'Loading...' ;
//
//                                                              e.preventDefault();
//
//                                                             var  location_deatils = "kyflinfo.html?cordinates=" + coordinatesNew;
//                                                                window.open(location_deatils, '_blank');
//                                                              })
//
//
//                                                                          // document.getElementById("jettytext").style.visibility = 'hidden';
//                                                                  }
//                       })
//
//
//    }


    return {
        pointonmap,
        polygononmap,
         polygononmap2,
         catwiseassetmap,
         allasetmapped,
        lineonmap,
        imageonmap,
        pointonmap2,
        assetclickevent,
        jetty,


        cycloneshelter,
        fishlandingcenter
    }

})(jQuery, mapapi.olMap)
///

function getUrlVars() {

    var vars = {};
    var geturl= window.location.href;
//     var enc = encodeURIComponent(geturl);
      var dec = decodeURIComponent(geturl);
     var res =  dec.replace("%2C",",");

     res.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
     vars[key] = value;
    });
    return vars;
}
//function getUrlVars() {
//    var urlString=window.location.href;
//    var paramString = urlString.split('?')[1];
//    var queryString = new URLSearchParams(atob(paramString));
//    var vars = {};
//    for (let pair of queryString.entries()) {
//        vars[pair[0]] = pair[1];
//    }
////    var vars = {};
////    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
////    vars[key] = value;
////    });
//    return vars;
//}
jQuery(function($){
    parameters = getUrlVars();
   parameterswb=getUrlVars();
    console.log(parameters)
    //console.log(parameterswb)
    if(Object.keys(parameters)[0]=="id")
    {
    singleassetinfo(parameters.id);
    }
    else if (Object.keys(parameters)[0]=="data")
    {
    multipleassetinfo(parameters.data)
    }
     else(Object.keys(parameters)[0]=="zone")
        {
        waterbodyinfo(parameterswb.zone,parameterswb.district,parameterswb.block,parameterswb.gramPanchayat,parameterswb.operator,parameterswb.value);
        }
    if(Object.keys(parameters).length == 0){
        return
    }




function singleassetinfo(asset_id)
{
var params2 = {

                        "assetId" : asset_id,

                        "year" : "",
                         "deptId":1

      }

      $.ajax({
                  type: "POST",
                  url: service_url +'/getAssetViewByAssetId',
                  data: JSON.stringify(params2),
                  contentType:"application/json",
                  dataType: 'json',
                  success: function (response) {
                     console.log(response)
                             var dataObj = response.post;

                             for(i = 0; i < dataObj.length; i++)
                             {
                               console.log(dataObj[i].asset_list[i].assetName)
                               txtgeom = JSON.parse(dataObj[i].asset_list[i].geojson)
                               console.log(txtgeom)
                               console.log(global_image_url)
                               var dataObj= dataObj[i].asset_list[i]
                             }




                               var dataimage = response.post
                     //       var imgarr = dataimage[0].assetImageList
                     //        for(i = 0; i < imgarr.length; i++)
                     //        {
                     //         dataimage[0].assetImageList[i]
                     //        }



                             if(response.status != 1){
                                 return
                             }
                             if(txtgeom.type == "Point"){
                                  maputils.pointonmap(txtgeom.coordinates,response.post[0].additional_attribute_value[0], dataObj,dataimage[0].asset_image_list)
                                  maputils.imageonmap(dataimage[0].asset_image_list, [dataObj.assetName, dataObj.assetId])
                                 //maputils.imageonmap(dataObj.imgarr, [dataObj.asset_name, dataObj.asset_code])
                             }
                             if(txtgeom.type == "LineString"){
                                 mapapi.lineonmap(txtgeom.coordinates)
                             }
                             if(txtgeom.type == "Polygon"){
                                  maputils.polygononmap(txtgeom.coordinates,response.post[0].additional_attribute_value[0],dataObj,dataimage[0].asset_image_list)
                                  maputils.imageonmap(dataimage[0].asset_image_list, [dataObj.assetName, dataObj.assetId])
                                 //maputils.imageonmap(dataObj.imgarr, [dataObj.asset_name, dataObj.asset_code])
                            }
                  },
                  error: function (response) {
      //                                        Swal.fire({
      //                                                             icon: 'error',
      //                                                             title: '',
      //                                                             text: 'Please Contact Admin'
      //
      //                                                   })
      console.log(response)
                  }
              });
}
function waterbodyinfo(zoneid2,distid2,blockid2,gpid2,operator,value){

var vectorSourceZone = new ol.source.Vector()
                     var featureOverlayZone = new ol.layer.Vector({
                         map: mapapi.olMap,
                         updateWhileAnimating: true,
                         updateWhileInteracting: true
                     })
                     var textZone = new ol.style.Style({
                         stroke: new ol.style.Stroke({
                             color: '#006400',
                             width: 7.5,
                             lineDash: [8, 5]
                         }),
                         text: new ol.style.Text({
                             font: '20px Times New Roman',
                             fill: new ol.style.Fill({
                                 color: '#000000'
                             }),
                             stroke: new ol.style.Stroke({
                                 color: '#fff',
                                 width: 2
                             }),
                         })
                     })

                      var vectorSourceDistrict = new ol.source.Vector()
                         var featureOverlayDistrict = new ol.layer.Vector({
                             map: mapapi.olMap,
                             updateWhileAnimating: true,
                             updateWhileInteracting: true
                         })
                         var textDistrict = new ol.style.Style({
                             stroke: new ol.style.Stroke({
                                 color: '#4287f5',
                                 width: 6.5,
                                 lineDash: [6, 4]
                             }),
                             text: new ol.style.Text({
                                 font: '18px Times New Roman',
                                 fill: new ol.style.Fill({
                                     color: '#000000'
                                 }),
                                 stroke: new ol.style.Stroke({
                                     color: '#fff',
                                     width: 2
                                 }),
                             })
                         })


                         var vectorSourceBlock = new ol.source.Vector()
                         var featureOverlayBlock = new ol.layer.Vector({
                             map: mapapi.olMap,
                             updateWhileAnimating: true,
                             updateWhileInteracting: true
                         })
                         var textBlock = new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                 color: '#512059',
                                 width: 3.5,
                                 lineDash: [8, 5]
                             }),
                             text: new ol.style.Text({
                                 font: '15px Times New Roman',
                                 fill: new ol.style.Fill({
                                     color: '#000000'
                                 }),
                                 stroke: new ol.style.Stroke({
                                     color: '#fff',
                                     width: 2
                                 }),
                             })
                         })

                    var vectorSourceGP = new ol.source.Vector()
                         var featureOverlayGP = new ol.layer.Vector({
                             map: mapapi.olMap,
                             updateWhileAnimating: true,
                             updateWhileInteracting: true
                         })
                         var textGP = new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                 color: '#512059',
                                 width: 3.5,
                                 lineDash: [8, 5]
                             }),
                             text: new ol.style.Text({
                                 font: '15px Times New Roman',
                                 fill: new ol.style.Fill({
                                     color: '#000000'
                                 }),
                                 stroke: new ol.style.Stroke({
                                     color: '#fff',
                                     width: 2
                                 }),
                             })
                         })
                 var vectorSourceVillage = new ol.source.Vector()
                         var featureOverlayVillage = new ol.layer.Vector({
                             map: mapapi.olMap,
                             updateWhileAnimating: true,
                             updateWhileInteracting: true
                         })
                         var textVillage = new ol.style.Style({
                                 stroke: new ol.style.Stroke({
                                     color: '#a3912a',
                                     width: 7.5,
                                     lineDash: [8, 5]
                                 }),
                                 text: new ol.style.Text({
                                     font: '12px Times New Roman',
                                     fill: new ol.style.Fill({
                                         color: '#000000'
                                     }),
                                     stroke: new ol.style.Stroke({
                                         color: '#fff',
                                         width: 2
                                     }),
                                 })
                         })


 var cqlFilterwb=null;
      var paramswb;

      if(parameterswb.zone=="0" && parameterswb.district=="0" && parameterswb.block=="0" && parameterswb.gramPanchayat=="0" )
      {


            paramswb = {
                             "LAYERS": "waterbody_village_map",
                             "TILED": "true",
                             "VERSION": "1.3.0",
                             "STYLES":"waterbody_filter"
                             //"CQL_FILTER": cqlFilterwb

                         };
                         mapapi.ofaris_waterbody.N.source.updateParams(paramswb)

      }

     if(parameterswb.zone!="0" && parameterswb.district=="0" && parameterswb.block=="0" && parameterswb.gramPanchayat=="0" )
      {
             paramswb={};
                     //$('#loader').removeClass('hidden')
                      axios({
                             method: 'get',
                             url: service_url +'/getZoneByIdAsGeoJson/' + parameterswb.zone


                         })
                         .then((response) => {
                         if(response.data.post.length >0)
                                            {
                                              for(i=0;i<response.data.post.length;i++){
                                               var geomzone =response.data.post[i].geom;
                                               //console.log(geomzone);

                                           let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.data.post[i].geom + '}'
                                           let gjFormatpoly = new ol.format.GeoJSON({
                                               featureProjection: 'EPSG:3857',
                                               strategy: ol.loadingstrategy.bbox,
                                           })

                                           vectorSourceZone.clear()
                                           vectorSourceZone.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                          // textCircle.getText().setText(zoneNames[val])
                                           featureOverlayZone.setSource(vectorSourceZone)
                                           featureOverlayZone.setStyle(textZone)

                                           mapapi.olMap.getView().fit(vectorSourceZone.getExtent(), {
                                               size: mapapi.olMap.getSize(),
                                               maxZoom: 7.5
                                           })

                                           cqlFilterwb="f_zone_id="+ parameterswb.zone + "";
                                                             paramswb = {
                                                                 "LAYERS": "waterbody_village_map",
                                                                 "TILED": "true",
                                                                 "VERSION": "1.3.0",
                                                                 "STYLES":"waterbody_filter",
                                                                 "CQL_FILTER": cqlFilterwb

                                                             };
                                                             mapapi.ofaris_waterbody.N.source.updateParams(paramswb)




                                              }
                                           }
                       //  $('#loader').addClass('hidden')

                         })

                         .catch((err) => {
                             console.log(err);
                         })




      }
     if(parameterswb.zone!="0" && parameterswb.district!="0" && parameterswb.block=="0" && parameterswb.gramPanchayat=="0" )
           {
 paramswb={};
             cqlFilterwb="";

                  // $('#loader').removeClass('hidden')
                     axios({
                                method: 'get',
                                url: service_url +'/getDistrictByIdAsGeoJson/' + parameterswb.district


                      })
                    .then((response) => {
                    if(response.data.post.length >0)
                                       {
                                         for(i=0;i<response.data.post.length;i++){
                                          var geomzone =response.data.post[i].geom;
                                          //console.log(geomzone);

                                      let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.data.post[i].geom + '}'
                                      let gjFormatpoly = new ol.format.GeoJSON({
                                          featureProjection: 'EPSG:3857',
                                          strategy: ol.loadingstrategy.bbox,
                                      })

                                     vectorSourceZone.clear()
                                     vectorSourceDistrict.clear()
                                     vectorSourceDistrict.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                     //textDivision.getText().setText(districtNames[val])
                                     featureOverlayDistrict.setSource(vectorSourceDistrict)
                                     featureOverlayDistrict.setStyle(textDistrict)

                                     mapapi.olMap.getView().fit(vectorSourceDistrict.getExtent(), {
                                         size: mapapi.olMap.getSize(),
                                         maxZoom: 8.5
                                    })

                                     cqlFilterwb="f_zone_id="+ parameterswb.zone +  "and dist_id="+parameterswb.district +  "";
                                                           paramswb = {
                                                               "LAYERS": "waterbody_village_map",
                                                               "TILED": "true",
                                                               "VERSION": "1.3.0",
                                                               "STYLES":"waterbody_filter",
                                                               "CQL_FILTER": cqlFilterwb

                                                           };
                                         mapapi.ofaris_waterbody.N.source.updateParams(paramswb)
                                        // $('#loader').addClass('hidden')

                                         }
                                      }


                    })
                    .catch((err) => {
                        console.log(err);
                    })

           }

            if(parameterswb.zone!="0" && parameterswb.district!="0" && parameterswb.block!="0" && parameterswb.gramPanchayat=="0" && operator!="0" && value!="0" )
             {
             paramswb={};
                                   //  $('#loader').removeClass('hidden')

                                             axios({
                                                         method: 'get',
                                                         url: service_url +'/getBlockByIdAsGeoJson/' + parameterswb.block


                                               })
                                             .then((response) => {
                                             if(response.data.post.length >0)
                                                                {
                                                                  for(i=0;i<response.data.post.length;i++){
                                                                   var geomzone =response.data.post[i].geom;
                                                                   //console.log(geomzone);

                                                               let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.data.post[i].geom + '}'
                                                               let gjFormatpoly = new ol.format.GeoJSON({
                                                                   featureProjection: 'EPSG:3857',
                                                                   strategy: ol.loadingstrategy.bbox,
                                                               })

                                                             vectorSourceZone.clear()
                                                             vectorSourceDistrict.clear()
                                                             vectorSourceBlock.clear()
                                                             vectorSourceBlock.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                                             //textDivision.getText().setText(blockNames[val])
                                                             featureOverlayBlock.setSource(vectorSourceBlock)
                                                             featureOverlayBlock.setStyle(textBlock)

                                                             mapapi.olMap.getView().fit(vectorSourceBlock.getExtent(), {
                                                                 size: mapapi.olMap.getSize(),
                                                                 maxZoom: 9
                                                              })

                                                             cqlFilterwb="f_zone_id="+ parameterswb.zone +  "and dist_id="+parameterswb.district + "and  block_id="+ parameterswb.block + "and area_ac"+operator+""+ value + "";
                                                                                      paramswb = {
                                                                                          "LAYERS": "waterbody_village_map",
                                                                                          "TILED": "true",
                                                                                          "VERSION": "1.3.0",
                                                                                          "STYLES":"waterbody_filter",
                                                                                          "CQL_FILTER": cqlFilterwb

                                                                                      };
                                                              mapapi.ofaris_waterbody.N.source.updateParams(paramswb)
                                                          //   $('#loader').addClass('hidden')

                                                                  }
                                                               }


                                             })
                                             .catch((err) => {
                                                 console.log(err);
                                             })




             }

           if(parameterswb.zone!="0" && parameterswb.district!="0" && parameterswb.block!="0" && parameterswb.gramPanchayat=="0" && operator=="0" && value=="0" )
                        {
                        paramswb={};
                                              //  $('#loader').removeClass('hidden')

                                                        axios({
                                                                    method: 'get',
                                                                    url: service_url +'/getBlockByIdAsGeoJson/' + parameterswb.block


                                                          })
                                                        .then((response) => {
                                                        if(response.data.post.length >0)
                                                                           {
                                                                             for(i=0;i<response.data.post.length;i++){
                                                                              var geomzone =response.data.post[i].geom;
                                                                              //console.log(geomzone);

                                                                          let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.data.post[i].geom + '}'
                                                                          let gjFormatpoly = new ol.format.GeoJSON({
                                                                              featureProjection: 'EPSG:3857',
                                                                              strategy: ol.loadingstrategy.bbox,
                                                                          })

                                                                        vectorSourceZone.clear()
                                                                        vectorSourceDistrict.clear()
                                                                        vectorSourceBlock.clear()
                                                                        vectorSourceBlock.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                                                        //textDivision.getText().setText(blockNames[val])
                                                                        featureOverlayBlock.setSource(vectorSourceBlock)
                                                                        featureOverlayBlock.setStyle(textBlock)

                                                                        mapapi.olMap.getView().fit(vectorSourceBlock.getExtent(), {
                                                                            size: mapapi.olMap.getSize(),
                                                                            maxZoom: 9
                                                                         })

                                                                        cqlFilterwb="f_zone_id="+ parameterswb.zone +  "and dist_id="+parameterswb.district + "and  block_id="+ parameterswb.block +"";
                                                                                                 paramswb = {
                                                                                                     "LAYERS": "waterbody_village_map",
                                                                                                     "TILED": "true",
                                                                                                     "VERSION": "1.3.0",
                                                                                                     "STYLES":"waterbody_filter",
                                                                                                     "CQL_FILTER": cqlFilterwb

                                                                                                 };
                                                                         mapapi.ofaris_waterbody.N.source.updateParams(paramswb)
                                                                     //   $('#loader').addClass('hidden')

                                                                             }
                                                                          }


                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        })




                        }
             if (parameterswb.zone!="0" && parameterswb.district!="0" && parameterswb.block!="0" && parameterswb.gramPanchayat!="0" && operator=="0" && value=="0")
                         {
                                     if(jQuery.isEmptyObject(parameterswb)) {
                                         // Object is empty (Would return true in this example)
                                     }
                                     else{
                                                    axios({
                                                                 method: 'get',
                                                                 url: service_url +'/getGpByIdAsGeoJson/' + parameterswb.gramPanchayat


                                                       })
                                             .then((response) => {
                                             if(response.data.post.length >0)
                                                                {
                                                                  for(i=0;i<response.data.post.length;i++){
                                                                   var geomzone =response.data.post[i].geom;
                                                                   //console.log(geomzone);

                                                               let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.data.post[i].geom + '}'
                                                               let gjFormatpoly = new ol.format.GeoJSON({
                                                                   featureProjection: 'EPSG:3857',
                                                                   strategy: ol.loadingstrategy.bbox,
                                                               })

                                                             vectorSourceZone.clear()
                                                             vectorSourceDistrict.clear()
                                                             vectorSourceBlock.clear()
                                                             vectorSourceGP.clear()
                                                             vectorSourceGP.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                                             //textDivision.getText().setText(GPNames[val])
                                                             featureOverlayGP.setSource(vectorSourceGP)
                                                             featureOverlayGP.setStyle(textGP)

                                                             mapapi.olMap.getView().fit(vectorSourceGP.getExtent(), {
                                                                 size: mapapi.olMap.getSize(),
                                                                 maxZoom: 14
                                                             })

                                            cqlFilterwb="f_zone_id="+ parameterswb.zone +  "and dist_id="+parameterswb.district + "and  block_id="+ parameterswb.block + "and  gp_id="+parameterswb.gramPanchayat + " ";
                                            paramswb = {
                                                "LAYERS": "waterbody_village_map",
                                                "TILED": "true",
                                                "VERSION": "1.3.0",
                                                "STYLES":"waterbody_filter",
                                                "CQL_FILTER": cqlFilterwb

                                            };
                                            mapapi.ofaris_waterbody.N.source.updateParams(paramswb)
                                                    // $('#loader').addClass('hidden')

                                                          }
                                                       }


                                             })
                                             .catch((err) => {
                                                 console.log(err);
                                             })
                                     }
                         }

                 if (parameterswb.zone!="0" && parameterswb.district!="0" && parameterswb.block!="0" && parameterswb.gramPanchayat!="0" && operator!="0" && value!="0")
                              {
                                          if(jQuery.isEmptyObject(parameterswb)) {
                                              // Object is empty (Would return true in this example)
                                          }
                                          else{
                                                         axios({
                                                                      method: 'get',
                                                                      url: service_url +'/getGpByIdAsGeoJson/' + parameterswb.gramPanchayat


                                                            })
                                                  .then((response) => {
                                                  if(response.data.post.length >0)
                                                                     {
                                                                       for(i=0;i<response.data.post.length;i++){
                                                                        var geomzone =response.data.post[i].geom;
                                                                        //console.log(geomzone);

                                                                    let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.data.post[i].geom + '}'
                                                                    let gjFormatpoly = new ol.format.GeoJSON({
                                                                        featureProjection: 'EPSG:3857',
                                                                        strategy: ol.loadingstrategy.bbox,
                                                                    })

                                                                  vectorSourceZone.clear()
                                                                  vectorSourceDistrict.clear()
                                                                  vectorSourceBlock.clear()
                                                                  vectorSourceGP.clear()
                                                                  vectorSourceGP.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                                                  //textDivision.getText().setText(GPNames[val])
                                                                  featureOverlayGP.setSource(vectorSourceGP)
                                                                  featureOverlayGP.setStyle(textGP)

                                                                  mapapi.olMap.getView().fit(vectorSourceGP.getExtent(), {
                                                                      size: mapapi.olMap.getSize(),
                                                                      maxZoom: 14
                                                                  })
                                                       cqlFilterwb="f_zone_id="+ parameterswb.zone +  "and dist_id="+parameterswb.district + "and  block_id="+ parameterswb.block + "and  gp_id="+parameterswb.gramPanchayat + "and area_ac"+operator+""+ value + "";


                                                 paramswb = {
                                                     "LAYERS": "waterbody_village_map",
                                                     "TILED": "true",
                                                     "VERSION": "1.3.0",
                                                     "STYLES":"waterbody_filter",
                                                     "CQL_FILTER": cqlFilterwb

                                                 };
                                                 mapapi.ofaris_waterbody.N.source.updateParams(paramswb)
                                                         // $('#loader').addClass('hidden')

                                                               }
                                                            }


                                                  })
                                                  .catch((err) => {
                                                      console.log(err);
                                                  })
                                          }
                              }


                          var view2 = olMap.getView();
                         			var zoom = view2.getZoom();
                         			var center = view2.getCenter();
                                     var rotation = view2.getRotation();

 $(".open-call3").on("click", function (e) {

           vectorSourceZone.clear()
          vectorSourceDistrict.clear()
          vectorSourceBlock.clear()
          vectorSourceGP.clear()
          vectorSourceVillage.clear()
          view2.setCenter(center);
         view2.setRotation(rotation);
         view2.setZoom(zoom);
          paramswb = {
                 "LAYERS": "waterbody_village_map",
                 "TILED": "true",
                 "VERSION": "1.3.0",
                 "STYLES":"Waterbody",
                 "CQL_FILTER": null


             };
               mapapi.ofaris_waterbody.N.source.updateParams(paramswb)

     });


}
function multipleassetinfo(multiassetid)
{
console.log(multiassetid)
var jj=multiassetid

var ttt=jj.replaceAll("}","")
var multiassetids=ttt.replaceAll("{","")
var multiasset = {

                        "assetId":multiassetids



      }
      var vectorSourcepolygon2 = new ol.source.Vector();
      var dataimage="";
       $.ajax({
                        type: "POST",
                        url: service_url +'/assetlist',
                        data: JSON.stringify(multiasset),
                        contentType:"application/json",
                        dataType: 'json',
                        success: function (response) {
                                                 vectorSourcepolygon2.clear();
                                                       //  $('#assetCount').text("Asset Count:" + response.post.length);
                                     if(response.post.length>0){
                                      for(i = 0; i < response.post[0].length; i++)
                                         {
                                           console.log(response.post[0][i].assetName)


                                           txtgeom = JSON.parse(response.post[0][i].geojson)
                                           console.log(txtgeom)
                                           //console.log(global_image_url)


                                             if(txtgeom.type!="GeometryCollection")
                                             {
                                              maputils.allasetmapped(vectorSourcepolygon2,txtgeom.coordinates,txtgeom.type,response.post[0],response.post[0][i], response.post[0][i].assetId,dataimage)
                                             }
                                          }
                                     }
                                     else{
                                           Swal.fire({
                                                       icon: 'error',
                                                       title: '',
                                                       text: 'No Asset Mapped'

                                             })

                                        }

                        },
                                        error: function (response) {
                              //                                        Swal.fire({
                              //                                                             icon: 'error',
                              //                                                             title: '',
                              //                                                             text: 'Please Contact Admin'
                              //
                              //                                                   })
                              console.log(response)
                                          }



                        });

}





//           cqlFilterwb="f_zone_id="+ parameterswb.district + "";
//                      paramswb = {
//                          "LAYERS": "waterbody_village_map",
//                          "TILED": "true",
//                          "VERSION": "1.3.0",
//                          "STYLES":"waterbody_filter",
//                          "CQL_FILTER": cqlFilterwb
//
//                      };
//                      mapapi.ofaris_waterbody.N.source.updateParams(paramswb)




})


