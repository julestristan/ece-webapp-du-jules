export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}
  
export default function FetchingTest({ posts }) {
return (
  <div>
    <h1 className="wt-title">FetchingTest page</h1>
    <ul>
      {posts.map((post) => (
        <li>{post.name}</li>
      ))}
    </ul>
  </div>
)
}
  