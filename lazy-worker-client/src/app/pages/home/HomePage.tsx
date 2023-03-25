import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { setArticles as setReducerArticles } from '../../redux/slices/articles.slice'
import { useGetAllArticlesMutation } from '../../services/articles.service'
import { IArticle } from '../../interfaces/articles.interface'
import './homePage.css'
import AnArticle from '../../components/AnArticle'

const HomePage = () => {
  const [getAllArticles, { data, error, isLoading }] = useGetAllArticlesMutation()
  const dispatch = useAppDispatch()
  const [articles, setArticles] = useState<IArticle[]>([])

  useEffect(() => {
    getAllArticles(null)
  }, [])

  useEffect(() => {
    if (data && !error) {
      dispatch(setReducerArticles(data))
      setArticles(data)
      console.log('HomePage:: data:', data)
    } else if (error) {
      console.log(`HomePage:: Error getting articles`, error)
    }
  }, [data, error, dispatch])

  return (
    <>
      <h1 style={{textAlign: 'center' }}>Home</h1>
      <h3 style={{textAlign: 'center' }}>List of all job applications</h3>
      <div className="home-wrapper">
        {articles.map((article, index) => {
          return (
            <div key={index} >
              <AnArticle {...article}></AnArticle>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default HomePage
