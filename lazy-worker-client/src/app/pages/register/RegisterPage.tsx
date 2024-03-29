import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import * as yup from 'yup'
import { Formik } from 'formik'
import 'bootstrap/dist/css/bootstrap.min.css'
import './registerPage.css'
import { NotificationManager } from 'react-notifications'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useConfirmMutation, useRegisterMutation } from '../../services/auth.service'

const schema = yup.object().shape({
  email: yup.string().email().min(5, 'Too Short!').max(50, 'Too Long!').required("Email is required"),
  name: yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required(),
  password: yup.string().min(5, 'Too Short!').max(50, 'Too Long!').required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
})

const RegisterPage = () => {
  const [register, { data, error, isLoading }] = useRegisterMutation()
  const [confirm, dataErrorIsLoading] = useConfirmMutation()
  const navigate = useNavigate()
  const [otpIsSent,setOtpIsSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isConf,setIsconf] = useState(false);

  useEffect(() => {
    if (data && !error) {
      setOtpIsSent(true)
    } else if (error) {
      NotificationManager.error('Error registrating user, please check email, name or password.', 'Registration Error')
      console.log(`RegisterPage:: Authentication error`, error)
    }
  }, [data, error])

  useEffect(() => {
    confirmAndContinue()
  }, [otp])

  const confirmAndContinue =() =>{
    if(isConf) {
      navigate('/login');
      NotificationManager.success(`Welcome ${data.name}, now login please`, 'Registration Success')
    }
  }
  const handleRegister = (formValue: { email: string; password: string, name:string }) => {
    const { email, password, name } = formValue
    register({ email, password, name })
    setEmail(email);
  }

  const handleConfirm = () => {
    confirm({email, otp});
    setIsconf(dataErrorIsLoading.data);
    confirmAndContinue()
  }

  return (
    <div className="login-wrapper">
      <Formik
        validationSchema={schema}
        onSubmit={handleRegister}
        initialValues={{
          email: '',
          password: '',
          name: '',
          terms: false,
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
          <Card className="card" style={{ width: '18rem' }}>
            <Card.Title className="title">Registration Page</Card.Title>
            <Form className="form" noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Your email address"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationFormik02">
                <Form.Label>Name</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    aria-describedby="inputGroupPrepend"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationFormik02">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">&#128273;</InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                  id="validationFormik0"
                />
              </Form.Group>
              <Button type="submit">Submit form</Button>
            </Form>
          </Card>
        )}
      </Formik>
      {otpIsSent?<>
        <Card style={{height:"170px", marginLeft:"20px"}}>
        <Card.Title>Enter OTP</Card.Title>
        It is sent to your email.
        <input style={{marginBottom:"15px"}} type='number' onChange={(e) => setOtp(e.target.value)}/>
        <Button type="submit" onClick={() => handleConfirm()}>Verify email</Button>
        </Card>
      </>:<>
      </>}
    </div>
  )
}

export default RegisterPage
