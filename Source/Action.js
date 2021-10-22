
class Action
{
	// instances 
 
	static Instances()
	{
		if (Action._instances == null)
		{
			Action._instances = new Action_Instances();
		}
		return Action._instances;
	}
}
 
class Action_Instances
{
	constructor()
	{
		this.Accelerate = new Action_Accelerate(1);
		this.Decelerate = new Action_Accelerate(-1);
		this.PitchDown = new Action_TurnAxisTowardOtherInDirection(0, 2, 1);
		this.PitchUp = new Action_TurnAxisTowardOtherInDirection(0, 2, -1);
		this.RollLeft = new Action_TurnAxisTowardOtherInDirection(2, 1, 1);
		this.RollRight = new Action_TurnAxisTowardOtherInDirection(2, 1, -1);
		this.YawLeft = new Action_TurnAxisTowardOtherInDirection(0, 1, -1);
		this.YawRight = new Action_TurnAxisTowardOtherInDirection(0, 1, 1);
	}
}
