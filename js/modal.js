function toggleModal()
{
    let modalDisplayState = document.getElementById('modal-box').style.display;

    if (modalDisplayState === 'block')
        {
            modalDisplayState = 'none';
            blurContent('mdl-layout__content', 0);
        }
    else
        {
            modalDisplayState = 'block';
            blurContent('mdl-layout__content', 4);
        }
    
    document.getElementById('modal-box').style.display = modalDisplayState;
}

function blurContent(contentId, blurAmt)
{
    var blur = "blur("+blurAmt+"px)";
    document.getElementById(contentId).style.filter = blur;
}