import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { setArticles as setReducerArticles } from '../../redux/slices/articles.slice'
import { useGetAllArticlesMutation } from '../../services/articles.service'
import { IArticle } from '../../interfaces/articles.interface'
import './homePage.css'
import AnArticle from '../../components/AnArticle'
import { Button } from 'react-bootstrap'

enum PARAM {
  title,
  author,
  category,
  score,
  website
}

const HomePage = () => {
  const [getAllArticles, { data, error, isLoading }] = useGetAllArticlesMutation()
  const dispatch = useAppDispatch()
  const [articles, setArticles] = useState<IArticle[]>([])
  const [articlesToShow, setArticlesToShow] = useState<IArticle[]>([])
  const [q, setQ] = useState("");
  const [p, setP] = useState(PARAM.title);

  const filterArticles = () => {
    if (q==="") setArticlesToShow(articles);
    else {
      if (p==PARAM.title) setArticlesToShow(articles.filter(article => article.title.toUpperCase().includes(q.toUpperCase())));
      if (p==PARAM.website) setArticlesToShow(articles.filter(article => article.website.toUpperCase().includes(q.toUpperCase())));
      if (p==PARAM.category) setArticlesToShow(articles.filter(article => article.category.toUpperCase().includes(q.toUpperCase())));
    }
  }

  useEffect(() => {
    getAllArticles(null)
  }, [])

  useEffect(() => {
    filterArticles();
    console.log(q);
  }, [q,p])

  useEffect(() => {
    if (data && !error) {
      dispatch(setReducerArticles(data))
      setArticles(data)
      if (!q) setArticlesToShow(data)
      console.log('HomePage:: data:', data)
    } else if (error) {
      console.log(`HomePage:: Error getting articles`, error)
    }
  }, [data, error, dispatch])

  return (
    <>
      <h1 style={{textAlign: 'center' }}>Home</h1>
      <h3 style={{textAlign: 'center' }}>List of all job applications</h3>
      <div className="search-wrapper"
              style={{marginLeft:'38%'}}>
        <label htmlFor="search-form">
          <input
              style={{width:'100%'}}
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Search for..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
          />
          <h6 style={{textAlign: 'center' }}>Search By</h6> 
          <Button style={{marginLeft:'20px',marginRight:'50px'}} onClick={() => setP(PARAM.title)}>Title</Button>
          <Button onClick={() => setP(PARAM.category)}>Category</Button>
          <Button style={{marginLeft:'50px',marginRight:'20px'}}onClick={() => setP(PARAM.website)}>Website</Button>
        </label>
        
      </div>
      <div className="home-wrapper">
        {articlesToShow.map((article, index) => {
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
