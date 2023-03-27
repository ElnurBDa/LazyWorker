import './footer.css'

const Footer = () => {
    return (
        <div className='footer'>
          <p>© 2023 LazyWorker All rights reserved.</p>
          <div className='line'></div>
          <a style={{color:'black', textDecoration:'none'}} href="/problem">If you have some questions click here!</a>
        </div>
    )
}

export default Footer;