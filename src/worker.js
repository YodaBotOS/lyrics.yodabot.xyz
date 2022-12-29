const url = "https://raw.githubusercontent.com/YodaBotOS/lyrics.yodabot.xyz/main"
const options = {
    headers: {
        "content-type": "text/html;charset=UTF-8",
    },
    status: 200,
}

async function fetchURL(url) {
    const response = await fetch(url);
    return await response.text();
}

async function handleRequest(request) {
    const req_url = new URL(request.url);
    const content = await fetchURL(url + req_url.pathname);
    return new Response(content, options);
}

addEventListener('fetch', event => {
    return event.respondWith(handleRequest());
});