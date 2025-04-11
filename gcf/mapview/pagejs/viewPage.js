var canEdit = localStorage.getItem("canEdit");
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
        url: service_url + '/getAllUserbyRole/' + userId + '/' + deptId + '/' + roleId,
        dataType: 'json',
        success: function (obj, textstatus) {
            //console.log(obj.posts);
            $('#usertable').DataTable({
                data: (obj.post[0]),
                //paging : false,
                columnDefs : [
                { width: 200, targets: 0 }
                ],
                fixedColumns: true,
                  scrollX: true,


                columns: [
                    //{ title : "UserId", data:"userId"},
                    { title : "FirstName", data:"firstName"},
                    { title : "MiddleName", data:"middleName"},
                    { title : "LastName", data:"lastName"},
                    //{ title : "UserName", data:"userName"},
                    //{ title : "Role", data:"roleName"},
                    { title : "Role",
                        data: 'userRoles.roleName',
                        render: function(data, type, row, meta) {
                            return data
                        }
                    },
                    { title : "Designation",
                        data: 'designationModel.name',
                        render: function(data, type, row, meta) {
                            return data
                        }
                    },
                    //{ title : "Designation", date:"designationName"},
                    { title : "Mobile", data:"mobile"},
                    { title : "Email", data:"email"},
                    { title : "Active", data:"isActive"},

                    { title : "Action",
                        data: 'userId',
                        render: function(data, type, row, meta) {
                            return type === 'display' ?
                                `<div class="dropdown">
                                    <a href="#" class="dropdown-toggle set_new_font" data-toggle="dropdown" role="button" aria-haspopup="true"
                                     aria-expanded="false">
                                        <i class="glyphicon glyphicon-cog set_pos_usermenu"
                                        style="font-size: 20px;"></i>
                                     </a>
                                     <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                     <li><a href="#" onclick="editUser('${data}')" ><i class="fa fa-edit"></i></i>Edit User</a>
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

    function editUser(userId){
        if(canEdit == "true"){
            window.location = 'EditUserDetails.html?id='+userId;
        }
        else{
            //alert("Permission Denied!");
            Swal.fire({
              title: 'Error!',
              text: 'Permission Denied!',
              icon: 'error',
              confirmButtonText: 'GO BACK'
            })
        }
    }








