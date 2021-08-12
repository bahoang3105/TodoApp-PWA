async function check(e, c) {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById("password").value;
    let mess = document.getElementById("notification");

    mess.innerHTML = "";
    let reply = 0;
    if (password.length < 8) {
        mess.innerHTML += "Password is too short<br>";
        reply += 1;
    }
    if (password.length > 24) {
        mess.innerHTML += "Password is too long<br>";
        reply += 1;
    }
    if(c == 0) {
        let password2 = document.getElementById("confirm_pw").value;
        mess.innerHTML = "";
        if (password !== password2) {
            mess.innerHTML += "Confirm password do not match";
            reply += 1;
        }
    }
    if(reply === 0) {
        if(c === 1) {
            let data = await checkLogin(username, password)
            let res = await data.json()
            if (res.success) {
                window.location = 'http://localhost/todo/frontend/index.html';
            } else {
                mess.innerHTML = res.message;
            }
        }
        if(c === 0) {
            let data = await checkSignup(username, password)
            let res = await data.json()
            if (res.success) {
                alert("Đăng ký thành công");
                window.location = 'http://localhost/todo/frontend/pages/login.html';
            } else {
                mess.innerHTML = res.message;
            }
        }
    }
}

async function checkLogin($username, $password) {
    try {
        const url = window.API_URL + '/login.php'
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "username": $username,
                "password": $password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
    } catch (err) {
        console.log(err + " ")
    }
}

function comparePass() {
    let p1 = document.getElementById("password").value;
    let p2 = document.getElementById("confirm_pw").value;
    let mess = document.getElementById("notification");
    mess.innerHTML = "";
    if (p1 !== p2) {
        mess.innerHTML += "Confirm password do not match";
        return false;
    }
    return true;
}

async function checkSignup($username, $password) {
    try {
        const url = 'http://localhost/todo/backend/api/signup.php';
        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "username": $username,
                "password": $password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
    } catch (err) {
        console.log(err + " ")
    }
}