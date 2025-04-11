

const mapapi = (function($){
var lulcAdd;
var lulcRoadAdd;
var lulcRiverAdd;
var lulcBuildUPAdd;
var vectorSource2 = new ol.source.Vector();
 var vectorSourceGP = new ol.source.Vector()



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
    const urladminLayer = "https://mapserver.odisha4kgeo.in/geoserver/AdminLayer/wms"
    const iklmsgeoserverurl = "https://mapserver.odisha4kgeo.in/geoserver/iklms/wms"
    const ofarisurl = "https://mapserver.odisha4kgeo.in/geoserver/ofaris/wms";
        const ofarisurlsmapd = "https://mapserver.odisha4kgeo.in/geoserver/odishasampad/wms";
        const sampadgcfofaris="https://mapserver.odisha4kgeo.in/geoserver/oiipcra/wms";
        const sampadgcf="https://mapserver.odisha4kgeo.in/geoserver/GCF/wms";
      //const ofarisurl = "http://10.150.2.17:8080/geoserver/ofaris/wms";
    const roadurl = "https://mapserver.odisha4kgeo.in/geoserver/RoadDSS/wms";
    const gcfsampaderrr="https://odishasampad.orsac.gov.in/geoserver/gcf/wms;"
    const ofarisurllocal= "http://localhost:8081/geoserver/ofaris/wms";
     const ofarisurllocallap= "http://localhost:8080/geoserver/ofaris/wms";
     var urlGeoserver1 = "https://odishasampad.orsac.gov.in/geoserver/odishasampad/wms";


     const coasturl="https://geoserver.odishaaquaculture.in/geoserver/COAST/wms";

     var geojson,featureOverlay;
     const attribution = new ol.control.Attribution({
       collapsible: false,
     });

    let googleLayerSatellite = new ol.layer.Tile({
        title: "Google Satellite",
        name: "Google satellite",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga' }),
        visible: false
    })

    let googleLayerRoadNames = new ol.layer.Tile({
        title: "Google Road Names",
        name: "Google Road Names",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}' }),
        visible: false
    })
    let googleLayerRoadmap = new ol.layer.Tile({
        title: "Google Road Map",
        name: "Google Road Map",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' }),
        visible: false
    })

    let googleLayerHybrid = new ol.layer.Tile({
        title: "Google Satellite & Roads",
        name: "Google Satellite & Roads",
        source: new ol.source.TileImage({ url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' }),
        visible: false
    })

    let googleLayerTerrain = new ol.layer.Tile({
        title: "Google Terrain",
        name: "Google Terrain",
        source: new ol.source.TileImage({ url: 'http://mt0.google.com/vt/lyrs=t&x={x}&y={y}&z={z}' }),
        visible: false
    })

    let googleLayerHybrid2 = new ol.layer.Tile({
        title: "Google Terrain & Roads",
        name: "Google Terrain & Roads",
        source: new ol.source.TileImage({ url: 'http://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}' }),
        visible: false
    })

    let googleLayerOnlyRoad = new ol.layer.Tile({
        title: "Google Road without Building",
        name: "Google Road without Building",
        source: new ol.source.TileImage({ url: 'http://mt0.google.com/vt/lyrs=r&x={x}&y={y}&z={z}' }),
        visible: false
    })
    var state_bnd_4k = new ol.layer.Image({
        visible: true,
        name: 'State Boundary',
        description: 'state_boundary_4k',
        source: new ol.source.ImageWMS({
            url: urlGeoserver1,
            params: {
                'LAYERS': 'state_boundary_4k',
                'FORMAT': 'image/png',
                'TILED': false,
                'VERSION': '1.3.0',
            },
        })

    });
    dist_bnd_4k = new ol.layer.Image({
        name: 'District Boundary',
        description: 'district_boundary_4k',
        source: new ol.source.ImageWMS({
            url: urlGeoserver1,
            params: {
                'LAYERS': 'district_boundary_4k',
                'FORMAT': 'image/png',
                'TILED': false,
                'VERSION': '1.3.0',
            },
        }),
        visible: true,
        crossOrigin: 'anonymous'

    });
    var block_bnd_4k = new ol.layer.Image({
        name: 'Block Boundary',
        description: 'block_boundary_4k',
        source: new ol.source.ImageWMS({
            url: urlGeoserver1,
            params: {
                'LAYERS': 'block_boundary_4k',
                'FORMAT': 'image/png',
                'TILED': false,
                'VERSION': '1.3.0',
            }
        })
    });
    var gp_bnd_4k = new ol.layer.Image({
        name: 'GP Boundary',
        description: 'gram_panchayat_boundary_4k',
        source: new ol.source.ImageWMS({
            url: urlGeoserver1,
            params: {
                'LAYERS': 'gram_panchayat_boundary_4k',
                'FORMAT': 'image/png',
                'TILED': false,
                'VERSION': '1.3.0',
            },
        })

    });
    var village_bnd_4k = new ol.layer.Image({
        name: 'Village Boundary',
        description: 'revenue_village_boundary_4k',
        source: new ol.source.ImageWMS({
            url: urlGeoserver1,
            params: {
                'LAYERS': 'revenue_village_boundary_4k',
                'FORMAT': 'image/png',
                'TILED': false,
                'VERSION': '1.3.0',
            },
        })

    });
    var gcferror = new ol.layer.Image({
        name: 'GCF Error Status',
        description: 'GCF Error Status',
        source: new ol.source.ImageWMS({
            url: gcfsampaderrr,
            params: {
                'LAYERS': 'gcf_layer',
                'FORMAT': 'image/png',
                'TILED': false,
                'VERSION': '1.3.0',
            },
        }),
        visible: false,

    });

 
    let ofaris = new ol.layer.Image({

        name: 'Fisheries Zone Boundary',
        description: 'odisha_fisheries_zone_boundary_2021',
        source: new ol.source.ImageWMS({
            url: ofarisurl,
            params: {
                'LAYERS': 'ofaris:odisha_fisheries_zone_boundary_2021',
                'FORMAT': 'image/png',

                'TILED': false,
                'VERSION': '1.3.0',

            },
        }),
        visible: false,
        title: "Fisheries Zone Boundary",
        crossOrigin: 'anonymous',
        visible: true

    });
    let ofaris_distict_zone = new ol.layer.Image({
        name: 'Fisheries District Boundary',
        description: 'district_boundary_fisheries',
        source: new ol.source.ImageWMS({
            url: ofarisurl,
            params: {
                'LAYERS': 'ofaris:district_boundary_fisheries',
                'FORMAT': 'image/png',

                'TILED': true,
                'VERSION': '1.3.0',

            },
        }),
         title: "Fisheries District Boundary",
        crossOrigin: 'anonymous',
        visible: true

    });
    let ofaris_block_boundary = new ol.layer.Image({
        name: 'Fisheries Block Boundary',
        description: 'block_boundary',
        source: new ol.source.ImageWMS({
            url: ofarisurl,
            params: {
                'LAYERS': 'ofaris:block_boundary',
                'FORMAT': 'image/png',
                'TILED': true,
                'VERSION': '1.3.0',

            },
        }),
        title: "Fisheries Block Boundary",
        crossOrigin: 'anonymous',
        visible: true

    });

//     let road = new ol.layer.Image({
//            name: 'road',
//            description: 'road',
//            source: new ol.source.ImageWMS({
//
//                      url: roadurl,
//                      params: {'LAYERS': 'RoadDSS:road_master'},
//                      ratio: 1,
//                      serverType: 'geoserver'
//            }),
//
//            visible: true
//
//        });


    let ofaris_grampanchayat_boundary = new ol.layer.Image({
        name: 'Fisheries GP Boundary',
        description: 'grampanchayat_boundary',
        source: new ol.source.ImageWMS({
            url: ofarisurl,
            params: {
                'LAYERS': 'ofaris:grampanchayat_boundary',
                'FORMAT': 'image/png',
                'TILED': true,
                'VERSION': '1.3.0',

            },
        }),
        title: "Fisheries GP Boundary",
        crossOrigin: 'anonymous',
        visible: true

    });

    let ofaris_village_boundary = new ol.layer.Image({
        name: 'Fisheries Village Boundary',
        description: 'revenue_village_boundary',
        source: new ol.source.ImageWMS({
            url: ofarisurl,
            params: {
                'LAYERS': 'ofaris:revenue_village_boundary',
                'FORMAT': 'image/png',
                'TILED': true,
                'VERSION': '1.3.0',

            },
             attributions: [
                                                'All maps © <a href="https://orsac.gov.in/" target="_blank">Odisha Space Application Center</a>',

                                              ],
                                     opaque: false,
        }),
          title: "Fisheries Village Boundary",
        crossOrigin: 'anonymous',
        visible: true

    });
    let ofaris_fish_landing_center = new ol.layer.Image({
        name: 'Fish Landing Center',
        description: 'fish_landing_centre',
        source: new ol.source.ImageWMS({
            url: ofarisurl,
            params: {
                'LAYERS': 'ofaris:fish_landing_centre',
                'FORMAT': 'image/png',
                'TILED': true,
                'VERSION': '1.3.0',

            },
        }),
          title: "Fish Landing Center",

        visible: true

    });

    let ofaris_waterbody = new ol.layer.Image({
        name: 'Waterbody',
        description: 'waterbody',
        source: new ol.source.ImageWMS({
            url: ofarisurl,
            params: {
                'LAYERS': 'ofaris:waterbody_village_map',
                'FORMAT': 'image/png',
                'TILED': true,
                'VERSION': '1.3.0',

            },
        }),
        title: "Waterbody",
        crossOrigin: 'anonymous',
        visible: true

    });
    let ofaris_notified_jetty_limit = new ol.layer.Image({
            name: 'Notified Jetty',
            description: 'notified_jetty_limit',
            source: new ol.source.ImageWMS({
                url: ofarisurl,
                params: {

                    'LAYERS': 'ofaris:notified_jetty_limit',
                    'FORMAT': 'image/png',
                    'TILED': true,
                    'VERSION': '1.3.0',

                },
            }),
              title: "Notified Jetty",
            crossOrigin: 'anonymous',
            visible: true

        });
        let ofaris_fishermen_village = new ol.layer.Image({
                    name: 'Fisherman Village',
                    description: 'fishermen_village',
                    source: new ol.source.ImageWMS({
                        url: ofarisurl,
                        params: {

                            'LAYERS': 'ofaris:fishermen_village',
                            'FORMAT': 'image/png',
                            'TILED': true,
                            'VERSION': '1.3.0',

                        },
                    }),
                      title: "Fisherman Village",
                    crossOrigin: 'anonymous',
                    visible: false

                });

        let ofaris_port = new ol.layer.Image({
                    name: 'Port',
                    description: 'port',
                    source: new ol.source.ImageWMS({
                        url: ofarisurl,
                        params: {
                            'LAYERS': 'ofaris:port',
                            'FORMAT': 'image/png',
                            'TILED': true,
                            'VERSION': '1.3.0',

                        },
                    }),
                     title: "Port",
                    crossOrigin: 'anonymous',
                    visible: true

                });
                 let ofaris_gcf = new ol.layer.Image({
                                    name: 'GCF',
                                    description: 'GCF',
                                    source: new ol.source.ImageWMS({
                                        url: sampadgcf,
                                        params: {

                                            'LAYERS': 'tank_m',
                                            'FORMAT': 'image/png',
                                            'TILED': true,
                                            'VERSION': '1.3.0',

                                        },
                                    }),
                                     title: "GCF",
                                    crossOrigin: 'anonymous',
                                    visible: false

                                });
                                let ofaris_oiipcra_mip = new ol.layer.Image({
                                                                    name: 'OIIPCRA MIP',
                                                                    description: 'OIIPCRA MIP',
                                                                    source: new ol.source.ImageWMS({
                                                                        url: sampadgcfofaris,
                                                                        params: {

                                                                            'LAYERS': 'ofaris:oiipcra_mip',
                                                                            'FORMAT': 'image/png',
                                                                            'TILED': true,
                                                                            'VERSION': '1.3.0',

                                                                        },
                                                                    }),
                                                                     title: "OIIPCRA MIP",
                                                                    crossOrigin: 'anonymous',
                                                                    visible: false

                                                                });


                let ofaris_harbour = new ol.layer.Image({
                                    name: 'Harbour',
                                    description: 'harbour',
                                    source: new ol.source.ImageWMS({
                                        url: ofarisurl,
                                        params: {
                                            'LAYERS': 'ofaris:harbour',
                                            'FORMAT': 'image/png',
                                            'TILED': true,
                                            'VERSION': '1.3.0',

                                        },
                                    }),
                                     title: "Harbour",
                                    crossOrigin: 'anonymous',
                                    visible: false

                                });

                 let assets = new ol.layer.Image({
                            name: 'Assets',
                            description: 'Assets',
                            source: new ol.source.ImageWMS({
                                url: ofarisurl,
                                params: {
                                    'LAYERS': 'ofaris:asset',
                                    'FORMAT': 'image/png',
                                    'TILED': false,
                                    'VERSION': '1.3.0',
                                },
                            }),

                            title: "Assets",
                             crossOrigin: 'anonymous',
                                visible: false
                        })
                let ofaris_multi_cyclone = new ol.layer.Image({
                                    name: 'Cyclone Shelter',
                                    description: 'multipurpose_cyclone_shelter',
                                    source: new ol.source.ImageWMS({
                                        url: ofarisurl,
                                        params: {
                                            'LAYERS': 'ofaris:multipurpose_cyclone_shelter',
                                            'FORMAT': 'image/png',
                                            'TILED': true,
                                            'VERSION': '1.3.0',

                                        },
                                    }),
                                    title:'Cyclone Shelter',
                                    crossOrigin: 'anonymous',
                                    visible: false

                                });

                                //other layers
                                 //roaddss
                            let road = new ol.layer.Image({
                                    name: 'Road',
                                    description: 'road_master',
                                    source: new ol.source.ImageWMS({
                                        url: roadurl,
                                        params: {
                                            'LAYERS': 'road_master',
                                            'FORMAT': 'image/png',
                                            'TILED': true,
                                            'VERSION': '1.3.0',

                                        },
                                    }),
                                    title:'Road',
                                    crossOrigin: 'anonymous',
                                    visible: false

                                });
                             let road_nh = new ol.layer.Image({
                                                name: 'Road(NH)',
                                                description: 'road_master',
                                                source: new ol.source.ImageWMS({
                                                    url: roadurl,
                                                    params: {
                                                        'LAYERS': 'road_master',
                                                        'FORMAT': 'image/png',
                                                        'TILED': true,
                                                        'VERSION': '1.3.0',
                                                        "CQL_FILTER":"current_status IN ('NH')"

                                                    },
                                                }),
                                                title:'Road(NH)',
                                                crossOrigin: 'anonymous',
                                                visible: false

                                   });
                              let road_sh = new ol.layer.Image({
                                                                             name: 'Road(SH)',
                                                                             description: 'road_master',
                                                                             source: new ol.source.ImageWMS({
                                                                                 url: roadurl,
                                                                                 params: {
                                                                                     'LAYERS': 'road_master',
                                                                                     'FORMAT': 'image/png',
                                                                                     'TILED': true,
                                                                                     'VERSION': '1.3.0',
                                                                                     "CQL_FILTER":"current_status IN ('SH')"

                                                                                 },
                                                                             }),
                                                                             title:'Road(SH)',
                                                                             crossOrigin: 'anonymous',
                                                                             visible: false

                                                                });

                                  let road_other = new ol.layer.Image({
                                                  name: 'Road(Other)',
                                                  description: 'road_master',
                                                  source: new ol.source.ImageWMS({
                                                      url: roadurl,
                                                      params: {
                                                          'LAYERS': 'road_master',
                                                          'FORMAT': 'image/png',
                                                          'TILED': true,
                                                          'VERSION': '1.3.0',
                                                          "CQL_FILTER":"current_status NOT IN ('SH','NH')"

                                                      },
                                                  }),
                                                  title:'Road(Other)',
                                                  crossOrigin: 'anonymous',
                                                  visible: false

                                                 });
                                   var wmslayercanal = new ol.layer.Tile({
                                            name: 'Canal',
                                            description: 'canal',
                                            source: new ol.source.TileWMS(({
                                                url: urlGeoserver1,
                                                params: {
                                                    "LAYERS": "canal",
                                                    "TILED": "true",
                                                    "VERSION": "1.3.0"
                                                },
                                            })),
                                            visible: false,
                                            title: "canal",
                                            opacity: 1.000000,
                                            crossOrigin: 'anonymous'
                                        });
                                 let wmsmarket = new ol.layer.Image({
                                                name: 'Market',
                                                description: 'market',
                                                source: new ol.source.ImageWMS({
                                                    url: roadurl,
                                                    params: {
                                                        'LAYERS': 'market',
                                                        'FORMAT': 'image/png',
                                                        'TILED': true,
                                                        'VERSION': '1.3.0',

                                                    },
                                                }),
                                                title:'Market',
                                                crossOrigin: 'anonymous',
                                                visible: false

                                         });

                                      //roaddss
                                  var wmslayerrailway_station = new ol.layer.Tile({
                                            name: 'Railway Station',
                                            description: 'railway_station',
                                            source: new ol.source.TileWMS(({
                                                url: urlGeoserver1,
                                                params: {
                                                    "LAYERS": "railway_station",
                                                    "TILED": "true",
                                                    "VERSION": "1.3.0"
                                                },
                                            })),
                                            visible: false,
                                            title:'Railway Station',
                                            opacity: 1.000000,
                                            crossOrigin: 'anonymous'
                                        });

                                          var wmslayerpowerline = new ol.layer.Tile({
                                                    name: 'Powerline',
                                                    description: 'powerline',
                                                    source: new ol.source.TileWMS(({
                                                        url: urlGeoserver1,
                                                        params: {
                                                            "LAYERS": "powerline",
                                                            "TILED": "true",
                                                            "VERSION": "1.3.0"
                                                        },
                                                    })),
                                                    visible: false,
                                                    title:'Powerline',
                                                    opacity: 1.000000,
                                                    crossOrigin: 'anonymous'
                                                });
                                                var wmslayerairport = new ol.layer.Tile({
                                                    name: 'Airport',
                                                    description: 'airport',
                                                    source: new ol.source.TileWMS(({
                                                        url: urlGeoserver1,
                                                        params: {
                                                            "LAYERS": "airport",
                                                            "TILED": "true",
                                                            "VERSION": "1.3.0"
                                                        },
                                                    })),
                                                    visible: false,
                                                    title: "Airport",
                                                    opacity: 1.000000,
                                                    crossOrigin: 'anonymous'
                                                });
                                                var wmslayersea_port = new ol.layer.Tile({
                                                    name: 'Sea Port',
                                                    description: 'sea_port',
                                                    source: new ol.source.TileWMS(({
                                                        url: urlGeoserver1,
                                                        params: {
                                                            "LAYERS": "sea_port",
                                                            "TILED": "true",
                                                            "VERSION": "1.3.0"
                                                        },
                                                    })),
                                                    visible: false,
                                                    title: "Sea Port",
                                                    opacity: 1.000000,
                                                    crossOrigin: 'anonymous'
                                                });


                                                 var wmslayergw_prospect = new ol.layer.Tile({
                                                            name: 'Ground Water Prospect',
                                                            description: 'gw_prospect',
                                                            source: new ol.source.TileWMS(({
                                                                url: ofarisurlsmapd,
                                                                params: {
                                                                    "LAYERS": "gw_prospect",
                                                                    "TILED": "true",
                                                                    "VERSION": "1.3.0"
                                                                },
                                                            })),
                                                            visible: false,
                                                            title: "Ground Water Prospect",
                                                            opacity: 1.000000,
                                                            crossOrigin: 'anonymous'
                                                        });
                                                        var wmslayerhabitation = new ol.layer.Tile({
                                                            name: 'Habitation',
                                                            description: 'habitation',
                                                            source: new ol.source.TileWMS(({
                                                                url: urlGeoserver1,
                                                                params: {
                                                                    "LAYERS": "habitation",
                                                                    "TILED": "true",
                                                                    "VERSION": "1.3.0"
                                                                },
                                                            })),
                                                            visible: false,
                                                            title: "Habitation",
                                                            opacity: 1.000000,
                                                            crossOrigin: 'anonymous'
                                                        });
                                                        var wmslayerminesandmineral = new ol.layer.Tile({
                                                            name: 'Mines Mineral',
                                                            description: 'mines_mineral',
                                                            source: new ol.source.TileWMS(({
                                                                url: urlGeoserver1,
                                                                params: {
                                                                    "LAYERS": "mines_mineral",
                                                                    "TILED": "true",
                                                                    "VERSION": "1.3.0"
                                                                },
                                                            })),
                                                            visible: false,
                                                            title: "Mines Mineral",
                                                            opacity: 1.000000,
                                                            crossOrigin: 'anonymous'
                                                        });

                                                        var wmslayerpower_substation = new ol.layer.Tile({
                                                            name: 'Power Substation',
                                                            description: 'power_substation',
                                                            source: new ol.source.TileWMS(({
                                                                url: urlGeoserver1,
                                                                params: {
                                                                    "LAYERS": "power_substation",
                                                                    "TILED": "true",
                                                                    "VERSION": "1.3.0"
                                                                },
                                                            })),
                                                            visible: false,
                                                            title: "Power Substation",
                                                            opacity: 1.000000,
                                                            crossOrigin: 'anonymous'
                                                        });
                                                        var wmslayerroad_15_16 = new ol.layer.Tile({
                                                            name: 'Road(2015-16)',
                                                            description: 'road_15_16',
                                                            source: new ol.source.TileWMS(({
                                                                url: urlGeoserver1,
                                                                params: {
                                                                    "LAYERS": "road_15_16",
                                                                    "TILED": "true",
                                                                    "VERSION": "1.3.0"
                                                                },
                                                            })),
                                                            visible: false,
                                                            title: "road_15_16",
                                                            opacity: 1.000000,
                                                            crossOrigin: 'anonymous'
                                                        });


                                                        var wmslayerrivers = new ol.layer.Tile({
                                                                    name: 'Rivers',
                                                                    description: 'rivers',
                                                                    source: new ol.source.TileWMS(({
                                                                        url: urlGeoserver1,
                                                                        params: {
                                                                            "LAYERS": "rivers",
                                                                            "TILED": "true",
                                                                            "VERSION": "1.3.0"
                                                                        },
                                                                    })),
                                                                    visible: false,
                                                                    title: "Rivers",
                                                                    opacity: 1.000000,
                                                                    crossOrigin: 'anonymous'
                                                                });
                                                                var wmslayercanal = new ol.layer.Tile({
                                                                    name: 'Canal',
                                                                    description: 'canal',
                                                                    source: new ol.source.TileWMS(({
                                                                        url: urlGeoserver1,
                                                                        params: {
                                                                            "LAYERS": "canal",
                                                                            "TILED": "true",
                                                                            "VERSION": "1.3.0"
                                                                        },
                                                                    })),
                                                                    visible: false,
                                                                    title: "Canal",
                                                                    opacity: 1.000000,
                                                                    crossOrigin: 'anonymous'
                                                                });
                                                                var wmslayerrailwayline = new ol.layer.Tile({
                                                                    name: 'Railway Lines',
                                                                    description: 'railwayline',
                                                                    source: new ol.source.TileWMS(({
                                                                        url: urlGeoserver1,
                                                                        params: {
                                                                            "LAYERS": "railwayline",
                                                                            "TILED": "true",
                                                                            "VERSION": "1.3.0"
                                                                        },
                                                                    })),
                                                                    visible: false,
                                                                    title: "Railway Lines",
                                                                    opacity: 1.000000,
                                                                    crossOrigin: 'anonymous'
                                                                });
                        var wmslayergeomorphology = new ol.layer.Tile({
                            name: 'Geomorphology',
                            description: 'geomorphology',
                            source: new ol.source.TileWMS(({
                                url: urlGeoserver1,
                                params: {
                                    "LAYERS": "geomorphology",
                                    "TILED": "true",
                                    "VERSION": "1.3.0"
                                },
                            })),
                            visible: false,
                            title: "Geomorphology",
                            opacity: 1.000000,
                            crossOrigin: 'anonymous'
                        });
                        var wmslayerdrain = new ol.layer.Tile({
                            name: 'Drain Line',
                            description: 'drain_line',
                            source: new ol.source.TileWMS(({
                                url: urlGeoserver1,
                                params: {
                                    "LAYERS": "drain_line",
                                    "TILED": "true",
                                    "VERSION": "1.3.0"
                                },
                            })),
                            visible: false,
                            title: "Drainage",
                            opacity: 1.000000,
                            crossOrigin: 'anonymous'
                        });
                        var wmslayerLulc_nris_50k = new ol.layer.Tile({
                            name: 'Land Use Land Cover',
                            description: 'lulc_nris_50k',
                            source: new ol.source.TileWMS(({
                                url: urlGeoserver1,
                                params: {
                                    "LAYERS": "lulc_nris_50k",
                                    "TILED": "true",
                                    "VERSION": "1.3.0"
                                },

                            })),
                            visible: false,
                            title: "Land Use Land Cover",
                            opacity: 1.000000,
                            crossOrigin: 'anonymous'
                        });
                        var wmslayerwaterbody = new ol.layer.Tile({
                            name: 'Waterbody',
                            description: 'waterbody',
                            source: new ol.source.TileWMS(({
                                url: urlGeoserver1,
                                params: {
                                    "LAYERS": "waterbody",
                                    "TILED": "true",
                                    "VERSION": "1.3.0"
                                },
                            })),
                            visible: true,
                            title: "Waterbody",
                            opacity: 1.000000,
                            crossOrigin: 'anonymous'
                        });
                        var wmslayerSoil = new ol.layer.Tile({
                            name: 'Soil',
                            description: 'soil',
                            source: new ol.source.TileWMS(({
                                url: urlGeoserver1,
                                params: {
                                    "LAYERS": "soil",
                                    "TILED": "true",
                                    "VERSION": "1.3.0"
                                },
                            })),
                            visible: false,
                            title: "Soil",
                            opacity: 1.000000,
                            crossOrigin: 'anonymous'
                        });
                        var wmslayerstructure = new ol.layer.Tile({
                            name: 'Structure',
                            description: 'structure',
                            source: new ol.source.TileWMS(({
                                url: urlGeoserver1,
                                params: {
                                    "LAYERS": "structure",
                                    "TILED": "true",
                                    "VERSION": "1.3.0"
                                },
                            })),
                            visible: false,
                            title: "Structure",
                            opacity: 1.000000,
                            crossOrigin: 'anonymous'
                        });
                        var wmslayerlulu_nrsc_50k = new ol.layer.Tile({
                            name: 'lulc_nrsc_50k',
                            description: 'lulc_nrsc_50k',
                            source: new ol.source.TileWMS(({
                                url: urlGeoserver1,
                                params: {
                                    "LAYERS": "lulc_nrsc_50k",
                                    "TILED": "true",
                                    "VERSION": "1.3.0"
                                },
                            })),
                            visible: false,
                            title: "lulc_nrsc_50k",
                            opacity: 1.000000,
                            crossOrigin: 'anonymous'
                        });
                        var wmslayerslope = new ol.layer.Tile({
                                    name: 'Slope',
                                    description: 'slope',
                                    source: new ol.source.TileWMS(({
                                        url: urlGeoserver1,
                                        params: {
                                            "LAYERS": "slope",
                                            "TILED": "true",
                                            "VERSION": "1.3.0"
                                        },
                                    })),
                                    visible: false,
                                    title: "Slope",
                                    opacity: 1.000000,
                                    crossOrigin: 'anonymous'
                                });

                                 var wmslayersub_watershed = new ol.layer.Tile({
                                            name: 'Sub Watershed',
                                            description: 'sub_watershed',
                                            source: new ol.source.TileWMS(({
                                                url: urlGeoserver1,
                                                params: {
                                                    "LAYERS": "sub_watershed",
                                                    "TILED": "true",
                                                    "VERSION": "1.3.0"
                                                },
                                            })),
                                            visible: false,
                                            title: "Sub Watershed",
                                            opacity: 1.000000,
                                            crossOrigin: 'anonymous'
                                        });
                                         var wmslayerwatershed = new ol.layer.Tile({
                                                    name: 'Watershed',
                                                    description: 'watershed',
                                                    source: new ol.source.TileWMS(({
                                                        url: urlGeoserver1,
                                                        params: {
                                                            "LAYERS": "watershed",
                                                            "TILED": "true",
                                                            "VERSION": "1.3.0"
                                                        },
                                                    })),
                                                    visible: false,
                                                    title: "Watershed",
                                                    opacity: 1.000000,
                                                    crossOrigin: 'anonymous'
                                                });


                                                 wmslayerLithology = new ol.layer.Tile({
                                                            name: 'Lithology',
                                                            description: 'lithology',
                                                            source: new ol.source.TileWMS(({
                                                                url: urlGeoserver1,
                                                                params: {
                                                                    "LAYERS": "lithology",
                                                                    "TILED": "true",
                                                                    "VERSION": "1.3.0"

                                                                },
                                                            })),
                                                            visible: false,
                                                            title: "Lithology",
                                                            opacity: 1.000000,
                                                            crossOrigin: 'anonymous'

                                                        });
                                                            var wmslayerpanthanivas = new ol.layer.Tile({
                                                                    name: 'Panthanivas',
                                                                    description: 'Panthanivas',
                                                                    source: new ol.source.TileWMS(({
                                                                        url: urlGeoserver1,
                                                                        params: {
                                                                            "LAYERS": "panthanivas",
                                                                            "TILED": "true",
                                                                            "VERSION": "1.3.0"
                                                                        },
                                                                    })),
                                                                    visible: false,
                                                                    title: "Panthanivas",
                                                                    opacity: 1.000000,
                                                                    crossOrigin: 'anonymous'
                                                                });
                                                                var wmslayerpanthasala = new ol.layer.Tile({
                                                                    name: 'Panthasala',
                                                                    description: 'Panthasala',
                                                                    source: new ol.source.TileWMS(({
                                                                        url: urlGeoserver1,
                                                                        params: {
                                                                            "LAYERS": "panthasala",
                                                                            "TILED": "true",
                                                                            "VERSION": "1.3.0"
                                                                        },
                                                                    })),
                                                                    visible: false,
                                                                    title: "Panthasala",
                                                                    opacity: 1.000000,
                                                                    crossOrigin: 'anonymous'
                                                                });

                                                                     var wmslayerfire_substation = new ol.layer.Tile({
                                                                            name: 'Fire Station',
                                                                            description: 'fire_station',
                                                                            source: new ol.source.TileWMS(({
                                                                                url: urlGeoserver1,
                                                                                params: {
                                                                                    "LAYERS": "fire_station",
                                                                                    "TILED": "true",
                                                                                    "VERSION": "1.3.0"
                                                                                },
                                                                            })),
                                                                            visible: false,
                                                                            title: "Fire Station",
                                                                            opacity: 1.000000,
                                                                            crossOrigin: 'anonymous'
                                                                        });


                                              var wmslayer_bank = new ol.layer.Tile({
                                                             name: 'Bank',
                                                             description: 'odisha_rbi_bank',
                                                             source: new ol.source.TileWMS(({
                                                                 url: urlGeoserver1,
                                                                 params: {
                                                                     "LAYERS": "odishasampad:odisha_rbi_bank",
                                                                     "TILED": "true",
                                                                     "VERSION": "1.3.0"
                                                                 },
                                                             })),
                                                             visible: false,
                                                             title: "Bank",
                                                             opacity: 1.000000,
                                                             crossOrigin: 'anonymous'
                                                         });



                                              var wmslayer_soiltexture = new ol.layer.Tile({
                                                             name: 'Soil Texture',
                                                             description: 'odisha_soil_texture',
                                                             source: new ol.source.TileWMS(({
                                                                 url: urlGeoserver1,
                                                                 params: {
                                                                     "LAYERS": "odishasampad:odisha_soil_texture",
                                                                     "TILED": "true",
                                                                     "VERSION": "1.3.0"
                                                                 },
                                                             })),
                                                             visible: false,
                                                             title: "Soil Texture",
                                                             opacity: 1.000000,
                                                             crossOrigin: 'anonymous'
                                                         });

                                        wmslayerSchool = new ol.layer.Tile({
                                                    name: 'School Infra',
                                                    description: 'secondary_school_2019_20',
                                                    source: new ol.source.TileWMS(({
                                                        url: urlGeoserver1,
                                                        params: {
                                                            "LAYERS": "secondary_school_2019_20",
                                                            "TILED": "true",
                                                            "VERSION": "1.3.0"
                                                        },
                                                    })),
                                                    visible: false,
                                                    title: "School",
                                                    opacity: 1.000000,
                                                    crossOrigin: 'anonymous'
                                                });

                                                         // costal Layers

                                              var coast_htl = new ol.layer.Tile({
                                                                  name: 'HTL',
                                                                  description: 'HTL',
                                                                  source: new ol.source.TileWMS(({
                                                                      url: coasturl,
                                                                      params: {
                                                                          "LAYERS": "COAST:HTL",
                                                                          "TILED": "true",
                                                                          "VERSION": "1.3.0"
                                                                      },
                                                                  })),
                                                                  visible: false,
                                                                  title: "HTL",
                                                                  opacity: 1.000000,
                                                                  crossOrigin: 'anonymous'
                                                  });

                                                  var coast_crz = new ol.layer.Tile({
                                                                        name: 'CRZ',
                                                                        description: 'CRZ_Category',
                                                                        source: new ol.source.TileWMS(({
                                                                            url: coasturl,
                                                                            params: {
                                                                                "LAYERS": "COAST:CRZ_Category",
                                                                                "TILED": "true",
                                                                                "VERSION": "1.3.0"
                                                                            },
                                                                        })),
                                                                        visible: false,
                                                                        title: "CRZ",
                                                                        opacity: 1.000000,
                                                                        crossOrigin: 'anonymous'
                                                        });
                                            var coast_ecoasi = new ol.layer.Tile({
                                                           name: 'Ecologically Sensitive Area',
                                                           description: 'ASI',
                                                           source: new ol.source.TileWMS(({
                                                               url: coasturl,
                                                               params: {
                                                                   "LAYERS": "ASI",
                                                                   "TILED": "true",
                                                                   "VERSION": "1.3.0"
                                                               },
                                                           })),
                                                           visible: false,
                                                           title: "Ecologically Sensitive Area",
                                                           opacity: 1.000000,
                                                           crossOrigin: 'anonymous'
                                                   });


                                                           // costal Layers




//layers

    let basemap = new ol.layer.Tile({
        name: 'Open Street Map',
        source: new ol.source.OSM(),
        crossOrigin: 'anonymous',
        title: "Open Street Map",
        visible: true
    });


    let groupgoogle = new ol.layer.Group({
        name: 'Google Maps',
        layers: [googleLayerSatellite, googleLayerRoadmap],
        visible: true
    });
      let groupinfrastructurenetwork = new ol.layer.Group({
                 name: 'Network Infra',
                 layers: [wmslayercanal,wmslayerpowerline,wmslayerrailway_station,wmslayerrailwayline,road_other,road_nh,road_sh],
                 visible: false

             });
    let groupAdmin = new ol.layer.Group({
        name: 'Administrative Layers',
        layers: [village_bnd_4k, gp_bnd_4k, block_bnd_4k, dist_bnd_4k, state_bnd_4k],
        visible: true
    });
    let groupAdminFisheries = new ol.layer.Group({
        name: 'Administrative Boundary',
        layers: [ofaris_village_boundary,ofaris_grampanchayat_boundary,ofaris_block_boundary, ofaris_distict_zone, ofaris],
        visible: true
    })
    
//    let groupFisheriesAssets = new ol.layer.Group({
//        name: 'Fisheries Assets',
//        layers: [ofaris_fishermen_village,ofaris_harbour,ofaris_multi_cyclone,ofaris_fish_landing_center,ofaris_notified_jetty_limit,ofaris_port],
//        visible: true
//    });
   let groupNaturalResources = new ol.layer.Group({
            name: 'NR Layers',
            layers: [wmslayer_soiltexture,wmslayerSoil, wmslayergeomorphology,wmslayerLulc_nris_50k,wmslayerdrain],
            visible: false
    });
    let  groupinfrastructuresocialothers = new ol.layer.Group({
                name: 'Social Infra',
                layers: [ wmslayerpower_substation,wmslayerSchool, wmsmarket,wmslayer_bank],
                visible: false

            });
    let groupbasemap = new ol.layer.Group({
        name: 'Base Map',
        layers: [basemap],
        visible: true
    })

    // let overlayPopup = new ol.Overlay({
    //     element: container
    // });

    olMap = new ol.Map({
        //controls: ol.control.defaults().extend([
        //    new customButtons(), new custbtn2()]),
        controls: ol.control.defaults({attribution: false}).extend([attribution]),
        target: 'map2',
        // overlays: [overlayPopup],
        crossOrigin: 'anonymous',


        layers: [groupbasemap, groupgoogle,wmslayerwaterbody,ofaris_gcf, groupNaturalResources,groupinfrastructurenetwork,groupinfrastructuresocialothers, groupAdmin],
        view: new ol.View({
            center: ol.proj.transform([84.55, 20.02], 'EPSG:4326', 'EPSG:3857'),
            // 84.35, 19.92
            zoom: 7,
            maxZoom: 20,
            minZoom:2
        })
    })
    var lyrSource = road_other.getSource();
      lyrSource.on('imageloadstart', function(event) {
      console.log('imageloadstart event',event);
      //replace with your custom action
      //var elemId = event.target.params_.ELEMENTID;
       $('#searchLoader4').css("display", "block");
      });

      lyrSource.on('imageloadend', function(event) {
       console.log('imageloadend event',event);
      //replace with your custom action
       $('#searchLoader4').css("display", "none");
      });
   var lyrSourcernh = road_nh.getSource();
      lyrSourcernh.on('imageloadstart', function(event) {
      console.log('imageloadstart event',event);
      //replace with your custom action
      //var elemId = event.target.params_.ELEMENTID;
       $('#searchLoader4').css("display", "block");
      });

      lyrSourcernh.on('imageloadend', function(event) {
       console.log('imageloadend event',event);
      //replace with your custom action
       $('#searchLoader4').css("display", "none");
      });
var lyrSourcersh = road_sh.getSource();
      lyrSourcersh.on('imageloadstart', function(event) {
      console.log('imageloadstart event',event);
      //replace with your custom action
      //var elemId = event.target.params_.ELEMENTID;
       $('#searchLoader4').css("display", "block");
      });

      lyrSourcersh.on('imageloadend', function(event) {
       console.log('imageloadend event',event);
      //replace with your custom action
       $('#searchLoader4').css("display", "none");
      });
    var layerlist=[ofaris_village_boundary,ofaris_grampanchayat_boundary,ofaris_block_boundary,ofaris_distict_zone,ofaris_notified_jetty_limit];
    var zoomtoextent = new ol.control.ZoomToExtent({
        className: 'custom-zoom',
        extent: [8796767.525037993, 1954132.2578038773, 10027358.36810457, 2596668.4464184004]
    });
    var mousePosition = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
    });
    olMap.addControl(new ol.control.ScaleLine())
    olMap.addControl(new ol.control.OverviewMap({'className': 'ol-overviewmap ol-custom-overviewmap', collapseLabel: '\u00BB', label: '\u00AB'}))
    olMap.addControl(new ol.control.ZoomSlider())
    // olMap.addControl(new ol.control.FullScreen())
    olMap.addControl(zoomtoextent)
    olMap.addControl(mousePosition)
    var featureOverlayGP = new ol.layer.Vector({
        map: olMap,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })
    $('.map-type :radio').on('change', function(){
		var val = $(this).val()
        // olMap.addLayer(googleLayerSatellite)
        if(val==-1)
        {
            mapapi.googleLayerSatellite.setVisible(false)
            mapapi.googleLayerRoadmap.setVisible(false)
            mapapi.basemap.setVisible(false)

        }
        if(val==0)
        {
            // olMap.getLayers().insertAt(0, mapapi.googleLayerSatellite);
            mapapi.googleLayerSatellite.setVisible(true)
            mapapi.googleLayerRoadmap.setVisible(false)
            mapapi.basemap.setVisible(false)

        }
        if(val==1)
        {
            mapapi.googleLayerSatellite.setVisible(false)
            mapapi.googleLayerRoadmap.setVisible(true)
            mapapi.basemap.setVisible(false)

        }
        if(val==2)
        {
            mapapi.googleLayerSatellite.setVisible(false)
            mapapi.googleLayerRoadmap.setVisible(false)
            mapapi.basemap.setVisible(true)
           

        }
	})
    $('.progressType :radio').on('change', function(){
		var val = $(this).val()
       if(val=="0"){
        var data_search= {
   
            "districtId" : 0,
        
            "blockId" : 0,
        
            "gpId" : 0,
        
            "villageId" : 0,
        
       
            "validByOrsac":"",
            "progressStatus":"IN-PROGRESS"
        
            
                }
              
           getalltanksearch(data_search);
        //    vectorSourcepointnew.clear();
        //    vectorSourcepointnnew2.clear();
       }
        
       if(val=="1"){
        var data_search= {
   
            "districtId" : 0,
        
            "blockId" : 0,
        
            "gpId" : 0,
        
            "villageId" : 0,
        
       
            "validByOrsac":"",
            "progressStatus":"SUBMITTED"
        
            
                }
                
           getalltanksearch(data_search);
        //    vectorSourcepointnew.clear();
        //   vectorSourcepointnnew2.clear();
       }
       
       if(val=="2"){
        var data_search= {
   
            "districtId" : 0,
        
            "blockId" : 0,
        
            "gpId" : 0,
        
            "villageId" : 0,
        
       
            "validByOrsac":"",
            "progressStatus":"APPROVED"
        
            
                }
                
           getalltanksearch(data_search);
        //    vectorSourcepointnew.clear();
        //    vectorSourcepointnnew2.clear();
       }
        

	})
  
function getalltanksearch(searchData)
{

   
    $.ajax({
        url: service_url + 'gcf/master/tankSearchList',
        type: 'POST',
        data: JSON.stringify(searchData),//,
        dataType : 'json',
        contentType: 'application/json',//; charset=utf-8',
        success: function (response) {
            console.log(response);
         
          
            //  vectorSourcepointnew.clear();
            // vectorSourcepointnnew2.clear();
          
            if(response.status == 1){ 


                if(response.post.length>0){
                    for(i = 0; i < response.post.length; i++)
                       {
                        latprovided=response.post[i].latitudeProvided;
                        lngprovided=response.post[i].longitudeProvided;
                        latSurveyed=response.post[i].latitudeSurveyed;
                        lngSurveyed=response.post[i].longitudeSurveyed;
                        dataObj=response.post[i];
                        tanksearchonmap(latprovided,lngprovided, latSurveyed,lngSurveyed,dataObj);
               
                          
                        }
                   }
              
                   
                
               

               
                //alert("Successfully Registered!");
               
            }

            else{
                 
                // toastr.options = {
                //     "closeButton": false,
                //     "debug": false,
                //     "newestOnTop": false,
                //     "progressBar": false,
                //     "positionClass": "toast-top-right",
                //     "preventDuplicates": false,
                //     "onclick": null,
                //     "showDuration": "300",
                //     "hideDuration": "1000",
                //     "timeOut": "5000",
                //     "extendedTimeOut": "1000",
                //     "showEasing": "swing",
                //     "hideEasing": "linear",
                //     "showMethod": "fadeIn",
                //     "hideMethod": "fadeOut"
                //   };
                  
                //   toastr.success(data.errorMessage);

             }
            // else{
            //     Swal.fire({
            //         text: data.errorMessage,
            //         icon: 'error',
            //         confirmButtonText: 'OK'
            //     })
            // }
        }
    });
}

function tanksearchonmap(latprovided,lngprovided, latitudeSurveyed,longitudeSurveyed,dataObj) {
       
    var geojsonpoint = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "tankpointsurved",
                    dataObj
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [longitudeSurveyed,latitudeSurveyed]
                }
            }
        ]
    };
    var geojsonpointprovided = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {
                    "name": "tankpointprovided",
                    dataObj
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [lngprovided,latprovided]
                }
            }
        ]
    };

    var styleMarker = new ol.style.Style({
        image: new ol.style.Icon({
            scale: .7, anchor: [0.5, 1],
            src: '../assets/img/marker.png'
        })
    });
    var styleMarker2 = new ol.style.Style({
        image: new ol.style.Icon({
            scale: .7, anchor: [0.5, 1],
            src: '../assets/img/markerp.png'
        })
    });
    var gjFormatpoint = new ol.format.GeoJSON({
        featureProjection: 'EPSG:3857',
        strategy: ol.loadingstrategy.bbox,
    });
    var gjFormatpoint2 = new ol.format.GeoJSON({
        featureProjection: 'EPSG:3857',
        strategy: ol.loadingstrategy.bbox,
    });
    var featurespoint2 = gjFormatpoint2.readFeatures(geojsonpointprovided);
    var featurespoint = gjFormatpoint.readFeatures(geojsonpoint);

     vectorSourcepointnew = new ol.source.Vector();
    vectorSourcepointnnew2 = new ol.source.Vector();  
  
    if(longitudeSurveyed !=0 || latitudeSurveyed !=0)
    {
        
       var featuredraw= new ol.layer.Vector({
            map: olMap,
            source: vectorSourcepointnew,
            style: [styleMarker],

            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        vectorSourcepointnew.addFeatures(featurespoint)

        olMap.getView().fit(vectorSourcepointnew.getExtent(), { size: olMap.getSize(), maxZoom: 7 });
    }
    
    if(latprovided !=0 || lngprovided !=0)
    {
        
        var featuredraw2= new ol.layer.Vector({
            map: olMap,
            source: vectorSourcepointnnew2,
            style: [styleMarker2],

            updateWhileAnimating: true,
            updateWhileInteracting: true
        });
        vectorSourcepointnnew2.addFeatures(featurespoint2)
        olMap.getView().fit(vectorSourcepointnnew2.getExtent(), { size: olMap.getSize(), maxZoom: 7 });
    }
   
   
    
}


    var textGP = new ol.style.Style({
                           stroke: new ol.style.Stroke({
                                color: 'blue',
                                width: 3.5

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
                            map: olMap,
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
    var sourceDraw = new ol.source.Vector();
    var vectorDraw = new ol.layer.Vector({
        source: sourceDraw,
        map: olMap,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2,
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33',
                }),
            }),
        }),
    });
    var modify = new ol.interaction.Modify({ source: sourceDraw });
    olMap.addInteraction(modify);


	$(document).ready(function(){
    			$.ajax({
                    type: "GET",

                    url: "https://mapserver.odisha4kgeo.in/geoserver/wfs?request=getCapabilities",
    				dataType: "xml",
    				success: function(xml) {
    					var select = $('#layer');
    					$(xml).find('FeatureType').each(function(){
    						//var title = $(this).find('ows:Operation').attr('name');
    						//alert(title);
    						var name = $(this).find('Name').text();
    						//select.append("<option/><option class='ddheader' value='"+ name +"'>"+title+"</option>");
    							$(this).find('Name').each(function(){
                                    var value = $(this).text();
                                    var wb="WaterBody"

                                    if (value == "ofaris:waterbody_village_map") {


                                        select.append("<option class='ddindent' value='" + value + "'>" + wb + "</option>");
                                    }


    						});
    					});
    					//select.children(":first").text("please make a selection").attr("selected",true);
    				}
    			});
    		});


var highlightStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255,255,255,0.7)',
  }),
  stroke: new ol.style.Stroke({
    color: '#3399CC',
    width: 3,
  }),
 image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({
              color: '#3399CC'
            })
          })
});

 featureOverlay = new ol.layer.Vector({
        source: new ol.source.Vector(),
        map: olMap,
		style: highlightStyle
      });


		function findRowNumber(cn1, v1){

  var table = document.querySelector('#table');
  var rows = table.querySelectorAll("tr");
  var msg = "No such row exist"
  for(i=1;i<rows.length;i++){
    var tableData = rows[i].querySelectorAll("td");
    if(tableData[cn1-1].textContent==v1){
      msg = i;
      break;
    }
  }
  return msg;
}


//tebsle
function addRowHandlers() {
    var rows = document.getElementById("table").rows;
	var heads = table.getElementsByTagName('th');
	var col_no;
	for (var i = 0; i < heads.length; i++) {
        // Take each cell
        var head = heads[i];
		//alert(head.innerHTML);
		if (head.innerHTML == 'id')
		{
		col_no = i+1;
		//alert(col_no);
		}

		}
    for (i = 0; i < rows.length; i++) {



        rows[i].onclick = function(){ return function(){
		featureOverlay.getSource().clear();

		$(function() {
        $("#table td").each(function() {
   	   $(this).parent("tr").css("background-color", "white");
       });
       });
              var cell = this.cells[col_no-1];
               var id = cell.innerHTML;


			   	$(document).ready(function () {
    $("#table td:nth-child("+col_no+")").each(function () {
        if ($(this).text() == id) {
            $(this).parent("tr").css("background-color", "grey");
        }
    });
});

var features = geojson.getSource().getFeatures();
//alert(features.length);


for (i=0; i< features.length; i++)
{



if (features[i].getId() == id)
{
featureOverlay.getSource().addFeature(features[i]);

		featureOverlay.getSource().on('addfeature', function(){
    olMap.getView().fit(
        featureOverlay.getSource().getExtent(),
        { duration: 1590, size: olMap.getSize() }
    );
 });

}
}

               //alert("id:" + id);
        };}(rows[i]);
    }
}
//tebsle

