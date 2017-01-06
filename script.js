$(document).ready(function(){

  var lightSeq = [];
  var turn = 0;
  var attempt = 1;
  var strictMode = false;
  var colorIndex = {Red:1,Green:2,Yellow:3,Blue:4};


  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  oscillator.start();
  oscillator.type = 'sawtooth';
  gainNode.connect(audioCtx.destination);


  $("#Start").click(function(){
    start();
    computerPhase();
    $("#Start").text('Restart');
  });

  $("#Strict").click(function(){
    strictModeToggle($(this));
  });

  //player phase
  const playerPhase = function(){
    attempt = 1;
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
    click = false;
    deActive($('.light'));

    if(!curClick.hasClass(lightSeq[attempt-1].toString())){
      if(strictMode){
        $('#Counter').text("You Lose");

      }
      else{
          turn--;
          $('#Counter').text("Try Again");
          setTimeout(function(){
            computerPhase();
          },1000)
      }
    }

    else if(attempt == turn && !winCheck()){
      computerPhase();
    }
    if(attempt<=turn){
      attempt++;
    }
  }

  //computer phase
  const computerPhase = function(){
    unClickableAll();
    turn++;
    $('#Counter').text(turn);
    attempt = 1;
    var num;

    var i = 0;
    var myLoop = function(){
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

  var winCheck = function(){
    if(turn == 20){
     $('#Counter').text("You WIN!");
     return true;
    }
    return false;
  }

  var start = function() {
    lightSeq = [];
    turn = 0;
    for(var i=0; i<20; i++){
      lightSeq.push(Math.floor(Math.random()*4));
    }
  }

  var active = function(color){
    if(color.prop('id')!= null){
      $(color).addClass("light");
      //$('.' + color.prop('id')).get(0).play();
      oscillator.frequency.value = colorIndex[color.prop('id')]*100;
      oscillator.connect(gainNode);
    }
  }

  var deActive = function(color){
    if(color.prop('id')!= null){
      $(color).removeClass("light");
      oscillator.disconnect(gainNode);

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
