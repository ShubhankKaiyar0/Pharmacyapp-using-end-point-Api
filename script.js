// ==============================Navigation Menu======================================================

document.addEventListener('DOMContentLoaded', () => {
    const orderTab = document.getElementById('Order');
    const productTab = document.getElementById('Product');
    const userTab = document.getElementById('User');

    orderTab.addEventListener('click', () => {
        // Handle click event for Orders tab
        page1.style.display = 'block';
           page2.style.display = 'none';
          page3.style.display = 'none';
    });

    productTab.addEventListener('click', () => {
        // Handle click event for Products tab
        page1.style.display = 'none';
        page2.style.display = 'block';
       page3.style.display = 'none';
    });

    userTab.addEventListener('click', () => {
        // Handle click event for Users tab
        page1.style.display = 'none';
        page2.style.display = 'none';
       page3.style.display = 'block';
    });
});


// // ==============================Navigation Menu end======================================================





// ********************************************************************************************************




// ==============================Login Page======================================================
let sbtBtn=document.getElementById('sbtBtn')
let loginPage=document.getElementById("loginPage")
let nav=document.getElementById('nav')
let page1=document.getElementById('page1')
let userDetails={}

let logoutBtn= document.getElementById('logoutBtn') 
sbtBtn.addEventListener("click", submit)

function submit(){
    let userName=document.getElementById('userName').value
    let userPass=document.getElementById('userPass').value
        if(userName === userPass){
            alert("login Successful!!!!");
            userDetails.name=userName;
            userDetails.pass=userPass
            const stringifiedObj = JSON.stringify(userDetails)
            localStorage.setItem('userDetails',stringifiedObj)
            sessionStorage.setItem('userDetails',stringifiedObj)
            loginPage.style.display="None"
            nav.style.display="flex"
            logoutBtn.style.display="block"
            page1.style.display="block"



        
        }
        else{
            alert("Authentication failed")
        }

}


logoutBtn.addEventListener('click', logout)

function logout(){
    document.getElementById("page1").style.display="none"
    document.getElementById("page2").style.display="none"
    document.getElementById("page3").style.display="none"
    document.getElementById("loginPage").style.display="block"
}

// ==============================Order Page======================================================
const orderCheckboxes = document.querySelectorAll('.checkBoxOrder input[type="checkbox"]');
const orderCount = document.getElementById('count');
const orderBody = document.getElementById('ordersBody');
let allOrdersData = []; 

// Fetch data from the api
fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
    .then(response => response.json())
    .then(data => {
        allOrdersData = data;
        updateOrderTable(allOrdersData); 
    })
    .catch(error => console.error('Error fetching data:', error));

orderCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateOrderTable(filterOrders());
    });
});

function filterOrders() {
    const checkedStatuses = Array.from(orderCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.id);
    
    if (checkedStatuses.length === 0) {
        return allOrdersData; 
    } else {
        return allOrdersData.filter(order => checkedStatuses.includes(order.orderStatus));
    }
}

function updateOrderTable(filteredData) {
    orderBody.innerHTML = '';  
    filteredData.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.orderDate}</td>
            <td>${order.amount}</td>
            <td>${order.orderStatus}</td>
        `;
        orderBody.appendChild(row);
    });
    orderCount.textContent = filteredData.length;
}




// ================================================Product Page========================================================================

const checkboxes = document.querySelectorAll('.checkBoxProduct input[type="checkbox"]');
const countProduct = document.getElementById('countProduct');
const productBody = document.getElementById('productBody');

let allProductsData = []; 

// Fetch data from the API 
fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
    .then(response => response.json())
    .then(data => {
        allProductsData = data;
        updateTable(allProductsData); 
    })
    .catch(error => console.error('Error fetching data:', error));


checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateTable(filterProducts());
    });
});


function filterProducts() {
    const today = new Date();
    const expiredCheckbox = document.getElementById('Expired');
    const lowStockCheckbox = document.getElementById('LowStock');

    return allProductsData.filter(product => {
        const expiryDate = new Date(product.expiryDate);
        const isExpired = expiredCheckbox.checked && expiryDate < today;
        const isLowStock = lowStockCheckbox.checked && product.stock < 100;

        if (expiredCheckbox.checked && lowStockCheckbox.checked) {
            return isExpired && isLowStock;
        } else if (expiredCheckbox.checked) {
            return isExpired;
        } else if (lowStockCheckbox.checked) {
            return isLowStock;
        }

        return true; 
    });
}

function updateTable(filteredData) {
    productBody.innerHTML = ''; // 
    
    filteredData.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.medicineName}</td>
            <td>${product.medicineBrand}</td>
            <td>${product.expiryDate}</td>
            <td>$ ${product.unitPrice}</td>
            <td>${product.stock}</td>
        `;
        productBody.appendChild(row);
    });
    countProduct.textContent = filteredData.length;
}




// ================================================User Info Page========================================================================

let searchData = document.getElementById('searchData'); // Corrected the ID here
let UserArea = document.getElementById('UserArea');
let allData = [];

window.onload = function () {
    fetchUsers();
    // Add event listeners for search and reset
    searchData.addEventListener('input', searchName);
    document.getElementById('reset').addEventListener('click', resetSearch);
};

// Fetch all users from the API
function fetchUsers() {
    fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        .then(response => response.json())
        .then(data => {
            allData = data;
            displayUserData(allData);
        })
        .catch(error => console.error('Error fetching users:', error));
}

function displayUserData(users) {
    UserArea.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td><img src="${user.profilePic}" height='25px' width='25px' alt=""></td>
            <td>${user.fullName}</td>
            <td>${user.dob}</td>
            <td>${user.gender}</td>
            <td>${user.currentCity}</td>
            <td>${user.currentCountry}</td>
        `;
        UserArea.appendChild(row);
    });
}

function searchName() {
    const find = searchData.value.trim().toLowerCase(); // Corrected variable name
    if (find.length >= 2) {
        const filterData = allData.filter(user => {
            const fullName = user.fullName.toLowerCase();
            return fullName.includes(find);
        });
        displayUserData(filterData);
    } else if (find.length === 0) {
        resetSearch();
    }
}

function resetSearch() {
    searchData.value = '';
    displayUserData(allData);
}


