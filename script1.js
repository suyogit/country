const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get("country");

// Create the parent div with class "combined"
let combinedDiv = document.createElement("div");
combinedDiv.classList.add("combined");

let x = document.createElement("div");
x.classList.add("flag");

let z = document.querySelector(".detail"); 
let zz = document.createElement("div");
zz.classList.add("detail-content");

// Dynamically create the border div (now it will be a sibling inside "combined")
let bord = document.createElement("div");
bord.classList.add("para");

fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
.then((data) => data.json())
.then((data) => {
    const image1 = document.createElement("img");
    image1.classList.add('detail-image');
    image1.src = data[0]?.flags?.svg;
    x.append(image1);
    
    let currency = Object.keys(data[0]?.currencies)[0];
    let language = Object.values(data[0]?.languages);
    let border = data[0]?.borders;

    // Get the dynamic key for nativeName
    let nativeNameKey = Object.keys(data[0].name.nativeName)[0]; // For example, "dzo" for Bhutan
    let nativeCommonName = data[0]?.name?.nativeName[nativeNameKey]?.common; // Access the dynamic common name

    let y = `
        <p><b>${data[0]?.name?.common}</b></p>
        <div class="left-right">
            <div class="left">
                <p>Native Name: ${nativeCommonName}</p> <!-- Dynamically show the native common name -->
                <p>Population: ${data[0]?.population.toLocaleString('en-IN')}</p>
                <p>Region: ${data[0]?.region}</p>
                <p>Sub region: ${data[0]?.subregion}</p>
                <p>Capital: ${data[0]?.capital}</p>
            </div>
            <div class="right">
                <p>Top Level Domain: ${data[0]?.tld[0]}</p>
                <p>Currencies: ${data[0]?.currencies[currency]?.name}</p>
                <p>Language: ${language}</p>
            </div>
        </div>          
    `;
    
    // Add borders section to the dynamic 'bord' div
    let borderTitle = document.createElement('p');
    borderTitle.textContent = "Borders:";
    bord.appendChild(borderTitle);
    
    if (border && border.length > 0) {
        border.forEach((element) => {
            fetch(`https://restcountries.com/v3.1/alpha/${element}`)
            .then((res) => res.json())
            .then(([data1]) => {
                let button = document.createElement("button");
                button.textContent = data1.name.common;
                let link = document.createElement("a");
                link.href = `?country=${data1.name.common}`;
                link.appendChild(button);
                
                bord.appendChild(link);  // Append border button links
            });
        });
    } else {
        let noBorders = document.createElement('p');
        noBorders.textContent = 'No border countries';
        bord.appendChild(noBorders);
    }
    
    zz.innerHTML = y;
    
    // Append the detail-content and para as siblings under combined div
    combinedDiv.append(zz, bord);
    
    // Append the flag and combinedDiv into the main detail div
    z.append(x, combinedDiv);
});


let back= document.querySelector('.back')
back.addEventListener(('click'),(e)=>{
    e.preventDefault();  
    history.back()
}

)