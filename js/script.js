var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");

var productNameError = document.getElementById("productNameError");
var productPriceError = document.getElementById("productPriceError");
var productCategoryError = document.getElementById("productCategoryError");
var productDescError = document.getElementById("productDescError");

var submitButton = document.getElementById("submit");
var submitUpdateButton = document.getElementById("submitUpdate");


var updateIndex ;

var productContainer;

if(localStorage.getItem("myProducts") == null)
{
    productContainer = [];
}
else
{
    productContainer = JSON.parse( localStorage.getItem("myProducts"));
    displayProducts();
}

function addProduct()
{
    if(Validate()== true)
    {
            var product =
        {
            name : productNameInput.value,
            price : productPriceInput.value,
            category : productCategoryInput.value,
            desc : productDescInput.value
        };

        productContainer.push(product);
        localStorage.setItem("myProducts",JSON.stringify(productContainer));
        console.log(productContainer);
        clearForm();
        displayProducts();
    }
  
}

function clearForm()
{
    productNameInput.value = " ";
    productPriceInput.value =" ";
    productCategoryInput.value = " ";
    productDescInput.value = " ";
}

function displayProducts()
{
    var cartoona = ``;
    for (var i = 0; i< productContainer.length; i++) {
       cartoona += `
       <tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].desc}</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(`+i+`)">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(`+i+`)">Delete</button></td>
       </tr>
       `;
    }
    document.getElementById("tableBody").innerHTML = cartoona ;
}

function deleteProduct(productIndex)
{
    productContainer.splice(productIndex,1);
    localStorage.setItem("myProducts" ,  JSON.stringify( productContainer) );

    displayProducts();
}

function searchProduct(searchTerm)
{
    var cartoona = ``;
    for (var i = 0; i < productContainer.length; i++) {
       
        if (productContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())== true) {

            cartoona += `
            <tr>
                <td>${i}</td>
                <td>${productContainer[i].name.replace(searchTerm, `<span class=" replacing text-white">${searchTerm}</span>`)}</td>
                <td>${productContainer[i].price}</td>
                <td>${productContainer[i].category}</td>
                <td>${productContainer[i].desc}</td>
                <td><button class="btn btn-outline-warning" onclick="updateProduct(`+i+`)">Update</button></td>
                <td><button class="btn btn-outline-danger" onclick="deleteProduct(`+i+`)">Delete</button></td>
            </tr>
            `;
                    
        }
        document.getElementById("tableBody").innerHTML = cartoona ;
    }
}

function updateProduct(index)
{
    productNameInput.value = productContainer[index].name;
    productPriceInput.value = productContainer[index].price;
    productCategoryInput.value = productContainer[index].category;
    productDescInput.value = productContainer[index].desc;
    updateIndex = index;
    submitButton.classList.replace("d-block", "d-none");
    submitUpdateButton.classList.replace("d-none", "d-block");
}
function updateProductValues()
{
    if(Validate()== true)
    {
            var product =
        {
            name : productNameInput.value,
            price : productPriceInput.value,
            category : productCategoryInput.value,
            desc : productDescInput.value
        };
        productContainer[updateIndex]= product;
        
        localStorage.setItem("myProducts",JSON.stringify(productContainer));
        console.log("product");
        clearForm();
        submitUpdateButton.classList.replace("d-block", "d-none");
        submitButton.classList.replace("d-none", "d-block");
        
        displayProducts();
    }

}

function validateProductName()
{
    var rejex = /^[A-Z][a-z]{3,10}$/;
    if (rejex.test(productNameInput.value)== true)
    {
       
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        productNameError.classList.replace("d-block","d-none");
        return true;



    }
    else
    {
    
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        productNameError.classList.replace("d-none","d-block");
        return false ;

    }
        
}
productNameInput.addEventListener("blur",validateProductName);

function validateProductPrice()
{
    var rejex = /^[1-9][0-9]{3,4}$/;
    if (rejex.test(productPriceInput.value)== true)
    {
       
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        productPriceError.classList.replace("d-block","d-none");
        return true;

    }
    else
    {
    
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        productPriceError.classList.replace("d-none","d-block");
        return false ;

    }
        
}
productPriceInput.addEventListener("blur",validateProductPrice);

function validateProductCategory()
{
    var rejex = /^[A-Z][a-z]{3,10}$/;
    if (rejex.test(productCategoryInput.value)== true)
    {
       
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        productCategoryError.classList.replace("d-block","d-none");
        return true;

    }
    else
    {
    
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        productCategoryError.classList.replace("d-none","d-block");
        return false ;


    }
        
}
productCategoryInput.addEventListener("blur",validateProductCategory);

function validateProductDesc()
{
  
    if (productDescInput.value== "")
    {
        productDescInput.classList.add("is-invalid");
        productDescInput.classList.remove("is-valid");
        productDescError.classList.replace("d-none","d-block");
        return false ;
       

    }
    else
    {
    
    
        productDescInput.classList.add("is-valid");
        productDescInput.classList.remove("is-invalid");
        productDescError.classList.replace("d-block","d-none");
        return true;

    }
        
}
productDescInput.addEventListener("blur",validateProductDesc);

function Validate()
{
    if((validateProductName())==true &&(validateProductPrice()== true)&&(validateProductCategory()==true) && (validateProductDesc()== true))
    {
        return true;
    }
    else
    {
        return false;
    }
}


