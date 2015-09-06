
$(function(){

  var jumble = $('.skill'),
      //add the start and finish class respectively
      start = $('h1', jumble).first().addClass('start'),
		  finish = start.next().addClass('finish');

  start.css({'opacity':'1'});

  //jumble is designed to fire only when told to
  //it does not automatically cycle
  function jumbleIt(i) {
    setTimeout(function(){
      if (i <= 4) {
        jumble.jumble();
        jumbleIt(i+1);
      }
    }, 1600);
  }
  //kick off jumble function
  jumbleIt(1);

});