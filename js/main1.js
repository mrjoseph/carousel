var carousel = carousel || {};
    carousel.controls = carousel.controls || {};
    carousel.dimentions = carousel.dimentions || {};
    carousel.pagination = carousel.pagination || {};
    carousel.nav = carousel.nav || {};

  carousel.controls = {
    dirRight    : '-=',
    dirLeft     : '+=',
    // scrollAmout : am,
    // speed       : ap,
    busy        : false, //The slider is not in action at this point
    distance    : null,
  init : function(am,ap,min,max,max2,box){
    var
    scrollAmout = am,
    speed       = ap,
    // min         = min,
    // max         = max,
    // max2        = max2,
    dirRight       = '-=',
    dirLeft        = '+=',
    // box         = $(box),
    busy        = false, //The slider is not in action at this point
    distance    = null;
},
   move : function(scrollAmout,dir){
      if( !this.busy ){ //Check if the slider is busy. If its not then start sliding
        $('#carousel-container').stop().animate({
      marginLeft: dir+ this.scrollAmout+'px'
        },this.speed,function(){
        busy = false; // This set the slider to busy so you don't over click
        });
      }
    }
},//End of Control

carousel.nav = {
  init:function(am,ap,min,max,max2,box){
    var
    right   = '-=',
    left    = '+=',
    cP      = carousel.pagination,
    pagC    = new cP.pageCount(),
    distance,
    moveObj = carousel.controls;
    $('a').click(function(e){
    e.preventDefault();
    var _direction = $(this).attr('class');

    distance = parseInt(box.css('margin-left').replace('px',''),'');
  
        if( _direction ==='right' ){
          if( distance <= max2 ){
            return false; // stops the slide from over sliding
          }
        pagC.addNo();
        $('.number').html(cP.initNo);
        moveObj.move(moveObj.init.dirRight);
        console.log(moveObj.dirRight);

        } else if( _direction ==='left' ){
        if(distance >= moveObj.min){
          return false; // stops the slide from over sliding
        }
        pagC.deleteNo();
        $('.number').html(cP.initNo);
        moveObj.move(moveObj.left);

      }
        moveObj.busy = true; //
    });
  }
};

carousel.pagination = {
  initNo : '1',
  pageCount: function(){
    this.addNo = function(){
      return carousel.pagination.initNo++;
    };
    this.deleteNo = function(){
      return carousel.pagination.initNo--;
    };
  },

  init : function(){
    $('.number').html(carousel.pagination.initNo);
  }
};

/*Calculate all dimentions of the <li>*/
carousel.dimentions = {
  carouselFrame     : $('#carousel-container'),
  li                : $('.carousel-container li'),
  outsideContainer  : $('#outside-container'),
  curScrollAmount   : null,
  liNum             : null,

  init : function(){
    var
    results               = [];
    liNum                 = this.li.length,
    containerWidth        = this.outsideContainer.width(),
    this.curScrollAmount  = containerWidth,
    maxWidth              = liNum * containerWidth,
    maxLength             = maxWidth - containerWidth,
    carouselWidth         = this.carouselFrame.width(maxWidth);
    carouselMarginWidth   = parseInt(this.carouselFrame.css('margin-left').replace('px',''),'');

    this.li.width(containerWidth);
    /*Push variables to an Array to use in the controls object*/
    results.push(liNum,containerWidth,maxWidth,maxLength);
    return results;
  },
  //Get the initial width of the carousel
  initWidth : function(){
    var firstWidth = $('#carousel-container li').width();
    return firstWidth;
  },

  resetCarousel : function(){
    var
    doit,
    startStopWidth = [],
    reminderGap;

    startStopWidth.push(this.initWidth());
    console.log(startStopWidth);
    function stopResize(){
      var currentMargin = parseInt($('#carousel-container').css('margin-left').replace('px',''),'');
      var w = $('.carousel-container li').width();
      startStopWidth.push(w);
      if(startStopWidth.length > 2){
        delete startStopWidth[0];
        startStopWidth.splice(0,1);
      }
      reminderGap = startStopWidth[0] - startStopWidth[1];
      var newMargin = this.carouselMarginWidth - reminderGap;
      //console.log('start stop width: ',startStopWidth);
      // console.log('gap: ',reminderGap);
      
      // console.log('Current margin: ',currentMargin);
      var newPosition = currentMargin + reminderGap*1;

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
          stopResize();
        }, 500);
      }());
    });
  }
};

var wrapper = function(){
/*Wrap the init functions in a wrapper function so they can
be executed by both ready and resize functions*/
var x = carousel.dimentions.init();
carousel.controls.move(x[1],500,0,-x[2],-x[3],$('#carousel-container'));
};





$(document).ready(function(){
var x = carousel.dimentions.init();
wrapper();
carousel.dimentions.resetCarousel();
carousel.dimentions.init();
carousel.dimentions.initWidth();
carousel.pagination.init();
carousel.nav.init(-x[3],$('#carousel-container'));
});

$(window).resize(function(){
  wrapper();
});
