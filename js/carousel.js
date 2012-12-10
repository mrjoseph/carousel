
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
      speed: 800
    },
    init: function() {
      this.config = $.extend({}, this.defaults, this.options,this.metadata);
      this.build();
      this.nav(this.config.speed);
      this.pageCount();
      this.getItemNumber(this.elem);
      return this;
    },
    build: function() {
      var
      obj = this.$elem,
      conf = this.config,
      results = [],
      li = obj.find('li'),
      liNum = li.length;
      obj.wrap('<div id="outside-container"></div>');
      $('#outside-container').css('width',conf._width);
      var initlizeSize = function(){
        var
        containerWidth = $('#outside-container').width(),
        liNum = li.length,
        maxWidth = liNum * containerWidth*2,
        maxLength = maxWidth - containerWidth;
        li.width(containerWidth);
        obj.width(maxWidth);
        return results.push(containerWidth,maxWidth,maxLength);
      };
       initlizeSize();
      $(window).resize(function(){
        initlizeSize();
      });
      // obj.css('background-color',conf.bgColor);
      // obj.css('color',conf.textColor);
      
    },
    nav : function(speed){
      //buld the left / right navigation
      var liNum = this.$elem.find('li').length;
    
       var controls = '<div class="controls">', leftBtn = '<a href="" class="left"><span>left</span></a>', rightBtn = '<a href="" class="right"><span>right</span></a>';
      $('#outside-container').append(controls);
      $('.controls').append(leftBtn,rightBtn);
      $('.controls').append('<ul class="counter">');
      $('.counter').append('<li class="countNo"></li><li>/</li><li class="totalNo"></li>');

      var
      moveLeft  = '+=',
      moveRight = '-=';
      $('a').click(function(e){
        that = this;
       // if(carousel.initNo  === carousel.liNum){ // reset it to the total number of lis
       //   $('.counter .countNo').html('1');
       // }
        
        var moveDistance = $('#carousel-container li').width();
        e.preventDefault();
        var direction = $(this).attr('class');
        distance = parseInt($('#carousel-container').css('margin-left').replace('px',''),'');

        if( direction ==='right' ){
          Plugin.prototype.move(moveRight,moveDistance,direction,speed);
        } else

        if( direction === 'left' ){
          Plugin.prototype.move(moveLeft,moveDistance,direction,speed);
        }
        that.busy = true;
      });
    },
    busy : false,
    move:function(dir,moveDistance,direction,speed){
      var counter = new this.pageCount();
      that = this;
      if( !Plugin.prototype.busy ){
        if( direction ==='right' ){
          $('#carousel-container').stop().animate({marginLeft : dir+moveDistance},speed,function(){
            $('#carousel-container li:first').remove().insertAfter($('#carousel-container li:last'));
            $('#carousel-container').css('margin-left',0);
            counter.addNo();
            
            that.busy = false;
          });
        } else
        if( direction ==='left' ){
          $('#carousel-container li:last').remove().insertBefore($('#carousel-container li:first'));
          $('#carousel-container').css('margin-left',-moveDistance);
          $('#carousel-container').stop().animate({marginLeft : dir+moveDistance},speed,function(){
            counter.deleteNo();
            that.busy = false;
          });
        }
      }
    },
    getItemNumber : function(n){
      var items = $(n).find('li').length;
      $('.totalNo').append(items);
      console.log(items);
      return items;
    },
    initNo : 1,
    pageCount: function(){
      var n = Plugin.prototype;

      this.addNo = function(){
        this.resetCounter();
        n.initNo++;
        $('.countNo').html(n.initNo);
    };
      this.deleteNo = function(){
        n.initNo--;
        $('.countNo').html(n.initNo);
    };
    this.resetCounter = function(){
      if(n.initNo >= 17){
        n.initNo = 0;
      }
    };
        $('.countNo').html(this.initNo);
        
    }
  };

  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.carousel = function(options) {
    return this.each(function() {
      new Plugin(this, options).init();
    });
  };

  window.Plugin = Plugin;
})(window, jQuery);

