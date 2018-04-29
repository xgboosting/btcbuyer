import React from 'react';
import NavBar from './NavBar';
import styles from '../assets/styling.css';
import kab from './../assets/kabuto.png'
import kableft from './../assets/kabutoleft.png'


const divStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   backgroundColor: '#ff4a83',
   color: 'white',
   height: '100%',
   width: '100%',
   color: 'white'
};

const mobileStyle = {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   textAlign: 'center',
   backgroundColor: '#ff4a83',
   color: 'white',
   height: '100%',
   width: '100%',
   color: 'white'
};
const footerStyle = {

left: '0',
bottom: '0',
width: '100%',
backgroundColor: '#ff4a83',
color: 'white',
textAlign: 'center'
}


const Home = () => {

  if (window.innerWidth <= 500) {
    return (
      <div style={mobileStyle}>
    <NavBar />
    </div>
    )
  }
  return (
  <div style={divStyle}>
  <NavBar />
  <div style={footerStyle}>
   
  </div>
  </div>

  )

}



/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/

export default Home;
