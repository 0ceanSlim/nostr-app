<script>
    import { goto } from '$app/navigation';
  
    async function redirectToProfile() {
      // Redirect to the profile page when the login button is pressed
      goto('/profile');
    }
  </script>
  
  <h1>Welcome to My App</h1>
  <p>Some introductory content here.</p>
  
  <!-- Login button -->
  <button
    class="rounded-md text-white bg-purple-600 p-1 m-1 font-semibold"
    on:click={redirectToProfile}
  >
    Log in with Browser Extension (NIP-07)
  </button>
  