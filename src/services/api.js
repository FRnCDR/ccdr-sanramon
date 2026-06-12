const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5043'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (res.status === 204) return null
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(data?.mensaje || `Error ${res.status}: ${res.statusText}`)
  }
  return data
}

export const api = {
  get:   (path)        => request(path),
  post:  (path, body)  => request(path, { method: 'POST',   body: JSON.stringify(body) }),
  put:   (path, body)  => request(path, { method: 'PUT',    body: JSON.stringify(body) }),
  patch: (path, body)  => request(path, { method: 'PATCH',  body: JSON.stringify(body) }),
  del:   (path)        => request(path, { method: 'DELETE' }),
}
