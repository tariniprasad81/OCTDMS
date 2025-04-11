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

        function BindChart(flag){
            var stateSeries = [{}];
            var stateSeriesData = [{}];
            var districtSeries = [];
            var districtSeriesData = [];
            var options =  {
                           chart: {
                             type: 'bar'
                           },
                           title: {
                             text: 'Asset Summary'
                           },
                           accessibility: {
                             announceNewData: {
                               enabled: true
                             }
                           },
                           xAxis: {
                                type: 'category',
                             labels: {
                                     rotation: -30,
                                     overflow:"justify",
                                     style:{
                                         color:"#666666",
                                         fontSize:"7px"
                                     }
                                 }
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
                                    name: flag ,
                                    colorByPoint: true,
                                    data: stateSeriesData
                                  },
            };


            // Create the chart
            $.ajax({
                url: service_url + '/getArdCenSusStats',
                type: 'POST',
                data: JSON.stringify({"flag":flag}),
                dataType: 'json',
                contentType: 'application/json',
                success: function(res){
                    if(flag == "state"){
                        $.each(res.post[0], function(key,value) {
                            key = key.toUpperCase().replaceAll("_"," ");
                            if(key!='districtName'){
                                stateSeriesData.push({
                                    name: key.toUpperCase(),
                                    y: value,
                                    drilldown: key.toUpperCase(),
                                    id: key.toUpperCase(),
                                    value: key.toUpperCase().replace("_"," ")
                                });
                            }
                        });
                        stateSeries.push({
                            name: "State ",
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

            var district = [];

            var agricultureAndBreedingBuffalo = [];
            var agricultureAndBreedingCattle = [];
            var bulluckCartFarmOperationBuffalo = [];
            var bulluckCartFarmOperationCattle = [];
            var dryBuffalo = [];
            var dryCattle = [];
            var dryGoat = [];
            var inMilkBuffalo = [];
            var inMilkCattle = [];
            var inMilkGoat = [];
            var noOfHorse = [];
            var notCalvedOnceBuffalo = [];
            var notCalvedOnceCattle = [];
            var notCalvedOnceGoat = [];
            var oneToThreeYears = [];
            var oneToTwoAndHalfYears = [];
            var oneYearAndAboveMaleGoat = [];
            var oneYearAndAboveSheep = [];
            var othersFemaleBuffalo = [];
            var othersFemaleCattle = [];
            var othersMaleBuffalo = [];
            var othersMaleCattle = [];
            var sixMonthsAndAbovePig = [];
            var totalDucks = [];
            var totalFowls = [];
            var totalOther = [];
            var totalTurkey = [];
            var underOneYearBuffalo = [];
            var underOneYearCattle = [];
            var underOneYearFemaleGoat = [];
            var underOneYearMaleGoat = [];
            var underSixMonthsPig = [];
            var upToOneAndHalfYearsCattle = [];
            var upToOneYearSheep = [];
            var upToTwoYearsBuffalo = [];
            var usedForAgricultureOnlyBuffalo = [];
            var usedForAgricultureOnlyCattle = [];
            var usedForBreedingOnlyBuffalo = [];
            var usedForBreedingOnlyCattle = [];

            $.ajax({
                url: service_url + '/getArdCenSusStats',
                type: 'POST',
                data: JSON.stringify({"flag":"district"}),
                dataType: 'json',
                contentType: 'application/json',
                success: function(response){
                    $.each(response.post, function(i,val) {
                        $.each(val, function(key,value) {
                            //key = key.toUpperCase().replaceAll("_"," ");
                            if(key!='district_name'){
                                if(key=='agriculture_and_breeding_buffalo')
                                    agricultureAndBreedingBuffalo.push(value);
                                else if(key=='agriculture_and_breeding_cattle')
                                    agricultureAndBreedingCattle.push(value);
                                else if(key=='bulluck_cart_farm_operation_buffalo')
                                    bulluckCartFarmOperationBuffalo.push(value);
                                else if(key=='bulluck_cart_farm_operation_cattle')
                                    bulluckCartFarmOperationCattle.push(value);
                                else if(key=='dry_buffalo')
                                    dryBuffalo.push(value);
                                else if(key=='dry_cattle')
                                    dryCattle.push(value);
                                else if(key=='dry_goat')
                                    dryGoat.push(value);
                                else if(key=='in_milk_buffalo')
                                    inMilkBuffalo.push(value);
                                else if(key=='in_milk_cattle')
                                    inMilkCattle.push(value);
                                else if(key=='in_milk_goat')
                                    inMilkGoat.push(value);
                                else if(key=='no_of_horse')
                                    noOfHorse.push(value);
                                else if(key=='not_calved_once_buffalo')
                                    notCalvedOnceBuffalo.push(value);
                                else if(key=='not_calved_once_cattle')
                                    notCalvedOnceCattle.push(value);
                                else if(key=='not_calved_once_goat')
                                    notCalvedOnceGoat.push(value);
                                else if(key=='one_to_three_years')
                                    oneToThreeYears.push(value);
                                else if(key=='one_to_two_and_half_years')
                                    oneToTwoAndHalfYears.push(value);
                                else if(key=='one_year_and_above_male_goat')
                                    oneYearAndAboveMaleGoat.push(value);
                                else if(key=='one_year_and_above_sheep')
                                    oneYearAndAboveSheep.push(value);
                                else if(key=='others_female_buffalo')
                                    othersFemaleBuffalo.push(value);
                                else if(key=='others_female_cattle')
                                    othersFemaleCattle.push(value);
                                else if(key=='others_male_buffalo')
                                    othersMaleBuffalo.push(value);
                                else if(key=='others_male_cattle')
                                    othersMaleCattle.push(value);
                                else if(key=='six_months_and_above_pig')
                                    sixMonthsAndAbovePig.push(value);
                                else if(key=='total_ducks')
                                    totalDucks.push(value);
                                else if(key=='total_fowls')
                                    totalFowls.push(value);
                                else if(key=='total_other')
                                    totalOther.push(value);
                                else if(key=='total_turkey')
                                    totalTurkey.push(value);
                                else if(key=='under_one_year_buffalo')
                                    underOneYearBuffalo.push(value);
                                else if(key=='under_one_year_cattle')
                                    underOneYearCattle.push(value);
                                else if(key=='under_one_year_female_goat')
                                    underOneYearFemaleGoat.push(value);
                                else if(key=='under_one_year_male_goat')
                                    underOneYearMaleGoat.push(value);
                                else if(key=='under_six_months_pig')
                                    underSixMonthsPig.push(value);
                                else if(key=='upto_one_and_half_years_cattle')
                                    upToOneAndHalfYearsCattle.push(value);
                                else if(key=='upto_one_year_sheep')
                                    upToOneYearSheep.push(value);
                                else if(key=='upto_two_years_buffalo')
                                    upToTwoYearsBuffalo.push(value);
                                else if(key=='used_for_agriculture_only_buffalo')
                                    usedForAgricultureOnlyBuffalo.push(value);
                                else if(key=='used_for_agriculture_only_cattle')
                                    usedForAgricultureOnlyCattle.push(value);
                                else if(key=='used_for_breeding_only_buffalo')
                                    usedForBreedingOnlyBuffalo.push(value);
                                else if(key=='used_for_breeding_only_cattle')
                                    usedForBreedingOnlyCattle.push(value);
                            }
                            else{
                                district.push(value);
                            }
                        });
                    });
                    $.each(response.post[0], function(key,value){
                        //key = key.toUpperCase().replaceAll("_"," ");
                        if(key!='district_name'){
                            if(key=='agriculture_and_breeding_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: agricultureAndBreedingBuffalo
                                });
                            }
                            else if(key=='agriculture_and_breeding_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: agricultureAndBreedingCattle
                                });
                            }
                            else if(key=='bulluck_cart_farm_operation_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: bulluckCartFarmOperationBuffalo
                                });
                            }
                            else if(key=='bulluck_cart_farm_operation_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: bulluckCartFarmOperationCattle
                                });
                            }
                            else if(key=='dry_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: dryBuffalo
                                });
                            }
                            else if(key=='dry_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: dryCattle
                                });
                            }
                            else if(key=='dry_goat'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: dryGoat
                                });
                            }
                            else if(key=='in_milk_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: inMilkBuffalo
                                });
                            }
                            else if(key=='in_milk_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: inMilkCattle
                                });
                            }
                            else if(key=='in_milk_goat'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: inMilkGoat
                                });
                            }
                            else if(key=='no_of_horse'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: noOfHorse
                                });
                            }
                            else if(key=='not_calved_once_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: notCalvedOnceBuffalo
                                });
                            }
                            else if(key=='not_calved_once_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: notCalvedOnceCattle
                                });
                            }
                            else if(key=='not_calved_once_goat'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: notCalvedOnceGoat
                                });
                            }
                            else if(key=='one_to_three_years'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: oneToThreeYears
                                });
                            }
                            else if(key=='one_to_two_and_half_years'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: oneToTwoAndHalfYears
                                });
                            }
                            else if(key=='one_year_and_above_male_goat'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: oneYearAndAboveMaleGoat
                                });
                            }
                            else if(key=='one_year_and_above_sheep'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: oneYearAndAboveSheep
                                });
                            }
                            else if(key=='others_female_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: othersFemaleBuffalo
                                });
                            }
                            else if(key=='others_female_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: othersFemaleCattle
                                });
                            }
                            else if(key=='others_male_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: othersMaleBuffalo
                                });
                            }
                            else if(key=='others_male_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: othersMaleCattle
                                });
                            }
                            else if(key=='six_months_and_above_pig'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: sixMonthsAndAbovePig
                                });
                            }
                            else if(key=='total_ducks'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: totalDucks
                                });
                            }
                            else if(key=='total_fowls'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: totalFowls
                                });
                            }
                            else if(key=='total_other'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: totalOther
                                });
                            }
                            else if(key=='total_turkey'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: totalTurkey
                                });
                            }
                            else if(key=='under_one_year_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: underOneYearBuffalo
                                });
                            }
                            else if(key=='under_one_year_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: underOneYearCattle
                                });
                            }
                            else if(key=='under_one_year_female_goat'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: underOneYearFemaleGoat
                                });
                            }
                            else if(key=='under_one_year_male_goat'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: underOneYearMaleGoat
                                });
                            }
                            else if(key=='under_six_months_pig'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: underSixMonthsPig
                                });
                            }
                            else if(key=='upto_one_and_half_years_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: upToOneAndHalfYearsCattle
                                });
                            }
                            else if(key=='upto_one_year_sheep'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: upToOneYearSheep
                                });
                            }
                            else if(key=='upto_two_years_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: upToTwoYearsBuffalo
                                });
                            }
                            else if(key=='used_for_agriculture_only_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: usedForAgricultureOnlyBuffalo
                                });
                            }
                            else if(key=='used_for_agriculture_only_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: usedForAgricultureOnlyCattle
                                });
                            }
                            else if(key=='used_for_breeding_only_buffalo'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: usedForBreedingOnlyBuffalo
                                });
                            }
                            else if(key=='used_for_breeding_only_cattle'){
                                districtSeriesData.push({
                                    name: key.toUpperCase(),
                                    data: usedForBreedingOnlyCattle
                                });
                            }
                        }
                    });
                    //districtSeries.push({
                    //     name: "District",
                    //     colorByPoint: true,
                    //     data: districtSeriesData
                    //});

                    console.log(districtSeries);
                    var options2 =  {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'State'
                        },
                        accessibility: {
                            announceNewData: {
                                enabled: true
                            }
                        },
                        xAxis: {
                            categories: district
                        },
                        yAxis: {
                            min:0,
                        title: {
                            text: 'Total Count'
                            }
                        },
                        legend: {
                            reversed: true
                        },
                        plotOptions: {
                            series: {
                                stacking: 'normal'
                            }
                            // dataLabels: {
                            //   enabled: true,
                            //   format: '{point.y}'
                            // }
                        },
                            // tooltip: {
                            //   headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                            //   pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                            // },
                            series: []
                            //{
                            //   name: flag ,
                            //   colorByPoint: true,
                            //   data: stateSeriesData
                            //},
                    };
                    options2.series = districtSeriesData;
                    options2.title = {text:"District"};
                    var chart = new Highcharts.chart('container3',options2);
                }
            });
        }
        BindChart("state");
    }
    else{
        window.location = "errorPage.html";
    }
});