const url="https://api.dictionaryapi.dev/api/v2/entries/en/";
const result= document.querySelector(".result");
const sound=document.querySelector("#sound");
const btn=document.querySelector("#search-btn");

btn.addEventListener("click",()=>{
  let inpword=document.querySelector("#input-word").value;
  
  //console.log(inpword);
  getMeaning(inpword);
 
});

async function getMeaning(inpword){
    try{
        const response= await fetch(`${url}${inpword}`);
        const data= await response.json();
        //console.log(data);
        result.innerHTML=`
        <div class="word">
        <h3>${inpword}</h3>
        <button id="playsound" onclick="playSound(this)"><i class="fa-solid fa-volume-high" style="color: #ae9cff"></i></button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || "Example Not Found"}
        </p>`;
        sound.setAttribute("src",`${data[0].phonetics[1].audio || ""}`)
    }catch(err){
      //console.log("ERROR :",err);
      result.innerHTML=`<h3 class="Error">Couldn't Find The Word</h3>`;
    }
}

function playSound(){
  sound.play();
}