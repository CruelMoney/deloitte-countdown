document.addEventListener("DOMContentLoaded", function() {
  console.log("ready");

  // Helper function 
  function numberToArray(num) {
    const arr = num.toString()
      .split('')
      .map(function(item, index) {
        return parseInt(item);
      });

    return arr.length < 2 ? [0, ...arr] : arr;
  }

  // Helper function 
  function getTimeUntil(date) {
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

  // Helper function 
  function getValElem(elem) {
    return Array.prototype.slice.call(elem.children)
    .find(function(c){return c.classList.contains('value')});
  }

  // Create HTML based of value
  function initValue(value) {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const list = '<ul><li>' + nums.join('</li><li>') + '</li></ul>';
    const len = Math.max(String(value.value).length, 2);
    let html = list.repeat(len);
    value.elem.innerHTML = html;
  }

   function translateToValue(value) {
    const valueHeight = value.elem.getBoundingClientRect().height;
    const digits = numberToArray(value.value);

    function animate(digit, idx){
      const elem = value.elem.children[idx];
      elem.style.transform = 'translateY(-'+ digit*valueHeight +'px)';
    }
    
    digits.forEach(animate);
  }

  // get object containing element refs and the current values for each element
  function getValues(elements, date){
    // object {days, hours, minutes, seconds}
    let timeObject = getTimeUntil(date);

    return elements.map(function(el){
      return {
        elem: getValElem(el),
        value: timeObject[el.getAttribute('data-unit')]
      }
    });
  }

  function initCountdown(countdown){
    // Create and find initial values
    const date = new Date(countdown.getAttribute('data-date'));
    const children = Array.prototype.slice.call(countdown.children);
    const values = getValues(children, date);
    values.forEach(initValue);
    values.forEach(translateToValue);

    // Upate frame each second
    setInterval(function(){
      let values = getValues(children, date);
      values.forEach(translateToValue);
    }, 1000);
  };

  Array.prototype.slice.call(document.querySelectorAll('.countdown'))
  .forEach(initCountdown);

});