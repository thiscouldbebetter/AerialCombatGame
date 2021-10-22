
class MeshFace
{
	constructor(vertexIndices)
	{
		this.vertexIndices = vertexIndices;
	 
		this.plane = new Plane(new Coords(), 0);
	}

	recalculateForMesh(mesh)
	{
		var vertex0 = mesh.vertices[this.vertexIndices[0]];
		var vertex1 = mesh.vertices[this.vertexIndices[1]];
		var vertex2 = mesh.vertices[this.vertexIndices[2]];
 
		var edge0 = vertex1.clone().subtract(vertex0);
		var edge1 = vertex2.clone().subtract(vertex1);
 
		this.plane.normal.overwriteWith(edge0).crossProduct(edge1);
		this.plane.distanceFromOrigin = this.plane.normal.dotProduct(vertex0);
	}
}
