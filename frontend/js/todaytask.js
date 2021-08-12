window.API_URL = 'http://localhost/todo/backend/api';

function expandQuickFind() {
    document.getElementById("quick_find").classList.add("active");
}

function collapseQuickFind() {
    document.getElementById("quick_find").classList.remove("active");
}

function controlLeftMenu() {
    if (document.documentElement.className == "left_menu_show") {
        document.documentElement.className = "left_menu_hide";
        document.getElementById("holder_overlay").classList.replace("left_menu_overlay-enter-done", "left_menu_overlay-exit-done");
    } else {
        document.documentElement.className = "left_menu_show";
        document.getElementById("holder_overlay").classList.replace("left_menu_overlay-exit-done", "left_menu_overlay-enter-done")
    }
}

function controlListProject() {
    if (document.getElementById("div_list_project").classList.contains("collapse--entered")) {
        document.getElementById("div_list_project").classList.remove("collapse--entered");
        document.getElementById("ic_open_list_projects").style.display = "flex";
        document.getElementById("ic_close_list_projects").style.display = "none";

    } else {
        document.getElementById("div_list_project").classList.add("collapse--entered");
        document.getElementById("ic_open_list_projects").style.display = "none";
        document.getElementById("ic_close_list_projects").style.display = "flex";
    }
}

function show_archived_project() {
    document.getElementById("show_archived_project").style.display = "none";
    document.getElementById("hide_archived_project").style.display = "flex";
    document.getElementById("projects_archived_list").style.display = "flex";
}


function hide_archived_project() {
    document.getElementById("show_archived_project").style.display = "flex";
    document.getElementById("hide_archived_project").style.display = "none";
    document.getElementById("projects_archived_list").style.display = "none";
}

let today = getToday();

function getToday() {
    let d = new Date();
    let day = d.getDay();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    switch (day) {
        case 0: {
            day = "Chủ nhật";
            break;
        }
        case 1: {
            day = "Thứ 2";
            break;
        }
        case 2: {
            day = "Thứ 3";
            break;
        }
        case 3: {
            day = "Thứ 4";
            break;
        }
        case 4: {
            day = "Thứ 5";
            break;
        }
        case 5: {
            day = "Thứ 6";
            break;
        }
        case 6: {
            day = "Thứ 7";
            break;
        }

    }

    return day + ", " + date + "/" + month + "/" + year;
}

function getDateToday() {
    let d = new Date();
    let date = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    let year = '' + d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (date.length < 2)
        date = '0' + date;

    return year + "-" + month + "-" + date;
}

function getTimeNow() {
    let d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();

    if (hour.length < 2)
        hour = '0' + hour;
    if (minute.length < 2)
        minute = '0' + minute;

    return hour + ":" + minute;
}

function openDatePickerReschedue() {
    document.getElementById("btn-reschedue-all").style.display = "none";
    document.getElementById("input-reschedue-all").style.display = "inline";
    document.getElementById("input-reschedue-all").setAttribute("min", getDateToday());
    document.getElementById("close-reschedue-all").style.display = "inline";
}

function openDatePickerReschedueOverDue() {
    document.getElementById("btn-reschedue-all").style.display = "none";
    document.getElementById("input-reschedue-all").style.display = "inline";
    document.getElementById("input-reschedue-all").setAttribute("max", getDateToday());
    document.getElementById("input-reschedue-all").setAttribute("value", getDateToday());
    document.getElementById("close-reschedue-all").style.display = "inline";
}

function closeDatePickerReschedue() {
    document.getElementById("btn-reschedue-all").style.display = "inline";
    document.getElementById("input-reschedue-all").style.display = "none";
    document.getElementById("close-reschedue-all").style.display = "none";
}

function openDatePickerTodayTask(task_id) {
    document.getElementById("btn-openDatePickerTodayTask-" + task_id).style.display = "none";
    document.getElementById("inputDatePickerTodaytask-" + task_id).style.display = "inline";
    document.getElementById("btn-closeDatePickerTodayTask-" + task_id).style.display = "inline";
}

