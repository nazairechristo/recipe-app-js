// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");
let tabMeals = [];

async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (tabMeals = data.meals));

  console.log(tabMeals);
}

function mealsDisplay() {
  //await fetchMeals(search);

  if (tabMeals === null) {
    result.innerHTML = "<h2>No result</h2>";
  } else {
    tabMeals.length = 12;
    result.innerHTML = tabMeals
      .map((meal) => {
        let ingredients = [];

        for (let i = 1; i < 21; i++) {
            if (meal[`strIngredient${i}`]){
                let ingredient = meal[`strIngredient${i}`];
                let measure = meal[`strMeasure${i}`];
                ingredients.push(ingredient + " - " + measure)
            }
        }
        console.log(ingredients)

        return `
            <li class="meal-item">
                <h2 class="title-meal">${meal.strMeal}</h2>
                <p>${meal.strArea}</p>
                <img src=${meal.strMealThumb}> 
                <ul id="ingredients"><li>${ingredients}<li></ul>
            </li>
        `
      })
      .join("");
  }
}

input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
  mealsDisplay();
});
