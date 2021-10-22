
class Coords
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}
 
	clear()
	{
		this.x = 0;
		this.y = 0;
		this.z = 0;
		return this;
	}
 
	clone()
	{
		return new Coords(this.x, this.y, this.z);
	}
 
	crossProduct(other)
	{
		return this.overwriteWithXYZ
		(
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x
		);
	}
 
	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		this.z /= other.z;
		return this;
	}
 
	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;
		return this;
	}
 
	dotProduct(other)
	{
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}
 
	isInRangeMax(max)
	{
		var returnValue = 
		(
			this.x >= 0 && this.x <= max.x
			&& this.y >= 0 && this.y <= max.y
			&& this.z >= 0 && this.z <= max.z
		);
 
		return returnValue;
	}
 
	isInRangeMaxXY(max)
	{
		var returnValue = 
		(
			this.x >= 0 && this.x <= max.x
			&& this.y >= 0 && this.y <= max.y
		);
 
		return returnValue;
	}
 
	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
 
	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
		return this;
	}
 
	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	}
 
	normalize()
	{
		return this.divideScalar(this.magnitude());
	}
 
	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		return this;
	}
 
	overwriteWithXYZ(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}
 
	randomize()
	{
		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();
		return this;
	}
 
	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}
 
	toString()
	{
		return "(" + this.x + "," + this.y + "," + this.z + ")"
	}
 
	trimToMagnitudeMax(magnitudeMax)
	{
		var magnitude = this.magnitude();
		if (magnitude > magnitudeMax)
		{
			this.divideScalar
			(
				magnitude
			).multiplyScalar
			(
				magnitudeMax
			);
		}
		return this;
	}
 
	trimToRangeMinMax(min, max)
	{
		if (this.x < min.x)
		{
			this.x = min.x;
		}
		else if (this.x > max.x)
		{
			this.x = max.x;
		}
 
		if (this.y < min.y)
		{
			this.y = min.y;
		}
		else if (this.y > max.y)
		{
			this.y = max.y;
		}
 
		if (this.z < min.z)
		{
			this.z = min.z;
		}
		else if (this.z > max.z)
		{
			this.z = max.z;
		}
 
		return this;
	}
}
