$(function() {
   
  window.Synesthesia = {
    init:function(){
      Synesthesia.cancel();
      Synesthesia.isloggedOut();
    },
    isloggedOut:function(){
      $.ajax({
       type: 'get',
       // url: 'http://synesthesia-note.herokuapp.com/evernote/is_logged_in.json',
       url: 'http://localhost:3000/evernote/is_logged_in.json',
       success: function(res){
         if(!res.logged_in == true){//if NOT logged in, show login form
           $('#login-form').removeClass("hide");
           $('#email').focus();
         } else {
           $('#main-form').removeClass("hide");
           $('#text').focus();
         }
       },
       error: function(res){
         $('#text').html('did not get the json response');
       }
      });
    },
    createNeuron:function(){ 
      $('#createNeuron').click(function(){
        var url   = window.currentUrl;
        var text  = $('#text').val();
        json = {
          'neuron':{
            'url':url,
            'text':text
          }
        }
        $('#progress').progressBar();
        // rgba(0, 0, 0, 0.85);
        $.ajax({
         type: 'post',
         data: json,
         // url: 'http://synesthesia-note.herokuapp.com/neurons',
         url: 'http://localhost:3000/neurons',
         success: function(res){
           Synesthesia.selectImages(res);
         },
         error: function(res){
           $('#text').html('Your brain has rejected that meme.');
         }
        });
      });
    },
    selectImages:function(res){
      $('#main-form').addClass('hide');
      $('#image-selection').removeClass('hide');
      var jsonResponse = $.parseJSON(res); 
      $.each(jsonResponse, function(key, value) {
        var innerJSON = JSON.parse(jsonResponse[key]);         
        $('#images').append('<li><img src="http://localhost:3000'+ innerJSON.url +'" /></li>');
       });
    },
    cancel:function(){
      $('#cancel').click(function(){
        window.close();
      });
    }
  }
  
  Synesthesia.init();
  
});