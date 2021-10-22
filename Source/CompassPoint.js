
class CompassPoint
{
	constructor(name, direction)
	{
		this.name = name;
		this.direction = direction;
		this.loc = new Location(new Coords());
	}

	updateForVenueTimerTick(venue)
	{
		this.loc.pos.overwriteWith
		(
			this.direction
		).multiplyScalar
		(
			100
		).add
		(
			venue.moverForPlayer.loc.pos
		);
	}
}
