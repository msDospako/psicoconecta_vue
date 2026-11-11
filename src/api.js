export async function api(path, { method = 'GET', body } = {}) {
  const token = sessionStorage.getItem('psicoconecta-token')
  const headers = body === undefined ? {} : { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch('/api/' + path, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  if (response.status === 204) return
  const data = await response.json()
  if (!response.ok) throw Object.assign(new Error(data.error), { status: response.status })
  return data
}
