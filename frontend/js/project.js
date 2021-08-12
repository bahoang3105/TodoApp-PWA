var url = new URL(window.location.href);

async function getNameProj() {
    try {
        const url1 = window.API_URL + '/getProjectName.php'
        
        let data = await fetch(url1, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        var i;
        for (i = 0; i < res.length; i++) {
            if(url.searchParams.get('projectId') == res.array[i][0]) {
                document.getElementById("project_name").innerHTML = res.array[i][1];
                document.getElementById("project_name_edit").value = res.array[i][1];
            }
        }
    } catch (err) {
        console.log(err + " ")
    }
}

// create notification
async function createNotification(recv, projectID, action) {
    shareProjectModal.style.display = "none";
    try {
        const url1 = window.API_URL + '/createNoti.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "recv": recv,
                "projectID": projectID,
                "action": action
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.success) {
            alert("Successfully invited");
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

document.getElementById("div_list_project").classList.add("collapse--entered");
document.getElementById("ic_open_list_projects").style.display = "none";
document.getElementById("ic_close_list_projects").style.display = "flex";


var addProjectModal = document.getElementById("addProjectModal");
var shareProjectModal = document.getElementById("shareProjectModal");
var deleteProjectModal = document.getElementById("deleteProjectModal");
var leaveProjectModal = document.getElementById("leaveProjectModal");

document.getElementById("btn_add_project").onclick = function () {
    addProjectModal.style.display = "block";
    controlLeftMenu();
}

document.getElementById("btn_close_add_project_modal").onclick = function () {
    addProjectModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == addProjectModal) {
        addProjectModal.style.display = "none";
    }
}

document.getElementById("new_project_name").oninput = function () {
    if (document.getElementById("new_project_name").value != '') {
        document.getElementById("btn_add_new_project").style.backgroundColor = "rgb(218, 14, 14)";
        document.getElementById("btn_add_new_project").onclick = function () { addNewProject(document.getElementById("new_project_name").value) }
    } else {
        document.getElementById("btn_add_new_project").style.backgroundColor = "rgb(233, 169, 169)";
        document.getElementById("btn_add_new_project").onclick = function () { };
    }
}

document.getElementById("btn_share_project").onclick = function () {
    shareProjectModal.style.display = "block";
}

document.getElementById("btn_close_invite").onclick = function () {
    shareProjectModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == shareProjectModal) {
        shareProjectModal.style.display = "none";
    }
}

document.getElementById("person_name").oninput = function () {
    if (document.getElementById("person_name").value != '') {
        document.getElementById("btn_invite").style.backgroundColor = "rgb(218, 14, 14)";
        document.getElementById("btn_invite").onclick = function () { createNotification(document.getElementById("person_name").value, url.searchParams.get('projectId'), 0) }
        searchUser(document.getElementById("person_name").value);
    } else {
        document.getElementById("btn_invite").style.backgroundColor = "rgb(233, 169, 169)";
        document.getElementById("btn_invite").onclick = function () { };
    }
}

document.getElementById("btn_delete_project").onclick = function () {
    deleteProjectModal.style.display = "block";
}

document.getElementById("btn_close_delete").onclick = function () {
    deleteProjectModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == deleteProjectModal) {
        deleteProjectModal.style.display = "none";
    }
}

document.getElementById("btn_leave_project").onclick = function () {
    leaveProjectModal.style.display = "block";
}

document.getElementById("btn_close_leave").onclick = function () {
    leaveProjectModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == leaveProjectModal) {
        leaveProjectModal.style.display = "none";
    }
}

document.getElementById("btn_confirm_delete_project").onclick = function () {
    deleteProject();
}

document.getElementById("btn_confirm_leave_project").onclick = function () {
    leaveProject();
}

document.getElementById("btn_archive_project").onclick = function () {
    archive_project(url.searchParams.get("projectId"));
}

