const carousel = document.getElementById("carousel");
const rightButton = document.getElementById("rightIcon");
const leftButton = document.getElementById("leftIcon");
const moreRecipebtn = document.querySelector(".more-recipes-btn");
const recipeList = document.querySelector(".recipe-list");
const apiKey = "4d4601e174c54ed597965c200dba685d";
const searchButton = document.getElementById('searchButton');
const loadingScreen = document.querySelector(".loading-screen");
const filterButtons = document.querySelector(".filter-buttons");

function showLoading() {
  loadingScreen.style.display = "flex";
}

function hideLoading() {
  loadingScreen.style.display = "none";
}
function fetchRecipeData(query){
    showLoading();

    let apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=20`;

    if(query){
       let  queryUrl = `https://api.spoonacular.com/recipes/random?$&apiKey=${apiKey}&${query}`;
}
    fetch(apiUrl)
    .then((response) => {
      if (response.status.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      hideLoading();
      const recipeItem = data.results;
      
      carousel.innerHTML = `<i class="fa-solid fa-arrow-left icon-btn left-icon" id="leftIcon"></i>`;

      recipeList.innerHTML = "";

      const results = query ? data.results : data.recipes;
      // console.log(results);
      results.forEach((item) => {
        const image = item.image || (item.imageUrls && item.imageUrls[0]);
        carousel.innerHTML +=`
        <img src="${image}">
        `
      })
      recipeItem.forEach((item) => {
        carousel.innerHTML += `
                <img src=${item.image}></img>
                `
      });

      carousel.innerHTML += `<i class="fa-solid fa-arrow-right icon-btn right-icon id="rightIcon""></i>`;

      recipeItem.forEach((item) => {
        recipeList.innerHTML += `
                <div class="recipe-item">
                    <img src=${item.image}></img>
                    <h5>${item.title}</h5>
                </div>
                `
      });
    })
    .catch((error) => {
      console.log("Fetch error", error);
    });


document.addEventListener("DOMContentLoaded", function(event){
    fetchRecipeData();
    event.preventDefault();

    moreRecipebtn.addEventListener("click", function () {
        showLoading();

        fetch(apiUrl)
          .then((response) => {
            if (response.status.ok) {
              throw new Error(
                `Network response was not ok: ${response.status}`
              );
            }
            return response.json();
          })
          .then((moreRecipe) => {
            hideLoading();
            const recipeDetails = moreRecipe.recipes;
            recipeDetails.forEach((item) => {
              recipeList.innerHTML += `
                        <div class="recipe-item">
                            <img src=${item.image}></img>
                            <h5>${item.title}</h5>
                        </div>
                        `
            });
          });
      });

      searchButton.addEventListener('click', function(){
        let query = document.querySelector('input').value.trim().toLowerCase;
        fetchRecipeData(query)
      })

})
}
fetchRecipeData()








// document.addEventListener("DOMContentLoaded", (event) => {
//   event.preventDefault();

//   showLoading();

//   fetch(apiUrl)
//     .then((response) => {
//       if (response.status.ok) {
//         throw new Error(`Network response was not ok: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       hideLoading();
//       console.log(data);

//       const recipeItem = data.results;

//       console.log(recipeItem);

//       carousel.innerHTML = `<i class="fa-solid fa-arrow-left icon-btn left-icon" id="leftIcon"></i>`;

//       recipeItem.forEach((item) => {
//         carousel.innerHTML += `
//                 <img src=${item.image}></img>
//                 `;
//       });

//       carousel.innerHTML += `<i class="fa-solid fa-arrow-right icon-btn right-icon id="rightIcon""></i>`;

//       recipeItem.forEach((item) => {
//         recipeList.innerHTML += `
//                 <div class="recipe-item">
//                     <img src=${item.image}></img>
//                     <h5>${item.title}</h5>
//                 </div>
//                 `;
//       });

//       moreRecipebtn.addEventListener("click", function () {
//         showLoading();

//         fetch(
//           `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`
//         )
//           .then((response) => {
//             if (response.status.ok) {
//               throw new Error(
//                 `Network response was not ok: ${response.status}`
//               );
//             }
//             return response.json();
//           })
//           .then((moreRecipe) => {
//             hideLoading();
//             console.log(moreRecipe);
//             const recipeDetails = moreRecipe.recipes;
//             console.log(recipeDetails);

//             recipeDetails.forEach((item) => {
//               recipeList.innerHTML += `
//                         <div class="recipe-item">
//                             <img src=${item.image}></img>
//                             <h5>${item.title}</h5>
//                         </div>
//                         `;
//             });
//           });
//       });
//     })
//     .catch((error) => {
//       console.log("Fetch error", error);
//     });
// });