//highlight

	function  highlight(evt) {
		featureOverlay.getSource().clear();
    var feature = olMap.forEachFeatureAtPixel(evt.pixel,
      function(feature, layer) {
        return feature;
      });

    if (feature) {

        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
		var coordinate = evt.coordinate;

	   $(function() {
        $("#table td").each(function() {
   	   $(this).parent("tr").css("background-color", "white");
       });
       });

        featureOverlay.getSource().addFeature(feature);
    }



var table = document.getElementById('table');
    var cells = table.getElementsByTagName('td');
	var rows = document.getElementById("table").rows;
	var heads = table.getElementsByTagName('th');
	var col_no;
	for (var i = 0; i < heads.length; i++) {
        // Take each cell
        var head = heads[i];
		//alert(head.innerHTML);
		if (head.innerHTML == 'id')
		{
		col_no = i+1;
		//alert(col_no);
		}

		}
		var row_no = findRowNumber(col_no, feature.getId());
		//alert(row_no);

		var rows = document.querySelectorAll('#table tr');

rows[row_no].scrollIntoView({
    behavior: 'smooth',
    block: 'center'
});

			$(document).ready(function () {
    $("#table td:nth-child("+col_no+")").each(function () {

        if ($(this).text() == feature.getId()) {
            $(this).parent("tr").css("background-color", "grey");

        }
    });
});




	};
