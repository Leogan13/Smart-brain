import React from 'react'


const Navigation = ({onRouteChange, isSignedIn}) =>{
	
		if(isSignedIn){
			return(
				<nav style = {{display: 'flex', justifyContent:'flex-end'}}>	
					<p onClick= {() => onRouteChange('signout')} /*returns the user to the sign in form*/ 
					className= 'f3 link dim black underline pa3 pointer'>Sign Out</p> 
				</nav>
			)
		}else{
			return(
				<nav style = {{display: 'flex', justifyContent:'flex-end'}}>	
					<p onClick= {() => onRouteChange('signin')} /*returns the user to the sign in form*/ 
					className= 'f3 link dim black underline pa3 pointer'>Sign in</p>
					<p onClick= {() => onRouteChange('register')} /*returns the user to the sign in form*/ 
					className= 'f3 link dim black underline pa3 pointer'>Register</p>  
				</nav>
			)
	  		}

}

export default Navigation

