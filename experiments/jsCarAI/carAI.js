var carAI = function(data, townAI){
  var ai = {};
      ai.townAI = townAI;
      ai.town = townAI.town;
      ai.road = null;
      ai.uid = (Math.floor(Math.random() * 99999999999) + 1);
      ai.car = null;
      ai.headings = {};
      ai.headings.N = 270;
      ai.headings.E = 0;
      ai.headings.S = 90;
      ai.headings.W = 180;
      ai.config = {};
      ai.config.headingStyleAdd = {};
      ai.config.headingStyleAdd.N = {};
      ai.config.headingStyleAdd.E = {};
      ai.config.headingStyleAdd.S = {};
      ai.config.headingStyleAdd.W = {};
      ai.config.headingStyleAdd.S.top = 5;
      ai.config.headingStyleAdd.S.left = 2;
      ai.config.headingStyleAdd.N.top = 35;
      ai.config.headingStyleAdd.N.left = 28;
      ai.config.headingStyleAdd.E.top = 33;
      ai.config.headingStyleAdd.W.top = 7;
      ai.config.headingStyleAdd.W.left = 30;
      ai.heading = "N";
      ai.speed = 0.0;
      ai.braking = false;
      ai.data = {};
      ai.nextActionInterval = 0;
      ai.init = function(){
        var car = document.createElement('div');
        car.className = 'car';
        var top = data.row*50;
        top += (ai.config.headingStyleAdd[data.heading].top !== undefined) ? ai.config.headingStyleAdd[data.heading].top : 0;
        
        var left = data.tile*50;
        left += (ai.config.headingStyleAdd[data.heading].left !== undefined) ? ai.config.headingStyleAdd[data.heading].left : 0;
        
        car.style.top = top+'px';
        car.style.left = left+'px';
        
        car.style.webkitTransform = "rotate("+ai.headings[data.heading]+"deg)";
        
        ai.town.appendChild(car);
        ai.data.heading = data.heading; 
        ai.car = car;
        ai.data.row = parseInt(((ai.car.style.top.split("px")[0]/50)+"").split(".")[0]);
        ai.data.col = parseInt(((ai.car.style.left.split("px")[0]/50)+"").split(".")[0]);
        var currentRoad = ai.townAI.roads[ai.data.row][ai.data.col];
        currentRoad.cars[ai.uid] = ai;
        ai.road = currentRoad;
        
        ai.nextActionInterval = setInterval(ai.nextAction, 10);
      }
      ai.gas = function(){
        switch(ai.data.heading){
          case "S":
            ai.car.style.top = (parseFloat(ai.car.style.top.split("px")[0])+ai.speed)+"px";
            break;
          case "N":
            ai.car.style.top = (parseFloat(ai.car.style.top.split("px")[0])-ai.speed)+"px";
            break;
          case "E":
            ai.car.style.left = (parseFloat(ai.car.style.left.split("px")[0])+ai.speed)+"px";
            break;
          case "W":
            ai.car.style.left = (parseFloat(ai.car.style.left.split("px")[0])-ai.speed)+"px";
            break;
        }
        if(ai.speed < 1 && !ai.braking){
          ai.speed += 0.1;
        }
      }
      ai.brake = function(){
        ai.braking = true;
        if(ai.speed > 0){
          ai.speed -= 0.018;
        }else{
          ai.speed = 0;
        }
        ai.gas();
      }
      ai.nextAction = function(){
        var currentRoad = ai.townAI.roads[ai.data.row][ai.data.col];
        if(currentRoad.uid !== ai.road.uid){
          delete ai.road.cars[ai.uid];
          currentRoad.cars[ai.uid] = ai;
          ai.road = currentRoad;
        }
        
        ai.data.row = parseInt(((ai.car.style.top.split("px")[0]/50)+"").split(".")[0]);
        ai.data.col = parseInt(((ai.car.style.left.split("px")[0]/50)+"").split(".")[0]);
        ai.data.rowActual = ai.car.style.top.split("px")[0]/50;
        ai.data.colActual = ai.car.style.left.split("px")[0]/50;
        
        if(
          ai.data.row > ai.townAI.maxRows || ai.data.rowActual < 0 ||
          ai.data.col > ai.townAI.maxTiles || ai.data.colActual < 0
        ){
          return ai.destroy();
        }
        var nextBlock = null;
        switch(ai.data.heading){
          case "S":
            if(ai.townAI.roads[ai.data.row+1] !== undefined){
              nextBlock = ai.townAI.roads[ai.data.row+1][ai.data.col];
            }
            break;
          case "W":
            if(ai.townAI.roads[ai.data.row][ai.data.col-1] !== undefined){
              nextBlock = ai.townAI.roads[ai.data.row][ai.data.col-1];
            }
            break;
          case "N":
            if(ai.townAI.roads[ai.data.row-1] !== undefined){
              nextBlock = ai.townAI.roads[ai.data.row-1][ai.data.col];
            }
            break;
          case "E":
            if(ai.townAI.roads[ai.data.row][ai.data.col+1] !== undefined){
              nextBlock = ai.townAI.roads[ai.data.row][ai.data.col+1];
            }
            break;
        }
        
        if(nextBlock !== null){
          var nextBlockIsClear = nextBlock.isClear(ai.data.heading, ai.uid);
          if(!nextBlockIsClear){
            ai.braking = true;
          }else{
            var nextBlockStopLight = nextBlock.stopLightStatus(ai.data.heading);
            var currentBlockStopLight = ai.townAI.roads[ai.data.row][ai.data.col].stopLightStatus(ai.data.heading);
          }
          if((nextBlockStopLight === "red" || nextBlockStopLight === "yellow") || ai.braking){
            ai.brake();
            if(ai.braking && currentBlockStopLight === "green" && nextBlockIsClear){
              ai.braking = false;
            }
          }else{
            willNeedToBreak = false;
            ai.gas();
          }
        }else{
          ai.gas();
        }
      }
      ai.destroy = function(){
        clearInterval(ai.nextActionInterval);
        delete ai.road.cars[ai.uid];
        ai.car.parentNode.removeChild(ai.car);
        ai = null;
      }
      
  ai.init();
  return ai;
}