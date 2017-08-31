// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.audio_stream = function(runtime)
{
	this.runtime = runtime;
};
(function ()
{
	var pluginProto = cr.plugins_.audio_stream.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;
	
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;

		var self = this;
		if (this.runtime.isAndroid || this.runtime.isiOS){
			init();
		}
		function init() {
			navigator.RADIO.initialize(function(s) {
				if (s == 'STOPPED-FROM-NOTIFICATION') {
					self.runtime.trigger(cr.plugins_.audio_stream.prototype.cnds.onStopNotification, self);				  
				}
			}, function(s) {
			});
		 
		}
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	//////////////////////////////////////
	// Conditions
	function Cnds() {};
	
	Cnds.prototype.onPlay = function (state)
	{
		return true;
	};
	Cnds.prototype.onPlayError = function (state)
	{
		return true;
	};
	Cnds.prototype.onStop = function (state)
	{
		return true;
	};
	Cnds.prototype.onStopError = function (state)
	{
		return true;
	};
	Cnds.prototype.onStopNotification = function (state)
	{
		return true;
	};

	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};
	Acts.prototype.playAudio = function (audioUrl,streamTitle,streamSubtitle)
	{
		var self = this;
		navigator.RADIO.play(function(s) {
			self.runtime.trigger(cr.plugins_.audio_stream.prototype.cnds.onPlay, self);
		}, function(s) {
			self.runtime.trigger(cr.plugins_.audio_stream.prototype.cnds.onPlayError, self);
		}, audioUrl, streamTitle, streamSubtitle);
 
	};
	
	Acts.prototype.stopAudio = function ()
	{
		var self = this;
		navigator.RADIO.stop(function(s) {
			self.runtime.trigger(cr.plugins_.audio_stream.prototype.cnds.onStop, self);
		}, function(s) {
			self.runtime.trigger(cr.plugins_.audio_stream.prototype.cnds.onStopError, self);
		});
	};
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	pluginProto.exps = new Exps();

}());