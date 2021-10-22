
class Venue
{
	constructor(name, sizeInPixels, movers)
	{
		this.name = name;
		this.sizeInPixels = sizeInPixels;
		this.movers = movers;
	 
		this.sizeInPixelsHalf = this.sizeInPixels.clone().divideScalar(2);
		this.sizeInPixelsHalfNegative = this.sizeInPixelsHalf.clone().multiplyScalar(-1);
	 
		this.moverForPlayer = this.movers[0];
	 
		this.camera = new Camera
		(
			300, // focalLength
			this.moverForPlayer.loc
		);
	 
		var directionNamesAndOffsets = 
		[
			[ "West", new Coords(-1, 0, 0) ],
			[ "East", new Coords(1, 0, 0) ],
			[ "North", new Coords(0, -1, 0) ],
			[ "South", new Coords(0, 1, 0) ],
			[ "Up", new Coords(0, 0, -1) ],
			[ "Down", new Coords(0, 0, 1) ],
		];
	 
		this.compassPoints = [];
	 
		for (var i = 0; i < directionNamesAndOffsets.length; i++)
		{
			var directionNameAndOffset = directionNamesAndOffsets[i];
			var directionName = directionNameAndOffset[0];
			var directionOffset = directionNameAndOffset[1];
			var compassPoint = new CompassPoint(directionName, directionOffset); 
			this.compassPoints.push(compassPoint);
		}
	 
		this.killsSoFar = 0;
		this.deathsSoFar = 0;
	}

	updateForTimerTick()
	{
		for (var i = 0; i < this.movers.length; i++)
		{
			var mover = this.movers[i];
			mover.updateForVenueTimerTick(this);
		}	   
 
		for (var i = 0; i < this.compassPoints.length; i++)
		{
			var compassPoint = this.compassPoints[i];
			compassPoint.updateForVenueTimerTick(this);
		}
 
		Globals.Instance.display.drawVenue(this);
	}
}
