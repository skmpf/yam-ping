const puppeteer = require("puppeteer");
const cron = require("node-cron");
const realtokens = require("./realtokens.json");

// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { channelId, token, url } = require("./config.json");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

async function scrapeWebsite() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // Extract the necessary information from the website
  const data = await page.evaluate(() => {
    // Code to extract the data, for example:
    const elements = document.querySelectorAll("#tableau tr td:nth-child(2)");
    const data = [];
    elements.forEach((el) => {
      data.push(el.textContent);
    });
    return data;
  });

  browser.close();
  return data;
}

async function checkForMatches() {
  const data = await scrapeWebsite();

  for (let i = 0; i < data.length; i++) {
    if (realtokens.includes(data[i])) {
      sendNotification(data[i]);
      break;
    }
  }
}

function sendNotification(match) {
  client.on("ready", () => {
    const channel = client.channels.cache.get(channelId);
    channel.send(`A match was found: ${match}`);
  });
}

cron.schedule("*/15 * * * *", () => {
  checkForMatches();
});
