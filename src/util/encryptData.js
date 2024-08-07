import CryptoJS from 'crypto-js';

const secretKey = process.env.REACT_APP_SECRET_KEY;

export const encryptData = (data) => {
    if (!secretKey) {
        throw new Error('Secret key is not defined. Please check your .env file and environment variable configuration.');
    }
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
};
