

// PROJECT IS FROM A YOUTUBE TUTORIAL CHANNEL "LAMADEV"  

const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        cat: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        cat: "Casual",
    },
];


let productsContainer = document.querySelector(".products")
let searchInput = document.querySelector(".search")
let categoriesContainer = document.querySelector(".categ")
let priceRange = document.querySelector(".priceRange")
let priceValue = document.querySelector(".priceValue")


let displayProducts = (filteredProducts) => {

    productsContainer.innerHTML = filteredProducts.map((product) => 

        `
        <div class="product">
                    <img src=${product.img} alt="">
                    <span class="name">${product.name}</span>
                    <span class="pricetext">$${product.price}</span>
        </div>
        
        `
    ).join("")
}

displayProducts(data)


searchInput.addEventListener("keyup" , (e) => {

    let value = e.target.value.toLowerCase()

    if (value){

        displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1 ))

        // it means =>  search m jo value ho wo agar products k index sai match ho or wo -1 k equal naa ho.
        // example :   let larka = "chopra"
        //             console.log(larka.indexOf("p"))    => output: 3
        //             console.log(larka.indexOf("z"))    => output: -1

    }
    else{
        displayProducts(data)
    }
})


let selectedCategories = () => {

    let allCateg = data.map(item => item.cat)
    let categories = [
        "All",
        ...allCateg.filter((item,i)=>{
            return allCateg.indexOf(item) === i
        })]
    
    categoriesContainer.innerHTML = categories.map(item =>
        `
        <span class= "cat">${item}</span>
        `
    ).join("")

    categoriesContainer.addEventListener("click", (e)=>{
        const selectedCat = e.target.textContent

        selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter(item =>
            item.cat === selectedCat
        ))
    })
}


let setPrice = () => {
    let pricelist = data.map((item) => item.price)
    let maxPrice  = Math.max(...pricelist)            // Math.max(2,3)   | output : 3  || Math.max([2,3]) | output : NAn   solution=> Math.max(...[2,3]) 
    let minPrice  = Math.min(...pricelist)

    priceRange.min = minPrice 
    priceRange.max = maxPrice
    priceValue.textContent = "$" + maxPrice 

    priceRange.addEventListener("input" ,(e) => {
        priceValue.textContent = "$" + e.target.value

        displayProducts(data.filter(item => item.price <= e.target.value))
    })


}

selectedCategories()
setPrice()