const radios = document.querySelectorAll('input[type=radio]');
Array.from(radios).forEach((item) => {
    item.addEventListener('click', function() {
        if (this.value == 1) {
            dynamicGalleryGrid.classList.add('grid--strict');
        } else {
            dynamicGalleryGrid.classList.remove('grid--strict');
        }
    });
});
