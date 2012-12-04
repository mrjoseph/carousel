var carousel = carousel || {};
carousel = {
	carouselFrame		: $('#carousel-container'),
	li					: $('.carousel-container li'),
	outsideContainer	: $('#outside-container'),
	curScrollAmount		: null,
	liNum				: null,

	resize : function(){
		var
		results               = [];
		liNum                 = carousel.li.length,
		containerWidth        = carousel.outsideContainer.width(),
		carousel.curScrollAmount  = containerWidth,
		maxWidth              = liNum * containerWidth,
		maxLength             = maxWidth - containerWidth,
		carouselWidth         = carousel.carouselFrame.width(maxWidth);
		carouselMarginWidth   = parseInt(carousel.carouselFrame.css('margin-left').replace('px',''),'');
		carousel.li.width(containerWidth);
		results.push(containerWidth,maxWidth,maxLength);
		console.log('new margin: ',carouselMarginWidth);
		console.log('new margin: ',carouselMarginWidth+=1);
		//carousel.carouselFrame.animate({marginLeft : carouselMarginWidth+=1});
		return results;
	},
	nav : function(){
		var
		moveLeft	= '+=',
		moveRight	= '-=';
		$('a').click(function(e){
			var NewPageCount = new	carousel.pageCount();	
			moveDistance = $('#carousel-container li').width();
			e.preventDefault();
			var direction = $(this).attr('class');
			distance = parseInt($('#carousel-container').css('margin-left').replace('px',''),'');
			var limit = new carousel.resize();

			if( direction ==='right' ){
				if( distance <= -limit[2] ){
					return false;
				}
				carousel.move(moveRight,moveDistance);
				NewPageCount.addNo();
				$('.number').html(carousel.initNo);
			} else
			if( direction === 'left' ){
				if( distance >= 0 ){
					return false;
				}
				carousel.move(moveLeft,moveDistance);
				NewPageCount.deleteNo();
				$('.number').html(carousel.initNo);
			}
			carousel.busy = true;
		});
	},
	busy : false,
	move:function(dir,moveDistance){
		if( !carousel.busy ){ 
			$('#carousel-container').stop().animate({marginLeft : dir+moveDistance},500,function(){
				carousel.busy = false;
			});
		}
	},

	initNo : '1',
	pageCount: function(){
		this.addNo = function(){
			return carousel.initNo++;
		};
		this.deleteNo = function(){
			return carousel.initNo--;
		};
	$('.number').html(carousel.initNo);	
	},
	resetCarousel : function(){
    var
    doit,
    startStopWidth = [],
    reminderGap,
	carouselWidth = $('#carousel-container').width();
    startStopWidth.push(carouselWidth);
    // console.log(startStopWidth);
    
    function stopResize(num){
      var currentMargin = parseInt($('#carousel-container').css('margin-left').replace('px',''),'');
      var w = $('.carousel-container li').width();
      startStopWidth.push(w);
      if(startStopWidth.length > 2){
        delete startStopWidth[0];
        startStopWidth.splice(0,1);
      }
      reminderGap = startStopWidth[0] - startStopWidth[1];
      var newMargin = currentMargin - reminderGap;

      var newPosition = currentMargin + reminderGap*num;

      //shit the carousel back into place
      if(currentMargin !== 0){
        $('#carousel-container').animate({
           marginLeft: newPosition+'px'
        });
      }
    }
    $(window).resize(function(){
      (function(){
        clearTimeout(doit);
        doit = setTimeout(function() {
			var numInc = carousel.initNo-1;
			// console.log(numInc, carousel.initNo);
          stopResize(0);
        }, 500);
      }());
    });
  }
};

$(document).ready(function(){
	carousel.resize();
	carousel.nav();
	carousel.pageCount();
	carousel.resetCarousel();
});
$(window).resize(function(){
	carousel.resize();
});

