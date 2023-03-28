import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { IArticle } from "../interfaces/articles.interface";
import { useAppSelector } from "../redux/hooks";
import { selectAuthenticatedUser } from "../redux/slices/auth.slice";
import { useLikeArticleMutation } from "../services/like.service";
import './anArticle.css'


const AnArticle = (article: IArticle) => {
  const [user, setUser] = useState(useAppSelector(selectAuthenticatedUser));
  const userId = user.userId;
  const [likeArticle] = useLikeArticleMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);


  const handleLike = () =>{
    console.log('[likeArticle] userId', userId);
    const postId = article.postId;
    console.log('[likeArticle] postId', postId);
    likeArticle({userId, postId});
    setIsLiked(!isLiked);
  }

  useEffect(()=>{
    const boolToIntSad=isLiked?1:0;
    setLikeCount(boolToIntSad);
  }, [isLiked])


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
            <i className="fa fa-thumbs-up" style={{
              color:'black', 
              fontSize:'20px',
              textDecoration: 'none',
              position:'absolute',
              left:'10px',
              top:'10px'}} onClick={handleLike}> {article.score+likeCount}</i>
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