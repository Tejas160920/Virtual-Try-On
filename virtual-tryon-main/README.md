# Virtual Clothes Try-on
<h4>How to use this yourself:</h4>

<p style="color:red;">Note: We were unable to deploy the backend on time. Judges will have to do it on localhost or on my machine</p>

<h3>Pre-requisites</h3>

1. node.js installed on your computer
2. FAL-AI IDM-VTON API Key from here https://fal.ai/models/fal-ai/idm-vton

1. Download the zip and extract it
2. You will see 2 folders "tryonn-backend" and "extension3"
3. Go inside "tryonn-backend" using terminal and run 'npm install'
4. Create a file named '.env'
5. Paste FAL_KEY=<YOUR_API_KEY> and save it
6. Run 'node server.js'
7. You will see a server running at port localhost:3400
8. Open  Chrome -> chrome://extensions/ -> Enable developer mode
9. Load unpacked -> select the folder "extension3"
10. Now you can use the extension that is installed.
