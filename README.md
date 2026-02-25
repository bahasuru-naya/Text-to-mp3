# Text to MP3 Converter

<img width="995" height="886" alt="image" src="https://github.com/user-attachments/assets/b8e8dd8b-8935-4696-974b-1ac6c9771ed1" />

A lightweight Node.js + Express web app that converts any text into a downloadable MP3 audio file using text-to-speech.

## Features

- 🎙️ Convert text to speech and save as MP3
- ▶️ In-browser audio player — listen before you download
- ⬇️ One-click MP3 download
- 📊 Live character counter (up to 5,000 characters)
- ✅ Input validation with friendly error messages
- 🌐 Clean, modern dark UI — no frameworks required

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or later
- npm

## Installation

```bash
# Clone the repository
git clone https://github.com/bahasuru-naya/Text-to-mp3.git
cd Text-to-mp3

# Install dependencies
npm install
```

## Usage

```bash
npm start
```

Then open your browser at **http://localhost:3000**

1. Type or paste your text into the textarea
2. Enter a file name (e.g. `my_audio`)
3. Click **Create MP3**
4. Listen in the browser and/or click **Download MP3**

Generated files are saved to `public/audio/` on the server.

## Project Structure

```
Text-to-mp3/
├── index.js          # Express server
├── package.json
├── public/
│   ├── index.html    # Frontend UI
│   └── audio/        # Generated MP3 files (git-ignored)
└── .gitignore
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/create-audio` | Generate MP3 from text, returns web URL |

**Request body (`/create-audio`):**
```json
{ "text": "Hello world", "fileName": "hello" }
```

**Success response:**
```json
{ "message": "MP3 file created successfully!", "filePath": "/audio/hello.mp3" }
```

## Dependencies

| Package | Purpose |
|---------|---------|
| [express](https://expressjs.com/) | HTTP server & static file serving |
| [simple-tts-mp3](https://www.npmjs.com/package/simple-tts-mp3) | Text-to-speech MP3 generation |

## License

[ISC](LICENSE)
