const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
let state = {}

function preGame() {
  $('.container').toggleClass('container2');
  $('.title').toggleClass('title2');
  document.getElementById("titlebutton").disabled = true;
  
  setTimeout(function(){
    let audio = document.getElementById("audio");
    audio.play();
  }, 1000); 
}


function startGame() {
  state = { has_no_weapon: true, has_no_axe: true, no_hill: true, not_visited_hill: true, has_no_key: true }
  showTextNode(1)
}
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
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
    text: "You are a private investigator hired to find out what happened to Randolph Carter, a reclusive artist living deep in the woods. While Carter never was one for leaving the house much, nobody has seen or heard from him for months.",
    options: [
      {
        text: 'Continue',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "You are getting close to Carter's adress. The rain is getting heavier by the minute. A large thunderstorm was expected, but at this rate it might be the biggest storm in years. Focussing on the road again, you see the house in the distance.",
    options: [
      {
        text: 'Continue',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "The house is relatively large. Certainly bigger than your place, that's for sure. The house seems to be Gothic in design, making it probably hundreds of years old. You notice that that there isn't a single light on inside. As you park your car you can't help but feel a little uneasy.",
    options: [
      {
        text: 'Get out of your car',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: "You find yourself standing infront of the house. With how much it's raining, you prefer to get indoors as quickly as possible.",
    options: [
      {
        text: 'Enter the house',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: "You enter the house and arrive in the main hall. It's pitch black. You try to turn on a nearby light switch, but nothing happens. Power must be out. You're glad you brought your flashlight with you as a precaution. Best course of action would be to search the house for Carter or any clues regarding his whereabouts.",
    options: [
      {
        text: 'Enter kitchen',
        nextText: 6
      },
      {
        text: 'Enter bedroom',
        nextText: 11
      },
      {
        text: 'Enter garden',
        nextText: 18
      },
      {
        text: 'Enter study',
        nextText: 30
      },
      {
        text: 'Go back outside',
        requiredState: (currentState) => currentState.no_hill,
        nextText: 4
      },
      {
        text: 'Go back outside',
        requiredState: (currentState) => currentState.seen_hill,
        nextText: 26
      }
    ]
  },
  {
  id: 6,
    text: "You enter the kitchen. The smell of rotten food almost makes you throw up. You see what seems to be a few cockroaches retreat back into the darkness.",
    options: [
      {
        text: 'Open the fridge',
        nextText: 7
      },
      {
        text: 'Search the drawers',
        requiredState: (currentState) => currentState.has_no_weapon,
        nextText: 10
      },
      {
        text: 'Return to main hall',
        nextText: 5
      }
    ]
  },
  {
  id: 7,
    text: "The fridge must have been without power for months. It's mostly empty, but there is an odd piece of meat on one of the shelves.",
    options: [
      {
        text: 'Examine the meat',
        nextText: 8
      },
      {
        text: 'Close the fridge',
        nextText: 6
      }
    ]
  },
  {
  id: 8,
    text: "As you take a closer look at the meat, you see strange pores on the surface of it. It almost seems like it's... pulsating.",
    options: [
      {
        text: 'Pick up the meat',
        nextText: 9
      },
      {
        text: 'Close the fridge',
        nextText: 6
      }
    ]
  },
  {
  id: 9,
    text: "Ending 2/5: DINNER'S SERVED \n \n Against your better judgement you decide to pick up the meat. You imediately feel an intense sharp pain in your hands, almost like the meat is biting you. you try to let go but your hands are stuck to it. You see a strange oily liquid starting to ooze out of the meat and onto your hands. You suddenly start feeling very dizzy and lose conciousness.",
    options: [
      {
        text: 'Reload last checkpoint',
        nextText: 6
      }
    ]
  },
  {
  id: 10,
    text: "You look through the drawers for anything useful. While most cutlery has rusted, you manage to find a butcher's knife in the back of one of the drawers. \n \n ITEM ACQUIRED",
    options: [
      {
        text: 'Return',
        setState: { has_no_weapon: false, has_knife: true },
        nextText: 6
      }
    ]
  },
  {
  id: 11,
    text: "You enter the bedroom. The open window is causing rain to leak in from the outside. The occasional lightning strike illuminates the room for a split second. A leather bound journal lays on top of a desk in the corner of the room. Strangely, a shovel is laying on the carpet in the middle of the room.",
    options: [
      {
        text: 'Check window',
        requiredState: (currentState) => currentState.no_hill,
        nextText: 12
      },
      {
        text: 'Read journal',
        nextText: 13
      },
      {
        text: 'Return to main hall',
        nextText: 5
      }
    ]
  },
  {
  id: 12,
    text: "From the window you have a good view of the garden down below, though you can't see much past it because of how dark it is outside. But as lightning strikes once more you see a small hill in the distance with a humanoid figure standing on top of it. \n \n NEW LOCATION DISCOVERED",
    options: [
      {
        text: 'Return',
        setState: { seen_hill: true, no_hill: false },
        nextText: 11
      }
    ]
  },
  {
  id: 13,
    text: "Though time has worn out many of the pages. some passages are still readable.",
    options: [
      {
        text: '"May 9"',
        nextText: 14
      },
      {
        text: '"May 12"',
        nextText: 15
      },
      {
        text: '"May 14"',
        nextText: 16
      },
      {
        text: '"May 26"',
        nextText: 17
      },
      {
        text: 'Return',
        nextText: 11
      }
    ]
  },
  {
  id: 14,
    text: "Today while out for a stroll in the forest, I came across a strange statuette. It's design is so strange, but fascinating nonetheless. As an artist, I can appreciate the craftmanship. It appears to be covered in peculiar symbols, though I cannot tell what they mean. Perhaps it's an idol of some kind.",
    options: [
      {
        text: '"May 9"',
        nextText: 14
      },
      {
        text: '"May 12"',
        nextText: 15
      },
      {
        text: '"May 14"',
        nextText: 16
      },
      {
        text: '"May 26"',
        nextText: 17
      },
      {
        text: 'Return',
        nextText: 11
      }
    ]
  },   
  {
  id: 15,
    text: "I woke up in a cold sweat last night. I had this strange dream where I was walking around my house. I was trying to reach my bedroom through the hallway, but the hallway just kept going and going. Eventually the walls started to fall apart and the floor gave way beneath me and I fell into the darkness. It felt so real too. I hope this isn't a recurring dream, because I've had trouble focussing today because of it.",
    options: [
      {
        text: '"May 9"',
        nextText: 14
      },
      {
        text: '"May 12"',
        nextText: 15
      },
      {
        text: '"May 14"',
        nextText: 16
      },
      {
        text: '"May 26"',
        nextText: 17
      },
      {
        text: 'Return',
        nextText: 11
      }
    ]
  },   
  {
  id: 16,
    text: "I had another nightmare last night. This time everything was dark around me, and it was only me and the idol I found. It suddenly started whispering to me. I couldn't understand what it was saying, but at the same time I did? I can't really describe it. After a while I noticed my hands started to be covered in this thick black substance. It spread through the rest of my body until it finally reached my mouth. I screamed as it poured into my mouth. And then I woke up again. I really don't know what's going on with me. Is it because of that idol, or am I going crazy?",
    options: [
      {
        text: '"May 9"',
        nextText: 14
      },
      {
        text: '"May 12"',
        nextText: 15
      },
      {
        text: '"May 14"',
        nextText: 16
      },
      {
        text: '"May 26"',
        nextText: 17
      },
      {
        text: 'Return',
        nextText: 11
      }
    ]
  }, 
  {
  id: 17,
    text: "I can't take it anymore. The nightmares have been getting worse and worse and the madness doesn't stop when I'm awake either. I tried getting rid of the idol. Burried it in the basement, but the madness just won't stop. I may have to do something drastic.",
    options: [
      {
        text: '"May 9"',
        nextText: 14
      },
      {
        text: '"May 12"',
        nextText: 15
      },
      {
        text: '"May 14"',
        nextText: 16
      },
      {
        text: '"May 26"',
        nextText: 17
      },
      {
        text: 'Return',
        nextText: 11
      }
    ]
  },   
  {
  id: 18,
    text: "You enter the garden. As expected, it's completely overgrown with weeds. You notice a fountain and a shed.",
    options: [
      {
        text: 'Check out fountain',
        nextText: 19
      },
      {
        text: 'Check out shed',
        requiredState: (currentState) => currentState.has_no_axe,
        nextText: 23
      },
      {
        text: 'Return to main hall',
        nextText: 5
      }
    ]
  },     
  {
  id: 19,
    text: "The fountain seems in line with the style of the rest of the house, but you see there's a chunk of the fountain that has broken off.",
    options: [
      {
        text: 'Examine the broken piece',
        nextText: 20
      },
      {
        text: 'Check the water',
        nextText: 21
      },
      {
        text: 'Return',
        nextText: 18
      }
    ]
  },
  {
  id: 20,
    text: "Examining the broken piece, you detect some dried up blood on the surface of it. what happened here though, you're not sure about.",
    options: [
      {
        text: 'Return',
        nextText: 19
      }
    ]
  },
  {
  id: 21,
    text: "Though a bit murky, you can still see your reflection in the shallow water. You swear you saw a second face in the reflection for a moment, but maybe it was just your imagination.",
    options: [
      {
        text: 'Look closer',
        nextText: 22
      },
      {
        text: 'Return',
        nextText: 19
      }
    ]
  },
  {
  id: 22,
    text: "Ending 3/5: REGRETFUL CURIOUSITY \n \n as you look closer into the water, you suddenly feel yourself grabbed by the chest and pulled down into the water. The water is way deeper than first appeared and you soon find yourself drowning in the depths of it.",
    options: [
      {
        text: 'Reload last checkpoint',
        nextText: 19
      }
    ]
  },
  {
  id: 23,
    text: "The shed's door seems to be covered in numerous plants. you're going to need something sharp to cut your way through.",
    options: [
      {
        text: 'Use the knife',
        requiredState: (currentState) => currentState.has_knife,
        nextText: 24
      },
      {
        text: 'Return',
        nextText: 18
      }
    ]
  },
  {
  id: 24,
    text: "You successfully cut away all the plants blocking the door. The knife unfortunally breaks in the process.",
    options: [
      {
        text: 'Enter the shed',
        setState: { has_knife: false },
        nextText: 25
      }
    ]
  },
  {
  id: 25,
    text: "Entering the shed you find out that it's in fact a tool shed. on top of a table you see a good condition splitting axe. you decide to take it with you just to be safe. \n \n ITEM ACQUIRED",
    options: [
      {
        text: 'Return',
        setState: { has_no_axe: false, has_axe: true },
        nextText: 18
      }
    ]
  },
  {
  id: 26,
    text: "You find yourself standing infront of the house. From here you can go to the hill you saw earlier, but you are considering just cutting your losses and leaving with your car",
    options: [
      {
        text: 'Enter the house',
        nextText: 5
      },
      {
        text: 'Visit the hill',
        requiredState: (currentState) => currentState.not_visited_hill,
        nextText: 27
      },
      {
        text: 'Return to your car',
        nextText: 28
      }
    ]
  },
  {
  id: 27,
    text: "After making your way through the pouring rain, you arrive at the hill you saw earlier. While the figure you saw is nowhere to be found, you do find a key hanging by a chain on a nearby tree. \n \n ITEM ACQUIRED",
    options: [
      {
        text: 'Return to the house',
        setState: { has_key: true, has_no_key: false, not_visited_hill: false },
        nextText: 26
      }
    ]
  },
  {
  id: 28,
    text: "Your gut is telling you this job isn't worth it. There's something very wrong going on here. Maybe you should just quit and leave this all behind you.",
    options: [
      {
        text: 'Leave',
        nextText: 29
      },
      {
        text: 'Get back out of your car',
        nextText: 26
      }
    ]
  },
  {
  id: 29,
    text: "ENDING 1/5: QUITTER \n \n Some jobs just aren't worth it, and this was one of them. You never found out what happened to Randolph Carter, but maybe that's for the best.",
    options: [
      {
        text: 'Reload last checkpoint',
        nextText: 26
      }
    ]
  },
  {
  id: 30,
    text: "You enter the study. The room is quite small with only a small table with a chair and a trapdoor in the corner of the room.",
    options: [
      {
        text: 'Check table',
        nextText: 31
      },
      {
        text: 'Check trapdoor',
        nextText: 32
      },
      {
        text: 'Return to main hall',
        nextText: 5
      }
    ]
  },
  {
  id: 31,
    text: "Though there isn't anything on the table, you do notice strange symbols scratched into the surface of it.",
    options: [
      {
        text: 'Return',
        nextText: 30
      }
    ]
  },
  {
  id: 32,
    text: "You approach the wooden trapdoor. A soft breeze seems to be eminating from under it and a black stain covers the nearby carpet.",
    options: [
      {
        text: 'Open trapdoor',
        requiredState: (currentState) => currentState.has_no_key,
        nextText: 33
      },
      {
        text: 'Unlock trapdoor',
        requiredState: (currentState) => currentState.has_key,
        nextText: 34
      },
      {
        text: 'Return',
        nextText: 30
      }
    ]
  },
  {
  id: 33,
    text: "you try to open it, but it appears to be locked. You'll need to find a key to open it with.",
    options: [
      {
        text: 'Return',
        nextText: 30
      }
    ]
  },
  {
  id: 34,
    text: "You unlock the trapdoor with the key you found. As you open it you feel the room suddenly grow colder.",
    options: [
      {
        text: 'Go down into the basement',
        nextText: 35
      }
    ]
  },
  {
  id: 35,
    text: "As you go down into the basement you hear strange gurgling noises. You pull out your flashlight, but see nothing. As you go deeper into the room, you find a medium sized hole in the ground. Looking inside you see a small Statuette laying in there.",
    options: [
      {
        text: 'Continue',
        nextText: 36
      }
    ]
  },
  {
  id: 36,
    text: "Suddenly, you hear the gurgling sounds again behind you. As you look behind you to find the source of the noise, you see an oily substance pouring from the ceiling. It slowly turns into a disgusting humanoid creature. The creature starts slowly staggers towards you.",
    options: [
      {
        text: 'You are backed into a corner',
        requiredState: (currentState) => currentState.has_no_weapon,
        nextText: 37
      },
      {
        text: 'Attack the creature with your knife',
        requiredState: (currentState) => currentState.has_knife,
        nextText: 38
      },
      {
        text: 'Attack the creature with your axe',
        requiredState: (currentState) => currentState.has_axe,
        nextText: 39
      }
    ]
  },
  {
  id: 37,
    text: "Ending 4/5: UNDERPREPARED \n \n Backed into a corner, the creature grabs you and the oily substance starts covering your entire body until you lose conciousness.",
    options: [
      {
        text: 'Reload last checkpoint',
        nextText: 30
      }
    ]
  },
  {
  id: 38,
    text: "You slash the creature with your knife, but it doesn't seem to stop it.",
    options: [
      {
        text: 'You are backed into a corner',
        nextText: 37
      }
    ]
  },
  {
  id: 39,
    text: "You hit the creature with all your might. It lets out a high pitched screech. You hit it a second time and it starts slowly dissolving until nothing remains.",
    options: [
      {
        text: 'Continue',
        nextText: 40
      }
    ]
  },
  {
  id: 40,
    text: "Having defeated the creature, you turn to face the hole again, only finding it to have dissapeared along with the statuette. Perhaps it was destroyed after you defeated that creature. You don't know what it was, but it's dead and that's all that matters to you right now.",
    options: [
      {
        text: 'Continue',
        nextText: 41
      }
    ]
  },
  {
  id: 41,
    text: "Ending 5/5: DETECTIVE \n \n While you do not fully understand what happend tonight, it seems whatever it was has been resolved. Your client will probably not believe what has happened, but you barely believe what's happened either. You get into your car and leave this place for good. \n \n THE END",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  }
]

startGame()