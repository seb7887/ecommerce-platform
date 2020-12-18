export const fetcher = async <T>(path: string, token: string) => {
  const res = await fetch(`${process.env.API_URL}/${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const json = await res.json()

  return json as T
}
