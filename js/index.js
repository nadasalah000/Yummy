// ~ HTML Elements
let search = document.getElementById("search");
let Categories = document.getElementById("Categories");
let Area = document.getElementById("Area");
let Ingredients = document.getElementById("Ingredients");
let Contacts = document.getElementById("Contacts");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("passwordInput");
let repasswordInput = document.getElementById("repasswordInput");
let submitBtn = document.getElementById("submitBtn");
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let Alert1 = document.getElementById("Alert1");
let Alert2 = document.getElementById("Alert2");
let Alert3 = document.getElementById("Alert3");
let Alert4 = document.getElementById("Alert4");
let Alert5 = document.getElementById("Alert5");
let Alert6 = document.getElementById("Alert6");

// ~ App variables
let nameRejex =/[a-zA-Z]{2,}/;
let emailRejex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let phoneRejex =/^[0-9\-\+]{9,15}$/;
let ageRejex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
let passRejex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

// ~ Functions
   // ^ nav
$(document).ready(function(){
    searchByName("").then(function(){
        $(".loading-screen").fadeOut(1000)
    })
})

function openSideNav() {
    $(".side-nav").animate({
        left: 0
    }, 500)
    $(".fa-bars").addClass('fa-xmark').removeClass('fa-bars');
}

function closeSideNav() {
    $(".side-nav").animate({
        left:-240
    }, 500)
    $(".fa-xmark").addClass('fa-bars').removeClass('fa-xmark');
}

$("#icon").click(function(){
    let lefty = $(".side-nav").css("left");
    if (lefty === `0px`) {
        closeSideNav()
    } else {
        openSideNav()
    }
})
 
    // ^ search
// searchByName("")
function DisplaySearchInputs() {
    closeSideNav();
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML="";
    rowData.innerHTML = "";
    search.classList.replace("d-none","d-block");
}

async function searchByName(term) {
    closeSideNav()
    search.classList.replace("d-block","d-none");
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML="";
    rowData.innerHTML = "";
    $(".loading").removeClass("d-none").addClass("d-flex");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    response = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none");
    console.log(response);
    displayMeals(response.meals)
}

async function searchByFirstLetter(term) {
    search.classList.replace("d-block","d-none");
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML="";
    rowData.innerHTML = "";
    $(".loading").removeClass("d-none").addClass("d-flex");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    response = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none");
    console.log(response);
    displayMeals(response.meals);
}

function displayMeals(arr) {
    let count=0;
    let cartoona = "";
    for (let i = 0; i < arr.length&& count<20; i++,count++) {
        cartoona += `<div class="col-md-3">
                <div onclick="getDetails('${arr[i].idMeal}')" class="meal cursor-pointer rounded-3 position-relative overflow-hidden">
                    <img class="w-100" src="${arr[i].strMealThumb}"alt="${arr[i].strMeal}">
                    <div class="meal-layer position-absolute p-3 d-flex align-items-center justify-content-center text-dark">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>`
    }
    rowData.innerHTML = cartoona;
}

async function getDetails(ID) {
    closeSideNav()
    search.classList.replace("d-block","d-none");
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML = "";
    rowData.innerHTML = "";
    $(".loaded").removeClass("d-none").addClass("d-flex")
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    respone = await respone.json();
    $(".loaded").removeClass("d-flex").addClass("d-none")
    displayDetails(respone.meals[0]);
}

function displayDetails(meal) {
    console.log(meal)

    let ingred = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingred += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let cartoona = `<div class="col-md-4">
                <img class="w-100 rounded-3 cursor-pointer" src="${meal.strMealThumb}"
                    alt="${meal.strMeal}">
                    <h2 class="f-c m-auto">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <div class="row">
                  <div class="col-md-3"><h3>Recipes :</h3></div>
                  <div class="col md-9">
                   <ul class="list d-flex g-3 flex-wrap">${ingred}</ul>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-2"><h3 class="mb-3">Tags :</h3></div>
                  <div class="col md-10"></div>
                </div>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`
    rowData.innerHTML = cartoona
}

    // ^ Category
async function getCategories() {
    closeSideNav()
    search.classList.replace("d-block","d-none");
    Categories.innerHTML=""
    Area.innerHTML=""
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML = "";
    rowData.innerHTML = "";
    $(".loading").removeClass("d-none").addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none")
    console.log(response.categories);
    displayCategories(response.categories);
}

