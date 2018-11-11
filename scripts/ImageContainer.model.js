const ImageContainer = function(pictureData = {}) {

    const buildImageOrientationIcon = () => {
        const icon = document.createElement('i');
        icon.classList.add('material-icons', 'image-container__icon');
        if (pictureData.isPortrait) {
            icon.innerHTML = 'crop_portrait';
        } else {
            icon.innerHTML = 'crop_landscape';
        }
        return icon;
    };

    const buildImageContainer = () => {
        const imageContainerDiv = document.createElement('div');
        imageContainerDiv.classList.add('image-container');
        if (pictureData.isPortrait) {
            imageContainerDiv.classList.add('image-container--portrait');
        }
        imageContainerDiv.id = '_' + Math.random().toString().substr(2);
        const icon = buildImageOrientationIcon();
        imageContainerDiv.appendChild(icon);
        return imageContainerDiv;
    };

    const buildPictureElement = () => {
        return document.createElement('picture');
    };

    const buildSourceElement = (sourceData = {}) => {
        const sourceEl = document.createElement('source');
        for (let prop in sourceData) {
            let propVal = sourceData[prop];
            sourceEl.setAttribute(prop, propVal);
        }
        return sourceEl;
    };

    const getRandomRGBA = (alpha = 0.65) => {
        return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)}, ${alpha})`;
    };

    const buildImageElement = (imgData = {}, isPortrait = false) => {
        const imgEl = new Image();
        for (let prop in imgData) {
            imgEl.setAttribute(prop, imgData[prop]);
        }
        if (isPortrait) {
            imgEl.setAttribute('is-portrait', 'is-portrait');
        }
        imgEl.style.backgroundColor = getRandomRGBA();
        return imgEl;
    };
   
    const imageContainerEl = buildImageContainer();
    const pictureEl = buildPictureElement();
    
    imageContainerEl.appendChild(pictureEl);   

    if (pictureData.sources) {
        pictureData.sources.forEach((source)=> {
            const sourceEl = buildSourceElement(source, pictureData.isPortrait);
            pictureEl.appendChild(sourceEl);
        });
    }

    if (pictureData.img) {
        const imgEl = buildImageElement(pictureData.img, pictureData.isPortrait);
        pictureEl.appendChild(imgEl);
    }

    const buildFocusAreaIcon = () => {
        const iconEl = document.createElement('i');
        iconEl.classList.add('material-icons', 'image-container__focus-area-clickable__icon');
        iconEl.innerHTML = 'adjust';
        return iconEl;
    };

    const buildFocusAreaClickableEls = (pictureData = {}) => {
        const stylesPortrait = [
            {
                className: 'north',
                top: '0',
                height: '25%',
                width: '100%'
            },
            {
                className: 'center',
                top: '25%',
                height: '50%',
                width: '100%'
            },
            {
                className: 'south',
                top: '75%',
                height: '25%',
                width: '100%'
            }
        ];
        const stylesLandscape = [
            {
                className: 'east',
                right: '0',
                width: '25%',
                height: '100%'
            },
            {
                className: 'center',
                left: '25%',
                width: '50%',
                height: '100%'
            },
            {
                className: 'west',
                left: '0',
                width: '25%',
                height: '100%'
            }
        ];
        const styles = pictureData.isPortrait ? stylesPortrait : stylesLandscape;
        const positionModifierPattern = pictureData.isPortrait ? /image-container--portrait-.+/g : /image-container--landscape-.+/g;
        const els = styles.map( style => {
            const spanEl = document.createElement('span');
            spanEl.classList.add('image-container__focus-area-clickable');
            spanEl.style.position = 'absolute';
            spanEl.style.top = style.top || '0';
            spanEl.style.left = style.left || 'auto';
            spanEl.style.right = style.right || 'auto';
            spanEl.style.height = style.height;
            spanEl.style.width = style.width;
            spanEl.classList.add(style.className);

            const modifier = style.className;

            const iconEl = buildFocusAreaIcon();

             // closure not necessary here, would be if we used var instead of const/let
             (function(){
                iconEl.onclick = function(e) {
                    const imageOrientation = pictureData.isPortrait ? 'portrait' : 'landscape';
                    e.target.parentNode.parentNode.className = e.target.parentNode.parentNode.className.replace(positionModifierPattern, '');
                    e.target.parentNode.parentNode.classList.add(`image-container--${imageOrientation}-${modifier}`);
                }
            })(positionModifierPattern, pictureData, modifier);

            spanEl.appendChild(iconEl);

            return spanEl;
        });
        return els;
    };

    buildFocusAreaClickableEls(pictureData).forEach( el => imageContainerEl.appendChild(el));

    return imageContainerEl;
}
