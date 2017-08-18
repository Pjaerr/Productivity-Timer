function createCard(nameOfCard, colourOfCard, colourOfText)
{
    var cardId = nameOfCard.replace(/\s+/g,"_"); //Make the id of new card, that of the name. Replacing spaces with underscores.
    
    $('.cards').prepend("<div id='"+cardId+"'class='card-holder mdl-grid'><a class='mdl-cell--6-col mdl-cell--4-col-phone' href='#'><div style='background: "+colourOfCard+";' class='mdl-cell--6-col mdl-cell--4-col-phone project-card mdl-card mdl-shadow--8dp'><div class='mdl-card__title'><h2 style='color: "+colourOfText+";' class='mdl-card__title-text'>"+nameOfCard+"</h2></div></div></a></div>");
}

var projectNameTextfield = document.getElementById('project-name');

function createNewCard()
{
    let selectedColour = $('input[name=colours]:checked').val();
    let colour = colours[selectedColour];
    
    if (!projectNameTextfield.value || selectedColour == undefined)
        {
            return;
        }

    createCard(projectNameTextfield.value, colour.primary , colour.secondary);
    triggerModal();
}

window.onload = function()
{
    if (!coloursAreLoaded)
        {
            addColoursToModal();
        }
}

$(document).ready(function()
{
    $('#new-card').click(function()
    {
        triggerModal();
    });

    $('#create-card').click(function()
    {
        createNewCard();
    });
    
});

function triggerModal()
{
    toggleModal();

    if (modalProperties.isClosed)
        {
            projectNameTextfield.value = '';
        }

    coloursAreLoaded = true;
}

function Colour(name, primary, secondary)
{
    this.name = name;
    this.primary = primary;
    this.secondary = secondary;
}

var colours = 
[
    new Colour("Red", '#F44336', '#FFEBEE'),
    new Colour("Pink", '#E91E63', '#FCE4EC'),
    new Colour("Purple", '#9C27B0', '#F3E5F5'),
    new Colour("Deep Purple", '#673AB7', '#EDE7F6'),
    new Colour("Indigo", '#3F51B5', '#E8EAF6'),
    new Colour("Cyan", '#00BCD4', '#E0F7FA'),
    new Colour("Teal", '#009688', '#E0F2F1'),
    new Colour("Green", '#4CAF50', '#E8F5E9'),
    new Colour("Light Green", '#8BC34A', '#F1F8E9'),
    new Colour("Lime", '#CDDC39', '#F9FBE7'),
    new Colour("Yellow", '#FFEB3B', '#FFFDE7'),
    new Colour("Orange", '#FF9800', '#FFF3E0'),
    new Colour("Deep Orange", '#FF5722', '#FBE9E7')
];

var coloursAreLoaded = false;

function addColoursToModal()
{
    let set = 0;
    let count = 0;
    for (var i = 0; i < colours.length; i++)
        {
            if (count > 2)
                {
                    set++;
                    count = 0;
                }
            else
                {
                    $('.colourselect'+set).append("<td class = 'colourselect-radio'><label class = 'mdl-radio mdl-js-radio mdl-js-ripple-effect' for = "+colours[i].name+"> <input type = 'radio' id = "+colours[i].name+" name = 'colours' value = '"+i+"'class = 'mdl-radio__button'> <span class = 'mdl-radio__label' style='color:"+colours[i].primary+";'>"+colours[i].name+"</span> </label> </td>");
                    count++;
                }
        }
}