function closeDatePickerTodayTask(task_id) {
    document.getElementById("btn-openDatePickerTodayTask-" + task_id).style.display = "inline";
    document.getElementById("inputDatePickerTodaytask-" + task_id).style.display = "none";
    document.getElementById("btn-closeDatePickerTodayTask-" + task_id).style.display = "none";

}

function openManagerNewTask() {
    document.getElementById("controller-actions").style.display = "none";
    document.getElementById("manger-new-task").style.display = "inline";
}

function closeManagerNewTask() {
    document.getElementById("manger-new-task").style.display = "none";
    document.getElementById("controller-actions").style.display = "inline";
}


function openChangeModal(task_id) {
    document.getElementById("task-content-label-" + task_id).style.display = "none";
    document.getElementById("contentOfEditTask-" + task_id).style.display = "inline";
    document.getElementById("contentOfEditTask-" + task_id).setAttribute("value", document.getElementById("task-content-label-" + task_id).innerHTML);
    document.getElementById("btn-saveEditTaskContent-" + task_id).style.display = "inline";
    document.getElementById("btn-saveEditTaskContent-" + task_id).onclick = function () {
        updateTask(task_id)
    };
    document.getElementById("btn-cancelEditTaskContent-" + task_id).style.display = "inline";
}

function closeChangeModal(task_id) {
    document.getElementById("task-content-label-" + task_id).style.display = "inline";
    document.getElementById("contentOfEditTask-" + task_id).style.display = "none";
    document.getElementById("btn-saveEditTaskContent-" + task_id).style.display = "none";
    document.getElementById("btn-cancelEditTaskContent-" + task_id).style.display = "none";
}

function addTimeToday() {
    document.getElementById("btn_addTime").style.display = "none";
    document.getElementById("input_addTime").style.display = "flex";
    document.getElementById("btn_closeAddTime").style.display = "flex";
}

function closeAddTimeToday() {
    document.getElementById("btn_addTime").style.display = "flex";
    document.getElementById("input_addTime").value = null;
    document.getElementById("input_addTime").style.display = "none";
    document.getElementById("btn_closeAddTime").style.display = "none";
}

function openTimeTodayTask(task_id) {
    document.getElementById("btn-openTimeTodayTask-" + task_id).style.display = "none";
    document.getElementById("inputTimeTodaytask-" + task_id).style.display = "flex";
    document.getElementById("btn-closeTimeTodayTask-" + task_id).style.display = "flex";
}

function closeTimeTodayTask(task_id) {
    document.getElementById("btn-openTimeTodayTask-" + task_id).style.display = "flex";
    document.getElementById("inputTimeTodaytask-" + task_id).style.display = "none";
    document.getElementById("btn-closeTimeTodayTask-" + task_id).style.display = "none";
}

function getTaskToday(task_id, task_content_label, timeOfDay) {
    let html_code = '';
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
    html_code += '<button id="btn-openDatePickerTodayTask-' + task_id + '" type="button" style="color: green;" onclick="openDatePickerTodayTask(' + task_id + ')">Today</button>';
    html_code += '<input id="inputDatePickerTodaytask-' + task_id + '" style="margin-right: 10px; border: none; outline: none; cursor: pointer; color: green; width: 120px; display: none;" min="' + getDateToday() + '" type="date" value="' + getDateToday() + '" onchange="reschedueTask(' + task_id + ', this.value)"/>';
    html_code += '<button id="btn-closeDatePickerTodayTask-' + task_id + '" type="button" style="color: black; display: none;" onclick="closeDatePickerTodayTask(' + task_id + ')"><i class="fa fa-times w3-small"></i></button>';
    if (timeOfDay < getTimeNow()) {
        html_code += '<input id="inputTimeTodaytask-' + task_id + '" style="border: none; outline: none; cursor: pointer; color: red; width: 90px; display: flex;" type="time" value="' + timeOfDay + '" onchange="changeTimeToday(' + task_id + ', this.value)"/>';
    } else html_code += '<input id="inputTimeTodaytask-' + task_id + '" style="border: none; outline: none; cursor: pointer; color: green; width: 90px; display: flex;" type="time" value="' + timeOfDay + '" onchange="changeTimeToday(' + task_id + ', this.value)"/>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</li>';
    return html_code;
}


