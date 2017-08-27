//String Objects
var projectId;
var projectValues;

//Timer Objects
var activeTimer;
var inactiveTimer;

/*The only function that should be called externally, gets passed the ID of a project, as it is in the stored cookie.*/
function showTimer(project)
{
	projectId = project;

	let cookie = getCookie(project);

	if (!cookie)
	{
		alert("Cannot find cookie by name " + project + ".");
		return;
	}

	//split cookie by underscores into an array.
	projectValues = cookie.split('_');

	//Initialise the Timer objects, passing in the time from the retrieved cookie.
	activeTimer = new Timer(projectValues[1]);
	inactiveTimer = new Timer(projectValues[2]);

	console.log(cookie);
	loadContentOnPage();
}

/*Grabs the DOM elements, and pushes the values from the retrieved cookie into them*/
function loadContentOnPage()
{
	document.getElementById('header').innerText = projectValues[0].slice(projectValues[0].indexOf("card::") + 6); //Set header to project name.

	//Set the background and text colour of the two timer cards.
	initialiseCard('timer-active', projectValues[3], projectValues[4]);
	initialiseCard('timer-inactive', projectValues[3], projectValues[4]);

	//Update the time text on the timer cards.
	updateTimer('timer-active-text', activeTimer.time);
	updateTimer('timer-inactive-text', inactiveTimer.time);

	//Hide main content and show timer content.
	document.getElementById('main-content').style.display = 'none';
	document.getElementById('timer-content').style.display = 'block';
}

function initialiseCard(id, background, color)
{
	document.getElementById(id).style.background = background;
	document.getElementById(id + '-text').style.color = color;
}

function updateTimer(id, time)
{
	document.getElementById(id).innerText = time;
}

/*Set the cookie with all the current values at time of calling.*/
function updateTimerCookie()
{
	setCookie(projectId, projectValues[0] + '_' + activeTimer.time + '_' + inactiveTimer.time + '_' + projectValues[3] + '_' + projectValues[4]);
}

function pauseTimers()
{
	activeTimer.pause();
	inactiveTimer.pause();
}

function resetTimers()
{
	activeTimer.reset();
	inactiveTimer.reset();
}

function Timer(time)
{
	this.time = time;
	this.isEnabled = false;
}

Timer.prototype.start = function()
{
	//Start timer here.
	console.log("Timer Started");
	this.isEnabled = true;
}
Timer.prototype.pause = function()
{
	//Pause timer here.
	console.log("Timer Paused");
	this.isEnabled = false;
}
Timer.prototype.reset = function()
{
	//Reset timer here.
	console.log("Timer Reset");
	this.isEnabled = false;
}

/*Adding event listeners to check if either of the timers have been clicked, and starting/pausing them as needed*/
document.getElementById('timer-active').addEventListener('click', function()
{
	if (activeTimer.isEnabled)
	{
		activeTimer.pause();
	}
	else
	{
		activeTimer.start();
		inactiveTimer.pause();
	}
});

document.getElementById('timer-inactive').addEventListener('click', function()
{
	if (inactiveTimer.isEnabled)
	{
		inactiveTimer.pause();
	}
	else
	{
		inactiveTimer.start();
		activeTimer.pause();
	}
});

/*Update the cookie for this timer when the user attempts to leave the page.*/
window.onbeforeunload = function()
{
	updateTimerCookie();
}
document.getElementById('back-to-projects-btn').addEventListener('click', function()
{
	updateTimerCookie();

	//Hide timer content and show main content.
	document.getElementById('main-content').style.display = 'block';
	document.getElementById('header').innerText = "Projects";
	document.getElementById('timer-content').style.display = 'none';
});