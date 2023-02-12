console.log("script running");


const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

//main interaction variables
const queryField = document.querySelector(".input")
const submitButton = document.querySelector("#button1")
const recipeHolder = document.querySelector(".recipeHolder")
const buttons = document.querySelector(".buttons")



let recipeCounter = 0;
// object to track seen IDs
let seenID = {};




submitButton.addEventListener("click", async (e) => {
  console.log("button working")
  const myKey = "9297cf4d365745af807c02dd9caa1a80"
  const topic = queryField.value
  const myQuery = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${topic}&apiKey=${myKey}&ranking=1`
  console.log(myQuery)



  const response = await fetch(myQuery);
  console.log(response)
  let result = await response.json()
  console.log(result)


  let i = 0;
  let ID = "";

  // strategy:
  // repeatedly generate a random number between 0 and 9
  //   for each number, fetch the ID and check if we've seen it before
  //   if not, loop to top and generate new number
  //   if so (if unique), stop and use that ID
  // if we repeat 10 times, give up and just use the most recent ID

  for (let j = 0; j < 100; j++) {
    i = getRandomInt(10);
    // fetch ID
    ID = result[i]["id"];
    // check if that ID has been seen before
    console.log(seenID);
    if (!(ID in seenID)) {
      console.log(`New ID found ${ID}`)
      // if ID has not been seen before:
      // register that ID
      seenID[ID] = true;
      // and end the loop
      break;
    }
    // if ID has been seen before, repeat
  }

  //create a for loop using IDs

  // let missingCount = result[i]["missedIngredientCount"]
  // if(missingCount>=3){
  //   //let j =getRandomInt()
  //   console.log("no recipe found")
  //   let missed= result[i]["missedIngredients"]
  //   console.log(missed)
  //   for (let i=0; i<missed.length; i++){
  //     let newInput= missed[i]["name"]
  //   buttons.innerHTML= `<button class='button' id= 'button'> ${newInput}</button>`+buttons.innerHTML

  //   }
  // //const button= document.querySelectorAll("#button")

  //   buttons.addEventListener("click", (e) => {
  //     missingCount--
  //     console.log("ready!")
  //   })
  //   //add event listener for newInput buttons
  //   //every time button is pressed
  //     //button should turn green and be disabled
  //     //missingCount--
  // }


  //if (missingCount<3){
  let title = result[i]["title"]
  const myQuery2 = `https://api.spoonacular.com/recipes/${ID}/information?includeNutrition=false&apiKey=${myKey}`

  const myQuery3 = `https://api.spoonacular.com/recipes/${ID}/nutritionWidget.json?apiKey=${myKey}`

  const proteinInformation = await fetch(myQuery3)
  console.log(proteinInformation)
  let proteinInformationResult = await proteinInformation.json();
  console.log(proteinInformationResult)
  let protein = proteinInformationResult.protein
  console.log(protein)

 const myQuery4 = `https://api.spoonacular.com/recipes/${ID}/nutritionWidget.json?apiKey=${myKey}`

  const caloriesInformation = await fetch(myQuery4)
  console.log(caloriesInformation)
  let caloriesInformationResult = await caloriesInformation.json();
  console.log(caloriesInformationResult)
  let calories = caloriesInformationResult.calories
  console.log(calories)

const myQuery5 = `https://api.spoonacular.com/recipes/${ID}/nutritionWidget.json?apiKey=${myKey}`

  const carbsInformation = await fetch(myQuery5)
  console.log(carbsInformation)
  let carbsInformationResult = await carbsInformation.json();
  console.log(carbsInformationResult)
  let carbs = carbsInformationResult.carbs
  console.log(carbs)

const myQuery6 = `https://api.spoonacular.com/recipes/${ID}/nutritionWidget.json?apiKey=${myKey}`

  const fatInformation = await fetch(myQuery6)
  console.log(fatInformation)
  let fatInformationResult = await fatInformation.json();
  console.log(fatInformationResult)
  let fat = fatInformationResult.fat
  console.log(fat)

  
  

  const recipePage = await fetch(myQuery2)
  console.log(recipePage)
  let recipePageResult = await recipePage.json()
  console.log(recipePageResult)
  let link = recipePageResult["sourceUrl"]
  let instructions = recipePageResult["instructions"]
  console.log(link)
  console.log(instructions)



  console.log(title)

  let missing = result[i]["missedIngredients"]
  console.log(missing)


  let missingIngredientString = ""
  for (let i = 0; i < missing.length; i++) {
    let newInput = missing[i]["name"]
    missingIngredientString = newInput + ", " + missingIngredientString

  }

//This is for the popup of the generated modal
const ViewInfo = document.querySelector(".nutritionUnderline")
const GeneratedModal = document.querySelector(".modal-background10")
const modal10 = document.querySelector(".modal10")

  


  
  console.log(missingIngredientString)

  let myImage = result[i]["image"]
  // when counter == 0, add a new row
  // then add a new card to most recent row
  if (recipeCounter == 0) {
    // add new row
    recipeHolder.innerHTML = "<div class='columns generatedRow'></div>" + recipeHolder.innerHTML;
  }
  // add card content
  const cardHtml = "<div class='column is-one-third'><div class='card generatedCard'><div class='card-content'> <p class='title1'>" + title + "</p></br>" + " <div class='content'><a href='" + link + "'><img class='roundImage' src='" + myImage + "'></a><h3 class='nutInf'>Nutrition Information:<h3> <div class='tags are-medium'><span class='tag'>Calories " + calories +"</span><span class='tag'>Protein " + protein + "</span><span class='tag'>Carbs " + carbs + "</span><span class='tag'>Fat " + fat + "</span></div><h3 class='nutInf'>Missing Ingredients:</h3> <span class='tag is-danger'>" + missingIngredientString + "</span></p></div> </div> </div> </div></div>";
  const cardRow = document.querySelector(".generatedRow")
  // add content to the left of the row
  cardRow.innerHTML = cardRow.innerHTML + cardHtml

  // <div class="recipeHolder">
  //   <div class="columns generatedRow">
  //       <div class="content"></div>
  //   </div>
  //   <div class="columns generateRow">    <-- row
  //       <div class="content"></div>  <-- card
  //       <div class="content"></div>
  //       <div class="content"></div>
  //   </div>
  // </div>

  console.log(`Number of recipes in current row: ${recipeCounter}`)
  recipeCounter++;
  if (recipeCounter == 3) {
    recipeCounter = 0;
  }




  // recipeHolder.innerHTML = "<div class='columns'><div class='column is-one-third'><div class='card'><div class='card-content'> <p class='title1'>" + title + "</p></br>" + " <div class='content'><a href='" + link + "'><img src='" + myImage + "'></a><h3>Instructions:</h3> <p>" + instructions + "</p><p>" + missingIngredientString + "</p></div> </div> </div> </div> </div> " + recipeHolder.innerHTML
  //} 


});




