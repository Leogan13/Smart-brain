import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = (props) =>{
	return(
		<div>
			<p className='f3'>
				{'This Magic brain will detect faces in your pictures. Give it a try'}

			</p>
			<div className='center'>
				<div className='pa4 br3 shadow-5 center form'>
					<input className= 'f4 pa2 w-70 ' type='text' onChange= {props.onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick= {props.onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	)
}


export default ImageLinkForm