//highlight

    		// attributes_dropdown

            $(function () {
            	$("#layer" ).change(function () {

            		var attributes = document.getElementById("attributes");
            var length = attributes.options.length;
            for (i = length-1; i >= 0; i--) {
              attributes.options[i] = null;
            }

            	  var value_layer = $(this).val();


            attributes.options[0] = new Option('Select attributes', "");
            		//  alert(url);

            			$(document).ready(function(){
            			$.ajax({
            				type: "GET",
                            url: "https://mapserver.odisha4kgeo.in/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName="+value_layer,
            				dataType: "xml",
            				success: function(xml) {

            				var select = $('#attributes');
            				//var title = $(xml).find('xsd\\:complexType').attr('name');
            			//	alert(title);
            				$(xml).find('xsd\\:sequence').each(function(){

            				$(this).find('xsd\\:element').each(function(){
            				var value = $(this).attr('name');
            				var valuestr="";
            				if(value =="revenue_village_name"){
                                        valuestr = "Village";
            				}
            				else if(value =="grampanchayat_name"){
                                        valuestr = "GP";
                            }
                           else if(value =="block_name"){
                                        valuestr = "Block";
                            }
                             else if(value =="district_name"){
                                        valuestr = "District";
                            }
                            else if(value =="area_ac"){
                                        valuestr = "Area In Acre";
                            }
                            else if(value =="f_zone_id"){
                                        valuestr = "Zone";
                            }

            				else{
            				 valuestr=value;
            				}

            				//alert(value);
            				var type = $(this).attr('type');
            				//alert(type);
            				if (value != 'geom' && value != 'the_geom' && value !="revenue_village_code" && value !="revenue_circle_name" && value !="revenue_circle_code"  && value !="revenue_circle_code" && value !="grampanchayat_code" && value !="state_name" && value !="tehsil_name" && value !="tehsil_code" && value !="block_code" && value !="district_code"  && value !="district_code" && value !="state_code"  && value !="dist_id" && value !="block_id" && value !="gp_id" && value !="village_id" && value !="wb_id"  && value !="wb_id"  && value !="lulc_code" && value !="shape_length" && value !="shape_area" && value !="is_tagged" && value !="classification_1"  && value !="classification_2" && value !="classification_4"  &&  value !="classification_3") {


            				select.append("<option class='ddindent' value='"+ type +"'>"+valuestr+"</option>");
            				}
            				});

            				});
            				}
            			});
            		});


            });
            });



            // operator combo
            $(function () {
            	$("#attributes" ).change(function () {

            		var operator = document.getElementById("operator");
            var length = operator.options.length;
            for (i = length-1; i >= 0; i--) {
              operator.options[i] = null;
            }

            	  var value_type = $(this).val();
            	 // alert(value_type);
            	  var value_attribute = $('#attributes option:selected').text();


            operator.options[0] = new Option('Select operator', "");

            	  if (value_type == 'xsd:short' || value_type == 'xsd:int' || value_type == 'xsd:double')
            			{
            			var operator1 = document.getElementById("operator");
            			operator1.options[1] = new Option('Greater than', '>');
            			operator1.options[2] = new Option('Less than', '<');
            			operator1.options[3] = new Option('between', 'between');
            			operator1.options[4] = new Option('Equal to', '=');
            			}
            			else if (value_type == 'xsd:string')
            			{
            			var operator1 = document.getElementById("operator");
            			operator1.options[1] = new Option('Like', 'ILike');

            			}

            });
            });

         //wfsquery
