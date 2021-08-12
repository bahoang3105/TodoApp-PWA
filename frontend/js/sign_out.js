async function sign_out() {
    try {
        const url = window.API_URL + '/signout.php'
        let data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        let res = await data.json();
        if(res.success == true) {
            window.location = 'http://localhost/todo/frontend/pages/homepage.html';
        }
    } catch (err) {
        console.log(err + " ")
    }
}