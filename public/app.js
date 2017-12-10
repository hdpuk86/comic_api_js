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
  setNavBar(characters.results);
};

var setNavBar = function(characters){
  var li = document.getElementById('show-all');
  li.addEventListener('click', function(){listAllCharacters(characters)});
}

var listAllCharacters = function(characters){
  removeChildElements('character-display');
  var characterList = document.getElementById('character-display');
  for(char of characters){
    if(char.image !== null){
      var newDiv = document.createElement('div');
      newDiv.className = "character";
      newDiv.id = char.name;
      var ul = document.createElement('ul');
      ul.className = "ul-summary";
      var name = createLi(char.name);
      console.log(char.id);
      var url = "https://comicvine.gamespot.com/api/character/4005-" + char.id + "/?api_key=191f50086cb7483faf94e94b4af18064b0b6b3b8&format=json";
      var image = getThumbnail(char);
      ul.appendChild(name);
      newDiv.appendChild(image);
      newDiv.appendChild(ul);
      addCharacterListener(url, newDiv);
      };
      characterList.appendChild(newDiv);
    }
  };

var addCharacterListener = function(url, div){
  div.addEventListener('click', function(){
    makeRequest(url, characterRequestComplete);
  });
};

var characterRequestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var character = JSON.parse(jsonString);
  removeChildElements('character-display');
  console.log(character.results);
  var display = document.getElementById('character-display');
  if(character.results.description !== null){
    display.innerHTML = character.results.description;
  } else {
    display.innerHTML = "<p>Sorry there's no information about this character to display</p>"
  }
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
