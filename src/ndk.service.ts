import NDK from '@nostr-dev-kit/ndk';

// Instantiate NDK with your preferred relay URLs
const ndk = new NDK({
    explicitRelayUrls: [
        'wss://relay.nostr.band',
        'wss://nos.lol',
        'wss://relay.noswhere.com',
        'wss://purplepag.es'
    ]
});

// Export a function that returns the NDK instance
export function getNDK() {
    return ndk;
}