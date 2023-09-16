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

<button on:click={login}> Log in with Browser Extension (NIP-07)</button>

<!-- svelte-ignore empty-block -->
{#if userProfile}
    <body>
        <header>
            <nav class="bg-blue-600 h-16 flex justify-between items-center py-2">
                <div class="font-sans font-bold text-white text-4xl pl-2">nostrbook</div>
                <ul class="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Friends</a></li>
                    <li><a href="#">Inbox</a></li>
                </ul>
                <div class="right-nav">
                    <div class="user-actions">
                        <ul>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Logout</a></li>
                        </ul>
                        <div class="search-box">
                            <input type="text" placeholder="Search" />
                            <button class="search-button"><i class="fa fa-search" /></button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        <div class="main-container">
            <aside class="left-sidebar">
                <!-- 1st section (Your Profile) content here -->
                <!-- svelte-ignore a11y-img-redundant-alt -->
                <img
                    src={userProfile.image}
                    style="width:100%; height:max;border-radius:16px;"
                    alt="Profile Picture"
                />
                View photos of me <br />Edit my profile<br />send me a message<br />poke me<br /><br
                />
                <p>
                    ⚡{userProfile.lud16} <br />
                    🌐{userProfile.website}<br /><br />
                    {userProfile.about}
                </p>
                <br /><br />Basic Information<br />Relationship status<br />Hometown<br />current
                city<br />
                Birthday<br />
            </aside>
            <div class="right-sections">
                <div class="above-content-bar">
                    <!-- 2nd section (Username and Status) content here -->
                    <h1>{userProfile.name}</h1>
                </div>
                <main class="main-content">
                    | WALL | Info | Photos |<br />
                    <div class="post-box">
                        <input type="text" placeholder="write something" />
                        <button class="post-button" />
                    </div>
                    <br />sort by: all posts, posts by you, posts by others, wall-to-wall<br />
                    chronological feed of your nostr activity. your wall. when you comment on something.
                    when you become friends with people. post something.
                    <!-- 3rd section (Wall) content here -->
                </main>
            </div>
            <aside class="right-sidebar">
                <!-- 4th section (Trending Posts) content here -->
                Discover<br />
                Stats
            </aside>
        </div>
    </body>
{/if}
