$(function() {
   
  window.Synesthesia = {
    createNeuron:function(){ 
      var url   = $('#url').val();
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
         url: 'http://synesthesia-note.herokuapp.com/neurons',
         // url: 'http://localhost:3000/neurons',
         success: function(res){
           $('#text').html('successfully stored neuron!');
         },
         error: function(res){
           $('#text').html('boo-hoo!');
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
  
  Synesthesia.cancel();
  
    
});