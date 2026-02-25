// Lado Next.js
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${API_URL}/blog/${params.slug}`, {
    next: { revalidate: 3600 }, // Cachear por 1 hora para máxima velocidad
  });

  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <img src={post.image} alt={post.title} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <span>Autor: {post.author.name}</span>
    </article>
  );
}
