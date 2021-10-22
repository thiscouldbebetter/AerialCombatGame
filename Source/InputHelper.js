
class InputHelper
{
	initialize()
	{
		this.keyCodesPressed = [];
 
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}
 
	// events
 
	handleEventKeyDown(event)
	{
		var keyCode = "_" + event.keyCode;
		if (this.keyCodesPressed[keyCode] == null)
		{
			this.keyCodesPressed.push(keyCode);
			this.keyCodesPressed[keyCode] = keyCode;
		}
	}
 
	handleEventKeyUp(event)
	{
		var keyCode = "_" + event.keyCode;
		delete this.keyCodesPressed[keyCode];
		this.keyCodesPressed.splice
		(
			this.keyCodesPressed.indexOf(keyCode), 1
		);
	} 
}
