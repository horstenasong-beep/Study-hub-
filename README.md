# Study Hub — online learning platform starter

This is a first working website foundation, not a complete set of all school textbooks. It includes a responsive subject library, curriculum/level selectors, topic search, sample resource list, a small interactive maths quiz, and a Gemini-powered tutor endpoint designed for Netlify Functions.

## Included now
- Subject catalogue: Mathematics, English, French, Biology, Chemistry, Physics, Geography, History, Computer Science, Economics, Literature, Further Mathematics, Civic Education, Agriculture, Religious Studies, Arts & Design.
- Level selector: Class 1–6, Form 1–5, Lower Sixth and Upper Sixth.
- Curriculum selector: Cameroon, Nigeria, Ghana, UK, USA and International.
- Searchable subject/topic catalogue.
- Sample mathematics quiz with explanations.
- AI tutor interface and server-side Gemini API proxy. The API key is never placed in browser JavaScript.
- Basic per-IP function rate limit.

## Important content and product limitations
- The subject/level selectors are a catalogue foundation. They do not yet contain complete, curriculum-verified chapter-by-chapter books for every country and level.
- The resource cards are samples. Add original lessons, teacher-created workbooks, public-domain resources, or textbooks whose licence permits online distribution. Do not upload copyrighted books without permission.
- Student accounts, cloud-saved progress, teacher/admin roles, PDF reader, video hosting, and a full question bank require further backend/database work.
- Gemini's free tier has quotas and availability limits. Google may change these limits. Review the current official pricing and terms before inviting many students.

## Connect the Gemini tutor (Netlify)
1. Create or sign in to a Google account and open https://aistudio.google.com/app/apikey .
2. Create a Gemini API key. Keep it private. Do not paste it into `index.html`, GitHub, a public chat, or a screenshot.
3. Upload this project to a GitHub repository (the whole folder, including `netlify/functions/study-tutor.mts`, `netlify.toml`, and `index.html`).
4. In Netlify, choose **Add new project → Import an existing project**, connect the repository, and deploy. Netlify must build the repository so the serverless function is deployed; a simple static drag-and-drop upload does not deploy this function.
5. Open the Netlify site's **Project configuration / Environment variables** (wording may vary), add a variable named `GEMINI_API_KEY`, and paste the key as its value. Ensure its scope includes **Functions**.
6. Save the variable and trigger a new deploy. Function environment variables take effect on a new deploy.
7. Open the deployed website, select a subject and level, and ask the AI tutor a short test question.

## Security notes
- Never expose the API key in frontend code. This project sends questions to a Netlify function, which calls Gemini privately.
- Do not share the key. If it is exposed, revoke it and create another.
- The included rate limit is a basic protective measure, not a complete abuse-prevention or account quota system. Add authentication and stronger usage controls before a public launch.
- Gemini free-tier requests may be rate-limited, and free-tier data handling terms may differ from paid service. Review Google's current terms and pricing: https://ai.google.dev/gemini-api/docs/pricing

## Local preview
Open `index.html` in a browser to preview the static interface. The AI function will only work when deployed on Netlify with the environment variable configured, or when running through Netlify's local development tooling.
