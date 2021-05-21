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

    setBatteryLevel = function(value){
      value *= 100;
      let element = $('#battery .progress-bar');
      
      element.css('width', `${(value)}%`);
      element.removeClass('more-than-75 between-75-50 between-50-75 less-than-25');
      if (value >= 75){
        element.addClass('more-than-75');
      }
      else if (value >= 50 && value < 75) {
        element.addClass('between-75-50');
      }
      else if (value >= 25 && value < 50) {
        element.addClass('between-50-75');
      }
      else {
        element.addClass('less-than-25');
      }
    };
    
    setCharging = function(charging){
      let element = $('#battery .progress-bar');
      if (charging){
        element.addClass('charging');
      }
      else {
        element.removeClass('charging');
      }
    };

    getBatteeryInfo = function(){
      navigator.getBattery().then(function(battery) {
        const onLevelChange = function(){ 
          setBatteryLevel(battery.level);
        }
        battery.removeEventListener('levelchange', onLevelChange);
        battery.addEventListener('levelchange', onLevelChange);
        
        const onChargingChange = function(){
          setCharging(battery.charging);
        };

        battery.removeEventListener('chargingchange', onChargingChange);
        battery.addEventListener('chargingchange', onChargingChange);
        
        setBatteryLevel(battery.level);
        setCharging(battery.charging);
      });
    }

    $(document).off('touchend click')
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
