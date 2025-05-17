
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
//start loder
$(document).ready(() => {
  getCategories("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");

  });
});
//end loder
//start nav
function openSidebar() {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  sidebar.style.left = "0px";
  openBtn.style.display = "none";
  closeBtn.style.display = "inline-block";
};

function closeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");

  sidebar.style.left = "-250px";
  openBtn.style.display = "inline-block";
  closeBtn.style.display = "none";
};

//end nav
//start


async function getCategories(term) {
  try {
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    var dataApi = await res.json();
    showSearchInputs();
    displayMeals(dataApi.meals);
  } catch (error) {
    console.log("error");
  }
};


function displayMeals(meals) {
  let cartona = "";

  for (let i = 0; i < meals.length; i++) {
    cartona += `
      <div class="col-md-3 ">
              <div onclick="getMealDetails('${meals[i].idMeal}'),closeSidebar()" class="meal mb-4 position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${meals[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${meals[i].strMeal}</h3>
                  </div>
              </div>
      </div>
      `
  };
  rowData.innerHTML = cartona;
};

async function getMealDetails(mealID) {
  searchContainer.innerHTML = "";
  rowData.innerHTML = "";
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  respone = await respone.json();
  console.log(respone.meals);
  displayMealDetails(respone.meals[0]);
};


function displayMealDetails(meal) {
  let ingredients = ``
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    };
  };

  let cartona = "";

  cartona += `
          <div class="col-md-4 text-start">
              <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                  alt="">
                  <h2>${meal.strMeal}</h2>
          </div>
          <div class="col-md-8 text-start">
              <h2>Instructions</h2>
              <p  >${meal.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
              </ul>
              <h3>Tags :</h3>
              <br>
              <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>
      `
  rowData.innerHTML = cartona;
};

//end 
//start
async function getMeCategories() {
  try {
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    var dataApi = await res.json();
    displayCategories(dataApi.categories);
  } catch (error) {
    console.log("error")
  };
};

