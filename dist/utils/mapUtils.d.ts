/**
 * Returns the native map URL for a given address string.
 * - iOS: Apple Maps deep link
 * - Android: geo: URI
 * - Fallback: Google Maps web
 */
export declare const getNativeMapUrl: (address: string) => string;
