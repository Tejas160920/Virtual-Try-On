document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const fileInput = document.getElementById('fileInput');
    const previewImage = document.getElementById('previewImage');
    const uploadIcon = document.getElementById('upload-image');
    const uploadText = document.getElementById('upload-text');
    const uploadBox = document.getElementById('uploadBox');
    const closeBtn = document.getElementById('closeButton');
    const tag = "ImageSet1";

    function loadRecentImages(){
      chrome.storage.local.get([tag], function(result) {
        const imageSet = result[tag] || [];
    
        if (imageSet.length > 0) {
            console.log(imageSet);
    
            const container = document.getElementById('imageContainer');
            const images = container.querySelectorAll('img');
            images.forEach(image => {
              image.remove();
            });

            imageSet.slice(-6).reverse().forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Image';
                img.style.height = '100%';
                img.style.height = '50px';
                // img.style.cursor = 'pointer'; // Optional: To visually indicate that the image is clickable
    
                // Add click event listener
                img.addEventListener('click', function() {
                    if (img.src) {
                        handleDisplayImage(img.src);
                      }
                });
    
                container.appendChild(img);
            });
        } else {
            console.log(`No images found for ${tag}`);
        }
    });
    }

    loadRecentImages();

    fileInput.addEventListener('change', async (event) => {
      handleFileUpload(event.target.files[0]);
    });
  
    uploadBox.addEventListener('dragover', (event) => {
      event.preventDefault();
      uploadBox.style.borderColor = '#aaa';
    });
  
    uploadBox.addEventListener('dragleave', () => {
      uploadBox.style.borderColor = '#ddd';
    });
  
    uploadBox.addEventListener('drop', (event) => {
      event.preventDefault();
      uploadBox.style.borderColor = '#ddd';
      const file = event.dataTransfer.files[0];
      console.log(file);
      if (file) {
        handleFileUpload(file);
      }
    });
  
    // Function to handle file upload and preview display
    function handleFileUpload(file) {
      console.log("File selected:", file.name);
      const reader = new FileReader();
      reader.onload = function(e) {

        handleDisplayImage(e.target.result);

        const base64String = e.target.result;
        chrome.storage.local.get([tag], function(result) {
            let imageSet = result[tag] || [];
            imageSet.push(base64String);
            
            chrome.storage.local.set({ [tag]: imageSet }, function() {
                console.log(`Image added to ${tag}`);
                loadRecentImages();
            });
        });


      };
      reader.readAsDataURL(file);
    }

    function handleDisplayImage(src) {
        previewImage.src = src;
        console.log(src);
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

  });

// 
//   
// 
// 
// 
// 
// 
  
  document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const fileInput = document.getElementById('fileInput2');
    const previewImage = document.getElementById('previewImage2');
    const uploadIcon = document.getElementById('upload-image2');
    const uploadText = document.getElementById('upload-text2');
    const uploadBox = document.getElementById('uploadBox2');
    const closeBtn = document.getElementById('closeButton2');

    // Existing file input change handler
    fileInput.addEventListener('change', async (event) => {
      handleFileUpload(event.target.files[0]);
    });
  
    // Drag and drop event handlers
    uploadBox.addEventListener('dragover', (event) => {
      event.preventDefault();
      uploadBox.style.borderColor = '#aaa'; // Visual feedback for drag over
    });
  
    uploadBox.addEventListener('dragleave', () => {
      uploadBox.style.borderColor = '#ddd'; // Reset visual feedback on drag leave
    });
  
    uploadBox.addEventListener('drop', (event) => {
      event.preventDefault();
      uploadBox.style.borderColor = '#ddd'; // Reset border color on drop
      const file = event.dataTransfer.files[0];
      if (file) {
        handleFileUpload(file);
      }
    });
  
    // Function to handle file upload and preview display
    function handleFileUpload(file) {
      console.log("File selected:", file.name);
      const reader = new FileReader();
      reader.onload = function(e) {
        handleDisplayImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    function handleDisplayImage(src) {
        previewImage.src = src;
        console.log(src);
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

  });

  document.addEventListener('DOMContentLoaded', () => {
    const tryonBtn = document.getElementById('try-on-btn');
    const tryonImage = document.getElementById('tryonimage');

    const humanImage = document.getElementById('previewImage');
    const clothImage = document.getElementById('previewImage2');

    const tryonImageDiv = document.getElementById("tryonimage");

    tryonBtn.addEventListener('click', (event) => {

      toggleImageBox(true);

      const imgElement = tryonImageDiv.querySelector("img");

      if (imgElement) {
        tryonImageDiv.removeChild(imgElement);
      }
    
      // Optionally, re-display the loader if needed
      const loaderContainer = tryonImageDiv.querySelector(".loader-container");
      if (loaderContainer) {
        loaderContainer.style.display = "block";
      }
    
      tryonImageDiv.style.display = "none";

      tryonImage.style.display = 'flex';
      tryonBtn.scrollIntoView({ behavior: 'smooth', block: 'start' });

      let humanImageSRC = humanImage.src;
      let clothImageSRC = clothImage.src;

      async function getImageBase64(url) {
        try {
            // Fetch the image as a blob
            const response = await fetch(url);
            const blob = await response.blob();
    
            // Convert blob to base64 using FileReader
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob); // Converts blob to base64
            });
        } catch (error) {
            console.error("Error fetching or converting image:", error);
        }
      }

      getImageBase64(clothImageSRC).then(base64 => {
        clothImageSRC = base64;

        console.log(humanImageSRC);
        console.log(clothImageSRC);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "userImageBase64": humanImageSRC,
          "garmentImageBase64": clothImageSRC,
          "description": ""
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch("http://localhost:3400/tryon", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json(); // Parse the response as JSON
        })
        .then((result) => {
          const imageUrl = result.imageData?.url;
      
          if (imageUrl) {
            const tryonImageDiv = document.getElementById("tryonimage");
            const loaderContainer = tryonImageDiv.querySelector(".loader-container");
      
            loaderContainer.style.display = "none";
      
            const imgElement = document.createElement("img");
            imgElement.id = 'fimage';
            imgElement.src = imageUrl;
            imgElement.style.width = "100%";
            imgElement.style.height = "100%";
            imgElement.style.objectFit = "contain";
            imgElement.style.display = "block";
            imgElement.style.transform = "scaleX(1.2)";

            tryonImageDiv.appendChild(imgElement);
      
            tryonImageDiv.style.display = "block";
          } else {
            console.error("Image URL not found in the response.");
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
      


      });
    })

  });
