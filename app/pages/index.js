import Link from "next/link"

function Home() {
  function link(link, text){
    return (
      <Link href={link}>
          <a className='font-bold'>
            {text}
          </a>
        </Link>
    )
  }
  return (
    <div>
      <div className='max-w-4xl rounded-2xl themeColor2 p-5 flex flex-col gap-4'>
        <h1 className="wt-title">Homepage</h1>
        <p>Welcome to Homepage !</p>
        <div className='indent-8 text-justify'>
          This website is a {link('https://medium.com/', ' Medium')}-like publishing platform that allows 
          users to publish articles consult and comment articles.
          We developed this website with {link('https://nextjs.org/', ' Next.js ')},
           {link('https://fr.reactjs.org/', ' React ')} with {link('https://tailwindcss.com/', ' tailwindcss ')}
          for styling, and we used self-hosted {link('https://supabase.com/', ' Supabase ')} (with docker)
          for storage and user authentication.
        </div>
      </div>
    </div>
  )
}

export default Home