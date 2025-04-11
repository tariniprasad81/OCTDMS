    $("#name").keypress(function(event){
        var inputValue = event.charCode;
            if(!(inputValue >= 65 && inputValue <= 91 || inputValue >=97 && inputValue <=122) && (inputValue != 32 && inputValue != 0)){
                event.preventDefault();
            }
            var k = event ? event.which : window.event.keyCode;
            if (k == 32) return true;
    });

    $("#assitanceMode").keypress(function(event){
            var inputValue = event.charCode;
                if(!(inputValue >= 65 && inputValue <= 91 || inputValue >=97 && inputValue <=122) && (inputValue != 32 && inputValue != 0)){
                    event.preventDefault();
                }
                var k = event ? event.which : window.event.keyCode;
                if (k == 32) return true;
        });

    $("#programmeComponent").keypress(function(event){
                var inputValue = event.charCode;
                    if(!(inputValue >= 65 && inputValue <= 91 || inputValue >=97 && inputValue <=122) && (inputValue != 32 && inputValue != 0)){
                        event.preventDefault();
                    }
                    var k = event ? event.which : window.event.keyCode;
                    if (k == 32) return true;
            });





var userId = localStorage.getItem("userId");
var deptId = localStorage.getItem("deptId");
var roleId = localStorage.getItem("roleId");
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
            $.ajax({
            type: "GET",
            url: service_url + '/getAllScheme/' + deptId,
            dataType: 'json',
            success: function (obj, textstatus) {
                //console.log(obj.posts);
                $('#schemetable').DataTable({
                    data: (obj.post[0]),
                    //paging : false,
                    columnDefs : [
                    { width: 200, targets: 0 },

                      {
                              "targets": 4, // your case first column
                              "className": "text-center",
                              "width": "4%"
                         },
                          {
                             "targets": 8, // your case first column
                             "className": "text-center",
                             "width": "4%"
                            },

                    ],
                    fixedColumns: true,
                      scrollX: true,

                    columns: [
                        { title : "Scheme Id", data:"schemeId"},
                        { title : "Scheme Name", data:"name"},
//                        { title : "Assitance Mode", data:"assitanceMode"},
                        { title : "Programme Component", data:"programmeComponent"},
                        { title : "Rate of Subsidy", data:"rateOfSubsidy"},
                        { title : "Unit Cost", data:"unitCost"},
                        { title : "Implementation Procedure", data: "implementationProcedure"},
                        { title : "Allotment Year", data: "allotment_year"},
                        { title : "Year", data: "year"},
                        { title : "Allotment Amount", data: "allotmentAmount"},
                        { title : "Target", data: "target"},
                        { title : "Scheme of", data: "schemeOf"},
                        { title : "Status", data: "isactive"},

                        { title : "Action",
                            data: 'schemeId',
                            render: function(data, type, row, meta) {
                                return type === 'display' ?
                                    `<div class="dropdown">
                                        <a href="#" class="dropdown-toggle set_new_font" data-toggle="dropdown" role="button" aria-haspopup="true"
                                         aria-expanded="false">
                                            <i class="glyphicon glyphicon-cog set_pos_usermenu"
                                            style="font-size: 20px;"></i>
                                         </a>
                                         <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <li><a href="#" onclick="" ></i></i>Edit Scheme</a>
                                         <li><a href="#" onclick="schemeStatus()" id="active"></i></i>Activate Scheme</a>
                                         </li>
                                         </ul>
                                    </div>`
                                : data;
                            }
                        }
                    ]
                });
            },
            error: function (obj, textstatus) {
                console.log(obj.errorMessage);
            }
        });
        }
        else{
            window.location = "errorPage.html";
        }
        });
 $(function() {
            var noofyears = 5;
            var thisYear = (new Date()).getFullYear();
            for (var i = 0; i < noofyears; i++) {
            var year = thisYear - i;
            $('<option>', { value: year, text: year }).appendTo("#ddlyear");
            }
        });

 $("#saveSchemeData").click(function() {

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

               } else
                {
                    return false;
                }
                })

             var year = document.getElementById("ddlyear").value;
             var name = document.getElementById("name").value;
              if(name == "")
                 {
                     alert("Scheme name can't be empty");
                     return false;
                 }
             var assitanceMode = document.getElementById("assitanceMode").value;

             var programmeComponent = document.getElementById("programmeComponent").value;
              if(programmeComponent == "")
              {
                  alert("Programme component can't be empty");
                  return false;
              }
             var rateOfSubsidy = document.getElementById("rateOfSubsidy").value;

              if(rateOfSubsidy == "")
              {
               alert("Rate Of subsidy can't be empty");
               return false;
              }

             var unitCost = parseFloat(document.getElementById("unitCost").value);

               if(unitCost == "")
              {
                alert("unit cost can't be empty");
                return false;
              }

             var implementationProcedure = document.getElementById("implementationProcedure").value;
             var allotmentYear = document.getElementById("allotmentYear").value;

             if(allotmentYear == "")
             {
             alert("allotment year can't be empty");
             return false;
             }

             var allotmentAmount= parseFloat(document.getElementById("allotmentAmount").value);
              if(allotmentAmount == "")
              {
              alert("Allotment amount can't be empty");
              return false;
              }

             var target = document.getElementById("target").value;
             var schemeOf = $('#schemeof option:selected').text();


     var scheme_data_save = {

                 "deptId" : deptId,

                 "name" : name,

                 "year" : year,

                 "assitanceMode" : assitanceMode,

                 "programmeComponent" : programmeComponent,

                 "rateOfSubsidy" : rateOfSubsidy,

                 "unitCost" :unitCost,

                 "implementationProcedure":implementationProcedure,

                 "allotmentYear":allotmentYear,

                 "allotmentAmount":allotmentAmount,

                 "target":target,

                 "schemeOf":schemeOf,

                 "createdBy" : userId,

                 "updatedBy" : userId,

             }

              $.ajax({
                         url: service_url + '/saveScheme',
                         type: 'POST',
                         data: JSON.stringify(scheme_data_save),
                         dataType : 'json',
                         contentType: 'application/json',
                         success: function (data) {
                             console.log(scheme_data_save);
                             if (data.status == 1){
                                 Swal.fire({
                                   text: 'Successfully Added!',
                                   icon: 'success',
                                   confirmButtonText: 'OK'
                                 })
                                 .then((redirect)=>{
                                     window.location = "scheme.html";
                                 })
                             }else{
                                 console.log(data.errorMessage);
                             }
                         }
                     });



                //Deactivate Button in a particular a scheme
                $('#schemeStatus').on('click', ".active-button", function(){
                    var btns = $(this)
                    schemeList.forEach((scheme) => {
                            if(scheme.active == true){
                                scheme.active = false;
                                btns.removeClass("btn-success");
                                btns.addClass("btn-danger");
                                btns.text('Deactivated');
                            }
                            else{
                                scheme.active = true;
                                scheme.removeClass("btn-danger");
                                scheme.addClass("btn-success");
                                scheme.text('Active');
                            }
                            console.log(auth.active);

                    })
                })
                     });

