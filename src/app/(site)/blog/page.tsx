import FeaturedPost from "@/src/components/ui/layout/blog/FeaturedPost"

export default function BlogPage() {
  const posteo = [
      {
        id: 1,
        title: "Cómo la IA está revolucionando el desarrollo de software",
        excerpt: "Descubre cómo la inteligencia artificial está transformando la forma en que desarrollamos software, desde la generación de código hasta la optimización de procesos.",
        category: "Tecnología",
        author: {
          name: "Nahum Salazar",
          role: "Desarrollador",
          avatar: "/images/author.jpg"
        },
        date: "15 de Abril de 2024",
        readingTime: "5 min de lectura",
        image: "/images/featured-post.jpg",
        slug: "ia-revolucionando-desarrollo-software"
      },
      {
        id: 2,
        title: "Cómo la IA está revolucionando el desarrollo de software",
        excerpt: "Descubre cómo la inteligencia artificial está transformando la forma en que desarrollamos software, desde la generación de código hasta la optimización de procesos.",
        category: "Tecnología",
        author: {
          name: "Nahum Salazar",
          role: "Desarrollador",
          avatar: "/images/author.jpg"
        },
        date: "15 de Abril de 2024",
        readingTime: "5 min de lectura",
        image: "/images/featured-post.jpg",
        slug: "ia-revolucionando-desarrollo-software"
      }
  ]

  return (
    <main>
      <FeaturedPost post={posteo[0]} />
      <FeaturedPost post={posteo[1]} />
    </main>
  )
}