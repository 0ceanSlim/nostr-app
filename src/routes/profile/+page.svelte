<script lang="ts">
    // Import the package
    import NDK, { type NDKUserProfile } from '@nostr-dev-kit/ndk';
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

<button class="rounded-md text-white bg-purple-600 p-1 m-1 font-semibold" on:click={login}>
    Log in with Browser Extension (NIP-07)</button
>

<!-- svelte-ignore empty-block -->
{#if userProfile}
    <body>
        <header>
            <nav class="bg-blue-600 h-16 flex justify-between items-center py-2">
                <div class="font-sans font-bold text-white text-4xl pl-2">nostrbook</div>
                <ul class="flex gap-4 text-white mr-10">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Friends</a></li>
                    <li><a href="#">Inbox</a></li>
                </ul>
                <div class="flex items-center gap-4">
                    <ul class="flex gap-4 text-white">
                        <li><a href="#">Settings</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                    <div class="flex items-center">
                        <input type="text" placeholder="Search" class="h-8 px-2 rounded-md mr-2" />
                        <button
                            class="bg-white text-white h-8 w-8 rounded-md flex items-center justify-center mr-5"
                        >
                            <i class="fa fa-search" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
        <div class="flex">
            <aside class="w-1/5 bg-gray-200 p-4">
                <!-- 1st section (Your Profile) content here -->
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img
                    src={userProfile.image}
                    class="w-full max-h-full rounded-lg"
                    alt="Profile Picture"
                />
                <p>
                    View photos of me<br />Edit my profile<br />send me a message<br />poke me<br
                    /><br />
                    ⚡{userProfile.lud16}<br />🌐{userProfile.website}<br /><br />
                    {userProfile.about}
                </p>
                <br /><br />Basic Information<br />Relationship status<br />Hometown<br />current
                city<br />
                Birthday<br />
            </aside>
            <div class="flex-1">
                <div class="bg-gray-300 p-4">
                    <!-- 2nd section (Username and Status) content here -->
                    <h1>{userProfile.name}</h1>
                </div>
                <main class="p-4">
                    | WALL | Info | Photos |<br />
                    <div class="bg-white p-4 rounded-lg shadow-md flex">
                        <input
                            type="text"
                            placeholder="write something"
                            class="w-full h-10 px-2 rounded-md border"
                        />
                        <button
                            class="bg-slate-400 text-white h-10 w-10 rounded-lg ml-2 flex items-center justify-center"
                        />
                    </div>
                    <br />sort by: all posts, posts by you, posts by others, wall-to-wall<br />
                    chronological feed of your nostr activity. your wall. when you comment on something.
                    when you become friends with people. post something.
                    <!-- 3rd section (Wall) content here -->
                </main>
            </div>
            <aside class="w-1/5 bg-gray-300 p-4">
                <!-- 4th section (Trending Posts) content here -->
                Discover<br />
                Stats
            </aside>
        </div>
    </body>
{/if}
