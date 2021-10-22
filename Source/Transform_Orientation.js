
class Transform_Orient
{
	constructor(orientation)
	{
		this.orientation = orientation;
	 
		this.orientationTemp = new Orientation(new Coords(), new Coords(), new Coords());
		this.result = new Coords();
	}

	applyToCoords(coordsToTransform)
	{
		this.orientationTemp.overwriteWith(this.orientation);
		this.result.clear().add
		(
			this.orientationTemp.forward.multiplyScalar(coordsToTransform.z)
		).add
		(
			this.orientationTemp.right.multiplyScalar(coordsToTransform.x)
		).add
		(
			this.orientationTemp.down.multiplyScalar(coordsToTransform.y)
		);
		coordsToTransform.overwriteWith(this.result);
	}
}
