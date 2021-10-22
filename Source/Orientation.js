
class Orientation
{
	constructor(forward, right, down)
	{
		this.forward = forward;
		this.right = right;
		this.down = down;
	 
		this.axes = 
		[
			this.forward,
			this.right,
			this.down
		];
	}

	// static methods
 
	static fromForwardAndDown(forward, down)
	{
		return new Orientation
		(
			forward, 
			new Coords(0, 0, 0), 
			down
		).orthogonalizeAxes();
	}
 
	// instance methods
 
	normalizeAxes()
	{
		this.forward.normalize();
		this.right.normalize();
		this.down.normalize();
		return this;
	}
 
	orthogonalizeAxes()
	{
		this.right.overwriteWith
		(
			this.down
		).crossProduct
		(
			this.forward
		);
 
		this.down.overwriteWith
		(
			this.forward
		).crossProduct
		(
			this.right
		);
 
		this.normalizeAxes();
 
		return this;
	}
 
	overwriteWith(other)
	{
		this.forward.overwriteWith(other.forward);
		this.right.overwriteWith(other.right);
		this.down.overwriteWith(other.down);
	}
 
	toString()
	{
		var returnValue = 
			this.forward.toString() 
			+ "x" + this.right.toString()
			+ "x" + this.down.toString();
 
		return returnValue;
	}
}
