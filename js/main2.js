var carousel = carousel || {};
carousel = {
	carouselFrame		: $('#carousel-container'),
	li					: $('#carousel-container li'),
	outsideContainer	: $('#outside-container'),
	liNum				: $('#carousel-container li').length,
	results				: [],
	resize : function(){
		var
		containerWidth        = carousel.outsideContainer.width(),
		maxWidth              = carousel.liNum * containerWidth*2,
		maxLength             = maxWidth - containerWidth,
		carouselWidth         = carousel.carouselFrame.width(maxWidth);
		carousel.li.width(containerWidth);
		carousel.results.push(containerWidth,maxWidth,maxLength);
	},
	nav : function(){
		var
		moveLeft	= '+=',
		moveRight	= '-=';
		$('a').click(function(e){
			if(carousel.initNo  === carousel.liNum){ // reset it to the total number of lis
				$('.counter .countNo').html('1');
			}
			
			moveDistance = $('#carousel-container li').width();
			e.preventDefault();
			var direction = $(this).attr('class');
			distance = parseInt($('#carousel-container').css('margin-left').replace('px',''),'');

			if( direction ==='right' ){
				carousel.move(moveRight,moveDistance,direction);
			} else

			if( direction === 'left' ){
				carousel.move(moveLeft,moveDistance,direction);	
			}
			carousel.busy = true;
		});
	},
	busy : false,
	move:function(dir,moveDistance,direction){
		var NewPageCount = new	carousel.pageCount();	
		if( !carousel.busy ){ 
			 if( direction ==='right' ){
				$('#carousel-container').stop().animate({marginLeft : dir+moveDistance},500,function(){
					$('#carousel-container li:first').remove().insertAfter($('#carousel-container li:last'));
					$('#carousel-container').css('margin-left',0);
					NewPageCount.addNo();
					$('.counter .countNo').html(carousel.initNo);
					console.log(carousel.initNo);
			 		carousel.busy = false;
			 	});
			 } else
			 if( direction ==='left' ){
				$('#carousel-container li:last').remove().insertBefore($('#carousel-container li:first'));
				$('#carousel-container').css('margin-left',-moveDistance);
				$('#carousel-container').stop().animate({marginLeft : dir+moveDistance},500,function(){
					NewPageCount.deleteNo();
					$('.counter .countNo').html(carousel.initNo);
					console.log(carousel.initNo);
			 		carousel.busy = false;
			 	});
			 }
		}
	},

	initNo : 1,
	pageCount: function(){
		this.addNo = function(){
			 carousel.initNo ++;
			 this.zeroNo();
		};

		this.deleteNo = function(){
			carousel.initNo --;
			this.zeroNo();
		};

		this.zeroNo = function(){	
			if(carousel.initNo === 0 || carousel.initNo === carousel.liNum){
				carousel.initNo = carousel.liNum;
			}
			if(carousel.initNo > carousel.liNum){
				carousel.initNo = 1;
			}
		};
	$('.counter .countNo').html(carousel.initNo);	
	$('.counter .totalNo').html(carousel.liNum);	
	}
};

$(document).ready(function(){
	carousel.resize();
	carousel.nav();
	carousel.pageCount();	
});
$(window).resize(function(){
	carousel.resize();
});

