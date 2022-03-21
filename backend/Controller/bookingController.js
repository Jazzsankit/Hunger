const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
const stripe = require('stripe')('sk_test_51K8PdcSBEmbQofWmMZhlZOhtPnMqaSW1bqRoNnMZ4SkfDrzpK5mtLZEeR4H0mRUzkSnwFOD2YaIfXDxlYEvnetSj005WMPw3lb');

async function createPaymentSession(req,res){
    try {
        userId = req.id;
        const {planId}=req.body;
        const plan = await planModel.findById(planId);
        const user = await userModel.findById(userId);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: plan.name,
                  },
                  unit_amount: plan.price*100,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
    })
    // console.log(session)
    
    // await res.redirect(303, session.url);
    res.json({
              session
          })
    } catch (error) {
        res.json({
            message:"Failed to create session",
            error
        })
    }
}

module.exports.createPaymentSession = createPaymentSession;