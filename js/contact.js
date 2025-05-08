var serverurl;
var distUrl;
var blockUrl;
var gpUrl;
var tankUrl;
var grievance;

$(document).ready(function () {
  $("#oiipcraDivision").hide();
  $("#image").hide();
  $("#document").hide();
  $("#tanks").select2();
  $("#contactForm").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      mobile: {
        required: true,
        number: true,
        min: 1000000000,
        max: 9999999999,
        maxlength: 10,
      },
      email: {
        // required: true,
        email: true,
      },
      grievance: {
        required: true,
      },
      tanks: {
        required: true,
      },
      remarks: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please enter your Full Name",
        minlength: "Name should be at least 3 characters",
      },
      mobile: {
        required: "Please enter your phone number",
        number: "Please enter 10 digit phone number",
        min: "Please enter valid 10 digit phone number",
        max: "Please enter 10 digit phone number",
      },
      email: {
        email: "The email should be in the format: abc@domain.tld",
      },
      grievance: {
        required: "Select a project",
      },
      tanks: {
        required: "Select a Tank",
      },
      remarks: {
        required: "Enter your remark",
      },
    },
  });

  $.ajax({
    type: "POST",
    // url: "http://10.150.2.27:9090/test/api/v1/tender/getAllProject",
    url: "https://api.octdms.in/oiipcra/api/v1/tender/getAllProject",
    // dataType: "json",
    // async: false,
    success: function (response) {
      $.each(response.data.projectList, function (key, value) {
        $("#grievance").append(
          $("<option></option>").val(value.id).html(value.name)
        );
      });
    },
    error: function (Results) {},
  });
});

function onchangeGrievance(data) {
  grievance = $("#grievance").find(":selected").text();
  $("#district option").remove();
  $("#division option").remove();
  $("#block option").remove();
  $("#gp option").remove();
  $("#tanks option").remove();
  if (grievance == "GCF") {
    serverurl = "https://gcf.octdms.in/api/";
    distUrl = serverurl + "boundary/getAllDistrict/0";
    blockUrl = serverurl + "boundary/getBlockByDistrict/0/";
    gpUrl = serverurl + "boundary/getGpByBlock/0/";
    tankUrl = serverurl + "master/tankSearchList";
    $("#oiipcraDivision").hide();
    $("#image").hide();
    $("#document").hide();
    getDistrictGCF();
  } else if (grievance == "OIIPCRA") {
    serverurl = "https://api.octdms.in/oiipcra/api/";
    distUrl = serverurl + "v1/master/getAllDistrict";
    blockUrl = serverurl + "v1/master/getBlocksByDistId";
    divisionUrl = serverurl + "v1/master/getDivisionByDistId";
    gpUrl = serverurl + "v1/master/getGpByBlockId";
    tankUrl = serverurl + "v1/survey/tankSearchList";
    $("#oiipcraDivision").show();
    $("#image").show();
    $("#document").show();
    getDistrictOIIPCRS();
  }
}

function getDistrictGCF() {
  $.ajax({
    type: "GET",
    url: distUrl,
    // dataType: "json",
    // async: false,
    success: function (Results) {
      $("#district option").remove();
      $("#district").append(
        $("<option></option>").val("").html("--Select District--")
      );
      $.each(Results.post, function (key, value) {
        $("#district").append(
          $("<option></option>").val(value.dist_id).html(value.district_name)
        );
      });
    },
    error: function (Results) {},
  });
}

function getDistrictOIIPCRS() {
  $.ajax({
    type: "POST",
    url: distUrl,
    data: {
      userId: 2,
    },
    // dataType: "json",
    // async: false,
    success: function (Results) {
      $("#district option").remove();
      $("#district").append(
        $("<option></option>").val("").html("---Select District---")
      );
      $.each(Results.data.districtList, function (key, value) {
        $("#district").append(
          $("<option></option>").val(value.dist_id).html(value.district_name)
        );
      });
    },
    error: function (Results) {},
  });
}

