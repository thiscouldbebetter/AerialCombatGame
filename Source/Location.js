
class Location
{
	constructor(pos, orientation)
	{
		this.pos = pos;
		this.orientation = orientation;
	 
		this.vel = new Coords(0, 0, 0);
		this.accel = new Coords(0, 0, 0);
	}
}
