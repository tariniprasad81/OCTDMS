$(document).ready(function () {
    var menuId = JSON.parse(localStorage.getItem("menuId"))
    var currentURL = window.location.pathname
    var successflag=false;
    menuId.forEach((singleMenu) => {
        if(singleMenu.targetUrl == currentURL){
            successflag=true
        }
    });
    if(successflag){

        $("#includeNav").load("header.html");
        $("#includefooter").load("footer.html");
        $("#sidebar-nav").load("leftsidebar.html");

        $.ajax({
            url: service_url + '/inlandcount',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(d) {
                $("#inlandTank").html(d.post[0].inland[0].tanks);
                $("#inlandLakesPonds").html(d.post[0].inland[0].lakesponds);
                $("#inlandReservoir").html(d.post[0].inland[0].reservoir);
                $("#bwaquaculturepond").html(d.post[0].inland[0].aquaculturepond);
                $("#marineport").html(d.post[0].marineandothercount[0].port);
                $("#marinejetty").html(d.post[0].marineandothercount[0].jetty);
                $("#marineflc").html(d.post[0].marineandothercount[0].flc);
                $("#otherCycloneshelter").html(d.post[0].marineandothercount[0].cycloneshelter);
            },
            error: function() {
                alert('Error!');
            }
        });


        function BindChart(category,id,flag){
            var stateSeries = [{}];
            var stateSeriesData = [{}];
            var zoneSeries = [];
            var zoneSeriesData = [];
            var districtSeries = [];
            var districtSeriesData = [];
            var options =  {
                               chart: {
                                 type: 'column'
                               },
                               title: {
                                 text: 'Asset Summary'
                               },
                             <!--  subtitle: {-->
                             <!--    text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'-->
                             <!--  },-->
                               accessibility: {
                                 announceNewData: {
                                   enabled: true
                                 }
                               },
                               xAxis: {
                                 type: 'category'
                               },
                               yAxis: {
                                 title: {
                                   text: 'Total Count'
                                 }

                               },
                               legend: {
                                 enabled: false
                               },
                               plotOptions: {
                                 series: {
                                   borderWidth: 0,
                                   point:{
                                      events:{
                                          click:function(e){
                                              console.log(this.value);
                                              stateSeriesData = [];
                                              stateSeries = [];
                                              drilldown = [];
                                              if(flag == "state")
                                                  BindChart(this.value.toLowerCase(),"0","zone");
                                              else if(flag == "zone")
                                                  BindChart(category,this.id,"district");
                                          }
                                      }
                                   },
                                   dataLabels: {
                                     enabled: true,
                                     format: '{point.y}'
                                   }
                                 }
                               },

                               tooltip: {
                                 headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                 pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                               },

                               series: {
                                        name: flag + " " + category,
                                        colorByPoint: true,
                                        data: stateSeriesData
                                      },
                      //                 drilldown: {
                      //                    series: drilldown,
                      //                    colorByPoint: true
                      //                 }
                                 };
                               // Create the chart
                                $.ajax({
                                    url: service_url + '/getStats',
                                    type: 'POST',
                                    data: JSON.stringify({"category":category,"id":id+"","flag":flag}),
                                    dataType: 'json',
                                    contentType: 'application/json',
                                    success: function(res){
                                        if(flag == "state"){
                                            $.each(res.post[0], function(key,value) {
                                                console.log(key+':'+value);
                                                stateSeriesData.push({
                                                   name: key.toUpperCase(),
                                                   y: value[0].count,
                                                   drilldown: key.toUpperCase(),
                                                   id: key.toUpperCase(),
                                                   value: key.toUpperCase()
                                                 });
                                            });
                                            stateSeries.push({
                                                name: "State " + category,
                                                colorByPoint: true,
                                                data: stateSeriesData
                                            });
                                            //chart.addSeries(stateSeries);
                                            //chart.series[0].update({data:stateSeriesData},false);
                                            //chart.redraw();
                                        }
                                        else if(flag == "zone"){
                                            $.each(res.post, function(key,value) {
                                                console.log(key+':'+value);
                                                stateSeriesData.push({
                                                    name: value.zoneName.toUpperCase(),
                                                    y: value.count,
                                                    //drilldown: key.toUpperCase(),
                                                    id: value.zoneId,
                                                    value: value.zoneName.toUpperCase()
                                                });
                                            });
                                            stateSeries.push({
                                                name: "Zone " + category,
                                                colorByPoint: true,
                                                data: stateSeriesData
                                            });
                                        }
                                        else if(flag == "district"){
                                            $.each(res.post, function(key,value) {
                                                console.log(key+':'+value);
                                                stateSeriesData.push({
                                                    name: value.districtName.toUpperCase(),
                                                    y: value.count,
                                                    //drilldown: key.toUpperCase(),
                                                    id: value.distId,
                                                    value: value.districtName.toUpperCase()
                                                });
                                            });
                                            stateSeries.push({
                                                name: "District " + category,
                                                colorByPoint: true,
                                                data: stateSeriesData
                                            });
                                        }
                                        options.series = stateSeries;
                                        if(flag=="state")
                                            options.title = {text:"State"};
                                        else if(flag=="zone")
                                            options.title = {text:"Zone"};
                                        else if(flag=="district")
                                            options.title = {text:"District"};
                                        var chart = new Highcharts.chart('container2',options);
                                    }
                                });
        }
        BindChart("state","0","state");
    }
    else{
        window.location = "errorPage.html";
    }
});