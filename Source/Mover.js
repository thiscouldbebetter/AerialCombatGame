
class Mover
{
	constructor
	(
		name, integrity, speedMax, accelPerTick,
		turnPerTick, loc, activity, color, mesh
	)
	{
		this.name = name;
		this.integrity = integrity;
		this.speedMax = speedMax;
		this.accelPerTick = accelPerTick;
		this.turnPerTick = turnPerTick;
		this.loc = loc;
		this.activity = activity;
		this.color = color;
		this.mesh = mesh;
	 
		this.displacementFromPlayer = new Coords();
	}

	updateForVenueTimerTick(venue)
	{
		this.activity.performForActor(this);
 
		var loc = this.loc;
		loc.vel.add(loc.accel);
		loc.accel.clear();
		loc.vel.trimToMagnitudeMax(this.speedMax);
		loc.pos.add(loc.vel);
		loc.pos.trimToRangeMinMax
		(
			venue.sizeInPixelsHalfNegative, 
			venue.sizeInPixelsHalf
		);
 
		var moverForPlayer = venue.moverForPlayer;
 
		if (this != moverForPlayer)
		{
			this.displacementFromPlayer.overwriteWith
			(
				loc.pos
			).subtract
			(
				moverForPlayer.loc.pos
			);
 
			var distanceFromPlayer = this.displacementFromPlayer.magnitude();
			var distanceMinForKill = 10;
			if (distanceFromPlayer <= distanceMinForKill)
			{
				if (this.name == "Prey")
				{
					venue.killsSoFar++;
				}
				else if (this.name == "Predator")
				{
					venue.deathsSoFar++;
				}
 
				loc.pos.randomize().multiply
				(
					venue.sizeInPixels
				).subtract
				(
					venue.sizeInPixelsHalf
				).divideScalar
				(
					1000
				).add
				(
					moverForPlayer.loc.pos
				);
			}
		}
	}
}
