$(document).ready(function(){




  var lightSeq = [];
  var turn = 0;
  var attempts = 0;
  var strictMode = false;


  $("#Start").click(function(){
    lightSeq = [];
    turn = 0;
    for(var i=0; i<20; i++){
      lightSeq.push(Math.floor(Math.random()*4));
    }
    computerPhase();

  });

  $("#Strict").click(function(){
    strictModeToggle($(this));
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
      release($(this));
    }
  });

  $(".target").mouseout(function () {
    if (click == true){
      release($(this));
    }
  });

  var release = function(curClick){
    deActive($('.light'));
    if(!curClick.hasClass(lightSeq[attempts].toString())){
      if(strictMode){
        setTimeout(function(){
          lightSeq = [];
          turn = 0;
          for(var i=0; i<20; i++){
            lightSeq.push(Math.floor(Math.random()*4));
          }
          computerPhase();
        },600)
      }
      else{
        
          turn--;;
          computerPhase();
      }
    }

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
  var strictModeToggle = function(button){
    if(strictMode){
      strictMode = false;
      if(button.prop('id') != null){
        button.removeClass("dark");
      }
    }
    else if(!strictMode){
      strictMode = true;
      if(button.prop('id') != null){
        button.addClass("dark");
      }
    }
  }

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
