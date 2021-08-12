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
                document.getElementById("confirm_delete_project_name").innerHTML = res.array[i][1];
            }
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

async function unarchive_project() {
    try {
        const url1 = window.API_URL + '/completeProject.php'
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
            window.location = "http://localhost/todo/frontend/index.html";
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}



var deleteProjectModal = document.getElementById("deleteProjectModal");

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

document.getElementById("btn_confirm_delete_project").onclick = function () {
    deleteProject();
}

function getTaskProjectArchived(task_id, task_content_label, deadline, timeOfDay, assignPerson) {
    var html_code = '';
    html_code += '<li class="task_list_item" id="task-' + task_id + '">';
    html_code += '<div class="task_list_item__body">';
    html_code += '<button type="button" style="background-color: white; border: none; margin-bottom: 17px;"><i class="fa fa-circle-o w3-large"></i></button>'
    html_code += '<div class="task_list_item__content" id="task-' + task_id + '-content" >';
    html_code += '<div class="task_list_item__content__content_wrapper">';
    html_code += '<div id="task-content-label-' + task_id + '" class="downmark_content task_content">' + task_content_label + '</div>';
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

async function getTaskProjectFromDB() {
    try {
        const url1 = window.API_URL + '/getTaskInProject.php'
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
                    document.getElementById("project_archived_task").innerHTML += getTaskProjectArchived(res.array[i][0], res.array[i][1], date, time, res.array[i][4]);
                }
                else {
                    document.getElementById("project_archived_task").innerHTML+= getTaskCompletedProject(res.array[i][0], res.array[i][1], date, time, res.array[i][4]);
                }
            }
        }
    } catch (err) {
        console.log(err + " ")
    }
}

getTaskProjectFromDB();