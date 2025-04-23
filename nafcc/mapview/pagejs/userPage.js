var responseRole=[];

//On Key press Validation
$("#firstName").keypress(function(event){
        var inputValue = event.charCode;
            if(!(inputValue >= 65 && inputValue <= 91 || inputValue >=97 && inputValue <=122) && (inputValue != 32 && inputValue != 0)){
                event.preventDefault();
            }
            var k = event ? event.which : window.event.keyCode;
            if (k == 32) return false;
    });

$("#middleName").keypress(function(event){
        var inputValue = event.charCode;
        if(!(inputValue >= 65 && inputValue <= 91 || inputValue >=97 && inputValue <=122) && (inputValue != 32 && inputValue != 0)){
            event.preventDefault();
        }
        var k = event ? event.which : window.event.keyCode;
        if (k == 32) return false;
    });

$("#lastName").keypress(function(event){
        var inputValue = event.charCode;
        if(!(inputValue >= 65 && inputValue <= 91 || inputValue >=97 && inputValue <=122) && (inputValue != 32 && inputValue != 0)){
            event.preventDefault();
        }
        var k = event ? event.which : window.event.keyCode;
        if (k == 32) return false;
    });

 $("#mobile").keypress(function(e){
        var keyCode = e.which;
        /*
        8 - (backspace)
        32 - (space)
        48-57 - (0-9)Numbers
        */
        if ( (keyCode != 8 || keyCode ==32 ) && (keyCode < 48 || keyCode > 57)) {
          return false;
        }

      });

$("#aadhaar").keypress(function(e){
    var keyCode = e.which;
    /*
    8 - (backspace)
    32 - (space)
    48-57 - (0-9)Numbers
    */
    if ( (keyCode != 8 || keyCode ==32 ) && (keyCode < 48 || keyCode > 57)) {
      return false;
    }
  });

$('#email').on('keyup',function(e){
     if(e.which == 13){ // check email on enter keypress
         alert(/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(this.value));
     }
});