function displayCategories(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3">
                <div onclick="getCategory('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-3 cursor-pointer">
                    <img class="w-100 rounded-2" src="${arr[i].strCategoryThumb}">
                    <div class="meal-layer position-absolute text-center text-dark px-2 pt-1">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,12).join(" ")}</p>
                    </div>
                </div>
        </div>`
    }
    Categories.innerHTML= cartoona;
}

async function getCategory(category) {
    search.classList.replace("d-block","d-none");
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    searchContainer.innerHTML="";
    rowData.innerHTML = "";
    Contacts.classList.replace("d-block","d-none");
    $(".loading").removeClass("d-none").addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none")
    console.log(response.meals);
    displayMeals(response.meals);
}

    //  ^ area
async function getAreas() {
    closeSideNav();
    search.classList.replace("d-block","d-none");
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML = "";
    rowData.innerHTML = "";
    $(".loading").removeClass("d-none").addClass("d-flex")
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json();
    $(".loading").removeClass("d-flex").addClass("d-none")
    console.log(respone.meals);
    displayAreas(respone.meals)
}

function displayAreas(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 iiicon">
                <div onclick="getAreaM('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer py-3">
                        <i class="fa-solid fa-house-laptop fa-2xl"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>`
    }
    Area.innerHTML = cartoona
}

async function getAreaM(area) {
    search.classList.replace("d-block","d-none");
    Categories.innerHTML=""
    Area.innerHTML=""
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML="";
    rowData.innerHTML = "";
    $(".loading").removeClass("d-none").addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none")
    console.log(response.meals)
    displayMeals(response.meals)
}

    // ^ Ingredient
async function getIngredients() {
    closeSideNav()
    search.classList.replace("d-block","d-none");
    Area.innerHTML="";
    Categories.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML = "";
    rowData.innerHTML = "";
    $(".loading").removeClass("d-none").addClass("d-flex")
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    respone = await respone.json();
    $(".loading").removeClass("d-flex").addClass("d-none")
    console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
}

function displayIngredients(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `<div class="col-md-3 iiicon">
                <div onclick="getIngredientM('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer py-3">
                        <i class="fa-solid fa-drumstick-bite fa-2xl"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
                </div>
        </div>`
    }
    Ingredients.innerHTML = cartoona;
}

async function getIngredientM(Ingredient) {
    search.classList.replace("d-block","d-none");
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-block","d-none");
    searchContainer.innerHTML="";
    rowData.innerHTML = "";
    $(".loading").removeClass("d-none").addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`);
    response = await response.json();
    $(".loading").removeClass("d-flex").addClass("d-none")
    displayMeals(response.meals);
}

    //  ^ contact
function DisplayContacts() {
    closeSideNav();
    search.classList.replace("d-block","d-none");
    Categories.innerHTML="";
    Area.innerHTML="";
    Ingredients.innerHTML="";
    Contacts.classList.replace("d-none","d-block");
    searchContainer.innerHTML="";
    rowData.innerHTML="";
}

function nameValidation() {
    if (nameRejex.test(nameInput.value)) {
        Alert1.classList.replace("d-block", "d-none")
        return true
    } else {
        Alert1.classList.replace("d-none", "d-block")
        return false
    }
}

function emailValidation() {
    if (emailRejex.test(emailInput.value)) {
        Alert2.classList.replace("d-block", "d-none");
        return true
    } else {
        Alert2.classList.replace("d-none", "d-block");
        return false
    }
}

function phoneValidation() {
    if (phoneRejex.test(phoneInput.value)) {
        Alert3.classList.replace("d-block", "d-none")
        return true
    } else {
        Alert3.classList.replace("d-none", "d-block")
        return false
    }
}

function ageValidation() {
    if (ageRejex.test(ageInput.value)) {
        Alert4.classList.replace("d-block", "d-none")
        return true
    } else {
        Alert4.classList.replace("d-none", "d-block")
        return false
    }
}

function passwordValidation() {
    if (passRejex.test(passwordInput.value)) {
        Alert5.classList.replace("d-block", "d-none")
        return true
    } else {
        Alert5.classList.replace("d-none", "d-block")
        return false
    }
}

function repasswordValidation() {
    if (repasswordInput.value == passwordInput.value) {
        Alert6.classList.replace("d-block", "d-none")
        return true
    } else {
        Alert6.classList.replace("d-none", "d-block")
        return false
    }
}

function inputsValidation() {
    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
        submitBtn.classList.add("cursor-pointer")
        console.log("done")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}
