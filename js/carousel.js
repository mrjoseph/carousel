
(function(window, $){
  var Plugin = function(elem, options){
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;
    };


  Plugin.prototype = {
    defaults: {
      _width: '100%',
      textColor: '#ffffff',
      speed: 500
    },
    busy : false,
    initNo : 1,
    build: function() {
      var
      carousel  = this.$elem,
      conf      = this.config,
      results   = [],
      li        = carousel.find('li'),
      maxItems  = li.length;
      carousel.wrap('<div id="outside-container"></div>');
      $('#outside-container').css('width',conf._width);

      var initlizeSize = function(){
        var
        containerWidth  = $('#outside-container').width(),
        maxItems        = li.length,
        maxWidth        = maxItems * containerWidth*2,
        maxLength       = maxWidth - containerWidth;

        li.width(containerWidth);
        carousel.width(maxWidth);
        return results.push(containerWidth,maxWidth,maxLength);
      };

      Plugin.prototype.maxItemNumber = maxItems;
      Plugin.prototype.carousel = '#'+carousel.attr('id');
      initlizeSize();
      $(window).resize(function(){
        initlizeSize();
      });

    },
    nav : function(speed){
      //buld the left / right navigation
      var
      controls   = '<div class="controls">',
      leftBtn    = '<a href="" class="left"><span>left</span></a>',
      rightBtn   = '<a href="" class="right"><span>right</span></a>';
      $('#outside-container').append(controls);
      $('.controls').append(leftBtn,rightBtn);
      $('.controls').append('<ul class="counter">');
      $('.counter').append('<li class="countNo"></li><li>/</li><li class="totalNo"></li>');

      var
      moveLeft  = '+=',
      moveRight = '-=',
      _this = this;
      $('a').click(function(e){
        e.preventDefault();
        var moveDistance  = $(_this.carousel).find('li').width();
        var direction     = $(this).attr('class');
        distance          = parseInt($(_this.carousel).css('margin-left').replace('px',''),'');

        if( direction ==='right' ){
          Plugin.prototype.move(moveRight,moveDistance,direction,speed);
        } else

        if( direction === 'left' ){
          Plugin.prototype.move(moveLeft,moveDistance,direction,speed);
        }
        this.busy = true;
      });
    },
    move:function(dir,moveDistance,direction,speed){
      var _this = this;
      if( !Plugin.prototype.busy ){
        if( direction ==='right' ){
          $(_this.carousel).stop().animate({marginLeft : dir+moveDistance},speed,function(){
            $(_this.carousel+' li:first').remove().insertAfter($(_this.carousel+' li:last'));
            $(_this.carousel).css('margin-left',0);
            _this.addNo();
            _this.busy = false;
          });
        } else
        if( direction ==='left' ){
          $(_this.carousel+' li:last').remove().insertBefore($(_this.carousel+' li:first'));
          $(_this.carousel).css('margin-left',-moveDistance);
          $(_this.carousel).stop().animate({marginLeft : dir+moveDistance},speed,function(){
            _this.deleteNo();
            _this.busy = false;
          });
        }
      }
    },
    getItemNumber : function(){
      $('.totalNo').append(this.maxItemNumber);
      $('.countNo').html(this.initNo);
    },
    addNo : function(){
      this.initNo++;
      this.resetCounter();
      $('.countNo').html(this.initNo);
      console.log(this.initNo);
    },
    deleteNo : function(){
      this.resetCounter();
      this.initNo--;
      this.resetCounter();
      $('.countNo').html(this.initNo);
      console.log(this.initNo);
    },
    resetCounter : function(){
      if(this.initNo === 0 ){
        console.log('this is 0');
        this.initNo = this.maxItemNumber;
      }
      if(this.initNo === this.maxItemNumber ){
       this.initNo = this.maxItemNumber;
      }
      if(this.initNo > this.maxItemNumber){
        this.initNo = 1;
      }
    },
    preview : function(){
      $('.controls').append('<div class="right-preview">','<div class="left-preview">');
      $('a').hover(function(){
        var direction     = $(this).attr('class');
        if( direction === 'right' ){
          // $('.controls').find('.right-preview').
        }
        console.log(direction);
      });
    },
    init: function() {
      this.config = $.extend({}, this.defaults, this.options,this.metadata);
      this.build();
      this.nav(this.config.speed);
      this.getItemNumber();
      this.preview();
  return this;
    }
  },

  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.carousel = function(options) {
    return this.each(function() {
      new Plugin(this, options).init();

    });
  };

  window.Plugin = Plugin;
})(window, jQuery);

