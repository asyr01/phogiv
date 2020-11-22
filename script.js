const imageContainer = document.getElementById('image-container');
const laoder = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

let count = 30;
const apiKey = config.API_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images loaded.
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages) {
    ready = true; 
    // for first time, so we will have an illussion like forever.
    laoder.hidden = true;
    console.log('ready =', ready);
  } else {
    ready = false;
  }
}

// Helper function to set Attrinutes on DOM  elements.
function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key])
  }
}

// Create Elements for links and photos, and add that to the DOM.
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //For each object run function.
  photosArray.forEach((photo) => {
      // Create <a> to link to Unsplash.
    const item = document.createElement('a');
       setAttributes(item, {
         href: photo.links.html,
         target: '_blank',
       });
      // Create <img> for photo
    const img = document.createElement('img');
        setAttributes(img, {
         src: photo.urls.regular,
         alt: photo.alt_description,
         title: photo.alt_description,
        });

     // Event listener for if is finished loading.
     img.addEventListener('load', imageLoaded)

     // Put <img> inside <a>, then display them in th DOM.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}


// Get photos from Unsplah API
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      console.log(photosArray);
      displayPhotos();
    } catch {
     // Catching Errors
    }
}

// Check to see if scroilling near bottom of page, if it is load more photos.
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready === true) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();