import { Controller } from '@hotwired/stimulus';

import { getSessionStorage } from '../services/storage_service';

class EntriesController extends Controller {
    static targets = ['sidebar', 'main'];

    async connect() {
        const token = await getSessionStorage('token');
        if (!token) {
            document.dispatchEvent(new CustomEvent('auth:signOut'));
            return;
        }
    }
}

export default EntriesController;