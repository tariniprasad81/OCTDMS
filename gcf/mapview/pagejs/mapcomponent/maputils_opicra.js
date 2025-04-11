const maputils = (function ($, olMap) {
  var parameters;
  function pointonmap2() {
    var coodrinatespoints = [83.34, 19.98];
    var geojsonpoint = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "assetpoint",
          },
          geometry: {
            type: "Point",
            coordinates: coodrinatespoints,
          },
        },
      ],
    };

    var styleMarker = new ol.style.Style({
      image: new ol.style.Icon({
        scale: 0.7,
        anchor: [0.5, 1],
        src: "/images/icon.png",
      }),
    });
    var gjFormatpoint = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
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
      updateWhileInteracting: true,
    });

    featureOverlaypoint.getSource().addFeatures(featurespoint);
    olMap.getView().fit(featureOverlaypoint.getSource().getExtent(), {
      size: olMap.getSize(),
      maxZoom: 10,
    });
    // olMap.getView().setZoom(12);
  }

  function pointonmap(coodrinatespoints, additionalAttribute, data, dataimage) {
    console.log(dataimage);
    var geojsonpoint = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "assetpoint",
            additionalAttribute,
            data,
            dataimage,
          },
          geometry: {
            type: "Point",
            coordinates: coodrinatespoints,
          },
        },
      ],
    };

    var styleMarker = new ol.style.Style({
      image: new ol.style.Icon({
        scale: 10,
        anchor: [0.5, 1],
        src: "images/marker.png",
      }),
    });
    var gjFormatpoint = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
      strategy: ol.loadingstrategy.bbox,
    });
    var featurespoint = gjFormatpoint.readFeatures(geojsonpoint);

    var vectorSourcepoint = new ol.source.Vector();
    vectorSourcepoint.addFeatures(featurespoint);
    new ol.layer.Vector({
      map: olMap,
      source: vectorSourcepoint,
      style: [styleMarker],

      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });

    olMap.getView().fit(vectorSourcepoint.getExtent(), {
      size: olMap.getSize(),
      maxZoom: 10,
    });
  }

  function tankononmap(

    latitudeSurveyed,
    longitudeSurveyed,
    dataObj
  ) {
    var geojsonpoint = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "tankpointsurved",
            dataObj,
          },
          geometry: {
            type: "Point",
            coordinates: [longitudeSurveyed, latitudeSurveyed],
          },
        },
      ],
    };


    var styleMarker = new ol.style.Style({
      image: new ol.style.Icon({
        scale: 0.3,
        anchor: [0.5, 1],
        src: "../assets/img/marker.png",
      }),
    });
    var styleMarker2 = new ol.style.Style({
      image: new ol.style.Icon({
        scale: 0.7,
        anchor: [0.5, 1],
        src: "../assets/img/markerp.png",
      }),
    });
    var gjFormatpoint = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
      strategy: ol.loadingstrategy.bbox,
    });


    var featurespoint = gjFormatpoint.readFeatures(geojsonpoint);

    var vectorSourcepoint = new ol.source.Vector();

    if (longitudeSurveyed != 0 || latitudeSurveyed != 0) {
      vectorSourcepoint.addFeatures(featurespoint);
      new ol.layer.Vector({
        map: olMap,
        source: vectorSourcepoint,
        style: [styleMarker],

        updateWhileAnimating: true,
        updateWhileInteracting: true,
      });
olMap.getView().fit(vectorSourcepoint.getExtent());

    }


  }

  function polygononmap(coodrinatespoly, additionalAttribute, data, dataimage) {
    console.log(data);
    var geojsonpoly = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "assetploygon",
            additionalAttribute,
            data,
            dataimage,
          },
          geometry: {
            type: "Polygon",
            coordinates: coodrinatespoly,
          },
        },
      ],
    };
    var lineStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({ color: "#337AFF", width: 5 }),
    });
    var gjFormatpoly = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
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
      updateWhileInteracting: true,
    });

    olMap.getView().fit(vectorSourcepolygon.getExtent(), {
      size: olMap.getSize(),
      maxZoom: 15,
    });
  }

  function lineonmap(coodrinateslines) {
    // var coodrinateslines = [[85.23, 21.44], [85.29, 21.67], [85.35, 21.87]];

    var geojsonline = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "assetline",
          },
          geometry: {
            type: "LineString",
            coordinates: coodrinateslines,
          },
        },
      ],
    };

    var lineStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({ color: "#ffcc33", width: 4 }),
    });
    var gjFormatline = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
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
      updateWhileInteracting: true,
    });
    featureOverlayline.getSource().addFeatures(featuresline);
    olMap.getView().fit(featureOverlayline.getSource().getExtent(), {
      size: olMap.getSize(),
      maxZoom: 15,
    });
  }

  var image = new ol.style.Style({
    image: new ol.style.Icon({
      scale: 1,
      anchor: [0.5, 1],
      src: "images/image_icon.png",
    }),
  });

  var image2 = new ol.style.Circle({
    radius: 5,
    fill: null,
    stroke: new ol.style.Stroke({ color: "red", width: 1 }),
  });

  var styles = {
    Point: new ol.style.Style({
      image: new ol.style.Icon({
        scale: 0.7,
        anchor: [0.5, 1],
        src: "images/marker.png",
      }),
    }),
    LineString: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "green",
        width: 1,
      }),
    }),
    MultiLineString: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "green",
        width: 1,
      }),
    }),
    MultiPoint: new ol.style.Style({
      image: new ol.style.Icon({
        scale: 0.7,
        anchor: [0.5, 1],
        src: "images/marker.png",
      }),
    }),
    MultiPolygon: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "yellow",
        width: 1,
      }),
      fill: new ol.style.Fill({
        color: "rgba(255, 255, 0, 0.1)",
      }),
    }),
    Polygon: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "blue",
        lineDash: [4],
        width: 3,
      }),
      fill: new ol.style.Fill({
        color: "rgba(0, 0, 255, 0.1)",
      }),
    }),
    GeometryCollection: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "magenta",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "magenta",
      }),
      image: new ol.style.Circle({
        radius: 10,
        fill: null,
        stroke: new ol.style.Stroke({
          color: "magenta",
        }),
      }),
    }),
    Circle: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "red",
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: "rgba(255,0,0,0.2)",
      }),
    }),
  };

  var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
  };
  function polygononmap2(
    vectorSourcepolygon2,
    coodrinatespoly,
    typea,
    data,
    datasingle,
    assetid,
    dataimage
  ) {
    let highlight;

    console.log(data);
    var geojsonpoly = {};
    geojsonpoly = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "assetsearch",
            data,
            assetid,
            dataimage,
            datasingle,
          },
          geometry: {
            type: typea,
            coordinates: coodrinatespoly,
          },
        },
      ],
    };

    var gjFormatpoly = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
      strategy: ol.loadingstrategy.bbox,
    });

    var featurespoly = gjFormatpoly.readFeatures(geojsonpoly);
    //vectorSourcepolygon2.addFeatures(featurespoly);
    //vectorSourcepolygon2.clear();

    var featureOverlay = new ol.layer.Vector({
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
      updateWhileInteracting: true,
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

    olMap.getView().fit(vectorSourcepolygon2.getExtent(), {
      size: olMap.getSize(),
      maxZoom: 10,
    });
  }

  function catwiseassetmap(
    vectorSourcepolygon2,
    coodrinatespoly,
    typea,
    assetid
  ) {
    let highlight;

    console.log(assetid);
    var geojsonpoly = {};
    geojsonpoly = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "assetsearch",
            assetid,
          },
          geometry: {
            type: typea,
            coordinates: coodrinatespoly,
          },
        },
      ],
    };

    var gjFormatpoly = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
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

  function allasetmapped(
    vectorSourcepolygon2,
    coodrinatespoly,
    typea,
    data,
    datasingle,
    assetid,
    dataimage
  ) {
    let highlight;

    console.log(data);
    var geojsonpoly = {};
    geojsonpoly = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            name: "assetsearch",
            data,
            assetid,
            dataimage,
            datasingle,
          },
          geometry: {
            type: typea,
            coordinates: coodrinatespoly,
          },
        },
      ],
    };

    var gjFormatpoly = new ol.format.GeoJSON({
      featureProjection: "EPSG:3857",
      strategy: ol.loadingstrategy.bbox,
    });

    var featurespoly = gjFormatpoly.readFeatures(geojsonpoly);
    //vectorSourcepolygon2.addFeatures(featurespoly);
    vectorSourcepolygon2.clear();

    var featureOverlay = new ol.layer.Vector({
      source: vectorSourcepolygon2,
      map: olMap,

      style: styleFunction,

      updateWhileAnimating: true,
      updateWhileInteracting: true,
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
        scale: 1,
        anchor: [0.5, 1],
        src: "images/image_icon.png",
      }),
    });

    var featuresimage = [];
    var asset_name = asset[0];

    asset_name += asset[1] ? " (" + asset[1] + ")" : "";

    for (x of imgarr) {
      featuresimage.push(
        new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([
              parseFloat(x.longitude),
              parseFloat(x.latitude),
            ])
          ),
          name: "imageasset",
          imgdata: {
            path: global_image_url + "/" + x.assetId + "/" + x.imageName,
            name: asset_name,
          },
        })
      );
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
      map: olMap,
      source: vectorSourceGraphics,
      style: [styleMarker2],
      updateWhileAnimating: true,
      updateWhileInteracting: true,
    });
    //olMap.getView().fit(featureOverlayimage.getSource().getExtent(), { size: olMap.getSize(), maxZoom: 15 });
  }

  //    var popupmodal = new ol.Overlay({
  //            element: document.getElementById('modal-popup'),
  //        })
  // olMap.addOverlay(popupmodal)
  let container = document.getElementById("popup");
  let content = document.getElementById("popup-content");
  let closer = document.getElementById("popup-closer");
  let header = document.getElementById("popup-header");
  var cql_filter = "";
  var fired_button = "";
  var filter_layer = "";
  var filter_tbl = "";
  let overlayPopup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  closer.onclick = function () {
    overlayPopup.setPosition(undefined);
    closer.blur();
    return false;
  };

  olMap.addOverlay(overlayPopup);
  var asset_viewer = $("#asset_viewer");

  var asset_viewer2 = $("#asset_viewer2");

  olMap.on("singleclick", function (evt) {
    console.log("doubled");

    const coordinates = evt.coordinate;
    coordinate = ol.proj.transform(coordinates, "EPSG:3857", "EPSG:4326");
    const latitude = parseFloat(coordinate[0]).toFixed(6);
    const longitude = parseFloat(coordinate[1]).toFixed(6);
    // alert("oK");
    //popupStr2 = "<table class='table table-bordered table-sm'>";
    let selectedLayer;
    header.innerHTML = "";
    var tankown = "MI";
    var tankId = "12";
    var catchmentarea = "1Km";
    var kharif = "5";
    var rabi = "6";

    //          <string name="tankName">Tank Name</string>
    // <string name="tankId">Tank OID</string>
    // <string name="catchmentarea">Catchment Area (in sqkm)</string>
    // <string name="kharif">CCA Kharif (in Ha)</string>
    // <string name="rabi">CCA Rabi (in Ha)</string>
    // <string name="spreadarea">Water Spread Area (in Ha)</string>
    // <string name="groundwaterlevel">Ground Water Level (in meter)</string>
    // <string name="tankdwaterlevel">Tank Water Level (in meter)</string>
    // <string name="turbidity">Turbidity</string>
    // <string name="solarpump">Solar Pump Installed</string>
    // <string name="tankstatus">Status of Tank</string>
    // <string name="beneficiary">No of Beneficiary</string>
    // <string name="vegetation">Aquatic Vegetation Cover (in %)</string>
    // <string name="training_conducted">Trainig Conducted</string>
    // <string name="shaftinstallation">Recharge Shaft Installation</string>
    // <string name="traineeno">Number of Trainee</string>
    // <string name="image">Training Image</string>
    // <string name="shaft_image">Shaft Image</string>
    // <string name="embankment">Embankment</string>
    // <string name="usage">Usage</string>
    // <string name="shaft">Number of Recharge Shaft Installed</string>

    olMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
      let featureProps = feature.getProperties();
      // switch (expression) {
      //   case x:
      //     // code block
      //     break;
      //   case y:
      //     // code block
      //     break;
      //   default:
      //   // code block
      // }
      //tankpointprovided;
      switch (featureProps.name) {
        case "tankpointprovided":
          popupStr2 = "";

          popupStr2 = "<table class='table table-striped table-sm'>";

          dataObj = featureProps.dataObj;

          var imageArrtank = featureProps.dataObj.tankImage;
          iamgeshaft = featureProps.dataObj.shaftImage;

          //header.innerHTML = title;

          popupStr2 += "<h5 class='text-center'>Tank Deatils</h5>";
          popupStr2 += "<table class='table table-striped'>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>District</strong></td>";
          popupStr2 += "<td>" + dataObj.district_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Block</strong></td>";
          popupStr2 += "<td>" + dataObj.block_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Gram Panchayat</strong></td>";
          popupStr2 += "<td>" + dataObj.gp_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Village</strong></td>";
          popupStr2 += "<td>" + dataObj.village_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Tank Oid</strong></td>";
          popupStr2 += "<td>" + dataObj.tankOid + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Tank Owner</strong></td>";
          popupStr2 += "<td>" + dataObj.tankOwner + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Tank Name</strong></td>";
          popupStr2 += "<td>" + dataObj.tankName + "</td>";
          popupStr2 += "</tr>";

          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Catchment Area (in sqkm)</strong></td>";
          popupStr2 += "<td>" + dataObj.catchmentArea + "</td>";
          popupStr2 += "</tr>";

          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>CCA Kharif (in Ha)</strong></td>";
          popupStr2 += "<td>" + dataObj.karif + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>CCA Rabi (in Ha)</strong></td>";
          popupStr2 += "<td>" + dataObj.rabi + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Water Spread Area (in Ha)</strong></td>";
          popupStr2 += "<td>" + dataObj.waterSpreadArea + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 +=
            "<td ><strong>Ground Water Level (in meter)</strong></td>";
          popupStr2 += "<td>" + dataObj.groundWaterLevel + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 +=
            "<td ><strong>  Tank Water Level Max (in meter)</strong></td>";
          popupStr2 += "<td>" + dataObj.tankWaterLevelMax + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 +=
            "<td ><strong>  Tank Water Level Min (in meter)</strong></td>";
          popupStr2 += "<td>" + dataObj.tankWaterLevelMin + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>   Turbidity</strong></td>";
          popupStr2 += "<td>" + dataObj.turbidity + "</td>";
          popupStr2 += "</tr>";
          if (dataObj.solarPumpInstalled == true) {
            popupStr2 += "<tr>";
            popupStr2 += "<td ><strong> Solar Pump Installed</strong></td>";
            popupStr2 += "<td> Yes</td>";
            popupStr2 += "</tr>";
          } else {
            popupStr2 += "<tr>";
            popupStr2 += "<td ><strong> Solar Pump Installed</strong></td>";
            popupStr2 += "<td> No</td>";
            popupStr2 += "</tr>";
          }

          popupStr2 +=
            "<tr><td  id='assetimagepoints'><div class='picture-gallery-div3 border-bottom pb-2 d-none'> ";
          popupStr2 +=
            "<p class='text-muted'><strong>Tank Images</strong></p><div class='picture-gallery3 row'></div>";
          popupStr2 +=
            " <div class='text-center'><a href='#' id='allphotos'>All Photos</a></div>";
          popupStr2 += "</div></td></tr>";

          content.innerHTML = popupStr2 + "</table>";
          if (imageArrtank != null) {
            let photocnt4 = imageArrtank.length;

            let pict3 = $(".picture-gallery3");
            $(".picture-gallery-div3").removeClass("d-none");
            for (let i = 0; i < photocnt4; i++) {
              let p = imageArrtank[i].imageName;
              pict3.append(
                $('<div class="col-md-6"/>').html(
                  $(
                    '<img class=" img-thumbnail image_error"  style="height:100px;width:200px;"   /></a>'
                  ).attr("src", p)
                )
              );
            }
            pict3.append('<div class="clearfix"></div>');
            $("#allphotos").on("click", function (e) {
              e.preventDefault();
              let photoarr = [];
              imageArrtank.forEach((p) => {
                photoarr.push({ src: p.imageName });
              });
              $.fancybox.open(photoarr, { loop: true });
            });
          }
          // var coordinatesNew = [dataObj.longitute,dataObj.latitude];
          // linfo(ckyoordinatesNew);
          overlayPopup.setPosition(coordinates);

          break;

        case "tankpointsurved":
          popupStr2 = "";

          popupStr2 = "<table class='table table-striped table-sm'>";

          dataObj = featureProps.dataObj;

          var imageArrtank = featureProps.dataObj.tankImage;
          iamgeshaft = featureProps.dataObj.shaftImage;

          //header.innerHTML = title;

          popupStr2 += "<h5 class='text-center'>Tank Deatils</h5>";
          popupStr2 += "<table class='table table-striped'>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>District</strong></td>";
          popupStr2 += "<td>" + dataObj.district_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Block</strong></td>";
          popupStr2 += "<td>" + dataObj.block_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Gram Panchayat</strong></td>";
          popupStr2 += "<td>" + dataObj.gp_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Village</strong></td>";
          popupStr2 += "<td>" + dataObj.village_name + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Tank Oid</strong></td>";
          popupStr2 += "<td>" + dataObj.tankOid + "</td>";
          popupStr2 += "</tr>";
          if(dataObj.tankOwner==1)
          {
           popupStr2 += "<tr>";
           popupStr2 += "<td ><strong>Tank Owner</strong></td>";
           popupStr2 += "<td>MI</td>";
           popupStr2 += "</tr>";
          }
         if(dataObj.tankOwner==2)
          {
         popupStr2 += "<tr>";
         popupStr2 += "<td ><strong>Tank Owner</strong></td>";
         popupStr2 += "<td>PR & DW</td>";
         popupStr2 += "</tr>";

          }

          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Tank Name</strong></td>";
          popupStr2 += "<td>" + dataObj.tankName + "</td>";
          popupStr2 += "</tr>";

          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Catchment Area (in sqkm)</strong></td>";
          popupStr2 += "<td>" + dataObj.catchmentArea + "</td>";
          popupStr2 += "</tr>";

          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>CCA Kharif (in Ha)</strong></td>";
          popupStr2 += "<td>" + dataObj.karif + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>CCA Rabi (in Ha)</strong></td>";
          popupStr2 += "<td>" + dataObj.rabi + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>Water Spread Area (in Ha)</strong></td>";
          popupStr2 += "<td>" + dataObj.waterSpreadArea + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 +=
            "<td ><strong>Ground Water Level (in meter)</strong></td>";
          popupStr2 += "<td>" + dataObj.groundWaterLevel + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 +=
            "<td ><strong>  Tank Water Level Max (in meter)</strong></td>";
          popupStr2 += "<td>" + dataObj.tankWaterLevelMax + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 +=
            "<td ><strong>  Tank Water Level Min (in meter)</strong></td>";
          popupStr2 += "<td>" + dataObj.tankWaterLevelMin + "</td>";
          popupStr2 += "</tr>";
          popupStr2 += "<tr>";
          popupStr2 += "<td ><strong>   Turbidity</strong></td>";
          popupStr2 += "<td>" + dataObj.turbidity + "</td>";
          popupStr2 += "</tr>";
          if (dataObj.solarPumpInstalled == true) {
            popupStr2 += "<tr>";
            popupStr2 += "<td ><strong> Solar Pump Installed</strong></td>";
            popupStr2 += "<td> Yes</td>";
            popupStr2 += "</tr>";
          } else {
            popupStr2 += "<tr>";
            popupStr2 += "<td ><strong> Solar Pump Installed</strong></td>";
            popupStr2 += "<td> No</td>";
            popupStr2 += "</tr>";
          }

          popupStr2 +=
            "<tr><td  id='assetimagepoints'><div class='picture-gallery-div3 border-bottom pb-2 d-none'> ";
          popupStr2 +=
            "<p class='text-muted'><strong>Tank Images</strong></p><div class='picture-gallery3 row'></div>";
          popupStr2 +=
            " <div class='text-center'><a href='#' id='allphotos'>All Photos</a></div>";
          popupStr2 += "</div></td></tr>";

          content.innerHTML = popupStr2 + "</table>";
          if (imageArrtank != null) {
            let photocnt5 = imageArrtank.length;

            let pict3 = $(".picture-gallery3");
            $(".picture-gallery-div3").removeClass("d-none");
            for (let i = 0; i < photocnt5; i++) {
              let p = imageArrtank[i].imageName;
              pict3.append(
                $('<div class="col-md-6"/>').html(
                  $(
                    '<img class=" img-thumbnail image_error"  style="height:100px;width:200px;"   /></a>'
                  ).attr("src", p)
                )
              );
            }
            pict3.append('<div class="clearfix"></div>');
            $("#allphotos").on("click", function (e) {
              e.preventDefault();
              let photoarr = [];
              imageArrtank.forEach((p) => {
                photoarr.push({ src: p.imageName });
              });
              $.fancybox.open(photoarr, { loop: true });
            });
          }
          // var coordinatesNew = [dataObj.longitute,dataObj.latitude];
          // linfo(ckyoordinatesNew);
          overlayPopup.setPosition(coordinates);

          break;

        default:
          show = false;
      }
    });
  });

  return {
    pointonmap,
    polygononmap,
    polygononmap2,
    catwiseassetmap,
    allasetmapped,
    lineonmap,
    imageonmap,
    pointonmap2,

    tankononmap,
  };
})(jQuery, mapapi.olMap);
///

