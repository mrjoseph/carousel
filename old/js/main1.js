(function( $ ){
	$.fn.myPlugin = function ( options ) {
		var defaults = {
			color : 'blue'
		};
		opt = $.extend(defaults,options);
		var obj = $(this);
		(function(){
			obj.css('background-color',opt.color);
		})();

	};
})( jQuery );

