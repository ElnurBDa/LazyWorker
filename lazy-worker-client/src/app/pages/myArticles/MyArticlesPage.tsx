import { useEffect, useState } from 'react'
import { useGetMyArticlesMutation } from '../../services/articles.service'
import { IArticle } from '../../interfaces/articles.interface'
import './myArticlesPage.css'
import AnArticle from '../../components/AnArticle'

const MyArticlesPage = () => {
  const [getMyArticles, { data, error, isLoading }] = useGetMyArticlesMutation()
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    getMyArticles(null)
  }, [])

  useEffect(() => {
    if (data && !error) {
      setArticles(data)
      console.log('MyArticlesPage:: data:', data)
    } else if (error) {
      console.log(`MyArticlesPage:: Error getting articles`, error)
    }
  }, [data, error])

  return (
    <>
      <h1 style={{textAlign: 'center' }}>Job applications for me</h1>
      <div className="my-wrapper">
        {articles.map((article, index) => {
          return (
            <div key={index}>
              <AnArticle {...article}></AnArticle>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default MyArticlesPage
