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
  listAllCharacters(characters.results);
};

var listAllCharacters = function(characters){
  var characterList = document.getElementById('character-list');
  for(char of characters){
    if(char.image !== null){
      var newDiv = document.createElement('div');
      newDiv.className = "character";
      var ul = document.createElement('ul');
      var name = document.createElement('li');
      name.innerText = char.name;
      var image = document.createElement('img');
      image.src = char.image.small_url;
      image.alt = char.name + " image";
      image.className = "char_thumb";
      newDiv.appendChild(image);
      ul.appendChild(name);
      newDiv.appendChild(ul);
      characterList.appendChild(newDiv);
    }
  };
};

var app = function(){
  var key = new ComicKey().key;
  var url = "https://comicvine.gamespot.com/api/characters/?api_key=" + key + "&format=json";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
