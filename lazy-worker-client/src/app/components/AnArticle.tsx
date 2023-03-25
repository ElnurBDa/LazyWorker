import { Button, Card } from "react-bootstrap";
import { IArticle } from "../interfaces/articles.interface";
import './anArticle.css'


const AnArticle = (article: IArticle) => {
    return (
        <>
          <Card style={{ width: '70%', left: '15%' }}>
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              {article.author!==' '?<Card.Subtitle className="home-owner">Author: {article.author}</Card.Subtitle>:<></>}   
              <Card.Text className="home-description">{article.description}</Card.Text>
              <Card.Subtitle className="category">Category: {article.category}</Card.Subtitle>
              <Button variant="primary" onClick={() => window.open(article.redirectLink)}>{article.website}</Button>
            </Card.Body>
          </Card>
        </>
    )
}
// <Card.Subtitle>Published at: {article.date.toString()}</Card.Subtitle>
// <Card.Footer><a href={article.redirectLink}>Redirect: {article.website}</a></Card.Footer>
// <Button variant="primary">Read article</Button>

export default AnArticle;