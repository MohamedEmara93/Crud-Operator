const productForm = document.querySelectorAll('.form-control')
const productName = document.querySelector('#productName');
const productCateg = document.querySelector('#productCateg');
const productPrice = document.querySelector('#productPrice');
const productDesc = document.querySelector('#productDesc');

const nameAlert = document.getElementById('nameAlert')
const categAlert = document.getElementById('categAlert')
const priceAlert = document.getElementById('priceAlert')
const descAlert = document.getElementById('descAlert')

const searchInput = document.getElementById('search-input');

const addProductBtn = document.querySelector('.addProduct');

const tableBody = document.getElementById('tableBody');

let productContainer = [];
let currentIndex = 0;


if (localStorage.getItem('our Product')) {
    productContainer = JSON.parse(localStorage.getItem('our Product'))
    displayProduct()
} else {
    productContainer = []
}

addProductBtn.addEventListener('click', function () {

    if (validateName && duplicatedName && validateCateg && validatePrice && validateDesc) {
        if (addProductBtn.innerHTML == 'Add Product') {
            addProduct()
            localStorage.setItem('our Product', JSON.stringify(productContainer))
            displayProduct()
            clearForm()
        } else {
            submitEdit()
            localStorage.setItem('our Product', JSON.stringify(productContainer))
            displayProduct()
            clearForm()
        }
        addProductBtn.setAttribute('href', '#crud-table')
    }
})

function addProduct() {
    let product = {
        name: productName.value,
        categ: productCateg.value,
        price: productPrice.value,
        desc: productDesc.value,
    }
    productContainer.push(product)
}

function displayProduct() {
    let productRow = ``;
    for (let i = 0; i < productContainer.length; i++) {
        productRow += `
       <tr>
          <td>${i + 1}</td>
          <td>${productContainer[i].name}</td>
          <td>${productContainer[i].categ}</td>
          <td>${productContainer[i].price}</td>
          <td>${productContainer[i].desc}</td>
          <td><a onclick='updateProduct(${i})' id='update'><i class="far fa-edit"></i></a></td>
          <td><a onclick="deleteProduct(${i})" id='delete'><i class="far fa-trash-alt"></i></a></td>
       </tr> 
       `
    }
    tableBody.innerHTML = productRow;
}

function clearForm() {
    productForm.forEach(function (item) {
        item.value = ''
        item.classList.remove('is-valid')
    })
    addProductBtn.disabled = true
}

function deleteProduct(i) {
    productContainer.splice(i, 1)
    localStorage.setItem('our Product', JSON.stringify(productContainer))
    displayProduct()
}

function updateProduct(i) {
    currentIndex = i
    productName.value = productContainer[currentIndex].name;
    productCateg.value = productContainer[currentIndex].categ;
    productPrice.value = productContainer[currentIndex].price;
    productDesc.value = productContainer[currentIndex].desc;
    addProductBtn.innerHTML = 'Update Product';
}

function submitEdit() {
    productContainer[currentIndex].name = productName.value;
    productContainer[currentIndex].categ = productCateg.value;
    productContainer[currentIndex].price = productPrice.value;
    productContainer[currentIndex].desc = productDesc.value;
    addProductBtn.innerHTML = 'Add Product';
}

function searchProduct(term) {
    let product = ``;
    productContainer.forEach(function (item, i) {
        if (item.name.toLowerCase().includes(term.toLowerCase())) {
            product += `
            <tr>
               <td>${i + 1}</td>
               <td>${item.name}</td>
               <td>${item.categ}</td>
               <td>${item.price}</td>
               <td>${item.desc}</td>
               <td><a onclick='updateProduct(${i})' id='update'><i class="far fa-edit"></i></a></td>
               <td><a onclick="deleteProduct(${i})" id='delete'><i class="far fa-trash-alt"></i></a></td>
            </tr> 
            `
        }
    })
    tableBody.innerHTML = product
}

searchInput.addEventListener('keyup', function () {
    searchProduct(searchInput.value)
})
//////////////// VALIDATION //////////////////////

// 1 => Validate productName
function validateName() {
    let regex = /^[A-Z][A-Z a-z 0-9]{2,}$/

    if (regex.test(productName.value) == true) {
        nameAlert.classList.add('d-none')
        nameAlert.classList.remove('d-block')

        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid')

        addProductBtn.disabled = false
        return true
    } else {
        nameAlert.classList.remove('d-none')
        nameAlert.classList.add('d-block')

        productName.classList.add('is-invalid')
        productName.classList.remove('is-valid')

        addProductBtn.disabled = true
        return false
    }
}
// check Duplicated ProductName 
function duplicatedName() {
    productContainer.forEach(function (item) {
        if (productName.value == item.name) {
            nameAlert.classList.remove('d-none')
            nameAlert.classList.add('d-block')

            productName.classList.add('is-invalid')
            productName.classList.remove('is-valid')

            nameAlert.innerHTML = "Product Name Already Exists"
            addProductBtn.disabled = true
            return false
        } else {

            productName.classList.add('is-valid')
            productName.classList.remove('is-invalid')

            addProductBtn.disabled = false
            return true
        }
    })
}
productName.addEventListener("keyup", validateName)
productName.addEventListener("blur", duplicatedName)

// 2 => Validate productCategory
function validateCateg() {
    let regex = /^[A-Z a-z 0-9]{5,}$/

    if (regex.test(productCateg.value) == true) {
        categAlert.classList.add('d-none')
        categAlert.classList.remove('d-block')

        productCateg.classList.add('is-valid')
        productCateg.classList.remove('is-invalid')

        addProductBtn.disabled = false
        return true
    } else {
        categAlert.classList.remove('d-none')
        categAlert.classList.add('d-block')

        productCateg.classList.add('is-invalid')
        productCateg.classList.remove('is-valid')

        addProductBtn.disabled = true
        return false
    }
}
productCateg.addEventListener("keyup", validateCateg)

// 3 => Validate productPrice
function validatePrice() {
    let regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/

    if (regex.test(productPrice.value)) {
        priceAlert.classList.add('d-none');
        priceAlert.classList.remove('d-block');

        productPrice.classList.add('is-valid')
        productPrice.classList.remove('is-invalid')

        addProductBtn.disabled = false
        return true
    } else {
        priceAlert.classList.add('d-block');
        priceAlert.classList.remove('d-none');

        productPrice.classList.add('is-invalid')
        productPrice.classList.remove('is-valid')

        addProductBtn.disabled = true
        return false
    }
}
productPrice.addEventListener("keyup", validatePrice)

// 4 => Validate ProductDescription
function validateDesc() {
    let regex = /^[a-z A-Z 0-9]{3,}$/

    if (regex.test(productDesc.value)) {
        descAlert.classList.add('d-none')
        descAlert.classList.remove('d-block')

        productDesc.classList.add('is-valid')
        productDesc.classList.remove('is-invalid')

        addProductBtn.disabled = false
        return true
    } else {
        descAlert.classList.add('d-block')
        descAlert.classList.remove('d-none')

        productDesc.classList.add('is-invalid')
        productDesc.classList.remove('is-valid')

        addProductBtn.disabled = true
        return false
    }
}
productDesc.addEventListener('keyup', validateDesc)