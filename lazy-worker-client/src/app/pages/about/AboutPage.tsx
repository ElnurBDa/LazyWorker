import './aboutPage.css'
import { selectAuthenticatedUser} from '../../redux/slices/auth.slice'
import { useAppSelector } from '../../redux/hooks'
import { useEffect, useState } from 'react'
import { useAddInterestMutation, useRemoveInterestMutation } from '../../services/interests.service'

const AboutPage = () => {
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
    <div style={{'marginLeft':'10%'}}>
      <h1>My interests</h1>
      <div className="about-wrapper">
        {user.interests.map((interest, index) => {
          return (
            <div key={index} className="interest" onClick={handleRemove}>{interest}</div>)
            })}
      </div>
      <span> 
        <input value={newInterest} style={{'margin':'1rem'}} onChange={handleChange}></input>
        <button onClick={handleAddInterest}>ADD</button>
      </span>
    </div>
  )
}
export default AboutPage
