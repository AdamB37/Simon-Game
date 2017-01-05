$(document).ready(function(){




  var lightSeq = [];
  var turn = 0;
  var attempts = 0;



  $("#Start").click(function(){
    lightSeq = [];
    turn = 2;
    for(var i=0; i<20; i++){
      lightSeq.push(Math.floor(Math.random()*4));
    }
    computerPhase();

  });

  //player phase
  const playerPhase = function(){
    console.log('playerPhase');
    attempts = 0;
    clickableAll();
  }

  var click = false;

  $('.target').mousedown(function () {
    if($(this).hasClass('clickable')){
      active($(this));
      click=true;
    }
  });

  $(".target").mouseup(function () {
    if (click == true){
      release();
    }
  });

  $(".target").mouseout(function () {
    if (click == true){
      release();
    }
  });

  var release = function(){
    deActive($('.light'));
    attempts++;
    click = false;
    console.log('attempts',attempts,'turn',turn);
    if(attempts == turn){
      computerPhase();
    }
  }

  //computer phase
  const computerPhase = function(){
    unClickableAll();
    turn++;
    console.log('computerPhase');
    var num;

    var i = 0;
    function myLoop(){
      num = lightSeq[i].toString();

      if(!$('.'+num).hasClass('light')){
        setTimeout(function() {
          active($('.'+num));
          if(i < turn){
            myLoop();
          }
        },200)
      }
      else {
        setTimeout(function() {
          deActive($('.'+num))
          i++;
          if(i < turn){
            myLoop();
          }
        }, 800);

        console.log(i,turn);
        if(i+1==turn){
          playerPhase();
        }
      }

    }
    myLoop();
  }

  //functions

  var active = function(color){
    if(color.prop('id')!= null){
      $(color).addClass("light");
    }
  }

  var deActive = function(color){
    if(color.prop('id')!= null){
      $(color).removeClass("light");
    }
  }

  var unClickableAll = function(){
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
