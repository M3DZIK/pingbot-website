<script lang="ts">
  import { getNotificationsContext } from 'svelte-notifications';
  import '$lib/css/button.css';
  import '$lib/css/input.css';
  import axios from '../axios';

  const { addNotification } = getNotificationsContext();

  let url = '';

  async function submit() {
    url = '';

    try {
      let response = await axios.delete(`?url=${url}`);

      if (response.data.data.message) {
        addNotification({
          text: `Deleted: ${url}`,
          position: 'bottom-center',
          removeAfter: 2000 // 2 seconds
        });
      }
    } catch (err: any) {
      if (!err.data) {
        addNotification({
          text: err.toString(),
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 2000 // 2 seconds
        });

        return;
      }

      if (err.data.response && err.data.response.data.message) {
        return err.data.response.data.message;
      } else {
        return err.data.toString();
      }
    }
  }
</script>

<form class="field" on:submit|preventDefault={submit}>
  <input type="url" name="url" inputmode="url" placeholder="https://example.com" bind:value={url} />

  <button>Submit</button>

  <a href="/">
    <button>Go to home page</button>
  </a>
</form>

<style>
  form {
    text-align: center;
    padding: 10px;
  }

  input {
    color: red;
    border: 2px solid red;
  }

  button {
    margin: 2em;
  }

  input {
    width: 75%;
  }
</style>
