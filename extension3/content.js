chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_IFRAME') {
        const overlay = document.getElementById('custom-overlay');
        if (overlay) {
            overlay.contentWindow.postMessage({
                type: 'UPDATE_IMAGE',
                imageSrc: message.imageSrc
            }, '*');
        }
    }

    if (message.type === 'PICKER_ACTIVE') {
        const overlay = document.getElementById('custom-overlay');
        if (overlay) {
            overlay.contentWindow.postMessage({
                type: 'PICKER_ACTIVE'
            }, '*');
        }
    }

    if (message.type === 'PICKER_NOT_ACTIVE') {
        const overlay = document.getElementById('custom-overlay');
        if (overlay) {
            overlay.contentWindow.postMessage({
                type: 'PICKER_NOT_ACTIVE'
            }, '*');
        }
    }
});

// let overlay = null; // To track the overlay element

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === "toggleOverlay") {
//         if (overlay) {
//             // If overlay exists, remove it
//             overlay.remove();
//             overlay = null; // Reset the reference
//         } else {
//             // If overlay doesn't exist, create it
//             overlay = document.createElement('div');
//             overlay.style.position = 'fixed';
//             overlay.style.top = '0';
//             overlay.style.right = '0';
//             overlay.style.width = '300px';
//             overlay.style.height = '600px';
//             overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
//             overlay.style.zIndex = '9999';
//             overlay.style.display = 'flex';
//             overlay.style.alignItems = 'center';
//             overlay.style.justifyContent = 'center';
//             overlay.style.color = 'white';
//             overlay.style.fontSize = '20px';
//             overlay.textContent = 'Overlay Active';
//             document.body.appendChild(overlay);
//         }
//     }
// });
