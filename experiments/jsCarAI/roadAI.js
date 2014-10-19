var roadAI = function(roadElement, townAI){
  var ai = {};
      ai.uid = (Math.floor(Math.random() * 99999999999) + 1);
      ai.townAi = townAI;
      ai.town = townAI.town;
      ai.road = roadElement;
      ai.cars = {};
      ai.roadType = null;
      ai.trafficLightAI = null;
      ai.isEntry = false;
      ai.init = function(){
        // Initializes click handler and event handler
        ai.road.addEventListener("click", ai.events.click);
        ai.roadType = ai.road.className.split(' ')[1];
        if(ai.roadType === "four-way") ai.trafficLightAI = new trafficLightAI(roadElement);
        
        if(ai.road.parentNode.dataset.elementIndex == 0) ai.isEntry = "S";
        if(ai.road.parentNode.dataset.elementIndex == ai.townAi.maxRows) ai.isEntry = "N";
        if(ai.road.dataset.elementIndex == 0) ai.isEntry = "E";
        if(ai.road.dataset.elementIndex == ai.townAi.maxTiles) ai.isEntry = "W";
        
        if(ai.isEntry !== false){
          ai.townAi.entryPoints.push({
            heading: ai.isEntry,
            row: ai.road.parentNode.dataset.elementIndex,
            tile: ai.road.dataset.elementIndex
          });
        }
      }
      ai.isClear = function(heading, uid){
        for(var i in ai.cars){
          if(ai.cars[i].data.heading === heading && i !== uid){
            return false;
          }
        }
        return true;
      }
      ai.stopLightStatus = function(heading){
        if(ai.trafficLightAI === null) return "green";
        return ai.trafficLightAI.states[heading];
      }
      ai.events = {};
      ai.events.click = function(){
        var newCar = {};
        if(ai.road.parentNode.dataset.elementIndex == 0){
          // Entry Road - Top
          // Create New Car, Heading S
          newCar.heading = "S";
        }
        if(ai.road.parentNode.dataset.elementIndex == ai.townAi.maxRows){
          // Entry Road - Bottom
          // Create New Car, Heading N
          newCar.heading = "N";
        }
        if(ai.road.dataset.elementIndex == 0){
          // Entry Road - Left
          // Create New Car, Heading E
          newCar.heading = "E";
        }
        if(ai.road.dataset.elementIndex == ai.townAi.maxTiles){
          // Entry Road - Right
          // Create New Car, Heading W
          newCar.heading = "W";
        }
        if(newCar.heading !== undefined){
          newCar.row = ai.road.parentNode.dataset.elementIndex;
          newCar.tile = ai.road.dataset.elementIndex;
          new carAI(newCar, ai.townAi);
        }
      }
      
  ai.init();
  return ai;
}