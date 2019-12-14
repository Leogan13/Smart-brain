import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import brain2 from './brain2.png'

const Logo = () =>{
	return(
		<div className= 'ma3 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 }}>
 				<div className="Tilt-inner pa4"> 
 					<img src={brain2} alt='logo' style= {{paddingTop: '5px'}} /> 
 				</div>
			</Tilt>
		</div>
	)
}


export default Logo