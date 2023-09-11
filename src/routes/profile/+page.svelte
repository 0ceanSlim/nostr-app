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
    <style>
        /* Reset some default styles */
        body,
        ul {
            margin: 0;
            padding: 0;
        }

        /* Style the top navigation bar */
        .top-nav {
            background-color: #3a5c95;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }

        /* Style the logo */
        .logo img {
            max-height: 100%;
        }

        /* Style the navigation links */
        .nav-links {
            list-style: none;
            display: flex;
            gap: 20px;
            margin-right: 35%;
        }

        .nav-links li {
            font-size: 18px;
        }

        .nav-links a {
            text-decoration: none;
            color: #fff;
        }

        /* Style the user actions */
        .user-actions {
            display: flex;
            align-items: center;
        }

        .user-actions ul {
            list-style: none;
            display: flex;
            gap: 20px;
            margin-right: 40px;
        }

        .user-actions a {
            text-decoration: none;
            color: #fff;
            font-size: 18px;
        }

        /* Style the search box */
        .search-box {
            display: flex;
            align-items: center;
        }

        .search-box input[type='text'] {
            height: 30px;
            padding: 5px;
            border: none;
            border-radius: 5px;
        }

        .search-button {
            height: 40px;
            width: 40px;
            background-color: #555;
            border: none;
            border-radius: 5px;
            color: #fff;
            padding: 5px 10px;
            cursor: pointer;
        }
        .main-container {
            display: flex;
            flex-wrap: wrap;
        }

        /* Style the left sidebar (1st section) */
        .left-sidebar {
            width: 15%;
            background-color: #edeff2; /* Example background color */
            padding: 20px;
        }

        /* Style the container for right sections (2nd, 3rd, and 4th sections) */
        .right-sections {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        /* Style the above content bar (2nd section) */
        .above-content-bar {
            background-color: #ccc; /* Example background color */
            padding: 10px 20px;
        }

        /* Style the main content (3rd section) */
        .main-content {
            flex-grow: 1;
            padding: 20px;
        }

        /* Style the right sidebar (4th section) */
        .right-sidebar {
            width: 15%;
            background-color: #f0f0f0; /* Example background color */
            padding: 20px;
        }

        /* Responsive design - adjust styles for smaller screens if needed */
        @media (max-width: 768px) {
            .nav-links {
                display: none; /* Hide links on smaller screens */
            }
            .search-box {
                flex-grow: 1; /* Expand the search box to fill available space */
            }
            .user-actions {
                gap: 10px;
            }
            /* Adjust widths for responsiveness, hide or stack elements as needed */
            .left-sidebar {
                width: 100%;
            }
            .above-content-bar {
                width: 100%;
            }
            .main-content {
                width: 100%;
            }
            .right-sidebar {
                width: 100%;
            }
        }
    </style>

    <body>
        <header>
            <nav class="top-nav">
                <div class="logo">
                    <img
                        src="your-logo.png"
                        alt="nostrbook"
                        style="font-weight: bold; color:white; font-size: 30px;"
                    />
                </div>
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
                    alt="profile picture"
                />
                View photos of me <br />Edit my profile<br />send me a message<br />poke me<br /><br
                />
                <p>
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
                    WALL Info Photos<br />write something .post.<br />sort by: all posts, posts by
                    you, posts by others, wall-to-wall<br /> chronological feed of your nostr
                    activity. your wall. when you comment on something. when you become friends with
                    people. post something.
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
