listDateTodo = [];

function dateChange(datePicked) {

    datePicked2 = "'" + datePicked + "'";
    if (!listDateTodo.includes(datePicked)) {
        listDateTodo.push(datePicked);

        htmlCode = '';
        htmlCode += '<div class="section" role="group">';
        htmlCode += '<header id="section-header-' + datePicked + '">';
        htmlCode += '   <h2> ';
        htmlCode += formatDate(datePicked);
        htmlCode += '  </h2> ';
        htmlCode += '</header>';
        htmlCode += '<div id="list_holder_' + datePicked + '">';
        htmlCode += '<ul id="list_task_' + datePicked + '" class="items">';

        htmlCode += '        <li id="controller-actions-' + datePicked + '" class="controller actions">';
        htmlCode += '            <button class="plus_add_button" onclick="openManagerNewTaskUpcoming(' + datePicked2 + ')">';
        htmlCode += '                <span class="icon_add" aria-hidden="true">';
        htmlCode += '                            <svg width="13" height="13">';
        htmlCode += '                                <path d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z" fill="currentColor" fill-rule="evenodd"></path>';
        htmlCode += '                            </svg>';
        htmlCode += '                        </span>';
        htmlCode += '                        Add task';
        htmlCode += '                    </button>';

        htmlCode += '        </li>';
        htmlCode += '        <li id="manger-new-task-' + datePicked + '" class="manager" style="display: none;">';
        htmlCode += '            <form id="new-task-' + datePicked + '" class="focus-marker-enabled-within">';
        htmlCode += '                <div class="task_editor__editing_area">';
        htmlCode += '                    <div class="task_editor__input_fields">';
        htmlCode += '                        <div class="task_editor__content_field">';
        htmlCode += '                            <input type="text" name="input-task-content" placeholder="do somthing" id="contentOfNewTask-' + datePicked + '">';
        htmlCode += '                        </div>';
        htmlCode += '                    </div>';

        htmlCode += '                    <div class="task_editor__extra_fields">';
        htmlCode += '                        <div class="task_editor__extra_fields__pills">';
        htmlCode += '                            <button id="btn_addTime_'+datePicked+'" onclick="addTime('+datePicked2+')" type="button" style="color: blue;">';
        htmlCode += '                                <i class="fa fa-clock-o w3-small" style="color: blue;"></i>';
        htmlCode += '                                <p>Addtime</p>';
        htmlCode += '                            </button>';
        htmlCode += '                            <input id="input_addTime_'+datePicked+'" type="time" style="display: none;"/>'
        htmlCode += '                            <button id="btn_closeAddTime_'+datePicked+'" onclick="closeAddTime('+datePicked2+')" type="button" style="border: none; display: none;">x</button>'
        htmlCode += '                        </div>';
        htmlCode += '                    </div>';
        htmlCode += '                </div>';
        htmlCode += '                <div class="task_editor__form_actions">';
        elementID = "'contentOfNewTask-" + datePicked + "'";
        htmlCode += `                    <button type="button" class="add_task_btn" onclick="addTask(`+datePicked2+`+' '+document.getElementById('input_addTime_` + datePicked +`').value, document.getElementById(` + elementID + `).value)" aria-disabled="true"> Add task </button>`;
        htmlCode += '                    <button type="button" class="cancel_btn" onclick="closeManagerNewTaskUpcoming(' + datePicked2 + ')"> Cancel </button>';
        htmlCode += '                </div>';
        htmlCode += '             </div>';
        htmlCode += '          </form>';
        htmlCode += '       </li>';
        htmlCode += '   </ul>';
        htmlCode += '</div>';

        document.getElementById("list-date-todo").innerHTML += htmlCode;
    }
}

function formatDate (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
  }

function openManagerNewTaskUpcoming(datePicked1) {
    datePicked = datePicked1.toString();
    document.getElementById("controller-actions-" + datePicked).style.display = "none";
    document.getElementById("manger-new-task-" + datePicked).style.display = "inline";
}

function closeManagerNewTaskUpcoming(datePicked1) {
    datePicked = datePicked1.toString();
    document.getElementById("manger-new-task-" + datePicked).style.display = "none";
    document.getElementById("controller-actions-" + datePicked).style.display = "inline";
}


