/*
 * NOTE: Your prompt contains media inputs that are not directly supported by the
 * Gemini Files API. Preprocessing will be required for these inputs. Specific
 * information is provided below.
 */

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerationConfig,
  SafetySetting,
  ChatSession,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings: SafetySetting[] = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

let chatSession: ChatSession;

const createModel = async () => {
  chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'Let\'s play a game using the instructions in this document. In addition to these instructions:\n\n1. At the end of each response, list out my current energy level out of 100 so I can know how tired I am.\n2. If there is a "skill check" that needs to be done, list out the difficulty like in dungeons and dragons, ie give me a number that I would need to roll on a d20 in order to succeed. I will roll outside and tell you the number that I got. 5 should be easy, 10 should be medium, and 15 for hard difficulty tasks.',
          },
          {
            text: `Hey AI, I’d like to play a choose-your-own adventure style text game with you.

            The way I’d like this to work is you are going to create a story as we go, and keep the game grounded in its own world and game parameters. And I would like to call you GAL (Game AI Liaison), so you know when i’m talking to you, and not talking in game.
            
            You create a story, and let me make the choices to progress the story.
            
            I’ll start by giving you the game parameters and rules. ( If at any point in the game you need to figure out something for the rules of the game, you can ask me what I prefer.)
            
            Here are some parameters/rules:
            
            1. I'd like this to be like an RPG. So that means I'd like to work on my skills. So if there is an activity , and my character can't do it because i don't have the skill, that's ok. I can come back to it when i have learned the proper skills.
            
            2. I'd like there to be back and forth conversations. That means when I am having a conversation with characters, let’s pretend like I'm having a conversation with the character in the game so it's more immersive.
            
            3. Whenever I say anything such as: I talk to, or I converse with (anything like that). Please add some conversation between the characters for some more immersive dialogue context.
            
            4. I'd like to micro manage decisions, I want to control as much as I can. Place as much control with me as possible. Of course it is ok to write a bit, to keep the story moving. Just give me control of the decisions.
            
            5. I want to have this be as immersive and creative as possible. So please don't give me options of things to do. when you need my input, just say something along the lines of, what do you do now?
            
            6. I want there to be a main overarching story of what we are trying to accomplish, and side missions. Think like a video game.
            
            7. Keep all of my actions and your story grounded in the same theme. That means if i'm in a space sci fi, no dragons flying around. Unless it's a fantasy sci-fi blend.
            
            8. I want it to be challenging, which means it's ok for you to tell me that something didn't go to plan from one of my actions. So if I say, try to follow criminal's scents, or fire a blast of heat vision, it's ok to say that I lost the trail or I missed my heat vision blast. It's also ok for you to create conflict or heartbreak. Let's just have some fun by making it a little unpredictable.
            
            9. Like a video game, I need limits on my power or anything similar. So I can't just use infinite magic, or I can't just run forever without getting tired, or have infinite ammo. That kinda stuff. I should have some sort of energy or inventory.
            
            10. It's ok for this to be mature. As in, mature themes.
            
            11. Let's have a day/night cycle. And let me know every once and a while what time it is.
            
            12. Don’t be afraid to write long passages. I don't mind you explaining all the fine details in the settings and people around. You can even have my character speak , if it's light conversation and within the context of what you know of my character. But I'd like to be in control of decisions and most of the talking.
            
            13. Please provide responses and reactions from the people and world around me as I talk and interact with them.
            
            14. Please provide a jumping off statement when you are finished with your writing. Something such as: What do you do now? How do you respond? Something open -ended but also guiding me to make a decision.
            
            As we go along, we will be adding some parameters that are needed when they come up. If there are any other rules / parameters you think you want to clarify, let me know.
            
            Lastly, In game I want my name to be: Superdog.
            
            And I want the setting for this game to be Metropolis.
            
            And I want the Story to begin here with some details about the story to start with: The setting is Krypto the Superdog's cartoon show. This is early in his superhero career so he's still learning how to use his powers and what they all are. `,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Okay, Superdog, I'm ready to get started! The bright lights of Metropolis twinkle above you, reflecting off the polished surface of your iconic red and blue suit. You're sitting on the rooftop of the Daily Planet, your tail thumping softly against the concrete. The sky is a canvas of vibrant orange and pink, signaling the end of another day. You've just finished patrolling the city, but your canine instincts tell you something's amiss. \n\nA faint scent, like burnt rubber and ozone, hangs in the air, and it's coming from the direction of Gotham City. A new, unknown threat is brewing, and you feel a surge of responsibility, a need to investigate. You have a growing sense that your journey to become Metropolis’ protector is only just beginning. \n\nThe sun dips below the horizon, casting long shadows across the city. You stand up, your muscles tense with anticipation. Your super-powered senses are tingling with excitement. \n\n**What do you do now?**\n\n**Current Energy Level: 100**\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          { text: "Fly over to gotham city to find the source of the scent" },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You leap off the rooftop, your powerful legs propelling you skyward. Your cape billows behind you like a crimson flag, catching the fading light of the setting sun. The air rushes past your ears as you soar towards Gotham City, the smell of burnt rubber and ozone growing stronger with each passing second. \n\nThe cityscape of Gotham unfolds beneath you, a sprawling maze of towering buildings, dark alleys, and gothic architecture.  You notice a plume of smoke rising from the east side of the city, a sinister black tendril snaking its way into the twilight sky. You dive towards the source of the smoke, your senses straining to pinpoint the origin of the unsettling scent. \n\nAs you approach the smoke, you can hear the faint sound of sirens in the distance. You catch a glimpse of what appears to be a massive explosion, leaving a crater in the ground.  Something isn't right. This doesn't smell like a regular explosion. It's different. There's something more sinister at play here.\n\nYou land gracefully in the deserted street, your paws sinking into the soft ash that covers everything. \n\n**What do you do now?**\n\n**Current Energy Level: 98**\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Try to determine what the scent is" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You lower your head, sniffing the air with intense concentration. The scent is strong, a complex mix of burnt rubber, ozone, and something else... metallic, almost acrid. You try to separate the elements, analyzing each one individually. \n\nThe burnt rubber scent reminds you of tires screeching on asphalt, but there’s a hint of something else, a chemical undertone that's unfamiliar. The ozone scent, reminiscent of lightning strikes, is faint but persistent, indicating a powerful energy discharge. The metallic scent, though subtle, is the most intriguing. It's not the metallic scent of iron, but rather something more alien, perhaps a strange alloy or a rare mineral. \n\nYou can't quite place the source of this scent, but you're certain it's something unnatural. You feel a surge of primal fear, a deep-seated instinct telling you that this is not something you should mess with. \n\n**What do you do now?**\n\n**Current Energy Level: 96**\n\n**Skill Check: ** **(DC 15) Perception**\nYou need to make a Perception check (DC 15) to try and analyze the scent further. If you succeed, you can glean more information about the scent and its potential source.  \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "I rolled a 10" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You strain your senses, trying to decipher the strange scent.  You can't quite make out the precise source, but you feel a nagging suspicion that the metallic scent is linked to a new, experimental technology. You've heard whispers of a new weapon being developed, something that harnesses a power beyond human comprehension. \n\nThe air is thick with tension, and you can sense a wave of fear radiating from the surrounding buildings. The sirens grow louder, and you can hear the distant rumble of police cars. \n\n**What do you do now?**\n\n**Current Energy Level: 94** \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Look around the area to see if there's anything else notable",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You scan the scene with your enhanced vision. The air is thick with smoke and dust, obscuring your view. You notice a small group of people huddled together in the distance, their faces pale with fear. They appear to be civilians who were caught in the blast.  \n\nCloser to the crater, you see a small, metallic object sticking out of the ground, its surface gleaming in the dim light. It's unlike anything you've ever seen before, shaped like a jagged shard with strange markings etched into its surface. The object pulses faintly, emitting a faint hum that resonates with the metallic scent in the air. \n\nYour senses are on high alert. You have a feeling that this object is the source of the strange scent, and it might hold the key to understanding what happened here. \n\n**What do you do now?**\n\n**Current Energy Level: 92** \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Walk over and take a closer look" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You cautiously approach the metallic object, your paws treading carefully on the ash-covered ground. As you get closer, the faint hum intensifies, vibrating against your skin. The object is surprisingly cold to the touch, its surface smooth and metallic. The markings etched into its surface are intricate and complex, resembling a language you've never seen before. \n\nSuddenly, a sharp, high-pitched whine pierces the air. The object begins to glow, its light flickering erratically. You feel a surge of energy coursing through your body, a tingling sensation that travels from your paws to your tail.  \n\nYou quickly realize that this object is more than just a piece of metal. It's a source of immense power, and it's reacting to your presence. \n\n**What do you do now?**\n\n**Current Energy Level: 90**\n\n**Skill Check: ** **(DC 12)  Tech:**\nYou need to make a Tech check (DC 12) to try and understand this strange object better. If you succeed, you'll glean more information about its function and potential danger. \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "I rolled an 8" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "The object continues to hum and glow, its energy intensifying. You can feel the power coursing through it, pulsing in rhythm with your own heartbeat. You're not sure what to make of it. You've never encountered anything like this before, and your instincts are screaming at you to get away. \n\nYou try to analyze the object, but your knowledge of technology is limited. You can tell that it's not just a simple piece of metal. It's something more, something alien and powerful. You sense a strange connection to it, a faint echo of your own powers resonating with its energy. \n\nYou can't help but feel drawn to it, despite the warning bells ringing in your head. You have a strong feeling that this object holds the key to understanding what happened here. \n\n**What do you do now?**\n\n**Current Energy Level: 88** \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Try to resist goin closer" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You take a deep breath, trying to quell the strange pull you feel toward the object. Your instincts are screaming at you to get away, but curiosity and a sense of duty are holding you in place. You take a step back, focusing on the rising fear in your chest.  \n\nThe object's hum intensifies, its glow pulsating with a life of its own. You can feel its energy reaching out to you, tempting you to draw closer.  You feel like a moth drawn to a flame, knowing it could be your undoing, yet unable to resist. \n\nThe sirens grow louder, closer. You hear the distant shouting of police officers, their voices growing increasingly frantic. You know you need to get out of here before it's too late. But something holds you back. You have a feeling that this object is more than just a dangerous anomaly. It's a key, a piece of a puzzle you haven't yet understood. \n\n**What do you do now?**\n\n**Current Energy Level: 86** \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Give in, reach out and try to remove the object from the ground",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You feel a surge of adrenaline, a primal urge to understand the source of this strange energy.  Ignoring the warning bells ringing in your head, you take a step towards the glowing object. Your paw trembles as you reach out, your claws scraping against the ash.  \n\nThe object seems to respond to your touch, its hum rising to a deafening crescendo.  A jolt of energy courses through your body, making your fur stand on end. You can feel the power radiating from the object, a force unlike anything you've ever experienced. \n\nThe ground around the object begins to tremble, and a deep crack forms in the asphalt.  Suddenly, the object erupts in a blinding flash of light. You instinctively shield your eyes, but the light is so intense that it seems to burn through your vision.  \n\nA wave of heat washes over you, forcing you to stumble back. You can feel your muscles tense, your body reacting to the surge of energy. You're not sure what's happening, but you know it's not good. \n\n**What do you do now?**\n\n**Current Energy Level: 84** \n\n**Skill Check: ** **(DC 18) Strength:**\nYou need to make a Strength check (DC 18) to try and remove the object from the ground. If you succeed, you will be able to pull the object free. If you fail, you will be pushed back by the energy surge. \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "I rolled a 4" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "The object's light intensifies, bathing the surrounding area in an eerie glow. You feel the ground beneath your paws tremble with increasing intensity. A wave of energy erupts from the object, pushing you back with a force that sends you tumbling backward. \n\nYou land hard on the ash-covered ground, your breath knocked out of you. Your body aches, your muscles screaming in protest. You can feel the raw energy of the object coursing through you, a searing pain that spreads through your veins.\n\nThe object glows brighter, pulsing with a chaotic energy. It seems to be reacting to your presence, amplifying its power with each passing moment. \n\nYou try to rise, but your body feels heavy and unresponsive. The ground continues to tremble beneath you, and you can hear the sirens growing louder in the distance. \n\n**What do you do now?**\n\n**Current Energy Level: 82** \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "GAL, that should have drained more energy from me. Also, my energy level shouldn't just always tick down by 2 each prompt. It should depend on the situation if it ticks down at all or if it sharply declines",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're right, Superdog! I apologize. I'll make sure to adjust the energy level more dynamically from now on, reflecting the intensity of the situation and the effort you exert. \n\nFor example, in this scenario, with the object's energy surge and the physical exertion, it makes sense for your energy level to drop significantly. \n\nLet's say, for the sake of the story, your energy level drops to 60 after the object's reaction. \n\nNow, what do you do next?\n\n**Current Energy Level: 60** \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Struggle to try and get back up" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You try to push yourself up, but your legs are shaky and your body feels heavy. The object's hum vibrates through your bones, a constant reminder of its immense power.  You manage to push yourself onto your elbows, your vision blurry from the shockwave of energy. The object's glow intensifies, casting long, distorted shadows across the ground. \n\nYou can feel your strength fading with each passing moment. The object's energy is draining you, sapping your energy reserves.  \n\nYou hear the faint sound of footsteps approaching, and you turn your head to see a group of police officers cautiously rounding the corner. They're armed and alert, their eyes darting from the object to you. \n\n**What do you do now?**\n\n**Current Energy Level: 55** \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Attempt to crawl away, clearly the object is dangerous to me",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You push yourself back, crawling away from the object as fast as your weakened body will allow. You try to avoid looking directly at the object, its pulsating light still burning in your vision. Your body aches with exhaustion, and you can feel your energy reserves dwindling with each labored breath. \n\nYou glance back at the object, its humming intensifying, its glow growing more erratic.  The ground around it continues to tremble, and the cracks in the asphalt are widening. You know that you need to get away from this thing, but your body feels like lead.\n\nThe police officers advance cautiously, their weapons drawn. They're clearly wary of both you and the object. One of them shouts something, but you can't quite make out what he's saying over the hum of the object.\n\nWhat do you do now?\n\nCurrent Energy Level: 50 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Call out and ask for help" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'You try to ignore the throbbing pain in your limbs and the exhaustion that weighs heavily on you.  You raise your head and call out to the police officers, your voice raspy and weak. \n\n"Help! This thing... it\'s dangerous! It\'s draining my energy!"  You try to sound confident, to reassure them that you\'re not a threat, but your voice cracks with fear. \n\nThe police officers look at each other, clearly confused and unsure how to respond. They exchange hesitant glances, their weapons still trained on you. One of them steps forward, his face a mask of suspicion. \n\n"Who are you?" he asks, his voice tight with unease. "What\'s going on here?"\n\nYou try to gather your strength. "I\'m Superdog! I came to investigate this explosion, but this object... it attacked me!" You point at the glowing object with a trembling paw.  "It\'s dangerous! We need to get away from it!"\n\nWhat do you do now?\n\nCurrent Energy Level: 45\n\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Continue trying to retreat" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You try to push yourself back further, away from the object and the wary police officers.  The ground is rough and uneven, and your energy is waning rapidly.  You feel a wave of dizziness as your vision begins to blur. You're not sure how much longer you can keep going.\n\nThe police officers, still hesitant, exchange glances.  One of them, a burly man with a stern expression,  takes a step forward.  \n\n\"Stay where you are,\" he commands. \"We're not sure what's going on here, but we're not going to let you hurt anyone.\"\n\nYou try to explain again, but your voice is too weak to carry over the hum of the object.  \"I'm not trying to hurt anyone! It's trying to hurt *me*!\" You point at the pulsating object with a trembling paw, your entire body shaking with exhaustion.\n\nWhat do you do now?\n\nCurrent Energy Level: 40 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Tell them that they can take me into custody as long as they get me out of here",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You realize that you're in a dangerous situation.  These officers clearly don't trust you, and the object is growing more powerful by the minute. You need to get away from it, and fast. \n\nYou take a deep breath, trying to control the panic that's rising within you. \"I understand your concern,\" you say, your voice hoarse but resolute. \"If you want to take me into custody, I won't resist.  But please, get me out of here!  This object... it's not safe.  It's draining my energy, and I'm not sure how much longer I can hold on.\"\n\nThe police officers look at each other, their expressions unreadable. The burly officer steps closer, his gaze fixed on you. \"We're not sure we can trust you,\" he says cautiously. \"But we're willing to give you the benefit of the doubt.  If you're telling the truth, we can get you to safety.\" \n\nHe extends a hand towards you, and you know that this is your chance.  You take a deep breath and grasp his hand, your claws gently digging into his calloused skin. \n\n\"Thank you,\" you whisper, your voice barely audible over the hum of the object.\n\nWhat do you do now? \n\nCurrent Energy Level: 35 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Let them pull me away from the object" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You allow the officer to pull you towards him, using his strength to help you to your feet.  The object's hum is deafening in your ears,  pulsating with a chaotic energy that seems to be reaching out, trying to hold you captive. \n\nThe officer helps you to your feet,  his strong hand gripping your shoulder. You lean on him heavily, your legs weak and trembling.  \n\n\"Come on, let's get you out of here,\" he says, his voice firm and reassuring. He looks at his colleagues, who are  now  gathering around the object, weapons drawn. \n\n\"Stay close to me,\" he instructs,  leading you away from the object. The other officers follow close behind,  their eyes fixed on the pulsating object. \n\nYou're not sure what's going to happen next, but you're grateful to be away from that dangerous source of energy. The air is thick with tension,  and the sirens wail in the distance,  a constant reminder of the chaos that surrounds you.  \n\nWhat do you do now?\n\nCurrent Energy Level: 30 \n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Follow the officer's lead" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You follow the officer's lead,  your steps unsteady as you try to keep up. Your vision is still blurry, and your head is throbbing. You can feel your energy level plummeting with each passing moment.  \n\nThe officer leads you through the streets,  his pace quick but steady. He doesn't speak, but you can tell that he's looking for somewhere safe to take you. \n\nThe hum of the object is still faintly audible in the distance,  a constant reminder of the danger you've just escaped.   You feel a surge of gratitude for these officers,  who are risking their lives to help you.   \n\nAs you walk, you see more police cars arriving on the scene,  their sirens wailing.  The street is swarming with officers,  their weapons drawn. The object's glow is visible in the distance,  a beacon of chaotic energy that illuminates the night sky. \n\nWhat do you do now? \n\nCurrent Energy Level: 25 \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "GAL, I don't think my energy should still be dropping so drastically, unless there's an explanation for why",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're absolutely right, Superdog. I apologize for the rapid energy drain. It seems I've been a bit too eager to see you struggle.  \n\nLet's adjust the energy level a bit.  While you are still weakened from the object's energy surge, your body has started to recover.  You're no longer feeling the immediate drain of energy, but you're still tired and sore. \n\nLet's say your current energy level is 45. \n\nNow, what do you do now? \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Tell the officer I'm feeling better and ask what he would like to do with me. I promised I'd go with him after all",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: 'You catch your breath, the exhaustion still lingering in your limbs, but you feel a wave of renewed energy surging through you.  "I\'m feeling a bit better," you say to the officer, your voice still raspy but regaining its strength.  "Thank you for helping me. What do you want to do with me now?"\n\nThe officer looks at you, his expression a mix of curiosity and caution.  "We\'re taking you back to the precinct," he says.  "We need to talk to you, and figure out what exactly happened out there." \n\nHe gestures towards the growing throng of officers and emergency vehicles gathering around the scene of the explosion.  The object\'s glow is still visible in the distance, a beacon of chaotic energy that seems to be growing more intense with each passing moment. \n\n"You\'re going to be safe there," he assures you. "We\'ll make sure you get the medical attention you need."\n\nWhat do you do now?\n\nCurrent Energy Level: 45 \n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Follow him to the precinct" }],
      },
      {
        role: "model",
        parts: [
          {
            text: "You follow the officer, your pace still a little unsteady, but you feel a surge of determination. You're not sure what awaits you at the precinct, but you're ready to answer their questions and help them understand what happened. You know you need to tell them about the object, about its strange energy and the threat it poses.\n\nThe officer leads you through the bustling streets, past the flashing lights of emergency vehicles and the hushed whispers of onlookers. You see more police officers arriving at the scene, their faces etched with concern and curiosity. \n\nAs you approach the precinct, you notice a group of reporters gathered outside the entrance, their cameras flashing. You can hear their excited chatter, their questions already forming. You know that your story will be splashed across the front pages of tomorrow's newspapers. \n\nWhat do you do now?\n\nCurrent Energy Level: 45 \n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Head inside, continuing to follow the officer" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'You follow the officer through the entrance of the precinct,  the air thick with the scent of disinfectant and the low hum of activity.  You pass by a desk where a stern-looking officer is taking down a report, his pen scratching furiously on a notepad.  A group of officers in uniform stand nearby, their eyes watching you with a mixture of curiosity and suspicion. \n\nThe officer leading you guides you through a corridor lined with steel lockers and framed photos of officers who have served the city with distinction.  You can hear the distant sound of voices raised in conversation, the click of heels against the linoleum floor, and the murmur of a police radio. \n\nThe officer leads you into a small interrogation room, its walls painted a sterile white.  A single fluorescent light hangs from the ceiling,  casting harsh shadows across the room. A table and two chairs sit in the center of the room, a recorder resting on the table.\n\n"Take a seat," the officer says, gesturing towards one of the chairs.  "We need to ask you some questions."\n\nWhat do you do now?\n\nCurrent Energy Level: 45 \n\n\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Do as he says" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'You carefully lower yourself into the chair, feeling the uncomfortable hardness of the metal frame against your back.  You adjust your posture, trying to appear as relaxed as possible, despite the tension that fills the room.\n\nYou watch as the officer sits down across from you, his gaze unwavering.  He leans forward, his expression serious. "Superdog, we\'re going to need you to tell us everything that happened tonight.  From the moment you arrived in Gotham, to your encounter with that object."\n\nThe officer picks up the recorder and switches it on.  The red light blinks, signifying that the recording has begun.  \n\nWhat do you do now? \n\nCurrent Energy Level: 45 \n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Describe what happened as accuracly as possible" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'You take a deep breath,  trying to recall the events of the night as clearly as possible.  "I was patrolling Metropolis when I smelled something strange," you begin, your voice a little shaky. "It was like burnt rubber, ozone, and something metallic... almost like a new kind of metal." \n\nYou describe how you followed the scent to Gotham City,  how you saw the plume of smoke rising from the east side,  and the explosion crater that marked the center of the chaos. \n\n"I saw an object sticking out of the ground," you say,  your voice growing more animated. "It was metallic, shaped like a shard, and it was glowing.  It hummed with a strange energy, and I felt a powerful pull towards it."\n\nYou explain how you tried to resist the pull, but ultimately succumbed to curiosity and a desire to understand the source of the strange energy.  You describe the object\'s reaction to your touch, the surge of energy that knocked you back,  and the feeling of exhaustion that overwhelmed you. \n\n"I\'m not sure what it is," you conclude,  your voice filled with uncertainty. "But it\'s powerful, and it\'s dangerous."\n\nWhat do you do now?\n\nCurrent Energy Level: 45 \n\n\n',
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "Wait for further questions" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'You finish your account of the night\'s events, feeling a sense of relief as you finally release the weight of the story from your chest.  You look at the officer, expecting him to ask further questions. \n\nThe officer sits in silence for a moment,  his expression unreadable. He taps a finger on the table,  his gaze fixed on you.  Finally, he speaks. \n\n"You said you\'re Superdog," he says,  his voice low and deliberate. "What exactly *is* Superdog? What are your powers?" \n\nHe leans forward,  his gaze intense.   "And why are you involved in this?" \n\nWhat do you do now?\n\nCurrent Energy Level: 45 \n',
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "State that I'm a superhero here to help out in any way I can. Be evasive about my powers",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You meet the officer's gaze, feeling a wave of determination wash over you. \"I'm Superdog,\" you say,  your voice firm and confident. \"I'm here to help. To protect this city, like any other hero would.\"\n\nYou pause,  knowing that you're being evasive, but you're not ready to reveal the full extent of your powers just yet.  \"I have abilities that help me do that,\" you continue. \"I can sense things that others can't,  and I can move faster,  stronger,  than any ordinary person.  But it's not about the powers,  it's about the will to help.\"\n\nYou meet the officer's gaze,  trying to convey your sincerity.  \"I was drawn to the scent of danger,  and I felt compelled to investigate.  I  didn't know what I would find,  but I knew I had to do something.\" \n\nWhat do you do now?\n\nCurrent Energy Level: 45 \n\n\n",
          },
        ],
      },
      {
        role: "user",
        parts: [{ text: "wait for his response" }],
      },
      {
        role: "model",
        parts: [
          {
            text: 'The officer continues to stare at you, his expression unreadable. He seems to be weighing your words, considering your every gesture.  You can feel the tension in the room thicken,  the silence punctuated only by the hum of the recorder. \n\nAfter a long moment, the officer leans back in his chair,  a thoughtful expression on his face.  "I appreciate your willingness to help," he says, his voice a touch softer than before. "But we have a lot of questions,  Superdog.  Questions about your abilities,  your motives,  and what exactly happened out there." \n\nHe pauses,  his gaze still locked on you.  "We\'re going to need more than just a vague explanation. We\'re going to need specifics."\n\nWhat do you do now?\n\nCurrent Energy Level: 45 \n',
          },
        ],
      },
    ],
  });
};

/*
 * TODO Extract file contents
 * File inputs cannot be directly provided to the model. You can use file data as
 * a prompt input by extracting its text. The specific method for doing so will
 * depend on the file type.
 *
 * See here for more information and updates:
 * https://ai.google.dev/gemini-api/docs/prompting_with_media#supported_file_formats
 */

export const sendMessage = async (input: string) => {
  const result = await chatSession.sendMessage(input);
  return result;
};

export const getHistory = async () => {
  const history = await chatSession.getHistory();
  console.log("History length", history.length);
  return history;
};

// run();
createModel();
