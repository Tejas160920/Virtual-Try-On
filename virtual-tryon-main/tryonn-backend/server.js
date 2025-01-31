require('dotenv').config(); // Load environment variables
const express = require('express');
const { fal } = require('@fal-ai/client');
const app = express();
const PORT = process.env.PORT || 3400;

// Configure fal client with the API key
fal.config({ credentials: process.env.FAL_KEY });
console.log(process.env.FAL_KEY);

// Middleware to parse JSON requests with increased size limit
app.use(express.json({ limit: '50mb' })); // Increase body size limit to 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For URL-encoded data


app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Endpoint to handle try-on requests
app.post('/tryon', async (req, res) => {
    const { userImageBase64, garmentImageBase64, description } = req.body;

    try {
        // Send the images to FAL API using Base64 Data URIs
        const result = await fal.subscribe("fal-ai/idm-vton", {
            input: {
                human_image_url: `${userImageBase64}`,   // User image as a Base64 Data URI
                garment_image_url: `${garmentImageBase64}`, // Garment image as a Base64 Data URI
                description: description || "Clothing item"
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    console.log("Processing in progress...");
                }
            }
        });

        console.log(result);

        // Return the processed image data directly in Base64
        res.json({
            imageData: {
                url: result.data.image.url,
                contentType: result.data.image.content_type,
                fileName: result.data.image.file_name,
                fileSize: result.data.image.file_size,
                width: result.data.image.width,
                height: result.data.image.height
            },
            maskData: {
                url: result.data.mask.url,
                contentType: result.data.mask.content_type,
                fileName: result.data.mask.file_name,
                fileSize: result.data.mask.file_size,
                width: result.data.mask.width,
                height: result.data.mask.height
            }
        });
        

    } catch (error) {
        console.error("Error processing images:", error);
        res.status(500).send("Image processing failed");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
