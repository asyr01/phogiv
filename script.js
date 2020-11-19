const imageContainer = document.getElementById('image-container');
const laoder = document.getElementById('loader');

let photosArray = [];

// Unsplash API

const count = 10;
const apiKey = 'YOUR_API_KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Helper function to set Attrinutes on DOM  elements.
function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key])
    console.log(attributes[key]);
  }
}

// Create Elements for links and photos, and add that to the DOM.
function displayPhotos() {
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

// On Load
getPhotos();