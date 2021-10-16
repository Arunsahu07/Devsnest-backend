const router = require("express").Router();
const path = require("path");
const stripe = require("stripe")("api_key")
router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "../public/html/payment.html"))
})
router.post("/payment" , async(req,res)=>{
    try{
        const session = stripe.checkout.session.create({
            line_items: [{
                amount: req.body.price,
                name: "shopping",
                currency: "usd",
                quantity: 1
            }],
            payment_method_types: ["cards"],
            success_url: `${req.headers.origin}?success=true&success_id={CHECKOUT_SESSION_ID}`,
            cancel_url : `${req.headers.origin}?cancelled=true`
        })
        res.redirect(303, session.url)
    }
    catch(err)
    {
        res.status(500).send(err)
    }

})