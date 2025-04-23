var table;
var tableColumn;
$(document).ready(function () {
    var deptId = localStorage.getItem("deptId");
    var authorityId = parseInt(localStorage.getItem("authorityId"));
    var authorityArea = localStorage.getItem("authorityArea");
    var authorisedClass = localStorage.getItem("authorisedClass");
    $("#includeNav").load("header.html");
    $("#includefooter").load("footer.html");
    $("#sidebar-nav").load("leftsidebar.html");
    tableColumn = [
                    { title : "District", data:"district_name"},
                    { title : "Block", data:"block_name"},
                    { title : "Gram Panchayat", data:"grampanchayat_name"},
                    { title : "Water Body Type", data:"classification_4"},
                    { title : "Area Ac", data:"area_ac"}

                  ];

    table = $("#waterbodylist").DataTable({
                columns : tableColumn
            });

});


    $.ajax({
        type: "GET",
        url: service_url + '/getState',
        dataType: 'json',
        success: function (Result) {
            $.each(Result.post, function (key, value) {
                $("#ddlState").append($("<option></option>").val(value.stateCode).html(value.stateName));
            });
        },
        error: function (Result) {
        }
    });

    $.ajax({
        type: "GET",
        url: service_url + '/getZone',
        dataType: 'json',
        success: function (Result) {
            $("#zone").empty();
            $("#zone").append($("<option></option>").val("0").html("-- Select Zone --"));
            $.each(Result.post, function (key, value) {
                $("#zone").append($("<option></option>").val(value.zoneId).html(value.zoneName));
            });
        },
        error: function (Result) {
        }
    });

    function zoneOnchange(){
        var zoneId=$("#zone option:selected").val();
        $.ajax({
            type: "GET",
            url: service_url + '/getDistrictByZoneId/' + zoneId,
            contentType:"application/json",
            dataType: 'json',
            success: function (Result) {
                $("#district").empty();
                $("#district").append($("<option></option>").val("0").html("-- Select District --"));
                $("#block").empty();
                $("#block").append($("<option></option>").val("0").html('-- Select Block --'));
                $("#gramPanchayat").empty();
                $("#gramPanchayat").append($("<option></option>").val("0").html('-- Select Gram Panchayat --'));
                $.each(Result.post, function (key, value) {
                    $("#district").append($("<option></option>").val(value.districtId).html(value.districtName));
                });
            },
            error: function (Result) {
            }
        });
    }

    function districtOnchange(){
        var distId=$("#district option:selected").val();
        $.ajax({
            url: service_url +'/getBlockByDistId/'+distId,
            dataType: 'json',
            success: function(response){
                $("#block").empty();
                $("#block").append($("<option></option>").val("0").html('-- Select Block --'));
                $("#gramPanchayat").empty();
                $("#gramPanchayat").append($("<option></option>").val("0").html('-- Select Gram Panchayat --'));
                $.each(response.post, function (key, value) {
                    $("#block").append($("<option></option>").val(value.blockId).html(value.blockName));
                });
            },
            error: function (Result) {
           }
        });
    }

    function blockOnchange(){
        var blockId=$("#block option:selected").val();
        $.ajax({
            url: service_url +'/getGpByBlockId/'+blockId,
            dataType: 'json',
            success: function(response){
                $("#gramPanchayat").empty();
                $("#gramPanchayat").append($("<option></option>").val("0").html('-- Select Gram Panchayat --'));
                $.each(response.post, function (key, value) {
                    $("#gramPanchayat").append($("<option></option>").val(value.gpId).html(value.grampanchayatName));
                });
            }
        });
    }

    $("#btnSearch").click(function(){
        table.clear().draw();
        var zone = parseInt($("#zone").val());
        var district = parseInt($("#district").val());
        var block = parseInt($("#block").val());
        var gramPanchayat = parseInt($("#gramPanchayat").val());
        var operator = $("#area option:selected").val();
        var value = parseFloat($("#value").val());

        if(isNaN(value)){
            value = 0 ;
        }

        var json_waterBody = {
                                "zone":zone,
                                "district":district,
                                "block":block,
                                "gramPanchayat":gramPanchayat,
                                "operator":operator,
                                "value":value
                              }

        if(zone != 0 && district != 0 && block != 0){
            if(operator != "0"  && value == 0){
                Swal.fire({
                    text: 'Please select the Area value',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            }
            else if(operator == "0"  && value != 0){
                 Swal.fire({
                     text: 'Please select the Operator',
                     icon: 'warning',
                     confirmButtonText: 'OK'
                 })
            }
            else{
                $.ajax({
                    url: service_url + '/waterbodysearchlist',
                    type:'POST',
                     dataType: 'json',
                     contentType:'application/json',
                     data:JSON.stringify(json_waterBody),
                     beforeSend: function() {
                         $('.loading').css('display','block');
                     },
                     success: function(response){
                        //console.log(response)
                        if(response.status != 0){
                            if(table === undefined){
                                table = $('#waterbodylist').dataTable({
                                    data: response.post[0],
                                    columns : tableColumn
                                });
                            }
                            else{
                                table.clear();
                                table.rows.add(response.post[0]).draw();
                            }
                        }
                        else{
                            table.clear().draw();
                        }
                    },
                    complete: function() {
                        $('.loading').css('display','none');
                    }
                });
            }
        }
        else{
            Swal.fire({
                text: 'Selecting Upto Block is Mandatory',
                icon: 'warning',
                confirmButtonText: 'OK'
            })
        }
    });
//
//var t = window.location.href.split("&")
//undefined
//t[0].substr(t[0].length-1,1)

    function viewOnMap(zone,district,block,gramPanchayat,operator,value){
        var zone = parseInt($("#zone option:selected").val());
        var district = parseInt($("#district option:selected").val());
        var block = parseInt($("#block option:selected").val());
        var gramPanchayat = parseInt($("#gramPanchayat option:selected").val());
        var operator = $("#area option:selected").val();
        var value = parseFloat($("#value").val());

        //window.location ='map.html?'+btoa('zone=' + zone + "&district=" + district + "&block=" + block + "&gramPanchayat=" + gramPanchayat);
        if(zone != 0 && district != 0 && block != 0){
           if(operator != "0"  && value == 0){
                 Swal.fire({
                     text: 'Please select the value',
                     icon: 'warning',
                     confirmButtonText: 'OK'
                 })
            }
            else{
                window.location ='map.html?zone=' + zone + "&district=" + district + "&block=" + block + "&gramPanchayat=" + gramPanchayat
                 + "&operator="+ operator + "&value=" +value;
            }
        }
        else{
            Swal.fire({
                text: 'Selecting Upto Block is Mandatory',
                icon: 'warning',
                confirmButtonText: 'OK'
            })
        }

    }





