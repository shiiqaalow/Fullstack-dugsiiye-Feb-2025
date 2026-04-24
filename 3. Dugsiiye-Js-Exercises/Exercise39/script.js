
document.querySelector(".form").addEventListener("click", async function (e) {
  e.preventDefault();



  const url = "https://text-translator2.p.rapidapi.com/getLanguages";

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "7fda873889msh19464de9555d5f1p1443d7jsn82b0ae898f5d",
      "x-rapidapi-host": "text-translator2.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url,options);
    const result = await response.json();
    displayLanguages(result.data.languages);
  } 
  catch (error) {
    console.error("failed to fetch languages");
  }
});

function displayLanguages(languages) {
  const select1 = document.querySelector(".select-from");
  const select2 = document.querySelector(".select-to");

  languages.forEach((language) => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = language.code;
    option2.value = language.code;
    option1.textContent = language.name;
    option2.textContent = language.name;
    select1.appendChild(option1);
    select2.appendChild(option2);
  });
}

const selectFrom = document.querySelector(".select-from")
const selectTo = document.querySelector(".select-to")
const inputText = document.querySelector(".textarea")

document.querySelector(".btn").addEventListener("click",async function(){
    

    const url = "https://text-translator2.p.rapidapi.com/translate";
    const options = {
    method: "POST",
    headers: {
        "x-rapidapi-key": "7fda873889msh19464de9555d5f1p1443d7jsn82b0ae898f5d",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
    },
    body: new URLSearchParams({
        source_language: selectFrom.value,
        target_language: selectTo.value,
        text: inputText.value
    })
    }

    try{
        const response = await fetch(url,options)
        const result = await response.json()
        displayTranslatedText(result.data.translatedText)

        selectFrom.value = "";
        selectTo.value = "";
        inputText.value = "";
    }
    catch(error){
        console.error("invalid translation")
    }
})

function displayTranslatedText(text){
    const displayTranslation = document.querySelector(".display-translated-text");

    displayTranslation.innerHTML ="";
    
    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    displayTranslation.appendChild(paragraph);
}