// const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer-core");
const realtokens = require("./realtokens.json");
const {
  addNewProperty,
  createPropertiesTable,
  getProperty,
} = require("./database");
const { sendMail } = require("./email");
const { url } = require("./config.json");

createPropertiesTable();

async function scrapeWebsite() {
  const browser = await puppeteer.launch({
    // headless: false,
    // defaultViewport: null,
    // slowMo: 50,
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    userDataDir: "./myChromeSession",
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const data = await page.evaluate(() => {
    const offerProps = [
      "offer",
      "property",
      "realt_price",
      "offer_price",
      "offer_amount",
      "price_difference",
      "current_yield",
      "new_yield",
      "rent_start_date",
    ];

    const table = document.getElementById("tableau");
    const offers = [];

    for (let i = 0; i < table.rows.length; i++) {
      const offer = {};

      for (let j = 0; j < table.rows[i].cells.length; j++) {
        const cellText = table.rows[i].cells[j].textContent;
        offer[offerProps[j]] = cellText;
      }

      offers.push(offer);
    }

    return offers;
  });

  browser.close();
  return data;
}

async function checkForMatches() {
  const data = await scrapeWebsite();
  const offers = [];

  for (let i = 0; i < data.length; i++) {
    if (realtokens.includes(data[i].property)) {
      const offer = getProperty(data[i].offer);
      if (!offer) {
        offers.push(data[i]);
        addNewProperty(data[i]);
      }
    }
  }

  if (offers.length > 0) {
    sendMail(offers);
  }
}

checkForMatches();
