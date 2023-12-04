import Post from "@/components/Post"

export default async function PostsPage() {
  const response = await fetch(`${process.env.SERVER_API}/posts`)
  const posts = await response.json()

  return (
    <div className="max-w-sm">
      <h1>Danh sách bài viết</h1>
      <ul className="flex flex-col gap-2">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}
