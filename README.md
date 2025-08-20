# SafePassExtensionStarter

## Running the Chrome Extension in Local Mode

1. **Build or prepare your extension files**
   - Make sure all your source files are built and available in the project directory (under `dist/` folder).

2. **Open Chrome and go to the Extensions page**
   - Navigate to `chrome://extensions/` in your Chrome browser.

3. **Enable Developer Mode**
   - Toggle the switch in the top right corner to enable Developer Mode.

4. **Load Unpacked Extension**
   - Click the `Load unpacked` button.
   - Select the root directory of your extension (the folder containing your `manifest.json` file).

5. **Test your extension**
   - The extension should now appear in your Chrome extensions list.
   - Make changes to your code as needed. To see updates, click the refresh button on your extension in the extensions page.

6. **Make sure SafePassApp is running**
    - Run SafePassApp under localhost:3001 for auth and fetching entries

---

**Note:**
- If you have a build process (e.g., using Webpack, Rollup, or a custom script), run it before loading or reloading the extension.
- Any time you change source files, you may need to rebuild and reload the extension in Chrome.
