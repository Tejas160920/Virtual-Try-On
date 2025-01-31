window.addEventListener('message', function(event) {
    if (event.data.type === 'UPDATE_IMAGE') {
        const previewImage = document.getElementById('previewImage2');
        const uploadIcon = document.getElementById('upload-image2');
        const uploadText = document.getElementById('upload-text2');
        const closeBtn = document.getElementById('closeButton2');
        
        if (previewImage) {
            previewImage.src = event.data.imageSrc;
            previewImage.style.display = 'block';
    
            previewImage.onload = () => {
                const { naturalWidth, naturalHeight } = previewImage;
                const aspectRatio = naturalWidth / naturalHeight;
                const containerWidth = previewImage.parentElement.clientWidth;
                const containerHeight = previewImage.parentElement.clientHeight;
        
                let imageWidth, imageHeight;
        
                // Calculate the displayed image size based on the aspect ratio and container dimensions
                if (containerWidth / containerHeight > aspectRatio) {
                    imageHeight = containerHeight;
                    imageWidth = containerHeight * aspectRatio;
                } else {
                    imageWidth = containerWidth;
                    imageHeight = containerWidth / aspectRatio;
                }
        
                closeBtn.style.top = `${(containerHeight - imageHeight) / 2 + 4}px`;
                closeBtn.style.left = `${(containerWidth + imageWidth) / 2 - 28}px`;
                closeBtn.style.display = 'block';
            };
    
            uploadIcon.style.display = 'none';
            uploadText.style.display = 'none';
        }
  
        closeBtn.addEventListener('click', async (event) => {
          previewImage.style.display = 'none';
          closeBtn.style.display = 'none';
          closeBtn.style.top = '5px';
          closeBtn.style.left = '5px';
  
          uploadIcon.style.display = 'block';
          uploadText.style.display = 'block';
      });
    }
  
    if (event.data.type === 'PICKER_ACTIVE') {
      console.log("reached");
  
      const eyedropImg = document.getElementById('upload-image3');
      const eyedropText = document.getElementById('upload-text3');
      const pickerBox = document.getElementById('image-picker-box');
  
      eyedropImg.src = "remove.png";
      eyedropText.textContent = "Tap to cancel picking";
      pickerBox.style.backgroundColor = "pink";
      pickerBox.style.border = "2px dashed red";
    }
  
    if (event.data.type === 'PICKER_NOT_ACTIVE') {
      console.log("reached");
  
      const eyedropImg = document.getElementById('upload-image3');
      const eyedropText = document.getElementById('upload-text3');
      const pickerBox = document.getElementById('image-picker-box');
  
      eyedropImg.src = "picker.png";
      eyedropText.textContent = "Pick a image from the website";
      pickerBox.style.backgroundColor = "white";
      pickerBox.style.border = "2px dashed #ddd";
    }
  
  });

  function toggleImageBox(show) {
    window.parent.postMessage({
        type: 'TOGGLE_HEIGHT',
        showImageBox: show
    }, '*');
}