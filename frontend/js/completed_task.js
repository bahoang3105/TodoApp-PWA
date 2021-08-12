listDateTaskCompleted = [];

function formatDateCompleted (input) {
    var datePart = input.match(/\d+/g),
    year = datePart[0], // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
}

function addDateTaskCompleted(date) {

    let htmlCode = '';
    if (!listDateTaskCompleted.includes(date)) {
        listDateTaskCompleted.push(date);

        htmlCode += '<div class="section" role="group">';
        htmlCode += '<header id="section-header-' + date + '">';
        htmlCode += '   <h2 style="font-weight: 500; color: gray;"> ';
        htmlCode +=         formatDateCompleted(date);
        htmlCode += '   </h2> ';
        htmlCode += '</header>';
        htmlCode += '<div id="list_holder_' + date + '">';
        htmlCode += '   <ul id="list_task_' + date + '" class="items">';
        htmlCode += '   </ul>';
        htmlCode += '</div>';
    }
    return htmlCode;
}

function addTaskCompleted(task_id, task_content_label) {
    let html_code='';
    html_code += '<li class="task_list_item" id="task-'+task_id+'">';
    html_code += '<div class="task_list_item__body">';
    html_code += '<button type="button" style="background-color: white; border: none;"><i class="fa fa-check-circle w3-large checked_icon"></i></button>'
    html_code += '<div class="task_list_item__content" id="task-'+task_id+'-content" >';
    html_code += '<div class="task_list_item__content__content_wrapper">';
    html_code += '<div id="task-content-label-'+task_id+'" class="downmark_content task_content">' + task_content_label +'</div>';
    html_code += '<div class="delete_task"><button type="button" value="delete-task-'+ task_id+'" class="delete_task_btn" onclick="deteleTask('+task_id+')"><i class="fa fa-trash-o"></i></button></div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</div>';
    html_code += '</li>';

    return html_code;
}

async function getCompletedTaskOffline() {
    console.log('off completed task trigger!')
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
            if (value.status === 1) {
                let date = value.deadline
                document.getElementById("list-date-task-completed").innerHTML += getTaskToday(date.substr(0,10));
                document.getElementById("list_task_" + date.substr(0,10)).innerHTML += getTaskToday(key, value.content);
            }
            cursor.continue();
        } else {
            // no more results
        }
    };
}

async function getCompletedTask() {
    try {
        const url = window.API_URL + '/getCompletedTask.php'
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
            let date = res.array[i][2];
            document.getElementById("list-date-task-completed").innerHTML += addDateTaskCompleted(date.substr(0,10));
            document.getElementById("list_task_"+date.substr(0,10)).innerHTML += addTaskCompleted(res.array[i][0], res.array[i][1]);

        }
    } catch (err) {
        console.log(err + " ")
    }
}
