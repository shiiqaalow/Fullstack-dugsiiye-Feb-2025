   
// fetching data dynamic from json file😊😊😊
const loadHeader = async() => {
  const response = await fetch("header.json"); 
  const data = await response.json();        
  
  const hamburger = data.header.nav[0].logo.hamburger;
  const logo = data.header.nav[0].logo.anchor;
  const navLinks = data.header.nav[0].navLinks.anchor;
  const navIcons = data.header.nav[0].navIcons;
  const cartBox = data.header.nav[0].navIcons.cartBox;
  const user = data.header.nav[0].navIcons.user;
  const darkModeToggle = data.header.nav[0].navIcons.darkModeToggle;
  const searchContainer = data.header.searchContainer;
  const menu = data.mobileMenu.links.anchor;
  const cart = data.cart;

//   creating header dynamic in javascript

const headerElement = document.querySelector(".header");
headerElement.classList.add("header");
const nav = document.createElement("div");
nav.className = "nav container";


nav.innerHTML = `
            <div class="logo">
                <div class="hamburger">
                    ${hamburger.map(bars =>
                        `<span class="${bars.class}"></span>`
                    ).join("")}
                </div>
                <a href="${logo.link}">${logo.text}</a>
            </div>
            <div class="nav-links">
                ${navLinks.map(link => 
                    `<a href="${link.link}">${link.text}</a>`
                ).join("")}
            </div>
            <div class="nav-icons">
                <button class="search-toggle">
                    <i class="${navIcons.button.icon.class}"></i>
                </button>
                <div class="cart-box">
                    <i class="${cartBox.icon.class}" id="${cartBox.icon.id}"></i>
                    <span class="${cartBox.span.class}">${cartBox.span.text}</span>
                </div>
                <div class="user">
                    <i class="${user.icon.class}"></i>
                </div>
                <div class="darkMode-toggle">
                    <i class="${darkModeToggle[0].icon.class}"></i>
                    <i class="${darkModeToggle[1].icon.class}"></i>
                </div>
            </div>
          
        <div class="dropdown-search">
            <input type="${searchContainer.input.type}" class="${searchContainer.input.class}" placeholder = "${searchContainer.input.placeholder}"/>
        </div> `
// pushing to html and DOM
headerElement.appendChild(nav);

// adding mobile menu links dynamic in js 
// using the headerElement variable mentioned above 

const mobileMenu = document.createElement("div");
mobileMenu.className = "mobile-menu";
mobileMenu.innerHTML = `
    <div class="navbar-links">
        ${menu.map(link=>
            `<a href="${link.link}"><i class="${link.icon.class}"></i>${link.text}</a>`
        ).join("")}
  </div> `
//   pushing under the header section
headerElement.insertAdjacentElement("afterend",mobileMenu);


const cartSectionElement = document.createElement("div");
  cartSectionElement.className = "cart-section";
  cartSectionElement.innerHTML = `
    <div class="cartItems">
      <h1 class="cartTitle">${cart.title}</h1>
    </div>
    <i class="fa-solid fa-xmark cart-close"></i>
    <div class="total">
      <div class="total-info">
         <p class="total-title">${cart.total.title}</p>
         <span class="total-price">${cart.total.price}</span>
      </div>
      <button class="checkout-btn">${cart.buttonText}</button>
    </div>
`;
mobileMenu.insertAdjacentElement("afterend",cartSectionElement);


// Adding Event Listeners after dynamically created

 // switching btw dark-mode and light mode
const darkModeButton = document.querySelector(".darkMode-toggle");
darkModeButton.addEventListener("click", switchToDarkMode);

function switchToDarkMode() {
    document.body.classList.toggle("dark-mode"); 
    darkModeButton.classList.toggle("active");
    // Save to localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark-mode");
    } else {
        localStorage.setItem("mode", "light-mode");
    }
}
    // Restore saved mode from localstorage when the page is loaded
const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark-mode") {
        document.body.classList.add("dark-mode");
        darkModeButton.classList.add("active"); 
    }
    

