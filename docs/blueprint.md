# **App Name**: PestAssist AI

## Core Features:

- Webhook Handler: Receives messages from WhatsApp Business API and Messenger, processes, validates signatures, and asynchronously queues all further processing.
- AI Conversation Engine: Uses Gemini 1.5 Pro tool to converse and guide conversation based on learned goals and parameters, Vertex AI Search knowledge, and business logic.
- Lead Qualification: Use of Gemini tool for identifying relevant information based on free-form text, using named entities to guide a database lookup.
- Pest Knowledge Retrieval: Gemini tool to respond to queries regarding known pests. Use Vertex AI to incorporate known pest issues in its response.
- Admin Panel: A limited-scope React.js admin interface with dashboard showing recent activity. User, lead and order information presented, but no editing capabilities are initially provided.

## Style Guidelines:

- Primary color: Forest green (#386641) to evoke nature, health, and growth, aligning with the core service of pest control while suggesting an eco-friendly approach.
- Background color: Light beige (#F5F5DC), a desaturated tint of the primary green, providing a calm, natural backdrop that enhances readability.
- Accent color: Terracotta (#E67A5B), an analogous color with different brightness and saturation from the primary to draw attention to key UI elements.
- Body and headline font: 'Inter' (sans-serif) for a modern and clean look, optimized for readability on screens.
- Simple, clean line icons related to pest control, nature, and home, reinforcing the app's theme and enhancing usability.
- Clean and spacious layout to ensure readability and a user-friendly experience. Important information is prioritized with a clear visual hierarchy.