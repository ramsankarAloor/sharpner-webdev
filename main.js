let form = document.getElementById("my-form");

form.addEventListener("submit", doThis);

function addMember(memberObj) {
  let toBePrinted =
    memberObj.name + " - " + memberObj.email + " - " + memberObj.phone;

  let textInside = document.createTextNode(toBePrinted);
  let deleteBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  editBtn.textContent = "Edit";
  deleteBtn.className = "btnDelete";
  editBtn.className = "btnDelete";
  let li = document.createElement("li");
  li.appendChild(textInside);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  let ul = document.getElementById("items");

  ul.appendChild(li);

  deleteBtn.addEventListener("click", deleteEle);

  function deleteEle(e) {
    let liCurrent = e.target.parentElement;
    let ul = document.getElementById("items");
    ul.removeChild(liCurrent);
    axios.delete(`https://crudcrud.com/api/3c0a338408744ded89f9e06f14ba0193/appointmentData/${memberObj._id}`)
    .catch((err)=>{
      console.log(err)
    })
  }
  // editBtn.addEventListener("click", editEle);
}

axios.get("https://crudcrud.com/api/3c0a338408744ded89f9e06f14ba0193/appointmentData")
.then(res=>{
  for(let i=0; i<res.data.length; i++){
    addMember(res.data[i])
  }
}).catch(err=>console.log(err))

function doThis(e) {
  e.preventDefault();
  let username = document.getElementById("name").value;
  let emailId = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;

  let obj = {
    name: username,
    email: emailId,
    phone: phone,
  };

  axios.post("https://crudcrud.com/api/3c0a338408744ded89f9e06f14ba0193/appointmentData", obj)
  .then((res)=>{
    console.log(res)
    addMember(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })

  // localStorage.setItem(emailId, myObj_serialised)

  

  function editEle(e) {
    let liCurrent = e.target.parentElement;
    let ul = document.getElementById("items");
    localStorage.removeItem(emailId);
    ul.removeChild(liCurrent);

    document.getElementById("name").value = username;
    document.getElementById("email").value = emailId;
    document.getElementById("phone").value = phone;
  }

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}
