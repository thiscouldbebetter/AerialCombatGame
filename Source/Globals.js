
class Globals
{
	// instance
 
	static Instance = new Globals();
 
	// methods
 
	initialize(timerTicksPerSecond, display, venue)
	{
		this.display = display;
		this.venue = venue;
 
		this.inputHelper = new InputHelper();
 
		this.display.initialize();
 
		this.timerTicksSoFar = 0;
		this.timerTicksPerSecond = timerTicksPerSecond;
		var millisecondsPerTimerTick = Math.round(1000 / this.timerTicksPerSecond);
		this.timer = setInterval
		(
			this.handleEventTimerTick.bind(this), 
			millisecondsPerTimerTick
		);
 
		this.inputHelper.initialize();
	}
 
	secondsSoFar()
	{
		return Math.floor(this.timerTicksSoFar / this.timerTicksPerSecond);
	}
 
	// events
 
	handleEventTimerTick()
	{
		this.venue.updateForTimerTick();
		this.timerTicksSoFar++;
	}
}
