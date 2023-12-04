import PageDetail from "@/components/PostDetail"

export default async function PostDetail({ params }) {
  const response = await fetch(`${process.env.SERVER_API}/posts/${params.id}`)
  const post = await response.json()

  return <PageDetail post={post} />
}
