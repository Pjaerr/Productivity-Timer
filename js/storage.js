

function LocalStorage()
{
	this.localStorage = window.localStorage;

	this.set = function(name, value)
	{
		this.localStorage.setItem(name, value);
	}
	this.get = function(name)
	{
		return this.localStorage.getItem(name);
	}
	this.getAll = function()
	{
		var values = [],
        keys = Object.keys(this.localStorage),
        i = keys.length;

		while ( i-- ) 
		{
			values.push(this.localStorage.getItem(keys[i]));
		}

		return values;
	}
	this.remove = function(name)
	{
		this.localStorage.removeItem(name);
	}
}

function Cookie()
{
	this.set = function(name, value)
	{
		/*Delete previous cookie by this given name before creating a new one, it doesn't matter
		if the cookie doesn't exist, as it creates a cookie by given name, set to expire immediately.*/
		this.remove(name);
	
		let d = new Date();
		d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); //Current date + 365 in days.
		let expires = "expires=" + d.toUTCString(); //Set expire to 365 days as a UTC string.
		document.cookie = name + "=" + value + ";" + expires + ";path=/"; //Create the cookie.
	
		//Cookie Format: cardId=card::cardName_00:00:00_00:00:00_primaryColour_secondaryColour
	}
	
	this.get = function(cookieName)
	{
		let name = cookieName + "="; //Append = onto name to make it a usable cookie.
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
	
	this.getAll = function()
	{
		let decodedCookie = decodeURIComponent(document.cookie);
		let cookieArray = decodedCookie.split(';');
	
		for (let i = 0; i < cookieArray.length; i++)
		{
			return cookieArray;
		}
	}
	
	this.remove = function(name) 
	{
		  document.cookie = name +'=; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}


function DataStorage()
{
	this.handler;

	this.checkCompat = function()
	{
		var check = 'check';
		try
		{
			window.localStorage.setItem(check, check);
			window.localStorage.removeItem(check);
			return true;
		} 
		catch(e) 
		{
			return false;
		}
	}

	this.set = function(name, value)
	{
		this.handler.set(name, value);
	}
	this.get = function(name)
	{
		return this.handler.get(name);
	}
	this.getAll = function()
	{
		return this.handler.getAll();
	}
	this.remove = function(name)
	{
		this.handler.remove(name);
	}
}

var dataStorage = new DataStorage();
if (dataStorage.checkCompat())
	{
		dataStorage.handler = new LocalStorage();
	}
else
	{
		dataStorage.handler = new Cookie();
	}