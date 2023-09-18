<script lang="ts">
    // Import the necessary code for login
    import NDK, { type NDKUserProfile } from '@nostr-dev-kit/ndk';
    import { browser } from '$app/environment';
    import { NDKNip07Signer } from '@nostr-dev-kit/ndk';
    import { goto } from '$app/navigation';
  
    let userProfile: NDKUserProfile | null = null; // Initialize userProfile as null
  
    async function login() {
      const ndk = new NDK({
        explicitRelayUrls: [
          'wss://relay.nostr.band',
          'wss://nos.lol',
          'wss://relay.noswhere.com',
          'wss://purplepag.es',
        ],
      });
  
      if (browser) {
        ndk.connect().then(() => {
          console.log('Connected');
        });
      }
  
      const signer = new NDKNip07Signer();
      ndk.signer = signer;
  
      try {
        const user = await signer.user();
        user.ndk = ndk;
        const eventSet = await user.fetchProfile();
        userProfile = user.profile as NDKUserProfile;
  
        // Redirect to the profile page upon successful login
        goto('/profile');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  </script>
  
  <!-- Login button -->
  <button
    class="rounded-md text-white bg-purple-600 p-1 m-1 font-semibold"
    on:click={login}
  >
    Log in with Browser Extension (NIP-07)
  </button>
  
  <!-- Display user profile if logged in (if needed) -->
  {#if userProfile}
    <!-- You can display the user profile here if needed -->
  {/if}
  