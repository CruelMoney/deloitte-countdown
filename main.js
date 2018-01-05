document.addEventListener("DOMContentLoaded", function() {
  console.log("ready");

  const numberToArray = (num) => {
    const arr = num.toString()
      .split('')
      .map(function(item, index) {
        return parseInt(item);
      });

    return arr.length < 2 ? [0, ...arr] : arr;
  }

  const getTimeUntil = (date) => {
    const now = new Date();
    let diff = date - now;

    if(diff <= 0){
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }

    let daysLeft = Math.floor(diff / (1000*60*60*24));
    diff -= daysLeft*(1000*60*60*24);
    let hoursLeft = Math.floor(diff / (1000*60*60));
    diff -= hoursLeft*(1000*60*60);
    let minutesLeft = Math.floor(diff / (1000*60));
    diff -= minutesLeft*(1000*60);
    let secondsLeft = Math.floor(diff / (1000));

    return {
      days: daysLeft,
      hours: hoursLeft,
      minutes: minutesLeft,
      seconds: secondsLeft
    }
  }

  const getValElem = (elem) => {
    return Array.prototype.slice.call(elem.children)
    .find(c => c.classList.contains('value'));
  }

  const initValue = (value) => {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const list = '<ul><li>' + nums.join('</li><li>') + '</li></ul>';
    const len = Math.max(String(value.value).length, 2);
    let html = list.repeat(len);
    value.elem.innerHTML = html;
  }

  const translateToValue = (value) => {
    const valueHeight = value.elem.getBoundingClientRect().height;
    const digits = numberToArray(value.value);
    digits.forEach((digit, idx) => {
      const elem = value.elem.children[idx];
      elem.style.transform = 'translateY(-'+ digit*valueHeight +'px)';
    });
  }

  Array.prototype.slice.call(document.querySelectorAll('.countdown'))
  .forEach(countdown => {
    const date = new Date(countdown.getAttribute('data-date'));

    let {days, hours, minutes, seconds} = getTimeUntil(date);

    const children = Array.prototype.slice.call(countdown.children);
    const daysElem = getValElem(children.find(c => c.classList.contains('days')));
    const hoursElem = getValElem(children.find(c => c.classList.contains('hours')));
    const minutesElem = getValElem(children.find(c => c.classList.contains('minutes')));
    const secondsElem = getValElem(children.find(c => c.classList.contains('seconds')));
  
    let values = [
      { elem: daysElem, value: days },
      { elem: hoursElem, value: hours },
      { elem: minutesElem, value: minutes },
      { elem: secondsElem, value: seconds }
    ];

    values.forEach(value => {
      initValue(value);
      translateToValue(value);
    });

    setInterval(()=>{
      let {days, hours, minutes, seconds} = getTimeUntil(date);
      let values = [
        { elem: daysElem, value: days },
        { elem: hoursElem, value: hours },
        { elem: minutesElem, value: minutes },
        { elem: secondsElem, value: seconds }
      ];
      values.forEach(value => {
        translateToValue(value);
      });  
    }, 1000);

  });
});