(function($){

	$.fn.fillText = function (options){

		var element = this;
		//Default Settings
		var setting = $.extend({
			text : "Hello World",
			color : "#ccc",
			text_bg : "black",
			fill_value : 7,
			duration : "2s"
		},options);

		var text = setting.text;
		var color = setting.color;
		var text_bg = setting.text_bg;
		var fill_value = setting.fill_value;
		var duration = setting.duration;



		function filling(){
			$(element).css('color',color);
			$(element).append('<style>.fill-text::after{animation-duration:'+duration+';background-color:'+text_bg+';}@keyframes fill{from{width: 0;}to{width:'+fill_value*10+'%;}}</style>');
		}

		filling();

	}

}(jQuery));
