function controlNotification() {
    if (document.getElementById("notification_box").style.display == "none") {
        document.getElementById("profile_box").style.display = "none";
        document.getElementById("notification_box").style.display = "block";
        document.getElementById("new_notifications").style.display = "none";
    } else {
        document.getElementById("notification_box").style.display = "none";
    }
}

function getNotification(notification_id, fromUserName, actions, projectName, status, time, isRead, taskName) {
    html_code = '';
    if (isRead) html_code += '<li id="' + notification_id + '" style="background-color: white;">';
    else html_code += '<li id="' + notification_id + '" style=" cursor: pointer;" onclick="readNotification('+notification_id+')">';
    if (actions == 0) {
        html_code += '    <div class="notification_message"><span style="font-weight: bolder;">' + fromUserName + '</span> has invited you to join the project: <span style="text-decoration: underline; font-weight: bolder;">' + projectName + '</span></div>';
        html_code += '    <div class="time_notification">' + time + '</div>';
        html_code += '    <div id="status_' + notification_id + '" class="notification_actions">';
        if (status == 0) {
            html_code += '        <button class="btn_agree_invite" onclick="agreeInvite(' + notification_id + ')">Agree</button>';
            html_code += '        <button class="btn_cancel_invite" onclick="cancelInvite(' + notification_id + ')">Cancel </button>';
        } else if (status == 1) {
            html_code += '<span class="agreed_invite"><i class="fa fa-check"></i> accepted</span>';
        } else if (status == 2) {
            html_code += '<span class="cancel_invite"><i class="fa fa-close"></i> refused</span>';
        }
        html_code += '    </div>';
    } else if (actions == 1) {  //////// thong bao cho tất cả những nguoi trong project la đã co user tham gia project
        html_code += '    <div class="notification_message"><span style="font-weight: bolder;">' + fromUserName + '</span> joined the project: <span style="text-decoration: underline; font-weight: bolder;">' + projectName + '</span></div>';
        html_code += '    <div class="time_notification">' + time + '</div>';
    } else if (actions == 2) { //////// thông báo chỉ cho người mời là user kia đã tư chối tham gia
        html_code += '    <div class="notification_message"><span style="font-weight: bolder;">' + fromUserName + '</span> refused to join the project: <span style="text-decoration: underline; font-weight: bolder;">' + projectName + '</span></div>';
        html_code += '    <div class="time_notification">' + time + '</div>';
    } else if (actions == 3) { //////// thong bao cho tất cả những nguoi trong project la đã co user rời project
        html_code += '    <div class="notification_message"><span style="font-weight: bolder;">' + fromUserName + '</span> left the project: <span style="text-decoration: underline; font-weight: bolder;">' + projectName + '</span></div>';
        html_code += '    <div class="time_notification">' + time + '</div>';
    } else if (actions == 4) { //////// thong bao cho người đưuọc giao công việc công việc
        html_code += '    <div class="notification_message"><span style="font-weight: bolder;">' + fromUserName + '</span> assigned <span style="text-decoration: underline; font-weight: bolder;">' + taskName + '</span> to you on the project: <span style="text-decoration: underline; font-weight: bolder;">' + projectName + '</span></div>';
        html_code += '    <div class="time_notification">' + time + '</div>';
    }
    html_code += '</li>';
    return html_code;
}



async function readNotification(notification_id) {
    try {
        const url1 = window.API_URL + '/readNotification.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "notificationID": notification_id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {     
            document.getElementById(notification_id).style.backgroundColor= "white";
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function getNotificationFromDB() {
    try {
        const url1 = window.API_URL + '/getNotification.php'
        let data = await fetch(url1, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        let array = res.array;
        let numUnread = 0;
        var i;
        for (i = 0; i < res.length; i++) {
            let isRead;
            if (array[i][5] == 0) {
                isRead = false;
                numUnread += 1;
            }
            else isRead = true;
            document.getElementById("list_notifications").innerHTML += getNotification(array[i][0], array[i][1], array[i][6], array[i][2], array[i][4], array[i][3], isRead, array[i][7]);
        }
        if (numUnread == 0) {
            document.getElementById("new_notifications").style.display = "none";
        }
        else document.getElementById("new_notifications").innerHTML = numUnread;
    } catch (err) {
        console.log(err + " ")
    }
}

getNotificationFromDB();

async function agreeInvite(notification_id) {
    try {
        const url1 = window.API_URL + '/agreeInvite.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "notificationID": notification_id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {
            document.getElementById("status_" + notification_id).innerHTML = '<span class="agreed_invite"><i class="fa fa-check"></i> accepted</span>';
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function cancelInvite(notification_id) {
    try {
        const url1 = window.API_URL + '/cancelInvite.php'
        let data = await fetch(url1, {
            method: 'POST',
            body: JSON.stringify({
                "notificationID": notification_id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if (res.success) {
            document.getElementById("status_" + notification_id).innerHTML = '<span class="cancel_invite"><i class="fa fa-close"></i> refused</span>';
        }
        else {
            alert(res.message);
        }
    } catch (err) {
        console.log(err + " ")
    }
}
