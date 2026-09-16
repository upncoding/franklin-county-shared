/**
 * Returns the native map URL for a given address string.
 * - iOS: Apple Maps deep link
 * - Android: geo: URI
 * - Fallback: Google Maps web
 */
export const getNativeMapUrl = (address: string): string => {
    const encodedAddress = encodeURIComponent(address);
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Detect iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return `maps://maps.apple.com/?q=${encodedAddress}`;
    }

    // Detect Android
    if (/android/i.test(userAgent)) {
        return `geo:0,0?q=${encodedAddress}`;
    }

    // Fallback to Google Maps Web
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};
