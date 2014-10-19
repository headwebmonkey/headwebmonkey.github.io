var townAI = function(townID){
  var ai = {};
    ai.town = document.getElementById(townID);
    ai.cars = [];
    ai.roads = [];
    ai.entryPoints = [];
    ai.maxTiles = 0;
    ai.maxRows = 0;
    ai.init = function(){
      // initializes the town, click handlers, stop light controller, and car AI
      // Add an index number to the rows
      var rows = ai.town.getElementsByClassName('row');
      ai.maxRows = rows.length-1;
      for(var i=0; i<rows.length; i++){
        rows[i].dataset.elementIndex = i;
        // Add index number to tiles
        ai.roads[i] = [];
        var tiles = rows[i].getElementsByTagName('div');
        ai.maxTiles = tiles.length-1;
        var roadTiles = 0;
        for(var j=0; j<tiles.length; j++){
          tiles[j].dataset.elementIndex = roadTiles;
          if(tiles[j].className.indexOf("road") > -1){
            ai.roads[i][roadTiles] = new roadAI(tiles[j], ai);
          }
          if(tiles[j].className.indexOf("trafficLight") === -1){
            roadTiles++;
          }
        }
      }
      setInterval(ai.newRandomCar, 1500);
    }
    ai.newRandomCar = function(){
      var entryPointCount = Object.keys(ai.entryPoints).length;
      
      var randomEntryPoint = (Math.floor(Math.random() * entryPointCount));
      new carAI(ai.entryPoints[randomEntryPoint], ai);
    }
  
  ai.init();
  return ai;
};

var simpleTown = new townAI("simpleTown");

// new carAI({heading: "N", row: "4", tile: "3"}, simpleTown);
// new carAI({heading: "E", row: "2", tile: "0"}, simpleTown);
// new carAI({heading: "S", row: "0", tile: "3"}, simpleTown);
// new carAI({heading: "W", row: "2", tile: "6"}, simpleTown);

// setTimeout(function(){
//   new carAI({heading: "W", row: "2", tile: "6"}, simpleTown);
// }, 500);