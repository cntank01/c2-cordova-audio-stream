function GetPluginSettings()
{
	return {
		"name":			"Audio Stream",
		"id":			"audio_stream",
		"version":		"1.0",
		"description":	"Allows you to play radio directly in your Construct 2 application",
		"author":		"Versus System Development",
		"help url":		"https://vk.com/versus_dev",
		"category":		"General",
		"type":			"object",
		"rotatable":	false,
		"flags":		pf_singleglobal
	};
};

////////////////////////////////////////
// Conditions
AddCondition(0, cf_trigger, "On stream started playing", "Stream control", "On stream started playing", "Triggers when stream was started", "onPlay");
AddCondition(1, cf_trigger, "On stream stopped", "Stream control", "On stream stopped", "Triggers after the stream was stopped", "onStop");

AddCondition(2, cf_trigger, "On stream play error", "Stream events", "On stream play error", "Triggers when an error occurred while starting the stream", "onPlayError");
AddCondition(3, cf_trigger, "On stream stopped", "Stream events", "On stream stopped", "Triggers after the stream was stopped", "onStop");
AddCondition(4, cf_trigger, "On stream stop error", "Stream events", "On stream stop error", "Triggers when an error occurred while stopping the stream", "onStopError");
AddCondition(5, cf_trigger, "On stream stopped by notification", "Stream events", "On stream stopped by notification", "Triggers after the stream was stopped by notification", "onStopNotification");


////////////////////////////////////////
// Actions
AddStringParam("Audio URL", "Enter an audio url");
AddStringParam("Stream title", "Will be shown in stream notification as the title");
AddStringParam("Stream subtitle", "Will be shown in stream notification as the subtitle");
AddAction(0, af_none, "Play audio", "Stream control", "Play audio URL {0}", "Plays audio", "playAudio");

AddAction(1, af_none, "Stop audio", "Stream control", "Stop audio", "Stops audio", "stopAudio");

ACESDone();

var property_list = [];
	
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	this.instance = instance;
	this.type = type;
	
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
}