
var modalProperties =
{
    isClosed: true,
    displayStyle: 'none'
};

///When called, will open or close the modal depending upon its current state at the call time.
function toggleModal()
{
    modalProperties.displayStyle = document.getElementById('modal-box').style.display;

    if (modalProperties.displayStyle === 'block')
        {
            modalProperties.displayStyle = 'none';
            modalProperties.isClosed = true;
        }
    else
        {
            modalProperties.displayStyle = 'block';
            modalProperties.isClosed = false;
        }
    
    setDisplayStyleOf('modal-box', modalProperties.displayStyle);
    setDisplayStyleOf('modal-overlay', modalProperties.displayStyle);
}

function setDisplayStyleOf(element, displayStyle)
{
    document.getElementById(element).style.display = displayStyle;
}