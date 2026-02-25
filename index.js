const express = require('express');
const path = require('path');
const fs = require('fs');
const { createAudioFile } = require('simple-tts-mp3');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure the audio output directory exists inside public/ so it's web-accessible
const audioDir = path.join(__dirname, 'public', 'audio');
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// POST /create-audio — generate an MP3 from text and return a web-accessible URL
app.post('/create-audio', express.json(), async (req, res) => {
    const { text, fileName } = req.body;

    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Text is required.' });
    }
    if (!fileName || !fileName.trim()) {
        return res.status(400).json({ error: 'File name is required.' });
    }

    // Sanitize fileName: strip path characters, limit length
    const safeName = fileName.trim().replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 100);
    const destPath = path.join(audioDir, `${safeName}.mp3`);

    try {
        // createAudioFile saves the file and returns its local path
        const generatedPath = await createAudioFile(text, safeName, 'en');

        // Move/rename the file into public/audio/ if it wasn't saved there already
        const resolvedGenerated = path.resolve(generatedPath);
        const resolvedDest = path.resolve(destPath);
        if (resolvedGenerated !== resolvedDest) {
            fs.copyFileSync(resolvedGenerated, resolvedDest);
            try { fs.unlinkSync(resolvedGenerated); } catch (_) { /* ignore */ }
        }

        // Return a relative URL so the browser can load the audio via Express static
        res.json({ message: 'MP3 file created successfully!', filePath: `/audio/${safeName}.mp3` });
    } catch (error) {
        console.error('Error creating MP3 file:', error);
        res.status(500).json({ error: 'Failed to create MP3 file. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
