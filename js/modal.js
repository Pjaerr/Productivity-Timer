
var modalProperties =
{
    isClosed: true,
    displayStyle: 'none'
};

var projects = document.getElementById('main-content');

///When called, will open or close the modal depending upon its current state at the call time.
function toggleModal()
{
    modalProperties.displayStyle = document.getElementById('modal-box').style.display;

    if (modalProperties.displayStyle === 'block')
        {
            modalProperties.displayStyle = 'none';
            modalProperties.isClosed = true;

            projects.style.display = 'block';
        }
    else
        {
            modalProperties.displayStyle = 'block';
            modalProperties.isClosed = false;

            projects.style.display = 'none';
        }
    
    setDisplayStyleOf('modal-box', modalProperties.displayStyle);
}

function setDisplayStyleOf(element, displayStyle)
{
    document.getElementById(element).style.display = displayStyle;
}