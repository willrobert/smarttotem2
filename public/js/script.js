'use strict';

const socket = io();

const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
var property = document.querySelector('button');
var txtfield = document.getElementById('mensagem');
var latitute = "";
var longitude = "";

recognition.lang = 'pt-BR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.querySelector('button').addEventListener('click', () => {
  recognition.start();
  property.style.color = "#FF6347";
});

document.getElementById("myBtn").addEventListener("click", function(){
  if(txtfield.value != ""){
    console.log("Botao enviar pressioanado");
    console.log(txtfield.value);    
    socket.emit('chat message', txtfield.value); 
    txtfield.value = "";
  }  
});

txtfield.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      if(txtfield.value != ""){
        console.log(txtfield.value);    
      socket.emit('chat message', txtfield.value);
      txtfield.value = "";
      }      
    }
});

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.');
});

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.');

  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  outputYou.textContent = text;
  console.log('Confidence: ' + e.results[0][0].confidence);

  socket.emit('chat message', text);
});

recognition.addEventListener('speechend', () => {
  recognition.stop();
  property.style.color = "#FFFF";
});

recognition.addEventListener('error', (e) => {
  outputBot.textContent = 'Error: ' + e.error;
  property.style.color = "#FFFF";
});


function goToMap(){
  //var lat = document.getElementById("latitute").value;
 // var lng = document.getElementById("longitude").value;
  //var lat = "-3.432243";
  //var lng = "-5.432432";
  var current_url = document.URL.toString();
  console.log(current_url);
  //var current_url = "oi";

  var url = "maps/mapsTesteComURL.html"

  if(latitute == null){
    latitute = "0.0";
  }
  if(longitude == null){
    longitude = "0.0";
  }
  var navigate = url + "?lat=" + latitute.toString() + "&lng=" + longitude.toString() + "&prev=" + current_url;

  //window.alert(navigate);
  window.location = navigate;
  //window.location = "mapsTesteComURL.html?lat=3&lng=-60";
}

function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);

  utterance.onend = function(event) {
    console.log('Fim da saida de voz');
    //recognition.start();
  }
  
}

socket.on('bot reply', function(replyText) {
  synthVoice(replyText);

  if(replyText == '') replyText = '(No answer...)';
  if(replyText.substring(0, 5) == 'local') {
    console.log('Text Match!');

    latitute = replyText.substring(6, replyText.indexOf(','));
    console.log(latitute);

    longitude = replyText.substring(replyText.indexOf(',')+1,)
    console.log(longitude);
    goToMap();
    
  }
  outputBot.textContent = replyText;  
});