function addTime(datePicked) {
    document.getElementById("btn_addTime_"+datePicked).style.display= "none";
    document.getElementById("input_addTime_"+datePicked).style.display= "flex";
    document.getElementById("btn_closeAddTime_"+datePicked).style.display= "flex";
}

function closeAddTime(datePicked) {
    document.getElementById("btn_addTime_"+datePicked).style.display= "flex";
    document.getElementById("input_addTime_"+datePicked).style.display= "none";
    document.getElementById("btn_closeAddTime_"+datePicked).style.display= "none";
    document.getElementById("input_addTime_"+datePicked).value= null;
}

async function addTask1(datePicked2) {
    datePicked = datePicked2.toString();
    try {
        let content = document.getElementById("contentOfNewTask-" + datePicked).value;
        const url = window.API_URL + '/addTask.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "date": datePicked2,
                "content": content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {
            window.location = '';
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

function getTaskUpcoming(task_id, task_content_label, deadline, timeOfDay) {
    var html_code = '';
    html_code += '<li class="task_list_item" id="task-' + task_id + '">';
    html_code += '<div role="button" class="task_list_item__body">';
    html_code += '<button type="button" value="check-task-' + task_id + '" aria-checked="false" role="checkbox" class="task_checkbox priority_1" onclick="completeTask(' + task_id + ')">';
    html_code += '<div class="task_checkbox__circle">';
    html_code += '<svg width="24" height="24"><path fill="currentColor" d="M11.23 13.7l-2.15-2a.55.55 0 0 0-.74-.01l.03-.03a.46.46 0 0 0 0 .68L11.24 15l5.4-5.01a.45.45 0 0 0 0-.68l.02.03a.55.55 0 0 0-.73 0l-4.7 4.35z"></path></svg></div></button>';
    html_code += '<div class="task_list_item__content" id="task-'+task_id+'-content" >';
    html_code += '<div class="task_list_item__content__content_wrapper">';
    html_code += '<div id="task-content-label-'+task_id+'" class="downmark_content task_content" onclick="openChangeModal('+task_id+')">' + task_content_label +'</div>';
    html_code += '<div class="task_editor__content_field">';
    html_code += '<input id="contentOfEditTask-'+task_id+'" type="text" style="display: none;" name="input-task-content" value="'+task_content_label+'" placeholder="do somthing">';
    html_code += '</div>';
    html_code += '<button id="btn-saveEditTaskContent-'+task_id+'" type="button" class="delete_task_btn" style="color: green; margin-right: 0px; display: none;">Save</button>';
    html_code += '<button id="btn-cancelEditTaskContent-'+task_id+'" onclick="closeChangeModal('+task_id+')" type="button" class="delete_task_btn" style="color: black; margin-right: 0px; display: none;">Cancel</button>';
    html_code += '<div class="delete_task"><button type="button" value="delete-task-' + task_id + '" class="delete_task_btn" onclick="deteleTask(' + task_id + ')"><i class="fa fa-trash-o"></i></button></div>';
    html_code += '</div>';
    html_code += '<div class="task_list_item__info_tags">';
    html_code += '<input style="border: none; outline: none; cursor: pointer; color: purple; width: 120px;" min="' + getDateToday() + '" type="date" value="' + deadline + '" onchange="reschedueTask(' + task_id + ', this.value)"/>';
    html_code += '<input id="inputTimeTodaytask-'+task_id+'" style="border: none; outline: none; cursor: pointer; color: purple; width: 90px; display: flex;" min="" type="time" value="'+timeOfDay+`" onchange="changeTime(`+task_id+`, '`+deadline+`', this.value)"/>`;
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</li>';
    return html_code;

}

async function getUpcomingTask() {
    try {
        const url = window.API_URL + '/getUpcomingTask.php'
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
            var date = res.array[i][2].substring(0,10);
            var time = res.array[i][2].substring(11, 16);
            dateChange(date);
            document.getElementById("list_task_"+date).innerHTML+= getTaskUpcoming(res.array[i][0],res.array[i][1], date, time);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function changeTime(task_id, date, time) {
    try {
        const url = window.API_URL + '/rescheduleTask.php'
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "taskID": task_id,
                "deadline": date + " " + time
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
