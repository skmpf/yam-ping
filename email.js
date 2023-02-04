const nodemailer = require("nodemailer");
const { gmailAddress, gmailAppPassword } = require("./config.json");

const client = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailAddress,
    pass: gmailAppPassword,
  },
});

const sendMail = async (offers) => {
  const emailBody = offers.map((offer) => {
    return `
      Offer: ${offer.offer}
      Property: ${offer.property}
      Realt price: ${offer.realt_price}
      Offer price: ${offer.offer_price}
      Offer amount: ${offer.offer_amount}
      Price difference: ${offer.price_difference}
      Current yield: ${offer.current_yield}
      New yield: ${offer.new_yield}
      Rent start date: ${offer.rent_start_date}
    `;
  });

  const mailOptions = {
    from: "realt@gmail.com",
    to: gmailAddress,
    subject: "Realt RMM - New offer",
    text: emailBody.toString(),
  };

  client.sendMail(mailOptions, (err) => {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log("Email sent!");
    }
  });
};

module.exports = { sendMail };
