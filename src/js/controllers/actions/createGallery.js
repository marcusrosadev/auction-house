// dynamicImageFields.js
export function setupDynamicImageFields() {
  document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('#add-image-button');
    const galleryContainer = document.querySelector('#gallery-container');
    let imageCounter = 1;
  
    if(addButton && galleryContainer) {
      addButton.addEventListener('click', () => {
        imageCounter++;
        const newImageUrlInput = document.createElement('input');
        newImageUrlInput.type = 'url';
        newImageUrlInput.className = 'form-control image-url mb-2';
        newImageUrlInput.id = `image-url-${imageCounter}`;
        newImageUrlInput.placeholder = 'Image URL';
        newImageUrlInput.name = 'image-url[]';
    
        galleryContainer.appendChild(newImageUrlInput);
      });
    }
  });
}

(function() {
  setupDynamicImageFields();
})();