function onchangeDistrict(distId) {
  $("#division option").remove();
  $("#block option").remove();
  $("#gp option").remove();
  $("#tanks option").remove();
  if (grievance == "GCF") {
    $.ajax({
      type: "GET",
      url: blockUrl + distId,
      // dataType: "json",
      // async: false,
      success: function (Results) {
        $("#block option").remove();
        $("#block").append(
          $("<option></option>").val("").html("--Select Block--")
        );
        $.each(Results.post, function (key, value) {
          $("#block").append(
            $("<option></option>").val(value.block_id).html(value.block_name)
          );
        });
      },
      error: function (Results) {},
    });
  } else if (grievance == "OIIPCRA") {
    // Block
    $.ajax({
      type: "POST",
      url: blockUrl,
      data: {
        userId: 2,
        distId: distId,
      },
      // dataType: "json",
      // async: false,
      success: function (Results) {
        $("#block option").remove();
        $("#block").append(
          $("<option></option>").val("").html("---Select Block---")
        );
        $.each(Results.data.blockList, function (key, value) {
          $("#block").append(
            $("<option></option>").val(value.block_id).html(value.block_name)
          );
        });
      },
      error: function (Results) {},
    });

    // Division
    $.ajax({
      type: "POST",
      url: divisionUrl,
      data: {
        userId: 2,
        distId: distId,
      },
      // dataType: "json",
      // async: false,
      success: function (Results) {
        $("#division option").remove();
        $("#division").append(
          $("<option></option>").val("").html("---Select Division---")
        );
        $.each(Results.data.divisionList, function (key, value) {
          $("#division").append(
            $("<option></option>")
              .val(value.divisionId)
              .html(value.divisionName)
          );
        });
      },
      error: function (Results) {},
    });
  }
}

function onchangeBlock(blockId) {
  $("#gp option").remove();
  $("#tanks option").remove();
  if (grievance == "GCF") {
    $.ajax({
      type: "GET",
      url: gpUrl + blockId,
      success: function (Results) {
        $("#gp option").remove();
        $("#gp").append(
          $("<option></option>").val("").html("--Select Grampanchayat--")
        );
        $.each(Results.post, function (key, value) {
          $("#gp").append(
            $("<option></option>")
              .val(value.gp_id)
              .html(value.grampanchayat_name)
          );
        });
      },
      error: function (Results) {},
    });
  } else if (grievance == "OIIPCRA") {
    $.ajax({
      type: "POST",
      url: gpUrl,
      data: {
        userId: 2,
        blockId: blockId,
      },
      // dataType: "json",
      // contentType: "application/json",
      // dataType: "json",
      // async: false,
      success: function (Results) {
        $("#gp option").remove();
        $("#gp").append(
          $("<option></option>").val("").html("---Select Grampanchayat---")
        );
        $.each(Results.data.gpList, function (key, value) {
          $("#gp").append(
            $("<option></option>")
              .val(value.gp_id)
              .html(value.grampanchayat_name)
          );
        });
      },
      error: function (Results) {},
    });
  }
}

function onchangeGp(gpId) {
  $("#tanks option").remove();
  if (grievance == "GCF") {
    $.ajax({
      type: "POST",
      url: tankUrl,
      data: JSON.stringify({
        districtId: 0,
        blockId: 0,
        gpId: gpId,
        villageId: 0,
        progressStatus: null,
        tankOid: 0,
        projectId: -1,
        captureFromDate: "",
        captureToDate: "",
        flag: 0,
        validByOrsac: "0",
      }),
      dataType: "json",
      contentType: "application/json",
      // dataType: "json",
      // async: false,
      success: function (Results) {
        $("#tanks option").remove();
        $("#tanks").append(
          $("<option></option>").val("").html("--Select Tanks--")
        );
        $.each(Results.post, function (key, value) {
          $("#tanks").append(
            $("<option></option>").val(value.tankOid).html(value.tankName)
          );
        });
      },
      error: function (Results) {},
    });
  } else if (grievance == "OIIPCRA") {
    $.ajax({
      type: "POST",
      url: tankUrl,
      data: JSON.stringify({
        id: 0,
        userId: 2,
        districtId: 0,
        blockId: 0,
        gpId: gpId,
        villageId: 0,
        divisionId: -1,
        subDivisionId: -1,
        sectionId: -1,
        progressStatus: -1,
        tankId: -1,
        projectId: -1,
        uploadFromDate: "",
        uploadToDate: "",
        page: 0,
        size: 10,
        sortOrder: "asc",
        sortBy: "id",
      }),
      dataType: "json",
      contentType: "application/json",
      // dataType: "json",
      // async: false,
      success: function (Results) {
        $("#tanks option").remove();
        $("#tanks").append(
          $("<option></option>").val("").html("---Select Tanks---")
        );
        $.each(Results.data.tankList, function (key, value) {
          $("#tanks").append(
            $("<option></option>").val(value.tankId).html(value.tankName)
          );
        });
      },
      error: function (Results) {},
    });
  }
}

