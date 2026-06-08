export async function getPublicIntranet() {
  const res = await fetch(`${process.env.API_URL}/intranet/public-links`, {
    cache: "no-store",
  });
  return res.json();
}
