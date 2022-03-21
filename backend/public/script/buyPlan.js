let buyMe= document.querySelectorAll('.signup-button a');
let allLis = document.querySelectorAll('.option');
const stripe = Stripe('pk_test_51K8PdcSBEmbQofWmG4JpOrgfxfFXJpREm6urVmoBmjrs9PQQz2JJVCS4r5QLQxDENTPViTkxMULvxsJeC8YCckHT00Vdd5cmD4');

for(let i=0;i<buyMe.length;i++){
    try {  
        buyMe[i].addEventListener("click",async function(e){
            console.log("hi")
            if(allLis.length<6){
                window.location.href = "/login";
            }else{
                let planId = buyMe[i].getAttribute("planId");
                let session =  await axios.post("http://localhost:3000/api/booking/createPaymentSession" , {planId : planId });
                let sessId = session.data.session.id;
                let result = await stripe.redirectToCheckout({ sessionId: sessId });
                console.log(result);
            }
        })
    } catch (error) {
        alert(error.message);
    }
}