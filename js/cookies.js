function setCookie(name, value)
{
	deleteCookie(name);
	let d = new Date();
	d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); //Current date + 365 in days.
	let expires = "expires=" + d.toUTCString(); //Set expire to 365 days as a UTC string.
	document.cookie = name + "=" + value + ";" + expires + ";path=/"; //Create the cookie.

	//Cookie Format: cardId=card::cardName_00:00:00_00:00:00_primaryColour_secondaryColour
}

function getCookie(cname)
{
	let name = cname + "="; //Append = onto name to make it a usable cookie.
	let decodedCookie = decodeURIComponent(document.cookie); //Grab cookies associated with this document.
	let cookieArray = decodedCookie.split(';'); //Split all cookies and assign them to the ca array.

	/*Run through the array of cookies, on each loop, read out the value of the current index into c and if it
	is equal to our cookie, return that value associated with said cookie. */
	for (let i = 0; i < cookieArray.length; i++)
	{
		let c = cookieArray[i];

		while (c.charAt(0) == ' ')
		{
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0)
		{
			return c.substring(name.length, c.length);
		}
	}

	return "";
}

function getAllCookies()
{
	let decodedCookie = decodeURIComponent(document.cookie);
	let cookieArray = decodedCookie.split(';');

	for (let i = 0; i < cookieArray.length; i++)
	{
		return cookieArray;
	}
}

function deleteCookie(name) 
{
  	document.cookie = name +'=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}