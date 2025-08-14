import { Controller } from "@hotwired/stimulus";

import { setSessionStorage, clearSessionStorage } from "../services/storage_service";

class AuthController extends Controller {
    static targets = ['flash', 'email', 'password']

    async signIn() {
        try {
            const response = await fetch('http://localhost:3001/api/v1/auth', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.emailTarget.value,
                    password: this.passwordTarget.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            if (data.errors) {
                this.flashTarget.innerHTML = `<div class="p-3 bg-danger text-white rounded my-3">
                                                ${data.errors[0]}
                                              <div>`
            }

            if (data.token) {
                setSessionStorage({token: data.token});
                Turbo.visit('/frames/entries.html', {
                    frame: 'app',
                });
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    }

    async signOut() {
        try {
            await clearSessionStorage('token');
            Turbo.visit('/frames/signin.html', { frame: 'app' });
        } catch (error) {
            console.error('Error during sign-out:', error);
        }
    }

}

export default AuthController;