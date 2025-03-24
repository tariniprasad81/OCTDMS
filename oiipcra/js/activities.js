$(document).ready(() => {
  let formDataJson = {
    id: 0,
    userId: 2,
    districtId: 0,
    blockId: 0,
    gpId: 0,
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
  };

  $.ajax({
    type: "POST",
    url: baseURL + "/survey/tankCount",
    data: JSON.stringify(formDataJson),
    contentType: "application/json",
    async: false,
    success: function (response) {
      var seriesdistrict = [];
      var seriesblock = [];
      if (response.data && Object.keys(response.data).length > 0) {
        var district = {};
        district["name"] = "Distict";
        district["colorByPoint"] = false;
        district["data"] = [];
        response.data.tankCountByDistrict.map((mips) => {
          var data_temp = {};
          data_temp["name"] = mips.deptDistName;
          data_temp["y"] = mips.tankCount;
          data_temp["drilldown"] = "dist_" + mips.distId;
          district["data"].push(data_temp);
        });
        seriesdistrict.push(district);
      }
      //block drill down
      if (response.data && Object.keys(response.data).length > 0) {
        var block = {};
        var district_id = "";
        block["data"] = [];
        response.data.tankCountByBlock.map((mips) => {
          if (district_id != "dist_" + mips.distId) {
            if (district_id != "") {
              seriesblock.push(block);
              block = {};
              block["data"] = [];
            }
            block["id"] = "dist_" + mips.distId;
            block["name"] = "Block";
            block["colorByPoint"] = false;
            district_id = "dist_" + mips.distId;
          }
          var data_circle = {};
          data_circle["id"] = mips.blockId;
          data_circle["name"] = mips.deptBlockName;
          data_circle["y"] = mips.tankCount;
          data_circle["distname"] = mips.deptDistName;
          block["data"].push(data_circle);
        });
      }
      getData(response.data.tankCountByBlock);
      seriesblock.push(block);
      Highcharts.chart("activityDashBoardContainer", {
        chart: {
          type: "column",
          style: {
            fontFamily: "sans-serif",
            color: "#000",
            fontWeight: "bold",
          },
        },
        title: {
          text: "District/Block wise tank count",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            useHTML: true,
            text: "No. of tanks",
          },
        },
        legend: {
          enabled: true,
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
            },
            point: {
              events: {
                click: function (event) {
                  try {
                    if (!this.options.drilldown) {
                      $("#activityDashBoardContainer").css("display", "none");
                      xyz(this.options.id);
                      $("#divMyTable").css("display", "block");
                    }
                  } catch (e) {}
                },
              },
            },
          },
        },

        series: seriesdistrict,
        drilldown: {
          allowPointDrilldown: true,
          activeAxisLabelStyle: {
            textDecoration: "none",
            color: "#000",
            fontWeight: "bold",
            fontSize: "13px",
          },
          activeDataLabelStyle: {
            textDecoration: "none",
            color: "#000",
            fontWeight: "bold",
            fontSize: "13px",
          },
          series: seriesblock,
        },
      });
    },
  });
});

//handler for Checking null value
const nullCheck = (data) => {
  console.log(data);
  if (data == null || data == undefined || data.length == 0) {
    return "N/A";
  } else {
    return data;
  }
};

var responseData;
const getData = (d) => {
  responseData = d;
};

//get tank details against tank id
function getTankDetailByTankId(tankId) {
  let jsonData = { id: parseInt(tankId), flagId: 0 };
  var tablestr = "";
  $.ajax({
    type: "POST",
    url: baseURL + "/survey/tankListById",
    data: JSON.stringify(jsonData),
    contentType: "application/json",
    async: false,
    success: function (Results) {
      $("#divMyTable").css("display", "none");
      $("#tankDetailsView").css("display", "block");
      console.log(Results.data.tankList[0]);

      tablestr += "<tr>";
      tablestr += "<td ><strong>Name of the M.I.P</strong></td>";
      tablestr +=
        "<td><a color='blue' style='cursor:pointer' onclick=getWorkDetailByTankId(" +
        Results.data.tankList[0].tankId +
        ")>" +
        Results.data.tankList[0].tankName +
        "</a></td>";
      tablestr += "</tr>";
      tablestr += "<tr>";
      tablestr += "<td ><strong>MI Division Name</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].miDivisionName + "</td>";
      tablestr += "</tr>";
      tablestr += "<tr>";
      tablestr += "<td ><strong>District</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].deptDistName + "</td>";
      tablestr += "</tr>";
      tablestr += "<tr>";
      tablestr += "<td ><strong>Block</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].deptBlockName + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Name of G P</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].deptGpName + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Category</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].category + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Type</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].type + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Latitude</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].latitude + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Longitude	</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].longitude + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Catchment in Sq Km	</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].catchmentAreaSqkm + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Designed Ayacut (Khariff) in Ha.</strong></td>";
      tablestr +=
        "<td>" + Results.data.tankList[0].designedCcaKharifHa + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Designed Ayacut (Rabi) in Ha.</strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].designedCcaRabiHa + "</td>";
      tablestr += "</tr>";
      tablestr +=
        "<td ><strong>Certified Ayacut (Khariff) in Ha.</strong></td>";
      tablestr +=
        "<td>" + Results.data.tankList[0].certifiedAyacutKharifHa + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Certified Ayacut (Rabi) in Ha.</strong></td>";
      tablestr +=
        "<td>" + Results.data.tankList[0].certifiedAyacutRabiHa + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong> Source of Funding </strong></td>";
      tablestr +=
        "<td>" + nullCheck(Results.data.tankList[0].sourceOfFunding) + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong> Basin </strong></td>";
      tablestr += "<td>" + Results.data.tankList[0].riverBasin + "</td>";
      tablestr += "</tr>";

      $("#tankDetailsTable").html(tablestr);
    },
    error: function (Results) {},
  });
}

