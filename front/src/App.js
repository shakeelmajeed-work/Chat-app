import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';


function App() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      const newSocket = io(`http://${window.location.hostname}:3000`);
      setSocket(newSocket);

      newSocket.on('welcome_message', (message) => {
          console.log(message)
      })
      
    }, [setSocket]);
    
    
  
    return ( //<!--gets data from server side (express) and fetches it to client-side (react) for rendering-->
        <p>Hey</p> 
    );
  }
  

export default App;
