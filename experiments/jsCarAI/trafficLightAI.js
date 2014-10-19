var trafficLightAI = function(roadElement){
  var ai = {};
      ai.states = {};
      ai.states.N = "red";
      ai.states.E = "red";
      ai.states.S = "red";
      ai.states.W = "red";
      ai.lights = {};
      ai.lastStart = (Math.floor(Math.random() * 2) + 1) - 1;
      ai.nextAction = "green";
      ai.init = function(){
        for(var i in ai.states){
          var trafficLight = document.createElement('div');
          trafficLight.className = 'trafficLight '+i;
          trafficLight.style.backgroundColor = ai.states[i];
          ai.lights[i] = trafficLight;
          roadElement.appendChild(trafficLight);
        }
        setTimeout(ai.trafficPatternAction, Math.floor(Math.random() * 500) + 1);
      }
      
      ai.trafficPatternAction = function(){
        var timeout = 5000;
        for(var i in ai.states){
          if(ai.states[i] === "green" && ai.nextAction === "yellow"){
            ai.states[i] = "yellow";
          }
          if(ai.states[i] === "yellow" && ai.nextAction === "red"){
            ai.states[i] = "red";
          }
        }
        switch(ai.nextAction){
          case "yellow":
            ai.nextAction = "red";
            timeout = 1000;
            break;
          case "red":
            ai.nextAction = "green";
            timeout = 500;
            break;
          case "green":
            ai.nextAction = "yellow";
            if(ai.lastStart){
              ai.states.E = "green";
              ai.states.W = "green";
              ai.lastStart = 0;
            }else{
              ai.states.N = "green";
              ai.states.S = "green";
              ai.lastStart = 1;
            }
            break;
        }
        
        ai.updateLights();
        setTimeout(ai.trafficPatternAction, timeout);
      }
      
      ai.updateLights = function(){
        for(var i in ai.lights){
          ai.lights[i].style.backgroundColor = ai.states[i];
        }
      }
  
  ai.init();
  return ai;
}