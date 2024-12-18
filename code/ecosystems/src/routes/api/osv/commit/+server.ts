import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const { commit } = await request.json();

  const response = await fetch('https://api.osv.dev/v1/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      commit: commit
    })
  });

  const data = await response.json();

  return json(data);
};
