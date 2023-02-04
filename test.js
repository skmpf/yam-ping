const {
  addProperty,
  getProperties,
  getPropertyByOffer,
} = require("./model/Property");

(async () => {
  await addProperty({
    offer: "offer_1",
    property: "property_1",
    realt_price: "1",
    offer_price: "1",
    offer_amount: "1",
    price_difference: "1",
    current_yield: "1",
    new_yield: "1",
    rent_start_date: "rent_start_date_1",
  });
  await addProperty({
    offer: "offer_2",
    property: "property_2",
    realt_price: "2",
    offer_price: "2",
    offer_amount: "2",
    price_difference: "2",
    current_yield: "2",
    new_yield: "2",
    rent_start_date: "rent_start_date_2",
  });

  const properties = await getProperties();
  console.log("🚀 ~ file: test.js:32 ~ properties", properties);

  const property = await getPropertyByOffer("offer_1");
  console.log("🚀 ~ file: test.js:35 ~ property", property);
})();
