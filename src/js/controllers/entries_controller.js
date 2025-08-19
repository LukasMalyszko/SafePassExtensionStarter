import { Controller } from '@hotwired/stimulus';

import { getSessionStorage } from '../services/storage_service';
import fetchEntries from '../services/fetch_entries_service';
import { sidebar, main } from '../templates/entries_templates';

class EntriesController extends Controller {
    static targets = ['sidebar', 'main'];

    async connect() {
        const token = await getSessionStorage('token');
        if (!token) {
            document.dispatchEvent(new CustomEvent('auth:signOut'));
            return;
        }

        const entries = await fetchEntries();

        try {
            this.sidebarTarget.innerHTML = sidebar(entries);
            this.mainTarget.innerHTML = main(entries[0]);
        } catch (error) {
            return;
        }

        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!activeTab) {
            return;
        }

        let parsedUrl;
        try {
            parsedUrl = new URL(activeTab.url);
        } catch (error) {
            console.error('Invalid URL in active tab: ', error);
        }


        const activeHostname = this.normalizeHostname(parsedUrl.hostname);
        const activeEntry = entries.find(entry => {
            try {
                const entryHostname = this.normalizeHostname(new URL(entry.url).hostname);
                return entryHostname === activeHostname;
            } catch {
                return false;
            }
        });

        if (activeEntry) {
            this.mainTarget.innerHTML = main(activeEntry);
        }
    }

    updateMain({ params }) {
        this.mainTarget.innerHTML = main(params.entry);
    }

    navigateToLogin({ params }) {
        chrome.tabs.create({ url: params.entry.url });
    }

    async fillInCredentials({ params }) {
         const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!activeTab) {
            return;
        }

        let parsedUrl;
        try {
            parsedUrl = new URL(activeTab.url);
        } catch (error) {
            console.error('Invalid URL in active tab: ', error);
        }

        const activeEntry = parsedUrl.href.includes(params.entry.url);

        if (activeEntry) {
            chrome.tabs.sendMessage(
                activeTab.id,
                { username: params.entry.username, password: params.entry.password }
            );
        }
    }

    normalizeHostname(hostname) {
            return hostname.replace(/^www\./, '');
        }
}

export default EntriesController;