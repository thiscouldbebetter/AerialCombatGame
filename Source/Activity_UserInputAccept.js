
class Activity_UserInputAccept
{
	performForActor(actor)
	{
		var keysPressed = Globals.Instance.inputHelper.keysPressed;
 
		var actions = Action.Instances();
 
		for (var i = 0; i < keysPressed.length; i++)
		{
			var keyPressed = keysPressed[i];
			var actionToPerform = null;
 
			if (keyPressed == "ArrowUp")
			{
				actionToPerform = actions.Accelerate;
			}
			else if (keyPressed == "ArrowDown") // down arrow
			{
				actionToPerform = actions.Decelerate;
			}
			else if (keyPressed == "a")
			{
				actionToPerform = actions.YawLeft;
			}
			else if (keyPressed == "d")
			{
				actionToPerform = actions.YawRight;
			}
			else if (keyPressed == "e")
			{
				actionToPerform = actions.RollRight;
			}
			else if (keyPressed == "q")
			{
				actionToPerform = actions.RollLeft;
			}
			else if (keyPressed == "s")
			{
				actionToPerform = actions.PitchUp;
			}
			else if (keyPressed == "w")
			{
				actionToPerform = actions.PitchDown;
			}
 
			if (actionToPerform != null)
			{
				actionToPerform.performForActor(actor);
			}
		}
	}
}
