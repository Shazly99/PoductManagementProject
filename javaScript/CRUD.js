
let title = document.getElementById("title");
let price = document.getElementById("price");
let texes = document.getElementById("texes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let totalPrice = document.getElementById("totalPrice");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

let mood = "Create";
let temp; //المتغير الوهمي

window.onload = title.focus();

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +texes.value + +ads.value - +discount.value;
    // let result=(parseInt(price.value)+parseInt(texes.value)+parseInt(ads.value))-discount.value;
    totalPrice.value = "Total Price : " + result;
    totalPrice.classList.add("bg-danger");
  } else {
    totalPrice.value = "Total Price : ";
    totalPrice.classList.remove("bg-danger");
    totalPrice.classList.add("bg-warning");
  }
}
console.log(temp);
let DB = [];
if (localStorage.getItem("pro") != null) {
  DB = JSON.parse(localStorage.getItem("pro"));
  display();
} else {
  DB = [];
}
// if (localStorage.pro == null) {
//   DB = [];
// } else {
//   DB = JSON.parse(localStorage.pro);
//   display()
// }
/************************************createNewPro */
create.onclick = function createNewPro(e) {
  console.log("ok");
  let prodect = {
    title: title.value.toLowerCase(),
    price: price.value,
    texes: texes.value,
    ads: ads.value,
    discount: discount.value,
    totalPrice: totalPrice.value,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value!='' &&price.value!=''&&texes!=''&&ads.value!='') {
    if (mood === "Create") {
      if (count.value > 1) {// count ptoudect 
        for (let i = 0; i < count.value; i++) {
          DB.push(prodect);
        }
      } else {
        DB.push(prodect);
      }
    } else {
      DB[temp] = prodect;
      create.classList.replace("btn-success", "btn-outline-primary");
      count.style.display = "block";
      create.innerHTML = "Create";
    }
    clear();
  }else{
    
  }

  localStorage.setItem("pro", JSON.stringify(DB));
  console.log(DB);
  
  display();
  window.onload = title.focus();
};
/************************************clear input  */
function clear() {
  title.value = "";
  price.value = "";
  texes.value = "";
  ads.value = "";
  discount.value = "";
  totalPrice.value = "Total Price : ";
  count.value = "";
  category.value = "";
  totalPrice.classList.remove("bg-danger");
  totalPrice.classList.add("bg-warning");
}
/************************************display */
function display() {
  let table = ``;
  let showData = document.getElementById("showData");
  for (let i = 0; i < DB.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${DB[i].title}</td>
        <td>${DB[i].price}</td>
        <td>${DB[i].texes}</td>

        <td>${DB[i].ads}</td>
        <td>${DB[i].discount}</td>
        <td>${DB[i].totalPrice.slice(13)}</td>
        <td>${DB[i].category}</td>
        <td>
            <button onclick='update(${i})' class="btn btn-primary">Update</button>
        </td>
        <td>
            <button onclick='deletePro(${i})' class="btn btn-danger">Delete</button>

        </td>
        </tr>
        `;
  }
  showData.innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (DB.length > 0) {
    deleteAll.innerHTML = `        
    <button onclick='deleteAll()' class="btn btn-danger rounded-pill font-weight-bolder w-100 mt-2">Delete All (${
      DB.length + 1
    })</button>
    `;
  } else {
    deleteAll.innerHTML = "";
  }
}
/***********************************************Delete one prudect */
function deletePro(i) {
  console.log(i);
  DB.splice(i, 1);
  localStorage.pro = JSON.stringify(DB);

  display();
}
/***********************************************Delete All prudect */
function deleteAll() {
  localStorage.clear();
  DB = [];
  display();
}
/***********************************************Update one prudect */
function update(i) {
  title.value = DB[i].title;
  price.value = DB[i].price;
  texes.value = DB[i].texes;
  ads.value = DB[i].ads;
  discount.value = DB[i].discount;
  totalPrice.value = DB[i].totalPrice;
  totalPrice.classList.remove("bg-warning");
  totalPrice.classList.add("bg-danger");
  count.style.display = "none";
  category.value = DB[i].category;

  if ((create.innerHTML = "Edit")) {
    create.classList.replace("btn-outline-primary", "btn-success");
  } else {
    create.classList.replace("btn-success", "btn-outline-primary");
  }
  mood = "Edit";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
//هنعمل مود للبحث من خلال الاسم و مود من خلال الكتالوج
let moodSearch = "title";
function searchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    moodSearch = "title";
  } else {
    moodSearch = "Category";
  }
  search.placeholder = "Search by product " + moodSearch;
  search.focus();
  search.value = "";
  display();
}

function searchProduct(values) {
  let table = ``;
  console.log(values);
  for (let i = 0; i < DB.length; i++) {
    if (moodSearch == "title") {
      if (DB[i].title.toLowerCase().includes(values.toLowerCase())) {
        table += `<tr><td>${i + 1}</td><td>${DB[i].title}</td><td>${DB[i].price}</td><td>${DB[i].texes}</td> <td>${DB[i].ads}</td><td>${DB[i].discount}</td><td>${DB[i].totalPrice.slice(13)}</td><td>${DB[i].category}</td><td><button onclick='update(${i})' class="btn btn-primary">Update</button></td><td><button onclick='deletePro(${i})' class="btn btn-danger">Delete</button></td></tr>`;
      }
    } else {
      if (DB[i].category.toLowerCase().includes(values.toLowerCase())) {
        table += `<tr><td>${i + 1}</td><td>${DB[i].title}</td><td>${DB[i].price}</td><td>${DB[i].texes}</td> <td>${DB[i].ads}</td><td>${DB[i].discount}</td><td>${DB[i].totalPrice.slice(13)}</td><td>${DB[i].category}</td><td><button onclick='update(${i})' class="btn btn-primary">Update</button></td><td><button onclick='deletePro(${i})' class="btn btn-danger">Delete</button></td></tr>`;
      }
    }
  }
  let showData = document.getElementById("showData");
  showData.innerHTML = table;
}


$(window).ready(function () {
  $('#loding').fadeOut(3000,function(){
    $('body').css('overflow', 'auto');
  });
});

wow = new WOW({
  boxClass: "wow", // default
  animateClass: "animated", // default
  offset: 0, // default
  mobile: true, // default
  live: true, // default
});
wow.init();

