const Database = require("../database/config");

const addProperty = async (item) => {
  const db = await Database();
  const sql = `INSERT INTO properties (
    offer,
    property,
    realt_price,
    offer_price,
    offer_amount,
    price_difference,
    current_yield,
    new_yield,
    rent_start_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  await db.run(sql, [
    item.offer,
    item.property,
    item.realt_price,
    item.offer_price,
    item.offer_amount,
    item.price_difference,
    item.current_yield,
    item.new_yield,
    item.rent_start_date,
  ]);
  await db.close();
};

const getProperties = async () => {
  const db = await Database();
  const properties = await db.all("SELECT * FROM properties");
  await db.close();
  return properties;
};

const getPropertyByOffer = async (offer) => {
  const db = await Database();
  const property = await db.get(
    `SELECT * FROM properties WHERE offer = ?`,
    offer
  );
  await db.close();
  return property;
};

module.exports = {
  addProperty,
  getProperties,
  getPropertyByOffer,
};
