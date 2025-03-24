const carousel = document.getElementById('carousel');
const moreRecipebtn = document.querySelector('.more-recipes-btn');
const recipeList = document.querySelector('.recipe-list');
const apiKey = "1e968c44f6644535ac2d3a4ff0c76bc2";
const leftSide = document.querySelector('.left-icon')


document.addEventListener("DOMContentLoaded", (event)=>{
    event.preventDefault();

    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=15`)
        .then(response =>{
            if(response.status.ok){
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>{
            console.log(data);

            const recipeItem = data.results

            console.log(recipeItem);

            carousel.innerHTML = `<i class="fa-solid fa-arrow-left icon-btn left-icon"></i>`;

            recipeItem.forEach(item => {
                carousel.innerHTML +=`
                <img src=${item.image}></img>
                `
            });
        
            carousel.innerHTML += `<i class="fa-solid fa-arrow-right icon-btn right-icon"></i>`;

            
            recipeItem.forEach(item=>{
                recipeList.innerHTML +=`
                <div class="recipe-item">
                    <img src=${item.image}></img>
                    <h5>${item.title}</h5>
                </div>
                `
            })

            

            moreRecipebtn.addEventListener('click', function(){
                fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=10`)
                .then(response =>{
                    if(response.status.ok){
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }
                    return response.json();
                })
                .then(moreRecipe =>{
                    console.log(moreRecipe);
                    const recipeDetails = moreRecipe.recipes
                    console.log(recipeDetails);

                    recipeDetails.forEach(item=>{
                        recipeList.innerHTML +=`
                        <div class="recipe-item">
                            <img src=${item.image}></img>
                            <h5>${item.title}</h5>
                        </div>
                        `
                })
            })

        })
    })
    .catch(error =>{
        console.log('Fetch error', error);
    })
})