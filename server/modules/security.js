import crypto from 'crypto';

class Security {
    static passwordHash = async (pw) => {
        const utf8 = new TextEncoder().encode(pw)
            const hashBuffer = await crypto.subtle.digest('SHA-512', utf8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(
                (bytes => bytes.toString(16).padStart(2, '0'))
                ).join('')
        return hashHex;
    }
    static generateUUID() {
        return crypto.randomUUID()
    }
}

export default Security