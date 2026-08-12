# Irine & Irakli Wedding Website

## Connect your RSVP sheet
Open `script.js` and replace:

`PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`

with the `/exec` URL from your deployed Google Apps Script web app.

The included RSVP form sends JSON containing:
- `name`
- `attending` (`YES` or `NO`)

Your Apps Script should append those values plus a timestamp to your private Google Sheet.

## Test before publishing
Open the site locally, submit a test RSVP, then confirm a new row appears in the Google Sheet. Delete the test row afterward.

## Assets
The `assets` folder should contain:
- `favicon.png` — browser tab icon
- `og-image.jpg` — link preview image (WhatsApp/Telegram/Messenger)
- `invitation-en.jpg` / `invitation-ka.jpg` — the hero invitation graphic, swapped automatically when the language toggle is used

## Publish on GitHub Pages
1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
3. Open repository Settings → Pages.
4. Under Build and deployment, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then Save.
6. GitHub will show the public wedding-site URL once deployment finishes.

## Editing
- Wedding wording and translations: `script.js`
- Layout/content: `index.html`
- Colors/design: `style.css`
- Google Apps Script endpoint: top of `script.js`
