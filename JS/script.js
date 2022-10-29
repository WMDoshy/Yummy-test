// API

//   Main Page
let responedDATA = []
// let responedDATAs = []
let imageNumber
let searchResponeds = []
let SearchByFirst = document.getElementById("SearchByFirst")
let searchByName = document.getElementById("searchByName")
let searchName
let FirstLetter 
let FirstLetterExp = /^[a-zA-Z]{1}$/
let searchNameResponedData =[]
let CategoriesData = []
let categoryname
let CategoriesMealData
let areaData = []
let countriesData = []
let hamb
let responedDATA2 =[]
let IngredientData = []
let IngredientsmealsData = []
let nametest = /^[a-zA-z]{3,10}$/
let Name = document.getElementById("Name")
let gmailtest = /^[a-zA-Z]{3}@+[a-zA-Z]{3}.+[a-z]{3}$/
let Gmail = document.getElementById("Gmail")
let phonetest = /^[01]{1}[0-1-2-5]{1}[0-9]{9}$/
let Phone =document.getElementById("Phone")
// let countItems = ` `



// Function used more than one
function closeNavByItSelf(){
    $(".nav-bar2").animate({"left": -navbarWidth } , 500)
        $(".close").addClass("d-none");
        $(".bars").removeClass("d-none");
}

// 
async function getAPI(){
    let responed = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let responeds = await responed.json() 
    responedDATA = responeds
    displayMainPageMeals()
    // console.log(responedDATA);
}
getAPI()

$(document).ready(function () {
    $(".loading").fadeOut("slow", function() {
        $("#loading").addClass("d-none");
        $("body").css("overflow", "visible")
    });
});


function displayMainPageMeals(){
    let item = ``
    for (let i = 0; i < 20; i++) {
        item += `<div onclick="imageCkliked(${i})" class=" clickedImage px-3 col-md-3 gy-4">
        <div class=" item  position-relative">
        <img src=${responedDATA.meals[i].strMealThumb} class=" w-100 rounded " alt="">
        <div class=" layer rounded d-flex align-items-center">
        <h2 class="layer2 position-absolute">${responedDATA.meals[i].strMeal}</h2>
        </div>
        </div>
    </div>`
   
    }
    document.getElementById("row").innerHTML = item;
}
// onclick 3la el sora 
function imageCkliked(e) {
    $(".main").addClass("d-none");
    $(".mealDetails").removeClass("d-none");
    imageNumber= e;
    imgClickDetails();
    console.log(e);
}


// Clicked image detaills
function imgClickDetails(){
     let mealDetails = `<div class=" container pt-5 px-5">
    <div class=" row">
        <div class=" col-md-4">
            <img src=${responedDATA.meals[imageNumber].strMealThumb} class="w-100" alt="">
            <h1 class=" text-white">${responedDATA.meals[imageNumber].strMeal}</h1>
        </div>
        <div class="text-white col-md-8">
            <h2>Instructions</h2>
            <p>${responedDATA.meals[imageNumber].strInstructions}</p>
            <h5>Area : ${responedDATA.meals[imageNumber].strArea} </h5>
            <h5>Category : ${responedDATA.meals[imageNumber].strCategory} </h5>

            <h3>Recipes :</h3>
            <div>
                <ul class="nav nav-pills">
                    <li class="nav-item nav-link active m-md-1">
                    ${ responedDATA.meals[imageNumber].strMeasure1+ responedDATA.meals[imageNumber].strIngredient1}
                    </li>
                  </ul>
            </div>
            <h3>Tages :</h3>
            <div>
                <ul class="nav nav-pills">
                    <li class="nav-item nav-link active m-md-1">${responedDATA.meals[imageNumber].strTags}</li>
                </ul>
            </div>

            <div class=" pt-3">
                <div class="d-grid gap-2 d-md-block">
                    <button class=" Source btn " type="button"><a href=${responedDATA.meals[imageNumber].strSource} target="_blank">Source</a></button>
                    <button class="youtube btn " type="button"><a href=${responedDATA.meals[imageNumber].strYoutube} target="_blank">youtube</a></button>
                  </div>
            </div>
        </div>
    </div>
</div>` 
document.getElementById("mealDetails").innerHTML = mealDetails;
}

$(".item").click(function(event) {
    var text = $(event.target);
    console.log(text);
});
// NAVBAR
let navbarWidth = $(".moving-part").outerWidth(true)
$(".nav-bar2").css("left" , -navbarWidth)

