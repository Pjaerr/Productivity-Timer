window.onload = function()
{
    if (!coloursAreLoaded)
        {
            addColoursToModal();
        }
}

function createCard(nameOfCard, colourOfCard, colourOfText)
{
    let cardId = nameOfCard.replace(/\s+/g,"_"); //Make the id of new card, that of the name. Replacing spaces with underscores.
    
    setCookie(cardId, nameOfCard +'_'+'00:00:00_00:00:00_'+colourOfCard+'_'+colourOfText); //Creates initial cookie for card with default timer  and colour values.
    console.log(getCookie(cardId));
    $('.cards').prepend("<div id='"+cardId+"'class='card-holder mdl-grid'><a class='mdl-cell--6-col mdl-cell--4-col-phone' href='#'><div style='background: "+colourOfCard+";' class='mdl-cell--6-col mdl-cell--4-col-phone project-card mdl-card mdl-shadow--8dp'><div class='mdl-card__title'><h2 style='color: "+colourOfText+";' class='mdl-card__title-text'>"+nameOfCard+"</h2></div></div></a></div>");
    document.getElementById(cardId).addEventListener('click', function()
    {
        showTimer(cardId);
    });
}

var projectNameTextfield = document.getElementById('project-name');
var activeColour;

function createNewCard()
{
    if (!projectNameTextfield.value)
        {
            return;
        }

    createCard(projectNameTextfield.value, activeColour.primary , activeColour.secondary);
    triggerModal();
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
    new Colour("Deep Orange", '#FF5722', '#FBE9E7'),
    new Colour("Brown", '#795548', '#EFEBE9'),
    new Colour("Grey", '#9E9E9E', '#FAFAFA')
];

var coloursAreLoaded = false;
var colourSelectDropdown = document.getElementById('colour-select-dropdown');

function addColoursToModal()
{
    for (var i = 0; i < colours.length; i++)
        {
            if (i < 1)
                {
                    $(colourSelectDropdown).append("<option selected value='"+i+"' style='background: "+colours[i].primary+"; color: "+colours[i].secondary+";'>"+colours[i].name+"</option>");
                    updateDropdown();
                }
            else
                {
                     $(colourSelectDropdown).append("<option value='"+i+"' style='background: "+colours[i].primary+"; color: "+colours[i].secondary+";'>"+colours[i].name+"</option>");
                }
           
        }
}

function updateDropdown()
{
    let selectedColour = colourSelectDropdown.options[colourSelectDropdown.selectedIndex].value 
    activeColour = colours[selectedColour];

    colourSelectDropdown.style.background = activeColour.primary;
    colourSelectDropdown.style.color = activeColour.secondary;
}

colourSelectDropdown.addEventListener('change', updateDropdown);








