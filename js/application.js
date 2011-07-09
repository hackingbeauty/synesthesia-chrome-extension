$(function() {
   
  window.Synesthesia = {
    init:function(){
      Synesthesia.cancel();
      Synesthesia.loggedOut();
    },
    loggedOut:function(){
      $.ajax({
       type: 'get',
       // url: 'http://synesthesia-note.herokuapp.com/evernote/is_logged_in.json',
       url: 'http://localhost:3000/evernote/is_logged_in.json',
       success: function(res){
         if(!res.logged_in == true){
           $('#login-form').removeClass("hide");
         } else {
           $('#main-form').removeClass("hide");
         }
       },
       error: function(res){
         $('#text').html('did not get the json response');
       }
      });
    },
    createNeuron:function(){ 
      var url   = window.currentUrl;
      var text  = $('#text').val();
      json = {
        'neuron':{
          'url':url,
          'text':text
        }
      }
      $('#createNeuron').click(function(){
        $.ajax({
         type: 'post',
         data: json,
         // url: 'http://synesthesia-note.herokuapp.com/neurons',
         url: 'http://localhost:3000/neurons',
         success: function(res){
           $('#text').html('Neuron successfully created.');
         },
         error: function(res){
           $('#text').html('Your brain has rejected that meme.');
         }
        });
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