$(function() {
   
  window.Synesthesia = {
    productionUrl:'http://glowing-dawn-189.heroku.com/',
    // productionUrl:'http://localhost:3000/',
    init:function(){
      Synesthesia.cancel();
      Synesthesia.isloggedIn();
    },
    isloggedIn:function(){
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
            $('#notification').html('<p><span class="success">Neuron successfully created</span> - Select an image for your neuron.</p>');            
            Synesthesia.displayCandidateImages(res);
          },
          error: function(jqXHR, textStatus, errorThrown){
            $('#notification').html('<p class="error">Your brain has rejected that meme.</p>');
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
      $('#images li.img').live('click',function(){
        $('#progress').progressBar();
        $.ajax({
           type: 'post',
           // dataType: 'json',
           data: { '_method': 'put', neuron: {picture_id: $(this).attr('id')} },   
           url: Synesthesia.productionUrl + 'neurons' + '/' + neuronId,
           success: function(res){
             $('#notification').html();
             $('#notification').html('<p class="success" id="success-msg">Successfully selected image</p>');
           },
           error: function(jqXHR, textStatus, errorThrown){
             $('#notification').html();
             $('#notification').html('<p id="error-msg"><span class="error">Shoot!</span> Try selecting another image.</p>');
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