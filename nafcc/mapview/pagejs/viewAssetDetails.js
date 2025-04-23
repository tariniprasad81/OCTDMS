$(document).ready(function () {
    var deptId = localStorage.getItem("deptId");
    var userId = localStorage.getItem("userId");
    var menuId = JSON.parse(localStorage.getItem("menuId"));
    var currentURL = window.location.pathname

        var deptId = parseInt(localStorage.getItem("deptId"));
        var userId = parseInt(localStorage.getItem("userId"));
        var menuId = JSON.parse(localStorage.getItem("menuId"));

    var categoryid;
    var AgencyParameter;
    var assetid;
    var clsCatMappingId;
    var assetListNames=[];
        $(function() {
            var noofyears = 5;
            var thisYear = (new Date()).getFullYear();
            for (var i = 0; i < noofyears; i++) {
            var year = thisYear - i;
            $('<option>', { value: year, text: year }).appendTo("#ddlyear");
            }
        });

        $("#includeNav").load("header.html");
        $("#includefooter").load("footer.html");
        $("#sidebar-nav").load("leftsidebar.html");
        //Getting URL params
        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }

        var urlVal = getUrlVars();
        var assetId = urlVal['id'];

        var asset_body = {
                             "assetId" : assetId,
                             "year" : "",
                             "deptId" : deptId
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
                    $("#assetName").attr("readonly",true);
                    $("#assetCode").attr("readonly",true);
                    $("#stateName").attr("readonly",true);
                    $("#zoneName").attr("readonly",true);
                    $("#deptName").attr("readonly",true);
                    $("#distName").attr("readonly",true);
                    $("#blockName").attr("readonly",true);
                    $("#gpName").attr("readonly",true);
                    $("#villageName").attr("readonly",true);
                    $("#clsName").attr("readonly",true);
                    $("#catName").attr("readonly",true);
                    $("#latitude").attr("readonly",true);
                    $("#longitude").attr("readonly",true);
                    $("#altitude").attr("readonly",true);
                    $("#accuracy").attr("readonly",true);
                    $("#assettagfrom").attr("readonly",true);
                    $("#assetphase").attr("readonly",true);


                    //$("#soil_type").attr("disabled", true);

                    $("#assetName").val(response.post[0].asset_list[0].assetName);
                    $("#assetCode").val(response.post[0].asset_list[0].assetCode);
                    $("#stateName").val(response.post[0].asset_list[0].stateName);
                    $("#zoneName").val(response.post[0].asset_list[0].zoneName);
                    $("#deptName").val(response.post[0].asset_list[0].deptName);
                    $("#distName").val(response.post[0].asset_list[0].districtName);
                    $("#blockName").val(response.post[0].asset_list[0].blockName);
                    $("#gpName").val(response.post[0].asset_list[0].gpName);
                    $("#villageName").val(response.post[0].asset_list[0].villageName);
                    $("#clsName").val(response.post[0].asset_list[0].className);
                    $("#catName").val(response.post[0].asset_list[0].categoryName);
                    $("#desc").val(response.post[0].asset_list[0].description);
                    $("#latitude").val(response.post[0].asset_list[0].latitude);
                    $("#longitude").val(response.post[0].asset_list[0].longitude);
                    $("#altitude").val(response.post[0].asset_list[0].altitude);
                    $("#accuracy").val(response.post[0].asset_list[0].accuracy);
                    $("#assettagfrom").val(response.post[0].asset_list[0].assetTaggedFrom);
                    $("#assetphase").val(response.post[0].asset_list[0].phaseName);

                   if(response.post[0].asset_list[0].surveyorImage!= ""){
                     document.getElementById('surveydiv').style.display="block";
                    $("#surveyorImage").attr("src",global_image_url +'/'+ response.post[0].asset_list[0].assetId + '/' + response.post[0].asset_list[0].surveyorImage );
                    }

             imgdata2=response.post[0].asset_image_list;
             var content1= $("#assetimageDiv");
            if(imgdata2.length==0)
                 {
                 content1.find('.picture-gallery-div3').addClass('d-none')
                 document.getElementById('noimg').style.display="table";
                    document.getElementById('allphoto').style.display="none";

                 }


                   let photocnt4 = Math.min(4, imgdata2.length)
                   if(photocnt4 > 0){
                    $('.picture-gallery3').empty();
                       let pict3 = content1.find('.picture-gallery3')
                       content1.find('.picture-gallery-div3').removeClass('d-none')
                       for(let i = 0; i < photocnt4; i++){
                           let p = global_image_url +'/'+ imgdata2[i].assetId+'/'+ imgdata2[i].imageName
                           pict3.append($('<div class="col-md-2" />').html($('<img class="img-thumbnail image-error"   />').attr('src', p)))
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

                    if(response.post[0].additional_attribute_value[0].length == 0){
                        appendAssetDetailsWithBlankValues(response);
                    }
                    //Condition when the additional attribute value is not zero
                    else{
                        appendAssetDetails(response);
                    }
                    //appendAssetDetails(response);
                }
                else{
                    console.log(response);
                }
            },
            error: function (response) {
            }
        });

        //In this ajax call the year parameter passed based on the year selected and dynamically bind the values
        $("#ddlyear").change(function() {
            $("#dynamicFields").empty();
            $('#species_fish').val("");
            var year = document.getElementById("ddlyear").value;
            var asset_body_by_year = {
                                         "assetId" : assetId,
                                         "year" : year,
                                         "deptId" : deptId
                                     }
            $.ajax({
                url: service_url + '/getAssetViewByAssetId/',
                type:"POST",
                data: JSON.stringify(asset_body_by_year),
                dataType: 'json',
                contentType:'application/json',
                success: function(response){
                    if(response.status != 0){
                        //Condition when the additional attribute value is zero
                        if(response.post[0].additional_attribute_value[0].length == 0){
                            appendAssetDetailsWithBlankValues(response);
                        }
                        //Condition when the additional attribute value is not zero
                        else{
                            appendAssetDetails(response);
                        }
                    }
                    else{
                        console.log(response);
                    }
                },
                error: function (response) {
                }
            });
        });

        //Edit Button onclick changes
        $("#updateAssetData").click(function() {
            $("#cancelUpdateAssetData").css("display","block");
            $("#divEditAsset").hide();
            $("#divSaveEditedAsset").css("display","block");

            assetListNames = assetListNames.filter((item, i, ar) => ar.indexOf(item) === i);

            for(i=0;i<assetListNames.length;i++){
                $("#"+assetListNames[i]).attr('readonly',false);
                $("#"+assetListNames[i]).prop('disabled',false);
                $("#scheme_id").attr('disabled',false);
                $("#ddlyear").attr("disabled", true);
            }

            $("#species_fishes").prop('disabled',false);
            $("#owner_type").change(function() {
                var ownertypevalue= $("#owner_type").val();
                if(ownertypevalue=="ORGANIZATION"){
                    $($('#owner_registration_id').parent().get(0)).hide()
                    $($('#owner_name').parent().get(0)).hide()
                    $($('#ownership').parent().get(0)).show()
                    $($('#organization_id').parent().get(0)).show()
                }
                else if(ownertypevalue == "INDIVIDUAL"){
                    $($('#ownership').parent().get(0)).hide()
                    $($('#organization_id').parent().get(0)).hide()
                    $($('#owner_registration_id').parent().get(0)).show()
                    $($('#owner_name').parent().get(0)).show()
                }
            });
            $("#ownership").change(function() {
                var ownershipvalue=$("#ownership").val();
                if(ownershipvalue == "PRIVATE"){
                    getAgencyByParameter(ownershipvalue);
                }
                else if(ownershipvalue == "GOVERNMENT"){
                    getAgencyByParameter(ownershipvalue);
                }
            });
        });

        //Cancel Button onclick changes
        $("#cancelUpdateAssetData").click(function() {
            $("#cancelUpdateAssetData").css("display","none");
            $("#divEditAsset").show();
            $("#divSaveEditedAsset").css("display","none");
            for(i=0;i<assetListNames.length;i++){
                //console.log(assetListNames[i]);
                $("#"+assetListNames[i]).attr('readonly',true);
                $("#"+assetListNames[i]).prop('disabled',true);
                $("#ddlyear").attr("disabled", false);
            }
            $("#species_fishes").prop('disabled',true);
        });

        //Save button onclick calls Update Service and saves updated data
        $("#divSaveEditedAsset").click(function() {
            Swal.fire({
                title: 'Are You Sure?',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                allowOutsideClick: false
            })
            .then((result) => {
                if (result.dismiss !== 'cancel') {
                    var data = {};
                    data["assetId"]=assetid;
                    data["createdBy"]=userId;
                    data["updatedBy"]=userId;
                    data["clsCatMappingId"]=clsCatMappingId;
                    data["deptId"]=deptId;
                    data["assetName"]=$("#assetName").val();
                    data["year"]=$("#ddlyear").val();

                    for(var i=0; i<asset_attribute_list.length;i++){

                        const CamelCase = str => {
                          let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                                          .reduce((result, word) => result + capitalize(word.toLowerCase()))
                          return string.charAt(0).toLowerCase() + string.slice(1)
                        };

                        const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

                        var attribNameID = asset_attribute_list[i].name;
                        var camelAttributeNameID = CamelCase(attribNameID);
                        var attribName = asset_attribute_list[i].displayName;
                        // var assetId = assetid;
                        if(asset_attribute_list[i].name == "scheme_id" && asset_attribute_list[i].dropdown == true){
                            data[camelAttributeNameID] = parseInt($("#" + asset_attribute_list[i].name + " option:selected").val());
                        }
                        else if(asset_attribute_list[i].name == "organization_id" && asset_attribute_list[i].dropdown == true){
                            data[camelAttributeNameID] = parseInt($("#" + asset_attribute_list[i].name + " option:selected").val());
                        }
                        else if(asset_attribute_list[i].dropdown == true){
                            //console.log(camelAttributeNameID);
                            data[camelAttributeNameID] = $("#" + asset_attribute_list[i].name + " option:selected").val();
                        }
                        else if(asset_attribute_list[i].name == "investment_in_5_yrs" ){
                            data["investmentIn_5Yrs"] = parseFloat($("#" + asset_attribute_list[i].name).val());
                        }
                        else if(asset_attribute_list[i].dataType == 'numeric' && asset_attribute_list[i].dropdown == false && asset_attribute_list[i].name != "investment_in_5_yrs"){
                            data[camelAttributeNameID] = parseFloat($("#" + asset_attribute_list[i].name).val());
                        }
                        else if(asset_attribute_list[i].dataType == 'integer' && asset_attribute_list[i].dropdown == false){
                            data[camelAttributeNameID] = parseInt($("#" + asset_attribute_list[i].name).val());
                        }
                        else if(asset_attribute_list[i].dataType == 'boolean'){
                            data[camelAttributeNameID] = $("#" + asset_attribute_list[i].name).is(":checked");
                        }

                        else{
                            data[camelAttributeNameID] = $("#" + asset_attribute_list[i].name).val();
                        }
                    }

                    var categoryId = categoryid;

                    var assetId = assetid;

                    var year = parseInt($('#ddlyear option:selected').val());

                    var fishSpeciess = $('#species_fishes option:selected').toArray().map(item => item.value).join();

                    var fishspecies = {"fishspecies":fishSpeciess }
                    //console.log(data);
                    var formData = new FormData();
                    formData.append('data', JSON.stringify(data));
                    formData.append('categoryId', JSON.stringify(categoryId));
                    formData.append('assetId', JSON.stringify(assetId));
                    formData.append('year', JSON.stringify(year));
                    formData.append('fishspecies', JSON.stringify(fishspecies));
                    //formData.get(data)
                    //console.log(formData);
                    $.ajax({
                        url: service_url + "/updateAsset",
                        type: "POST",
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        data: formData,
                        success: function(data){
                            //console.log(data);
                             if(data.status == 1){
                                 Swal.fire({
                                        text: 'Successfully Updated!',
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                  })

                                  .then((redirect)=>{
                                      window.location = "viewAssetDetails.html?id=" + assetid ;
                                  })
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

        //Scheme function
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
                        alert('Error!');
                    }
                });
            }
        }

        //Getting all private agency
        function getAgencyPrivate(agencyValue){
            $.ajax({
                url: service_url + '/agencies/' + deptId + '/' + 'PRIVATE',
                type: 'GET',
                dataType: 'json',
                data: {},
                success: function (d) {
                    var ar =d.post[0];
                    var str = '';
                    $.each(ar, function(i, agency){
                        str += '<option value="' + ar[i].agencyId + '"';
                        if(agencyValue == ar[i].agencyId){
                            //str += ar[i].name;
                            str += ' selected="selected"';
                        }
                        str += '>' + ar[i].name + '</option>' ;
                    });
                    //$("#organization_id").val(str);
                    $("#organization_id").append(str);
                },
                error: function () {
                    alert('Error!');
                }
            });
        }

        //Getting all Govt agency
        function getAgencyGovt(){
            $.ajax({
                url: service_url + '/agencies/' + deptId + '/' + 'GOVERNMENT',
                type: 'GET',
                dataType: 'json',
                data: {},
                success: function (d) {
                    var ar =d.post[0];
                    var str = '';
                    $.each(ar, function(i, agency){
                        str += '<option value="' + ar[i].agencyId + '"';
                        if(agencyValue == ar[i].agencyId){
                            //str += ar[i].name;
                            str += ' selected="selected"';
                        }
                        str += '>' + ar[i].name + '</option>' ;
                        });
                    //$("#organization_id").text(str);
                    $("#organization_id").append(str);
                },
                error: function () {
                    alert('Error!');
                }
            });
        }

        //This function is called when the year wise data is available
        function appendAssetDetails(response){
            asset_attribute_list = response.post[0].asset_attribute_list;
            var asset_dropdown_list = response.post[0].asset_dropdown_list;
            var ADDITIONAL_ATTRIBUTE_VALUE = response.post[0].additional_attribute_value[0][0];
            var str = '';
            var fields = {};
            categoryid = response.post[0].asset_list[0].categoryId
            assetid = response.post[0].asset_list[0].assetId
            clsCatMappingId = response.post[0].asset_list[0].clsCatMappingId

            const CamelCase = str => {
              let string = str.toLowerCase().replace(/[^A-Za-z0-9]/g, ' ').split(' ')
                              .reduce((result, word) => result + capitalize(word.toLowerCase()))
              return string.charAt(0).toLowerCase() + string.slice(1)
            };

            const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

            for(var i=0; i<asset_attribute_list.length;i++){

                assetListNames.push(asset_attribute_list[i].name);
                var attribNameID = asset_attribute_list[i].name;
                var camelAttributeNameID = CamelCase(attribNameID);
                var attribName = asset_attribute_list[i].displayName;

                if(asset_attribute_list[i].dataType == 'boolean'){
                    str = '<div class="form-group col-md-6">'+
                        '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '*</b></label>&nbsp;'+
                        '<input type="checkbox"  id="' + attribNameID + '" checked=' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] +
                        ' required autocomplete="off"/>'+
                        '</div>';
                    }
                else if(asset_attribute_list[i].dataType == 'numeric'){
                     str = '<div class="form-group col-md-6">'+
                               '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '*</b></label>&nbsp;'+
                               '<input type="number" class="form-control" id="' + attribNameID + '" value="'+ ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                               '"placeholder="' + attribName + '" required autocomplete="off"/>'+
                           '</div>';
                }
                else if(asset_attribute_list[i].name == "scheme_id" && asset_attribute_list[i].dropdown == true){
                    str = '<div class="form-group col-md-6">'+
                   '<label class="textcase" for="' + asset_attribute_list[i].name + '"><b>' + asset_attribute_list[i].displayName + '</b></label>'+
                   '<select class="form-control" style="background-color:##00AAFF;"'+
                   'id="' + asset_attribute_list[i].name + '" name="' + asset_attribute_list[i].displayName + '"><option value="0">-- Select Scheme --</option></select></div>';
                    var inputfield = $(str);
                    $("#dynamicFields").append(inputfield);
                    schemeCheck = 1;
                    schemeValue = ADDITIONAL_ATTRIBUTE_VALUE["schemeId"];
                    createScheme(schemeCheck,schemeValue);
                }
                else if(asset_attribute_list[i].name == "owner_type" && asset_attribute_list[i].dropdown == true){
                    str = '<div class="form-group col-md-6">'+
                           '<label class="textcase" for="' + asset_attribute_list[i].name + '"><b>' + asset_attribute_list[i].displayName + '</b></label>'+
                           '<select class="form-control" style="background-color:##00AAFF;"'+
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
                    str += '</select></div>';

                }
                else if(asset_attribute_list[i].dropdown){
                    str = '<div class="form-group col-md-6">'+
                            '<label class="textcase" for="' + attribNameID + '"><b>' + attribName + '</b></label>'+
                            '<select class="form-control" style="background-color:##00AAFF;"'+
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
                    str = '<div class="form-group col-md-6">'+
                                '<label class="textcase"  for="' + attribNameID + '"><b>' + attribName + '*</b></label>'+
                                '<input type="text" class="form-control" id="' + attribNameID + '" value="' + ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID]+
                                '"placeholder="' + attribName + '" required autocomplete="off"/>'+
                           '</div>';
                }

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
                        if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === undefined || ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === null){
                            //$("#"+attribNameID).val("0.0");
                            ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] = 0.0;
                        }
                    }
                    else if(asset_attribute_list[i].dataType == 'integer'){
                        if(ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === undefined || ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] === null){
                            //$("#"+attribNameID).val("0");
                            ADDITIONAL_ATTRIBUTE_VALUE[camelAttributeNameID] = 0;
                        }
                    }
                }
                $("#"+attribNameID).attr('readonly',true);
                $("#"+attribNameID).attr('disabled',true);
                $("#desc").attr('readonly',true);
            }
            //Fish Species
            if(response.post[0].asset_list[0].categoryId == 61 || response.post[0].asset_list[0].categoryId == 29){
                fish_species = response.post[0].species_list[0].speciesName;
                var finalSpecies = fish_species.split(',');
                $("#ddlSpeciesMultiselct").css("display","block");
                $('#species_fishes').select2({
                    width: '100%'

                });
                $.ajax({
                    type: "GET",
                    url: service_url + '/getSpeciesByDeptId/' + deptId,
                    dataType : "json",
                    success: function(response){
                        selectspecies = $('#species_fishes');
                        $('#species_fishes').html('');
                        var placeholder = "Select Species";
                        for(i=0;i<response.post[0].length;i++){
                            //selectspecies.append("<option class='ddindent'  value='" + response.post[0][i].speciesId + "'>" + response.post[0][i].speciesName + "</option>");
                            if(finalSpecies.includes(response.post[0][i].speciesName)){
                                selectspecies.append("<option class='ddindent'  value='" + response.post[0][i].speciesId + "' selected >" + response.post[0][i].speciesName + "</option>");
                            }
                            else{
                                selectspecies.append("<option class='ddindent'  value='" + response.post[0][i].speciesId + "' >" + response.post[0][i].speciesName + "</option>");
                            }
                        }
                    }
                });
                var option;
                for(var i=0;i<finalSpecies.length;i++){
                    option+="<option:selected>"+finalSpecies[i]+"</option>";
                }
                $("#species_fish").val(fish_species);
                //$("#species_fish").html(option);
            }

            agencyValue = ADDITIONAL_ATTRIBUTE_VALUE["organizationId"];

            //Here ownerType value is organization owner_registration_id
            if(response.post[0].additional_attribute_value[0][0].ownerType == "ORGANIZATION"){
                $($('#owner_registration_id').parent().get(0)).hide()
                $($('#owner_name').parent().get(0)).hide()
                if(response.post[0].additional_attribute_value[0][0].ownership == "PRIVATE"){
                  getAgencyPrivate(agencyValue);
                }
                else if(response.post[0].additional_attribute_value[0][0].ownership == "GOVERNMENT"){
                    getAgencyGovt(agencyValue);
                }
            }
            else if(response.post[0].additional_attribute_value[0][0].ownerType == "INDIVIDUAL"){
                $($('#ownership').parent().get(0)).hide()
                $($('#organization_id').parent().get(0)).hide()
            }

            $("#noDataFound").css("display","none");
           // $("#ddlSpeciesMultiselct").css("display","block");
            $("#updateAssetData").show();
            //$("#cancelUpdateAssetData").show();

        }

        //This function is called when the year wise data value is empty
        function appendAssetDetailsWithBlankValues(response){
            $("#noDataFound").css("display","block");
            $("#ddlSpeciesMultiselct").css("display","none");
            $("#updateAssetData").hide();
            //$("#cancelUpdateAssetData").hide();
        }

        //This ajax gets all the agency list
        function getAgencyByParameter(AgencyParameter){
            $.ajax({
                url: service_url + '/agencies/' + deptId + '/' + AgencyParameter,
                type: 'GET',
                dataType: 'json',
                data: {},
                success: function(d) {
                console.log(d);
                    $("#organization_id").empty();
                    $("#organization_id").append($("<option></option>").val('0').html('-- Select Agency --'));
                    $.each(d.post[0], function (key, value) {
                        $("#organization_id").append($("<option></option>").val(value.agencyId).html(value.name));
                    });
                },
                error: function () {
                    alert('Error!');
                }
            });
        }
});

