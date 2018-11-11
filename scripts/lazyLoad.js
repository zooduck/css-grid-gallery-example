// Replace placeholder with the actual image once it enters the viewport
const lazyLoadImage = (imgEl, intersectionRatio = null) => {

    let sourceEls = Array.from(imgEl.parentNode.querySelectorAll('source'));
    if (sourceEls.length > 0) {
        Array.from(sourceEls).forEach((sourceEl) => {
            sourceEl.srcset = sourceEl.dataset.srcset;
        });

        imgEl.onload = () => {
            // Remove width attribute to prevent images less wide than their container being upscaled
            // NOTE: The width attribute is being set so that the placeholder image fills the grid space
            imgEl.removeAttribute('width');

            if (imgEl.hasAttribute('is-portrait')) {
                // Set width of portrait images to 100%
                // --------------------------------------------------------------
                // NOTE: We need to apply this class AFTER the image has loaded
                // or the placeholder image will not fill the grid space
                // --------------------------------------------------------------
                imgEl.classList.add('image-container__image-portrait');
            }

        }
    }
    console.log(`lazyLoad triggered for ${imgEl.src} at intersectionRatio of ${intersectionRatio}`);
};

// ==============================================================================
// Use IntersectionObserver to determine when an image has entered the viewport
// ==============================================================================
const lazyLoaded = [];
const intersectHandler = (entries, observer) => {
    entries.forEach((item) => {
        if (item.isIntersecting && item.intersectionRatio >= .50) {
            // Note: We should not have to query the intersectionRatio here
            // but Microsoft Edge does not currently respect the threshold property
            // and invokes the callback as soon as the element enters the viewport
            let lazyLoadedItem = lazyLoaded.find((i) => i.target === item.target);
            if (!lazyLoadedItem) {
                lazyLoadImage(item.target.querySelector('img'), item.intersectionRatio);
                intersectionObserver.unobserve(item.target);
            }
            lazyLoaded.push({
                target: item.target
            });
        }
    });
};
const intersectionObserver = new IntersectionObserver(intersectHandler, {
    root: null,
    threshold: [.50]
});

const IMAGES = document.querySelectorAll('img');
const IMAGE_CONTAINERS = document.querySelectorAll('.image-container');
if ('IntersectionObserver' in window) {
    Array.from(IMAGE_CONTAINERS).forEach((item) => {
        intersectionObserver.observe(item);
    });
} else {
    // IntersectionObserver fallback
    Array.from(IMAGES).forEach((item) => {
        lazyLoadImage(item);
    });
    console.warn('IntersectionObserver not supported');
}
