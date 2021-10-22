
class Activity_UserInputAccept
{
	performForActor(actor)
	{
		var keyCodesPressed = Globals.Instance.inputHelper.keyCodesPressed;
 
		var actions = Action.Instances;
 
		for (var i = 0; i < keyCodesPressed.length; i++)
		{
			var keyCodePressed = keyCodesPressed[i];
			var actionToPerform = null;
 
			if (keyCodePressed == "_38") // up arrow
			{
				actionToPerform = actions.Accelerate;
			}
			if (keyCodePressed == "_40") // down arrow
			{
				actionToPerform = actions.Decelerate;
			}
			else if (keyCodePressed == "_65") // a
			{
				actionToPerform = actions.YawLeft;
			}
			else if (keyCodePressed == "_68") // d
			{
				actionToPerform = actions.YawRight;
			}
			else if (keyCodePressed == "_69") // e
			{
				actionToPerform = actions.RollRight;
			}
			else if (keyCodePressed == "_81") // q
			{
				actionToPerform = actions.RollLeft;
			}
			else if (keyCodePressed == "_83") // s
			{
				actionToPerform = actions.PitchUp;
			}
			else if (keyCodePressed == "_87") // w
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
