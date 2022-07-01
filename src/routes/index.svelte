<script>
  import RedButton from '$lib/RedButton.svelte';
  import YellowButton from '$lib/YellowButton.svelte';
</script>

<h1>Ping Bot</h1>

<div>
  <a href="/add">
    <YellowButton>Add URL</YellowButton>
  </a>
</div>

<div>
  <a href="/delete">
    <RedButton>Delete URL</RedButton>
  </a>
</div>

<style>
  div {
    display: inline-block;
    padding: 10px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    margin-bottom: 0;
  }
</style>
