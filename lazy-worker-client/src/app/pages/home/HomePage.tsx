import { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useAppDispatch } from '../../redux/hooks'
import { setArticles as setReducerArticles } from '../../redux/slices/articles.slice'
import { useGetAllArticlesMutation } from '../../services/articles.service'
import { IArticle } from '../../interfaces/articles.interface'
import './homePage.css'

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
            <div key={index}>
              <Card style={{ width: '54rem',left: '9rem' }}>
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Subtitle className="home-owner">Author: {article.author}</Card.Subtitle>
                  <Card.Text className="home-description">{article.description}</Card.Text>
                  <Card.Subtitle>Category: {article.category}</Card.Subtitle>
                  <Card.Subtitle>Published at: {article.date.toString()}</Card.Subtitle>
                  <Card.Footer><a href={article.redirectLink}>Redirect: {article.website}</a></Card.Footer>
                  <Button variant="primary">Read article</Button>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default HomePage
