
(function(window, $){
  var Plugin = function(elem, options){
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;
    };


  Plugin.prototype = {
    defaults: {
      _width: '50%',
      textColor: '#ffffff',
      speed: 500
    },
    active : false,
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
    addFrameNumbers : function(){
      var i;
      for( i=1; i < this.carousel; i++ ){
        $(this.carousel).find('li').attr('data-frameNo-',i);
        console.log(i);
        console.log(this.carousel);
      }
        
      
    },
    nav : function(speed){
      //buld the left / right navigation
      var
      controls   = '<div class="controls">',
      leftBtn    = '<a href="" class="left"><span>left</span></a>',
      rightBtn   = '<a href="" class="right"><span>right</span></a>';
      $('#outside-container').append(controls);
      $('.controls').append(leftBtn,rightBtn);
      $('#outside-container').append('<div class="bottombar"><ul class="counter">');
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
      });
    },
    move:function(dir,moveDistance,direction,speed){
      var _this = this;
      if( !_this.active ){
        _this.active = true;
        if( direction ==='right' ){
          $(_this.carousel).stop().animate({marginLeft : dir+moveDistance},speed,function(){
            $(_this.carousel+' li:first').remove().insertAfter($(_this.carousel+' li:last'));
            $(_this.carousel).css('margin-left',0);
            _this.addNo();
            _this.active = false;
          });

        } else
        if( direction ==='left' ){
          $(_this.carousel+' li:last').remove().insertBefore($(_this.carousel+' li:first'));
          $(_this.carousel).css('margin-left',-moveDistance);
          $(_this.carousel).stop().animate({marginLeft : dir+moveDistance},speed,function(){
            _this.deleteNo();
            _this.active = false;
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
    },
    resetCounter : function(){
      if(this.initNo === 0 ){
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
      var
      _this = this,
      imageSrc;
      this.getImageInPreview = function(dir,num){
        imageSrc = $(_this.carousel+' li').eq(num).find('img').attr('src');
        $('.'+dir+'-preview').append('<img src="'+imageSrc+'" style="width:100%"/>');
      };
      $('.controls').append('<div class="right-preview">','<div class="left-preview">');

      $('a').mouseenter(function(){
        var direction = $(this).attr('class');
        if( direction === 'right'){
          _this.getImageInPreview(direction,1);
        } else
        if ( direction === 'left' ){
          _this.getImageInPreview(direction,-1);
        }
        $('.controls').find('.'+direction+'-preview').stop().fadeIn();
      }).mouseleave(function(){
        var direction = $(this).attr('class');
           $('.controls').find('.'+direction+'-preview').stop().fadeOut(function(){
              $('.right-preview,.left-preview').find('img').remove();
           });
      });
      $('a').click(function(){
        var direction = $(this).attr('class');
        if( direction === 'right'){
          setTimeout(function(){
            $('.right-preview').find('img').remove();
          _this.getImageInPreview(direction,1);
          },_this.defaults.speed);
        } else
        if( direction === 'left'){
          setTimeout(function(){
            $('.left-preview').find('img').remove();
            _this.getImageInPreview(direction,-1);
          },_this.defaults.speed);
        }
      });
    },
    showControls:function(){
      $('#outside-container').on('mouseenter',function(){
        $('.controls').fadeIn();
      }).on('mouseleave', function(){
        $('.controls').fadeOut();
      });
    },
    init: function() {
      this.config = $.extend({}, this.defaults, this.options,this.metadata);
      this.build();
      this.nav(this.config.speed);
      this.getItemNumber();
      this.preview();
      this.addFrameNumbers();
      this.showControls();
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

