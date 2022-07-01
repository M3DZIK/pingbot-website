<script>
  import Notifications from 'svelte-notifications'
</script>

<svelte:head>
  <title>PingBot</title>
</svelte:head>

<Notifications>
  <main>
    <slot />
  </main>
</Notifications>

<style>
  :root {
    margin: 0;
    padding: 0;
    background-color: #080a0b;
    color: #f2f0ed;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;

    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
