
import './App.css';
import { Outlet, useNavigate} from 'react-router-dom'
import Navbar from './components/NavBar';
import { useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import Footer from './components/Footer';

function App() {

  const [twitchIdContext, setTwitchIdContext] = useState('')
  const [predictionsContext, setPredictionsContext] = useState('')
  const [userDBContext, setUserDBContext] = useState('')
  const [isAdmin, setAdmin] = useState(false)
  const navigate = useNavigate();

  // Check if the user is on the root URL and redirect to '/home' if so
  useEffect( () => {
    if (window.location.pathname === '/') {
      console.log('nav')
      navigate('/home');
    }
  } , [] )


  return (
    <div className='
      full-container bg-slate-900 w-full min-h-screen'>
      <UserContext.Provider value ={{ 
          twitchIdContext, setTwitchIdContext,
          predictionsContext, setPredictionsContext,
          userDBContext, setUserDBContext,
          isAdmin, setAdmin 
        }}>

          <Navbar />
          <div className='  mb-16'>
          <Outlet />
          </div>
          <Footer />


      </UserContext.Provider>
    </div>
  );
}

export default App;
