const header = document.querySelector("header")
const hamSpans = document.querySelectorAll("span")
const menuBtn = document.getElementById("ham")
const navLinks = document.getElementById("navLinks")
const gallery = document.getElementById("gallery")
const searchInput = document.getElementById("input")
const submitBtn = document.getElementById("submit")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")
const modalContainer = document.getElementById("modal")


//Api config
const apiKey = "1c3HzNXWDXN2d3pdkshVn5GrPV7Dd5TIDZ0JoIWf9NgQQ5ZgtlDFLUfQ"
const ApiUrl = "https://api.pexels.com/v1/"

// Api authentication
const options = {
    method: "GET",
    headers: {
        "Authorization": `${apiKey}`
    }
}
let pagination = 1;
let currentKeyword = "";
let isSearchActive = false;
window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.classList.add("scrolled")
        hamSpans.forEach((span) => {
            span.style.backgroundColor = "black"
        })
    } else {
        header.classList.remove("scrolled")
        hamSpans.forEach((span) => {
            span.style.backgroundColor = "white"
        })
    }

})
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open")
    navLinks.classList.toggle("open")
})

async function fetchPhotos() {
    try {
        const response = await fetch(`${ApiUrl}curated/?page=${pagination}&per_page=9`, options)
        const data = await response.json();
        // console.log(data)
        gallery.innerHTML = ""
        const photos = data.photos;
        photos.forEach((photo) => {
            const div = document.createElement("div")
            div.className = "grid-item"
            const img = document.createElement("img")
            img.src = photo.src.original;
            img.alt = photo.photographer;
            div.appendChild(img)
            gallery.appendChild(div)
        })
    } catch (error) {
        console.log(`Opps Something went wrong: `, error)
    }
}
fetchPhotos()


async function searchPhotos(keyword) {
    try {
        const response = await fetch(`${ApiUrl}search/?page=${pagination}&per_page=13&query=${keyword}`, options)
        const data = await response.json();
        // console.log(data)
        gallery.innerHTML = "";
        const photos = data.photos;
        photos.forEach((photo) => {
            const div = document.createElement("div")
            div.className = "grid-item"
            const img = document.createElement("img")
            img.src = photo.src.original;
            img.alt = photo.photographer;
            div.appendChild(img)
            gallery.appendChild(div)
        })
    } catch (error) {
        console.log(`Opps Something went wrong: `, error)
    }
}
// function for scrolling back to gallery
function scrollToGallery() {
    const galleryPosition = gallery.getBoundingClientRect().top * window.scrollY;
    window.scrollTo({
        top: galleryPosition - 100,
        behavior: "smooth"
    })
}
submitBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toString().trim();
    if (keyword === "") {
        alert(`You must provide search keywords.`)
        return
    }
    currentKeyword = keyword;
    pagination = 1;
    isSearchActive = true;
    searchPhotos(currentKeyword)
    scrollToGallery()
})

nextBtn.addEventListener("click", () => {
    pagination++
    if (isSearchActive) {
        searchPhotos(currentKeyword)
    } else {
        fetchPhotos()
    }
    scrollToGallery()
})
prevBtn.addEventListener("click", () => {
    if (pagination > 1) {
        pagination--
    }
    if (isSearchActive) {
        searchPhotos(keyword)
    } else {
        fetchPhotos()
    }
    scrollToGallery()
})


