function createCard(nameOfCard, colourOfCard, colourOfText)
{
    var cardId = nameOfCard.replace(/\s+/g,"_"); //Make the id of new card, that of the name. Replacing spaces with underscores.
    
    $('.cards').prepend("<div id='"+cardId+"'class='card-holder mdl-grid'><a class='mdl-cell--6-col mdl-cell--4-col-phone' href='#'><div style='background: "+colourOfCard+";' class='mdl-cell--6-col mdl-cell--4-col-phone project-card mdl-card mdl-shadow--8dp'><div class='mdl-card__title'><h2 style='color: "+colourOfText+";' class='mdl-card__title-text'>"+nameOfCard+"</h2></div></div></a></div>");
}

function createNewCard()
{
    var name = document.getElementById('cardName').value;
    var cardColour = document.getElementById('cardColour').value;
    var textColour = document.getElementById('textColour').value;

    if (!name || !cardColour || !textColour)
        {
            return;
        }

    createCard(name, cardColour, textColour);

}

$('#new-card').click(function(){
    createNewCard();
});

