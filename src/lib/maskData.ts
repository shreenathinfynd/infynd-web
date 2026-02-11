/**
 * Mask email addresses in the format: shree****@gmail.com
 * Shows first 5 characters before @ and domain after @
 */
export const maskEmail = (email: string): string => {
    if (!email || typeof email !== 'string') return email;

    const emailRegex = /^([^@]+)@(.+)$/;
    const match = email.match(emailRegex);

    if (!match) return email;

    const [, localPart, domain] = match;

    // Show first 5 chars of local part or all if less than 5
    const visibleChars = Math.min(5, localPart.length);
    const maskedLocal = localPart.substring(0, visibleChars) + '****';

    return `${maskedLocal}@${domain}`;
};

/**
 * Mask phone numbers in the format: 909****102
 * Shows first 3 and last 3 digits
 */
export const maskPhone = (phone: string): string => {
    if (!phone || typeof phone !== 'string') return phone;

    // Remove all non-digit characters for counting
    const digitsOnly = phone.replace(/\D/g, '');

    if (digitsOnly.length < 6) return phone; // Too short to mask meaningfully

    // Keep first 3 and last 3 digits
    const first3 = digitsOnly.substring(0, 3);
    const last3 = digitsOnly.substring(digitsOnly.length - 3);

    return `${first3}****${last3}`;
};

/**
 * Auto-detect and mask either email or phone number
 */
export const maskContactInfo = (value: string): string => {
    if (!value || typeof value !== 'string') return value;

    // Check if it's an email
    if (value.includes('@')) {
        return maskEmail(value);
    }

    // Check if it looks like a phone number (has digits and phone-related chars)
    if (/[\d\(\)\-\+\s]/.test(value) && /\d/.test(value)) {
        return maskPhone(value);
    }

    return value;
};

/**
 * Mask data in an object or string
 * Looks for keys containing 'email', 'phone', 'mobile', 'tel' (case-insensitive)
 */
export const maskDataObject = (data: any): any => {
    if (typeof data === 'string') {
        return maskContactInfo(data);
    }

    if (Array.isArray(data)) {
        return data.map(item => maskDataObject(item));
    }

    if (typeof data === 'object' && data !== null) {
        const masked: any = {};
        for (const [key, value] of Object.entries(data)) {
            const lowerKey = key.toLowerCase();

            // Check if key suggests contact info
            if (lowerKey.includes('email') ||
                lowerKey.includes('phone') ||
                lowerKey.includes('mobile') ||
                lowerKey.includes('tel') ||
                lowerKey.includes('dial')) {
                masked[key] = typeof value === 'string' ? maskContactInfo(value) : value;
            } else if (typeof value === 'object') {
                masked[key] = maskDataObject(value);
            } else {
                masked[key] = value;
            }
        }
        return masked;
    }

    return data;
};
