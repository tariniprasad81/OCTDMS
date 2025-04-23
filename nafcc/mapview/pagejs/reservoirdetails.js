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
            type: "GET",
            url: service_url + '/getAllReservoirDetails',
            dataType: 'json',
            beforeSend: function() {
                $('.loading').css('display','block');
            },
            success: function (obj, textstatus) {
                $('#reservoirtable').DataTable({
                    data: obj.post[0],

                    columnDefs : [
                    { width: 200, targets: 0 }
                    ],
                    fixedColumns: true,

                    columns: [

                        { title : "Reservoir Name", data:"reservoirName"},
                        { title : "Ews Area Unit", data:"ewsAreaUnit"},
                        { title : "Ews Area", data:"ewsArea"},
                        { title : "Type", data:"type"}

                    ]
                });
            },
            complete: function() {
                $('.loading').css('display','none');
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