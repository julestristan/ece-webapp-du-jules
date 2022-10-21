import Link from 'next/link'

export function displayArticle(article, articleList) {
  articleList.push(<p className='font-bold italic'>ID: {article.id}</p>)
  articleList.push(<p>Title: {article.title}</p>)
  articleList.push(<p>Content: {article.content}</p>)
}
export default function displayArticleInList(article, index) {
  let myArticle = []
  myArticle.push(<h2 className="text-3xl font-bold underline"><Link href={`/articles/${article.id}`}><a>Article {index + 1}</a></Link></h2>)
  displayArticle(article, myArticle)
return myArticle
}
