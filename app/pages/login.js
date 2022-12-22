import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

export default function Contact() {
  const session = useSession()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  if(session)router.push('/')

  return (
    <div>
      <Head>
        <title>WebTech - user signin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Auth
        supabaseClient={supabaseClient}
        appearance={{ theme: ThemeSupa }}
        providers={['github']}
      />
    </div>
  )
}