import { useState } from "react"

export default function Test(){
  const [name, setName] = useState("Daniel")

  return(
    <>
      <h1>Hello {name}</h1>
      <label htmlFor="userName">Name</label>
      <input name="userName" placeholder="Ma valeur" value={name} onChange={event => setName(event.target.value)}/>
    </>
)
}