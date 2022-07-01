<script lang="ts">
  import { getNotificationsContext } from 'svelte-notifications'
  import '$lib/css/button.css'
  import '$lib/css/input.css'
  import axios from '../axios'

  const { addNotification } = getNotificationsContext()

  let url = ''

  async function submit() {
    const urlSubmit = url

    url = ''

    try {
      let response = await axios.post('', { url: urlSubmit })

      if (response.data.message) {
        addNotification({
          text: `Added: ${urlSubmit}`,
          position: 'bottom-center',
          removeAfter: 5000 // 5 seconds
        })
      }
    } catch (err: any) {
      if (!err.response) {
        addNotification({
          text: err.toString(),
          position: 'bottom-center',
          type: 'danger',
          removeAfter: 5000 // 5 seconds
        })

        return
      }

      addNotification({
        text: err.response.data.message,
        position: 'bottom-center',
        type: 'danger',
        removeAfter: 5000 // 5 seconds
      })
    }
  }
</script>

<form class="field" on:submit|preventDefault={submit}>
  <h1>Add URL</h1>

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

  button {
    margin: 2em;
  }

  input {
    width: 75%;
  }
</style>
