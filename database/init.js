const Database = require("./config");

const initDatabase = async () => {
  const db = await Database();

  await db.exec(`CREATE TABLE IF NOT EXISTS properties(
      id INTEGER PRIMARY KEY,
      offer TEXT,
      property TEXT,
      realt_price TEXT,
      offer_price TEXT,
      offer_amount TEXT,
      price_difference TEXT,
      current_yield TEXT,
      new_yield TEXT,
      rent_start_date TEXT
  )`);

  await db.close();
};

initDatabase();
