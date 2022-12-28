import { createContext, useState, useEffect } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

const UserContext = createContext()

export default UserContext

export function UserContextProvider({ children }) {
  const supabaseClient = useSupabaseClient()
  const supabaseUser = useUser()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState()

  useEffect(function() {
    if (supabaseUser) {
      setUser(supabaseUser)
      getUserProfile(supabaseUser)
      setLoading(false)
    } 

    async function getUserProfile(supabaseUser) {
      try{
        setLoading(true)
        const { data, error } = await supabaseClient
          .from('profiles')
          .select(`id, username, firstname, lastname, email`)
          .eq('id', supabaseUser.id)
          .single()
        if(error){
          console.log(error)
        }
        if(data){
          if(!data.firstname)data.firstname = ''
          if(!data.lastname)data.lastname = ''
          setUserProfile(data)
        }
      } catch (error) {
        alert('Error loading user data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

  }, [supabaseUser, userProfile])

  return (
    <UserContext.Provider
      value={{
        user: user,
        userProfile: userProfile,
        logout: async function() {
          await supabaseClient.auth.signOut()
          setUser(null)
          setUserProfile(null)
        }
      }}
    >
      {children}
    </UserContext.Provider>
  )
}