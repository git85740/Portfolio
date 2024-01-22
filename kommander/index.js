const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
let state = {}

function preGame() {
  $('.container').toggleClass('container2');
  $('.title').toggleClass('title2');
  var element = document.getElementById("titlebutton");
  element.classList.remove("point");
  var element2 = document.getElementById("titlefilter");
  element2.classList.remove("point");


  document.getElementById("titlebutton").disabled = true;
  
  setTimeout(function(){
    let audio = document.getElementById("audio");
    audio.play();
  }, 1000); 
}


function startGame() {
  let hp = 3;
  state = { has_sapper: true, has_scout: true, has_medic: true, has_3_lives: true, unhealthy_units : true }
  showTextNode(1)
}
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerHTML = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerHTML = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}


function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
  let click = document.getElementById("click");
    click.play();
}

const textNodes = [
  
  {
    id: 1,
    text: "<marquee loop='0' hmargin='0'>// ESTABLISHING CONNECTION PLEASE HOLD // ESTABLISHING CONNECTION PLEASE HOLD // ESTABLISHING CONNECTION PLEASE HOLD //</marquee><span style='font-style:italic;'>Starting Call...</span><br> <img src='officer.jpg' style='width:150px; height:150px; margin: 40px 0 5px;'><br>Greetings, Commander.<br><br>After many failed attempts by your predecessor, the brass has decided to put you in charge of the 4th Infantry Platoon, codename: Bulldogs, for these upcoming missions.<br>As you are probably well aware, the war has taken a turn for the worse, but we believe you are capable of bringing in some results.<br>While this assignment won't be very difficult for someone of your talents, we believe it is imperative for you to get adjusted to the tools at your disposal.<br>Before you start this first mission, we have prepared some information we believe will assist you. <br></br>Good luck, Commander. We will be watching your career with great interest.<br><br><br><span style='font-style:italic;'>Call ended</span>",
    options: [
      {
        text: 'Continue',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "Your platoon has been assigned to take control of a military air base about 15 klicks to the south of their current position. The enemy is using the base as a way of transporting troops and resources into the area, but also to coordinate aerial attacks from. The acquisition of the air base could prove vital in turning the tide of the war in the region.<br><br>Please make use of these instructions to help you in the coming mission. <br><br>When you are ready, press the 'Start Mission' button.",
    options: [
      {
        text: 'Encounters',
        nextText: 3
      },
      {
        text: 'Conditions',
        nextText: 4
      },
      {
        text: 'Platoon Leader',
        nextText: 5
      },
      {
        text: 'Specialists',
        nextText: 6
      },
      {
        text: '<span style="font-weight:bold">Start Mission</span>',
        nextText: 7
      }
    ]
  },
  {
    id: 3,
    text: "<b>Encounters</b><br><br>A mission is composed of a set number of encounters. Each encounter will describe a problem your soldiers are facing and a number of possible actions you can order them to take. Some actions may have poor results depending on the context and conditions of the battlefield (see statistics). Failing an encounter will result in losing <i>Hostility Prevention (HP)</i>. If your <i>HP</i> reaches 0, the enemy will launch a counterattack and put a stop to your mission.",
    options: [
      {
        text: 'Return',
        nextText: 2
      }
    ]
  },
  {
    id: 4,
    text: "<b>Conditions</b><br><br>During each situation, you will be given information appropriate to the situation. These statistics include:<br><br><br>Enemy density<br>How many enemy combatants are present at the current location. High concentrations of enemies could pose danger for your soldiers, while a low concentration will usually pose a smaller threat.<br><br>Fortified<br>Whether or not the enemy is in possession of structures to assist in their defense. A low concentration of enemies can still be dangerous if fortified, while a high concentration could prove lethal.<br><br>Weather<br>Poor weather could result in drawbacks for advancing infantry as it can have negative consequences on terrain and visibility, but this is also the case for enemy combatants.<br><br>Special conditions<br>These are unique conditions that can rarely occur. These can be very detrimental, so it's important to take them into consideration.",
    options: [
      {
        text: 'Return',
        nextText: 2
      }
    ]
  },
  {
    id: 5,
    text: "<b>Platoon Leader</b><br><br>On your missions you will be assigned a lieutenant who will act as the platoon leader. They will be your eyes and ears on the ground. They will attempt to provide useful information to you to assist you in your decision-making while also informing you of different routes your platoon can take. They will follow your orders as to what course of action to take and lead the platoon towards the completion of the mission. Not all information is always directly available, but it can sometimes be determined by analyzing the platoon leader's report.",
    options: [
      {
        text: 'Return',
        nextText: 2
      }
    ]
  },
  {
    id: 6,
    text: "<b>Specialists</b><br><br>Your platoon will be assigned 3 specialists to help assist in different tasks. You can assign a specialist to the current situation by pressing the button corresponding to each specialist. Each specialist can only be assigned once per mission. They are as follows:<br><br><br>The Scout<br>The scout specializes in reconnaissance and intelligence gathering. The scout can allow you to get a better estimate of the enemy's combat ability. Furthermore, they can, in some situations, find the optimal route through hostile territory.<br><br>The Sapper<br>The sapper will be your engineer on the ground. They are capable of breaching fortifications to give your troops the edge. They are also able to secure dangerous terrain that could otherwise prove dangerous or lethal to other units.<br><br>The Medic<br>The medic is responsible for the health of your soldiers. They can assist wounded soldiers and help prevent ailments from harmful instruments such as gas or smoke.",
    options: [
      {
        text: 'Return',
        nextText: 2
      }
    ]
  },
  {
    id: 7,
    text: "<i>'This is Lieutenant Miller reporting for duty, sir. I'm afraid we don't have the time to exchange pleasantries, as our current location is under attack by enemy forces. We are currently under attack from the southern side with a second force on its way from the east. How should we proceed?'</i><br><br>Current conditions:<br>Enemy Density: Low<br>Not Fortified<br>Weather: Sunny<br>Special Conditions: None<br><br>Courses of action<br>1. Retreat to the north-west to fight of the attackers from only the south-east.<br>2. Rush the southern attackers in an attempt to leave the reinforcements in a less advantagous state.<br>3. Remain in your current position. You still have the advantage of being on the defensive.<br><br>(Don't forget you can also choose to use a specialist instead.)",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 8
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 9
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 10
      },
      {
        text: 'Option 1',
        nextText: 11
      },
      {
        text: 'Option 2',
        nextText: 12
      },
      {
        text: 'Option 3',
        nextText: 13
      }
    ]
  },
  {
    id: 8,
    text: "<b>FAILURE</b><br><br>Your sapper is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_sapper: false },
        nextText: 7
      }
    ]
  },
  {
    id: 9,
    text: "<b>FAILURE</b><br><br>Your scout is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 7
      }
    ]
  },
  {
    id: 10,
    text: "<b>FAILURE</b><br><br>Your medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false },
        nextText: 7
      }
    ]
  },
  {
    id: 11,
    text: "<b>FAILURE</b><br><br>While your retreat gave your soldiers a chance to regroup, the enemy reinforcements just moved a bit north and went for the eastern flank regardless.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 14
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 14
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 12,
    text: "<b>SUCCESS</b><br><br>The sudden push takes the enemy by surprise, and because of the lack of support from the southern side, the eastern attackers stop their assault.",
    options: [
      {
        text: 'Continue',
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: "<b>SUCCESS</b><br><br>Despite attacks from both the south and east, your soldiers manage to hold them back long enough for reinforcements to arrive.",
    options: [
      {
        text: 'Continue',
        nextText: 14
      }
    ]
  },
  {
    id: 14,
    text: "<i>'Now that we have repelled the enemy forces, what should be our next course of action, sir?'</i><br><br>Current conditions:<br>Enemy Density: None<br>Not Fortified<br>Weather: Sunny<br>Special Conditions: None<br><br>1. take stock of your supplies, and then head south.<br>2. We have no time to waste, head south right away.<br>3. Another attack must be coming, remain at your current position.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 15
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 16
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 17
      },
      {
        text: 'Option 1',
        nextText: 18
      },
      {
        text: 'Option 2',
        nextText: 19
      },
      {
        text: 'Option 3',
        nextText: 20
      }
    ]
  },
  {
    id: 15,
    text: "<b>FAILURE</b><br><br>Your sapper is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_sapper: false },
        nextText: 14
      }
    ]
  },
  {
    id: 16,
    text: "<b>SUCCESS</b><br><br>Your scout deduces that they aren't at any danger of an attack at this point of time.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 14
      }
    ]
  },
  {
    id: 17,
    text: "<b>SUCCESS</b><br><br>Your medic is able to treat some of the wounded after the last attack.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false, healthy_units: true, unhealthy_units: false },
        nextText: 14
      }
    ]
  },
  {
    id: 18,
    text: "<b>SUCCESS</b><br><br>After taking stock of the supplies, it turns out some got displaced during the fighting. Your soldiers manage to recover a set of RPGs. Afterwards, you head due south.",
    options: [
      {
        text: 'Continue',
        setState: { rocket_launchers: true },
        nextText: 21
      }
    ]
  },
  {
    id: 19,
    text: "<b>SUCCESS</b><br><br>Deciding not to take the risk, you order your soldiers to move out right away.",
    options: [
      {
        text: 'Continue',
        nextText: 21
      }
    ]
  },
  {
    id: 20,
    text: "<b>FAILURE</b><br><br>Despite your platoon staying ready for another attack, none appeared. If anything, waiting for so long has given the enemy more time to regroup.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 21
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 21
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 21,
    text: "<i>'Sir, we have reached a river, but the bridge to the other side appears to have been blown up.'</i><br><br>Current conditions:<br>Enemy Density: None<br>Not Fortified<br>Weather: Cloudy<br>Special Conditions: None<br><br>1. Wade through the water.<br>2. Look for an alternative route.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 22
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 23
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 24
      },
      {
        text: 'Option 1',
        nextText: 25
      },
      {
        text: 'Option 2',
        nextText: 26
      }
    ]
  },
  {
    id: 22,
    text: "<b>SUCCESS</b><br><br>Your sapper builds a makeshift bridge, allowing your soldiers to safely pass.",
    options: [
      {
        text: 'Continue',
        setState: { has_sapper: false },
        nextText: 27
      }
    ]
  },
  {
    id: 23,
    text: "<b>SUCCESS</b><br><br>Your Scout manages to discover that another crossing is not far from the current position.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 21
      }
    ]
  },
  {
    id: 24,
    text: "<b>FAILURE</b><br><br>Your Medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 21
      }
    ]
  },
  {
    id: 25,
    text: "<b>FAILURE</b><br><br>Although they make it across, the current manages to sweep away some of their equipment.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 27
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 27
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 26,
    text: "<b>SUCCESS</b><br><br>You manage to find another crossing half a klick to the east.",
    options: [
      {
        text: 'Continue',
        nextText: 27
      }
    ]
  },
  {
    id: 27,
    text: "You receive intel from HQ stating that on your route to the air base, there are 2 structures of note. A supply depot to the west and a military outpost to the east. The supply depot could provide you with some much-needed supplies, while the military outpost holds POWs who may be of assistance. What do you do?<br><br>Current conditions:<br>Enemy Density: None<br>Not Fortified<br>Weather: Cloudy<br>Special Conditions: None<br><br>1. Go west towards the supply depot.<br> 2. Go east towards the military outpost.<br> 3. Neither; you don't have time for this.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 28
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 29
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 30
      },
      {
        text: 'Option 1',
        nextText: 31
      },
      {
        text: 'Option 2',
        nextText: 43
      },
      {
        text: 'Option 3',
        nextText: 51
      }
    ]
  },
  {
    id: 28,
    text: "<b>FAILURE</b><br><br>Your sapper is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_sapper: false },
        nextText: 27
      }
    ]
  },
  {
    id: 29,
    text: "<b>FAILURE</b><br><br>Your scout is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 27
      }
    ]
  },
  {
    id: 30,
    text: "<b>FAILURE</b><br><br>Your medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false },
        nextText: 27
      }
    ]
  },
  {
    id: 31,
    text: "<i>'The supply depot seems to be guarded by a small detachment of soldiers. How should we proceed?'</i><br><br>Current conditions:<br>Enemy Density: Low<br>Fortified<br>Weather: rainy<br>Special Conditions: None<br><br>1. Storm the depot head-on.<br>2. Attempt to force them to surrender.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 32
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 33
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 34
      },
      {
        text: 'Option 1',
        requiredState: (currentState) => currentState.unhealthy_units,
        nextText: 35
      },
      {
        text: 'Option 1',
        requiredState: (currentState) => currentState.healthy_units,
        nextText: 36
      },
      {
        text: 'Option 2',
        nextText: 37
      },
      {
        text: 'Use RPGs',
        nextText: 38
      }
    ]
  },
  {
    id: 32,
    text: "<b>SUCCESS</b><br><br>Your sapper is able to breach the wall of the depot, allowing your soldiers to easily take over the entire structure.",
    options: [
      {
        text: 'Continue',
        setState: { has_sapper: false },
        nextText: 39
      }
    ]
  },
  {
    id: 33,
    text: "<b>FAILURE</b><br><br>Your scout is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 31
      }
    ]
  },
  {
    id: 34,
    text: "<b>FAILURE</b><br><br>Your medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false },
        nextText: 31
      }
    ]
  },
  {
    id: 35,
    text: "<b>FAILURE</b><br><br>Despite outnumbering your oponent, you take heavy casualties because of the fortifications built by the enemy.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 39
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 39
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 36,
    text: "<b>SUCCESS</b><br><br>Thanks to your soldiers being in good shape, you manage to take over the supply depot with minimal casualties.",
    options: [
      {
        text: 'Continue',
        nextText: 39
      }
    ]
  },
  {
    id: 37,
    text: "<b>SUCCESS</b><br><br>As the enemy soldiers aren't too thrilled about fighting outnumbered near dangerous munitions, they decided to surrender peacefully.",
    options: [
      {
        text: 'Continue',
        nextText: 39
      }
    ]
  },
  {
    id: 38,
    text: "<b>FAILURE</b><br><br>While at the time it appeared smart to attempt to breach the supply depot with an RPG, when that RPG caused a chain reaction that caused the entire supply depot to explode, maybe it wasn't so smart after all. At least they can't use it now, either.",
    options: [
      {
        text: 'Continue',
        setState: { rocket_launchers: false },
        nextText: 39
      }
    ]
  },
  {
    id: 39,
    text: "The Supply depot is yours. Your soldiers now have enough ammo to kill God.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 40
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 41
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 42
      },
      {
        text: 'Continue',
        setState: { ammo_surplus: true },
        nextText: 51
      }
    ]
  },
  {
    id: 40,
    text: "<b>FAILURE</b><br><br>Your sapper is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_sapper: false },
        nextText: 39
      }
    ]
  },
  {
    id: 41,
    text: "<b>SUCCESS</b><br><br>Your scout uncovers a hidden crate filled with gas masks.",
    options: [
      {
        text: 'Continue',
        setState: { has_scout: false, ammo_surplus: true, gas_masks: true },
        nextText: 51
      }
    ]
  },
  {
    id: 42,
    text: "<b>FAILURE</b><br><br>Your medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false },
        nextText: 39  
      }
    ]
  },
  {
    id: 43,
    text: "<i>'We have reached the military outpost. no sign of the POWs. How should we proceed?'</i><br><br>Current conditions:<br>Enemy Density: Medium<br>Fortified<br>Weather: rainy<br>Special Conditions: None<br><br>1. Storm the outpost head-on.<br>2. Attempt to force them to surrender.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 44
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 45
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 46
      },
      {
        text: 'Option 1',
        nextText: 47
      },
      {
        text: 'Option 2',
        nextText: 48
      },
      {
        text: 'Use RPGs',
        nextText: 49
      }
    ]
  },
  {
    id: 44,
    text: "<b>SUCCESS</b><br><br>Your sapper is able to breach the wall of the outpost, allowing your soldiers to easily take over the entire structure.",
    options: [
      {
        text: 'Continue',
        setState: { has_sapper: false },
        nextText: 50
      }
    ]
  },
  {
    id: 45,
    text: "<b>FAILURE</b><br><br>Your scout is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 43
      }
    ]
  },
  {
    id: 46,
    text: "<b>FAILURE</b><br><br>Your medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false },
        nextText: 43
      }
    ]
  },
  {
    id: 47,
    text: "<b>FAILURE</b><br><br>You are able to take over the outpost, but you suffer heavy casualties.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 50
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 50
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 48,
    text: "<b>FAILURE</b><br><br>The enemy soldiers aren't interested in surrendering, so a fight breaks out regardless. Your soldiers manage to come out on top, but you suffer heavy casualties.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 50
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 50
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 49,
    text: "<b>SUCCESS</b><br><br>You use the RPGs to breach the structure, allowing your soldiers to easily take over the entire structure.",
    options: [
      {
        text: 'Continue',
        setState: { rocket_launchers: false },
        nextText: 50
      }
    ]
  },
  {
    id: 50,
    text: "<i>'Sir, we have freed the POWs, but one of them claims to have gained intel regarding an old tunnel that goes directly under the military air base. How do you wish to proceed?'</i><br><br>Current conditions:<br>Enemy Density: None<br>Not Fortified<br>Weather: rainy<br>Special Conditions: None<br><br>1. Attempt to sneakily infiltrate the military air base through the old tunnel.<br>2. Stick to the plan. Storm the base head-on.",
    options: [
      {
        text: 'Option 1',
        nextText: 65
      },
      {
        text: 'Option 2',
        nextText: 51
      }
    ]
  },
  {
  id: 51,
    text: "You send your platoon to the air base for the final assault. Shortly afterwards, you are contacted by your platoon leader:<i>'Sir, we have reached the outskirts of the air base, but they are firing mortars at us, and there is too much <b>cough,</b> smoke; I can barely <b>cough,</b> see.'</i><br><br> Current conditions:<br> Enemy Density: High<br>Fortified<br> Weather: rainy<br>Special Conditions: None<br><br>1. Just keep moving forward.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 52
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 53
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 54
      },
      {
        text: 'Option 1',
        nextText: 55
      },
      {
        text: 'Use Gas Masks',
        requiredState: (currentState) => currentState.gas_masks,
        nextText: 56
        
      },
    ]
  },
  {
    id: 52,
    text: "<b>FAILURE</b><br><br>Your sapper is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_sapper: false },
        nextText: 51
      }
    ]
  },
  {
    id: 53,
    text: "<b>FAILURE</b><br><br>Your scout is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 51
      }
    ]
  },
  {
    id: 54,
    text: "<b>SUCCESS</b><br><br>After you're out of direct mortar fire, your medic tends to the wounded and ill.",
    options: [
      {
        text: 'Continue',
        setState: { has_medic: false },
        nextText: 57
      }
    ]
  },
  {
    id: 55,
    text: "<b>FAILURE</b><br><br>Some of your soldiers make it through, some don't. Those who didn't get killed by the mortar fire aren't in good shape.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 57
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 57
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 56,
    text: "<b>SUCCESS</b><br><br>Even though they don't protect against mortar fire, the gas masks allow your soldiers to more easily traverse the smoke clouds.",
    options: [
      {
        text: 'Continue',
        nextText: 57
      }
    ]
  },
  {
    id: 57,
    text: "<i>'We have made it past the mortar fire, but now we are pinned down by machine gun fire on one side and a minefield on the other. What should we do?'</i><br><br>Current conditions:<br>Enemy Density: High<br>Fortified<br>Weather: rainy<br>Special Conditions: None<br><br>1. Try to make a run for it through the machinegun fire.<br>2. Take a chance on the minefield.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 58
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 59
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 60
      },
      {
        text: 'Option 1',
        nextText: 61
      },
      {
        text: 'Option 2',
        nextText: 62
      },
      {
        text: 'Use Ammo Surplus',
        requiredState: (currentState) => currentState.ammo_surplus,
        nextText: 63
      },
      {
        text: 'Use RPGs',
        requiredState: (currentState) => currentState.rocket_launchers,
        nextText: 64
      }
    ]
  },
  {
    id: 58,
    text: "<b>SUCCESS</b><br><br>Thanks to a bit of cover fire, the sapper manages to demine enough of the minefield to allow the platoon to safely pass through into the base.",
    options: [
      {
        text: 'Continue',
        setState: { has_sapper: false },
        nextText: 65
      }
    ]
  },
  {
    id: 59,
    text: "<b>FAILURE</b><br><br>Your scout is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 57
      }
    ]
  },
  {
    id: 60,
    text: "<b>FAILURE</b><br><br>Your medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false },
        nextText: 57
      }
    ]
  },
  {
    id: 61,
    text: "<b>FAILURE</b><br><br>Some of your less agile soldiers are torn to shreds by the machine gun fire, but the faster soldiers manage to enter the base",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 66
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 66
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 62,
    text: "<b>FAILURE</b><br><br>The bad news is that a couple of your soldiers got blown up. The good news is that by doing so, they cleared a path for the rest of your soldiers.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 66
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 66
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 999
      }
    ]
  },
  {
    id: 63,
    text: "<b>SUCCESS</b><br><br>Through the use of suppressive fire, your soldiers are able to enter the base.",
    options: [
      {
        text: 'Continue',
        setState: { ammo_surplus: false },
        nextText: 66
      }
    ]
  },
  {
    id: 64,
    text: "<b>SUCCESS</b><br><br>Your soldiers use the RPGs to blow up the machine gun nests, allowing them to safely enter the base.",
    options: [
      {
        text: 'Continue',
        setState: { rocket_launchers: false },
        nextText: 66
      }
    ]
  },
  {
    id: 65,
    text: "Your soldiers manage to reach the tunnel safely, and after finding the exit, they land right in the middle of the military air base... for all to see. Soon, heavy fighting has broken out across the air base, though you have taken them by surprise, luckily.<br><br>Current conditions:<br>Enemy Density: High<br>Fortified<br>Weather: rainy<br>Special Conditions: None",
    options: [
      {
        text: 'Continue',
        nextText: 66
      },
    ]
  },
  {
    id: 66,
    text: "The enemy is pulling out all the stops to prevent you from taking the airbase. 3 attack helicopters have taken off and are raining down a torrent of bullets upon the airbase.<br><br>Current conditions:<br>Enemy Density: High<br>Fortified<br>Weather: rainy<br>Special Conditions: None<br><br>1. Fire everything you got at them.",
    options: [
      {
        text: '<img class="specialist" src="sapper.png"> SAPPER',
        requiredState: (currentState) => currentState.has_sapper,
        nextText: 67
      },
      {
        text: '<img class="specialist" src="scout.png"> SCOUT',
        requiredState: (currentState) => currentState.has_scout,
        nextText: 68
      },
      {
        text: '<img class="specialist" src="medic.png">MEDIC',
        requiredState: (currentState) => currentState.has_medic,
        nextText: 69
      },
      {
        text: 'Option 1',
        nextText: 70
      },
      {
        text: 'Use Ammo Surplus',
        requiredState: (currentState) => currentState.ammo_surplus,
        nextText: 71
      },
      {
        text: 'Use RPGs',
        requiredState: (currentState) => currentState.rocket_launchers,
        nextText: 72
      }
    ]
  },
  {
    id: 67,
    text: "<b>FAILURE</b><br><br>Your sapper is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_sapper: false },
        nextText: 66
      }
    ]
  },
  {
    id: 68,
    text: "<b>FAILURE</b><br><br>Your scout is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_scout: false },
        nextText: 66
      }
    ]
  },
  {
    id: 69,
    text: "<b>FAILURE</b><br><br>Your medic is unable to assist in the situation in a meaningful way.",
    options: [
      {
        text: 'Return',
        setState: { has_medic: false },
        nextText: 66
      }
    ]
  },
  {
    id: 70,
    text: "<b>FAILURE</b><br><br>Through intense fighting you barely are able to shoot down all 3 helicopters.",
    options: [
      {
        text: 'Continue (<i>2 HP</i>)',
        requiredState: (currentState) => currentState.has_3_lives,
        setState: { has_3_lives: false, has_2_lives: true },
        nextText: 73
      },
      {
        text: 'Continue (<i>1 HP</i>)',
        requiredState: (currentState) => currentState.has_2_lives,
        setState: { has_2_lives: false, has_1_lives: true },
        nextText: 73
      },
      {
        text: 'Game Over',
        requiredState: (currentState) => currentState.has_1_lives,
        nextText: 998
      }
    ]
  },
  {
    id: 71,
    text: "<b>SUCCESS</b><br><br>The attack helicopters stand no chance against the absolute hail of bullets flying through the air, and soon all of them have crashed.",
    options: [
      {
        text: 'Continue',
        setState: { ammo_surplus: false },
        nextText: 73
      }
    ]
  },
  {
    id: 72,
    text: "<b>SUCCESS</b><br><br>You're very glad that you waited with using these RPGs, because they absolutely annihilate the attack helicopters. Nothing is left but a bunch of burning scrap metal.",
    options: [
      {
        text: 'Continue',
        setState: { rocket_launchers: false },
        nextText: 73
      }
    ]
  },
  {
    id: 73,
    text: "It's done. The air base is yours. The few enemy soldiers that survived have either surrendered or retreated. And with that your first mission is complete.",
    options: [
      {
        text: 'Continue',
        nextText: 74
      }
    ]
  },
  {
    id: 74,
    text: "<marquee loop='0' hmargin='0'>// ESTABLISHING CONNECTION PLEASE HOLD // ESTABLISHING CONNECTION PLEASE HOLD // ESTABLISHING CONNECTION PLEASE HOLD //</marquee><span style='font-style:italic;'>Starting Call...</span><br> <img src='officer.jpg' style='width:150px; height:150px; margin: 40px 0 5px;'><br>Greetings, Commander.<br><br>We are very pleased with the work you and your team have achieved today. We had high hopes for you, and we are pleased to say you have exceeded them. <br><br>You have a very promising career ahead of you, commander.<br><br><br><span style='font-style:italic;'>Call ended</span>",
    options: [
      {
        text: 'The End',
        nextText: 74
      }
    ]
  },
  {
    id: 999,
    text: "It's over. Due to too many complications during the mission which left your platoon in a poor state, the enemy was able to launch a counterattack and annihilate your forces.",
    options: [
      {
        text: 'Continue',
        nextText: 997
      }
    ]
  },
  {
    id: 998,
    text: "You were so close. Your platoon managed to barely take the air base. But this also meant that it could be easily taken back. Your forces were in no shape to fight back after the grueling mision and were easily defeated.",
    options: [
      {
        text: 'Continue',
        nextText: 997
      }
    ]
  },
  {
    id: 997,
    text: "<marquee loop='0' hmargin='0'>// ESTABLISHING CONNECTION PLEASE HOLD // ESTABLISHING CONNECTION PLEASE HOLD // ESTABLISHING CONNECTION PLEASE HOLD //</marquee><span style='font-style:italic;'>Starting Call...</span><br> <img src='officer.jpg' style='width:150px; height:150px; margin: 40px 0 5px;'><br>We're very dissatisfied with your work, commander. We had high hopes for you, but it appears you weren't able to match them. You led your men poorly and got them killed in the end. You are hereby stripped of your title and demoted. Hopefully, your successor will be able to match our expectations.<br><br><br><span style='font-style:italic;'>Call ended</span>",
    options: [
      {
        text: 'Game Over',
        nextText: 997
      }
    ]
  }
  
]

startGame()