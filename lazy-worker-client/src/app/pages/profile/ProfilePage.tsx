import './profilePage.css'
import { selectAuthenticatedUser} from '../../redux/slices/auth.slice'
import { useAppSelector } from '../../redux/hooks'
import { useEffect, useState } from 'react'
import { useAddInterestMutation, useRemoveInterestMutation } from '../../services/interests.service'
import { Button, Card } from 'react-bootstrap'

const ProfilePage = () => {
  const [addInterest, { data, error, isLoading }] = useAddInterestMutation();
  const [removeInterest, dei] = useRemoveInterestMutation();
  const [newInterest,setNewInterest] = useState('my new interest');

  const [user, setUser] = useState(useAppSelector(selectAuthenticatedUser));

  const handleAddInterest = () => {
    console.log(`Error ${error} | Data ${data}`)
    addInterest({
      interest: newInterest,
      email: user.email,
    })
    
    if (!user.interests.includes(newInterest)){
      const interests = [...user.interests, newInterest];
      setUser({...user, interests})
      console.log("User: ",user);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  }, [newInterest,user])

  const handleChange = (event:any) => {
    setNewInterest(event.target.value)
  }

  const handleRemove = (event:any) => {
    const interestToRemove = event.target.textContent;
    removeInterest({
      interest: interestToRemove,
      email: user.email,
    })


    const interests = user.interests.filter((interestt) => {
      return interestt !== interestToRemove;
    })
    setUser({...user, interests})
    console.log("User: ",user);
    localStorage.setItem('user', JSON.stringify(user));

  }

  return (
    <>
      <h1 style={{textAlign: 'center' }}>Profile</h1>
      <Card style={{'marginLeft':'10%', width: '80%'}}>
        <Card.Title>My interests</Card.Title>
        <Card.Text>Add your interests below and click on them to remove them.</Card.Text>
        <div className="interest-wrapper">
          {user.interests.map((interest, index) => {
            if (interest==="") return;
            return (
              <div key={index} className="interest" onClick={handleRemove}>{interest}</div>)
              })}
        </div>
        <span> 
          <input value={newInterest} style={{'margin':'20px 10px 0 0'}} onChange={handleChange}></input>
          <Button variant="primary" onClick={handleAddInterest}>ADD</Button>
        </span>
      </Card>
    </>
  )
}
export default ProfilePage
