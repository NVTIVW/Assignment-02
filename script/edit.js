'use strict';
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
const form = document.getElementById("container-form")
renderTableData(petArr);
let idPetEdit;


typeInput.addEventListener("change", function(){
  breedSelection(breedArr);
});




submitBtn.addEventListener("click", function () {
    const infoPet = {};
    
    // Get info from form
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
    // validata
    const validate = validateData(infoPet);
    
    // add info to  table
    if (validate) {
        for (let i=0; i< petArr.length;i++){
            if (idPetEdit == petArr[i].id){
                petArr[i].name = nameInput.value;
                petArr[i].age = parseInt(ageInput.value);
                petArr[i].type = typeInput.value;
                petArr[i].weight = parseFloat(weightInput.value);
                petArr[i].length = parseFloat(lengthInput.value);
                petArr[i].color = colorInput.value;
                petArr[i].breed = breedInput.value;
                petArr[i].vaccinated = vaccinatedInput.checked;
                petArr[i].dewormed = dewormedInput.checked;
                petArr[i].sterilized = sterilizedInput.checked;
            }
        }
        form.classList.add("hide");
        renderTableData(petArr);
      };
    saveToStorage("petArrStorage",petArr);
  });

  function validateData(infoPet) {
    let validate = true;
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
    return validate;
  }

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
      <button class="btn btn-danger" onclick="editPet('${
      petArr[i].id
    }')">Edit</button>
    </td>`; 
      //onclick deletePet mean do function deletePet when click btn delete 
      tableBodyEl.appendChild(row);
    }
  }
function editPet(petID){
    form.classList.remove("hide");
    for (let i =0;i<petArr.length;i++){
        if (petID == petArr[i].id){
            idPetEdit = petID;
            idInput.value = petArr[i].id;
            nameInput.value =petArr[i].name ;
            ageInput.value = petArr[i].age;
            weightInput.value = petArr[i].weight;
            lengthInput.value = petArr[i].length;
            typeInput.value = petArr[i].type;
            breedInput.value = petArr[i].breed;
            vaccinatedInput.checked = petArr[i].vaccinated;
            dewormedInput.checked = petArr[i].dewormed;
            sterilizedInput.checked = petArr[i].sterilized;
            colorInput.value = petArr[i].color;
        }
    }
    breedSelection(breedArr);
}