$( "#loadq" ).click(function() {

            $(document).on({
                ajaxStart: function(){
                    $("body").addClass("loading");
                },
                ajaxStop: function(){
                    $("body").removeClass("loading");
                }
            });

               $('#table').empty();
               if(geojson)
               		{
               		olMap.removeLayer(geojson);

               		}

               		if(featureOverlay)
               		{
               		featureOverlay.getSource().clear();
               		olMap.removeLayer(featureOverlay);

               		}
               	//alert('jsbchdb');
               var layer = document.getElementById("layer");
               var value_layer = layer.options[layer.selectedIndex].value;
               //alert(value_layer);

               var attribute = document.getElementById("attributes");
               var value_attribute2 = attribute.options[attribute.selectedIndex].text;
                var value_attribute="";
                           	  if(value_attribute2=="Village")
                           	  {
                           	  value_attribute ="revenue_village_name";

                           	  }
                           	  else if(value_attribute2=="GP")
                              {
                              value_attribute ="grampanchayat_name";

                              }
                              else if(value_attribute2=="Block")
                                {
                                value_attribute ="block_name";

                                }
                                else if (value_attribute2=="District")
                                {
                                value_attribute ="district_name";

                                }
                                 else if(value_attribute2=="Area In Acre")
                                {
                                value_attribute ="area_ac";

                                }
                                 else if(value_attribute2=="Zone")
                                {
                                value_attribute ="f_zone_id";

                                }
                           	  else{
                           	   value_attribute=value_attribute2
                           	  }



               //alert(value_attribute);

               var operator = document.getElementById("operator");
               var value_operator = operator.options[operator.selectedIndex].value;
               //alert(value_operator);

               var txt = document.getElementById("value");
               var value_txt = txt.value;
                var url = "";
               if (value_operator == 'ILike')
                {
                value_txt = "%25"+value_txt+"%25";
                //alert(value_txt);
                value_attribute = 'strToLowerCase('+value_attribute+')';
                 url = "https://mapserver.odisha4kgeo.in/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+value_layer+"&CQL_FILTER="+value_attribute+"+"+value_operator+"+'"+value_txt+"'&outputFormat=application/json"
                }
                else if(value_operator == 'between'){
                 // value_txt = '+100+and+200';
                    value_txt = '+' + value_txt +'+';
                                            //alert(value_txt);
                    url = "https://mapserver.odisha4kgeo.in/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+value_layer+"&CQL_FILTER="+value_attribute+"+"+value_operator+value_txt+"&outputFormat=application/json"
                }
                else{
                value_txt = value_txt;
                //value_attribute = value_attribute;
                url = "https://mapserver.odisha4kgeo.in/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName="+value_layer+"&CQL_FILTER="+value_attribute+"+"+value_operator+"+'"+value_txt+"'&outputFormat=application/json"
                }

               var style = new ol.style.Style({
                         fill: new ol.style.Fill({
                           color: 'rgba(255, 255, 255, 0.7)'
                         }),
                         stroke: new ol.style.Stroke({
                           color: '#0c61f280',
                           width: 3
                         }),
               		 /* image: new ol.style.Icon({
                   anchor: [0.5, 46],
                   anchorXUnits: 'fraction',
                   anchorYUnits: 'pixels',
                   src: 'img/marker.png',
                 }),*/
                         image: new ol.style.Circle({
                           radius: 7,
                           fill: new ol.style.Fill({
                             color: '#ffcc33'
                           })
                         })
                       });



                    geojson = new ol.layer.Vector({
                     //title:'dfdfd',
               	 //title: '<h5>' + value_crop+' '+ value_param +' '+ value_seas+' '+value_level+'</h5>',
                         source: new ol.source.Vector({
               		      url: url,
                         format: new ol.format.GeoJSON()
                         }),
               		  style: style,

                       });

               		geojson.getSource().on('addfeature', function(){
               		//alert(geojson.getSource().getExtent());
                   olMap.getView().fit(
                       geojson.getSource().getExtent(),
                       { duration: 1590, size: olMap.getSize() }
                   );
                });

                //overlays.getLayers().push(geojson);
               		olMap.addLayer(geojson);


               		$.getJSON(url, function(data) {
                         var col = [];
                         col.push('id');
                               for (var i = 0; i < data.features.length; i++) {

                                   for (var key in data.features[i].properties) {

                                       if (col.indexOf(key) === -1) {
                                           col.push(key);

                                       }
                                   }
                               }



               	  var table = document.createElement("table");


                       table.setAttribute("class", "table table-bordered");
                       table.setAttribute("id", "table");
                       // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

                       var tr = table.insertRow(-1);                   // TABLE ROW.

                       for (var i = 0; i < col.length; i++) {
                           var th = document.createElement("th");      // TABLE HEADER.
                           th.innerHTML = col[i];
                           tr.appendChild(th);
                       }

                       // ADD JSON DATA TO THE TABLE AS ROWS.
                       for (var i = 0; i < data.features.length; i++) {

                           tr = table.insertRow(-1);

                           for (var j = 0; j < col.length; j++) {
                               var tabCell = tr.insertCell(-1);
               				if (j == 0) {tabCell.innerHTML = data.features[i]['id'];}
               				else{
               				//alert(data.features[i]['id']);
                               tabCell.innerHTML = data.features[i].properties[col[j]];
               				//alert(tabCell.innerHTML);
               				}
                           }
                       }



                       // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
                       var divContainer = document.getElementById("table_data");
                       divContainer.innerHTML = "";
                       divContainer.appendChild(table);
               		addRowHandlers();

                  document.getElementById('map2').style.height='75%';
                   document.getElementById('table_data').style.height='25%';
               	olMap.updateSize();
               });


               	olMap.on('click', highlight);


               addRowHandlers();

                 olMap.un('singleclick',  maputils.assetclickevent);
                 olMap.un('singleclick', maputils.jetty);
                  olMap.un('singleclick', maputils.Waterbody);
                   olMap.un('singleclick', maputils.cycloneshelter);
                    olMap.un('singleclick', maputils.fishlandingcenter);

});


         //wfsquery

    /*var draw, snap;
    var typeSelect = document.getElementById('type');

    function addInteractions() {
        draw = new ol.interaction.Draw({
            source: sourceDraw,
            type: typeSelect.value,
        });
        olMap.addInteraction(draw);
        snap = new ol.interaction.Snap({ source: sourceDraw });
        olMap.addInteraction(snap);
    }


    typeSelect.onchange = function () {
        sourceDraw.clear();
        olMap.removeInteraction(draw);
        olMap.removeInteraction(snap);
        addInteractions();
    };

    $("#markonmap").click(function () {
        addInteractions();
    });*/
//controls
            var view2 = olMap.getView();
			var zoom = view2.getZoom();
			var center = view2.getCenter();
			var rotation = view2.getRotation();
