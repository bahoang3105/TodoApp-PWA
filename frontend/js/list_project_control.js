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
        document.getElementById("btn_add_new_project").onclick = function () {
            addNewProject()
        }
    } else {
        document.getElementById("btn_add_new_project").style.backgroundColor = "rgb(233, 169, 169)";
        document.getElementById("btn_add_new_project").onclick = function () {
        };
    }
}

async function fetchProject(projectID, projectName) {
    const url = window.API_URL + '/addNewProject.php'
    return await fetch(url, {
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
}

async function addNewProject() {
    console.log('add new project')
    var nameProj = document.getElementById("new_project_name").value;
    var d = new Date();
    var time = Math.round(d.getTime() / 1000);
    let res;
    try {
        if (navigator.onLine) {
            await fetchProject(time, nameProj)
        } else {
            projectQueue.push({projectID: time, projectName: nameProj})
        }

        document.getElementById("projects_list").innerHTML += getProject(time, nameProj);

        // save to indexedDB
        console.log('add project event trigger', res)
        const taskReadWriteTransaction = db.transaction('project', 'readwrite')
        const newObject = taskReadWriteTransaction.objectStore('project')

        console.log('time', time)
        newObject.add({
            projectID: time,
            projectName: nameProj
        })

        taskReadWriteTransaction.onsuccess = (e) => {
            console.log('data added')
        }

    } catch (err) {
        console.log(err + " ")
    }
    addProjectModal.style.display = "none";
}

function getProject(projectId, projectName) {
    var url = new URL(window.location.href);
    var html_code = '';
    //if (navigator.onLine) {
    if (url == "http://localhost/todo/frontend/index.html") {
        html_code += '<a class="a" href="/todo/frontend/pages/project.html?projectId=' + projectId + '">';
    } else html_code += '<a class="a" href="pages/project.html?projectId=' + projectId + '">';


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

function getProjectArchived(projectId, projectName) {
    var url = new URL(window.location.href);
    var html_code = '';
    if (url == "http://localhost/todo/frontend/index.html") {
        html_code += '<a href="/todo/frontend/pages/project_archived.html?projectId=' + projectId + '">';
    } else html_code += '<a href="project_archived.html?projectId=' + projectId + '">';
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

function getProjectFromIndexedDB() {
    console.log('offline project mode trigger!')
    let transaction = db.transaction(["project"]);
    let objectStore = transaction.objectStore("project");
    let request = objectStore.openCursor();

    request.onerror = function (event) {
        console.log("error fetching data");
    };
    request.onsuccess = function (event) {
        // Do something with the request.result!
        let cursor = event.target.result;
        if (cursor) {
            let key = cursor.primaryKey;
            let value = cursor.value;
            console.log(key, value);
            document.getElementById("projects_list").innerHTML += getProject(key, value.projectName);
            cursor.continue();
        } else {
            // no more results
        }
    };
}

async function getProjectFromDB() {
    try {
        const url = window.API_URL + '/getProjectName.php'
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        var i;
        for (i = 0; i < res.length; i++) {
            if (res.array[i][2] == 0) {
                document.getElementById("projects_list").innerHTML += getProject(res.array[i][0], res.array[i][1]);
            } else if (res.array[i][2] == 1) {
                document.getElementById("projects_archived_list").innerHTML += getProjectArchived(res.array[i][0], res.array[i][1]);
            }
        }
    } catch (err) {
        console.log(err + " ")
    }
}

document.getElementById("projects_archived_list").style.display = "none";