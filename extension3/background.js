chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: toggleOverlay
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'IMAGE_PICKED') {
        // Forward the message to the iframe
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'UPDATE_IFRAME',
                    imageSrc: message.imageSrc
                });
            }
        });
    }

    if (message.type === 'PICKER_ACTIVE') {
        // Forward the message to the iframe
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'PICKER_ACTIVE'
                });
            }
        });
    }

    if (message.type === 'PICKER_NOT_ACTIVE') {
        // Forward the message to the iframe
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'PICKER_NOT_ACTIVE'
                });
            }
        });
    }
});

// function toggleOverlay() {
//     let overlay = document.getElementById('custom-overlay');
//     if (overlay) {
//         overlay.remove();
//     } else {
//         const overlayUrl = chrome.runtime.getURL('popup.html');
//         const overlay = document.createElement('iframe');
//         overlay.src = overlayUrl;
//         overlay.id = 'custom-overlay';
//         overlay.style.position = 'fixed';
//         overlay.style.top = '0';
//         overlay.style.right = '0';
//         overlay.style.width = '360px';
//         overlay.style.height = '600px';
//         // overlay.style.border = '2px solid red';
//         overlay.style.zIndex = '9999';
//         overlay.style.borderRadius = '8px';
//         overlay.style.backgroundColor = 'transparent';
//         // overlay.style.backgroundColor = 'gray';
//         document.body.appendChild(overlay);
//     }
// }

function toggleOverlay() {
    let overlay = document.getElementById('custom-overlay');
    if (overlay) {
        overlay.remove();
    } else {
        const overlayUrl = chrome.runtime.getURL('popup.html');
        overlay = document.createElement('iframe');
        overlay.src = overlayUrl;
        overlay.id = 'custom-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.right = '0';
        overlay.style.width = '360px';
        overlay.style.height = '512px'; // Default height
        overlay.style.zIndex = '9999';
        overlay.style.borderRadius = '12px';
        overlay.style.backgroundColor = 'transparent';

        // Listen for messages from the iframe to adjust height
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'TOGGLE_HEIGHT') {
                const newHeight = event.data.showImageBox ? '600px' : '512px';
                overlay.style.height = newHeight;
            }
        });

        document.body.appendChild(overlay);
    }
}
