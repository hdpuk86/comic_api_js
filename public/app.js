var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var characters = JSON.parse(jsonString);
  console.log(characters.results[0]);
};

var app = function(){
  var key = new ComicKey().key;
  var url = "https://comicvine.gamespot.com/api/characters/?api_key=" + key + "&format=json";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
