const url = "https://raw.githubusercontent.com/YodaBotOS/lyrics.yodabot.xyz/main/src"

async function handleRequest(request) {
    const req_url = new URL(request.url);

    let pathname = '';
    let content_type = '';
    if (req_url.pathname === '/' || req_url.pathname === '/index.html') {
        pathname = '/index.html';
        content_type = 'text/html;charset=UTF-8'
    } else if (req_url.pathname === '/style.css') {
        pathname = '/style.css';
        content_type = 'text/css;charset=UTF-8';
    } else if (req_url.pathname === '/script.js') {
        pathname = '/script.js';
        content_type = 'text/javascript;charset=UTF-8';
    } else if (req_url.pathname === '/favicon.png') {
        pathname = '/favicon.png';
        content_type = 'image/png';
    } else {
        return new Response("File not found.", {status: 404});
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