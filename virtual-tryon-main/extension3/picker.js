document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#image-picker-box').addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: initImagePicker,
            });
        }
    });
});

function initImagePicker() {
    if (!window.cleanupImagePicker) {
        window.cleanupImagePicker = function() {
            console.log("Cleaning up image picker...");
            
            if (window.mouseMoveHandler) {
                document.removeEventListener('mousemove', window.mouseMoveHandler);
                window.mouseMoveHandler = null;
            }
            if (window.clickHandler) {
                document.removeEventListener('click', window.clickHandler);
                window.clickHandler = null;
            }
            
            if (window.prevDOM) {
                window.prevDOM.classList.remove('crx_mouse_visited');
                window.prevDOM = null;
            }
            
            document.querySelectorAll('.crx_mouse_visited').forEach(el => {
                el.classList.remove('crx_mouse_visited');
            });
            
            window.imagePickerInitialized = false;


            function offPickingUI(){
                chrome.runtime.sendMessage({
                    type: 'PICKER_NOT_ACTIVE'
                });
            }

            offPickingUI();
        };
    }

    try {
        console.log("Initializing Image Picker");

        if (window.imagePickerInitialized) {
            console.log("Picker already initialized, cleaning up...");
            window.cleanupImagePicker();
            return;
        }

        function onPickingUI(){
            chrome.runtime.sendMessage({
                type: 'PICKER_ACTIVE'
            });
        }

        onPickingUI();

        window.mouseMoveHandler = function(e) {
            let srcElement = e.srcElement;

            if (window.prevDOM !== srcElement && srcElement.nodeName === 'IMG') {
                if (window.prevDOM) {
                    window.prevDOM.classList.remove('crx_mouse_visited');
                }

                srcElement.classList.add('crx_mouse_visited');
                window.prevDOM = srcElement;
            } else if (window.prevDOM && srcElement.nodeName !== 'IMG') {
                window.prevDOM.classList.remove('crx_mouse_visited');
                window.prevDOM = null;
            }
        };

        window.clickHandler = function(e) {
            if (e.target.nodeName === 'IMG') {
                const imageSrc = e.target.currentSrc;
                console.log(`Clicked image source: ${imageSrc}`);

                // Instead of directly manipulating DOM, send a message
                chrome.runtime.sendMessage({
                    type: 'IMAGE_PICKED',
                    imageSrc: imageSrc
                });

                window.cleanupImagePicker();
            }
        };

        document.addEventListener('mousemove', window.mouseMoveHandler, false);
        document.addEventListener('click', window.clickHandler, false);
        
        window.imagePickerInitialized = true;

    } catch (err) {
        console.error("Error in initImagePicker function:", err);
        window.cleanupImagePicker();
    }
}