'use strict';

const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

breedOption(breedArr);
renderTableData(petArr);

findBtn.addEventListener("click", function(){

    let petArrSearch=petArr;

    if (idInput.value){
        petArrSearch = petArrSearch.filter(pet=>pet.id.includes(idInput.value));
    }
    if (nameInput.value){
        petArrSearch = petArrSearch.filter(pet=>pet.name.includes(nameInput.value));
    }
    if (typeInput.value !=="Select Type"){
        petArrSearch = petArrSearch.filter(pet=>pet.type==typeInput.value);
    }
    if (breedInput.value !=="Select Breed"){
        petArrSearch = petArrSearch.filter(pet=>pet.breed==breedInput.value);
    }
    if (vaccinatedInput.checked=== true){
        petArrSearch = petArrSearch.filter(pet=>pet.vaccinated===true);
    }
    if (dewormedInput.checked=== true){
        petArrSearch = petArrSearch.filter(pet=>pet.dewormed===true);
    }
    if (sterilizedInput.checked=== true){
        petArrSearch = petArrSearch.filter(pet=>pet.sterilized===true);
    }
    renderTableData(petArrSearch);
})

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
        <td>${new Date(petArr[i].date).getDate()}/${new Date(petArr[i].date).getMonth() + 1}/${new Date(petArr[i].date).getFullYear()}</td>`;
      //onclick deletePet mean do function deletePet when click btn delete 
      tableBodyEl.appendChild(row);
    }
  }
  function breedOption(breedArr){
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < breedArr.length; i++){   
        const optionBreed = document.createElement("option");
        optionBreed.innerHTML = `${breedArr[i].breed}`
        breedInput.appendChild(optionBreed);
    }
  }