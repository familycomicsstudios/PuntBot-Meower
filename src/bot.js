import Bot from "meowerbot";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const bot = new Bot("PuntBot", process.env.PASSWORD); // Init, then login to Meower
console.log(process.env.PASSWORD)

bot.onLogin(() => { // Runs when logged in
    //bot.post("PuntBot joined the party! Try using !help.");
});

bot.onMessage((data) => { // Runs when the server sends a new message
    var datas = data
    data = JSON.parse(data)
    console.log(`New message: ${datas}`);
    console.log(`New message: ${data["val"]["p"]}`);
    if (data["val"]["p"] === undefined) {
    } else {
    var split = data["val"]["p"].split(" ");
    if (split[0] === "!help") {
        bot.post("My commands include:\n!help\n!ping\n!roast\n!upvote", data["val"]["post_origin"])
    }
    if (split[0] === "!ping") {
        bot.post("Pong", data["val"]["post_origin"])
    }
    var items = ["You're sus", "bro why u use roast", "you are about as funny as among us"];
    if (split[0] === "!roast") {
        bot.post(items[Math.floor(Math.random()*items.length)], data["val"]["post_origin"])
    }
    if (split[0] === "!upvote") {
        bot.post("~karma upvote "+split[1], "livechat")
        bot.post("Successfully added Karma!", data["val"]["post_origin"])
    }
    }
});

bot.onClose(() => { // Runs when the bot gets disconnected
    console.log("Disconnected");
});