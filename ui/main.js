console.log('Loaded!');

var img = document.getElementById('madi');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + "px";    
}

img.onclick = function () {
    var interval = setInterval(moveRight, 50);
};

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
   request.open('GET', 'http://localhost:8081/counter', true);
   request.send(null); 
};
