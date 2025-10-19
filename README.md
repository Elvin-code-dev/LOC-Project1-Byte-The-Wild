# LOC Project

This project is a web form for the Learning Outcomes Committee (LOC).  
It lets members view and update division information in one place.

## What it does
- You can pick a division from a dropdown list.
- When you pick **Technology**, it shows the correct info.
- You can edit the fields and click **Save** to keep changes.
- If a field is empty, it shows an error under that box.
- Clicking **Cancel** hides the whole form again.

## Files
- index.html  
- styles.css  
- script.js  
- divisions.json

## How to run
1. Keep all files in the same folder.  
2. Open with a simple web server (VS Code “Go Live” or `npx serve`).  
3. On DigitalOcean, upload all files to the site folder.  
4. Open the link and test the form.

## Notes
- Data comes from `divisions.json`.  
- Changes save to your browser (localStorage).  
- Works on any normal web host.
