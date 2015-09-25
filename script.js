(function(){
  "use strict";
  
  var source = 'words.json',
      target = '.result',
      mashapeApiKey = prompt('Enter mashapeApiKey: ', '');
  
  function generateDefinitions(source, target, mashapeApiKey) {
    
    window.wordsWithDefs = {};
    
    function addDefinition(word, i, isLast) {
      $.ajax({
              url: 'https://wordsapiv1.p.mashape.com/words/' + word + '/definitions',
              type: 'GET',
              dataType: 'json',
              success: function(data) {
                var definitions = [];
                for (var i = 0; i < data.definitions.length; i++) {
                   definitions.push(data.definitions[i].definition);
                }
                window.wordsWithDefs[word] = definitions;
                 if(isLast) {
                   $(target).html(JSON.stringify(window.wordsWithDefs));
                 }
                 
              },
              error: function(err) { console.dir(err); },
              beforeSend: function(xhr) { xhr.setRequestHeader("X-Mashape-Authorization", mashapeApiKey); }
          });
    }
    
    $.getJSON(source, function( data ) {
      for (var i = 0, isLast; i < data.length; i++) {
         var word =  data[i];
         isLast = i == data.length - 1 ? true : false;
        addDefinition(word,i,isLast);
      }        
    
    });
  }
  
})();