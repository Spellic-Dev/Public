let icon = document.getElementById("head-icon");
    let head = document.getElementById("head");
    let subhead = document.getElementById("subhead");
    // Get the query string from the URL
    const hash = window.location.hash;
    const query = hash.substring(1);
    const vars = query.split('&');
    const query_string = {};
    // Decode every key-value pair in the query string
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        const key = decodeURIComponent(pair[0]);
        const value = decodeURIComponent(pair[1]);
        query_string[key] = value;
    }
    const state = query_string['state'];
    const token = query_string['access_token'];
    // Send the token to the local web server with fetch
    const URL = 'http://localhost:42069/login?state=' + state + '&access_token=' + token;
    fetch(URL, {
        method: 'GET'
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            icon.classList.remove("icon-clock");
            icon.classList.add("icon-check");
            head.innerHTML = "Success!";
            subhead.innerHTML = "The window should close in ten seconds...";
            // Close the window after 10 seconds
            setTimeout(function () {
                window.close();
            }, 10000);
        })
        .catch(error => {
            console.error(error);
            icon.classList.remove("icon-clock");
            icon.classList.add("icon-close");
            head.innerHTML = "Error";
            subhead.innerHTML = error;
        });