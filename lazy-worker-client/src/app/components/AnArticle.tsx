import { Button, Card } from "react-bootstrap";
import { IArticle } from "../interfaces/articles.interface";
import './anArticle.css'


const AnArticle = (article: IArticle) => {
    return (
        <div style={{ width: '400px'}}>
          <Card>
            <a href="/problem" style={{
              color:'black', 
              fontSize:'10px',
              textDecoration: 'none',
              position:'absolute',
              right:'10px',
              top:'10px'}}>Complain🚩</a>
            <Card.Body style={{ height: '380px'}}>
              <Card.Title style={{ height: '50px'}}>{article.title}</Card.Title>
              {article.author!==' '?<Card.Subtitle className="home-owner">Author: {article.author}</Card.Subtitle>:<></>}   
              <Card.Text className="home-description">{article.description}</Card.Text>
              <Card.Subtitle className="category">Category: {article.category}</Card.Subtitle>
              <Button variant="primary" onClick={() => window.open(article.redirectLink)}>{article.website}</Button>
            </Card.Body>
          </Card>
        </div>
    )
}
// <Card.Subtitle>Published at: {article.date.toString()}</Card.Subtitle>
// <Card.Footer><a href={article.redirectLink}>Redirect: {article.website}</a></Card.Footer>
// <Button variant="primary">Read article</Button>

export default AnArticle;