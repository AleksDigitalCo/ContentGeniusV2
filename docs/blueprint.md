# **App Name**: InstaGenius

## Core Features:

- UI scaffolding: Basic layout with a textarea for input, a button to trigger content generation, and a display area for the generated text.
- Authentication: Firebase Authentication integration to manage registration, login, and user accounts.
- AI Content Generation: Use the Gemini API tool to generate short, compelling text suitable for Instagram, including emojis and hashtags, based on the prompt entered by the user. A system prompt is used to instruct Gemini: 'You are a highly specialized AI for marketing copy. Your task is to transform a raw description into an engaging, short text perfect for Instagram. Include relevant emojis and hashtags. The tone should be enthusiastic and professional.'
- Content Display: Display generated content in a dedicated area on the page. If it exceeds vertical space, the area should include vertical scrolling.
- Frontend-Backend Communication: Connect the 'Generate Text' button in the UI to the Firebase Cloud Function, handling requests and displaying responses.

## Style Guidelines:

- Primary color: Saturated teal (#4DB6AC) to convey professionalism, trustworthiness, and balance.
- Background color: Desaturated teal (#E0F2F1), a light, near-white background to ensure readability and a clean interface.
- Accent color: Analogous green (#80CBC4), used sparingly for interactive elements to add a subtle pop and guide user attention.
- Body and headline font: 'PT Sans' (sans-serif) to offer a blend of modernity and approachability suitable for marketing and general use.
- Code font: 'Source Code Pro' for displaying any config snippets.
- Clean and modern layout using Material UI components.
- Simple and clear icons for navigation and user actions, in the style of Material Design.