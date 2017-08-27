console.log('Loaded!');

// submit name code
var submit = document.getElementById('submit_btn');
submit.onclick = function () {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    // Create a request
    var request = new XMLHttpRequest();
   request.open('POST', 'http://mailtoshivamk.imad.hasura-app.io:80/login' + name, true);
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify({username: username, password: password})); 
   
   request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
    	    if(request.status === 200) {
    	        alert('Logged in successfully!');
    	    } else if(request.status === 403) {
    	        alert('Username/Password is invalid.');
    	    } else if(request.status === 500) {
    	        alert('Something went wrong on the server.');
    	    }
    	}
    }
};
