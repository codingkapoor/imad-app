console.log('Loaded!');


// image drift code
var img = document.getElementById('madi');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + "px";    
}

img.onclick = function () {
    var interval = setInterval(moveRight, 50);
};


// counter code
var button = document.getElementById('counter');
button.onclick = function () {
    // Create a request
    var request = new XMLHttpRequest();

    // Capture the response and store it in a variable
    // Render the variable in the correct span
    request.onreadystatechange = function () {
	if(request.readyState === XMLHttpRequest.DONE) {
	    if(request.status === 200) {
		var counter = request.responseText;
		var span = document.getElementById('count');
		span.innerHTML = counter.toString();
	    }
	}
    }

    // Make a request to the counter endpoint
   request.open('GET', 'http://mailtoshivamk.imad.hasura-app.io:80/counter', true);
   request.send(null); 
};


// submit name code
var submit = document.getElementById('submit');
submit.onclick = function () {
    // Create a request
    var request = new XMLHttpRequest();

    // Capture the response and store it in a variable
    // Render the variable in the correct span
    request.onreadystatechange = function () {
	if(request.readyState === XMLHttpRequest.DONE) {
	    if(request.status === 200) {
		var names = JSON.parse(request.responseText);
		var list = '';
		for (var i=0; i<names.length; i++) {
		    list = list + '<li>' + names[i] + '</li>';
		}
		var ul = document.getElementById('namelist');
		ul.innerHTML = list;
	    }
	}
    }

    // Make a request to the counter endpoint
   var nameInput = document.getElementById("name");
   var name = nameInput.value;
   request.open('GET', 'http://mailtoshivamk.imad.hasura-app.io:80/addName?name=' + name, true);
   request.send(null); 
};

