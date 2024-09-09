const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res, next) => {
  try {
  // console.log("backend processPayment");
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    description: req.body.description,
    metadata: {                  // optional
      company: "E-Commerce",
      integration_check: 'accept_a_payment'
    },
  });

  res.status(200).json({
    success: true,
    message:"Payment Completed Successfully",
    client_secret: myPayment.client_secret
  });
  // console.log("backend processPayment last line");


}  catch (error) {
  if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
      error.message = "this mail Id Already exists"
      res.json({
          Error_message:error.message
      })
  }else{
       res.json({
          Error_message:error.message
       })
   }
}
};

exports.sendStripeApiKey = async (req, res, next) => {
  try {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
}  catch (error) {
  if (error.message === "Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: Ecommerce.users index: email_1 dup key: { email: \"rv171613@gmail.com\" }") {
      error.message = "this mail Id Already exists"
      res.json({
          Error_message:error.message
      })
  }else{
       res.json({
          Error_message:error.message
       })
   }
}
};
