
//String Objects
var projectId;
var projectValues;

//Timer Objects
var activeTimer;
var inactiveTimer;

var isDeleted = false;

var autoSaveInterval = 10 * 60; //in seconds

/*The only function that should be called externally, gets passed the ID of a project, as it is in the stored cookie.*/
function showTimer(project)
{
	projectId = project; //Store project name for setting cookie down the line.

	let timerData = dataStorage.get(project);

	if (!timerData)
	{
		alert("Cannot find timer by name " + project + ".");
		deleteProject();
	}

	//split cookie by underscores into an array.
	projectValues = timerData.split('_');

	//Initialise the Timer objects, passing in the time from the retrieved cookie and their respective text objects on the DOM.
	activeTimer = new Timer('timer-active-text', projectValues[1]);
	inactiveTimer = new Timer('timer-inactive-text', projectValues[2]);

	loadContentOnPage();
}

/*Grabs the DOM elements, and pushes the values from the retrieved cookie into them*/
function loadContentOnPage()
{
	document.getElementById('header').innerText = projectValues[0].slice(projectValues[0].indexOf("card::") + 6); //Set header to project name.

	//Set the background and text colour of the two timer cards.
	initialiseCard('timer-active', projectValues[3], projectValues[4]);
	initialiseCard('timer-inactive', projectValues[3], projectValues[4]);

	//Update the time on the timer cards.
	initializeTimer(activeTimer);
	initializeTimer(inactiveTimer);

	//Hide main content and show timer content.
	document.getElementById('main-content').style.display = 'none';
	document.getElementById('timer-content').style.display = 'block';
}

function initialiseCard(id, background, color)
{
	document.getElementById(id).style.background = background;
	document.getElementById(id + '-text').style.color = color;
}

function initializeTimer(timer)
{
	updateTimerText(timer.timerId, timer.time);

	/*Split up this timer's string from the loaded cookie and assign them as integers
	to be used within the timer.*/
	timer.hh = parseInt(timer.time.slice(0, 2));
	timer.mm = parseInt(timer.time.slice(3, 5));
	timer.ss = parseInt(timer.time.slice(6, 8));
}

function updateTimerText(id, time)
{
	document.getElementById(id).innerText = time;
}

/*Set the cookie with all the current values at time of calling.*/
function updateTimerCookie()
{
	dataStorage.set(projectId, projectValues[0] + '_' + activeTimer.time + '_' + inactiveTimer.time + '_' + projectValues[3] + '_' + projectValues[4] + '_' + projectValues[5]);
}

function Timer(timerId, time)
{
	this.timerId = timerId; //ID of this timer on the DOM.
	this.time = time; //this.hh:this.mm:this.ss in string form.
	this.isEnabled = false;
	this.hasStarted = false; //Is true when the setInterval function has been started, to avoid counting twice.

	//HH:MM:SS
	this.hh = 0;
	this.mm = 0;
	this.ss = 1;
}

Timer.prototype.start = function()
{
	this.isEnabled = true;

	var count = 0;
	if (!this.hasStarted)
	{	
		setInterval(function()
		{
			if (this.isEnabled)
			{
				count += 1;

				this.ss += 1;
				if (this.ss >= 60)
				{
					this.ss = 0;
					this.mm += 1;
					if (this.mm >= 60)
					{
						this.hh += 1;
						this.mm = 0;
					}
				}

				this.time = makeTimeString(this.hh)+ ':' + makeTimeString(this.mm) + ':' + makeTimeString(this.ss);
				updateTimerText(this.timerId, this.time);

				if (count >= autoSaveInterval)
					{
						updateTimerCookie();
						count = 0;
						console.log("autosaved..");
					}
			}

		}.bind(this), 1000);

		this.hasStarted = true;
	}
}

function makeTimeString(num)
{
	num = num.toString();
	if (num < 10)
	{
		num = '0' + num;
	}

	return num;
}

Timer.prototype.pause = function()
{
	this.isEnabled = false;
}
Timer.prototype.reset = function()
{
	this.isEnabled = false;
	this.hh = 0;
	this.mm = 0;
	this.ss = 0;
	this.time = '00:00:00';
	updateTimerText(this.timerId, this.time);
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
window.addEventListener("beforeunload", function(e)
{
	if (!isDeleted)
		{
			activeTimer.pause();
			inactiveTimer.pause();
			updateTimerCookie();
		}
});

function goBackToProjects()
{
	isDeleted = false;
	activeTimer.pause();
	inactiveTimer.pause();
	updateTimerCookie();

	//Hide timer content and show main content.
	document.getElementById('main-content').style.display = 'block';
	document.getElementById('header').innerText = "Projects";
	document.getElementById('timer-content').style.display = 'none';
}
document.getElementById('back-to-projects-btn').addEventListener('click', function(){goBackToProjects();});


//Collective Timer Buttons.
function deleteProject()
{
	if (confirm("Are you sure you want to delete this project?"))
	{
		goBackToProjects();
		let thisProjectCard = document.getElementById(projectId);
		dataStorage.remove(projectId);
		thisProjectCard.parentNode.removeChild(thisProjectCard);
		isDeleted = true;
	}	
}
function resetTimers()
{
	activeTimer.reset();
	inactiveTimer.reset();
}