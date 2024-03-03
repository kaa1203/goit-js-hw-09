// Described in documentation
import flatpickr from "flatpickr";
// Additional styles import
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";


const refs = {
    input: document.querySelector("#datetime-picker"),
    start: document.querySelector("button[data-start]"),
    day: document.querySelector("span[data-days]"),
    hour: document.querySelector("span[data-hours]"),
    min: document.querySelector("span[data-minutes]"),
    sec: document.querySelector("span[data-seconds]")
}

refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = Date.now();
        const targetDate = selectedDates[0];

        if (targetDate < currentDate) {
            Notify.failure("Please choose a date in the future");
            refs.start.disabled = true;
            return;
        }
        refs.start.disabled = false;
        let timerId = null;

        const onClick = () => {
            refs.input.disabled = true;
            refs.start.disabled = true;
            timerId = setInterval(() => {
                const now = Date.now();
                const dateDiff = targetDate - now;
                const { days, hours, minutes, seconds } = convertMs(dateDiff);

                if (targetDate < now) {
                    clearInterval(timerId);
                    refs.input.value = "";
                    refs.input.disabled = false;
                }
                refs.day.textContent = addLeadingZero(days);
                refs.hour.textContent = addLeadingZero(hours);
                refs.min.textContent = addLeadingZero(minutes);
                refs.sec.textContent = addLeadingZero(seconds);
            }, 1000);
        }

        refs.start.addEventListener("click", onClick);
        
  },
};

flatpickr(refs.input, options);

function addLeadingZero(value) {
	return String(value).padStart(2, "0"); 
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