function pivotData(data) {
  // generate a result schema to append the values
  var expenditureList;
  var result = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

  // loop through out the months to iterate upons months and fetch data according to that
  for (var i = 1; i <= 12; i++) {
    // filter where the month id matches the current month iteration and yearId is less then 8 to show last 7 years of data
    var filter = data.filter((e) => {
      return e.monthId == i && e.finYrId < 10;
    });

    // set month name at the previous index i.e 1-0
    result[i - 1]["monthName"] = filter[0].monthName;
    result[i - 1]["agencyName"] = filter[0].agencyName;
    result[i - 1]["agreementNumber"] = filter[0].agreementNumber;
    result[i - 1]["contractAmount"] = filter[0].contractAmount;
    result[i - 1]["stipulatedDateOfCompletion"] =
      filter[0].stipulatedDateOfCompletion;
    result[i - 1]["stipulatedDateOfComencement"] =
      filter[0].stipulatedDateOfComencement;
    result[i - 1]["totalCompletionPeriod"] = filter[0].totalCompletionPeriod;
    // set yearn name as key and expenditure amount as value  (if value is NaN or undefined set 0 by default )
    result[i - 1][filter[0].finYrName] = filter[0].expenditure ?? 0;
    result[i - 1][filter[1].finYrName] = filter[1].expenditure ?? 0;
    result[i - 1][filter[2].finYrName] = filter[2].expenditure ?? 0;
    result[i - 1][filter[3].finYrName] = filter[3].expenditure ?? 0;
    result[i - 1][filter[4].finYrName] = filter[4].expenditure ?? 0;
    result[i - 1][filter[5].finYrName] = filter[5].expenditure ?? 0;
    result[i - 1][filter[6].finYrName] = filter[6].expenditure ?? 0;
  }

  // set the result to table data
  expenditureList = result;

  $("#divMyTable").css("display", "none");
  $("#tankDetailsView").css("display", "none");
  $("#expenditureTableContainer").css("display", "block");

  // <td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>";
  var tablestr2 = "";

  for (let j = 0; j < expenditureList.length; j++) {
    tablestr2 +=
      "<tr>" +
      "<td>" +
      nullCheck(expenditureList[j].agreementNumber) +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j].agencyName) +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j].contractAmount) +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j].stipulatedDateOfComencement) +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j].stipulatedDateOfCompletion) +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j].totalCompletionPeriod) +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j].monthName) +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j])["2018-19"] +
      "</td>" +
      "<td>" +
      nullCheck(expenditureList[j])["2019-20"] +
      "</td>" +
      // "<td>" +
      // expenditureList[j]["2020-21"] +
      // "</td>" +
      // "<td>" +
      // expenditureList[j]["2021-22"] +
      // "</td>" +
      // "<td>" +
      // expenditureList[j]["2022-23"] +
      // "</td>" +
      // "<td>" +
      // expenditureList[j]["2023-24"] +
      // "</td>" +
      // "<td>" +
      // expenditureList[j]["2024-25"] +
      // "</td>" +
      "</tr>";
  }
  $("#expenditureTableBody").append(tablestr2);
}

//get expenditure details against tank id
function getExpenditureDetailByTankId(tankId) {
  let jsonData = { tankId: parseInt(tankId) };

  $.ajax({
    type: "POST",
    url: baseURL + "/tender/getExpenditureDataByTankId ",
    data: JSON.stringify(jsonData),
    contentType: "application/json",
    async: false,
    success: function (Results) {
      pivotData(Results.data.expenditureData);
    },
  });
}

