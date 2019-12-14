import React, {Component} from 'react';
import './App.css';
import Clarifai from 'clarifai'
import Navigation from './Component/Navigation/Navigation'
import Logo from './Component/Logo/Logo'
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm'
import Rank from './Component/Rank/Rank'
import Particles from 'react-particles-js'
import FaceRecognition from './Component/FaceRecognition/FaceRecognition'
import Signin from './Component/Signin/Signin'
import Register from './Component/Register/Register'




const app = new Clarifai.App({
 apiKey: '1fc808a6bed14b6f8582113187228428'
});



const particlesOptions ={
                  particles:{
                    number:{
                      value: 50,
                      density: {
                        enable: true,
                        value_area: 1500

                      }
                    }

                  }
}




class App extends Component {
    constructor(){
      super()
      this.state={
          input: '',
          imageUrl: '',
          box: {},
          route:'signin',  //controls if a user is sign in the app
          isSignedIn: false,
          user:{ //this is a profile state it just controls the current user logged
            id:'',
            name:'',
            email: '',
            entries: 0,
            joined: ''
          }

      }
    
    }

    loadUser = (data) => {
      this.setState({user: {
            id:data.id,
            name:data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
      }})

    }

    /*componentDidMount(){ //connecting to the backend using fetch
      fetch('http://localhost:3000')
          .then(response => response.json())
          .then(console.log)
  
      }*/
    


    calculateFaceLocation = (data) =>{
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(width, height)
      console.log(clarifaiFace)
      return{
        leftCol:clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height),
      }
    }

    displayFaceBox = (box) =>{
      this.setState({box:box});
    }


    onInputChange = (event) =>{ //capture the value of the strings entered in the facerecognition box
      this.setState({input: event.target.value})
    }

    onButtonSubmit= () =>{
        this.setState({imageUrl:this.state.input})
        app.models
        .predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
        .then(response => {
          if(response) {
            fetch('http://localhost:3000/image', {
              method:'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id: this.state.user.id
               })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))// first param target object,second what you want to change
              })
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err))
    }


    onRouteChange = (route) => {    // used in signin checks the current route and checks if the user is logged or not
      if (route === 'signout') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }

  
    render(){
        return (
          <div className="App">
            <Particles className = 'particles'
            params={particlesOptions} />
            <Navigation isSignedIn={this.state.isSignedIn} onRouteChange= {this.onRouteChange} />
            {this.state.route === 'home' // a simple if statement to check if the user is signed in
                ? <div>
                    <Logo />
                    <Rank 
                      name={this.state.user.name}
                      entries={this.state.user.entries}
                    />
                    <ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onButtonSubmit={this.onButtonSubmit} 
                    />
                    <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
                  </div>
                : (
                    this.state.route === 'signin'
                    ?<Signin onRouteChange= {this.onRouteChange} loadUser={this.loadUser} />
                    :<Register onRouteChange= {this.onRouteChange} loadUser={this.loadUser} />
                  )
            }
          </div>
        );
    }
}

export default App;
