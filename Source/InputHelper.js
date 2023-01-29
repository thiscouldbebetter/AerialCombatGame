
class InputHelper
{
	initialize()
	{
		this.keysPressed = [];
 
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}
 
	// events
 
	handleEventKeyDown(event)
	{
		var key = event.key;
		if (isNaN(key) == false)
		{
			// Prepend underscore to prevent digit keys being treated as array indices.
			key = "_" + key; 
		}

		if (this.keysPressed[key] == null)
		{
			this.keysPressed.push(key);
			this.keysPressed[key] = key;
		}
	}
 
	handleEventKeyUp(event)
	{
		var key = event.key;
		if (isNaN(key) == false)
		{
			// Prepend underscore to prevent digit keys being treated as array indices.
			key = "_" + key; 
		}

		delete this.keysPressed[key];
		this.keysPressed.splice
		(
			this.keysPressed.indexOf(key), 1
		);
	} 
}
