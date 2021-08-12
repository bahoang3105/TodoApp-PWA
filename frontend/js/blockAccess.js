async function blockAccess() {
    try {
        const url = 'http://localhost/todo/backend/api/blockAccess.php'
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.check == false) {
            window.location = 'http://localhost/todo/frontend/pages/homepage.html';
            alert("Unauthorized access");
        }
    } catch (err) {
        console.log(err + " ")
    }
}

async function blockAccess1() {
    try {
        const url = 'http://localhost/todo/backend/api/blockAccess.php'
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.check == true) {
            window.location = 'http://localhost/todo/frontend/index.html';
        }
    } catch (err) {
        console.log(err + " ")
    }
}