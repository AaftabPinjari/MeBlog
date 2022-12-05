import Head from 'next/head'
import Image from 'next/image'
import { GraphQLClient, gql } from 'graphql-request'
import BlogCard from '../components/BlogCard';

const graphcms = new GraphQLClient("https://api-ap-south-1.hygraph.com/v2/clb7jxq3w0q2y01uthh4p9ee6/master");

const QUERY = gql`
{
  posts {
    id,
    title,
    blogDate,
    slug,
    coverPhoto{
      publishedAt
      url
    },
    content{
      html
    }
    author{
      name,
      avatar{
        url
      } 
    }
  }
}
`
export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <div >
      <Head >
        <title>Me-Blog</title>
        <meta name="description" content="Blog site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-blue-100 min-h-screen">
        <nav>hi</nav>
        {posts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </main>
    </div>
  )
}
