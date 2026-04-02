let array_letters = []

let timeout;
let timeout_fade;

const MAX = 4

const text_consigne = document.getElementsByClassName("text_consigne")[0]

let timeout_consigne = setTimeout(reAppearConsigne, 4000)

document.addEventListener("keydown" ,(key) => {
    reDisappearConsigne()
    if (array_letters.length == MAX) return
    array_letters.push(key.key)
    var audio = new Audio(`sounds/${array_letters.length}hit.mp3`)
    audio.play()
    displayLetter(key.key.toUpperCase())
    clearTimeout(timeout)
    clearTimeout(timeout_consigne)
    if (array_letters.length > MAX){
        lettersFull()
    }else{  
        timeout = setTimeout(lettersFull, array_letters.length == MAX ? 500 : 1500)
        timeout_consigne = setTimeout(reAppearConsigne, 2500)
    }

})

function reAppearConsigne(){
    text_consigne.style.transition = "0.2s ease"
    text_consigne.classList.add("visible")
    text_consigne.classList.remove("invisible")
    text_consigne.style.transition = ""
}
function reDisappearConsigne(){
    text_consigne.style.transition = "0s"
    text_consigne.classList.remove("visible")
    text_consigne.classList.add("invisible")
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomDegr(){
    const rotates = [-30, 30, -10, 0, 10, 4, -4, 2, 1, -1 ,-2]
    return rotates[Math.floor(Math.random() * rotates.length)]
}


async function displayLetter(letter){
    clearTimeout(timeout_fade)
    const letterbox = document.getElementById("letter")
    letterbox.textContent = letter.toUpperCase()
    letterbox.style.color = `${getRandomColor()}`
    letterbox.style.opacity = 1
    letterbox.style.rotate = getRandomDegr()+"deg"
    letterbox.classList.add("growletter")
    timeout_fade = setTimeout(()=>{
        letterbox.style.opacity = 0
        letterbox.classList.remove("growletter")
    }, 500)
    
}

async function lettersFull(){
    const letters_div = document.getElementById("letters")
    string = array_letters.join("").toUpperCase()
    var audio_full = new Audio(`sounds/hits.mp3`)
    audio_full.play()

    const letterbox = document.getElementById("letter")
    letterbox.style.opacity = 0

    for (letter of array_letters){
        
        if (letters_div?.firstChild){
            letters_div.firstChild.textContent = letters_div.firstChild.textContent+letter.toUpperCase()
        }else{
            const span_to_push = document.createElement("article")
            span_to_push.textContent = letter.toUpperCase()
            letters_div.appendChild(span_to_push)
            
        }
        
        await new Promise(res=>setTimeout(res, 100))
    }
    

    array_letters = []
    clearTimeout(timeout)
    await new Promise(res=>setTimeout(res, 500))
    while (letters_div.firstChild){
        letters_div.removeChild(letters_div.firstChild)
    }
}