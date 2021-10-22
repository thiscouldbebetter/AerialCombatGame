
class Action_Accelerate
{
	constructor(sign)
	{
		this.sign = sign;
	}

	performForActor(actor)
	{
		var actorLoc = actor.loc;
 
		actorLoc.accel.overwriteWith
		(
			actorLoc.orientation.forward
		).multiplyScalar
		(
			this.sign * actor.accelPerTick
		);
	}
}
