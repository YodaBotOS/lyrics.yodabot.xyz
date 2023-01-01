const input = document.getElementById("search-input");
const autocomplete = document.getElementById("autocomplete");
const r_title = document.getElementById("res-title");
const r_artist = document.getElementById("res-artist");
const r_lyrics = document.getElementById("res-lyrics");
const loading = document.querySelector(".lds-ring");

let disableAutocomplete = false;

function getInput(element) {
    element = element || input;
    let value = element.value;
    value = value.trim();
    return value;
}

async function getLyrics(query) {
    query = query.trim();
    let r = await fetch(`https://api.yodabot.xyz/api/lyrics/search?q=${query}`);
    return await r.json();
}

async function performAutocomplete(query) {
    query = query.trim();
    let r = await fetch(`https://api.yodabot.xyz/api/lyrics/suggest?q=${query}&amount=5`);
    return await r.json();
}

async function displayLyrics(query) {
    query = query.trim();

    if (!query) {
        alert("Please enter a query!");
        return
    }

    input.readOnly = true;
    disableAutocomplete = true;

    r_title.innerText = "";
    r_artist.innerText = "";
    r_lyrics.innerText = "";

    autocomplete.innerHTML = "";

    loading.style.display = "inline-block";
    let lyrics = await getLyrics(query);
    loading.style.display = "none";

    input.readOnly = false;
    disableAutocomplete = false;

    if (!lyrics || !lyrics.title || !lyrics.artist || !lyrics.lyrics) {
        alert("No lyrics found. Sorry!");
        return;
    }

    input.value = "";
    autocomplete.innerHTML = "";

    r_title.innerText = lyrics.title;
    r_artist.innerText = lyrics.artist;
    r_lyrics.innerText = lyrics.lyrics;
}

async function displayAutocomplete(e) {
    let value = getInput(e.target);

    if (value === "") {
        autocomplete.innerHTML = "";
        return;
    }

    if (disableAutocomplete) return;

    let suggestions = await performAutocomplete(value);
    autocomplete.innerHTML = "";
    for (let suggestion of suggestions) {
        let li = document.createElement("li");
        li.addEventListener('click', async function (e) {
            window.disableAutocomplete = true;
            input.value = e.target.innerText;
            await displayLyrics(e.target.innerText);
        });
        li.innerText = `${suggestion.title} - ${suggestion.artists.join(", ")}`;
        autocomplete.appendChild(li);
    }
}

input.addEventListener('input', displayAutocomplete);
input.addEventListener('propertychange', displayAutocomplete);
input.addEventListener('change', displayAutocomplete);
input.addEventListener('keydown', async function (e) {
    if (e.code === 'Enter') {
        window.disableAutocomplete = true;
        await displayLyrics(getInput(e.target));
    }
});
setInterval(() => {
    if (input.value === "") {
        autocomplete.innerHTML = "";
    }
}, 100);