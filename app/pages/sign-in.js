import { useState } from 'react'
// import styles from '../styles/Home.module.css'

// import { supabase } from '../client'

import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  async function signIn() {
    const { error, data } = await supabase.auth.signIn({
      email
    })
    if (error) {
      console.log({ error })
    } else {
      setSubmitted(true)
    }
  }
  if (submitted) {
    return (
      <div className={styles.container}>
        <h1>Please check your email to sign in</h1>
      </div>
    )
  }
  return (
    <div>
      <main>
        <h1>
          Sign In
        </h1>
        <input
          onChange={e => setEmail(e.target.value)}
          style={{ margin: 10 }}
        />
        <button onClick={() => signIn()}>Sign In</button>
       </main>
    </div>
  )
}