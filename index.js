const express = require('express');
const path = require('path');
const { createAudioFile, getAudioBuffer } = require('simple-tts-mp3');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to create an MP3 file from text
app.post('/create-audio', express.json(), async (req, res) => {
    const { text, fileName } = req.body;
    try {
        const filePath = await createAudioFile(text, fileName, 'en');
        res.json({ message: 'MP3 file created', filePath });
    } catch (error) {
        console.error('Error creating MP3 file:', error);
        res.status(500).json({ error: 'Failed to create MP3 file' });
    }
});

// API endpoint to get an MP3 audio buffer from text
app.post('/get-audio-buffer', express.json(), async (req, res) => {
    const { text } = req.body;
    try {
        const buffer = await getAudioBuffer(text, 'en');
        res.set('Content-Type', 'audio/mpeg');
        res.send(buffer);
    } catch (error) {
        console.error('Error creating audio buffer:', error);
        res.status(500).json({ error: 'Failed to create audio buffer' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
