const products = {
    "product1": {
        "name": "Sandwich",
        "price": 150,
        "subproducts": [ ],
        "subproperty": { }
    },
    "product2": {
        "name": "Espresso",
        "price": 120,
        "subproducts": [
            {
                "name": "S",
                "price": 100
            },
            {
                "name": "M",
                "price": 120
            },
            {
                "name": "L",
                "price": 150
            },
            {
                "name": "XL",
                "price": 180
            }
        ],
        "subproperty": { }
    },
    "product3": {
        "name": "Cola",
        "price": 100,
        "subproducts": [ ],
        "subproperty": {
            "name": "Discount",
            "multiplier": 0.9
        }
    },
    "product4": {
        "name": "Latte",
        "price": 180,
        "subproducts": [
            {
                "name": "Caramel",
                "price": 200
            },
            {
                "name": "Coconut",
                "price": 220
            },
            {
                "name": "Melon",
                "price": 200
            },
        ],
        "subproperty": {
            "name": "No sugar",
            "multiplier": 1.1
        }
    }
}

function loadProductsEl(productsEl) {
    for (let i = 1; i <= Object.keys(products).length; i++) {
        let productDivEl = document.createElement("div");

        let productRadioEl = document.createElement("input");
        productRadioEl.setAttribute("type", "radio");
        productRadioEl.setAttribute("id", `radio-${i}`);
        productRadioEl.setAttribute("value", `product${i}`);
        productRadioEl.setAttribute("name", "product-type");
        productDivEl.appendChild(productRadioEl);

        let productRadioLabelEl = document.createElement("label");
        productRadioLabelEl.setAttribute("for", `radio-${i}`);
        productRadioLabelEl.innerText = products[`product${i}`]["name"];
        productDivEl.appendChild(productRadioLabelEl);

        productsEl.appendChild(productDivEl);
    }
}

function getProductType(typeSelectEls) {
    let selectedType;

    typeSelectEls.forEach(typeSelectEl => {
        if (typeSelectEl.checked === true) {
            selectedType = typeSelectEl.value;
        }
    });
    let product = products[selectedType];

    return product;
}

document.addEventListener("DOMContentLoaded", (event) => {
    let productsEl = document.getElementById("calc-radio-group");
    loadProductsEl(productsEl)
});

function formStandartSelectOption() {
    let option = document.createElement("option");
    let name = document.createTextNode("Select subproduct");
    option.setAttribute("value", "");
    option.appendChild(name);

    return option;
}

function loadSubproductsOptions(subproducts, subproductsSelectEl) {
    if (subproducts.length > 0) {
        subproductsSelectEl.removeAttribute("disabled");
    }
    else {
        subproductsSelectEl.setAttribute("disabled", "");
    }
    subproducts.forEach(subproduct => {
        let option = document.createElement("option");
        let name = document.createTextNode(subproduct["name"]);
        option.setAttribute("value", subproduct["price"]);
        option.appendChild(name);
        subproductsSelectEl.appendChild(option);
    });
}

function loadSubproductProperty(subproductProperty, subproductsCheckbox, subproductsCheckboxLabel) {
    
    if (Object.keys(subproductProperty).length > 0) {
        subproductsCheckbox.removeAttribute("disabled");
        subproductsCheckbox.setAttribute("value", subproductProperty["multiplier"]);
        subproductsCheckboxLabel.innerText = subproductProperty["name"];
        subproductsCheckboxLabel.setAttribute("style", "color: var(--primary-color)");
    }
    else {
        subproductsCheckbox.setAttribute("disabled", "");
        subproductsCheckbox.setAttribute("value", "");
        subproductsCheckboxLabel.innerText = "No Property";
        subproductsCheckboxLabel.setAttribute("style", "color: var(--secondary-color); opacity: 0");
    }
}

function loadSubproductEl(product) {
    let subproductsSelectEl = document.getElementById("subproducts-select");
    let subproductsCheckbox = document.getElementById("product-property");
    let subproductsCheckboxLabel = document.getElementById("product-property-label");
    
    subproductsSelectEl.innerHTML = " ";
    option = formStandartSelectOption();    
    subproductsSelectEl.appendChild(option);

    let subproducts = product["subproducts"];
    loadSubproductsOptions(subproducts, subproductsSelectEl);
    
    let subproductProperty = product["subproperty"];
    loadSubproductProperty(subproductProperty, subproductsCheckbox, subproductsCheckboxLabel);
}

function changeProductType() {
    let subproductsEl = document.getElementById("subproducts");
    let typeSelectEls = document.getElementsByName("product-type");
    let product = getProductType(typeSelectEls);
    loadSubproductEl(product);
}

function getQuantity(quantityEl) {
    return parseInt(quantityEl.value);
}

function getProductPrice(subproductTypeEl, product) {
    let productPrice;
    if ((subproductTypeEl.getAttribute("disabled") === null) && !(subproductTypeEl.value === "")) {
        productPrice = subproductTypeEl.value;
    }
    else {
        productPrice = product["price"];
    }

    return productPrice;
}

function getProductMultiplier(subproductPropertyEl) {
    let productMultiplier;
    if (subproductPropertyEl.getAttribute("disabled") === null && subproductPropertyEl.checked) {
        productMultiplier = subproductPropertyEl.value;
    }
    else {
        productMultiplier = 1;
    }
    return productMultiplier;
}

function isResultValid(result) {
    return !(isNaN(result) || result < 0);
}

function calcResult(quantity, productPrice, productMultiplier) {
    let result = quantity * productPrice * productMultiplier;
    if (isResultValid(result)) {
        return result;
    }
    else {
        return "Invalid input";
    }
    
}

function writeResult(result) {
    let resultEl = document.getElementById("result");
    resultEl.innerHTML = result;
}

function calculate() {
    let quantityEl = document.getElementById("quantity-input");
    let typeSelectEls = document.getElementsByName("product-type");

    let product = getProductType(typeSelectEls);

    let subproductTypeEl = document.getElementById("subproducts-select");
    let subproductPropertyEl = document.getElementById("product-property");

    let quantity = getQuantity(quantityEl);

    let productPrice = getProductPrice(subproductTypeEl, product);

    let productMultiplier = getProductMultiplier(subproductPropertyEl);

    let result = calcResult(quantity, productPrice, productMultiplier);
    writeResult(result);    
}