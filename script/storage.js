'use strict';
const navEL=document.getElementById('sidebar');
navEL.addEventListener('click',function(){
    this.classList.toggle('active');
})

const petArr = getFromStorage("petArrStorage")??[];
const breedArr = getFromStorage("breedArrStorage")??[];

console.log(breedArr);
console.log(petArr);

function saveToStorage(key, value){
    const jsonvalue = JSON.stringify(value);
    localStorage.setItem(key, jsonvalue);
}

function getFromStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

// // add selection breed
// function breedSelection(breedArr){
//     breedInput.innerHTML = `<option>Select Breed</option>`;
//     for (let i = 0; i < breedArr.length; i++){
//       if (typeInput.value == breedArr[i].type){
//         const optionBreed = document.createElement("option");
//         optionBreed.innerHTML = `${breedArr[i].breed}`
//         breedInput.appendChild(optionBreed);
//       }
//     }
//   }
// add selection breed
function breedSelection(breedArr){
  breedInput.innerHTML = `<option>Select Breed</option>`;
  let breedType = breedArr.filter(breed => breed.type == typeInput.value)
  console.log(breedType);
  for (let i = 0; i < breedType.length; i++){   
      const optionBreed = document.createElement("option");
      optionBreed.innerHTML = `${breedType[i].breed}`
      breedInput.appendChild(optionBreed);
  }
}