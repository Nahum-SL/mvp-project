export async function getPublicPosts() {
  const res = await fetch(`${process.env.API_URL}/blog/post`, {
    cache: "no-store",
  });

  return res.json();
}
