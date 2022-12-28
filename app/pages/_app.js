import '../styles/globals.css'
import Layout from '../components/layout'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { UserContextProvider } from '../components/UserContext'

export default function MyApp({ Component, pageProps }) {

  const [supabase] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <UserContextProvider>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserContextProvider>
    </SessionContextProvider>
    
  )
}