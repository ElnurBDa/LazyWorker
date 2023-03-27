import './problemPage.css'
import { Card } from 'react-bootstrap'


const ProblemPage = () => {

  return (
    <>
      <h1 style={{textAlign: 'center' }}>Problem?</h1>
      <Card style={{'marginLeft':'10%', width: '80%'}}>
        <Card.Text>We are so sorry that you experiencing some problems with our website. Development of our project is undergoing, new features will be implemented soon!</Card.Text>
        <img src="sorry.jpg" alt="sorry" style={{maxHeight:'400px', maxWidth:'400px', margin:'auto'}}/>
      </Card>
    </>
  )
}
export default ProblemPage
