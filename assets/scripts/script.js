"use strict";

// sample data - expanded Star Wars characters with varied ages
const characters = [
    { id: 1, name: "Luke Skywalker", age: 23 },
    { id: 2, name: "Darth Vader", age: 45 },
    { id: 3, name: "Princess Leia", age: 23 },
    { id: 4, name: "Obi-Wan Kenobi", age: 57 },
    { id: 5, name: "Yoda", age: 900 },
    { id: 6, name: "Han Solo", age: 32 },
    { id: 7, name: "Chewbacca", age: 234 },
    { id: 8, name: "R2-D2", age: 33 },
    { id: 9, name: "C-3PO", age: 112 },
    { id: 10, name: "Padmé Amidala", age: 27 },
];

// broken test data for exercise 6

// 1. Iterate through the characters array and output each character's name to the console using console.log(). Then, dynamically create <li> elements for each character name and append them to the HTML unordered list element with the id "names-list".

const ul1 = document.getElementById("names-list");
console.log("Result 1:")

for (let i = 0; i < characters.length; i++) {
  console.log(characters[i].name);

  const li = document.createElement("li");
  li.textContent = characters[i].name;
  ul1.appendChild(li);
}


// 2. Filter the characters array to find only those characters whose age property is less than 40. Log each filtered character's name to the console. Then, dynamically create <li> elements for each filtered character and append them to the HTML unordered list element with the id "young-characters-list".

const ul2 = document.getElementById("young-characters-list");
const emptyList = document.querySelector(".empty-list");
emptyList.textContent = "";
let hasOutputList = false;
const threshold = 40;
const resultMsg = document.getElementById("filter-age-result-ex-2");
resultMsg.textContent = "All the Characters under age = " + threshold;
console.log("Result 2:")
console.log("All the Characters under age = " + threshold)

for(let i =0; i < characters.length; i++) {
  if(characters[i].age < threshold) {
    console.log(characters[i].name);

    const li = document.createElement("li");
    li.textContent = characters[i].name;
    ul2.appendChild(li);
    hasOutputList = true;
  }
}
if (!hasOutputList) {
  emptyList.textContent = "No characters found of age less than " + threshold;
  console.error("No characters found of age less than " + threshold);
}

// 3. Build a reusable function that accepts an array of character objects as a parameter. Inside the function, iterate through the array and extract each character's name property. Dynamically generate <li> elements for each name and append them to a target HTML list element. Call this function with the characters array and render the results in the unordered list with id "function-list".

const ul3 = document.getElementById("function-list");
console.log("Result 3:")

function displayCharacterName(c) {
  ul3.textContent = "";

  for(let i =0; i < c.length; i++) {
    console.log(c[i].name);
    const li = document.createElement("li");
    li.textContent = c[i].name;
    ul3.appendChild(li)
  }
}

displayCharacterName(characters);

// 4. Write a function that accepts two parameters: an array of character objects and a numeric age threshold. Inside the function, filter the array to include only characters whose age is below the threshold value. For each filtered character, create an <li> element with their name and append it to the target list. Call this function and render the results in the unordered list with id "age-filter-list".

const ul4 = document.getElementById("age-filter-list");
const emptyList4 = ul4.parentElement.querySelector(".empty-list");
console.log("Result 4:")

function characterNameByThreshold(c, threshold) {
  console.log("All the Characters under age = " + threshold);
  const resultMsg = document.getElementById("filter-age-result-ex-4");
  resultMsg.textContent = "All the Characters under age = " + threshold;
  ul4.textContent = "";
  emptyList4.textContent = "";
  let hasOutputList4 = false;

  for(let i =0; i < c.length; i++) {
    if(c[i].age < threshold){
      console.log(c[i].name);
      const li = document.createElement("li");
      li.textContent = c[i].name;
      ul4.appendChild(li)
      hasOutputList4 = true;
    }
  } 
  if (!hasOutputList4) {
    emptyList4.textContent = "No characters found of age less than " + threshold;
    console.error("No characters found of age less than " + threshold);
  }
}
characterNameByThreshold(characters, 60);

// 5. Enhance your rendering functions from exercises 3 and 4 with error handling logic. Before accessing the name property of each character object, check whether the "name" property exists. If a character object is missing the name property, use console.error() to log a descriptive error message to the console, and dynamically create and display the error message in the HTML div element with id "error-messages".
console.log("Result 5:")

function characterNamePropertyCheck(c, ulId, divId, threshold, resultMsgId) {
  console.log("All the Characters under age = " + threshold)
  const ul5 = document.getElementById(ulId);
  const resultMsg = document.getElementById(resultMsgId);
  resultMsg.textContent = "All the Characters under age = " + threshold;
  const errorDiv = document.getElementById(divId);
  const successMsg = errorDiv.parentElement.querySelector(".success")
  const emptyList5 = ul5.parentElement.querySelector(".empty-list");
  if (emptyList5) emptyList5.textContent = "";
  if (successMsg) {
   successMsg.style.display = "none";
   successMsg.textContent = "";
  }

  ul5.textContent = "";
  errorDiv.textContent = "";
  let hasOutputList5 = false;
  for (let i = 0; i < c.length; i++) {
    if (c[i].age < threshold) {
      try {
      if (!c[i].name) {
          throw new Error("name property missing");
      }

      console.log(c[i].name);

      const li = document.createElement("li");
      li.textContent = c[i].name;
      ul5.appendChild(li);
      hasOutputList5 = true;

      } catch (error) {
      const msg = "For id = " + c[i].id + ", name property does not exist";
      console.error(msg);

      const p = document.createElement("p");
      p.textContent = msg;
      errorDiv.appendChild(p);
      }
    }
  }

  if (!hasOutputList5) {
    if (emptyList5) emptyList5.textContent = "No characters found of age less than " + threshold;
    console.error("No characters found of age less than " + threshold);
  }
  if (hasOutputList5 && errorDiv.textContent === "" && successMsg) {
    successMsg.style.display = "inline-block";
    successMsg.textContent = "All characters have name property";
  }
}

characterNamePropertyCheck(characters, "error-handling-list", "error-messages", 1000, "filter-age-result-ex-5");

// 6. Create a second array called "brokenCharacters" that intentionally contains objects with missing name properties (e.g., objects with only id and age). Pass this broken array to your error-handling functions from exercise 5. Verify that your error handling correctly identifies the missing name properties, logs appropriate error messages to the console, and displays those error messages in the HTML div element with id "broken-array-errors".
console.log("Result 6:")

const brokenCharacters = [
    { id: 1, age: 23 },
    { id: 2, name: "Darth Vader", age: 45 },
    { id: 3, name: "Princess Leia", age: 23 },
    { id: 4, age: 57 },
    { id: 5, name: "Yoda", age: 900 },
    { id: 6, name: "Han Solo", age: 32 },
    { id: 7, name: "Chewbacca", age: 234 },
    { id: 8, age: 33 },
    { id: 9, name: "C-3PO", age: 112 },
    { id: 10, age: 27 },
];

characterNamePropertyCheck(brokenCharacters, "broken-array-list", "broken-array-errors", 1000, "filter-age-result-ex-6");