$(".open").click(function () { 
    if ($(".nav-bar2").css("left" ) == "0px") {
        $(".nav-bar2").animate({"left": -navbarWidth } , 500)
        $(".close").addClass("d-none");
        $(".bars").removeClass("d-none");
        // $(".movingA").animate({"opacity" : 1}, 100)

    }
    else{
        $(".nav-bar2").animate({"left": "0px" } , 500)
        $(".close").removeClass("d-none");
        $(".bars").addClass("d-none");
        // $(".movingA").animate({"opacity" : 0}, 100)

    }
});

















// Start search page



// Search by one letter Page
async function getSearchData(letter){
    let searchResponed = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let searchRespone = await searchResponed.json()
    searchResponeds = searchRespone
    displaySearchFirstLetter()
    console.log(searchResponeds);
    console.log(searchResponeds.meals.length);
}

$(".search").click(function () { 
    $(".firstPage").addClass("d-none");
    $(".searchPage").removeClass("d-none");
    closeNavByItSelf()
});


$("#SearchByFirst").keyup(function () { 
    FirstLetter = SearchByFirst.value
    if (FirstLetterExp.test(FirstLetter) == true) {
        getSearchData(FirstLetter)
        console.log(" value is true");        
    }
});


function displaySearchFirstLetter() {
    let items = ``
    console.log(searchResponeds.length);
    for (let i = 0; i < searchResponeds.meals.length; i++) {
        items += `<div onclick="searchImageCkliked(${i})" class=" clickedImage px-3 col-md-3 gy-4">
        <div class=" item  position-relative">
        <img src=${searchResponeds.meals[i].strMealThumb} class=" w-100 rounded " alt="">
        <div class=" layer rounded d-flex align-items-center">
        <h2 class="layer2 position-absolute">${searchResponeds.meals[i].strMeal}</h2>
        </div>
        </div>
    </div>`
   
    }
    document.getElementById("Searchrow").innerHTML = items
}

function searchImageCkliked(e) {
    $(".searchPage").addClass("d-none");
    $("#SearchmealDetails").removeClass("d-none");
    imageNumber= e;
    SearchimgClickDetails()
    console.log(e);
    console.log(imageNumber);
}


function SearchimgClickDetails(){
    let mealDetails = `<div class=" container pt-5 px-5">
   <div class=" row">
       <div class=" col-md-4">
           <img src=${searchResponeds.meals[imageNumber].strMealThumb} class="w-100" alt="">
           <h1 class=" text-white">${searchResponeds.meals[imageNumber].strMeal}</h1>
       </div>
       <div class="text-white col-md-8">
           <h2>Instructions</h2>
           <p>${searchResponeds.meals[imageNumber].strInstructions}</p>
           <h5>Area : ${searchResponeds.meals[imageNumber].strArea} </h5>
           <h5>Category : ${searchResponeds.meals[imageNumber].strCategory} </h5>

           <h3>Recipes :</h3>
           <div>
               <ul class="nav nav-pills">
                   <li class="nav-item nav-link active m-md-1">
                   ${ searchResponeds.meals[imageNumber].strMeasure1+ searchResponeds.meals[imageNumber].strIngredient1}
                   </li>
                 </ul>
           </div>
           <h3>Tages :</h3>
           <div>
               <ul class="nav nav-pills">
                   <li class="nav-item nav-link active m-md-1">${searchResponeds.meals[imageNumber].strTags}</li>
               </ul>
           </div>

           <div class=" pt-3">
               <div class="d-grid gap-2 d-md-block">
                   <button class=" Source btn " type="button"><a href=${searchResponeds.meals[imageNumber].strSource} target="_blank">Source</a></button>
                   <button class="youtube btn " type="button"><a href=${searchResponeds.meals[imageNumber].strYoutube} target="_blank">youtube</a></button>
                 </div>
           </div>
       </div>
   </div>
</div>` 
document.getElementById("SearchmealDetails").innerHTML = mealDetails;
}



// search by whole words 

async function getSearchAPI(meal){
    let searchNameResponed = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let searchNameResponeds = await searchNameResponed.json() 
    searchNameResponedData = searchNameResponeds
    console.log(searchNameResponedData);
    displaySearchNameLetter()
    
}
$("#searchByName").keyup(function () { 
    searchName = searchByName.value
    getSearchAPI(searchName)
    // console.log(responedDATA);
    // console.log(searchName);
});

