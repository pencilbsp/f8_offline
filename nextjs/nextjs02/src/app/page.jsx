export default async function Home() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts")
  const data = await response.json()

  return (
    <main className="">
      <h1>Home Page</h1>
    </main>
  )
}