// adding eventlistener to menu/hamburger icon
const navBar = document.querySelector(".navbar-links");
const hamburgerIcon = document.querySelector(".hamburger");
hamburgerIcon.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("active");
    navBar.classList.toggle("active");
    
 if (navBar.classList.contains("active")) {
    document.body.classList.add("lock-scroll");
} else {
    document.body.classList.remove("lock-scroll");
}
});

const cartIcon = document.querySelector("#cart-icon");
const cartSection = document.querySelector(".cart-section");
const closeBtn = document.querySelector(".cart-close");

cartIcon.addEventListener("click",()=>cartSection.classList.toggle("active"));
closeBtn.addEventListener("click",()=>cartSection.classList.remove("active"));

document.querySelectorAll(".navbar-links a").forEach(link => {
  link.addEventListener("click", () => {
    navBar.classList.remove("active");
    document.body.classList.remove("lock-scroll");
  });
});


// adding eventlistener to search engine icon
const searchToggle = document.querySelector(".search-toggle");
const dropdownSearch = document.querySelector(".dropdown-search");

searchToggle.addEventListener("click", () => {
  dropdownSearch.style.display = 
    dropdownSearch.style.display === "block" ? "none" : "block";
});


}

// holds all items added to cart across all pages😊😊😊
  let cartItems = (JSON.parse(localStorage.getItem("my-cart")) || []);


