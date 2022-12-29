const input = document.getElementById("search-input");
const autocomplete = document.getElementById("autocomplete");
const r_title = document.getElementById("res-title");
const r_artist = document.getElementById("res-artist");
const r_lyrics = document.getElementById("res-lyrics");
const loading = document.querySelector(".lds-ring");

async function getLyrics(query) {
    let r = await fetch(`https://api.yodabot.xyz/api/lyrics/search?q=${query}`);
    return await r.json();
}

async function performAutocomplete(query) {
    let r = await fetch(`https://api.yodabot.xyz/api/lyrics/suggest?q=${query}&amount=5`);
    return await r.json();
}

async function displayAutocomplete(e) {
    let suggestions = await performAutocomplete(e.target.value);
    autocomplete.innerHTML = "";
    for (let suggestion of suggestions) {
        let li = document.createElement("li");
        li.addEventListener('click', async function (e) {
            await displayLyrics(this.innerText);
        });
        li.innerText = `${suggestion.title} - ${suggestion.artists.join(", ")}`;
        autocomplete.appendChild(li);
    }
}

async function displayLyrics(query) {
    r_title.innerText = "";
    r_artist.innerText = "";
    r_lyrics.innerText = "";

    loading.style.display = "inline-block";
    let lyrics = await getLyrics(query);
    loading.style.display = "none";

    r_title.innerText = lyrics.title;
    r_artist.innerText = lyrics.artist;
    r_lyrics.innerText = lyrics.lyrics;

    input.value = "";
    autocomplete.innerHTML = "";
}

input.addEventListener('input', displayAutocomplete);
input.addEventListener('propertychange', displayAutocomplete);
input.addEventListener('keydown', async function (e) {
    if (e.keyCode === 13) {
        await displayLyrics(input.value);
    }
});