function displaySearchNameLetter() {
    let items = ``
    console.log(searchNameResponedData.length);
    for (let i = 0; i < searchNameResponedData.meals.length; i++) {
        items += `<div onclick="searchImageClikedName(${i})" class=" clickedImage px-3 col-md-3 gy-4">
        <div class=" item  position-relative">
        <img src=${searchNameResponedData.meals[i].strMealThumb} class=" w-100 rounded " alt="">
        <div class=" layer rounded d-flex align-items-center">
        <h2 class="layer2 position-absolute">${searchNameResponedData.meals[i].strMeal}</h2>
        </div>
        </div>
    </div>`
   
    }
    document.getElementById("Searchrow").innerHTML = items
}


function searchImageClikedName(e) {
    $(".searchPage").addClass("d-none");
    $("#SearchmealDetails").removeClass("d-none");
    imageNumber= e;
    SearchimgNameClickDetails()
    console.log(e);
    console.log(imageNumber);
}
function SearchimgNameClickDetails(){
    let mealDetails = `<div class=" container pt-5 px-5">
   <div class=" row">
       <div class=" col-md-4">
           <img src=${searchNameResponedData.meals[imageNumber].strMealThumb} class="w-100" alt="">
           <h1 class=" text-white">${searchNameResponedData.meals[imageNumber].strMeal}</h1>
       </div>
       <div class="text-white col-md-8">
           <h2>Instructions</h2>
           <p>${searchNameResponedData.meals[imageNumber].strInstructions}</p>
           <h5>Area : ${searchNameResponedData.meals[imageNumber].strArea} </h5>
           <h5>Category : ${searchNameResponedData.meals[imageNumber].strCategory} </h5>

           <h3>Recipes :</h3>
           <div>
               <ul class="nav nav-pills">
                   <li class="nav-item nav-link active m-md-1">
                   ${ searchNameResponedData.meals[imageNumber].strMeasure1+ searchNameResponedData.meals[imageNumber].strIngredient1}
                   </li>
                 </ul>
           </div>
           <h3>Tages :</h3>
           <div>
               <ul class="nav nav-pills">
                   <li class="nav-item nav-link active m-md-1">${searchNameResponedData.meals[imageNumber].strTags}</li>
               </ul>
           </div>

           <div class=" pt-3">
               <div class="d-grid gap-2 d-md-block">
                   <button class=" Source btn " type="button"><a href=${searchNameResponedData.meals[imageNumber].strSource} target="_blank">Source</a></button>
                   <button class="youtube btn " type="button"><a href=${searchNameResponedData.meals[imageNumber].strYoutube} target="_blank">youtube</a></button>
                 </div>
           </div>
       </div>
   </div>
</div>` 
document.getElementById("SearchmealDetails").innerHTML = mealDetails;
}



// End search page


// Start Categories page

async function getCategoriesData(){
    let Category = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let Categories = await Category.json() 
    CategoriesData= Categories
    console.log(CategoriesData);
    displayCategories()
}

$(".Categories").click(function () { 
    $(".firstPage").addClass("d-none");
    $(".searchPage").addClass("d-none");
    $(".category").removeClass("d-none");
    closeNavByItSelf()
    getCategoriesData()
});
function displayCategories(){
    let items = ``
    for (let i = 0; i < CategoriesData.categories.length; i++) {
        items += `<div onclick="categoryClick(${i})" class=" col-md-3 py-5 px-2 rounded ">
        <div class="item citem position-relative">
        <img src=${CategoriesData.categories[i].strCategoryThumb} class="w-100" alt="">
        <div class="layer rounded text-center">
            <h3>${CategoriesData.categories[i].strCategory}</h3>
            <p>${CategoriesData.categories[i].strCategoryDescription}</p>
        </div>
        </div>
    </div>`
   
    }
    document.getElementById("category").innerHTML = items
}
function categoryClick(e){
    $(".category").addClass("d-none");
    $("#hambozooo").removeClass("d-none");
    categoryname = CategoriesData.categories[e].strCategory;
    // console.log(e);
    // console.log(categoryname);
    getCatMeals(categoryname)
}
async function getCatMeals(meal) {
    let CategoryMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
    let CategoriesMeal = await CategoryMeal.json() 
    CategoriesMealData= CategoriesMeal

    dispalyCatMeals()
    // console.log(CategoriesMealData);
}

