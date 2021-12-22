import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';


function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      const newSocket = io(`http://${window.location.hostname}:3009`);
      setSocket(newSocket);

      newSocket.on('message', (message) => {
          console.log(message)
      })

      document.querySelector("#message-form").addEventListener('submit', (event) => {
        event.preventDefault()
        const inp = event.target.elements.primary.value //a safer way as opposed to document.querySelector().value //target = form with id 'message-form'
        newSocket.emit('send_message', inp) //will turn this on server-side so that the message can be sent to all connected clients
  
      })
      
      document.querySelector('#location').addEventListener('click', (event) => {
        if (!navigator.geolocation) {
          return alert('Your browser does not support the Gelocation API and cannot get your location')
        }

        navigator.geolocation.getCurrentPosition((position) => { //using a callback func to pass on res from geolocation api to server-side
          newSocket.emit('send_location', {latitude: position.coords.latitude, longitude: position.coords.longitude})
        })
      })

    }, [setSocket]);
    
    
    
  
    return ( //<!--gets data from server side (express) and fetches it to client-side (react) for rendering-->
        <form id="message-form">
          <input name="primary" placeholder='Your message'></input>
          <button>Send Message</button>
          <br></br>
          <button id="location">Send your Location</button>
        </form>
    );
  }
  

export default App;
