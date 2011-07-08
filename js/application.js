$(function() {
   
  window.Synesthesia = {
    init:function(){
      Synesthesia.cancel();
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