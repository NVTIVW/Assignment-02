'use strict';

// khai báo biến
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const healthyBtn = document.getElementById("healthy-btn");
const tableBodyEl = document.getElementById("tbody");
//const petArr = [];


renderTableData(petArr);

typeInput.addEventListener("change", function(){
  breedSelection(breedArr);
});


// Enter submit button
submitBtn.addEventListener("click", function () {
  const infoPet = {};
  
  // Get info from form
  infoPet.id = idInput.value;
  infoPet.name = nameInput.value;
  infoPet.age = parseInt(ageInput.value);
  infoPet.type = typeInput.value;
  infoPet.weight = parseFloat(weightInput.value);
  infoPet.length = parseFloat(lengthInput.value);
  infoPet.color = colorInput.value;
  infoPet.breed = breedInput.value;
  infoPet.vaccinated = vaccinatedInput.checked;
  infoPet.dewormed = dewormedInput.checked;
  infoPet.sterilized = sterilizedInput.checked;
  infoPet.date = new Date();

  // validata
  const validate = validateData(infoPet);
  
  // add info to  table
  if (validate) {
      petArr.push(infoPet);
      clearInput();
      healthyBtn.textContent = "Show Healthy Pet";
      healthyCheck = false;
      renderTableData(petArr);
    };
  saveToStorage("petArrStorage",petArr);
});

// check healthy pet
let healthyCheck = false;
healthyBtn.addEventListener("click", function () {
    //check healthy or all
    const healthypetArr = []; // array contain list healthy pet
    // change buton Show all pet or Show healthy pet
    if (healthyCheck) {
        healthyBtn.textContent = "Show Healthy Pet";
        healthyCheck = false;
        renderTableData(petArr);
    } else {
        healthyBtn.textContent = "Show All Pet";
        healthyCheck = true;
        // find list healthy pets
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthypetArr.push(petArr[i]);
      }
    }
    renderTableData(healthypetArr);
  }
});

//check correct info
function validateData(infoPet) {
  let validate = true;
  //check id
  if (infoPet.id.trim() == "") {
    alert("Please input for ID");
    validate = false;
  }
  //check name
  if (infoPet.name.trim() == "") {
    alert("Please input for Name");
    validate = false;
  }
  //check age
  if (isNaN(infoPet.age) && !(infoPet.age >= 1 && infoPet.age <= 15)) {
    alert("Age must be between 1 and 15!");
    validate = false;
  }
  //check weight
  if (isNaN(infoPet.weight) && !(infoPet.weight >= 1 && infoPet.weight <= 15)) {
    alert("Weight must be between 1 and 15!");
    validate = false;
  }
  //check length
  if (
    isNaN(infoPet.length) &&
    !(infoPet.length >= 1 && infoPet.length <= 100)
  ) {
    alert("Length must be between 1 and 100!");
    validate = false;
  }
  //check type
  if (infoPet.type === "Select Type") {
    alert("Please select Type!");
    validate = false;
  }
  //check breed
  if (infoPet.breed === "Select Breed") {
    alert("Please select Breed!");
    validate = false;
  }
  //check duplicate id
  for (let i = 0; i < petArr.length; i++) {
    if (infoPet.id === petArr[i].id) {
      alert("Please enter correct ID");
      validate = false;
    }
  }
  return validate;
}

// render table
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; //clear table
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr"); //create 'tr'
    row.innerHTML = `<th scope = 'row'>${petArr[i].id}</th>
      <td>${petArr[i].name}</td>
      <td>${petArr[i].age}</td>
      <td>${petArr[i].type}</td>
      <td>${petArr[i].weight} kg</td>
      <td>${petArr[i].length} cm</td>
      <td>${petArr[i].breed}</td>
      <td>
			  <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
			</td>
      <td><i class="bi ${
        petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td>${new Date(petArr[i].date).getDate()}/${new Date(petArr[i].date).getMonth() + 1}/${new Date(petArr[i].date).getFullYear()}</td>
      <td>
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
  </td>`;
    //onclick deletePet mean do function deletePet when click btn delete 
    tableBodyEl.appendChild(row);
  }
}

// clear form input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  colorInput.value = "#000000";
}

//delete pets (buton delete)
function deletePet(petID) {
  const isDel = confirm("Are you sure ?");
  if (isDel) {
    for (let i = 0; i < petArr.length; i++) {
      if (petID === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArrStorage", petArr);
        renderTableData(petArr);
      }
    }
  }
}
