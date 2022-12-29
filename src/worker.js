const url = "https://raw.githubusercontent.com/YodaBotOS/lyrics.yodabot.xyz/main/src"

async function handleRequest(request) {
    const req_url = new URL(request.url);

    let pathname = '';
    if (req_url.pathname == '/') {
        pathname = '/index.html';
        content_type = 'text/html;charset=UTF-8'
    } else if (req_url.pathname == '/style.css') {
        pathname = '/style.css';
        content_type = 'text/css;charset=UTF-8';
    } else if (req_url.pathname == '/script.js') {
        pathname = '/script.js';
        content_type = 'text/javascript;charset=UTF-8';
    } else {
        return Response("File not found.", options);
    }

    const response = await fetch(url + pathname);
    const content = await response.text();

    const options = {
        headers: {
            "content-type": content_type,
        },
        status: 200,
    }

    return new Response(content, options);
}

addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
});