export async function getAdvices() {
  const res = await fetch('https://api.adviceslip.com/advice')
  if (!res.ok) {
    throw {
      message: 'Failed to fetch advices',
      statusText: res.statusText,
      status: res.status,
    }
  }
  const data = await res.json()
  return data.slip
}
