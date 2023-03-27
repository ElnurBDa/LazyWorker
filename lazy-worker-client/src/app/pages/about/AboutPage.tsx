import './aboutPage.css'
import { Card } from 'react-bootstrap'


const AboutPage = () => {

  return (
    <>
      <h1 style={{textAlign: 'center' }}>About</h1>
      <h3 style={{textAlign: 'center' }}>LazyWorker</h3>
      <Card style={{'marginLeft':'10%', width: '80%'}}>
        <img src="/logo1024.jpg" alt="logo" style={{maxHeight:'380px', maxWidth:'380px', margin:'auto'}}/>
        <Card.Text>The freelance economy is growing, and with it, the number of job opportunities available on multiple freelance websites. Our purpose is trying to integrate these opportunities into a single platform which is called LazyWorker. </Card.Text>
        <Card.Text>Founders: Elnur Badalov, <b className="rainbow-text">Elcan Karimli</b>, Oleksandr Kryvych.</Card.Text>
      </Card>
    </>
  )
}
export default AboutPage
