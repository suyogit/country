let final = document.querySelector(".country-cards");
let allcountry;
fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data)=>{
        rendercountry(data)
        allcountry=data;
    })
    .catch((error) => {
        console.error('Error fetching countries:', error);  
    });

let filterbyregion=document.querySelector(".filter")
filterbyregion.addEventListener("change",(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)    
    .then((data) => data.json())
    .then(rendercountry)
    .catch((error) => {
        console.error('Error fetching countries:', error);  // Catch and log errors
    });

   
})


function rendercountry(data)
{
    final.innerHTML="";
        data.forEach((country) => {
            let a = document.createElement('a');
            a.href = `./countries.html?country=${country.name.common}`;

            let maindiv = document.createElement("div");
            maindiv.classList.add("card");

            // Check if flag is available, otherwise set a default image
            let img1 = document.createElement("img");
            img1.src = country?.flags?.svg || 'default-flag.png';  // Fallback to 'default-flag.png' if no flag

            let secdiv = document.createElement("div");
            secdiv.classList.add("content");

            let countryName = document.createElement("h2");
            countryName.classList.add("country-name");

            let boldElement = document.createElement('b');
            boldElement.innerText = country.name.common;
            countryName.append(boldElement);

            // Check and handle population
            let population = document.createElement("p");
            population.innerText = `Population: ${country.population?.toLocaleString('en-IN') || 'N/A'}`; 

            // Check and handle region
            let region = document.createElement("p");
            region.innerText = `Region: ${country?.region || 'N/A'}`; 

            // Check if capital exists and has at least one element
            let capital = document.createElement("p");
            capital.innerText = `Capital: ${country?.capital?.[0] || 'N/A'}`;  // Fallback to 'N/A' if no capital

            secdiv.append(countryName, population, region, capital);

            maindiv.append(img1, secdiv);

            a.append(maindiv);
            final.append(a);
        });
}


let input= document.querySelector("input")
input.addEventListener("input",(e)=>{
    let filtereddata= allcountry.filter((country)=>{
       return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })
    rendercountry(filtereddata)
})