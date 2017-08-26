var projectId;
var projectValues;
var activeTimer;
var inactiveTimer;

function showTimer(project)
{
    projectId = project;
    let cookie = getCookie(project);
    
    //split cookie by underscores into an array.
    projectValues = cookie.split('_');

    activeTimer = new Timer(projectValues[1]);
    inactiveTimer = new Timer(projectValues[2]);

    loadContentOnPage();
}

function loadContentOnPage()
{
    document.getElementById('header').innerText = projectValues[0];

    initialiseCard('timer-active', projectValues[3], projectValues[4]);
    initialiseCard('timer-inactive', projectValues[3], projectValues[4]);

    updateTimer('timer-active-text', activeTimer.time);
    updateTimer('timer-inactive-text', inactiveTimer.time);

    document.getElementById('main-content').style.display = 'none';
    document.getElementById('timer-content').style.display = 'block';
}

function initialiseCard(id, background, color)
{
    document.getElementById(id).style.background = background;
    document.getElementById(id).style.color = color;
}

function updateTimer(id, time)
{
    document.getElementById(id).innerText = time;
}


function updateTimerCookie()
{
    setCookie(projectId, activeTimer.time+'_'+inactiveTimer.time+'_'+projectValues[3]+'_'+projectValues[4]);
}

function pauseTimers()
{
    activeTimer.pause();
    inactiveTimer.pause();
    updateTimerCookie()
}
function resetTimers()
{
    activeTimer.reset();
    inactiveTimer.reset();
    updateTimerCookie();
}

function Timer(time)
{
    this.time = time;
}

Timer.prototype.start = function()
{
    //Start timer here.
    console.log("Timer Started");
}
Timer.prototype.pause = function()
{
    //Pause timer here.
    console.log("Timer Paused");
}
Timer.prototype.reset = function()
{
    //Reset timer here.
    console.log("Timer Reset");
}


document.getElementById('timer-active').addEventListener('click', function()
{
    activeTimer.start();
    inactiveTimer.pause();
});

document.getElementById('timer-inactive').addEventListener('click', function()
{
    activeTimer.pause();
    inactiveTimer.start();
});
