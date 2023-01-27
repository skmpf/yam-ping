const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./yam.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the yam database.");
  }
});

function createPropertiesTable() {
  db.run(
    "CREATE TABLE IF NOT EXISTS properties(id INTEGER PRIMARY KEY, offer INTEGER, property TEXT, realt_price INTEGER, offer_price INTEGER, offer_amount INTEGER, price_difference INTEGER, current_yield INTEGER, new_yield INTEGER, rent_start_date TEXT)"
  );
}

function addProperty(
  offer,
  property,
  realt_price,
  offer_price,
  offer_amount,
  price_difference,
  current_yield,
  new_yield,
  rent_start_date
) {
  const sql = `INSERT INTO properties (offer, property, realt_price, offer_price, offer_amount, price_difference, current_yield, new_yield, rent_start_date) VALUES (?,?,?,?,?,?,?,?,?)`;
  db.run(
    sql,
    [
      offer,
      property,
      realt_price,
      offer_price,
      offer_amount,
      price_difference,
      current_yield,
      new_yield,
      rent_start_date,
    ],
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
}

function getProperties() {
  db.all("SELECT * FROM properties", (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("🚀 ~ file: database.js:57 ~ db.all ~ rows", rows);
      return rows;
    }
  });
}

function getPropertyByOffer(offer) {
  db.get(`SELECT * FROM properties WHERE offer = ${offer}`, (err, row) => {
    if (err) {
      console.error(err.message);
    } else {
      return row;
    }
  });
}

function addNewProperty(data) {
  const property = getPropertyByOffer(data.offer);
  if (!property) {
    addProperty(
      data.offer,
      data.property,
      data.realt_price,
      data.offer_price,
      data.offer_amount,
      data.price_difference,
      data.current_yield,
      data.new_yield,
      data.rent_start_date
    );
  }
}

module.exports = {
  addNewProperty,
  createPropertiesTable,
  getProperty: getPropertyByOffer,
};
