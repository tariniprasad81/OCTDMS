const maputils = (function($, olMap){

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
                        src: '/images/marker.png'
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



    function pointonmap(coodrinatespoints, data) {
    console.log(data)
        var geojsonpoint = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetpoint",
                        data
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

    function polygononmap(coodrinatespoly,data) {
        console.log(data)
        var geojsonpoly = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "name": "assetploygon",
                        data
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

    function imageonmap(imgarr, asset) {

        var styleMarker2 = new ol.style.Style({
            image: new ol.style.Icon({
                    scale:1, anchor:[0.5,1],
                    src:'images/icon.png'
                   })
        });
 
        var featuresimage = []
        var asset_name = asset[0]

        asset_name += asset[1] ? ' (' + asset[1] + ')' : ''

        for(x of imgarr){
            featuresimage.push(new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(x.longitute), parseFloat(x.latitude)])),
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

    var asset_viewer = $('#asset_viewer')

    olMap.on('click', function (evt) {
        var element = popup.getElement();
        var coordinate = evt.coordinate;
        var hdms = ol.coordinate.toStringHDMS(ol.proj.toLonLat(coordinate));
        // var hdms = ol.proj.toLonLat(coordinate);
        
        var lng = parseFloat(coordinate[0]).toFixed(6);
        var lat = parseFloat(coordinate[1]).toFixed(6);

        var cord = 'Longitude: ' + lng + ', Latitude: ' + lat
    
        $(element).popover('dispose');
        var content = $('<div><p class="my-0">The location: </p></div>')
        var title = ''
        var show = true
        olMap.forEachFeatureAtPixel(evt.pixel, function(feature){
            let featureProps = feature.getProperties()
            let data=null
            switch(featureProps.name){
                case 'assetploygon':
                    data = featureProps.data
                    title = data.assetName
                    content = $(asset_viewer.html());
                    content.find('.content_dept').text(data.deptName)
                    content.find('.content_zone').text(data.zoneName)
                    content.find('.content_district').text(data.districtName)
                    content.find('.content_block').text(data.blockName)
                    content.find('.content_gp').text(data.gpName)
                    content.find('.content_village').text(data.villageName)

//                    if(photos.length > 0){
//                        content.find('.picture-gallery-div').removeClass('d-none')
//                        let pict = content.find('.picture-gallery')
//                        photos.forEach((p) => {
//                            pict.append($('<span />').html($('<img class="img-thumbnail" />').attr('src', p)))
//                        })
//                        pict.append('<div class="clearfix"></div>');
//                    }
                    break;

                case 'assetline':
                    title = 'Asset Line'
                    break;

                case 'imageasset':
                    title = featureProps.imgdata.name
                    content = $('<div><img id="td_img" class="img-fluid" /><br /></div>')
                    content.find('img').attr('src', featureProps.imgdata.path)
                    // content.find('img').fancybox()
                    break;
                
                case 'assetpoint':
                    data = featureProps.data
                    title = data.asset_name
                    if(data.asset_code){
                        title += ' (Code: ' + data.asset_code + ')'
                    }
                    content = $(asset_viewer.html());
                    content.find('.content_circle').text(data.circle)
                    content.find('.content_division').text(data.division)
                    content.find('.content_range').text(data.range)
                    content.find('.content_section').text(data.section)
                    content.find('.content_phadi').text(data.phadi)

                    let photocnt = Math.min(3, data.imgarr.length)
                    if(photocnt > 0){
                        let pict = content.find('.picture-gallery')
                        content.find('.picture-gallery-div').removeClass('d-none')
                        for(let i = 0; i < photocnt; i++){
                            let p = base_url_upload+'/'+data.imgarr[i].assetid+'/'+data.imgarr[i].image_name
                            pict.append($('<span />').html($('<img class="img-thumbnail" />').attr('src', p)))
                        }
                        pict.append('<div class="clearfix"></div>')
                        content.find('.picture-gallery-div a').on('click', function(e){
                            e.preventDefault()
                            let photoarr = []
                            data.imgarr.forEach((p) => {
                                photoarr.push({src: base_url_upload+'/'+p.assetid+'/'+p.image_name})
                            })
                            $.fancybox.open(photoarr, {loop : true})
                        })
                    }
                    break;

                default:
                    show = false
            }
        })
        if(show === true && title != ''){
            content.append('<code>Location: ' + hdms + '</code>')
            
            popup.setPosition(coordinate);
            $(element).popover({
                container: element,
                placement: 'auto',
                animation: false,
                html: true,
                content:content,
                title: title
            });
            $(element).popover('show');
        }
    })

    return {
        pointonmap,
        polygononmap,
        lineonmap,
        imageonmap,
        pointonmap2
    }

})(jQuery, mapapi.olMap)
/// 

function getUrlVars() {
    var vars = {};
   window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
jQuery(function($){
    var parameters = getUrlVars();
    console.log(parameters)
    if(Object.keys(parameters).length == 0){
        return
    }
    axios({
        method: 'get',
        url: service_url +'/getAssetViewByAssetId/' + parameters.id


    })
    .then((response) => {
        console.log(response)
        var dataObj = response.data.post;

        for(i = 0; i < dataObj.length; i++)
        {
          console.log(dataObj[i].assetList[i].assetName)
          txtgeom = JSON.parse(dataObj[i].assetList[i].geojson)
          console.log(txtgeom)
          console.log(global_image_url)
          var dataObj= dataObj[i].assetList[i]
        }




   var dataimage = response.data.post
//       var imgarr = dataimage[0].assetImageList
//        for(i = 0; i < imgarr.length; i++)
//        {
//         dataimage[0].assetImageList[i]
//        }



        if(response.data.status != 1){
            return
        }
        if(txtgeom.type == "Point"){
             maputils.pointonmap(txtgeom.coordinates, dataObj)
             maputils.imageonmap(dataimage[0].assetImageList, [dataObj.asset_name, dataObj.asset_code])
            //maputils.imageonmap(dataObj.imgarr, [dataObj.asset_name, dataObj.asset_code])
        }
        if(txtgeom.type == "LineString"){
            mapapi.lineonmap(txtgeom.coordinates)
        }
        if(txtgeom.type == "Polygon"){
             maputils.polygononmap(txtgeom.coordinates,dataObj)
             maputils.imageonmap(dataimage[0].assetImageList, [dataObj.assetName, dataObj.assetId])
            //maputils.imageonmap(dataObj.imgarr, [dataObj.asset_name, dataObj.asset_code])
       }
    })
    .catch((err) => {
        console.log(err);
    })
})


