const input = document.getElementById("search-input");
const autocomplete = document.getElementById("autocomplete");
const r_title = document.getElementById("res-title");
const r_artist = document.getElementById("res-artist");
const r_lyrics = document.getElementById("res-lyrics");
const loading = document.querySelector(".lds-ring");
const result = document.querySelector(".result");

async function getLyrics(query) {
    let r = await fetch(`https://api.yodabot.xyz/api/lyrics/search?q=${query}`);
    return await r.json();
}

async function performAutocomplete(query) {
    let r = await fetch(`https://api.yodabot.xyz/api/lyrics/suggest?q=${query}&amount=5`);
    return await r.json();
}

async function displayLyrics(query) {
    if (!query) return;

    result.style.display = "none";

    r_title.innerText = "";
    r_artist.innerText = "";
    r_lyrics.innerText = "";

    let oriAutocomplete = autocomplete.innerHTML;
    autocomplete.innerHTML = "";

    loading.style.display = "inline-block";
    let lyrics = await getLyrics(query);
    loading.style.display = "none";

    if (!lyrics.title || !lyrics.artist || !lyrics.lyrics) {
        autocomplete.innerHTML = oriAutocomplete;
        return alert("Lyrics not found.");
    }

    input.value = "";

    r_title.innerText = lyrics.title;
    r_artist.innerText = lyrics.artist;
    r_lyrics.innerText = lyrics.lyrics;

    result.style.display = "block";
}

async function displayAutocomplete(e) {
    if (e.target.value === "") {
        autocomplete.innerHTML = "";
        return;
    }

    let suggestions = await performAutocomplete(e.target.value);
    autocomplete.innerHTML = "";
    for (let suggestion of suggestions) {
        let li = document.createElement("li");
        li.addEventListener('click', async function (e) {
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
    if (e.code === 'Enter' && e.target.value !== "") {
        await displayLyrics(input.value);
    }
});
setInterval(() => {
    if (input.value === "") {
        autocomplete.innerHTML = "";
    }
}, 100);