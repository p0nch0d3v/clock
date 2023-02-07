import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { Fragment } from "preact";
import dayjs from "dayjs";

export function App() {
  const [hour1, set_hour1] = useState("-");
  const [hour2, set_hour2] = useState("-");
  const [minute1, set_minute1] = useState("-");
  const [minute2, set_minute2] = useState("-");
  const [seconds, set_seconds] = useState(0);
  const [tick, set_tick] = useState(0);
  const [orientation, set_orientation] = useState(null);

  const getHours = function () {
    return dayjs().format("hh");
  };

  const getMinutes = function () {
    return dayjs().format("mm");
  };

  const setHourDigits = function (hour) {
    if (hour.length > 1) {
      set_hour2(hour[1]);
    }
    set_hour1(hour[0]);
  };

  const setMinutesDigits = function (minute) {
    if (minute.length > 1) {
      set_minute2(minute[1]);
    }
    set_minute1(minute[0]);
  };

  const toggleFullScreen = function () {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const getAspectRatio = () => {
    return window.outerWidth / window.outerHeight
  }

  const isPortrait = () => {
    return orientation === 0 || orientation === 180;
  };

  useEffect(() => {
    setInterval(() => {
      setHourDigits(getHours());
      setMinutesDigits(getMinutes());
      set_seconds(dayjs().second());
    }, 1000 * 1);

    const onOrientationChange = (e) => {
      set_orientation(e?.target?.angle || null);
    }
    window?.screen?.orientation?.removeEventListener('change', onOrientationChange);
    window?.screen?.orientation?.addEventListener('change', onOrientationChange);

    const onResize = (e) => {
      if (orientation === null) {
        setTimeout(() => {
          set_orientation(getAspectRatio() > 1 ? 90 : 0);
        }, 1);
      }
    };
    window.removeEventListener("resize", onResize);
    window.addEventListener("resize", onResize);

    setTimeout(() => {
      set_orientation(window?.screen?.orientation?.angle || null);
    }, 1);
    if (orientation === null) {
      setTimeout(() => {
        set_orientation(getAspectRatio() > 1 ? 90 : 0);
      }, 1);
    }
  }, []);

  useEffect(() => {
    set_tick(seconds % 2);
  }, [seconds]);

  return (
    <div className={`clock ${isPortrait() ? 'portrait' : ''}`} onTouchEnd={toggleFullScreen}>
      <span class="digit hour-1">{hour1 !== "0" ? hour1 : <>&nbsp;</>}</span>
      <span class="digit hour-2">{hour2}</span>
      {
        isPortrait() ?
          <>
            <span style={{ flexBasis: '100%', height: 0 }}></span>
            <span className={`pulse ${(tick === 1 ? "" : " black")}`}>-</span>
            <span className={`pulse ${(tick === 1 ? "" : " black")}`}>-</span>
            <span style={{ flexBasis: '100%', height: 0 }}></span>
          </>
          :
          <>
            <span className={`pulse ${(tick === 1 ? "" : " black")}`}>:</span>
          </>
      }
      <span class="digit minute-1">{minute1}</span>
      <span class="digit minute-2">{minute2}</span>
    </div>
  );
}
