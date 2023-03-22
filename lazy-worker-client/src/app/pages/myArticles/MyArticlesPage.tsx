import { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useGetMyArticlesMutation } from '../../services/articles.service'
import { IArticle } from '../../interfaces/articles.interface'
import './myArticlesPage.css'

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
export default MyArticlesPage