document.getElementById('zoom-in').onclick = function() {

olMap.getView().animate({
  zoom: olMap.getView().getZoom() + 1,
  duration: 250
})
//				var view = olMap.getView();
//				var zoom = view.getZoom();
//				view.setZoom(zoom + 1);
			};
			document.getElementById('zoom-out').onclick = function() {

			olMap.getView().animate({
              zoom: olMap.getView().getZoom() - 1,
              duration: 250
            })
//            				var view = olMap.getView();
//            				var zoom = view.getZoom();
//            				view.setZoom(zoom - 1);
            			};
            			document.getElementById('zoom-restore').onclick = function() {
                        				view2.setCenter(center);
                        				view2.setRotation(rotation);
                        				view2.setZoom(zoom);

                        			};



                        			$( document ).ready(function() {

                                    

                        			    var deptId = parseInt(localStorage.getItem("deptId"));
                                        var authorityId = parseInt(localStorage.getItem("authorityId"));
                                        var authorityArea = localStorage.getItem("authorityArea");
                                        var authorisedClass = localStorage.getItem("authorisedClass");
                                        var menuId = JSON.parse(localStorage.getItem("menuId"));
                                        var currentURL = window.location.pathname
                                        var assetMClass = {

                                                "id" : authorisedClass

                                                }

                                                //  $.ajax({
                                                //             url: service_url + '/getDistrictByIdAsGeoJson',
                                                //             dataType: 'json',
                                                //             success: function (response) {
                                                //             console.log("rrr" + response)
                                                //             if(response.post.length >0)
                                                //             {
                                                //                      $.each(response.post, function (key, value) {

                                                //                                      $("#lulcdistrict").append("<option value=" + value.districtCode + ">" + value.districtName + "</option>");
                                                //                       });
                                                //                  }

                                                //          }

                                                //         });


                                     var data_share = {

                                            "flag" : authorityId,

                                            "id" : authorityArea

                                            }
//                                       $.ajax({
//                                                       type: "GET",
//                                                       url: service_url + '/category/' + deptId,
//                                                       dataType: 'json',
//                                                       success: function (response) {
//                                                        var chekval=response.post[0];


//                                                            var cont = document.getElementById('wkslist');

//                                                            // create ul element and set the attributes.
// //                                                           var ul = document.createElement('ul');
// //                                                           ul.setAttribute('style', 'padding: 0; margin: 0;');
// //                                                           ul.setAttribute('id', 'theList');
// //
// //                                                           for (i = 0; i <= arr.length - 1; i++) {
// //                                                               var li = document.createElement('li');     // create li element.
// //                                                               li.innerHTML = arr[i];      // assigning text to li using array value.
// //                                                               li.setAttribute('style', 'display: block;');    // remove the bullets.
// //
// //                                                               ul.appendChild(li);     // append li to ul.
// //                                                           }
// //
// //                                                           cont.appendChild(ul);


//                                                          // create ul element and set the attributes.



//                                                           //
// //                                                         ul.setAttribute('style', 'padding: 0; margin: 0;');
// //                                                         ul.setAttribute('id', 'theList');
//                                                        $.each(chekval, function (key, value) {

//                                                                     var li;

//                                                                      li = "<h5>" + value.classM.name_e + "</h5>";
//                                                                     for(j=0;j <= value.categoryM.length -1; j++)
//                                                                     {

//                                                                            li+= '<ul ><li><input type="checkbox" class="adx" value="' + value.categoryM[j].classCatMappingId + '" id="' + value.categoryM[j].classCatMappingId + '"/>' +
//                                                                              '<label  style="padding:0.2rem;" for="' + value.categoryM[j].classCatMappingId + '" >' + value.categoryM[j].name_e + '</label></li></ul>';

//                                                                     }
//                                                                     $('#wkslist').append(li);

//                                                                    //li.find('label').text(value.name_e);

//                                                                        // append li to ul.




//                                               $(".adx").change(function() {
//                                               var val = [];
//                                               var i = 0;
//                                                   if(this.checked) {
//                                                      $('.adx:checked').each(function(){

//                                                                     val[i++] = $(this).val();

//                                                           });
//                                                        console.log(val)
//                                                   }
//                                                   else{
//                                                    $('.adx:checked').each(function(){
//                                                                val[i++] = $(this).val();
//                                                      });
//                                                         console.log(val)
//                                                   }
//                                                     var assetcatwise= {

//                                                                 "classCatMappingId" : val.toString(),
//                                                                  "deptId" : '1'


//                                                                 }


//                                                              $.ajax({
//                                                                    type: "POST",
//                                                                    url: service_url + '/categorywiseassetlist',
//                                                                    dataType: 'json',
//                                                                    data: JSON.stringify(assetcatwise),
//                                                                    contentType:"application/json",
//                                                                    success: function (response) {
//                                                                       var txtgeom="";
//                                                                        var dataimage="";
//                                                                           vectorSourcepolygon2.clear();
// //                                                                         $('#assetCount').text("Asset Count:" + response.post[0].length);
//                                                                          if(response.post[0].length>0){
//                                                                           for(i = 0; i < response.post[0].length; i++)
//                                                                              {


//                                                                                txtgeom = JSON.parse(response.post[0][i].geojson)
//                                                                                console.log(txtgeom)
//                                                                                console.log(global_image_url)


//                                                                                  if(txtgeom.type!="GeometryCollection")
//                                                                                  {

//                                                                                    maputils.catwiseassetmap(vectorSourcepolygon2,txtgeom.coordinates,txtgeom.type,response.post[0][i].assetId)
//                                                                                  }
//                                                                               }
//                                                                          }
//                                                                          else{
//                                                                                Swal.fire({
//                                                                                            icon: 'error',
//                                                                                            title: '',
//                                                                                            text: 'No Asset Mapped'

//                                                                                  })

//                                                                             }
//                                                                    },
//                                                                    error: function (Result) {
//                                                                    }
//                                                                });
//                                               });





// //                                                            cont.appendChild(ul);

// //                                                               var vectorSourcepolygon2 = new ol.source.Vector();
// //                                                                for(j=0;j <= value.categoryM.length -1; j++){
// //
// //                                                              $('#'+ value.categoryM[j].classCatMappingId).change(function () {
// //                                                                       var val = [];
// //                                                                       var i = 0;
// //                                                                      if (this.checked) {
// //                                                                         $('.adx:checked').each(function(){
// //
// //                                                                                   val[i++] = $(this).val();
// //                                                                                   classid = value.classM.id;
// //                                                                                    console.log(classid);
// ////                                                                                  for(k=0;k <= value.categoryM.length -1; k++){
// ////                                                                                   var ttt=[];
// ////                                                                                   ttt.push(val);
// ////                                                                                   for (l=0;l<=ttt[0].length-1;l++)
// ////                                                                                   {
// ////                                                                                     var lsjs=ttt[0][l].split("")
// ////
// ////                                                                                   }
// ////                                                                                   var val2;
// ////                                                                                    val2=  ttt[0][k].split(",");
// ////                                                                                    for()
// ////                                                                                    var catid=val2[0];
// ////                                                                                    var clsid=val2[1];
// //
// //
// //
// //
// //                                                                         });
// ////                                                                         var ttt=i-1;
// ////                                                                         var tt = val[ttt].split(",")
// ////                                                                         console.log(val);
// //                                                                      }
// //                                                                      else {
// //                                                                          $('.adx:checked').each(function(){
// //                                                                                     val[i++] = $(this).val();
// //                                                                           });
// //                                                                           console.log(val);
// //                                                                           vectorSourcepolygon2.clear();
// //
// //                                                                      }
// //
// ////                                                                      let str = val.toString()
// ////                                                                      const myArr = str.split(",");
// ////
// ////                                                                      console.log(myArr)
// //
// //                                                                       var assetcatwise= {
// //
// //                                                                                      "categoryId" : myArr[0],
// //                                                                                       "deptId" : '1',
// //                                                                                       "classId":myArr[2]
// //
// //                                                                                      }
// //
// //                                                                       $.ajax({
// //                                                                             type: "POST",
// //                                                                             url: service_url + '/categorywiseassetlist',
// //                                                                             dataType: 'json',
// //                                                                             data: JSON.stringify(assetcatwise),
// //                                                                             contentType:"application/json",
// //                                                                             success: function (response) {
// //                                                                                var txtgeom="";
// //                                                                                 var dataimage="";
// //                                                                                    vectorSourcepolygon2.clear();
// //                                                                                   $('#assetCount').text("Asset Count:" + response.post[0].length);
// //                                                                                   if(response.post[0].length>0){
// //                                                                                    for(i = 0; i < response.post[0].length; i++)
// //                                                                                       {
// //
// //
// //                                                                                         txtgeom = JSON.parse(response.post[0][i].geojson)
// //                                                                                         console.log(txtgeom)
// //                                                                                         console.log(global_image_url)
// //
// //
// //                                                                                           if(txtgeom.type!="GeometryCollection")
// //                                                                                           {
// //
// //                                                                                             maputils.polygononmap2(vectorSourcepolygon2,txtgeom.coordinates,txtgeom.type,response.post[0],response.post[0][i], response.post[0][i].assetId,dataimage)
// //                                                                                           }
// //                                                                                        }
// //                                                                                   }
// //                                                                                   else{
// //                                                                                         Swal.fire({
// //                                                                                                     icon: 'error',
// //                                                                                                     title: '',
// //                                                                                                     text: 'No Asset Mapped'
// //
// //                                                                                           })
// //
// //                                                                                      }
// //                                                                             },
// //                                                                             error: function (Result) {
// //                                                                             }
// //                                                                         });
// //
// //
// //                                                                  });
// //
// //                                                                }


//                                                           });
//                                                       },
//                                                       error: function (Result) {
//                                                       }
//                                             });


                                            if(deptId == 1){




                                                            //Fishery State Authority
                                                            if(authorityId == 1){
                                                            $.ajax({
                                                                          type: "GET",
                                                                          url: service_url + '/getZone',
                                                                          dataType: 'json',
                                                                          success: function (Result) {
                                                                              $("#selZone2").empty();
                                                                              $("#selZone2").append($("<option></option>").val("0").html("-- Select Zone --"));
                                                                              $.each(Result.post, function (key, value) {
                                                                                  $("#selZone2").append($("<option></option>").val(value.zoneId).html(value.zoneName));
                                                                              });
                                                                          },
                                                                          error: function (Result) {
                                                                          }
                                                                });

                                                                 $.ajax({
                                                                           type: "POST",
                                                                           url: service_url + '/getAssetSearchClass',
                                                                           dataType: 'json',
                                                                           data: JSON.stringify(assetMClass),
                                                                           contentType:"application/json",
                                                                           success: function (Result) {
                                                                               $("#assetCls").append($("<option></option>").val("0").html("-- Select Asset --"));
                                                                               $.each(Result.post, function (key, value) {
                                                                                   $("#assetCls").append($("<option></option>").val(value.id).html(value.name_e));
                                                                               });
                                                                           },
                                                                           error: function (Result) {
                                                                           }
                                                                       });
                                                            }

                                                            //Fishery Zone Authority
                                                            else if(authorityId == 2){
                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: service_url + '/getFisheryAssetSearchBindingAsAuthority',
                                                                    data: JSON.stringify(data_share),
                                                                    contentType:"application/json",
                                                                    dataType: 'json',
                                                                    success: function (Result) {
                                                    //                    $("#zone").empty();
                                                                        $("#selZone2").append($("<option></option>").val("0").html("-- Select Zone --"));
                                                                        $.each(Result.post[0], function (key, value) {
                                                                            $("#selZone2").append($("<option></option>").val(value.fzoneId).html(value.fzoneName));
                                                                        });
                                                                    },
                                                                    error: function (Result) {
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: service_url + '/getAssetSearchClass',
                                                                    dataType: 'json',
                                                                    data: JSON.stringify(assetMClass),
                                                                    contentType:"application/json",
                                                                    success: function (Result) {
                                                                        $("#assetCls").append($("<option></option>").val("0").html("-- Select Asset --"));
                                                                        $.each(Result.post, function (key, value) {
                                                                            $("#assetCls").append($("<option></option>").val(value.id).html(value.name_e));
                                                                        });
                                                                    },
                                                                    error: function (Result) {
                                                                    }
                                                                });
                                                            }

                                                            //Fishery District Authority
                                                            else if(authorityId == 3){

                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: service_url + '/getFisheryAssetSearchBindingAsAuthority',
                                                                    data: JSON.stringify(data_share),
                                                                    contentType:"application/json",
                                                                    dataType: 'json',
                                                                    success: function (Result) {
                                                                        $("#selZone2").append($("<option></option>").val(Result.post[0][0].fzoneId).html(Result.post[0][0].fzoneName));
                                                                        $("#selDistrict2").empty();
                                                                        $("#selDistrict2").append($("<option></option>").val("0").html("-- Select District --"));
                                                                        $.each(Result.post[0], function (key, value) {
                                                                            $("#selDistrict2").append($("<option></option>").val(value.distId).html(value.districtName));
                                                                        });
                                                                    },
                                                                    error: function (Result) {
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: service_url + '/getAssetSearchClass',
                                                                    dataType: 'json',
                                                                    data: JSON.stringify(assetMClass),
                                                                    contentType:"application/json",
                                                                    success: function (Result) {
                                                                        $("#assetCls").append($("<option></option>").val("0").html("-- Select Asset --"));
                                                                        $.each(Result.post, function (key, value) {
                                                                            $("#assetCls").append($("<option></option>").val(value.id).html(value.name_e));
                                                                        });
                                                                    },
                                                                    error: function (Result) {
                                                                    }
                                                                });
                                                            }

                                                            //Fishery Block Authority
                                                            else if(authorityId == 4){
                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: service_url + '/getFisheryAssetSearchBindingAsAuthority',
                                                                    data: JSON.stringify(data_share),
                                                                    contentType:"application/json",
                                                                    dataType: 'json',
                                                                    success: function (Result) {
                                                                        $("#selZone2").empty();
                                                                        $("#selZone2").append($("<option></option>").val(Result.post[0][0]["districtBoundaryModel"].fzoneId).html(Result.post[0][0]["districtBoundaryModel"].fzoneName));
                                                                        $("#selDistrict2").empty();
                                                                        $("#selDistrict2").append($("<option></option>").val(Result.post[0][0].distId).html(Result.post[0][0].districtName));
                                                                        $("#selBlock2").empty();
                                                                        $("#selBlock2").append($("<option></option>").val("0").html("-- Select Block --"));
                                                                        $.each(Result.post[0], function (key, value) {
                                                                            $("#selBlock2").append($("<option></option>").val(value.blockId).html(value.blockName));
                                                                        });
                                                                    },
                                                                    error: function (Result) {
                                                                    }
                                                                });

                                                                $.ajax({
                                                                    type: "POST",
                                                                    url: service_url + '/getAssetSearchClass',
                                                                    dataType: 'json',
                                                                    data: JSON.stringify(assetMClass),
                                                                    contentType:"application/json",
                                                                    success: function (Result) {
                                                                        $("#assetCls").append($("<option></option>").val("0").html("-- Select Asset --"));
                                                                        $.each(Result.post, function (key, value) {
                                                                            $("#assetCls").append($("<option></option>").val(value.id).html(value.name_e));
                                                                        });
                                                                    },
                                                                    error: function (Result) {
                                                                    }
                                                                });
                                                            }
                                                        }




                                    });

//zone onchannge
$( "#selZone2" ).change(function() {
 var zoneId=$("#selZone2 option:selected").val();
         $.ajax({
             url: service_url +'/getDistrictByZoneId/' + zoneId,
             dataType: 'json',
             success: function(response) {
 //                console.log(response);
                 var newarray = []
                 response.post.forEach(e => {newarray.push(e.districtId)})
 //                console.log(newarray);
                 $("#selDistrict2").data('alldistricts', newarray)
 //                console.log(response);
                 $("#selDistrict2").empty();
                 $("#selDistrict2").append($("<option></option>").val("0").html('-- Select District --'));
                 $.each(response.post, function (key, value) {
                     $("#selDistrict2").append($("<option></option>").val(value.districtId).html(value.districtName));
                 });
             }
         });
});

//zone change

//district on chnage
$( "#selDistrict2" ).change(function() {
 var distId=$("#selDistrict2 option:selected").val();
         $.ajax({
             url: service_url +'/getBlockByDistId/'+distId,
             dataType: 'json',
             success: function(response){
                 $("#selBlock2").empty();
                 $("#selBlock2").append($("<option></option>").val("0").html('-- Select Block --'));
                 $.each(response.post, function (key, value) {
                     $("#selBlock2").append($("<option></option>").val(value.blockId).html(value.blockName));
                 });
             }
         });
});

//district on change

//blockonchnage
$( "#selBlock2" ).change(function() {
 var blockId=$("#selBlock2 option:selected").val();
         $.ajax({
             url: service_url +'/getGpByBlockId/'+blockId,
             dataType: 'json',
             success: function(response){
                 $("#selGP2").empty();
                 $("#selGP2").append($("<option></option>").val("0").html('-- Select Gram Panchayat --'));
                 $.each(response.post, function (key, value) {
                     $("#selGP2").append($("<option></option>").val(value.gpId).html(value.grampanchayatName));
                 });
             }
         });
});

//blockonchnage

//gp onchange

$( "#selGP2" ).change(function() {
  var gpId=$("#selGP2 option:selected").val();
         $.ajax({
             url: service_url +'/getRevenueVillageByGPId/'+gpId,
             dataType: 'json',
             success: function(response){
                 $("#selVillage2").empty();
                 $("#selVillage2").append($("<option></option>").val("0").html('-- Select Revenue Village --'));
                 $.each(response.post, function (key, value) {
                     $("#selVillage2").append($("<option></option>").val(value.gid).html(value.revenueVillageName));
                 });
             }
         });
});
//gponchange






    //class by cat
$( "#assetCls" ).change(function() {
  var classId=$("#assetCls option:selected").val();
          $.ajax({
              url: service_url +'/getCategoryByClassId/' + classId,
              dataType: 'json',
              success: function(response){
               console.log(response);
                  var newarray = []
                  response.post.forEach(e => {newarray.push(e.id)})
  //                console.log(newarray);
                  $("#assetCat").data('allcategory', newarray)
  //                console.log(response);
                  $("#assetCat").empty();
                  $("#assetCat").append($("<option></option>").val("0").html('-- Select Asset Category --'));
                  $.each(response.post, function (key, value) {
                      $("#assetCat").append($("<option></option>").val(value.category_id).html(value.name_e));
                  });
              }
          });
});

     //class by cat

     //assetsearchonmap


$( "#lulcdistrict" ).change(function() {
        var distCode=$("#lulcdistrict option:selected").val();
         $.ajax({
             url: service_url +'/getBlockByDistrictCode/'+distCode,
             dataType: 'json',
              beforeSend: function( xhr ) {
                             $('#searchLoader1').css("display", "block");
                         },
             success: function(response){
             	$('#searchLoader1').css("display", "none");
                 $("#lulcblocks").empty();
                 $("#lulcblocks").append($("<option></option>").val("-1").html('-- Select Block --'));
                  $("#lulcgp").empty();
                  $("#lulcgp").append($("<option></option>").val("-1").html('-- Select Gram Panchayat --'));
                  $("#lulcvillage").empty();
                  $("#lulcvillage").append($("<option></option>").val("-1").html('-- Select Revenue Village --'));
                 $.each(response.post[0], function (key, value) {
                     $("#lulcblocks").append($("<option></option>").val(value.blockCode).html(value.blockName));
                 });
                 distgeojson(distCode);
             },
             error: function (jqXHR, textStatus, errorThrown)
                         {
                             //$.unblockUI();
                             alert('Server not responding!');
                             $('#searchLoader1').css("display", "none");
                         }
         });
});
function distgeojson(distId)
{
console.log(distId)
// $.ajax({
//             url: service_url +'/getDistrictByIdAsGeoJson/'+distId,
//             dataType: 'json',
//
//             success: function(response){
//
//                 console.log(response);
//
//             },
//             error: function (jqXHR, textStatus, errorThrown)
//                         {
//                             //$.unblockUI();
//                             alert('Server not responding!');
//                             $('#searchLoader1').css("display", "none");
//                         }
//         });
}
//blockonchnage
$( "#lulcblocks" ).change(function() {
        var blockcode=$("#lulcblocks option:selected").val();
         $.ajax({
             url: service_url +'/getGpByBlockCode/'+blockcode,
             dataType: 'json',
            beforeSend: function( xhr ) {
                                  $('#searchLoader1').css("display", "block");
                              },
             success: function(response){
             $('#searchLoader1').css("display", "none");
                 $("#lulcgp").empty();
                 $("#lulcgp").append($("<option></option>").val("-1").html('-- Select Gram Panchayat --'));
                 $("#lulcvillage").empty();
                 $("#lulcvillage").append($("<option></option>").val("-1").html('-- Select Revenue Village --'));
                 $.each(response.post[0], function (key, value) {


                     $("#lulcgp").append($("<option></option>").val(value.grampanchayatCode+","+value.latitude+","+value.longitude).html(value.grampanchayatName));
                 });
             },
              error: function (jqXHR, textStatus, errorThrown)
                  {
                      //$.unblockUI();
                      alert('Server not responding!');
                      $('#searchLoader1').css("display", "none");
                  }
         });
});

