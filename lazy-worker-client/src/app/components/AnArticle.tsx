import { Button, Card } from "react-bootstrap";
import { IArticle } from "../interfaces/articles.interface";


const AnArticle = (article: IArticle) => {
    return (
        <>
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
        </>
    )
}

export default AnArticle;