const loadPage = async (pageName) => {
  const response = await fetch("Pages.json");
  const data = await response.json();
  const pageData = data[pageName];

  const main = document.querySelector("#main-content");
  main.innerHTML = "";

  if (pageName === "home") {
    // Hero Section😊😊😊
    const hero = document.createElement("section");
    hero.className = "hero-section";
    hero.innerHTML = `
      <video class="hero-bg" autoplay muted loop playsinline>
        <source src="${pageData.heroSection.videoSrc}" />
        Your browser does not support HTML5 video.
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content fadeUp">
        <h1 class="hero-title">${pageData.heroSection.title}</h1>
        <p class="hero-subtitle">${pageData.heroSection.subtitle}</p>
        <a href="${pageData.heroSection.buttonLink}" class="hero-btn">${pageData.heroSection.buttonText}</a>
      </div>`;
    main.appendChild(hero);

    // Courses Section (from home)😊😊😊
    const section = document.createElement("section");
    section.className = "courses-section container";
    section.innerHTML = `
      <h2 class="section-title fadeLeft">${pageData.coursesSection.title}</h2>
      <div class="courses-grid"></div>`;
    const grid = section.querySelector(".courses-grid");




    pageData.coursesSection.courses.forEach(course => {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card fadeRight";
      courseCard.innerHTML = `
        <div class="course-content">
          <input type="hidden" class="course-id" value="${course.id}">
          <img class="course-img" src="${course.img}"/>
          <i class="fa-solid fa-play play-btn"></i>
           <div class="course-duration">
            <i class="fa-solid fa-clock clock"></i>
            <span class="duration">${course.duration}</span>
          </div>
          <div class="course-rating">
            <i class="fa-solid fa-star star"></i>
            <span class="rating">${course.rating}</span>
          </div>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-description">${course.description}</p>
          <div class="course-action">
            <span class="course-price">${course.price}</span>
            <button class="enroll-btn">Enroll Now</button>
          </div>
          
        </div>`;
    
        const courseBtn = courseCard.querySelector(".enroll-btn");
        courseBtn.addEventListener("click",()=>{
          const courses = {
            id:courseCard.querySelector(".course-id").value,
            img: courseCard.querySelector(".course-img").src,
            name: courseCard.querySelector(".course-title").textContent,
            price: courseCard.querySelector(".course-price").textContent,
            desc: courseCard.querySelector(".course-description").textContent,
            duration: courseCard.querySelector(".course-duration .duration").textContent,
            quantity: 1
          }
          // checks if the item is already in the cart😊😊😊
          let isItInCart = cartItems.filter(item=>item.id === courses.id).length> 0;

          if(!isItInCart){
            cartItems.push(courses);
            addCoursesToCart(courses);
             saveCoursesToLs()
            localStorage.setItem("my-cart",JSON.stringify(cartItems))
          }else if(isItInCart){
            alert("This item is already in Your cart!")
          }
          console.log(isItInCart)
        })

  
  grid.appendChild(courseCard);

    });

    main.appendChild(section);


  // COURSES PAGE😊😊😊
  } else if (pageName === "courses") {
    const section = document.createElement("section");
    section.className = "courses-section container";
    section.innerHTML = `
      <h2 class="section-title fadeRight">${pageData.title}</h2>
      <div class="courses-grid"></div>`;
    const grid = section.querySelector(".courses-grid");

    pageData.courses.forEach(course => {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";
      courseCard.innerHTML = `
        <div class="course-content">
          <input type="hidden" class="course-id" value="${course.id}">
          <img class="course-img" src="${course.img}"/>
          <i class="fa-solid fa-play play-btn"></i>
          <div class="course-duration">
            <i class="fa-solid fa-clock clock"></i>
            <span class="duration">${course.duration}</span>
          </div>
          <div class="course-rating">
            <i class="fa-solid fa-star star"></i>
            <span class="rating">${course.rating}</span>
          </div>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-description">${course.description}</p>
          <div class="course-action">
            <span class="course-price">${course.price}</span>
            <button class="enroll-btn">Enroll Now</button>
          </div>
          
        </div>`;

              const courseBtn = courseCard.querySelector(".enroll-btn");
        courseBtn.addEventListener("click",()=>{
         const courses = {
            id:courseCard.querySelector(".course-id").value,
            img: courseCard.querySelector(".course-img").src,
            name: courseCard.querySelector(".course-title").textContent,
            price: courseCard.querySelector(".course-price").textContent,
            desc: courseCard.querySelector(".course-description").textContent,
            duration: courseCard.querySelector(".course-duration .duration").textContent,
            quantity: 1
          }
          // checks if the item is already in the cart😊😊😊
          let isItInCart = cartItems.filter(item=>item.id === courses.id).length> 0;

          if(!isItInCart){
            cartItems.push(courses);
            addCoursesToCart(courses);
            saveCoursesToLs()
          }else if(isItInCart){
            alert("This item is already in Your cart!")
          }
        })


      grid.appendChild(courseCard);
    });

    main.appendChild(section);
  }

  // 404 fallback😊😊😊
  else {
    main.innerHTML = `<p class="error">Page not found</p>`;
  }
};


