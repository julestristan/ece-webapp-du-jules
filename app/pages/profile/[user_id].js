import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { withPageAuth } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import gravatar from 'gravatar'

const UserProfile = () => {
  const router = useRouter()
  const { user_id } = router.query
  const supabase = useSupabaseClient()

  const initialState = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    color: "#3f3cbb"
  }

  const [userProfile, setUserProfile] = useState(initialState)

  function handleChange(e) {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    async function getUserProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select(`username, firstname, lastname, email`)
        .eq('id', user_id)
        .single()
      if(error){
        console.log(error)
      }
      else{
        setUserProfile(data)
        if(!data.firstname)data.firstname = ''
        if(!data.lastname)data.lastname = ''
      }
    }

    if(typeof id !== "undifined") {
      getUserProfile()
    }
  }, [user_id])

  async function updateProfile() {
    try{
      const { data, error } = await supabase
        .from("profiles")
        .update([
          {
            username: userProfile.username,
            firstname: userProfile.firstname,
            lastname: userProfile.lastname,
            email: userProfile.email
          }
        ])
        .eq('id', user_id)
      router.replace(`/profile/${user_id}`)
      if(error) throw error
    } catch(error){
      alert(error.message)
    }
  }

  return (
    <div className='w-3/5 flex flex-col gap-2'>
      <UserProfileCard userProfile={userProfile} handleChange={handleChange} updateProfile={updateProfile}/>
      <UserPreferencesCard userProfile={userProfile} handleChange={handleChange}/>
    </div>
  )
}
export default UserProfile  

export const getServerSideProps = withPageAuth({ redirectTo: '/login'})

function UserProfileCard({userProfile, handleChange, updateProfile}){
  return(
    <div className='p-5 themeColor2 rounded-2xl flex flex-col gap-2'>
      <h1 className='wt-title'>Profile</h1>
      <div className='flex flex-row justify-evenly items-center gap-10'>
        <div className='flex-1'>
          <div className='flex flex-col gap-2'>
            <UserData userProfile={userProfile} handleChange={handleChange}/>
            <div>
              <button 
              className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-red-600 bg-red-500 hover:text-slate-900"
              onClick={() => updateProfile()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div className='flex-2'>
          <Image src={gravatar.url(userProfile.email ,  {s: '100', r: 'x', d: 'retro'}, true)} alt='avatar' width={200} height={200}/>
        </div>
      </div>
    </div>
  )
}

function UserData({userProfile, handleChange}){
  return(
    <div>
      <div>Username :</div>
      <input className='rounded-lg p-1 w-full' value={userProfile.username} onChange={handleChange} name="username"/>
      <div>First name :</div>
      <input className='rounded-lg p-1 w-full' value={userProfile.firstname} onChange={handleChange} name="firstname"/>
      <div>Last name :</div>
      <input className='rounded-lg p-1 w-full' value={userProfile.lastname} onChange={handleChange} name="lastname"/>
      <div>Email :</div>
      <input className='rounded-lg p-1 w-full' value={userProfile.email} onChange={handleChange} name="email"/>
    </div>
  )
}

function UserPreferencesCard({userProfile, handleChange}){
  return(
    <div className={`p-5 themeColor2 rounded-2xl flex flex-col gap-2`}>
        <h1 className='wt-title'>Preferences</h1>
        
        <div className='flex gap-2'>
          <div>Color: </div>
          <input className='rounded-lg p-0 overflow-hidden' type='color' onChange={handleChange} name='color' value={userProfile.color}/>
        </div>
      </div>
  )
}