async function addTaskProject(deadline, content, projectID) {
    try {
        const url = window.API_URL + '/addTaskProject.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "content": content,
                "deadline": deadline,
                "projectID": projectID
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.success) {
            window.location = '';
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function invitePerson(person_name) {
    try {
        console.log(person_name + " " + url.searchParams.get("projectId"));
        const url1 = window.API_URL + '/addUserToProj.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "username": person_name,
                "projectID": url.searchParams.get("projectId")
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.success) {
            window.location = '';
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
    shareProjectModal.style.display = "none";
}

async function save_changed_project() {
    var projectName = document.getElementById('project_name_edit').value;
    var projectID = url.searchParams.get('projectId');
    try {
        const url = window.API_URL + '/editprojectName.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "projectName": projectName,
                "projectID": projectID
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.success) {
            document.getElementById('project_name').innerHTML = projectName;
            document.getElementById("project_name").style.display = "flex";
            document.getElementById("project_name_edit").style.display = "none";
            document.getElementById("btn_edit_project").innerHTML = '<i class="fa fa-edit w3-large"></i>';
            document.getElementById("btn_edit_project").onclick = function () {
                edit_project();
            }
            document.getElementById('project_'+projectID).children[0].children[0].children[0].children[1].innerHTML = projectName;
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function archive_project(projectId) {
    try {
        const url1 = window.API_URL + '/completeProject.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "projectID": projectId
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.success) {
            window.location = "http://localhost/todo/frontend/index.html";
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function deleteProject() {
    try {
        const url1 = window.API_URL + '/deleteProject.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "projectID": url.searchParams.get("projectId")
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();  
        if(res.success) {
            window.location = '../index.html';
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }

}


async function leaveProject() {
    try {
        const url1 = window.API_URL + '/leaveProject.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "projectID": url.searchParams.get('projectId')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(!res.success) {
            console.log(res.message);
        }
        else {
            window.location = 'http://localhost/todo/frontend/index.html';
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function searchUser(substr) {
    substr = "%" + substr + "%";
    try {
        const url1 = window.API_URL + '/searchUser.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "subName": substr,
                "projectID": url.searchParams.get("projectId")
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        var i;
        document.getElementById("list_users").innerHTML = '';
        for(i = 0; i < res.length && i < 6; i++) {
            document.getElementById("list_users").innerHTML += '<option value=' + res.array[i][1] + '></option>';
        }
    } catch (err) {
        console.log(err + " ")
    }
}

function edit_project() {
    document.getElementById("project_name").style.display = "none";
    document.getElementById("project_name_edit").style.display = "flex";
    document.getElementById("btn_edit_project").innerHTML = '';
    document.getElementById("btn_edit_project").innerHTML = '<i class="fa fa-check w3-large"></i>';
    document.getElementById("btn_edit_project").onclick = function () {
        save_changed_project();
    }
}

function openAssignPerson(task_id) {
    document.getElementById("assinged_person_name_" + task_id).style.display = "none";
    document.getElementById("project_members_" + task_id).style.display = "flex";
    document.getElementById("btn_close_assign_" + task_id).style.display = "flex";
}

function closeAssignPerson(task_id) {
    document.getElementById("assinged_person_name_" + task_id).style.display = "flex";
    document.getElementById("project_members_" + task_id).style.display = "none";
    document.getElementById("btn_close_assign_" + task_id).style.display = "none";
}

async function assignPerson(task_id, assignee) {
    try {
        const url1 = window.API_URL + '/assignTask.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({ 
                "taskID": task_id,
                "assignee": assignee,
                "projectName": url.searchParams.get('projectId')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        })
        let res = await data.json();
        if(!res.success) {
            console.log(res.message);
        }
        else {
            document.getElementById("assinged_person_name_" + task_id).innerHTML = assignee;
            closeAssignPerson(task_id);
        }
    } catch (err) {
        console.log(err + " ")
    }   
}

function showCompletedTask() {
    document.getElementById("btn_show_completed_task").innerHTML = "Hide completed task";
    if (document.getElementById("list_task_completed_project__content").style.display == "none") {
        document.getElementById("list_task_completed_project__content").style.display= "inline";
    }
    document.getElementById("btn_show_completed_task").onclick= function() {
        hideCompletedTask();
    }
}

function hideCompletedTask() {
    document.getElementById("btn_show_completed_task").innerHTML = "Show completed task";
    document.getElementById("list_task_completed_project__content").style.display= "none";
    document.getElementById("btn_show_completed_task").onclick= function() {
        showCompletedTask();
    }
}

function getProject(projectId, projectName) {
    var html_code = '';
    html_code += '<a href="project.html?projectId=' + projectId + '">';
    html_code += '    <li id="project_' + projectId + '">';
    html_code += '        <table class="item_table">';
    html_code += '            <tbody>';
    html_code += '                <tr>';
    html_code += '                    <td class="td_color"><i class="fa fa-circle w3-small" style="color: gray; "></i></td>';
    html_code += '                    <td class="name"><span class="text">' + projectName + '</span></td>';
    html_code += '                </tr>'
    html_code += '           </tbody>'
    html_code += '        </table>'
    html_code += '    </li>'
    html_code += '</a>'
    return html_code;
}

async function getUserInProject() {
    try {
        const url1 = window.API_URL + '/getUserInProject.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({ 
                "projectID": url.searchParams.get('projectId')
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        })
        let res = await data.json();
        if(!res.success) {
            alert("Truy cập trái phép");
            window.location = "../404.html";
        }
        else {
            var i;
            var html_code = '';
            for (i = 0; i < res.length; i++) {
                html_code += '  <option value="' + res.array[i][1] + '">' + res.array[i][1] + '</option>';
            }
        }
    } catch (err) {
        console.log(err + " ")
    }

    return html_code;
}

function getTaskProject(task_id, task_content_label, deadline, timeOfDay, asssinged_person, code) {
    var html_code = '';
    html_code += '<li class="task_list_item" id="task-' + task_id + '">';
    html_code += '<div role="button" class="task_list_item__body">';
    html_code += '<button type="button" value="check-task-' + task_id + '" aria-checked="false" role="checkbox" class="task_checkbox priority_1" onclick="completeTask(' + task_id + ')">';
    html_code += '<div class="task_checkbox__circle">';
    html_code += '<svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg></div></button>';
    html_code += '<div class="task_list_item__content" id="task-' + task_id + '-content">';
    html_code += '<div class="task_list_item__content__content_wrapper">';
    html_code += '<div id="task-content-label-' + task_id + '" class="downmark_content task_content" onclick="openChangeModal(' + task_id + ')">' + task_content_label + '</div>';
    html_code += '<div class="task_editor__content_field">';
    html_code += '<input id="contentOfEditTask-' + task_id + '" type="text" style="display: none;" name="input-task-content" placeholder="do somthing">';
    html_code += '</div>';
    html_code += '<button id="btn-saveEditTaskContent-' + task_id + '" type="button" class="delete_task_btn" style="color: green; margin-right: 0px; display: none;">Save</button>';
    html_code += '<button id="btn-cancelEditTaskContent-' + task_id + '" onclick="closeChangeModal(' + task_id + ')" type="button" class="delete_task_btn" style="color: black; margin-right: 0px; display: none;">Cancel</button>';
    html_code += '<div class="delete_task"><button type="button" value="delete-task-' + task_id + '" class="delete_task_btn" onclick="deteleTask(' + task_id + ')"><i class="fa fa-trash-o"></i></button></div>';
    html_code += '</div>';
    html_code += '<div class="task_list_item__info_tags">';
    var dateToday = getDateToday();
    if (deadline < dateToday) {
        html_code += '<input id="inputDatePicker-' + task_id + '" style="margin-right: 10px; border: none; outline: none; cursor: pointer; color: red; width: 120px;" min="' + getDateToday() + '" type="date" value="' + deadline + '" onchange="reschedueTask(' + task_id + ', this.value)"/>';
        html_code += '<input id="inputTimeTodaytask-' + task_id + '" style="border: none; outline: none; cursor: pointer; color: red; width: 90px; display: flex;" type="time" value="' + timeOfDay + '" onchange="changeTimeToday(' + task_id + ', this.value)"/>';
    } else if (deadline > dateToday) {
        html_code += '<input id="inputDatePicker-' + task_id + '" style="margin-right: 10px; border: none; outline: none; cursor: pointer; color: purple; width: 120px;" min="' + getDateToday() + '" type="date" value="' + deadline + '" onchange="reschedueTask(' + task_id + ', this.value)"/>';
        html_code += '<input id="inputTimeTodaytask-' + task_id + '" style="border: none; outline: none; cursor: pointer; color: purple; width: 90px; display: flex;" type="time" value="' + timeOfDay + '" onchange="changeTimeToday(' + task_id + ', this.value)"/>';
    } else {
        html_code += '<input id="inputDatePicker-' + task_id + '" style="margin-right: 10px; border: none; outline: none; cursor: pointer; color: green; width: 120px;" min="' + getDateToday() + '" type="date" value="' + deadline + '" onchange="reschedueTask(' + task_id + ', this.value)"/>';
        if (timeOfDay < getTimeNow()) {
            html_code += '<input id="inputTimeTodaytask-' + task_id + '" style="border: none; outline: none; cursor: pointer; color: red; width: 90px; display: flex;" type="time" value="' + timeOfDay + '" onchange="changeTimeToday(' + task_id + ', this.value)"/>';
        }
        else html_code += '<input id="inputTimeTodaytask-' + task_id + '" style="border: none; outline: none; cursor: pointer; color: green; width: 90px; display: flex;" type="time" value="' + timeOfDay + '" onchange="changeTimeToday(' + task_id + ', this.value)"/>';
    }
    html_code += '<div class="task_list_item__project">'
    if (asssinged_person != null) {
        html_code += '<span class="task_list_item__project__label" id="assinged_person_name_' + task_id + '" onclick="openAssignPerson(' + task_id + ')">' + asssinged_person + '</span>';
    } else {
        html_code += '<span class="task_list_item__project__assign" id="assinged_person_name_' + task_id + '" onclick="openAssignPerson(' + task_id + ')"><i class="fa fa-user-o" style="margin-right: 5px; padding-top: 1px;"></i>Assign</span>';
    }
    html_code += '<select class="task_list_item__project__label" id="project_members_' + task_id + '" style="display: none;" onchange="assignPerson('+ task_id +', this.value)">';
    html_code += code;
    html_code += '</select>';
    html_code += '<i id="btn_close_assign_' + task_id + '" class="fa fa-close w3-small" style="display : none;" onclick="closeAssignPerson(' + task_id + ')"></i>';
    html_code += '</div>'
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</li>';
    return html_code;
}

function getTaskCompletedProject(task_id, task_content_label, deadline, timeOfDay, assignPerson) {
    var html_code = '';
    html_code += '<li class="task_list_item" id="task-' + task_id + '">';
    html_code += '<div class="task_list_item__body">';
    html_code += '<button type="button" style="background-color: white; border: none; margin-bottom: 17px;"><i class="fa fa-check-circle w3-large checked_icon"></i></button>'
    html_code += '<div class="task_list_item__content" id="task-' + task_id + '-content" >';
    html_code += '<div class="task_list_item__content__content_wrapper">';
    html_code += '<div id="task-content-label-' + task_id + '" class="downmark_content task_content" style="text-decoration: line-through;">' + task_content_label + '</div>';
    html_code += '<div class="delete_task"><button type="button" value="delete-task-' + task_id + '" class="delete_task_btn" onclick="deteleTask(' + task_id + ')"><i class="fa fa-trash-o"></i></button></div>';
    html_code += '</div>';
    html_code += '<div class="task_list_item__info_tags">';
    html_code += '<p>'+deadline+'</p>';
    html_code += '<p>'+timeOfDay+'</p>';
    html_code += '<div class="task_list_item__project">';
    if (assignPerson != null) {
        html_code += '<span class="task_list_item__project__label">' + assignPerson + '</span>';
    }
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</li>';
    return html_code;
}

async function getTaskProjectFromDB(projID) {
    try {
        const url = window.API_URL + '/getTaskInProject.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "projectID": projID
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        })
        let res = await data.json();
        let code = await getUserInProject();
        if(!res.success) {
            alert("Truy cập trái phép");
            window.location = "../404.html";
        }
        else {
            var i;
            for (i = 0; i < res.length; i++) {
                var date = res.array[i][2].substring(0, 10);
                var time = res.array[i][2].substring(11, 16);
                if(res.array[i][3] == 0) {
                    if(res.array[i][4] === null ) {
                        document.getElementById("project_task").innerHTML += getTaskProject(res.array[i][0], res.array[i][1], date, time, null, code);
                    }
                    else {
                        document.getElementById("project_task").innerHTML += getTaskProject(res.array[i][0], res.array[i][1], date, time, res.array[i][4], code);
                    }
                }
                else {
                    document.getElementById("list_task_completed_project__content").innerHTML += getTaskCompletedProject(res.array[i][0], res.array[i][1], date, time, res.array[i][4]);
                }
            }
        }
    } catch (err) {
        console.log(err + " ")
    }
}



getTaskProjectFromDB(url.searchParams.get('projectId'));

document.getElementById("deadline_task_project").value = getDateToday();
document.getElementById("deadline_task_project").setAttribute("min", getDateToday());
