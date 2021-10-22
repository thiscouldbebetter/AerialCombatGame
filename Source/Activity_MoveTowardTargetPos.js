
class Activity_MoveTowardTargetPos
{
	constructor(targetPos)
	{
		this.targetPos = targetPos;
	}

	performForActor(actor)
	{
		var actorLoc = actor.loc;
		var actorOrientation = actorLoc.orientation;
		 
		// hack - Instant turning.
		actorOrientation.forward.overwriteWith
		(
			this.targetPos
		).subtract
		(
			actorLoc.pos
		).normalize();
 
		actorOrientation.orthogonalizeAxes();
 
		Action.Instances().Accelerate.performForActor(actor);
	}
}
