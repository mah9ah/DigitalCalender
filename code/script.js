
function updateDigitalClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('digital-clock').textContent = 
      `${hours}:${minutes}:${seconds}`;
}


function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDeg = (hours * 30) + (minutes * 0.5);
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  document.getElementById('hour-hand').style.transform = 
      `rotate(${hourDeg}deg)`;
  document.getElementById('minute-hand').style.transform = 
      `rotate(${minuteDeg}deg)`;
  document.getElementById('second-hand').style.transform = 
      `rotate(${secondDeg}deg)`;
}


let currentDate = new Date();

function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
  
  document.getElementById('calendar-month').textContent = 
      `${monthNames[month]} ${year}`;

  const calendarGrid = document.getElementById('calendar-grid');
  calendarGrid.innerHTML = '';

  
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weekdays.forEach(day => {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.className = 'calendar-day weekday';
      calendarGrid.appendChild(dayElement);
  });

  
  for (let i = 0; i < firstDay.getDay(); i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day';
      calendarGrid.appendChild(emptyDay);
  }

  
  const today = new Date();
  for (let day = 1; day <= lastDay.getDate(); day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      dayElement.className = 'calendar-day';
      
      if (year === today.getFullYear() && 
          month === today.getMonth() && 
          day === today.getDate()) {
          dayElement.classList.add('current-day');
      }
      
      calendarGrid.appendChild(dayElement);
  }
}


document.getElementById('prev-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

document.getElementById('next-month').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});


function updateAll() {
  updateDigitalClock();
  updateAnalogClock();
}


updateCalendar();
updateAll();
setInterval(updateAll, 1000);
