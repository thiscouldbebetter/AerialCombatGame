
class Mesh
{
	constructor(vertices, faces)
	{
		this.vertices = vertices;
		this.faces = faces;
	 
		this.recalculate();
	}

	recalculate()
	{
		for (var f = 0; f < this.faces.length; f++)
		{
			var face = this.faces[f];
			face.recalculateForMesh(this);
		}
	}
}