//blockonchnage

$( "#lulcgp" ).change(function() {
   var gpchange=$("#lulcgp option:selected").val();
   const myArrq = gpchange.split(",");
   var gpcode=myArrq[0];
   var centroidlat=myArrq[1];
   var centroidlng=myArrq[2];
//   console.log(centroidlat);
//   console.log(centroidlng);

   gpjson(gpcode);
          $.ajax({
              url: service_url +'/getVillageByGpCode/'+gpcode,
              dataType: 'json',
                beforeSend: function( xhr ) {
                    $('#searchLoader1').css("display", "block");
                },
                success: function(response){
                $('#searchLoader1').css("display", "none");
                  $("#lulcvillage").empty();
                  $("#lulcvillage").append($("<option></option>").val("-1").html('-- Select Revenue Village --'));
                  $.each(response.post[0], function (key, value) {
                      $("#lulcvillage").append($("<option></option>").val(value.revenueVillageCode+","+value.latitude+","+value.longitude+","+value.confirmRvStatus).html(value.revenueVillageName));
                  });
              },
               error: function (jqXHR, textStatus, errorThrown)
                {
                    //$.unblockUI();
                    alert('Server not responding!');
                    $('#searchLoader1').css("display", "none");
                }

          });
});

function gpjson(gpcode)
{
        $.ajax({
                    url: service_url + '/getGpByGpCodeAsGeoJson/' + gpcode,
                    dataType: 'json',
                    success: function (response) {
                    if(response.post.length >0)
                             {
                               for(i=0;i<response.post.length;i++)
                               {
                                var geomGP=response.post[i].geom;
                                let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.post[i].geom + '}'
                                let gjFormatpoly = new ol.format.GeoJSON({
                                    featureProjection: 'EPSG:3857',
                                    strategy: ol.loadingstrategy.bbox,
                                })
//                                vectorSourceZone.clear()
//                                vectorSourceDistrict.clear()
//                                vectorSourceBlock.clear()
                                vectorSourceGP.clear()
                                vectorSourceGP.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                //textDivision.getText().setText(GPNames[val])
                                featureOverlayGP.setSource(vectorSourceGP)
                                featureOverlayGP.setStyle(textGP)

                                olMap.getView().fit(vectorSourceGP.getExtent(), {
                                    size: olMap.getSize(),
                                    maxZoom: 14
                               })
                              }
                         }

                    }
                });

}

$( "#lulcvillage" ).change(function() {

var villagecode=$("#lulcvillage option:selected").val();
          const myArrqe = villagecode.split(",");
          var villcode=myArrqe[0];
          var centroidlatv=myArrqe[1];
          var centroidlngv=myArrqe[2];
          var statusulb=myArrqe[3];
            $.ajax({
                    url: service_url + '/getVillageByVillageCodeAsGeoJson/' + villcode,
                    dataType: 'json',
                    success: function (response) {
                    if(response.post.length >0)
                             {
                               for(i=0;i<response.post.length;i++)
                               {
                                var geomVillage=response.post[i].geom;
                                let geojsonpoly = '{"type": "Feature","properties": {},"geometry":' + response.post[i].geom + '}'
                                let gjFormatpoly = new ol.format.GeoJSON({
                                    featureProjection: 'EPSG:3857',
                                    strategy: ol.loadingstrategy.bbox,
                                })

                                vectorSourceGP.clear()
                                vectorSourceVillage.clear()
                                vectorSourceVillage.addFeatures(gjFormatpoly.readFeatures(geojsonpoly))
                                //textDivision.getText().setText(VillageNames[val])
                                featureOverlayVillage.setSource(vectorSourceVillage)
                                featureOverlayVillage.setStyle(textVillage)

                                mapapi.olMap.getView().fit(vectorSourceVillage.getExtent(), {
                                    size:olMap.getSize(),
                                    maxZoom: 16
                               })

                              }
                         }

                    }
                });
});


