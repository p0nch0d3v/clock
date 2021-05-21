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
    };

    toggleFullScreen = function toggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
       }
     }
    };

    getBatteeryInfo = function(){
      navigator.getBattery().then(function(battery) {
        battery.addEventListener('levelchange', function(){
          $('#battery .progress-bar').css('width', `${(battery.level * 100)}%`);
        });
        battery.addEventListener('chargingchange', function(){
          if (battery.charging) {
            $('#battery .progress-bar').removeClass('dis_charging');
            $('#battery .progress-bar').addClass('charging');
          }
          else {
            $('#battery .progress-bar').removeClass('charging');
            $('#battery .progress-bar').addClass('dis_charging');
          }
        });
        
        $('#battery .progress-bar').css('width', `${(battery.level * 100)}%`);
        if (battery.charging) {
          $('#battery .progress-bar').removeClass('dis_charging');
          $('#battery .progress-bar').addClass('charging');
        }
        else {
          $('#battery .progress-bar').removeClass('charging');
          $('#battery .progress-bar').addClass('dis_charging');
        }
      });
    }

    $(document).on('touchend click', function(){
      toggleFullScreen();
    });


    $(document).ready(function(){
        startClock();
        setInterval(function(){
          getBatteeryInfo();
        }, (1000 * 60));
        getBatteeryInfo();
    });
})();
