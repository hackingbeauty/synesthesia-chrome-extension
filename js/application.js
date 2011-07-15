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
        var theUrl   = window.currentUrl;
        var theText  = $('#text').val();
        $('#progress').progressBar();
        $.ajax({
          type: 'post',
          // dataType: 'json',  
          data: {neuron: {url: theUrl, text: theText}}, 
          url: Synesthesia.productionUrl + 'neurons',
          success: function(res){
            Synesthesia.displayCandidateImages(res);
          },
          error: function(jqXHR, textStatus, errorThrown){
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
           // dataType: 'json',
           data: { '_method': 'put', neuron: {picture_id: $(this).attr('id')} },   
           url: Synesthesia.productionUrl + 'neurons' + '/' + neuronId,
           success: function(res){
             $('#images').append('<li>success!</li>');
           },
           error: function(res){
              $('#images').append('<li>Shoot! I was not able to select that picture.</li>');
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