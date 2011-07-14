$(function() {
   
  window.Synesthesia = {
    productionUrl:'http://synesthesia-note.herokuapp.com/',
    // productionUrl:'http://localhost:3000/',
    init:function(){
      Synesthesia.cancel();
      Synesthesia.isloggedOut();
    },
    isloggedOut:function(){
      $.ajax({
       type: 'get',
       url: Synesthesia.productionUrl + 'evernote/is_logged_in.json',
       success: function(res){
         if(!res.logged_in == true){//if NOT logged in, show login form
           $('#login-form').removeClass("hide");
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
        $.ajax({
         type: 'post',
         data: json,   
         url: Synesthesia.productionUrl + 'neurons',
         success: function(res){
           Synesthesia.displayCandidateImages(res);
         },
         error: function(res){
           $('#text').html('Your brain has rejected that meme.');
         }
        });
      });
    },
    displayCandidateImages:function(res){
      $('#main-form').addClass('hide');
      $('#image-selection').removeClass('hide');
    
      var jsonResponse = $.parseJSON(res); 
      var neuronId = jsonResponse.id;   
      var candidatePics = jsonResponse.candidate_pictures;
      
      $.each(candidatePics, function(key, value) {
         var photo = JSON.parse(candidatePics[key]);
         $('#images').append('<li id="'+ photo.picture_id +'" class="img"><img src="'+ photo.url +'" /></li>');        
      });
      
      Synesthesia.sendSelectedImage(neuronId);
    },
    sendSelectedImage:function(neuronId){
      $('#images li.img').click(function(){
        $.ajax({
           type: 'post',
           dataType: 'json',
           data: { '_method': 'put', neuron: {picture_id: $(this).attr('id')} },   
           url: Synesthesia.productionUrl + 'neurons' + '/' + neuronId,
           success: function(res){
             $('#images').append('<li>success!</li>');
           },
           error: function(res){
             $('#images').append('<li>error!</li>');
             $('#images').append('<li>' + res.responseText + '</li>');
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