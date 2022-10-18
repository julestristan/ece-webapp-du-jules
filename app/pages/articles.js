import Header from "../components/header"
import Footer from "../components/footer"
import db from "./database.js"

function Articles() {
  return (
    <div>
      <Header title="Articles"/>
      <h1>Articles page</h1>
      <Footer/>
    </div>
  )
}

export default Articles