(function(){
    let startClock = function(){
        let interval = 1;
        $('.clock .hour').text(moment().format("HH"));
        $('.clock .minute').text(moment().format("mm"));
        setInterval(() => {
            $('.clock .hour').text(moment().format("HH"));
            $('.clock .minute').text(moment().format("mm"));
            if (interval === 1){
                $('.clock .pulse').removeClass('black');
            }
            else if (interval === -1){
                $('.clock .pulse').addClass('black');
            }
            interval *= -1;
        }, 1000);
    }

    function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
       }
     }
    }

    $(document).on('touchend click', function(){
      console.log();
      toggleFullScreen();
    });


    $(document).ready(function(){
        startClock();
    });
})();