function getTaskOverdue(task_id, task_content_label, scheduled_time) {
    let html_code = '';
    html_code += '<li class="task_list_item" id="task-' + task_id + '">';
    html_code += '<div role="button" class="task_list_item__body">';
    html_code += '<button type="button" value="check-task-' + task_id + '" aria-checked="false" role="checkbox" class="task_checkbox priority_1" onclick="completeTask(' + task_id + ')">';
    html_code += '<div class="task_checkbox__circle">';
    html_code += '<svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg></div></button>';
    html_code += '<div class="task_list_item__content" id="task-' + task_id + '-content" >';
    html_code += '<div class="task_list_item__content__content_wrapper">';
    html_code += '<div id="task-content-label-' + task_id + '" class="downmark_content task_content" onclick="openChangeModal(' + task_id + ')">' + task_content_label + '</div>';
    html_code += '<div class="task_editor__content_field">';
    html_code += '<input id="contentOfEditTask-' + task_id + '" type="text" style="display: none;" name="input-task-content" value="' + task_content_label + '" placeholder="do somthing">';
    html_code += '</div>';
    html_code += '<button id="btn-saveEditTaskContent-' + task_id + '" type="button" class="delete_task_btn" style="color: green; margin-right: 0px; display: none;">Save</button>';
    html_code += '<button id="btn-cancelEditTaskContent-' + task_id + '" onclick="closeChangeModal(' + task_id + ')" type="button" class="delete_task_btn" style="color: black; margin-right: 0px; display: none;">Cancel</button>';
    html_code += '<div class="delete_task"><button type="button" value="delete-task-' + task_id + '" class="delete_task_btn" onclick="deteleTask(' + task_id + ')"><i class="fa fa-trash-o"></i></button></div>';
    html_code += '</div>';
    html_code += '<div class="task_list_item__info_tags">';
    html_code += '<input style=" margin-right: 10px; border: none; outline: none; cursor: pointer; color: red; width: 120px;" min="' + getDateToday() + '" type="date" value="' + scheduled_time + '" onchange="reschedueTask(' + task_id + ', this.value)"/>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</li>';
    return html_code;
}

