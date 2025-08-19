import { getUsernameInput, getPasswordInput } from './utils/inputs'

const autoFillSignIn = ({username, password}) => {
    const usernameInput = getUsernameInput();
    const passwordInput = getPasswordInput();

    if (usernameInput) {
        usernameInput.value = username;
    } else {
        console.warn('Username input not found');
    }
    if (passwordInput) {
        passwordInput.value = password;
    } else {
        console.warn('Password input not found');
    }
};

chrome.runtime.onMessage.addListener(message => {
    autoFillSignIn(message);
});