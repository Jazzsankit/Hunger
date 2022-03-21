let heading2= document.querySelector('#change-text');
let showCase = document.querySelector('.showcase');
let navBar=document.querySelector('.navbar');
let arr=['EVERYONE','DEVELOPER','VEGANS']

async function myFun(){
for(let i=0;i<arr.length;i++){
    heading2.innerHTML="";
    for(let j=0;j<arr[i].length;j++){
        heading2.innerHTML=heading2.innerHTML+arr[i][j];
       await delay(100);
        // console.log(heading2.innerHTML)
    }
    await delay(500);
    for(let j=heading2.innerHTML.length-1;j>=0;j--){
        heading2.innerHTML=heading2.innerHTML.substring(0,j);
        await delay(100);
    }
}
myFun();
}
function delay(t) {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, t);
    });
}
window.addEventListener('load',function(){
   
    myFun();

    document.addEventListener("scroll",function(){
        let property=(showCase.getBoundingClientRect());
        // console.log(property);
        if(property.bottom<=0){
            navBar.classList.add('fixed');
        }
        else{
            navBar.classList.remove('fixed')
        }
    })
})
// setInterval(myFun,4000);