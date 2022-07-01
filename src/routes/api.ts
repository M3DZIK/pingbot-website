import type { RequestEvent } from '@sveltejs/kit'
import axios from 'axios'
import dbConnect from '$lib/db/connect'
import URLModel from '$lib/db/schema'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  await dbConnect()

  return {
    body: {
      db: await URLModel.find()
    }
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(event: RequestEvent) {
  const body = await event.request.json()

  if (!body || !body.url) {
    return {
      status: 400,
      body: {
        message: 'Invalid body'
      }
    }
  }

  const url = body.url

  try {
    await axios.get(url)
  } catch {
    return {
      status: 400,
      body: {
        message: 'Invalid URL'
      }
    }
  }

  await dbConnect()

  const entry = new URLModel({ url })

  try {
    await entry.save()
  } catch {
    return {
      status: 400,
      body: {
        message: 'Failed to insert URL (maybe already exists)'
      }
    }
  }

  return {
    body: {
      message: `Added ${url}`
    }
  }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function del(event: RequestEvent) {
  const url = event.url.searchParams.get('url')

  if (!url) {
    return {
      status: 400,
      body: {
        message: 'Invalid params'
      }
    }
  }

  console.log(url)

  await dbConnect()

  try {
    const deleted = await URLModel.findOneAndDelete({ url })

    if (deleted) {
      return {
        body: {
          message: `Deleted ${url}`
        }
      }
    } else {
      return {
        status: 400,
        body: {
          message: `URL does not exists`
        }
      }
    }
  } catch {
    return {
      status: 400,
      body: {
        message: 'Failed to delete URL'
      }
    }
  }
}
