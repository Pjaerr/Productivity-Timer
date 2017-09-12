"use strict";

window.onload = function()
{
	if (!coloursAreLoaded)
	{
		addColoursToModal();
	}
}

function createCard(nameOfCard, colourOfCard, colourOfText, fromWhere)
{
	nameOfCard = nameOfCard.replace(/_+/g, " "); //Replace underscores with spaces.
	let cardId = nameOfCard.replace(/\s+/g, "-"); //Make the id of new card, that of the name. Replacing spaces with dashes.

	/*If this is the first time the card has been created (ie. not loaded from a cookie)*/
	if (fromWhere != "data")
	{
		dataStorage.set(cardId, 'card::' + nameOfCard + '_' + '00:00:00_00:00:00_' + colourOfCard + '_' + colourOfText); //Creates initial cookie for card with default timer  and colour values.
	}
	
	$('.cards').prepend("<div id='" + cardId + "'class='card-holder mdl-grid'><a class='mdl-cell--6-col mdl-cell--4-col-phone' href='#'><div style='background: " + colourOfCard + ";' class='mdl-cell--6-col mdl-cell--4-col-phone project-card mdl-card mdl-shadow--8dp mdl-navigation__link mdl-js-button mdl-js-ripple-effect'><div class='mdl-card__title'><h2 style='color: " + colourOfText + ";' class='mdl-card__title-text'>" + nameOfCard + "</h2></div></div></a></div>");
	
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

	createCard(projectNameTextfield.value, activeColour.primary, activeColour.secondary);
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

/*Colour object, should take its name, primary colour (500 on material colour chart) and a secondary colour
(50 on material colour chart). Just add said object to colours array and it can be used within the web app itself.*/
function Colour(name, primary, secondary)
{
	this.name = name;
	this.primary = primary;
	this.secondary = secondary;
}

var colours = [
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
			$(colourSelectDropdown).append("<option selected value='" + i + "' style='background: " + colours[i].primary + "; color: " + colours[i].secondary + ";'>" + colours[i].name + "</option>");
			updateDropdown();
		}
		else
		{
			$(colourSelectDropdown).append("<option value='" + i + "' style='background: " + colours[i].primary + "; color: " + colours[i].secondary + ";'>" + colours[i].name + "</option>");
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

//If a colour is selected, make the dropdown that colour.
colourSelectDropdown.addEventListener('change', updateDropdown);

/*Load Projects from Cookies*/
function getAllProjectCards()
{
	let dataContainingCards = [];

	let data = dataStorage.getAll();
	
	/*Loop through each cookie, and if the current cookie is a project card (denoted by card::)
	push that cookie into the cookiesContainingCards array*/
	for (let i = 0; i < data.length; i++)
	{
		let thisData = data[i];

		if (thisData.includes("card::"))
		{
			dataContainingCards.push(thisData);
		}
	}

	return dataContainingCards;
}

function loadProjectCards()
{
	let projectData = getAllProjectCards();

	//If no project cookies exist, don't attempt to loop through them.
	if (!projectData)
	{
		return;
	}

	var cards = [];
	/*Loop through the project cookies, and for every cookie, split it's attributes and create a card using them*/
	for (let i = 0; i < projectData.length; i++)
	{
		projectData[i] = projectData[i].slice(projectData[i].indexOf("card::") + 6);
		let thisProjectInfo = projectData[i].split("_");

		createCard(thisProjectInfo[0], thisProjectInfo[3], thisProjectInfo[4], "data");
		
	}

}


function Card(name, cardColour, textColour, index)
{
	this.name = name;
	this.colour = cardColour;
	this.textColour = textColour;
	this.index = index;
}

loadProjectCards();