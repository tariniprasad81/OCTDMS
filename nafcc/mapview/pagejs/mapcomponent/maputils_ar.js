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

    function polygononmap(coodrinatespoly,data,dataimage) {
        console.log(data)
        var geojsonpoly = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetploygon",
                        data,dataimage
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
                             "name": "assetardSearch",
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
                            "name": "assetardSearch",
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
        new ol.layer.Vector({
        map:olMap,
        source:vectorSourceGraphics,
        style:[styleMarker2],
        updateWhileAnimating:true,
        updateWhileInteracting:true

        });

//    var featureOverlayimage = new ol.layer.Vector({
//        map:olMap,
//        source:vectorSourceGraphics,
//        style:[styleMarker2],
//        updateWhileAnimating:true,
//        updateWhileInteracting:true
//
//        });
        //olMap.getView().fit(featureOverlayimage.getSource().getExtent(), { size: olMap.getSize(), maxZoom: 15 });

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
                            "name": "assetardSearch",
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

    var popup = new ol.Overlay({
        element: document.getElementById('popup'),
    })
    olMap.addOverlay(popup)
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
//   var singleclickmapasset = olMap.on('singleclick', function (evt) {
//                    var element = popup.getElement();
//                    var coordinate = evt.coordinate;
//                    var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
//                    // var hdms = ol.proj.toLonLat(coordinate);
//
//                    var lng = parseFloat(coordinate[0]).toFixed(6);
//                    var lat = parseFloat(coordinate[1]).toFixed(6);
//
//                    var cord = 'Longitude: ' + lng + ', Latitude: ' + lat
//                    var coordinatesNew = ol.proj.transform([evt.coordinate[0], evt.coordinate[1]], 'EPSG:3857', 'EPSG:4326');
//                    $(element).popover('dispose');
//                    var content = $('<div><p class="my-0">The location: </p></div>')
//                    var title = ''
//                    var show = true
//                    olMap.forEachFeatureAtPixel(evt.pixel, function(feature){
//                        let featureProps = feature.getProperties()
//                        let data=null
//                        switch(featureProps.name){
//                            case 'assetploygon':
//                                data = featureProps.data
//                                title = data.assetName
//                                imgdata1=featureProps.dataimage
//                                content = $(asset_viewer.html());
//                                content.find('.content_dept').text(data.deptName)
////                                content.find('.content_zone').text(data.zoneName)
//                                content.find('.content_district').text(data.districtName)
//                                content.find('.content_block').text(data.blockName)
//                                content.find('.content_gp').text(data.gpName)
//                                content.find('.content_village').text(data.villageName)
//                                   let open = content.find('.picture-gallery1')
//                                     content.find('.picture-gallery-div1').removeClass('d-none')
//                                     open.append('<div class="clearfix"></div>')
//                                     content.find('.picture-gallery-div1 a').on('click', function(e){
//                                     content.innerHTML = 'Loading...' ;
//
//                                   e.preventDefault();
//
//                                  var  location_deatils = "kyflinfo.html?cordinates=" + coordinatesNew;
//                                     window.open(location_deatils, '_blank');
//                                   })
//                                let photo = Math.min(3, imgdata1.length)
//                                        if(photo > 0){
//                                                let pict = content.find('.picture-gallery')
//                                                content.find('.picture-gallery-div').removeClass('d-none')
//                                                            for(let i = 0; i < photo; i++){
//                                                                let p = global_image_url +'/'+ imgdata1[i].assetId+'/'+ imgdata1[i].imageName
//                                                                pict.append($('<span />').html($('<img class="img-thumbnail" />').attr('src', p)))
//                                                            }
//                                                            pict.append('<div class="clearfix"></div>')
//                                                            content.find('.picture-gallery-div a').on('click', function(e){
//                                                                e.preventDefault()
//                                                                let photoarr = []
//                                                                imgdata1.forEach((p) => {
//                                                                    photoarr.push({src: global_image_url +'/'+p.assetId+'/'+p.imageName})
//                                                                })
//                                                                $.fancybox.open(photoarr, {loop : true})
//                                                            })
//                                                        }
//                                break;
//
//                            case 'assetline':
//                                title = 'Asset Line'
//                                break;
//
//                            case 'imageasset':
//                                title = featureProps.imgdata.name
//                                content = $('<div><img id="td_img" class="img-fluid" /><br /></div>')
//                                content.find('img').attr('src', featureProps.imgdata.path)
//                                // content.find('img').fancybox()
//                                break;
//
//                            case 'assetpoint':
//                            data = featureProps.data
//                            imgdata1=featureProps.dataimage
//                             title = data.assetName
//
//
//                                if(data.assetCode){
//                                    title += ' (Code: ' + data.assetCode + ')'
//                                }
//                      content = $(asset_viewer.html());
//                      content.find('.content_dept').text(data.deptName)
//                      content.find('.content_zone').text(data.zoneName)
//                      content.find('.content_district').text(data.districtName)
//                      content.find('.content_block').text(data.blockName)
//                      content.find('.content_gp').text(data.gpName)
//                      content.find('.content_village').text(data.villageName)
//
//                                let photocnt = Math.min(3, imgdata1.length)
//                                if(photocnt > 0){
//                                    let pict = content.find('.picture-gallery')
//                                    content.find('.picture-gallery-div').removeClass('d-none')
//                                    for(let i = 0; i < photocnt; i++){
//                                        let p = global_image_url +'/'+ imgdata1[i].assetId+'/'+ imgdata1[i].imageName
//                                        pict.append($('<span />').html($('<img class="img-thumbnail" />').attr('src', p)))
//                                    }
//                                    pict.append('<div class="clearfix"></div>')
//                                    content.find('.picture-gallery-div a').on('click', function(e){
//                                        e.preventDefault()
//                                        let photoarr = []
//                                        imgdata1.forEach((p) => {
//                                            photoarr.push({src: global_image_url +'/'+p.assetId+'/'+p.imageName})
//                                        })
//                                        $.fancybox.open(photoarr, {loop : true})
//                                    })
//                                }
//                                break;
//
//                            default:
//                                show = false
//                        }
//                    })
//                    if(show === true && title != ''){
//                        content.append('<code>Location: ' + hdms + '</code>')
//
//                        popup.setPosition(coordinate);
//                        $(element).popover({
//                            container: element,
//                            placement: 'auto',
//                            animation: false,
//                            html: true,
//                            content:content,
//                            title: title
//                        });
//                        $(element).popover('show');
//                    }
//                })

    var asset_viewer2 = $('#asset_viewer2')
    olMap.on('singleclick', assetclickevent);
    olMap.on('singleclick', ardcensusinfo);

     var jettyinfo = "";


    function assetclickevent(evt)
       {

                          document.getElementById("popup-data").style.visibility = 'visible'
                          $("#pills-profile-tab").hide()
                           $("#pills-water-tab").hide()
                             $("#pills-mi-tab").hide()
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
                                   //var watersource = mapapi.ofaris_waterbody.getSource();
                                 //var soiltexture= mapapi.wmslayer_soiltexture.getSource();
                                   var lng = parseFloat(coordinate[0]).toFixed(6);
                                   var lat = parseFloat(coordinate[1]).toFixed(6);
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
                                       dataType : "json",
                                       success: function(data){
                                                //console.log(data)
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

                                                   }
                                                        });


                  olMap.forEachFeatureAtPixel(evt.pixel, function(feature){


                                   let featureProps = feature.getProperties()
                                   let data=null
                                   let addinntional_att= null
                                   assetinfo="";
                                  var assetinfob="";
                                   switch(featureProps.name){
                                       case 'assetploygon':
                                       $("#pills-tab").removeClass('d-none');
                                       $('#pills-profile').removeClass('d-none')
                                      $('#pills-contact').removeClass('d-none')
                                      $('#pills-home').removeClass('d-none')
                                        $('#imagedta').addClass('d-none')
                                        $("#pills-profile-tab").show()

                                            data = featureProps.data
                                          addinntional_att=featureProps.additionalAttribute
                                          imgdata3=featureProps.dataimage
                                           title = data.assetName

                                             if(data.categoryId=1)
                                                       {
                                                            assetinfob="";
                                                            assetinfob += "<tr>";
                                                            assetinfob += "<td style='color:#2216de;'><strong>Egg Production</strong></td>";
                                                            assetinfob += "<td>" + addinntional_att.eggProduction+ "</td>";
                                                            assetinfob += "</tr>";
                                                             if(addinntional_att.schemeName!=null){
                                                                              assetinfob += "<tr>";
                                                                              assetinfob += "<td style='color:#2216de;'><strong>Scheme</strong></td>";
                                                                              assetinfob += "<td>" + addinntional_att.schemeName+ "</td>";
                                                                              assetinfob += "</tr>";
                                                                 }

                                                            assetinfob += "<tr>";
                                                            assetinfob += "<td style='color:#2216de;'><strong>Present Capacity</strong></td>";
                                                            assetinfob += "<td>" + addinntional_att.presentCapacityUnit+ "</td>";
                                                            assetinfob += "</tr>";
                                                            assetinfob += "<tr>";
                                                           assetinfob += "<td style='color:#2216de;'><strong>Type Of Firm</strong></td>";
                                                           assetinfob += "<td>" + addinntional_att.typeOfFarm+ "</td>";
                                                           assetinfob += "</tr>";
                                                        assetinfob += "<tr>";
                                                       assetinfob += "<td style='color:#2216de;'><strong>Production Scale</strong></td>";
                                                       assetinfob += "<td>" + addinntional_att.productionScale+ "</td>";
                                                       assetinfob += "</tr>";
                                                        assetinfob += "<tr>";
                                                       assetinfob += "<td style='color:#2216de;'><strong>Type Of Finance</strong></td>";
                                                       assetinfob += "<td>" + addinntional_att.typeOfFinance+ "</td>";
                                                       assetinfob += "</tr>";

                                                  }

                                    assetinfo = "<table class='table table-striped tableq'>";
                                   assetinfo += "<tr>";
                                   assetinfo += "<td style='color:#2216de;'><strong>District</strong></td>";
                                   assetinfo += "<td>" + data.districtName + "</td>";
                                   assetinfo += "</tr>";
                                   assetinfo += "<tr>";
                                   assetinfo += "<td style='color:#2216de;'><strong>Sub Division</strong></td>";
                                   assetinfo += "<td>"+ data.subDivisionName +"</td>";
                                   assetinfo += "</tr>";
                                   assetinfo += "<tr>";
                                   assetinfo += "<td style='color:#2216de;'><strong>VDVH</strong></td>";
                                   assetinfo += "<td>"+ data.vdVhName +"</td>";
                                   assetinfo += "</tr>";
                                   assetinfo += "<tr>";
                                   assetinfo += "<td style='color:#2216de;'><strong>LAC</strong></td>";
                                   assetinfo += "<td>"+ data.lacname +"</td>";
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
                                   assetinfo += "<p class='text-muted'><strong>Photo Gallery</strong></p><div class='picture-gallery3 row'></div>";
                                    assetinfo += " <div class='text-center'><a href='#'>All Photos</a></div>";
                                    assetinfo += "</div></td>";

                                    assetinfo += "</tr>";
                                   assetinfo += "</table>";




                                  $('#pills-profile').html(assetinfo);
                                  if(imgdata3.length==0)
                                       {
                                       content1.find('.picture-gallery-div3').addClass('d-none')
                                       }
                                         let photocnt5 = Math.min(3, imgdata3.length)
                                         if(photocnt5 > 0){
                                          $('.picture-gallery3').empty();
                                             let pict4 = content1.find('.picture-gallery3')
                                             content1.find('.picture-gallery-div3').removeClass('d-none')
                                             for(let i = 0; i < photocnt5; i++){
                                                 let p = global_image_url +'/'+ imgdata3[i].assetId+'/'+ imgdata3[i].imageName
                                                 pict4.append($('<div class="col" />').html($('<img class="img-thumbnail"  />').attr('src', p)))
                                             }
                                             //pict3.append('<div class="clearfix"></div>')
                                             content1.find('.picture-gallery-div3 a').on('click', function(e){
                                                 e.preventDefault()
                                                 let photoarr = []
                                                 imgdata3.forEach((p) => {
                                                     photoarr.push({src: global_image_url +'/'+p.assetId+'/'+p.imageName})
                                                 })
                                                 $.fancybox.open(photoarr, {loop : true})
                                             })

                                         }
                                   $("#pills-profile-tab").show()
                                           break;

                                       case 'assetline':
                                           title = 'Asset Line'
                                            $('#imagedta').addClass('d-none')
                                             $('#pills-profile').removeClass('d-none')
                                           $('#pills-contact').removeClass('d-none')
                                           $('#pills-home').removeClass('d-none')
                                             $("#pills-profile-tab").show()
                                           break;

                                       case 'imageasset':

                                           $("#pills-tab").addClass('d-none');
                                            $('#pills-profile').addClass('d-none')
                                             $('#pills-contact').addClass('d-none')
                                             $('#pills-home').addClass('d-none')


                                           title = featureProps.imgdata.name
                                            imageinfo="";
                                            imageinfo += "<div><img id='td_img' style='height: auto; margin: 10px; padding: 6px;box-shadow: 9px 6px 14px #ae9c9c;' class='img-fluid image-error' /><br /></div>";

//                                           content1 = $('<div><img id="td_img" class="img-fluid" /><br /></div>')
                                            $('#imagedta').removeClass('d-none')
                                            $('#imagedta').html(imageinfo);
                                            $('#td_img').attr('src', featureProps.imgdata.path)
                                             $(".image-error").on("error", function () {
                                                  $(this).attr("src", "images/no_image.png");
                                            });
                                           // content.find('img').fancybox()
                                           break;

                                       case 'assetpoint':
                                       $("#pills-tab").removeClass('d-none');
                                         $("#pills-profile-tab").show()
                                          $('#imagedta').addClass('d-none')

                                      $('#pills-profile').removeClass('d-none')
                                       $('#pills-contact').removeClass('d-none')
                                       $('#pills-home').removeClass('d-none')



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
                                                                         "deptId" : 2
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
//
                                                            break;
                                           case 'assetardSearch':
                                                                      $("#pills-profile-tab").show()
                                                                 $('#imagedta').addClass('d-none')
                                                                  $("#pills-tab").removeClass('d-none')

                                                               $('#pills-profile').removeClass('d-none')
                                                                $('#pills-contact').removeClass('d-none')
                                                                $('#pills-home').removeClass('d-none')




                                                          //data = featureProps.data
//                                                            data2 = featureProps.assetid
//                                                            data3 =featureProps.datasingle
//                                                            console.log(data3)
//                                                            console.log(data2)
                                                           data4 = featureProps.assetid
                                                           data2 = featureProps.data
                                                           data3 = featureProps.datasingle
                                                           console.log(data3)
                                                           console.log(data2)

                                                       var asset_body = {
                                                                           "assetId" : data4,
                                                                           "year" : "",
                                                                           "deptId" : 2
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

                                           break;

                                       default:
                                           show = false
                                   }
                               })



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


   //                                            content1.append('<code>Location: ' + hdms + '</code>')
   //                                            let open = content1.find('.picture-gallery1')
   //                                            content1.find('.picture-gallery-div1').removeClass('d-none')
   //                                            open.append('<div class="clearfix"></div>')
   //                                            content1.find('.picture-gallery-div1 a').on('click', function(e){
   //                                            content1.innerHTML = 'Loading...' ;
   //
   //                                          e.preventDefault();
   //
   //                                         var  location_deatils = "kyflinfo.html?cordinates=" + coordinatesNew;
   //                                            window.open(location_deatils, '_blank');
   //                                          })



                                              // overlay.setPosition(coordinate);
   //                                            $(element).popover({
   //                                                container: element,
   //                                                placement: 'auto',
   //                                                animation: false,
   //                                                html: true,
   //                                                content:content1,
   //                                                title: title
   //                                            });
   //                                            $(element).popover('show');
   //                                             content1.innerHTML = tabinfo + "</div>";
                                               overlay.setPosition(evt.coordinate);
                                               $('#pills-tab a').on('click', function (event) {
                                                 event.preventDefault()
                                                 $(this).tab('show')
                                               })



        }

        function ardcensusinfo(evt)
        {

                         var ardcensusdata;
                           $('#pills-mi').removeClass('d-none');
                             var element = popup.getElement();
                 			var view = olMap.getView();
                 			var viewResolution = view.getResolution();
                 			var source = mapapi.ard_census_info.getSource();
                             content = $(asset_viewer2.html());
                 			var coords = evt.coordinate;
                             coords = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326');
                             var lng = parseFloat(coords[0]).toFixed(6);
                             var lat = parseFloat(coords[1]).toFixed(6);
                 		    ardcensusdata = "<table class='table table-hover table-stripped table-bordered'><tr><td>Latitude:</td><td>" + lat + "</td></tr><tr><td>Longitude:</td><td>" + lng + "</td></tr>";


                 			if(mapapi.ard_census_info.N.visible == true)
                               {
                                            var url = source.getGetFeatureInfoUrl(
                                              evt.coordinate, viewResolution, view.getProjection(),
                                              {'INFO_FORMAT': 'text/javascript', 'FEATURE_COUNT': 50,'format_options':'callback:getJsonArd'});//alert(url);
                                                 $.ajax({
                                                         type: "GET",
                                                         url:url,
                                                         dataType: 'jsonp',
                                                         jsonpCallback: 'getJsonArd',
                                                         contentType:'application/x-www-form-urlencoded; charset=GBK',
                                                         success: function (data) {
                                                         if(data.features.length>0){

                                                                 info = "<table class='table table-striped tableq'>";
                                                                 $("#pills-mi-tab").show()
                                                                 $('#pills-mi').show()
                                                                 if(data.features[0].properties.male_goat==null)
                                                                 {
                                                                info += "<tr>";
                                                                info += "<td style='color:#2216de;'><strong>No Data Available</strong></td>";
                                                                info += "</tr>";
                                                                 }
                                                               else{
                                                                   if(searchard.options[searchard.selectedIndex].value == "Male Goat")
                                                                   {
                                                                   info += "<tr>";
                                                                  info += "<td style='color:#2216de;'><strong>Male Goat</strong></td>";
                                                                  info += "<td>"+ data.features[0].properties.male_goat +"</td>";
                                                                  info += "</tr>";
                                                                   }
                                                                   else if(searchard.options[searchard.selectedIndex].value == "Female Goat")
                                                                   {
                                                                    info += "<tr>";
                                                                    info += "<td style='color:#2216de;'><strong>Female Goat</strong></td>";
                                                                     info += "<td>" + data.features[0].properties.female_goat + "</td>";
                                                                     info += "</tr>";
                                                                   }
                                                                    else if(searchard.options[searchard.selectedIndex].value == "Male Buffalo")
                                                                      {
                                                                       info += "<tr>";
                                                                        info += "<td style='color:#2216de;'><strong>Male Buffalo</strong></td>";
                                                                        info += "<td>" + data.features[0].properties.male_buffalo + "</td>";
                                                                        info += "</tr>";
                                                                      }
                                                                       else if(searchard.options[searchard.selectedIndex].value == "Female Buffalo")
                                                                        {
                                                                         info += "<tr>";
                                                                          info += "<td style='color:#2216de;'><strong>Female Buffalo</strong></td>";
                                                                          info += "<td>" + data.features[0].properties.female_buffalo + "</td>";
                                                                          info += "</tr>";
                                                                        }
                                                                 else{




                                                                  info += "<tr>";
                                                                  info += "<td style='color:#2216de;'><strong>Male Cattle</strong></td>";
                                                                  info += "<td>" + data.features[0].properties.male_cattle + "</td>";
                                                                 info += "</tr>";
                                                                  info += "<tr>";
                                                                  info += "<td style='color:#2216de;'><strong>Female Cattle</strong></td>";
                                                                 info += "<td>" + data.features[0].properties.female_cattle + "</td>";
                                                                  info += "</tr>";
                                                                  info += "<tr>";
                                                                  info += "<td style='color:#2216de;'><strong>Pig</strong></td>";
                                                                 info += "<td>" + data.features[0].properties.pig + "</td>";
                                                                  info += "</tr>";
                                                                  info += "<tr>";
                                                                  info += "<td style='color:#2216de;'><strong>poultry</strong></td>";
                                                                  info += "<td>" + data.features[0].properties.poultry + "</td>";
                                                                  info += "</tr>";
                                                                 }



                                                                   info += "</table>";
                                                               }

                                                              $('#pills-mi').html(info);

                                                     }

                                                   }

                                                     });
                                            $("#pills-mi-tab").show()
                              }
        }

    return {
        pointonmap,
        polygononmap,
        catwiseassetmap,
        polygononmap2,
        allasetmapped,
        lineonmap,
        imageonmap,
        pointonmap2,
        assetclickevent,
        ardcensusinfo

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
jQuery(function($){
    parameters = getUrlVars();
    console.log(parameters)
     if(Object.keys(parameters)[0]=="id")
      {
        singleassetinfo(parameters.id);
      }
    else if (Object.keys(parameters)[0]=="data")
      {
      multipleassetinfo(parameters.data)
      }
    if(Object.keys(parameters).length == 0){
        return
    }
////
function singleassetinfo(asset_id)
{
var params2 = {

                        "assetId" : asset_id,

                        "year" : "",
                        "deptId":2

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
                                  maputils.polygononmap(txtgeom.coordinates,dataObj,dataimage[0].asset_image_list)
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
/////



})


