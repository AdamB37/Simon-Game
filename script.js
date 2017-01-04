$(document).ready(function(){

  
  $(".target").click(function () {
    
  if($(this).hasClass('clickable')){
    
      $(this).addClass("light");
      unClickableAll();
      console.log('clicked');

      setTimeout(function () {
        $(".target").removeClass("light");
        clickableAll();
      }, 3000);
    
  }
  });
  
  var unClickableAll = function(){
    console.log('unclickable');
    $('.target').each(function(){      
      $(this).removeClass('clickable');
      
    });
  }
  
  var clickableAll = function(){
    $('.target').each(function(){      
      $(this).addClass('clickable');
    });
  }
  
});