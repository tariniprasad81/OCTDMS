jQuery(function($){

    var KLcompass = (function(Control){
        function KLcompass(opt_options) {
            var options = opt_options || {};

            Control.call(this, {
                element: $('#KLDirectionCompas')[0],
                target: options.target,
              });
        }
        if ( Control ) KLcompass.__proto__ = Control;
        KLcompass.prototype = Object.create( Control && Control.prototype );
        KLcompass.prototype.constructor = KLcompass;

        return KLcompass;
    })(ol.control.Control)
    mapapi.olMap.addControl(new KLcompass())

//    var KLmapMenu = (function(Control){
//        function KLmapMenu(opt_options) {
//            var options = opt_options || {};
//
//            Control.call(this, {
//                element: $('#KLmapMenu')[0],
//                target: options.target,
//              });
//        }
//        if ( Control ) KLmapMenu.__proto__ = Control;
//        KLmapMenu.prototype = Object.create( Control && Control.prototype );
//        KLmapMenu.prototype.constructor = KLmapMenu;
//
//        return KLmapMenu;
//    })(ol.control.Control)
//    mapapi.olMap.addControl(new KLmapMenu())



    var current_tab = null

    $('.tooltab-btn').each(function(){
        let mth = $(this)
        let border = mth.is('.topmenubar') ? 'border-bottom' : 'border-top'

        mth.find('.col').each(function(){
            let th = $(this)
            let a = th.find('a')
            a.on('click', function(){
                let a = $(this)
                if(current_tab === a.data('mytab')){ // close
                    mth.find('.col').removeClass(border)
                    $('.tooltab-tab').addClass('d-none')
                    current_tab = null
                } else {
                    mth.find('.col').addClass(border)
                    th.removeClass(border)
                    current_tab = a.data('mytab')
                    $('.tooltab-tab').addClass('d-none')
                    $(current_tab).removeClass('d-none')
                }
            })
        })
    })

    mapapi.olMap.on('click', function (evt) {
        if(current_tab != null){
            current_tab = null
            $('.tooltab-tab').addClass('d-none')
            $('.tooltab-btn .col').removeClass('border-bottom').removeClass('border-top')
        }
    })

    var group = mapapi.olMap.getLayerGroup()
    var layer_menu  = $('#view_pop')
    var colapsable = layer_menu.find('.mycolapsable');

    var layerData = function(group, index){
        index = index || ''
        let ret = $('<ul />')
        group.getLayers().forEach(function(layer, i){
            let prop = layer.getProperties()
            let indexid = index + '' + i
            let nametitle = prop.title || prop.name
            let li = $('<li />')
            let content = $('<div class="row" />')
            let form = $('<div class="col form-group form-check" />')
            let label = $('<label class="form-check-label" />')
            let input = $('<input type="checkbox" class="form-check-input" />')
            content.append('<div class="col-auto expander"><i class="fa fa-plus" aria-hidden="true"></i><i class="fa fa-minus" aria-hidden="true"></i></div>')
            label.text(nametitle).attr('for', indexid)
            input.prop('checked', layer.getVisible())
            form.append(input).append(label)
            content.append(form)
            li.append(content)
            if (layer instanceof ol.layer.Group) {
                li.append(layerData(layer, indexid + '-'))
            } else {
                li.addClass('leaf')
            }
            ret.prepend(li)

            input.attr('id', indexid).on('change', function() {
                console.log('changed', this)

                let state = $(this).is(':checked')
                layer.setVisible(state)
            })

            layer.on('change:visible', function(){
                input.prop('checked', layer.getVisible())
            })


            
        })
        return ret
    }

    colapsable.append(layerData(group))
    let expander = colapsable.find('li:not(.leaf)')
    expander.each(function(){
        let th = $(this)
        th.find('> .row .expander').on('click', () => {
            let expanded = th.is('.open')
            expander.removeClass('open')
            if(!expanded){
                th.addClass('open')
            }
        })

        let eveble = true
        let input = th.find('> .row input:checkbox')
        let inputChilds = th.find('> ul > li > .row input:checkbox')
        input.on('change', function(){
            if(eveble){
                let val = $(this).is(':checked')
                if(val){
                    inputChilds.prop('checked', val)
                    inputChilds.trigger('change')
                }
            }
            eveble = true
        })

        inputChilds.on('change', function(){
            eveble = false
            let val = $(this).is(':checked')
            if(val){
                input.prop('checked', val)
                input.trigger('change')
            }
        })
    })

})



jQuery(function($){
    var sketch
    var measureTooltipElement
    var measureTooltip
    var draw


    var source = new ol.source.Vector()

    var vector = new ol.layer.Vector({
            source: source,
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

        var formatLength = function (line) {
            var length = line.getLength(line);
            var output;
            if (length > 1000) {
              output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
            } else {
              output = Math.round(length * 100) / 100 + ' ' + 'm';
            }
            return output;
        }

        var formatArea = function (polygon) {
            var area = polygon.getArea();
            var output;
            if (area > 1000000) {
              output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
            } else {
              output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
            }
            return output;
        }

        function addInteraction(type) {
            closeInteraction()

            draw = new ol.interaction.Draw({
                source: source,
                type: type,
                style: new ol.style.Style({
                  fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                  }),
                  stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2,
                  }),
                  image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                      color: 'rgba(0, 0, 0, 0.7)',
                    }),
                    fill: new ol.style.Fill({
                      color: 'rgba(255, 255, 255, 0.2)',
                    }),
                  }),
                }),
            });
            mapapi.olMap.addInteraction(draw);

            draw.on('drawstart', function (evt) {
                createTooltip()
                if(sketch){
                    source.removeFeature(sketch)
                    sketch = null
                }
                sketch = evt.feature;
                var tooltipCoord = evt.coordinate;
                sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                      output = formatArea(geom);
                      tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                      output = formatLength(geom);
                    //   tooltipCoord = geom.getLastCoordinate();
                      tooltipCoord = geom.getCoordinateAt(.5);
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                })
            })
        }

        function createTooltip(){
            if(measureTooltip){
                mapapi.olMap.removeOverlay(measureTooltip)
                measureTooltip = null
            }
            if (measureTooltipElement) {
                $(measureTooltipElement).remove();
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, 0],
                positioning: 'center-center',
            })
            mapapi.olMap.addOverlay(measureTooltip);
        }

        function closeInteraction(){
            if(draw){
            //draw.finishDrawing()
                mapapi.olMap.removeInteraction(draw)
                draw = null
            }
            if(sketch){

                source.removeFeature(sketch)
                sketch = null
            }
            if(measureTooltip){
                mapapi.olMap.removeOverlay(measureTooltip)
                measureTooltip = null
            }
        }

        var modify = new ol.interaction.Modify({source: source});
        mapapi.olMap.addLayer(vector)
        mapapi.olMap.addInteraction(modify)

//        $('#areaTool').on('click', function(){
//            addInteraction('Polygon')
//            $('#clearTool').removeClass('d-none')
//        })
        $('#measureArea').on('click', function(){
                    addInteraction('Polygon')
                    $('#clearTool').removeClass('d-none')
                })
        $('#distanceTool').on('click', function(){
            addInteraction('LineString')
            $('#clearTool').removeClass('d-none')
        })
        $('#clearTool').on('click', function(){
            closeInteraction()
            $(this).addClass('d-none')
        })



})