function dispalyCatMeals(){
    let item = ``
    for (let i = 0; i < CategoriesMealData.meals.length; i++) {
        item += `<div onclick="callCatImageClicked(${CategoriesMealData.meals[i]})" class=" clickedImage px-3 col-md-3 gy-4">
        <div class=" item  position-relative">
        <img src=${CategoriesMealData.meals[i].strMealThumb} class=" w-100 rounded " alt="">
        <div class=" layer rounded d-flex align-items-center">
        <h2 class="layer2 position-absolute">${CategoriesMealData.meals[i].strMeal}</h2>
        </div>
        </div>
    </div>`
   
    }
    document.getElementById("lololo").innerHTML = item;
}

function callCatImageClicked(e) {
    alert(`it is working ${e}`)
}
// onclick="callCatImageClicked(${CategoriesMealData.meals[i].strMeal})"

// function callCatImageClicked(e){
    // console.log("It is working");
    // $("#hambozooo").addClass("d-none");
    // $(".mealDetails").removeClass("d-none");
    // let imageName= e;
    // console.log(imageName);
    // SearchimgNameClickDetails()
// }
// function displayCatImageClicked(e) {
//     imageNumber= e;
// }



// End Categories page




// Start Area 

$(".Area").click(function () { 
    $(".firstPage").addClass("d-none");
    $(".searchPage").addClass("d-none");
    $(".category").addClass("d-none");
    $(".area").removeClass("d-none");
    closeNavByItSelf()
    getAreaData()
});

async function getAreaData(){
    let area = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areas = await area.json() 
    areaData= areas
    console.log(areaData);
    displayAreas()
}
function displayAreas(){
    let items = ``
    for (let i = 0; i < areaData.meals.length; i++) {
        items += `<div onclick="country(${i})" class=" col-md-3 position-relative text-center text-white item">
        <i class=" fa-solid fa-city fa-3x"></i>
        <div class=" text-center">
            <h3>${areaData.meals[i].strArea}</h3>
        </div>
    </div>`
   
    }
    document.getElementById("area").innerHTML = items
}
function country(p) {
     hamb = areaData.meals[p].strArea
    getcountryData(hamb)
}

async function getcountryData(country){
    let countryData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
    let countries = await countryData.json() 
    countriesData= countries
    console.log(countriesData);
    displaycountryData()
}

function displaycountryData(){
    $(".area").addClass("d-none");
    $(".country").removeClass("d-none");
    showCountryMeals()
}
function showCountryMeals(){
    let items = ``
    for (let i = 0; i < countriesData.meals.length; i++) {
        items += `<div onclick="CountyrMealClicked(${i})" class="px-3 col-md-3">
        <div class="item  position-relative">
        <img src=${countriesData.meals[i].strMealThumb} class="w-100 rounded " alt="">
        <div class="layer rounded d-flex align-items-center">
        <h2 class=" position-absolute">${countriesData.meals[i].strMeal}</h2>
        </div>
        </div>
    </div>`
   
    }
    document.getElementById("country").innerHTML = items
}


function CountyrMealClicked(p){
    let hambozoo = countriesData.meals[p].strMeal
    console.log(hambozoo);
    // displayChoosenMeal()
    getAPI2(hambozoo)
    $("#allmealDetails").removeClass("d-none");
    $(".country").addClass("d-none");
    
}
function displayChoosenMeal() {
    let mealDetails = `<div class=" container pt-5 px-5">
   <div class=" row">
       <div class=" col-md-4">
           <img src=${responedDATA2.meals[0].strMealThumb} class="w-100" alt="">
           <h1 class=" text-white">${responedDATA2.meals[0].strMeal}</h1>
       </div>
       <div class="text-white col-md-8">
           <h2>Instructions</h2>
           <p>${responedDATA2.meals[0].strInstructions}</p>
           <h5>Area : ${responedDATA2.meals[0].strArea} </h5>
           <h5>Category : ${responedDATA2.meals[0].strCategory} </h5>

           <h3>Recipes :</h3>
           <div>
               <ul class="nav nav-pills">
                   <li class="nav-item nav-link active m-md-1">
                   ${ responedDATA2.meals[0].strMeasure1+ responedDATA2.meals[0].strIngredient1}
                   </li>
                 </ul>
           </div>
           <h3>Tages :</h3>
           <div>
               <ul class="nav nav-pills">
                   <li class="nav-item nav-link active m-md-1">${responedDATA2.meals[0].strTags}</li>
               </ul>
           </div>

           <div class=" pt-3">
               <div class="d-grid gap-2 d-md-block">
                   <button class=" Source btn " type="button"><a href=${responedDATA2.meals[0].strSource} target="_blank">Source</a></button>
                   <button class="youtube btn " type="button"><a href=${responedDATA2.meals[0].strYoutube} target="_blank">youtube</a></button>
                 </div>
           </div>
       </div>
   </div>
</div>` 
document.getElementById("allmealDetails").innerHTML = mealDetails;
}

