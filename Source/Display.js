
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;
	 
		this.sizeInPixelsHalf = sizeInPixels.clone().divideScalar(2);
	 
		// temporary variables
		this.drawPos = new Coords();
		this.transformOrient = new Transform_Orient();
	}

	clear()
	{
		this.graphics.fillStyle = "Black";
		this.graphics.fillRect
		(
			0, 0, this.sizeInPixels.x, this.sizeInPixels.y
		);
 
		this.graphics.strokeStyle = "Gray";
		this.graphics.strokeRect
		(
			0, 0, this.sizeInPixels.x, this.sizeInPixels.y
		);
	}
 
	drawCompassPointForCamera(compassPoint, camera)
	{
		this.graphics.strokeStyle = "Gray";
		this.graphics.fillStyle = "Gray";
 
		var drawPos = this.drawPos;
		this.transformWorldPosToViewPos
		(
			drawPos.overwriteWith(compassPoint.loc.pos),
			camera
		);
 
		if (drawPos.isInRangeMaxXY(this.sizeInPixels) == true)
		{
			this.drawTextAtLocationForCamera
			(
				compassPoint.name, 
				compassPoint.loc, 
				camera
			);
		}
	}
 
	drawMeshAtLocationForCamera(mesh, loc, camera)
	{
		var drawPos = this.drawPos;
		var vertices = mesh.vertices;
		var faces = mesh.faces;
 
		this.transformOrient.orientation = loc.orientation;
		var meshPos = loc.pos;
 
		for (var f = 0; f < faces.length; f++)
		{
			var face = faces[f];
 
			this.graphics.beginPath();
 
			for (var vi = 0; vi < face.vertexIndices.length; vi++)
			{
				var vertexIndex = face.vertexIndices[vi];
				var vertex = vertices[vertexIndex];
 
				drawPos.overwriteWith
				(
					vertex
				);
 
				this.transformOrient.applyToCoords
				(
					drawPos
				);
 
				drawPos.add
				(
					meshPos
				);
 
				this.transformWorldPosToViewPos
				(
					drawPos,
					camera
				);
 
				if (drawPos.z < 0)
				{
					break;
				}
				else if (vi == 0)
				{   
					this.graphics.moveTo(drawPos.x, drawPos.y);
				}
				else
				{
					this.graphics.lineTo(drawPos.x, drawPos.y);
				}
			}
 
			this.graphics.closePath();
			this.graphics.stroke();
		}
	}
 
	drawMoverForCamera(mover, camera)
	{
		this.graphics.strokeStyle = mover.color;
 
		var drawPos = this.drawPos;
		this.transformWorldPosToViewPos
		(
			drawPos.overwriteWith(mover.loc.pos),
			camera
		);
 
		var moverDistanceFromPlayer =
			Math.round(mover.displacementFromPlayer.magnitude());
		var moverLabel = mover.name + "\n" + moverDistanceFromPlayer;
		 
		if (drawPos.z > 0 && drawPos.isInRangeMaxXY(this.sizeInPixels))
		{
			this.drawTextAtPos(moverLabel, drawPos);
			this.drawMeshAtLocationForCamera(mover.mesh, mover.loc, camera);
		}
		else
		{
			drawPos.z = 0;
			drawPos.subtract
			(
				this.sizeInPixelsHalf
			).trimToMagnitudeMax
			(
				this.sizeInPixelsHalf.x
			).add
			(
				this.sizeInPixelsHalf
			);
 
			this.drawTextAtPos(moverLabel, drawPos);
 
			this.graphics.beginPath();
			this.graphics.arc
			(
				drawPos.x, drawPos.y, 
				5, // radius
				0, Constants.RadiansPerCycle
			);
			this.graphics.stroke();
		} 
	}
 
	drawTextAtLocationForCamera(textToDraw, loc, camera)
	{
		var drawPos = this.drawPos;
 
		drawPos.overwriteWith
		(
			loc.pos
		);
 
		this.transformWorldPosToViewPos
		(
			drawPos,
			camera
		);
 
		if (drawPos.z > 0)
		{
			this.drawTextAtPos(textToDraw, drawPos);
		}
	}
 
	drawTextAtPos(textToDraw, drawPos)
	{
		var textToDrawAsLines = textToDraw.split("\n");
		for (var i = 0; i < textToDrawAsLines.length; i++)
		{
			var lineToDraw = textToDrawAsLines[i];
			this.graphics.fillText(lineToDraw, drawPos.x, drawPos.y);   
			this.graphics.strokeText(lineToDraw, drawPos.x, drawPos.y);
			drawPos.y += 10; // hack
		}
	}
 
	drawVenue(venue)
	{
		this.clear();
 
		var camera = venue.camera;
		var movers = venue.movers;
		var compassPoints = venue.compassPoints;
 
		for (var i = 1; i < movers.length; i++)
		{
			var mover = movers[i];
			this.drawMoverForCamera(mover, camera);
		}
 
		for (var i = 0; i < compassPoints.length; i++)
		{
			var compassPoint = compassPoints[i];
			this.drawCompassPointForCamera(compassPoint, camera);
		}
 
		var secondsSoFar = Globals.Instance.secondsSoFar();
		var moverPlayer = movers[0];
		var moverPlayerSpeed = moverPlayer.loc.vel.magnitude();
		moverPlayerSpeed = Math.round(moverPlayerSpeed * 100) / 100;

		this.drawTextAtPos("Time:" + secondsSoFar + "s", new Coords(10, 10));
		this.drawTextAtPos("Speed:" + moverPlayerSpeed + "px/s", new Coords(10, 20));
		this.drawTextAtPos("Kills:" + venue.killsSoFar, new Coords(10, 30));
		this.drawTextAtPos("Deaths:" + venue.deathsSoFar, new Coords(10, 40));
	}
 
	initialize()
	{
		var canvas = document.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;
 
		this.graphics = canvas.getContext("2d");
 
		document.body.appendChild(canvas);
	}
 
	transformWorldPosToViewPos(drawPos, camera)
	{
		var cameraLoc = camera.loc;
		var cameraOrientation = cameraLoc.orientation;
 
		drawPos.subtract
		(
			cameraLoc.pos
		).overwriteWithXYZ
		(
			drawPos.dotProduct(cameraOrientation.right),
			drawPos.dotProduct(cameraOrientation.down),
			drawPos.dotProduct(cameraOrientation.forward)
		)
 
		var distanceAlongCameraForward = drawPos.z;
 
		drawPos.multiplyScalar
		(
			camera.focalLength
		).divideScalar
		(
			distanceAlongCameraForward
		).add
		(
			this.sizeInPixelsHalf
		);
 
		drawPos.z = distanceAlongCameraForward;
	}
}
