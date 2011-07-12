(function($){  
  $.fn.progressBar = function(options){
    var defaults = {
      
    };
    var options = $.extend(defaults,options);
    return this.each(function(){
      var progressDiv = '<div class="progressOuterDiv"'+
      'style="width:200px;height:20px;border:1px solid white;' +
      'position:relative;z-index:1000;">' +
      '<div class="progressInnerDiv"' +
      'style="height:20px;width:0%;' +
      'background: -webkit-gradient(linear, 0 0, 0 100%, from(#FFD757), to(#FA2));">'
      '</div>' +
      '</div>';
      $(this).append(progressDiv);
      var initialWidth = $('.progressInnerDiv').css('width');
      var currentProgress = parseInt($('.progressInnerDiv').css('width'));      
      var progressTime = setInterval(function(){
        currentProgress += 1;
        if(currentProgress <= '95'){
          $('.progressInnerDiv').css('width', currentProgress + '%');
        }else{
          clearInterval(progressTime);
        }
      },10);
      $(this).ajaxSuccess(function(){
         var progressTime = setInterval(function(){
           currentProgress += 1;
           if(currentProgress <= '100'){
             $('.progressInnerDiv').css('width', currentProgress + '%');
           }else{
             clearInterval(progressTime);
           }
         },10);
         $(this).fadeOut('slow');
      });
    });
  };
  
})(jQuery);