$(document).ready(function () {

       var deptId = sessionStorage.getItem("deptId");
       var deptName = sessionStorage.getItem("deptName");
       var roleId = sessionStorage.getItem("roleId");
       var userName = sessionStorage.getItem("userName");
       var authorityId = sessionStorage.getItem("authorityId");
       var authorityArea = sessionStorage.getItem("authorityArea");
       var loginUserCanEdit = Boolean(sessionStorage.getItem("canEdit"));
       var createdBy = parseInt(sessionStorage.getItem("userId"));
       var updatedBy = parseInt(sessionStorage.getItem("userId"));
       var menuId = JSON.parse(sessionStorage.getItem("menuId"));
       var mobile= localStorage.getItem("mobile");

    var deptId = localStorage.getItem("deptId");
    var deptName = localStorage.getItem("deptName");
    var roleId = localStorage.getItem("roleId");
    var userName = localStorage.getItem("userName");
    var authorityId = localStorage.getItem("authorityId");
    var authorityArea = localStorage.getItem("authorityArea");
    var loginUserCanEdit = Boolean(localStorage.getItem("canEdit"));
    var createdBy = parseInt(localStorage.getItem("userId"));
    var updatedBy = parseInt(localStorage.getItem("userId"));
    var menuId = JSON.parse(localStorage.getItem("menuId"))
    var currentURL = window.location.pathname
    var successflag=false;
    menuId.forEach((singleMenu) => {
        if(singleMenu.targetUrl == currentURL || (loginUserCanEdit && currentURL == "/EditUserDetails.html")){
            successflag=true
        }
    });
    if(successflag){
        $("#includeNav").load("header.html");
        $("#includefooter").load("footer.html");
        $("#sidebar-nav").load("leftsidebar.html");

        var data_share = {

            "flag" : authorityId,

            "id" : authorityArea

        }

        if (deptId == 1){
            $('.zoneauth').select2();
            $('.distauth').select2();
            $('.blockauth').select2();

            $("#ddlZone").hide();
            $("#ddlDistrict").hide();
            $("#ddlBlock").hide();

            $("#ard-jurisdiction").hide();
            //$("#fisheries-jurisdiction").hide();

            $("#deptId").empty();
            $("#deptId").append($("<option></option>").val(deptName).html(deptName));

            var authTypeSel = 1;
            var autharea = [];

            function editCircle(id){ }

            $("#saveData").click(function() {

                var firstName = document.getElementById("firstName").value;
                    if(firstName == "")
                    {
                        alert("First name can't be empty");
                        return false;
                    }

                var middleName = document.getElementById("middleName").value;

                var lastName = document.getElementById("lastName").value;
                    if(lastName == "")
                    {
                        alert("Last Name can't be empty");
                        return false;
                    }

                var mobile = document.getElementById("mobile").value;
                var finalMobile = mobile.charAt(0);
                    if(mobile == "")
                    {
                        alert("Mobile can't be empty");
                        return false;
                    }
                    else if(finalMobile < 6)
                    {
                        alert("Invalid mobile");
                        return false;
                    }
                    else if (mobile.length!=10){
                        alert("Invalid mobile");
                        return false;
                    }

                var email = document.getElementById("email").value;
                   if(email == "")
                   {
                       alert("Email can't be empty");
                       return false;
                   }
                   if(!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(email))
                   {
                       alert("Invalid Email");
                       return false;
                   }
                  var dob = document.getElementById("dob").value;
                   if(dob == "")
                    {
                      alert("DOB field can't be empty");
                       return false;
                    }


                var password = document.getElementById("password").value;
                var passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{9,}$/;
                var reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{9,}$/;
                    if(!reg.test(password)){
                        alert("Please enter a valid password !!!\nPassword should be more than 8 characters. Must have uppercase, lowercase, digits and special characters");
                        return false;
                    }

                var aadhaar = document.getElementById("aadhaar").value;
                var regexp = /^[2-9]{1}[0-9]{3}\d{4}\d{4}$/;
                    if(aadhaar == "")
                    {
                        alert("Aadhaar can't be empty");
                        return false;
                    }
                    else if(aadhaar.length!=12){
                        alert("Invalid Aadhaar Input");
                        return false;
                    }
                    else if(!regexp.test(aadhaar)){
                        alert("Invalid aadhar");
                        return false;
                    }



                var roleJson = JSON.parse($("#roleId option:selected").val());

                var role = parseInt(roleJson.roleId);
                    if(role == "")
                    {
                        alert("Please select a role");
                        return false;
                    }

                var designationId = parseInt($('#designation option:selected').val());
                    if(designationId == 0)
                    {
                        alert("Please select a designation");
                        return false;
                    }

                var dept = parseInt(deptId);

                var authority = parseInt($("#authority option:selected").val());

                //var isActive = $('#isActive').is(":checked");

                var isEdit = $('#edit').is(":checked");

                var isDownload = $('#download').is(":checked");

                var isCreate = $('#create').is(":checked");

                var gender;
                if (document.getElementById('input-gender-male').checked) {
                    gender = parseInt(document.getElementById('input-gender-male').value);
                }

                if (document.getElementById('input-gender-female').checked) {
                    gender = parseInt(document.getElementById('input-gender-female').value);
                }

                if (document.getElementById('input-gender-others').checked) {
                    gender = parseInt(document.getElementById('input-gender-others').value);
                }
                function convertToInt(array){

                    var authorityAreaArray = [];
                    //for authority 1 to add authority 1 user
                    if(array==1){
                        var jObj = {
                                    "authorityType":1,
                                    "authorityArea":1,
                                    "createdBy":createdBy,
                                    "updatedBy":updatedBy
                                   };
                        authorityAreaArray.push(jObj)
                        console.log(jObj);
                    }
                    else{
                        for(var i =0;i<array.length;i++){
                            var jObj = {
                                        "authorityType":authority,
                                        "authorityArea":parseInt(array[i]),
                                        "createdBy":createdBy,
                                        "updatedBy":updatedBy
                                       };
                            authorityAreaArray.push(jObj)
                        }
                    }

                    console.log(authorityAreaArray);
                    return authorityAreaArray;
                }

                var jdc = $('#authority option:selected').val();
                jdc = parseInt(jdc);
                if(jdc == -1 || jdc == 0){
                    alert('Please select role');
                    return false;
                }

                if(jdc == 1){
                autharea = convertToInt("1");
                    //autharea.push(1);
                }

                if(jdc == 2){
                    autharea = convertToInt($('.zoneauth').val());
                }

                if(jdc == 3){
                    autharea = convertToInt($('.distauth').val());
                }

                if(jdc == 4){
                    autharea = convertToInt($('.blockauth').val());
                }

                if(autharea.length == 0){
                    Swal.fire({
                      text: 'Please select Jurisdiction',
                      icon: 'error',
                      confirmButtonText: 'OK'
                    })
                    return false;
                }

                if(!confirm("Click OK to register !!")){
                    event.preventDefault();
                    return false;
                }


                var data_save = {

                    "firstName" : firstName,

                    "middleName" : middleName,

                    "lastName" : lastName,

                    "userName" : mobile,

                    "mobile" : mobile,

                    "email" : email,

                    "dob" : dob      /*"10-10-2020 12:10:10"*/,
                    "password" : password,
                    "aadhaarId" : aadhaar,

                    "gender" : gender,

                    "roleId" : role,

                    //"authorityId" : authority,

                    "createdBy" : createdBy,

                    "updatedBy" : updatedBy,

                    //"authorityArea" : autharea,

                    "designationId" : designationId,

                    //"isActive" : isActive,

                    "canEdit" : isEdit,

                    "canDownload" : isDownload,

                    "canCreate" : isCreate,

                    "deptId" : dept
                }

               /* console.log(data_save);*/
                $.ajax({
                    url: service_url + '/saveUserDetails',
                    type: 'POST',
                    data: JSON.stringify({"user":data_save,"authority":autharea}),//,
                    dataType : 'json',
                    contentType: 'application/json',//; charset=utf-8',
                    success: function (data) {
                        if(data.status == 1){
                            //alert("Successfully Registered!");
                            Swal.fire({
                                text: 'Successfully Registered!',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            .then((redirect)=>{
                                window.location = "register.html";
                            })
                        }
                        else{
                            Swal.fire({
                                text: data.errorMessage,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            })
                        }
                    }
                });
            });

            //All Roles of Department 1
            var urlRole = service_url + '/getUserRoleByDepartment/' + deptId + '/' + roleId;
            $.ajax({
                type: 'GET',
                url: urlRole,
                dataType: 'json',
                success: function(Result) {
                    $("#roleId").empty();
                    $("#roleId").append($("<option></option>").val(JSON.stringify({"authorityId": 0, "authorityName": "0","roleId": 0,"roleName": "0"})).html("-- Select Role --"));
                    var i = 0;
                    $.each(Result.post, function (key, value) {
                        $("#roleId").append($("<option></option>").val(JSON.stringify(Result.post[i])).html(value.roleName));
                        responseRole.push(Result.post[i++]);
                    });
                },
                error: function (Result) {
                }
            });

            //State Dropdown
            $.ajax({
            url: service_url + '/getState',
            type: 'GET',
            dataType: 'json',
            data: {},
            success: function(d) {
                $("#state").empty();
                $("#state").val(d.post[0].stateName);
            },
                error: function () {
                alert('Error!');
                }
            });

            // Role on change
            $("#roleId").change (function(){
                $('#zone').val('');
                $('#district').val('');
                $('#block').val('');
                var jObject = JSON.parse($("#roleId option:selected").val());
                if(jObject.roleId != "0"){
                    $("#authority").empty();
                    $("#authority").append($("<option></option>").val(jObject.authorityId).html(jObject.authorityName));
                    $.ajax({
                        type: "GET",
                        url: service_url + '/getAllDesignationByRoleId/' + jObject.roleId,
                        dataType: 'json',
                        success: function(Result) {
                            if(Result.post.length>0){
                                $("#designation").empty();
                                $("#designation").append($("<option></option>").val(0).html("-- Select Designation --"));
                                $.each(Result.post, function (key, value) {
                                    $("#designation").append($("<option></option>").val(value.designationId).html(value.designationName));
                                });
                                //$("#designation").trigger("desgnationChange");
                            }
                            else{
                                console.log('No Record Found');
                            }
                        },
                        error: function(Result) {
                        }
                    });

                    //Authority Based
                    var authorityId = jObject.authorityId;
                    if (authorityId == 1) {
                        $("#ddlZone").hide();
                        $("#ddlDistrict").hide();
                        $("#ddlBlock").hide();
                    }

                    //Zone Authority
                    else if(authorityId == 2){
                        $("#ddlZone").show();
                        $('#zone').select2();
                        $('#zone').attr('multiple',true);
                        $("#ddlDistrict").hide();
                        $("#ddlBlock").hide();

                        $.ajax({
                            url: service_url + '/getZone',
                            type: 'GET',
                            dataType: 'json',
                            data: {},
                            success: function(d) {
                                console.log(d);
                                $("#zone").empty();
                                $('#zone').select2();
                                $("#zone").append($("<option></option>").val('0').html('-- Select Zone --'));
                                $.each(d.post, function (key, value) {
                                    $("#zone").append($("<option></option>").val(value.zoneId).html(value.zoneName));
                                });
                            },
                            error: function() {
                                alert('Error!');
                            }
                        });

                    }

                    //District Authority
                    else if(authorityId == 3){
                        $("#ddlZone").show();
                        if($('#zone').hasClass('select2-hidden-accessible'))
                        $('#zone').select2('destroy');
                        $('#zone').attr('multiple',false);
                        $('#district').select2();
                        $('#district').attr('multiple',true);
                        //if($('#block').hasClass('select2-hidden-accessible'))
                            //$('#block').select2('destroy');
                        //$('#block').attr('multiple',false);
                        $("#ddlDistrict").show();
                        $("#ddlBlock").hide();
                        $("#district").html("<option>-- Select District --</option>");

                        if(localStorage.getItem("authorityId") == 1){
                            $.ajax({
                                url: service_url + '/getZone',
                                type: 'GET',
                                dataType: 'json',
                                data: {},
                                success: function(d) {
                                    console.log(d);
                                    $("#zone").empty();
                                    $('#zone').select2();
                                    $("#zone").append($("<option></option>").val('0').html('-- Select Zone --'));
                                    $.each(d.post, function (key, value) {
                                        $("#zone").append($("<option></option>").val(value.zoneId).html(value.zoneName));
                                    });
                                },
                                error: function() {
                                    alert('Error!');
                                }
                            });

                            $("#zone").change(function () {
                                var zone_id = parseInt($("#zone option:selected").val());
                                console.log($('.zoneauth').val());
                                //var zoneArray = parseInt($('.zoneauth').val());
                                $.ajax({
                                    url: service_url + '/getDistrictByZoneId/'  + zone_id,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {},
                                    success: function (d) {
                                        console.log(d);
                                        $("#district").html("<option>-- Select District --</option>");
                                        $.each(d.post, function (i, districts) {
                                            $("#district").append($("<option></option>").val(districts.districtId).html(districts.districtName));
                                        });
                                    },
                                    error: function () {
                                        alert('Error!');
                                    }
                                });
                            });
                        }
                        else{
                            $.ajax({
                                type: "POST",
                                url: service_url + '/getFisheryAssetSearchBindingAsAuthority',
                                data: JSON.stringify(data_share),
                                contentType:"application/json",
                                dataType: 'json',
                                success: function (Result) {
                                    $("#zone").html("<option>-- Select Zone --</option>");
                                    $.each(Result.post[0], function (i, zone) {
                                        $("#zone").append($("<option></option>").val(zone.fzoneId).html(zone.fzoneName));
                                    });

                                    $("#zone").change(function () {
                                        var zone_id = parseInt($("#zone option:selected").val());
                                        console.log($('.zoneauth').val());
                                        //var zoneArray = parseInt($('.zoneauth').val());
                                        $.ajax({
                                            url: service_url + '/getDistrictByZoneId/'  + zone_id,
                                            type: 'GET',
                                            dataType: 'json',
                                            data: {},
                                            success: function (d) {
                                                console.log(d);
                                                $("#district").html("<option>-- Select District --</option>");
                                                $.each(d.post, function (i, districts) {
                                                    $("#district").append($("<option></option>").val(districts.districtId).html(districts.districtName));
                                                });
                                            },
                                            error: function () {
                                                alert('Error!');
                                            }
                                        });
                                    });
                                },
                                error: function (Result) {
                                }
                            });
                        }

                    }

                    //Block Authority
                    else if(authorityId == 4){
                        $("#ddlZone").show();
                        $("#ddlDistrict").show();
                        $("#ddlBlock").show();
                        if($('#zone').hasClass('select2-hidden-accessible'))
                            $('#zone').select2('destroy');

                        if($('#district').hasClass('select2-hidden-accessible'))
                            $('#district').select2('destroy');

                        $('#zone').attr('multiple',false);
                        $('#district').attr('multiple',false);
                        $("#block").html("<option>-- Select Block --</option>");

                        if(localStorage.getItem("authorityId") == 1){
                            $.ajax({
                                url: service_url + '/getZone',
                                type: 'GET',
                                dataType: 'json',
                                data: {},
                                success: function(d) {
                                    console.log(d);
                                    $("#zone").empty();
                                    $('#zone').select2();
                                    $("#zone").append($("<option></option>").val('0').html('-- Select Zone --'));
                                    $.each(d.post, function (key, value) {
                                        $("#zone").append($("<option></option>").val(value.zoneId).html(value.zoneName));
                                    });
                                },
                                error: function() {
                                    alert('Error!');
                                }
                            });

                            $("#zone").change(function () {
                                var zone_id = parseInt($("#zone option:selected").val());
                                console.log($('.zoneauth').val());
                                //var zoneArray = parseInt($('.zoneauth').val());
                                $.ajax({
                                    url: service_url + '/getDistrictByZoneId/'  + zone_id,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {},
                                    success: function (d) {
                                        console.log(d);
                                        $("#district").empty();
                                        $("#district").html("<option>-- Select District --</option>");
                                        $("#block").empty();
                                        $("#block").append($("<option></option>").val('0').html('-- Select Block --'));
                                        $.each(d.post, function (i, districts) {
                                            $("#district").append($("<option></option>").val(districts.districtId).html(districts.districtName));
                                        });
                                    },
                                    error: function () {
                                        alert('Error!');
                                    }
                                });
                            });

                            $("#district").change(function() {
                                var dist_id  = parseInt($("#district option:selected").val());
                                $.ajax({
                                    url: service_url + '/getBlockByDistId/' + dist_id,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {},
                                    success: function(d) {
                                        console.log(d);
                                        $("#block").empty();
                                        $("#block").append($("<option></option>").val('0').html('-- Select Block --'));
                                        $.each(d.post, function(i, blocks) {
                                            $("#block").append($("<option></option>").val(blocks.blockId).html(blocks.blockName));
                                        });
                                    },
                                    error: function () {
                                        alert('Error!');
                                    }
                                });
                            });
                        }

                        else if(localStorage.getItem("authorityId") == 2){
                            $.ajax({
                                type: "POST",
                                url: service_url + '/getFisheryAssetSearchBindingAsAuthority',
                                data: JSON.stringify(data_share),
                                contentType:"application/json",
                                dataType: 'json',
                                success: function (Result) {
                                    $("#zone").html("<option>-- Select Zone --</option>");
                                    $.each(Result.post[0], function (i, zone) {
                                        $("#zone").append($("<option></option>").val(zone.fzoneId).html(zone.fzoneName));
                                    });

                                    $("#zone").change(function () {
                                        var zone_id = parseInt($("#zone option:selected").val());
                                        //console.log($('.zoneauth').val());
                                        //var zoneArray = parseInt($('.zoneauth').val());
                                        $.ajax({
                                            url: service_url + '/getDistrictByZoneId/'  + zone_id,
                                            type: 'GET',
                                            dataType: 'json',
                                            data: {},
                                            success: function (d) {
                                                console.log(d);
                                                $("#district").empty();
                                                $("#district").html("<option>-- Select District --</option>");
                                                $("#block").empty();
                                                $("#block").append($("<option></option>").val('0').html('-- Select Block --'));
                                                $.each(d.post, function (i, districts) {
                                                    $("#district").append($("<option></option>").val(districts.districtId).html(districts.districtName));
                                                });
                                            },
                                            error: function () {
                                                alert('Error!');
                                            }
                                        });
                                    });

                                    $("#district").change(function() {
                                    //console.log($('.distauth').val());
                                    // var dist_id = $(this).val();
                                        var dist_id  = parseInt($("#district option:selected").val());
                                        $.ajax({
                                            url: service_url + '/getBlockByDistId/' + dist_id,
                                            type: 'GET',
                                            dataType: 'json',
                                            data: {},
                                            success: function(d) {
                                                console.log(d);
                                                $("#block").empty();
                                                $("#block").append($("<option></option>").val('0').html('-- Select Block --'));
                                                $.each(d.post, function(i, blocks) {
                                                    $("#block").append($("<option></option>").val(blocks.blockId).html(blocks.blockName));
                                                });
                                            },
                                            error: function () {
                                                alert('Error!');
                                            }
                                        });
                                    });

                                },
                                error: function (Result) {
                                }
                            });
                        }

                        else if(localStorage.getItem("authorityId") == 3){
                            $.ajax({
                                type: "POST",
                                url: service_url + '/getFisheryAssetSearchBindingAsAuthority',
                                data: JSON.stringify(data_share),
                                contentType:"application/json",
                                dataType: 'json',
                                success: function (Result) {
                                    console.log(Result);
                                    $("#zone").empty();
                                    $("#zone").append($("<option></option>").val(Result.post[0][0].fzoneId).html(Result.post[0][0].fzoneName));
                                    $("#district").html("<option>-- Select District --</option>");
                                    $.each(Result.post[0], function (i, district) {
                                        $("#district").append($("<option></option>").val(district.distId).html(district.districtName));
                                    });

                                    $("#district").change(function() {
                                        var dist_id  = parseInt($("#district option:selected").val());
                                        $.ajax({
                                            url: service_url + '/getBlockByDistId/' + dist_id,
                                            type: 'GET',
                                            dataType: 'json',
                                            data: {},
                                            success: function(d) {
                                                console.log(d);
                                                $("#block").empty();
                                                $("#block").append($("<option></option>").val('0').html('-- Select Block --'));
                                                $.each(d.post, function(i, blocks) {
                                                    $("#block").append($("<option></option>").val(blocks.blockId).html(blocks.blockName));
                                                });
                                            },
                                            error: function () {
                                                alert('Error!');
                                            }
                                        });
                                    });
                                },
                                error: function (Result) {
                                }
                            });
                        }
                    }
                }
            });
        }

        //This section is for Department 2 (ARD)
        else if(deptId == 2){
            $('.distauth').select2();
            $('.subdivisionauth').select2();
            $('.vdvhauth').select2();
            $('.lacauth').select2();
            $('.blockauth').select2();

            $("#ddlDistrictard").hide();
            $('#ddlBlockard').hide();
            $("#ddlsubdivision").hide();
            $("#ddlvdvh").hide();
            $("#ddllac").hide();

            //$("#ard-jurisdiction").hide();
            $("#fisheries-jurisdiction").hide();

            $("#deptId").empty();
            $("#deptId").append($("<option></option>").val(deptName).html(deptName));

            var autharea = [];

            $("#saveData").click(function() {

                var firstName = document.getElementById("firstName").value;
                if(firstName == "")
                {
                    alert("First name can't be empty");
                    return false;
                }

                var middleName = document.getElementById("middleName").value;

                var lastName = document.getElementById("lastName").value;
                if(lastName == "")
                {
                    alert("Last Name can't be empty");
                    return false;
                }


                var mobile = document.getElementById("mobile").value;
                var finalMobile = mobile.charAt(0);
                    if(mobile == "")
                    {
                        alert("Mobile can't be empty");
                        return false;
                    }
                    else if(finalMobile < 6)
                    {
                        alert("Invalid mobile");
                        return false;
                    }
                    else if (mobile.length!=10){
                        alert("Invalid mobile");
                        return false;
                    }

                var email = document.getElementById("email").value;
                if(email == "")
                {
                    alert("Email can't be empty");
                    return false;
                }
                if(!/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(email))
                {
                    alert("Invalid Email");
                    return false;
                }

                var aadhaar = document.getElementById("aadhaar").value;
                var regexp = /^[2-9]{1}[0-9]{3}\d{4}\d{4}$/;
                    if(aadhaar == "")
                    {
                        alert("Aadhaar can't be empty");
                        return false;
                    }
                    else if(aadhaar.length!=12){
                        alert("Invalid Aadhaar");
                        return false;
                    }
                    else if(!regexp.test(aadhaar)){
                        alert("Invalid Aadhaar");
                        return false;
                    }

                var dob = document.getElementById("dob").value;
                if(dob == "")
                {
                    alert("Please input DOB");
                    return false;
                }

                var date = $('#dob').val();

                var roleJson = JSON.parse($("#roleId option:selected").val());

                var role = parseInt(roleJson.roleId);
                if(role == "")
                {
                    alert("Please Select a Role");
                    return false;
                }

                var designationId = parseInt($('#designation option:selected').val());
                if(designationId == 0)
                {
                    alert("Please Select a Designation");
                    return false;
                }

                var dept = parseInt(deptId);

                var authority = parseInt($("#authority option:selected").val());

                //var isActive = $('#isActive').is(":checked");

                var isEdit = $('#edit').is(":checked");

                var isDownload = $('#download').is(":checked");

                var isCreate = $('#create').is(":checked");

                var gender;
                    if (document.getElementById('input-gender-male').checked) {
                        gender = parseInt(document.getElementById('input-gender-male').value);
                    }

                    if (document.getElementById('input-gender-female').checked) {
                        gender = parseInt(document.getElementById('input-gender-female').value);
                    }

                    if (document.getElementById('input-gender-others').checked) {
                        gender = parseInt(document.getElementById('input-gender-others').value);
                    }

                function convertToInt(array){
                    var authorityAreaArray = [];

                    for(var i =0;i<array.length;i++){
                        var jObj = {
                                    "authorityType":authority,
                                    "authorityArea":parseInt(array[i]),
                                    "createdBy":createdBy,
                                    "updatedBy":updatedBy
                                   };
                        authorityAreaArray.push(jObj)
                    }
                    console.log(authorityAreaArray);
                    return authorityAreaArray;

                }

                var jdc = $('#authority option:selected').val();
                jdc = parseInt(jdc);
                if(jdc == -1 || jdc == 0){
                    alert('Please select role');
                    return false;
                }

                if(jdc == 1){
                    //autharea.push(21);
                    autharea = convertToInt("1");
                }

                if(jdc == 3){
                    autharea = convertToInt($('#districtard').val());
                }

                if(jdc == 4){
                    autharea = convertToInt($('#blockard').val());
                }

                if(jdc == 5){
                    autharea = convertToInt($('#subdivisionard').val());
                }

                if(jdc == 6){
                    autharea = convertToInt($('#vdvhard').val());
                }

                if(jdc == 7){
                    autharea = convertToInt($('#lacard').val());
                }

                if(autharea.length == 0){
                    Swal.fire({
                      text: 'Please select Jurisdiction',
                      icon: 'warning',
                      confirmButtonText: 'OK'
                    })
                    return false;
                }

                if(!confirm("Click OK to register !!")){
                    event.preventDefault();
                    return false;
                }

                var data_save = {

                        "firstName" : firstName,

                        "middleName" : middleName,

                        "lastName" : lastName,

                        "userName" : '',

                        "password" : '',

                        "mobile" : mobile,

                        "email" : email,

                        "dob" : dob      /*"10-10-2020 12:10:10"*/,

                        "aadhaarId" : aadhaar,

                        "gender" : gender,

                        "roleId" : role,

                        "createdBy" : createdBy,

                        "updatedBy" : updatedBy,

                        "designationId" : designationId,

                        //"isActive" : isActive,

                        "canEdit" : isEdit,

                        "canDownload" : isDownload,

                        "canCreate" : isCreate,

                        "deptId" : dept
                    }

                console.log(data_save);

                $.ajax({
                    url: service_url + '/saveUserDetails',
                    type: 'POST',
                    data: JSON.stringify({"user":data_save,"authority":autharea}),//,
                    dataType : 'json',
                    contentType: 'application/json',//; charset=utf-8',
                    success: function (data) {
                        if (data.status == 1){
                            //alert("Successfully Registered!");
                            //window.location = "register.html";
                            Swal.fire({
                                text: 'Successfully Registered!',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            .then((redirect)=>{
                                window.location = "register.html";
                            })
                        }
                        else{
                            console.log(data.errorMessage);
                        }
                    }
                });

            });

            //All Roles of Department 2
            var urlRole = service_url + '/getUserRoleByDepartment/' + deptId + '/' + roleId;
            $.ajax({
                type: 'GET',
                url: urlRole,
                dataType: 'json',
                success: function(Result) {
                    $("#roleId").empty();
                    $("#roleId").append($("<option></option>").val(JSON.stringify({"authorityId": 0, "authorityName": "0","roleId": 0,"roleName": "0"})).html("-- Select Role --"));
                    var i = 0;
                    $.each(Result.post, function (key, value) {
                        $("#roleId").append($("<option></option>").val(JSON.stringify(Result.post[i])).html(value.roleName));
                        responseRole.push(Result.post[i++]);
                    });
                },
                error: function (Result) {
                }
            });

            //State Dropdown
            $.ajax({
                url: service_url + '/getState',
                type: 'GET',
                dataType: 'json',
                data: {},
                success: function(d) {
                    $("#state").empty();
                    $("#state").val(d.post[0].stateName);
                },
                error: function () {
                    alert('Error!');
                }
            });

            // Role on change
            $("#roleId").change (function(){
                $('#districtard').val('');
                $('#subdivisionard').val('');
                $('#blockard').val('');
                $('#vdvhard').val('');
                $('#lacard').val('');
                var jObject = JSON.parse($("#roleId option:selected").val());
                if(jObject.roleId != "0"){
                    $("#authority").empty();
                    $("#authority").append($("<option></option>").val(jObject.authorityId).html(jObject.authorityName));
                    $.ajax({
                        type: "GET",
                        url: service_url + '/getAllDesignationByRoleId/' + jObject.roleId,
                        dataType: 'json',
                        success: function(Result) {
                            if(Result.post.length>0){
                                $("#designation").empty();
                                $("#designation").append($("<option></option>").val(0).html("-- Select Designation --"));
                                $.each(Result.post, function (key, value) {
                                    $("#designation").append($("<option></option>").val(value.designationId).html(value.designationName));
                            });
                            //$("#designation").trigger("desgnationChange");
                            }else{
                                console.log('No Record Found');
                            }
                        },
                        error: function(Result) {
                       }
                    });
                }

                //Authority Based
                //State Authority
                var authorityId = jObject.authorityId;
                if (authorityId == 1) {
                    $("#ddlDistrictard").hide();
                    $("#ddlsubdivision").hide();
                    $("#ddlvdvh").hide();
                    $("#ddllac").hide();
                    $("#ddlBlockard").hide();
                }

                //District Authority (It is when the option selected from the drop-down as per the authority of the logged in user)
                else if (authorityId == 3){
                    $("#ddlDistrictard").show();
                    $('#districtard').select2();
                    $('#districtard').attr('multiple',true);
                    $("#ddlsubdivision").hide();
                    $("#ddlvdvh").hide();
                    $("#ddllac").hide();
                    $("#ddlBlockard").hide();
                    $.ajax({
                        url: service_url + '/getArdDistrict',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        success: function(d) {
                            console.log(d);
                            $("#districtard").empty();
                            $("#districtard").append($("<option></option>").val('0').html('-- Select District --'));
                            $("#subdivisionard").empty();
                            $("#subdivisionard").html("<option>-- Select Subdivision --</option>");
                            $("#vdvhard").empty();
                            $("#vdvhard").append($("<option></option>").val('0').html('-- Select VDVH --'));
                            $("#lacard").empty();
                            $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                            $.each(d.post, function (key, value) {
                                $("#districtard").append($("<option></option>").val(value.distId).html(value.districtName));
                            });
                        },
                        error: function() {
                            alert('Error!');
                        }
                    });
                }

                //Block Authority (It is when the option selected from the drop-down as per the authority of the logged in user)
                else if(authorityId == 4){
                    $("#ddlDistrictard").show();
                    if($('#districtard').hasClass('select2-hidden-accessible'))
                    $('#districtard').select2('destroy');
                    $('#districtard').attr('multiple',false);
                    $("#ddlBlockard").show();
                    $("#ddlsubdivision").hide();
                    $("#ddlvdvh").hide();
                    $("#ddllac").hide();

                    $("#blockard").html("<option>-- Select Block --</option>");
                    $("#districtard").html("<option>-- Select District --</option>");
                    //var distCode = parseInt($(this).val());
                    $.ajax({
                        url: service_url + '/getArdDistrict',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        success: function(d){
                            $("#districtard").empty();
                            $("#districtard").append($("<option></option>").val('0').html('-- Select District --'));
                            $.each(d.post, function(key, value) {
                                $("#districtard").append($("<option></option>").val(value.distId).html(value.districtName));
                            });
                            $("#blockard").html("<option>-- Select Block --</option>");
                            $("#districtard").change(function () {
                                var dist_id = parseInt($("#districtard option:selected").val());
                                //console.log($('.distauth').val());
                                $.ajax({
                                    url: service_url + '/getBlockByDistId/'  + dist_id,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {},
                                    success: function (d) {
                                        console.log(d);
                                        $("#blockard").empty();
                                        $("#blockard").html("<option>-- Select Block --</option>");
                                        $("#subdivisionard").empty();
                                        $("#subdivisionard").html("<option>-- Select Subdivision --</option>");
                                        $("#vdvhard").empty();
                                        $("#vdvhard").append($("<option></option>").val('0').html('-- Select VDVH --'));
                                        $("#lacard").empty();
                                        $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                                        $.each(d.post, function (i, block) {
                                            $("#blockard").append($("<option></option>").val(block.blockId).html(block.blockName));
                                        });
                                    },
                                    error: function () {
                                        alert('Error!');
                                    }
                                });
                            });
                        },
                        error: function() {
                            alert('Error!');
                        }
                    });
                }

                //Sub division authority (It is when the option selected from the drop-down as per the authority of the logged in user)
                else if(authorityId == 5){
                    $('#ddlBlockard').hide();
                    $("#ddlDistrictard").show();
                    if($('#districtard').hasClass('select2-hidden-accessible'))
                    $('#districtard').select2('destroy');
                    $('#districtard').attr('multiple',false);
                    $('#subdivisionard').select2();
                    $('#subdivisionard').attr('multiple',true);

                    $("#ddlsubdivision").show();
                    $("#ddlvdvh").hide();
                    $("#ddllac").hide();
                    $("#subdivisionard").html("<option>-- Select Subdivision --</option>");

                    $.ajax({
                        url: service_url + '/getArdDistrict',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        success: function(d) {
                            $("#districtard").empty();
                            $("#districtard").append($("<option></option>").val('0').html('-- Select District --'));
                            $.each(d.post, function(key, value) {
                                $("#districtard").append($("<option></option>").val(value.distId).html(value.districtName));
                            });
                            $("#subdivisionard").html("<option>-- Select Subdivision --</option>");
                            $("#districtard").change(function () {
                                var dist_id = parseInt($("#districtard option:selected").val());
                                //console.log($('.distauth').val());
                                $.ajax({
                                    url: service_url + '/getArdSubDivisionByDistrictId/'  + dist_id,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {},
                                    success: function (d) {
                                        console.log(d);
                                        $("#subdivisionard").empty();
                                        $("#subdivisionard").html("<option>-- Select Subdivision --</option>");
                                        $("#vdvhard").empty();
                                        $("#vdvhard").append($("<option></option>").val('0').html('-- Select VDVH --'));
                                        $("#lacard").empty();
                                        $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                                        $.each(d.post, function (i, subdivisions) {
                                            $("#subdivisionard").append($("<option></option>").val(subdivisions.subdivisionId).html(subdivisions.subdivisionName));
                                        });
                                    },
                                    error: function () {
                                    alert('Error!');
                                    }
                                });
                            });
                        },
                        error: function() {
                            alert('Error!');
                        }
                    });
                }

                //VD-VH Authority (It is when the option selected from the drop-down as per the authority of the logged in user)
                else if(authorityId == 6){
                    $('#ddlBlockard').hide();
                    $("#ddlDistrictard").show();
                    if($('#districtard').hasClass('select2-hidden-accessible'))
                    $('#districtard').select2('destroy');
                    $('#districtard').attr('multiple',false);

                    $("#ddlsubdivision").show();
                    if($('#subdivisionard').hasClass('select2-hidden-accessible'))
                    $('#subdivisionard').select2('destroy');
                    $('#subdivisionard').attr('multiple',false);

                    $('#vdvhard').select2();
                    $('#vdvhard').attr('multiple',true);
                    $("#ddlvdvh").show();
                    $('#ddllac').hide();

                    $("#vdvhard").html("<option>-- Select VDVH --</option>");

                    //var distCode = parseInt($(this).val());

                    $.ajax({
                        url: service_url + '/getArdDistrict',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        success: function(d) {
                            console.log(d);
                            $("#districtard").empty();
                            $("#districtard").append($("<option></option>").val('0').html('-- Select District --'));
                            $.each(d.post, function(key, value) {
                                $("#districtard").append($("<option></option>").val(value.distId).html(value.districtName));
                            });
                            $("#vdvhard").html("<option>-- Select VDVH --</option>");
                            $("#subdivisionard").html("<option>-- Select Subdivision --</option>");
                            $("#districtard").change(function() {
                                var dist_id = parseInt($(this).val());
                                $.ajax({
                                    url: service_url + '/getArdSubDivisionByDistrictId/' + dist_id,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {},
                                    success: function(d) {
                                        console.log(d);
                                        $("#subdivisionard").empty();
                                        $("#subdivisionard").html("<option>-- Select Subdivision --</option>");
                                        $("#vdvhard").empty();
                                        $("#vdvhard").append($("<option></option>").val('0').html('-- Select VDVH --'));
                                        $("#lacard").empty();
                                        $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                                        $.each(d.post, function (i, subdivision) {
                                            $("#subdivisionard").append($("<option></option>").val(subdivision.subdivisionId).html(subdivision.subdivisionName));
                                        });

                                        $("#subdivisionard").change(function() {
                                            console.log($('.subdivisionauth').val());
                                            var subdivision_id  = parseInt($("#subdivisionard option:selected").val());
                                            $.ajax({
                                                url: service_url + '/getArdVdVhBySubDivisionId/' + subdivision_id,
                                                type: 'GET',
                                                dataType: 'json',
                                                data: {},
                                                success: function(d) {
                                                    console.log(d);
                                                    $("#vdvhard").empty();
                                                    $("#vdvhard").append($("<option></option>").val('0').html('-- Select VDVH --'));
                                                    $("#lacard").empty();
                                                    $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                                                    $.each(d.post, function(i, vdvh) {
                                                        $("#vdvhard").append($("<option></option>").val(vdvh.vdVhId).html(vdvh.vdVhName));
                                                    });
                                                },
                                                error: function () {
                                                    alert('Error!');
                                                }
                                            });
                                        });
                                    },
                                    error: function () {
                                        alert('Error!');
                                    }
                                });
                            });
                        },
                        error: function () {
                            alert('Error!');
                        }
                    });
                }

                //LAC Authority (It is when the option selected from the drop-down as per the authority of the logged in user)
                else if(authorityId == 7){
                    $('#ddlBlockard').hide();
                    $("#ddlDistrictard").show();
                    if($('#districtard').hasClass('select2-hidden-accessible'))
                    $('#districtard').select2('destroy');
                    $('#districtard').attr('multiple',false);

                    $("#ddlsubdivision").show();
                    if($('#subdivisionard').hasClass('select2-hidden-accessible'))
                    $('#subdivisionard').select2('destroy');
                    $('#subdivisionard').attr('multiple',false);

                    $("#ddlvdvh").show();
                    if($('#vdvhard').hasClass('select2-hidden-accessible'))
                    $('#vdvhard').select2('destroy');
                    $('#vdvhard').attr('multiple',false);

                    $('#lacard').select2();
                    $('#lacard').attr('multiple',true);
                    $('#ddllac').show();
                    $("#lacard").html("<option>-- Select LAC --</option>");

                    //var distCode = parseInt($(this).val());

                    $.ajax({
                        url: service_url + '/getArdDistrict',
                        type: 'GET',
                        dataType: 'json',
                        data: {},
                        success: function(d) {
                            console.log(d);
                            $("#districtard").empty();
                            $("#districtard").append($("<option></option>").val('0').html('-- Select District --'));
                            $.each(d.post, function(key, value) {
                                $("#districtard").append($("<option></option>").val(value.distId).html(value.districtName));
                            });
                            $("#vdvhard").html("<option>-- Select VDVH --</option>");
                            $("#subdivisionard").html("<option>-- Select Subdivision --</option>");

                            //District on change
                            $("#districtard").change(function() {
                                var dist_id = parseInt($(this).val());
                                $.ajax({
                                    url: service_url + '/getArdSubDivisionByDistrictId/' + dist_id,
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {},
                                    success: function(d) {
                                        console.log(d);
                                        $("#subdivisionard").empty();
                                        $("#subdivisionard").html("<option>-- Select Subdivision --</option>");
                                        $("#vdvhard").empty();
                                        $("#vdvhard").append($("<option></option>").val('0').html('-- Select VDVH --'));
                                        $("#lacard").empty();
                                        $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                                        $.each(d.post, function (i, subdivision) {
                                            $("#subdivisionard").append($("<option></option>").val(subdivision.subdivisionId).html(subdivision.subdivisionName));
                                        });
                                        //Sub division on change
                                        $("#subdivisionard").change(function() {
                                            console.log($('.subdivisionauth').val());
                                            var subdivision_id  = parseInt($("#subdivisionard option:selected").val());
                                            $.ajax({
                                                url: service_url + '/getArdVdVhBySubDivisionId/' + subdivision_id,
                                                type: 'GET',
                                                dataType: 'json',
                                                data: {},
                                                success: function(d) {
                                                    console.log(d);
                                                    $("#vdvhard").empty();
                                                    $("#vdvhard").append($("<option></option>").val('0').html('-- Select VDVH --'));
                                                    $("#lacard").empty();
                                                    $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                                                    $.each(d.post, function(i, vdvh) {
                                                        $("#vdvhard").append($("<option></option>").val(vdvh.vdVhId).html(vdvh.vdVhName));
                                                    });

                                                    $("#vdvhard").change(function() {
                                                        console.log($('.vdvhard').val());
                                                        var vdvh_id  = parseInt($("#vdvhard option:selected").val());
                                                        $.ajax({
                                                            url: service_url + '/getArdLacByVdVhId/' + vdvh_id,
                                                            type: 'GET',
                                                            dataType: 'json',
                                                            data: {},
                                                            success: function(d) {
                                                                console.log(d);
                                                                $("#lacard").empty();
                                                                $("#lacard").append($("<option></option>").val('0').html('-- Select LAC --'));
                                                                $.each(d.post, function(i, lac) {
                                                                    $("#lacard").append($("<option></option>").val(lac.lacId).html(lac.lacName));
                                                                });
                                                            },
                                                            error: function () {
                                                                alert('Error!');
                                                            }
                                                        });
                                                    });
                                                },
                                                error: function () {
                                                    alert('Error!');
                                                }
                                            });
                                        });
                                    },
                                    error: function () {
                                      alert('Error!');
                                    }
                                }); // end ajax
                            }); // end district on change
                        },
                        error: function () {
                            alert('Error!');
                        }
                    });
                }
            });
        }
    }
    else{
        window.location = "errorPage.html";
    }
});
