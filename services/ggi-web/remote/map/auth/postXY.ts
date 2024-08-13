export default async function postXY(x: number, y: number) {
  const response = await fetch('/ggi/api/map/position', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      x: x,
      y: y,
    }),
    keepalive: true,
  })
  return response.json()
}
