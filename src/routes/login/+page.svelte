<script lang="ts">
    // Import the package
    import NDK from '@nostr-dev-kit/ndk';
    import { browser } from '$app/environment';
    import { NDKNip07Signer } from '@nostr-dev-kit/ndk'; 

    // Create a new NDK instance with explicit relays
    const ndk = new NDK({
        explicitRelayUrls: [
            'wss://relay.nostr.band',
            'wss://nos.lol',
            'wss://relay.noswhere.com',
            'wss://purplepag.es'
        ]
    });

    if (browser) {
        ndk.connect().then(() => {
            console.log('Connected');
        });
    }

    async function login() {
        const signer = new NDKNip07Signer
        ndk.signer = signer
        signer.user ()
    }

</script>

<button on:click={login}> Log in with Browser Extension (NIP-07)</button>