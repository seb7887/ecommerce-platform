import { RequestOptions } from 'https'

export type HTTPRequest = RequestOptions & { body: string }

export const fetcher = async <T>(
  path: string,
  token: string,
  options: Record<string, string> = {}
) => {
  const res = await fetch(`${process.env.API_URL}/${path}`, {
    ...options,
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  const json = await res.json()

  return json as T
}
