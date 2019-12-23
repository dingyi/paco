import { useRouter } from 'next/router'
import Post from '../components/post'
import Page from '../components/page'

import posts from '../data/blog.json'
const { data } = posts

const PostPage = () => {
  const { query } = useRouter()
  const { post } = query

  if (!query || post === undefined) {
    // Wait for dynamic routing to resolve
    return <Page />
  }

  return <Post slug={post} />
}

export async function unstable_getStaticProps() {
  return { props: {}, revalidate: false }
}

export async function unstable_getStaticPaths() {
  return data.map(post => {
    return { params: { post: post.slug } }
  })
}

export default PostPage
