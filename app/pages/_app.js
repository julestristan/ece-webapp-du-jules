//import '../styles/globals.css'
//import Layout from '../components/Layout/index'
//import '../styles/loginform.css'
//
//function MyApp({ Component, pageProps }) {
//  return (
//    <Layout>
//      <Component {...pageProps} className='mb-auto flex justify-center p-5 bg-slate-400'/>
//    </Layout>
//  )
//}
//
//export default MyApp
import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
export default MyApp
