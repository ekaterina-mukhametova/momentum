// DOM Elements  
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  btn = document.querySelector('.btn'),
  btn2 = document.querySelector('.btn2'),
  city = document.querySelector('.city'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  wind = document.querySelector('.wind'),
  humidity = document.querySelector('.humidity'),
  message = document.querySelector('.message');

const base = ['assets/images/night/', 'assets/images/morning/', 'assets/images/day/', 'assets/images/evening/'], 
  image = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg'];
let i = 0;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Show date
function showDate() {
  let today = new Date(),
    month = today.getMonth(),
    weekday = today.getDay(),
    dat = today.getDate();

   weekdayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  month = monthArr[month];
  weekday = weekdayArr[weekday];

  date.innerHTML = `${weekday}<span>, </span>${month}<span> </span>${dat}`;

  setTimeout(showDate, 1000);
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  } else if (hour < 12) {
    // Morning
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      let check = isEmpty(name.textContent);
      if (!check) {
        localStorage.setItem('name', e.target.innerText);
      }
      name.blur();
      getName();
    }
  } 
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      let check = isEmpty(focus.textContent);
      if (!check) {
        localStorage.setItem('focus', e.target.innerText);
      } 
      focus.blur();
      getFocus();
    }
  } 
}

function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

function setCity(event) {
 if (event.code === 'Enter') {
   let check = isEmpty(city.textContent);
   if (!check) {
     getWeather();
     localStorage.setItem('city', event.target.innerText);
   }
   getCity();
   city.blur();
 }
}

// Check Empty String
function isEmpty(str) {
  return (str.length === 0 || !str.trim());
};

// Clear input box
function clearContent(e) {
  e.target.innerText = '';
}

//Get Random Array
var images = (function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
})(image);

function viewBgImage(data) {
   body = document.querySelector('body');
   src = data;
   img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}

function getImage() {
  let todays = new Date();
  let hours = todays.getHours();
  let timeOfDay = '';
  if (hours < 6) {
    timeOfDay = base[0];
  } else if (hours < 12) {
    timeOfDay = base[1];
  } else if (hours < 18) {
    timeOfDay = base[2];
  } else {
    timeOfDay = base[3];
  }
   index = i % images.length;
   imageSrc = timeOfDay + images[index];
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
}

async function getWeather() {
  try {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=ec6e482f656f5fabcf5488a234648fa1&units=metric`;
  res = await fetch(url);
  data = await res.json();

 weatherIcon.className = 'weather-icon owf';
 weatherIcon.classList.add(`owf-${data.weather[0].id}`);
 temperature.textContent = `${data.main.temp}°C`;
 weatherDescription.textContent = data.weather[0].description;
 wind.textContent = `wind speed: ${data.wind.speed} km/h`;
 humidity.textContent = `humidity: ${data.main.humidity}%`;
  } catch(err) {

message.textContent = `error`;
  }
}



async function getQuote() {  
  url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  res = await fetch(url);
  data = await res.json(); 
 blockquote.textContent = data.quoteText;
 figcaption.textContent = data.quoteAuthor;
}

name.addEventListener('keypress', setName);
name.addEventListener('click', clearContent);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('click', clearContent);
btn.addEventListener('click', getImage);
document.addEventListener('DOMContentLoaded', getQuote);
btn2.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('click', clearContent);

// Run
showTime();
showDate();
setBgGreet();
getName();
getFocus();
getQuote();
getImage();
getCity();
