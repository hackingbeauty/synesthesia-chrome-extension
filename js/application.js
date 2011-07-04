// function pasteSelection() {
//   chrome.tabs.getSelected(null, function(tab) {
//     chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
//       var text = document.getElementById('text'); 
//       text.innerHTML = response.data;
//     });
//   });
// }

// $(function() {
//   Synesthesia =  {
//     init:function(){
//       chrome.tabs.getSelected(null, function(tab) {
//         chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
//           var text = document.getElementById('text'); 
//           text.innerHTML = response.data;
//         });
//       });
//     }
//   }
//   
//   Synesthesia.init();
//   
// });
// $(function() {
//   
//   Synesthesia = {
//     selectedText:null,
//     init:function(){
//       Synesthesia.getSelectedText();
//     },
//     getSelectedText:function(){
//       $('#clipAction').click(function(){
//         // chrome.tabs.getSelected(null, function(tab) {
//         //    chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function (response) {
//         //      var text = document.getElementById('text'); 
//         //      text.innerHTML = response.data;
//         //      alert(text.innerHTML);
//         //    });
//         //  });
//         //  Synesthesia.selectedText = window.getSelection().toString();
//         // Synesthesia.createNeuron();
//       });
//     },
//     createNeuron:function(){
//       $.blockUI({ message: $('<div>' + Synesthesia.selectedText + '</div>' +
//       '<button id="save">Save</button> ' +
//       '<button id="cancel">Cancel</button>'), css: { width: '275px' } }); 
//       $('.blockOverlay').attr('title','Click to unblock').click($.unblockUI); 
//       $('#save').click(function(){
//         $.blockUI({ message: "<h1>Remote call in progress...</h1>" });
//         $.ajax({ 
//           url: 'wait.php', 
//           cache: false, 
//           complete: function() { 
//              $.unblockUI(); // unblock when remote call returns 
//           } 
//         });
//       });
//       $('#cancel').click(function(){
//         $.unblockUI(); 
//         return false; 
//       });
//       
//       // $('#yes').click(function() { 
//       //    // update the block message 
//       //    $.blockUI({ message: "<h1>Remote call in progress...</h1>" }); 
//       // 
//       //    $.ajax({ 
//       //        url: 'wait.php', 
//       //        cache: false, 
//       //        complete: function() { 
//       //            // unblock when remote call returns 
//       //            $.unblockUI(); 
//       //        } 
//       //    }); 
//       // }); 
//       // 
//       // $('#no').click(function() { 
//       //    $.unblockUI(); 
//       //    return false; 
//       // });
//     }
//   }
//   
//   Synesthesia.init();
//   
// });
// 
