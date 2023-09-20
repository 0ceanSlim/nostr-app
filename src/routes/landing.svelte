<script lang="ts">
    import { browser } from '$app/environment';
    import NDK, {NDKNip07Signer, type NDKUserProfile, NDKEvent, type NDKFilter } from '@nostr-dev-kit/ndk';

    const ndk = new NDK({
        explicitRelayUrls: [
            'wss://relay.nostr.band',
            'wss://nos.lol',
            'wss://relay.noswhere.com',
            'wss://purplepag.es'
        ]
    });

    let userProfile: NDKUserProfile;

    if (browser) {
        ndk.connect().then(() => {
            console.log('Connected');
        });
    }

    async function login() {
        const signer = new NDKNip07Signer();
        ndk.signer = signer;
        signer.user().then((user) => {
            user.ndk = ndk;
            user.fetchProfile().then((eventSet) => {
                console.log(user);
                userProfile = user.profile as NDKUserProfile;
            });
        });
    }
</script>

<button class="flex rounded-md text-white bg-purple-600 p-1 m-1 font-semibold" on:click={login}>
    Log in with Browser Extension (NIP-07)</button
>
<br />
<a class="rounded-md text-white bg-purple-600 p-1 mx-1 mt-2 font-semibold" href="/profile"
    >Profile</a
>
