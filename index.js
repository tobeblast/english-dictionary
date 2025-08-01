const inputEl = document.querySelector("#input");
const infoTextEl = document.querySelector("#info-text");
const meaningContainerEl = document.querySelector("#meaning-container");
const meaningEl = document.querySelector("#meaning");
const titleEl = document.querySelector("#title");
const audioEl = document.querySelector("#audio");
const buttonEl = document.querySelector(".btn");

async function fetchApi(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"...`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());
    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioEl.display = "inline-flex";
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    infoTextEl.innerText = `An error happend try again later`;
  }
}

buttonEl.addEventListener("click", () => {
  if (inputEl.value) {
    fetchApi(inputEl.value);
  }
});

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchApi(e.target.value);
  }
});
