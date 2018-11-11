const fakeImageAPI = () => {
    const sizes = [
        { width: 640, height: 480, isPortrait: false, placeholderUrl: 'img/placeholder/4x3.png' },
        { width: 480, height: 640, isPortrait: true, placeholderUrl: 'img/placeholder/3x4.png' },
        { width: 800, height: 450, isPortrait: false, placeholderUrl: 'img/placeholder/16x9.png' },
        { width: 450, height: 800, isPortrait: true, placeholderUrl: 'img/placeholder/9x16.png' },
        { width: 1000, height: 428, isPortrait: false, placeholderUrl: 'img/placeholder/21x9.png' },
        { width: 428, height: 1000, isPortrait: true, placeholderUrl: 'img/placeholder/9x21.png' }
    ];
    const randomSizeIndex = Math.round(Math.random() * (sizes.length - 1));
    const sizeData = sizes[randomSizeIndex];
    const randomImageNumber = 10 + Math.round(Math.random() * 70);
    const url = `https://picsum.photos/${sizeData.width}/${sizeData.height}/?image=${randomImageNumber}`;
    const imageData = {
        isPortrait: sizeData.isPortrait,
        sources: [
            {
                media: '(max-width: 414px)',
                'data-srcset': url,
                srcset: sizeData.placeholderUrl
            },
            {
                media: '(min-width: 415px)',
                'data-srcset': url,
                srcset: sizeData.placeholderUrl
            }
        ],
        img: {
            src: url,
            width: sizeData.width,
            height: sizeData.height,
            alt: ''
        }
    }

    return imageData;
};
