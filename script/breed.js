'use strict';

// khai báo biến

const submitBtn = document.getElementById("submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

//console.log(breedArr);

renderTableData(breedArr);

// Enter submit button

submitBtn.addEventListener("click", function () {
  const infoBreed = {};
  
  // Get info from form
  infoBreed.breed = breedInput.value;
  infoBreed.type = typeInput.value;

  // validata
  const validate = validateData(infoBreed);
  
  // add info to  table
  if (validate) {
      breedArr.push(infoBreed);
      clearInput();
      renderTableData(breedArr);
    };
    saveToStorage("breedArrStorage", breedArr);
});

//check correct info
function validateData(infoBreed) {
  let validate = true;

  //check id
  if (infoBreed.breed.trim() == "") {
    alert("Please input for Breed");
    validate = false;
  }

  //check type
  if (infoBreed.type === "Select Type") {
    alert("Please select Type!");
    validate = false;
  }

  //check duplicate breed
  for (let i = 0; i < breedArr.length; i++) {
    if (infoBreed.breed === breedArr[i].breed) {
      alert("This breed already exists!");
      validate = false;
    }
  }
  return validate;
}

// render table
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; //clear table
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr"); //create 'tr'
    row.innerHTML = `<th scope = 'row'>${i+1}</th>
      <td>${breedArr[i].breed}</td>
      <td>${breedArr[i].type}</td>
      <td>
	<button class="btn btn-danger" onclick="deleteBreed('${
    breedArr[i].breed
  }')">Delete</button>
  </td>`;
    //onclick deletePet mean do function deletePet when click btn delete
    tableBodyEl.appendChild(row);
  }
}

// clear form input
function clearInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

//delete pets (buton delete)
function deleteBreed(breed) {
  const isDel = confirm("Are you sure ?");
  if (isDel) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        breedArr.splice(i, 1);
        saveToStorage("breedArrStorage", breedArr);
        renderTableData(breedArr);
      }
    }
  }
}