//This is for Breakfast, Lunch and Dinner
const buttonOne = document.querySelector(".breakfast")
const buttonTwo = document.querySelector(".lunch")
const buttonThree = document.querySelector(".dinner")
const rowOne = document.querySelector(".row1")
const rowTwo = document.querySelector(".row2")
const rowThree = document.querySelector(".row3")


buttonOne.addEventListener("click", (e) => {
  rowOne.classList.remove("hidden");
  rowTwo.classList.add("hidden");
  rowThree.classList.add("hidden");
  console.log("success #1")
});

buttonTwo.addEventListener("click", (e) => {
  rowOne.classList.add("hidden");
  rowTwo.classList.remove("hidden");
  rowThree.classList.add("hidden");
  console.log("success #1")
});

buttonThree.addEventListener("click", (e) => {
  rowOne.classList.add("hidden");
  rowTwo.classList.add("hidden");
  rowThree.classList.remove("hidden");
  console.log("success #2")
});

//JS for modals

const firstImage = document.querySelector(".image1")
const modalBg = document.querySelector(".modal-background")
const modal1 = document.querySelector(".modal")

firstImage.addEventListener("click", () => {
  modal1.classList.add("is-active")
});

modalBg.addEventListener("click", () => {
  modal1.classList.remove("is-active")
});

//Modal 2

const SecondImage = document.querySelector(".image2")
const modalBg2 = document.querySelector(".mb2")
const modal2 = document.querySelector(".m2")

SecondImage.addEventListener("click", () => {
  modal2.classList.add("is-active")
});

modalBg2.addEventListener("click", () => {
  modal2.classList.remove("is-active")
});

//Modal 3

const ThirdImage = document.querySelector(".image3")
const modalBg3 = document.querySelector(".mb3")
const modal3 = document.querySelector(".m3")

ThirdImage.addEventListener("click", () => {
  modal3.classList.add("is-active")
});

modalBg3.addEventListener("click", () => {
  modal3.classList.remove("is-active")
});

//Modal 4

const FourthImage = document.querySelector(".image4")
const modalBg4 = document.querySelector(".mb4")
const modal4 = document.querySelector(".m4")

FourthImage.addEventListener("click", () => {
  modal4.classList.add("is-active")
});

modalBg4.addEventListener("click", () => {
  modal4.classList.remove("is-active")
});

//Modal 5

const FifthImage = document.querySelector(".image5")
const modalBg5 = document.querySelector(".mb5")
const modal5 = document.querySelector(".m5")

FifthImage.addEventListener("click", () => {
  modal5.classList.add("is-active")
});

modalBg5.addEventListener("click", () => {
  modal5.classList.remove("is-active")
});

//Modal 6

const SixthImage = document.querySelector(".image6")
const modalBg6 = document.querySelector(".mb6")
const modal6 = document.querySelector(".m6")

SixthImage.addEventListener("click", () => {
  modal6.classList.add("is-active")
});

modalBg6.addEventListener("click", () => {
  modal6.classList.remove("is-active")
});

//Modal 7

const SeventhImage = document.querySelector(".image7")
const modalBg7 = document.querySelector(".mb7")
const modal7 = document.querySelector(".m7")

SeventhImage.addEventListener("click", () => {
  modal7.classList.add("is-active")
});

modalBg7.addEventListener("click", () => {
  modal7.classList.remove("is-active")
});

//Modal 8

const EighthImage = document.querySelector(".image8")
const modalBg8 = document.querySelector(".mb8")
const modal8 = document.querySelector(".m8")

EighthImage.addEventListener("click", () => {
  modal8.classList.add("is-active")
});

modalBg8.addEventListener("click", () => {
  modal8.classList.remove("is-active")
});

//Modal 9

const NinthImage = document.querySelector(".image9")
const modalBg9 = document.querySelector(".mb9")
const modal9 = document.querySelector(".m9")

NinthImage.addEventListener("click", () => {
  modal9.classList.add("is-active")
});

modalBg9.addEventListener("click", () => {
  modal9.classList.remove("is-active")
});


const button = document.querySelector(".button");
const icon = document.querySelector(".button > i");
const audio = document.querySelector("audio");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.5;
    audio.play();
    icon.classList.remove('fa-volume-up');
    icon.classList.add('fa-volume-mute');
    
  } else {
    audio.pause();
    icon.classList.remove('fa-volume-mute');
    icon.classList.add('fa-volume-up');
  }
  button.classList.add("fade");
});