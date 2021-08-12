function controlProfile() {
    if (document.getElementById("profile_box").style.display == "none") {
        document.getElementById("notification_box").style.display = "none";
        document.getElementById("profile_box").style.display = "block";
    } else {
        document.getElementById("profile_box").style.display = "none";
    }
} 
function endOfTheDay() {
    var d = new Date();
    var date = ''+d.getDate();
    var month = ''+(d.getMonth() + 1);
    var year = ''+d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (date.length < 2) 
        date = '0' + date;

    return year+"-"+month+"-"+date+" 23:59:59";
}

var input = document.getElementById("id-v33jcd");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("searchButton").click();
    }
});

document.getElementById("id-v33jcd").oninput = function () {
    var substr = document.getElementById("id-v33jcd").value;
    substr = "%" + substr + "%";
    search(substr);
}

function forwardPage(deadline, status, projectID, statusProj) {
    // onsuccess chuyển tới page chứa task đó
    if(projectID == "null") {
        if(status == "1") {
            window.location = "http://localhost/todo/frontend/pages/completed_task.html";
        }
        else {
            if(deadline < endOfTheDay()) {
                window.location = "http://localhost/todo/frontend/index.html";
            }
            else {
                window.location = "http://localhost/todo/frontend/pages/upcomingtask.html";
            }
        }
    }
    else if(statusProj == "0") {
        window.location = "http://localhost/todo/frontend/pages/project.html?projectId=" + projectID;
    }
    else {
        window.location = "http://localhost/todo/frontend/pages/project_archived.html?projectId=" + projectID;
    }
}

async function search(subName) {
    try {
        const url1 = window.API_URL + '/searchTask.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "subName": subName
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        var i;
        document.getElementById("list_results").innerHTML = "";
        for(i = 0; i < res.length; i++) {
            document.getElementById("list_results").innerHTML += 
                '<option data-value="' + res.array[i][2] + ',' + res.array[i][3] + ',' + res.array[i][5] + ',' + res.array[i][7] + '">' + res.array[i][1] + '</option>';
        } 
    } catch (err) {
        console.log(err + " ")
    }
}

function forwardPage() {

    var data = document.getElementsByTagName("option")[0].dataset.value;
    var list = data.split(",");
    var projectID = list[2];
    var deadline = list[0];
    var statusProj = list[3];
    var status = list[1];

    // onsuccess chuyển tới page chứa task đó
    if(projectID == "null") {
        if(status == "1") {
            window.location = "http://localhost/todo/frontend/pages/completed_task.html";
        }
        else {
            if(deadline < endOfTheDay()) {
                window.location = "http://localhost/todo/frontend/index.html";
            }
            else {
                window.location = "http://localhost/todo/frontend/pages/upcomingtask.html";
            }
        }
    }
    else if(statusProj == "0") {
        window.location = "http://localhost/todo/frontend/pages/project.html?projectId=" + projectID;
    }
    else {
        window.location = "http://localhost/todo/frontend/pages/project_archived.html?projectId=" + projectID;
    }
}

async function getUserName() {
    try {
        const url1 = window.API_URL + '/getUserName.php'
        let data = await fetch(url1, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        document.getElementById("username").innerHTML = res.userName;
    } catch (err) {
        console.log(err + " ")
    }
}

getUserName();