$( document ).ready(function() {
    $('textarea').closest('.new-tweet').keyup(function() {
      let maxLength = 140;
      let character = $('textarea').val().length;
      maxLength = maxLength  - character;
      $(this).find('.counter').text(maxLength);

      if(maxLength < 0){
        $(this).find('.counter').css({'color': 'red'})
      } else {
        $(this).find('.counter').css({'color': 'black'})
      }
      console.log(maxLength);
    })
});