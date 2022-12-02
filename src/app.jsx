import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { Fragment } from "preact";
import * as dayjs from 'dayjs'

export function App() {
  const [hour1, set_hour1] = useState('-');
  const [hour2, set_hour2] = useState('-');
  const [minute1, set_minute1] = useState('-');
  const [minute2, set_minute2] = useState('-');
  const [seconds, set_seconds] = useState(0);
  const [tick, set_tick] = useState(1);

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
  }

  useEffect(() => {
    setInterval(() => {
      setHourDigits(getHours());
      setMinutesDigits(getMinutes());
      set_seconds(dayjs().second());
    }, 1000 * 1);
  }, []);

  useEffect(() => {
    set_tick(seconds % 2);
  }, [seconds]);

  return (
    <Fragment>
      <div class="main-wrapper">
        <span class="clock-wrapper">
          <span class="clock">
            <span class="digit hour-1">{hour1}</span>
            <span class="digit hour-2">{hour2}</span>
            <span className={'pulse' + (tick === 1 ? '' : ' black')}>:</span>
            <span class="digit minute-1">{minute1}</span>
            <span class="digit minute-2">{minute2}</span>
          </span>
        </span>
      </div>
    </Fragment>
  );
}
