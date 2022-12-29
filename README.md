# YodaBot Lyrics Website
Lyrics demo for websites using the YodaBot API.

## Live demo
You can view a live demo on [lyrics.yodabot.xyz](https://lyrics.yodabot.xyz)

## Running the demo
This script is really straightforward. All the necessary files are in the [`src`](/src) folder. You can run the demo by opening the [`index.html`](/src/index.html) file in your browser.

Javascript is also provided, but without using any wrappers or libraries. You can find the Javascript code in the [`index.js`](/src/index.js) file.

## Using the API
View [the API documentation](https://api.yodabot.xyz/docs) for more information on using this API.

You can also visit [the API playground](https://api.yodabot.xyz/playground) to test out the API yourself.

YodaBot API has a lot more features than just lyrics. You can also use it to predict genre of an audio, analyze an image, grammar correction, OCR, and more!

## What is [worker.js](/src/worker.js)?
The [`worker.js`](/src/worker.js) file is a script for a Cloudflare Workers.

[This service](https://lyrics.yodabot.xyz) is hosted on Cloudflare Workers (cause I'm not bothered to host this in a server).

## License
This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
