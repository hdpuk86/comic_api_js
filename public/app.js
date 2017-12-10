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
      var name = createLi(char.name);
      console.log(char.id);
      var url = "https://comicvine.gamespot.com/api/character/4005-" + char.id + "/?api_key=191f50086cb7483faf94e94b4af18064b0b6b3b8&format=json";
      var image = getThumbnail(char);
      ul.appendChild(name);
      newDiv.appendChild(image);
      newDiv.appendChild(ul);
      newDiv.addEventListener('click', function(){
        makeRequest(url, characterRequestComplete);
      });
      characterList.appendChild(newDiv);
    }
  };
};

var characterRequestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var character = JSON.parse(jsonString);
  removeChildElements('character-list');
  console.log(character.results);
}

var removeChildElements = function(nodeId){
  var node = document.getElementById(nodeId);
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

var getThumbnail = function(char){
  var image = document.createElement('img');
  image.src = char.image.small_url;
  image.alt = char.name + " image";
  image.className = "char_thumb";
  return image;
};

var createLi = function(innerText){
  var li = document.createElement('li');
  li.innerText = innerText;
  return li;
};

var app = function(){
  // var key = new ComicKey().key;
  var url = "https://comicvine.gamespot.com/api/characters/?api_key=191f50086cb7483faf94e94b4af18064b0b6b3b8&format=json";
  makeRequest(url, requestComplete);
};

window.addEventListener('load', app);
