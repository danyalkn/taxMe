// Variables 
let counter = 0;
let prov = "";

// Selectors
const price = document.querySelector('.taxme-input');
const calcButton = document.querySelector('.tax-button');
const container = document.querySelector('.extension-input');
const province = document.querySelector('.select');

// Event Listeners
calcButton.addEventListener('click', calculateTax);
//price.addEventListener('click', calculateTax);
price.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      calculateTax(e);
    }
}); 
province.addEventListener("change", (e) => {
    prov = e.target.value;
    console.log(prov);
})

// Functions
function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className} design`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.extension-header');
    container.insertBefore(div, container.firstElementChild);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function getTax(prov) {
    switch(prov) {
        case "alberta":
            return 1.05;
        case "bc":
            return 1.12;
        case "manitoba":
            return 1.12;
        case "newbrunswick":
            return 1.15;
        case "nfl":
            return 1.15;
        case "nwt":
            return 1.05; 
        case "ns":
            return 1.15;
        case "nunavut":
            return 1.05;
        case "ontario":
            return 1.13; 
        case "pei":
            return 1.15; 
        case "quebec": 
            return 1.14975;
        case "sask":
            return 1.11;
        case "yukon":
            return 1.05;

    }
}

function calculateTax (e) {
    if (counter == 0) {
        e.preventDefault();
        counter++;
        if (!(/^\s*-?\d+(\.\d{1,2})?\s*$/.test(price.value))){
            return null;
        }
        console.log(prov);
        if (prov=="") {
            showAlert("Error: Please select a pronvice/territory","danger")
        }
        container.lastElementChild.remove();
        const taxDiv = document.createElement("div");
        const taxDisplay = document.createElement('h3');
        console.log(getTax(prov));
        function calculateTax(prov) {
            return price.value * getTax(prov);
        }
        taxDisplay.innerText = `$${calculateTax(prov).toFixed(2)}`;
        taxDiv.appendChild(taxDisplay);
        container.appendChild(taxDiv);
        counter++;
    } else {
        e.preventDefault();
        counter++;
        if (!(/^\s*-?\d+(\.\d{1,2})?\s*$/.test(price.value))){
            showAlert("Error: Please enter a valid price (Max 2 decimal places)","danger");
            return null;
        }
        remove();
        console.log(getTax(prov));
        const taxDiv = document.createElement("div");
        const taxDisplay = document.createElement('h3');
        function calculateTax() {
            return price.value * getTax(prov);
        }
        taxDisplay.innerText = `$${calculateTax(prov).toFixed(2)}`;
        taxDiv.appendChild(taxDisplay);
        container.appendChild(taxDiv);
        
    }
}
function remove() {
    if (counter != 0) {
        container.lastElementChild.remove();
        counter = 0;
    }
}
