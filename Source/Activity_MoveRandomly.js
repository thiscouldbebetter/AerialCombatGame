
class Activity_MoveRandomly
{
	constructor()
	{
		this.ticksToHoldCourse = 0;
	 
		this.targetPos = new Coords();
		this.directionToTarget = new Coords();
		this.ticksToHoldCourseMax = 200;
	}

	performForActor(actor)
	{
		var actorLoc = actor.loc;
		var actorOrientation = actorLoc.orientation;
 
		this.ticksToHoldCourse--;
 
		if (this.ticksToHoldCourse <= 0)
		{
			var venue = Globals.Instance.venue;
		 
			this.targetPos.randomize().multiply
			(
				venue.sizeInPixels
			).subtract
			(
				venue.sizeInPixelsHalf
			);
 
			this.ticksToHoldCourse = Math.floor
			(
				Math.random() 
				* this.ticksToHoldCourseMax
			);
		}
 
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
