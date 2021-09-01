const searchFood = async () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // Clear data
    searchField.value = '';

    // LOAD DATA
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displaySearchResult(data.meals))

    try{
        const res = await fetch(url)
        const data = await res.json()
        displaySearchResult(data.meals)
    }
    catch (error) {
        console.log(error);
    };
};

const displaySearchResult = meals => {
    const searchResults = document.getElementById('search-results');

    // CLEAR DATA system 01
    // searchResults.innerHTML = '';
    // CLEAR DATA system 01
    searchResults.textContent = '';

    // CONDITION APPLY
    if(meals.length == 0){
        document.getElementById('error-handle').style.display = block;
    }
    else {
        meals.forEach(meal =>{
            // console.log(meal)
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML =`
                <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                    </div>
                </div>
            `;
            searchResults.appendChild(div);
        });
    }    
}

const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetails(data.meals[0]))
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
};

const displayMealDetails =  meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');

    // CLEAR DATA
    mealDetails.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div id="meal-details" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
    mealDetails.appendChild(div);
};