function getUrlVars() {
  var vars = {};
  var geturl = window.location.href;
  //     var enc = encodeURIComponent(geturl);
  var dec = decodeURIComponent(geturl);
  var res = dec.replace("%2C", ",");

  res.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
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
jQuery(function ($) {
    parameters = getUrlVars();
    parameterswb = getUrlVars();
    console.log(parameters);
    //console.log(parameterswb)
    if (parameters.q == "tank") {
      
      singletankinfo(parameters.id);
    }
    if(parameters.id!=undefined)
    {
      $('#map_sat').prop('checked' , true);
      olMap.getLayers().insertAt(0, mapapi.googleLayerSatellite);
      //olMap.addLayer(mapapi.googleLayerSatellite)
       mapapi.googleLayerSatellite.setVisible(true);

    }
    else{
      $('#map_snpp').prop('checked' , true);
      $('map_sat').removeAttr('checked');

    }

    if (Object.keys(parameters).length == 0) {
      return;
    }

  function singletankinfo(tankid) {
    var tankoid = parseInt(tankid);
    $.ajax({
      type: "GET",
      url: service_url + "api/master/getTankByOidForWeb/" + tankoid,

      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        console.log(response);
        var dataObj = response.post.currentAssetList;
        //  latitudeProvided: 0
        // latitudeSurveyed: 20.30763745
        // longitudeProvided: 0
        // longitudeSurveyed: 85.81099998
        if (response.status == 1) {
          maputils.tankononmap(

            dataObj.latitudeSurveyed,
            dataObj.longitudeSurveyed,
            dataObj
          );
        }
      },
      error: function (response) {
        
        console.log(response);
      },
    });
  }

  function multipleassetinfo(multiassetid) {
    console.log(multiassetid);
    var jj = multiassetid;

    var ttt = jj.replaceAll("}", "");
    var multiassetids = ttt.replaceAll("{", "");
    var multiasset = {
      assetId: multiassetids,
    };
    var vectorSourcepolygon2 = new ol.source.Vector();
    var dataimage = "";
    $.ajax({
      type: "POST",
      url: service_url + "/assetlist",
      data: JSON.stringify(multiasset),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        vectorSourcepolygon2.clear();
        //  $('#assetCount').text("Asset Count:" + response.post.length);
        if (response.post.length > 0) {
          for (i = 0; i < response.post[0].length; i++) {
            console.log(response.post[0][i].assetName);

            txtgeom = JSON.parse(response.post[0][i].geojson);
            console.log(txtgeom);
            //console.log(global_image_url)

            if (txtgeom.type != "GeometryCollection") {
              maputils.allasetmapped(
                vectorSourcepolygon2,
                txtgeom.coordinates,
                txtgeom.type,
                response.post[0],
                response.post[0][i],
                response.post[0][i].assetId,
                dataimage
              );
            }
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "",
            text: "No Asset Mapped",
          });
        }
      },
      error: function (response) {
        //                                        Swal.fire({
        //                                                             icon: 'error',
        //                                                             title: '',
        //                                                             text: 'Please Contact Admin'
        //
        //                                                   })
        console.log(response);
      },
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
});