//get Work details against tank id
function getWorkDetailByTankId(tankId) {
  // console.log(tankId);

  const formData = { tankId: parseInt(tankId) };
  var tablestr = "";
  $.ajax({
    type: "POST",
    url: baseURL + "/dashboard/getMipInfoById",
    data: formData,
    // contentType: "application/json",
    async: false,
    success: function (Results) {
      $("#divMyTable").css("display", "none");
      $("#tankDetailsView").css("display", "block");
      tablestr += "<tr>";
      tablestr += "<td ><strong>Name of the M.I.P</strong></td>";
      tablestr += "<td>" + nullCheck(Results.data.mipInfo?.tankName) + "</td>";
      tablestr += "</tr>";
      tablestr += "<tr>";
      tablestr += "<td ><strong>Villages in Command Area</strong></td>";
      tablestr +=
        "<td>" + nullCheck(Results.data.mipInfo?.villageName) + "</td>";
      tablestr += "</tr>";
      tablestr += "<tr>";
      tablestr += "<td ><strong>No of Panipanchayat</strong></td>";
      tablestr += "<td>" + nullCheck(Results.data.mipInfo?.count) + "</td>";
      tablestr += "</tr>";
      tablestr += "<tr>";
      tablestr += "<td ><strong>Name of Panipanchayat</strong></td>";
      tablestr +=
        "<td>" + nullCheck(Results.data.mipInfo?.paniPanchayatName) + "</td>";
      tablestr += "</tr>";
      tablestr += "<tr><th><strong>Ayacut Classification</strong></th>";
      tablestr += "<th></th>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>High Land</strong></td>";
      tablestr +=
        "<td>" + nullCheck(Results.data.mipInfo?.dprInfo?.highLandHa) + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Medium Land</strong></td>";
      tablestr +=
        "<td>" +
        nullCheck(Results.data.mipInfo?.dprInfo?.mediumLandHa) +
        "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Low Land</strong></td>";
      tablestr +=
        "<td>" + nullCheck(Results.data.mipInfo?.dprInfo?.lowLandHa) + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Est Cost of Civil Work	</strong></td>";
      tablestr +=
        "<td><b><a color='blue' style='cursor:pointer' onclick=getExpenditureDetailByTankId(" +
        tankId +
        ")>" +
        nullCheck(Results.data.mipInfo?.estimateCostOfCivilWork) +
        "</a></b></td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Exp by previous month</strong></td>";
      tablestr +=
        "<td>" +
        nullCheck(Results.data.mipInfo?.expenditureByPreviousMonth) +
        "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Exp during this month</strong></td>";
      tablestr +=
        "<td>" +
        nullCheck(Results.data.mipInfo?.expenditureThisMonth) +
        "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Total Expenditure</strong></td>";
      tablestr +=
        "<td>" + nullCheck(Results.data.mipInfo?.totalExpenditure) + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Estimate for ALSS Work</strong></td>";
      tablestr +=
        "<td>" +
        nullCheck(Results.data.mipInfo?.certifiedAyacutKharifHa) +
        "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong>Exp by previous month</strong></td>";
      tablestr +=
        "<td>" +
        nullCheck(Results.data.mipInfo?.certifiedAyacutRabiHa) +
        "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong> Exp during this month</strong></td>";
      tablestr +=
        "<td>" + nullCheck(Results.data.mipInfo?.sourceOfFunding) + "</td>";
      tablestr += "</tr>";
      tablestr += "<td ><strong> Total Expenditure </strong></td>";
      tablestr += "<td>" + Results.data.mipInfo?.totalExpenditure + "</td>";
      tablestr += "</tr>";
      console.log(Results.data.mipInfo?.totalExpenditure);

      $("#tankDetailsTable").html(tablestr);
      $("#title").text("Work Details");
    },
  });
}

//get tankList against block Id
const xyz = (str) => {
  const jsonData = {
    blockId: parseInt(str),
  };
  buildDataTable(jsonData);

  function buildDataTable(jsonData) {
    $("#myTable").DataTable({
      processing: false,
      serverSide: true,
      searching: true,
      stateSave: false,
      paging: true,
     
      ajax: {
        url: baseURL + "/survey/tankSearchListForWebsite",
        type: "POST",
        data: jsonData,
        dataSrc: function (d) {
          return d.data.tankList;
        },
        // "draw": 1,
        // "recordsTotal": 57,
        // "recordsFiltered": 57,
      },
      columns: [
        {
          title: "Sl No",
          render: function (data, type, row, meta) {
            return meta.row + meta.settings._iDisplayStart + 1;
          },
        },
        { title: "Project Id", data: "projectId" },
        { title: "District Name", data: "deptDistName" },
        { title: "Division Name", data: "miDivisionName" },
        { title: "Block Name", data: "deptBlockName" },
        {
          title: "Name of the M.I.P",
          data: "tankName",
          className: "tank",
          render: (data, type, row, meta) => {
            return (
              '<font color="blue"><b><u><a href="#" onclick="getTankDetailByTankId(' +
              row.tankId +
              ')">' +
              row.tankName +
              "</a></u></b></font>"
            );
          },
        },
        { title: "GP Name", data: "deptGpName" },
        { title: "Category", data: "category" },
        { title: "Type", data: "type" },
      ],
    });
  }
};
