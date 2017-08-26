function setCookie(name, value)
{
	let d = new Date();
	d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); //Current date + 365 in days.
	let expires = "expires=" + d.toUTCString(); //Set expire to 365 days as a UTC string.
	document.cookie = name + "=" + value + ";" + expires + ";path=/"; //Create the cookie.
}

function getCookie(cname)
{
	let name = cname + "="; //Append = onto name to make it a usable cookie.
	let decodedCookie = decodeURIComponent(document.cookie); //Grab cookies associated with this document.
	let ca = decodedCookie.split(';'); //Split all cookies and assign them to the ca array.

	/*Run through the array of cookies, on each loop, read out the value of the current index and if it
	is equal to our cookie, return that value associated with said cookie. */
	for (let i = 0; i < ca.length; i++)
	{
		let c = ca[i];

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