function geometryStyle(feature){
  var
    style = [],
    geometry_type = feature.getGeometry().getType(),
    white = [255, 255, 255, 1],
    blue = [0, 153, 255, 1],
    cyan = [0,255,255,1],
    width = 0.5 ;

  style['Polygon'] = [
    new ol.style.Style({
      fill: new ol.style.Fill({ color: [255, 255, 255, 0.5] }),
      stroke: new ol.style.Stroke({color: cyan, width: .5}),
      text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ],
  style['MultiPolygon'] = [
	new ol.style.Style({
		fill: new ol.style.Fill({ color: [255, 255, 255, 0.1] }),
		stroke: new ol.style.Stroke({ color: white, width: 3.5}),
		stroke: new ol.style.Stroke({color: cyan, width: .5}),
		text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ];

  return style[geometry_type];
}


function geometryStyleBuildUP(feature){
   var
    style = [],
    geometry_type = feature.getGeometry().getType(),
    white = [255, 255, 255, 1],
    blue = [0, 153, 255, 1],
    cyan = [0,255,255,1],
    width = 0.5 ;

  style['Polygon'] = [
    new ol.style.Style({
      fill: new ol.style.Fill({ color: [255, 255, 255, 0.5] }),
      stroke: new ol.style.Stroke({color: cyan, width: .5}),
      text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ],
  style['MultiPolygon'] = [
	new ol.style.Style({
		fill: new ol.style.Fill({ color: [255,255,0, 1] }),
		stroke: new ol.style.Stroke({ color: blue, width: .5}),
		text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ];

  return style[geometry_type];
}

function geometryStyleRiver(feature){
   var
    style = [],
    geometry_type = feature.getGeometry().getType(),
    white = [255, 255, 255, 1],
    blue = [0, 153, 255, 1],
    cyan = [0,255,255,1],
    width = 0.5 ;

  style['Polygon'] = [
    new ol.style.Style({
      fill: new ol.style.Fill({ color: [190,210,255, 1] }),
      stroke: new ol.style.Stroke({color: cyan, width: .5}),
      text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ],
  style['MultiPolygon'] = [
	new ol.style.Style({
		fill: new ol.style.Fill({ color: [190,210,255, 1] }),
		stroke: new ol.style.Stroke({ color: blue, width: .5}),
		text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ];

  return style[geometry_type];
}

function geometryStyleRoad(feature){
   var
    style = [],
    geometry_type = feature.getGeometry().getType(),
    white = [255, 255, 255, 1],
    blue = [0, 153, 255, 1],
    cyan = [0,255,255,1],
    width = 0.5 ;
//console.log(geometry_type);
  style['Polygon'] = [
    new ol.style.Style({
      fill: new ol.style.Fill({ color: [255, 0, 0, 1] }),
      stroke: new ol.style.Stroke({color: cyan, width: .5}),
      text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ],
  style['MultiPolygon'] = [
	new ol.style.Style({
		fill: new ol.style.Fill({ color: [255,0,0, 1] }),
		stroke: new ol.style.Stroke({ color: blue, width: .5}),
		text: new ol.style.Text({ text:getText(feature, myDom.polygons)}),
	}),
  ];

  return style[geometry_type];
}
var myDom = {
        points: {
          text: document.getElementById('points-text'),
          align: document.getElementById('points-align'),
          baseline: document.getElementById('points-baseline'),
          rotation: document.getElementById('points-rotation'),
          font: document.getElementById('points-font'),
          weight: document.getElementById('points-weight'),
          size: document.getElementById('points-size'),
          offsetX: document.getElementById('points-offset-x'),
          offsetY: document.getElementById('points-offset-y'),
          color: document.getElementById('points-color'),
          outline: document.getElementById('points-outline'),
          outlineWidth: document.getElementById('points-outline-width'),
          maxreso: document.getElementById('points-maxreso')
        },
        lines: {
          text: 'normal',
          align: document.getElementById('lines-align'),
          baseline: 'middle',
          rotation: 0,
          font: 'Arial',
          weight: 'bold',
          placement: 'point',
          maxangle: 0.7853981633974483,
          overflow: document.getElementById('lines-overflow'),
          size: document.getElementById('lines-size'),
          offsetX: document.getElementById('lines-offset-x'),
          offsetY: document.getElementById('lines-offset-y'),
          color: document.getElementById('lines-color'),
          outline: document.getElementById('lines-outline'),
          outlineWidth: document.getElementById('lines-outline-width'),
          maxreso: document.getElementById('lines-maxreso')
        },
        polygons: {
          text: 'normal',
          align: 'center',
          baseline: 'alphabetic',
          rotation: 0,
          font: 'Arial',
          weight: 'bold',
          placement: 'point',
          maxangle: 0.7853981633974483,
          overflow: 'false',
          size: '30px',
          offsetX: 0,
          offsetY: 0,
          color: 'cyan',
          outline: '#ffffff',
          outlineWidth: 3,
          maxreso: 1200
        }
};


var getText = function(feature, dom) {
        var type = dom.text.value;
        var maxResolution = dom.maxreso.value;
        var text = feature.get('revenue_plot');
        return text;
};
//search cadastral
$("#asset_search22").on('click',function(e){
		var lyr = $("#lulcblocks option:selected").text();
		var layer = lyr;
		var lulcdistrict = $("#lulcdistrict").val();
		var lulcblocks = $("#lulcblocks").val();
		var lulcgp = $("#lulcgp").val();
		var gpchange2=$("#lulcgp option:selected").val();
           const myArrq = gpchange2.split(",");
           var gpcode=myArrq[0];
           var centroidlat=myArrq[1];
           var centroidlng=myArrq[2];

           var villagecode=$("#lulcvillage option:selected").val();
          const myArrqe = villagecode.split(",");
          var villcode=myArrqe[0];
          var centroidlatv=myArrqe[1];
          var centroidlngv=myArrqe[2];
          var statusulb=myArrqe[3];


		var lulcvillage = $("#lulcvillage").val();
		var blocks = $("#lulcblocks option:selected").text();
		var district = $("#lulcdistrict  option:selected").text();
		var gp = $("#lulcgp  option:selected").text();
		var village = $("#lulcvillage  option:selected").text();
		blocks = blocks.trim();
//var crdq=cordinates[0]
//var crdw=cordinates[1]
		if(lulcdistrict=="-1"){
			alert("Select a district.");
			return false;
		}

		if(lulcblocks=="-1"){
			alert("Select a block.");
			return false;
		}

		if(lulcgp=="-1"){
			alert("Select a grampanchayat.");
			return false;
		}

		if(lulcAdd == "1"){
					olMap.removeLayer(vectorLayer);
					lulcAdd = 0;
		}

		if(lulcvillage != "-1" && statusulb!="ULB"){
				json = { 'cordinates[0]':centroidlngv,'cordinates[1]':centroidlatv, value:villcode ,field:'revenue_village_code',epsg:3857} ;
				console.log(json);
		}
		 if(lulcvillage != "-1" && statusulb=="ULB"){
        				json = {'cordinates[0]':centroidlng,'cordinates[1]':centroidlat,value:gpcode ,field:'grampanchayat_code',epsg:3857} ;
        }
		if(lulcgp != "-1" && villcode=="-1"){

				json = {'cordinates[0]':centroidlng,'cordinates[1]':centroidlat,value:gpcode ,field:'grampanchayat_code',epsg:3857} ;

		}
//		else{
//			json =  { district:district, block:blocks, value:blocks ,field:'block_name'} ;
//
//			var serviceName = "revenue:"+district.toLowerCase()+"_"+blocks.toLowerCase();
//
//			var vectorSource = new ol.source.TileWMS({
//				url: 'https://mapserver.odisha4kgeo.in/geoserver/revenue/wms?',
//				params: {'LAYERS': serviceName,'STYLES':'revenue', 'TILED': true},
//				projection: "EPSG:4326",
//				transition: 0
//			});
//
//			vectorLayer = new ol.layer.Tile({
//					type: 'ORSAC',
//					id: district.toLowerCase() + "_"+  blocks.toLowerCase(),
//					title: district.toLowerCase() + "_" + blocks.toLowerCase(),
//					source: vectorSource,
//					zIndex: 1,
//					visible: true
//			});
//
//			olMap.addLayer(vectorLayer);
//
//			vectorSource.on('tileloadstart', function() {
//				$(".loader-div").show();
//			});
//
//			vectorSource.on('tileloadend', function() {
//				$(".loader-div").hide();
//			});
//
//			lulcAdd = 1;
//		}
		$("#cadastrallegenddiv").hide();

		$(".togl-btn .toglbtn-2").trigger("click");

		if(lulcRoadAdd==1){
			olMap.removeLayer(vectorLayerRoad);
		}
		if(lulcRiverAdd==1){
			olMap.removeLayer(vectorLayerRiver);
		}

		if(lulcBuildUPAdd==1){
			olMap.removeLayer(vectorLayerBuildUP);
		}

		$("#cadastrallegenddiv").hide();
		console.log(json);
		$.ajax({
				type: "POST",
				url: "https://odisha4kgeo.in/index.php/mapview/getCadastralGeom",
				data: json,
				 beforeSend: function( xhr ) {
                   $('#searchLoader2').css("display", "block");
                   },
				success: function(data){

					vectorSource2 = new ol.source.Vector({
							features: (new ol.format.GeoJSON()).readFeatures(data)
					});
					if(vectorSource2.getState() == "ready") {
						if(vectorSource2.getFeatures().length > 0) {
						$('#searchLoader2').css("display", "none");
								vectorLayer = new ol.layer.Vector({
									type: 'Search Layer',
									source: vectorSource2,
									title: 'Cadastrial Map',
									style: geometryStyle,
								});
								olMap.getView().fit(vectorSource2.getExtent());
								olMap.addLayer(vectorLayer);
								//searchGroup.getLayers().push(vectorLayer);
								lulcAdd = 1;
						}
						else{
							alert("No records found.");
							lulcAdd = 0;
						}
					}
				},
				 error: function (jqXHR, textStatus, errorThrown)
                                {
                                    //$.unblockUI();
                                    alert('Server not responding!');
                                    $('#searchLoader2').css("display", "none");
                                }
		});






	});
//search cadastral

//reset cadastarl

 $('#resetdraw222').on('click', function(){

                $("#lulcblocks").empty();
                 $("#lulcblocks").append($("<option></option>").val("-1").html('-- Select Block --'));
                  $("#lulcgp").empty();
                  $("#lulcgp").append($("<option></option>").val("-1").html('-- Select Gram Panchayat --'));
                  $("#lulcvillage").empty();
                  $("#lulcvillage").append($("<option></option>").val("-1").html('-- Select Revenue Village --'));
                //    $.ajax({
                //                   url: service_url + '/getDistrictByIdAsGeoJson',
                //                   dataType: 'json',
                //                   success: function (response) {

                //                   if(response.post.length >0)
                //                   {
                //                          $("#lulcdistrict").empty();
                //                          $("#lulcdistrict").append($("<option></option>").val("-1").html('-- Select District --'));
                //                            $.each(response.post, function (key, value) {


                //                                            $("#lulcdistrict").append("<option value=" + value.districtCode + ">" + value.districtName + "</option>");
                //                             });
                //                        }

                //                }

                //          });

                 vectorSource2.clear();
                 vectorSourceGP.clear()
                 vectorSourceVillage.clear()


       })
//reset cadastral

var vectorSourcepolygon2 = new ol.source.Vector();

var featureForCategoryWise = new ol.layer.Vector({
    source: vectorSourcepolygon2,
    map: olMap,
    style: styleFunction,
    updateWhileAnimating: true,
    updateWhileInteracting: true
});

$( "#asset_search2" ).click(function() {
                        var zone = $("#selZone2").val();
                        var district = $("#selDistrict2").val();
                        var block = $("#selBlock2").val();
                        var gramPanchayat = $("#selGP2").val();
                        var revenueVillage = $("#selVillage2").val();
                        var assetCls = $("#assetCls").val();
                        var assetCat = $("#assetCat").val();

                             var authorisedClass = localStorage.getItem("authorisedClass");
                              var deptId = parseInt(localStorage.getItem("deptId"));
                              var authorityId = parseInt(localStorage.getItem("authorityId"));
                              var authorityArea = localStorage.getItem("authorityArea");

             var json = "";
             if(zone == 0 && district == 0 && block == 0 && gramPanchayat == 0 && revenueVillage == 0 && assetCls == 0 && assetCat ==0){
                 if(authorityId == 1){
                     json = {"zone":zone, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":assetCls, "assetCat":assetCat};
                 }
                 else if(authorityId == 2){
                     json = {"zone":authorityArea, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                 }
                 else if(authorityId == 3){
                     json = {"zone":zone, "district":authorityArea, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                 }
                 else if(authorityId == 4){
                     json = {"zone":zone, "district":district, "block":authorityArea, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                 }
             }
             else{
                 if(assetCls == 0){
                     json = {"zone":zone, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                 }
                 else{
                       if(authorityId == 1){
                             json = {"zone":zone, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":assetCls, "assetCat":assetCat};
                       }
                       else if(authorityId == 2){
                         if(district == 0){
                             json = {"zone":authorityArea, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                         }else{
                             json = {"zone":zone, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                         }
                       }
                       else if(authorityId == 3){
                         if(subdivision == 0){
                             json = {"zone":zone, "district":authorityArea, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                         }else{
                             json = {"zone":zone, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                         }
                       }
                       else if(authorityId == 4){
                         if(vdvh == 0){
                             json = {"zone":zone, "district":district, "block":authorityArea, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":authorisedClass, "assetCat":assetCat};
                         }else{
                             json = {"district":district, "subdivision":subdivision, "vdvh":vdvh, "lac":lac, "revenueVillage":revenueVillage, "assetCls":assetCls, "assetCat":assetCat};
                         }
                       }

                     json = {"zone":zone, "district":district, "block":block, "gramPanchayat":gramPanchayat, "revenueVillage":revenueVillage, "assetCls":assetCls, "assetCat":assetCat};
                 }
             }
                var txtgeom;
                var image = new ol.style.Circle({
                  radius: 5,
                  fill: null,
                  stroke: new ol.style.Stroke({ color: 'red', width: 1 })
                });
//var image = new ol.style.Style({
//            image: new ol.style.Icon({
//                    scale:1, anchor:[0.5,1],
//                    src:'images/image_icon.png'
//                   })
//        });
//                var styles = {
//                  'Point': new ol.style.Style({
//                    image: image
//                  }),
//                  'LineString': new ol.style.Style({
//                    stroke: new ol.style.Stroke({
//                      color: 'green',
//                      width: 1
//                    })
//                  }),
//                  'MultiLineString': new ol.style.Style({
//                    stroke: new ol.style.Stroke({
//                      color: 'green',
//                      width: 1
//                    })
//                  }),
//                  'MultiPoint': new ol.style.Style({
//                    image: image
//                  }),
//                  'MultiPolygon': new ol.style.Style({
//                    stroke: new ol.style.Stroke({
//                      color: 'yellow',
//                      width: 1
//                    }),
//                    fill: new ol.style.Fill({
//                      color: 'rgba(255, 255, 0, 0.1)'
//                    })
//                  }),
//                  'Polygon': new ol.style.Style({
//                    stroke: new ol.style.Stroke({
//                      color: 'blue',
//                      lineDash: [4],
//                      width: 3
//                    })
//
//                  }),
//                  'GeometryCollection': new ol.style.Style({
//                    stroke: new ol.style.Stroke({
//                      color: 'magenta',
//                      width: 2
//                    }),
//                    fill: new ol.style.Fill({
//                      color: 'magenta'
//                    }),
//                    image: new ol.style.Circle({
//                      radius: 10,
//                      fill: null,
//                      stroke: new ol.style.Stroke({
//                        color: 'magenta'
//                      })
//                    })
//                  }),
//                  'Circle': new ol.style.Style({
//                    stroke: new ol.style.Stroke({
//                      color: 'red',
//                      width: 2
//                    }),
//                    fill: new ol.style.Fill({
//                      color: 'rgba(255,0,0,0.2)'
//                    })
//                  })
//                };

                 $.ajax({
                     url: service_url +'/getAssetSearchList/' + deptId,
                     type:'POST',
                     dataType: 'json',
                     contentType:'application/json',
                     data:JSON.stringify(json),
                     success: function(response){
                     console.log(response)
                     //var dataObj = response.post;
                         var dataimage="";
                       // var vectorSourceGraphics = new ol.source.Vector();
                            var txtgeom="";
                                vectorSourcepolygon2.clear();
                               $('#assetCount').text("Asset Count:" + response.post.length);
                               if(response.post.length>0){
                                for(i = 0; i < response.post.length; i++)
                                   {
                                     console.log(response.post[i].assetName)
                                     console.log(response.post[i].assetId)

                                     txtgeom = JSON.parse(response.post[i].geojson)
                                     console.log(txtgeom)
                                     console.log(global_image_url)


                                       if(txtgeom.type!="GeometryCollection")
                                       {

                                         maputils.polygononmap2(vectorSourcepolygon2,txtgeom.coordinates,txtgeom.type,response.post,response.post[i], response.post[i].assetId,dataimage)
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


                        }
                 });



});

$(".myButton").click(function () {

    // Set the effect type
    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = { direction: "Right" };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    $('#myDiv').toggle(effect, options, duration);
});

 $(".open-call").on("click", function (e) {
//  $("#clicktest").removeClass("tooglebutton");
    e.preventDefault();
//    $("#clicktest").addClass("tooglebutton");
    $("#wrap").animate({ width: "toggle" }, 700);
    $(".open-call").toggleClass("opened closed");

  });
  $(".close-call").click(function () {
    $("#wrap").hide({ width: "toggle" }, 700);
    $("#clicktest").removeClass("tooglebutton");
  });


   $(".open-call2").on("click", function (e) {
//    $( "#table_data" ).show();
//    $("#clicktest2").removeClass("tooglebutton");
      e.preventDefault();
//      $("#clicktest2").addClass("tooglebutton");
      $("#wrap2").animate({ width: "toggle" }, 700);
      $(".open-call2").toggleClass("opened closed");

    });
    $(".close-call2").click(function () {
//      $( "#table_data" ).hide();
      $("#wrap2").hide({ width: "toggle" }, 700);
//      $("#clicktest2").removeClass("tooglebutton");
    });
    //wb ana
    $(".open-call4").on("click", function (e) {
    //    $( "#table_data" ).show();
    //    $("#clicktest2").removeClass("tooglebutton");
          e.preventDefault();
    //      $("#clicktest2").addClass("tooglebutton");
          $("#wrap3").animate({ width: "toggle" }, 700);
          $(".open-call4").toggleClass("opened closed");

        });
        $(".close-call4").click(function () {
    //      $( "#table_data" ).hide();
          $("#wrap3").hide({ width: "toggle" }, 700);
    //      $("#clicktest2").removeClass("tooglebutton");
        });

$(".open-call3").on("click", function (e) {
  //clear all
 	document.getElementById('map2').style.height='100%';
         document.getElementById('table_data').style.height='0%';
     	olMap.updateSize();
     	$('#table').empty();
     	//$('#table1').empty();
     	if (geojson) {geojson.getSource().clear(); olMap.removeLayer(geojson);}
     	if (featureOverlay) {featureOverlay.getSource().clear(); olMap.removeLayer(featureOverlay);}


 //    		map.un('singleclick', getinfo);
     	//overlay.setPosition(undefined);
          //   closer.blur();

     olMap.un('click', highlight);


    });
$(".open-call5").on("click", function (e) {
    //    $( "#table_data" ).show();
    //    $("#clicktest2").removeClass("tooglebutton");
          e.preventDefault();
    //      $("#clicktest2").addClass("tooglebutton");
          $("#wrap4").animate({ width: "toggle" }, 700);
          $(".open-call5").toggleClass("opened closed");

        });
        $(".close-call5").click(function () {
    //      $( "#table_data" ).hide();
          $("#wrap4").hide({ width: "toggle" }, 700);
    //      $("#clicktest2").removeClass("tooglebutton");
        });
        $(".open-call8").on("click", function (e) {
            //    $( "#table_data" ).show();
            //    $("#clicktest2").removeClass("tooglebutton");
                  e.preventDefault();
            //      $("#clicktest2").addClass("tooglebutton");
                  $("#wrap5").animate({ width: "toggle" }, 700);
                  $(".open-call8").toggleClass("opened closed");

                });
                $(".close-call8").click(function () {
            //      $( "#table_data" ).hide();
                  $("#wrap5").hide({ width: "toggle" }, 700);
            //      $("#clicktest2").removeClass("tooglebutton");
                });
olMap.getView().on('change:resolution', function (evt) {
            var resolution = evt.target.get('resolution');
            var units = olMap.getView().getProjection().getUnits();
            var dpi = 25.4 / 0.28;
            var mpu = ol.proj.METERS_PER_UNIT[units];
            var scale = Math.trunc(resolution * mpu * 39.37 * dpi);

//            if (scale >= 9500 && scale <= 950000) {
//                scale = Math.round(scale / 1000) + "K";
//            } else if (scale >= 950000) {
//                scale = Math.round(scale / 1000000) + "M";
//            } else {
//                scale = Math.round(scale);
//            }
            document.getElementById('scale').innerHTML = "Scale = 1 : " + scale;
        });




//controls
    return {olMap,ofaris_notified_jetty_limit,state_bnd_4k,wmslayerwaterbody,ofaris_oiipcra_mip,ofaris_gcf,ofaris_multi_cyclone,ofaris_fish_landing_center,ofaris_village_boundary,wmslayer_soiltexture,layerlist,googleLayerSatellite,googleLayerRoadmap,basemap}
    const buttonmaplayerpanel = $('#maplayer')
    const mapswitcherlayer = $('#mySwitcher2')
    const buttonmapareapanel = $('#mapareaslection')
        const buttonmaplayerpanelcontrol = new ol.control.Control({
             		element: buttonmaplayerpanel[0]
          	})
          	const mapswitcherlayercontrol = new ol.control.Control({
                         		element: mapswitcherlayer[0]
                      	})
          	 const buttonmapareapanelcontrol = new ol.control.Control({
                     		element: buttonmapareapanel[0]
                  	})

       mapapi.olMap.addControl(buttonmaplayerpanelcontrol)
       mapapi.olMap.addControl(buttonmapareapanelcontrol)
       mapapi.olMap.addControl(mapswitcherlayercontrol)
})(jQuery)