$("#contactForm").submit(function () {
  if (
    $("#name").val() != "" &&
    $("#phone").val() != "" &&
    $("#grievance option:selected").val() != "" &&
    $("#tanks option:selected").val() != ""
  ) {
    // console.log(files);

    var dataLoad = {};
    dataLoad = {
      name: $.trim($("#name").val()),
      mobile: parseInt($.trim($("#phone").val())),
      email: $.trim($("#email").val()),
      gender: parseInt($.trim($("#gender").val())),
      address: $.trim($("#address").val()),
      projectId: parseInt($.trim($("#grievance option:selected").val())),
      tankId: parseInt($.trim($("#tanks option:selected").val())),
      remarks: $("#remarks").val(),
      // image: $("#uploadImage").val(),
      // document: $("#uploadFile").val()
    };

    if (grievance == "OIIPCRA") {
      dataLoad.distId = parseInt($.trim($("#district").val()));
      dataLoad.divisionId = parseInt($.trim($("#division").val()));
      dataLoad.blockId = parseInt($.trim($("#block").val()));
      dataLoad.gpId = parseInt($.trim($("#gp").val()));
    }

    var files = $("#uploadImage")[0].files;
    var doc = $("#uploadFile")[0].files;

    var formdata = new FormData();
    // formdata.append( 'name', $("#name").val());
    // formdata.append( 'mobile', $("#phone").val());
    // formdata.append( 'email', $("#email").val());
    // formdata.append( 'gender', $("#gender").val());
    // formdata.append( 'address', $("#address").val());
    // formdata.append( 'projectId', $("#grievance option:selected").val());
    // formdata.append( 'tankId', $("#tanks option:selected").val());
    // formdata.append( 'remarks', $("#remarks").val());
    console.log($("#uploadImage")[0].files);
    if ($("#uploadImage")[0].files.length != 0)
      formdata.append("files", files[0]);
    // else{
    //   formdata.append( 'files', null);
    // }

    if ($("#uploadFile")[0].files.length != 0) formdata.append("doc", doc[0]);
    // else
    //   formdata.append( 'doc', null);

    formdata.append("data", JSON.stringify(dataLoad));

    if (grievance == "GCF") {
      saveURL = serverurl + "grivence/createGrivence";
    } else if (grievance == "OIIPCRA") {
      saveURL = serverurl + "v1/grievance/createGrievance";
      // saveURL = "http://169.254.223.176:8080/api/v1/grievance/createGrievance ";
    }
    console.log(formdata);

    $.ajax({
      type: "POST",
      url: saveURL,
      // data:JSON.stringify(dataLoad),
      data: formdata,
      // dataType: "json",
      // contentType: "application/json",
      // async: false,
      processData: false,
      contentType: false,
      success: function (responce) {
        if (responce.status == 1) {
          $("#success_dialog").modal("show");
          $("#success_dialog_heading").html("Success");
          $("#success_dialog_message").html("Grievance Sucessfully Submitted");
          // alert("Remark Submited Sucessfully")
          $("#contactForm").trigger("reset");
        } else {
          $("#success_dialog").modal("show");
          $("#success_dialog_heading").html("Failed");
          $("#success_dialog_message").html("Grievance Submission Failed");
          // alert("Remark Submited Sucessfully")
          $("#contactForm").trigger("reset");
        }
      },
      error: function (Results) {},
    });
  }
});
