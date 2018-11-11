const gallery = [];
const dynamicGalleryGrid = document.querySelector('#dynamicGalleryGrid');
for (let i = 0; i < 12; i++) {
    let pictureData = Object.assign({}, fakeImageAPI());
    gallery.push(new ImageContainer(pictureData));
}
gallery.forEach((imageContainerEl) => {
    dynamicGalleryGrid.appendChild(imageContainerEl);
});
// ====================
// <noscript> handler!
// ====================
// NOTE: This no longer has any effect, as the gallery is being rendered dynamically (so requires JS)
const imageContainerEls = document.querySelectorAll('.image-container');
Array.from(imageContainerEls).forEach((item) => {
    item.setAttribute('js-active', '');
});