function displayCategories(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
              <div class="col-md-3">
                <div onclick="getCategoryMeals('${meals[i].strCategory}'),closeSidebar()" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meals[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${meals[i].strCategory}</h3>
                        <p>${meals[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
        </div>
      `
  };
  rowData.innerHTML = cartona;
}

async function getCategoryMeals(category) {

  try {
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
  } catch (error) {
    console.log("error")
  };

};

//end
//start

async function getArea() {
  try {
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    var dataApi = await res.json();
    displayArea(dataApi.meals);
  } catch (error) {
    console.log("error");
  }
};
function displayArea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
              <div onclick="getArMeals('${arr[i].strArea}'),closeSidebar()" class="rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-house-laptop fa-4x"></i>
                      <h3>${arr[i].strArea}</h3>
              </div>
      </div>
      `
  };
  rowData.innerHTML = cartona;
};

async function getArMeals(area) {
  try {
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
  } catch (error) {
    console.log("error");
  }

}

//end
//start

async function getDients() {
  try {
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    var res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    var dataApi = await res.json();
    displayDients(dataApi.meals.slice(0, 20));
  } catch (error) {
    console.log("error");

  }
};

function displayDients(arr) {
  let cartona = "";

  for (let i = 0; i < arr.length; i++) {
    cartona += `
      <div class="col-md-3">
              <div onclick="getIngredients('${arr[i].strIngredient}'),closeSidebar()" class="rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                      <h3>${arr[i].strIngredient}</h3>
                      <p>${(arr[i].strDescription || "").split(" ").slice(0, 20).join(" ")}</p>
              </div>
      </div>
      `
  };

  rowData.innerHTML = cartona;
}
async function getIngredients(ingredients) {
  try {
    rowData.innerHTML = "";
    searchContainer.innerHTML = "";
    var response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
    response = await response.json();
    displayMeals(response.meals.slice(0, 20));
  } catch (error) {
    console.log("error");
  }

};



//end
//start search

function showSearchInputs() {
  let searchUI = `
    <div class="row py-4">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
  `;
  searchContainer.innerHTML = searchUI; 
  rowData.innerHTML = "";
};

async function searchByName(term) {
  try {
    rowData.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    let data = await response.json();
    displayMeals(data.meals || []);
  } catch (error) {
    console.log("search error by name", error);
  }
};

async function searchByLetter(letter) {
  try {
    rowData.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await response.json();
    displayMeals(data.meals || []);
  } catch (error) {
    console.log("search error by letter", error);
  }
};

//end search

//start form
let nameInput, emailInput, phoneInput, ageInput, passwordInput, repasswordInput, submitBtn;

function showContacts() {
  searchContainer.innerHTML = "";
  rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-75 text-center">
        <div class="row g-4">
          <div class="col-md-6">
            <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
              Special characters and numbers not allowed
            </div>
          </div>
          <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
              Email not valid *exemple@yyy.zzz
            </div>
          </div>
          <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid Phone Number
            </div>
          </div>
          <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid age
            </div>
          </div>
          <div class="col-md-6">
            <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
          </div>
          <div class="col-md-6">
            <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
              Enter valid repassword 
            </div>
          </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
      </div>
    </div>`;

  nameInput = document.getElementById("nameInput");
  emailInput = document.getElementById("emailInput");
  phoneInput = document.getElementById("phoneInput");
  ageInput = document.getElementById("ageInput");
  passwordInput = document.getElementById("passwordInput");
  repasswordInput = document.getElementById("repasswordInput");
  submitBtn = document.getElementById("submitBtn");
};

function inputsValidation() {
  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
};

function nameValidation() {
  let regx = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  let nameAlert = document.getElementById("nameAlert");

  if (regx.test(nameInput.value.trim())) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    return true;
  } else {
    nameInput.classList.add("is-invalid");
    nameInput.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    return false;
  }
};

function emailValidation() {
  let regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailAlert = document.getElementById("emailAlert");

  if (regx.test(emailInput.value)) {
    emailInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    emailAlert.classList.add("d-none");
    return true;
  } else {
    emailInput.classList.add("is-invalid");
    emailInput.classList.remove("is-valid");
    emailAlert.classList.remove("d-none");
    return false;
  }
};

function phoneValidation() {
  let regx = /^01[0125][0-9]{8}$/;
  let phoneAlert = document.getElementById("phoneAlert");

  if (regx.test(phoneInput.value)) {
    phoneInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");
    phoneAlert.classList.add("d-none");
    return true;
  } else {
    phoneInput.classList.add("is-invalid");
    phoneInput.classList.remove("is-valid");
    phoneAlert.classList.remove("d-none");
    return false;
  }
};

function ageValidation() {
  let regx = /^[1-9][0-9]?$/;
  let ageAlert = document.getElementById("ageAlert");

  if (regx.test(ageInput.value)) {
    ageInput.classList.add("is-valid");
    ageInput.classList.remove("is-invalid");
    ageAlert.classList.add("d-none");
    return true;
  } else {
    ageInput.classList.add("is-invalid");
    ageInput.classList.remove("is-valid");
    ageAlert.classList.remove("d-none");
    return false;
  }
};

function passwordValidation() {
  let regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let passwordAlert = document.getElementById("passwordAlert");

  if (regx.test(passwordInput.value)) {
    passwordInput.classList.add("is-valid");
    passwordInput.classList.remove("is-invalid");
    passwordAlert.classList.add("d-none");
    return true;
  } else {
    passwordInput.classList.add("is-invalid");
    passwordInput.classList.remove("is-valid");
    passwordAlert.classList.remove("d-none");
    return false;
  }
};

function repasswordValidation() {
  let repasswordAlert = document.getElementById("repasswordAlert");

  if (repasswordInput.value === passwordInput.value && repasswordInput.value !== "") {
    repasswordInput.classList.add("is-valid");
    repasswordInput.classList.remove("is-invalid");
    repasswordAlert.classList.add("d-none");
    return true;
  } else {
    repasswordInput.classList.add("is-invalid");
    repasswordInput.classList.remove("is-valid");
    repasswordAlert.classList.remove("d-none");
    return false;
  }
};
//end form