// this function sets active class to highlight current page
function setActiveNavLink() {
  const currentHash = window.location.hash || "#home";
  document.querySelectorAll(".nav-links a, .navbar-links a").forEach(link=>{

    if (link.getAttribute("href") === currentHash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }) 
  
}


// this function is global scope 😊😊😊
// it can add items to cart across all pages😊😊😊
const addCoursesToCart = (courses)=> {
    const cartItemsContainer = document.querySelector(".cartItems");
    const cartItem = document.createElement("div");
    cartItem.className = "cartItem";
    cartItem.innerHTML= `
      <img src="${courses.img}"/>
        <div class="cartItem-info">
          <input type="hidden" class="course-id" value="${courses.id}">
          <h2 class="cartItem-name">${courses.name}</h2>
          <span class="cartItem-price"> ${courses.price}</span>
        </div>
        <div class="cartItem-buttons">
          <i class="fa-solid fa-minus decrease-quantity"></i>
          <span class="cartItem-quantity">${courses.quantity}</span>
          <i class="fa-solid fa-plus increase-quantity"></i>
        </div>
        <div class="cart-remove">
          <i class="fa-solid fa-trash remove-cartItem"> </i>
        </div>
    `
  
 const quantityElement = cartItem.querySelector(".cartItem-quantity");
 const incrementBtn =  cartItem.querySelector(".increase-quantity");
 const decrementBtn =  cartItem.querySelector(".decrease-quantity");

 let quantity = parseInt(quantityElement.textContent);

 if(quantity ===1) decrementBtn.style.color = "#05a0a0";

 incrementBtn.addEventListener("click",()=>{
    quantity ++ ;
    quantityElement.textContent = quantity;
    decrementBtn.style.color = "black";

        const index = cartItems.findIndex(item => item.id === courses.id);
    if (index !== -1) cartItems[index].quantity = quantity;

    updateCartCounter()
    updateTotalPrice()
    saveCoursesToLs()
 }) ;  

 decrementBtn.addEventListener("click",()=>{
    if(quantity >1){
      quantity -- ;
      quantityElement.textContent = quantity;

      // updates in local storage real time
      const index = cartItems.findIndex(item => item.id === courses.id);
      if (index !== -1) cartItems[index].quantity = quantity;
      if (quantity === 1) decrementBtn.style.color = "#05a0a0";

      updateCartCounter()
      updateTotalPrice()
      saveCoursesToLs()
    }
  
 }) ;  



// adding event listener to trash pin to delete items
    cartItem.querySelector(".remove-cartItem").addEventListener("click",()=>{
      // Remove the item from the DOM only
    cartItem.remove()
      // Remove the item from the array in localstorage(by filtering)
     cartItems = cartItems.filter(item => item.id !== courses.id);
      updateCartCounter()
      updateTotalPrice()
      saveCoursesToLs()
  })

     cartItemsContainer.appendChild(cartItem);
     updateCartCounter()
     updateTotalPrice()
     saveCoursesToLs()
     
  }

  const saveCoursesToLs = () =>{
    localStorage.setItem("my-cart",JSON.stringify(cartItems));
  }


  const loadCart = ()=> {
    if(cartItems.length>0){
      cartItems.forEach(courses=>{
        addCoursesToCart(courses)
      })
      
    }
  }





const updateCartCounter = ()=>{
  const cartItemCounter = document.querySelector(".cart-count")
let cartCounter = 0;

cartItems.forEach(item =>{
  cartCounter += item.quantity;

})

  if(cartCounter>0){
    cartItemCounter.style.visibility = "visible";
    cartItemCounter.textContent = cartCounter;
  }else{
    cartCounter = 0;
    cartItemCounter.style.visibility = "hidden";
    cartItemCounter.textContent = "";

  }
}


const updateTotalPrice = () => {
  const totalPriceEl = document.querySelector(".total-price");
  const cartItems = document.querySelectorAll(".cartItem");
  
  let total = 0;

  cartItems.forEach(item => {
    const priceText = item.querySelector(".cartItem-price").textContent.trim().replace("$", "");
    const quantityText = item.querySelector(".cartItem-quantity").textContent.trim();

    const price = parseFloat(priceText);
    const quantity = parseInt(quantityText);

    if ((price) &&(quantity)) {
      total += price * quantity;
    }
  });

  totalPriceEl.textContent = `$${total.toFixed(2)}`;
};




// this issue  fixed by chat-gpt😊😊😊

// cuz i called load page and header outside its own () to display on the DOM  
// that makes pages to reload first with letting header been created
// so nothing to display on the DOM 😊😊😊


// Listen for hash change
// window.addEventListener("hashchange", handleRouting);
// Load header and page once the DOM is ready😊😊😊
window.addEventListener("DOMContentLoaded", () => {
  if (!window.location.hash) {
    window.location.hash = "#home";
  }

  loadHeader().then(() => {
    handleRouting(); // Run router after header is ready😊😊😊
    loadCart()
  });
});

// Listen for hash change😊😊😊
// window.addEventListener("hashchange", handleRouting);
// Load header and page once the DOM is ready
window.addEventListener("hashchange", handleRouting);

// Routing logic
function handleRouting() {
  const hash = window.location.hash.replace("#", "") || "home";
  loadPage(hash);
  setActiveNavLink();
}