async function fetchAddTask(deadline, content, taskID) {
    console.log('fetchAddTask')
    console.log('taskID', taskID)
    const url = window.API_URL + '/addTask.php'
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            "content": content,
            "deadline": deadline,
            "taskID": taskID
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

async function addTask(deadline, content) {
    let d = new Date();
    let time = Math.round(d.getTime() / 1000);
    let res;
    try {
        if (navigator.onLine) {
            let data = await fetchAddTask(deadline, content, time)
            res = await data.json();
        } else {
            addTaskQueue.push({deadline: deadline, content: content, taskID: time})
        }

        let date = deadline.substring(0,10);
        if(window.location.href == "http://localhost/todo/frontend/index.html") {
            document.getElementById("today1").innerHTML += getTaskToday(time, content, deadline.substring(11,16));
            closeManagerNewTask();
        }
        else {
            document.getElementById("list_task_"+date).innerHTML+= getTaskUpcoming(time,content, date, deadline.substring(11,16));
            closeManagerNewTaskUpcoming(date);
        }


        // save to indexedDB
        console.log('add task event trigger', res)
        const taskReadWriteTransaction = db.transaction('task', 'readwrite')
        const newObject = taskReadWriteTransaction.objectStore('task')

        console.log('time', time)
        newObject.add({
            taskID: time,
            status: 0,
            content: content,
            deadline: deadline,
            userID: 0,
            projectID: null,
            assignee: null
        })

        taskReadWriteTransaction.onsuccess = (e) => {
            console.log('data added')
        }

        closeManagerNewTask();

    } catch (err) {
        console.log(err + " ")
    }
}

async function fetchDeleteTask(task_id) {
    console.log('fetch delete task')
    const url = window.API_URL + '/deleteTask.php'
    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            "taskID": task_id
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    let data = await res.json()
    console.log(data)
}

async function deteleTask(task_id) {
    try {
        if (navigator.onLine) {
            await fetchDeleteTask(task_id)
        } else {
            let flag = false
            for (let i = 0; i < addTaskQueue.length; i++) {
                if (addTaskQueue[i].taskID === task_id) {
                    //delete addTaskQueue[i]
                    addTaskQueue.splice(i, 1);
                    flag = true
                    break;
                }
            }
            if (!flag) deleteTaskQueue.push(task_id)
        }
        document.getElementById("task-" + task_id).style.display = "none";

        let transaction = db.transaction(['task'], 'readwrite')
        let object = transaction.objectStore('task')
        object.delete(task_id)
        transaction.onsuccess = e => {
            console.log('remove task', task_id)
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function updateTask(task_id) {
    let content = document.getElementById("contentOfEditTask-" + task_id).value;
    try {
        const url = window.API_URL + '/updateContent.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "taskID": task_id,
                "content": content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {
            document.getElementById("task-content-label-" + task_id).innerHTML = content;
            closeChangeModal(task_id);
        } else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function getTask() {
    let today = getDateToday();
    try {
        const url = window.API_URL + '/getTodayTask.php'
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        let i;
        for (i = 0; i < res.length; i++) {
            let date = res.array[i][2].substring(0, 10);
            let time = res.array[i][2].substring(11, 16);
            if (date < today) {
                document.getElementById("overdue1").innerHTML += getTaskOverdue(res.array[i][0], res.array[i][1], date);
            }
            if (date === today) {
                document.getElementById("today1").innerHTML += getTaskToday(res.array[i][0], res.array[i][1], time);
            }
        }
    } catch (err) {
        console.log(err + " ")
    }
}

function getTaskOffline() {
    console.log('offline mode trigger!')
    let transaction = db.transaction(["task"]);
    let objectStore = transaction.objectStore("task");
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
            document.getElementById("today1").innerHTML += getTaskToday(key, value.content, value.deadline.substring(11, 16));
            cursor.continue();
        } else {
            // no more results
        }
    };
}

async function fetchCompleteTask(task_id) {
    const url = window.API_URL + '/completeTask.php'
    let data = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            "taskID": task_id
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    let res = await data.json();
    console.log(res)

}

async function completeTask(task_id) {
    try {
        if (navigator.onLine) {
            await fetchCompleteTask(task_id)
        } else {
            completedQueue.push(task_id);
        }

        document.getElementById("task-"+task_id).style.display = "none"
        let transaction = db.transaction(['task'], 'readwrite')
        let object = transaction.objectStore('task')
        res = object.get(task_id)
        res = object.get(task_id)
        res.onsuccess = e => {
            data = res.result;
            data.status = 1;
            updateTitleRequest = object.put(data);
            console.log("The transaction that originated this request is " + updateTitleRequest.transaction);
        }


    } catch (err) {
        console.log(err + " ")
    }
}

async function reschedueTask(taskID, deadline) {
    try {
        const url = window.API_URL + '/rescheduleTask.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "taskID": taskID,
                "deadline": deadline + " 23:59:59"
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {
            window.location = '';
        } else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function reschedueAllTask(deadline) {
    try {
        const url = window.API_URL + '/rescheduleAllTask.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "deadline": deadline
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {
            window.location = '';
        } else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

function test() {
    alert("asdsada");
}

async function changeTimeToday(task_id, time) {
    try {
        const url = window.API_URL + '/rescheduleTask.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "taskID": task_id,
                "deadline": getDateToday() + " " + time
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {
            window.location = '';
        } else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

