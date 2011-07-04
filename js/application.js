$(function() {
   
  Synesthesia = {
    init:function(){
      Synesthesia.createNeuron();
      Synesthesia.deleteMeme();
    },
    createNeuron:function(){
      $('#createNeuron').click(function(){
         $.ajax({
           type: 'post',
           data: { '_method': 'delete', 'authenticity_token' : "rails_authenticity_token" },
           url: this.href,
           success: function(){

           },
           error: function(){

           }
         });
       });
    },
    deleteMeme:function(){
      $('#deleteMeme').click(function(){
        $.ajax({
          type: 'post',
          data: { '_method': 'delete', 'authenticity_token' : "rails_authenticity_token" },
          url: this.href,
          success: function(){

          },
          error: function(){
    
          }
        });
      });
    }
  }
  
  Synesthesia.init();
  
});