// End Area


// Start Ingredients
$(".Ingredients").click(function () { 
    $(".firstPage").addClass("d-none");
    $(".searchPage").addClass("d-none");
    $(".category").addClass("d-none");
    $(".area").addClass("d-none");
    $(".Ingred").removeClass("d-none");
    closeNavByItSelf()
    getIngredientsData()
});
async function getIngredientsData(){
    let Ingredient = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let Ingredients = await Ingredient.json() 
    IngredientData= Ingredients
    displayIngredient()
    console.log(IngredientData);
}
function displayIngredient() {
    let items = ``
    for (let i = 0; i < 20; i++) {
        items += `<div onclick="intgMealClicked(${i})" class=" col-md-3 position-relative text-center text-white item">
        <i class=" fa-solid fa-bowl-food fa-3x"></i>
        <div class=" text-center">
            <h3>${IngredientData.meals[i].strIngredient}</h3>
            <p>${IngredientData.meals[i].strDescription}</p>
        </div>
    </div>`
   
    }
    document.getElementById("Ingred").innerHTML = items
}
function intgMealClicked(p) {
    $(".Ingred").addClass("d-none");
    $(".intMealsection").removeClass("d-none");
    hamb = IngredientData.meals[p].strIngredient
    getIngredientsMeal(hamb)
    console.log(hamb);
}

async function getIngredientsMeal(meal){
    let Ingredientmeal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${meal}`)
    let Ingredientsmeals = await Ingredientmeal.json() 
    IngredientsmealsData= Ingredientsmeals
    console.log(IngredientsmealsData);
    displaygetIngredientsMeal()
}

function displaygetIngredientsMeal() {
    let items = ``
    for (let i = 0; i < IngredientsmealsData.meals.lenght; i++) {
        items += `<div class="px-3 col-md-3">
        <div class="item  position-relative">
        <img src=${IngredientsmealsData.meals[i].strMealThumb} class="w-100 rounded " alt="">
        <div class="layer rounded d-flex align-items-center">
        <h2 class=" position-absolute">${IngredientsmealsData.meals[i].strMeal}</h2>
        </div>
        </div>
    </div>`
   
    }
    document.getElementById("intMeals").innerHTML = items
}






// End Ingredients


// Second API
async function getAPI2(meal){
    let responed2 = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let responed2s = await responed2.json() 
    responedDATA2 = responed2s
    console.log(responedDATA2);
    displayChoosenMeal()
}



// Contact section
$(".Contact").click(function () { 
    $(".firstPage").addClass("d-none");
    $(".searchPage").addClass("d-none");
    $(".category").addClass("d-none");
    $(".area").addClass("d-none");
    $(".Ingred").addClass("d-none");
    $(".Contact").removeClass("d-none")
    closeNavByItSelf()
});

$(".name").keyup(function () { 
    let trys= nametest.test(Name.value)
    if (trys == false) {
        $(".warningn").removeClass("d-none");
    }
    else{
        $(".warningn").addClass("d-none");
    }
});
$(".gmail").keyup(function () { 
    let trys= gmailtest.test(Gmail.value)
    if (trys == false) {
        $(".warningg").removeClass("d-none");
    }
    else{
        $(".warningg").addClass("d-none");
    }
});
$(".phone").keyup(function () { 
    let trys= phonetest.test(Phone.value)
    if (trys == false) {
        $(".warningp").removeClass("d-none");
    }
    else{
        $(".warningp").addClass("d-none");
    }
    console.log(trys);
});
// document.getElementById("button").disabled = false;
// $(".button").css("disabled", "true");