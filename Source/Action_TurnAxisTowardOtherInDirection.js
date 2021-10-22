
class Action_TurnAxisTowardOtherInDirection
{
	constructor(indexOfAxisToBeTurned, indexOfAxisToTurnToward, sign)
	{
		this.indexOfAxisToBeTurned = indexOfAxisToBeTurned;
		this.indexOfAxisToTurnToward = indexOfAxisToTurnToward;
		this.sign = sign;
	 
		this.temp = new Coords();
	}

	performForActor(actor)
	{
		var actorLoc = actor.loc;
		var actorOrientation = actorLoc.orientation;
		var axes = actorOrientation.axes;
		 
		var axisToBeTurned = axes[this.indexOfAxisToBeTurned];
		var axisToTurnToward = axes[this.indexOfAxisToTurnToward];
 
		axisToBeTurned.add
		(
			this.temp.overwriteWith
			(
				axisToTurnToward
			).multiplyScalar
			(
				this.sign * actor.turnPerTick
			)
		).normalize();
 
		actorOrientation.orthogonalizeAxes().normalizeAxes();
	}
}
