let changeProfile = document.querySelector("#profile-picc");

// console.log(changeProfile);
changeProfile.addEventListener("change",async function(e){
    e.preventDefault();
    let file = changeProfile.files[0];
    console.log(file);
    let formData = new FormData();
    formData.append("user" , file);
    let obj = await axios.patch("http://localhost:3000/api/user/updateprofilepage" , formData);
    console.log(obj);
    if(obj.data.message){
        window.location.reload();
    }
})