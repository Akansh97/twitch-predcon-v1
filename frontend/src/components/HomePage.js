import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import twitchLogo from './twitch-logo.png'

const HomePage = () => {

  const {twitchIdContext} = useContext(UserContext)

  return (
    <div className=' p-4 bg-slate-900'>
          <div className='text-white flex flex-col items-center '>
            <h1 className='
              text-5xl  sm:text-6xl md:text-8xl lg:text-8xl 
              text-lime-400 mb-6 md:mb-14 lg:mb-16 xl:mb-18
              '>
                PredCon
            </h1>
            
            <div>
              <h1 className='
                text-4xl mb-4 text-center
              '>Welcome to our <span className='text-lime-400'>Pred</span>iction <span className='text-lime-400'>Con</span>test Platform!</h1>
              <h2 className='text-2xl ml-4 text-center text-slate-400'>Join in on the excitement with our user-friendly prediction contest application, complete with score tracking !</h2>
            </div>

            <div className='text-center mb-10 md:mb-20 mt-12 flex flex-row gap-4'>
            {
              !twitchIdContext 
              ?
              <div>
                  <Button 
                    sx={{
                      backgroundColor : '#ad37ff',
                      color : 'white',
                      paddingRight: '26px', 
                      "&:hover" : {
                        backgroundColor : 'lime',
                        color:'black'
                      }
                    }}
                    variant = 'contained' size='medium'
                    onClick={() => {
                      const e = document.getElementById('twitchLoginAnchor')
                      e.click()
                    }}
                    > 
                    <img className='w-10 h-10' src={twitchLogo} alt='twtich-logo' />
                    Login
                  </Button>
                </div>
              :
                <Link to='/predict' className=''>
                <Button 
                  sx={{
                    backgroundColor : 'lime',
                    color : 'black',
                    "&:hover" : {
                      backgroundColor : 'red',
                      color:'white'
                    }
                  }}
                  variant = 'contained' size='medium'>Lets Play !</Button>
              </Link> 
            }

            </div>


            <div className='mt-10'>
              <h2 className='uppercase ml-4 mb-4 font-bold text-red-500'>Requirements:</h2>
          
              <div className='ml-8 space-y-5'>
                <li>Twitch login is mandatory.</li>
                <li>All participants can join ongoing Prediction Contests by making their predictions.</li>
                <li>Admins can submit results, instantly updating scores for all participants.</li>
                <p> <span className='text-red-600 font-semibold'>Please note:</span> Admin privileges are needed to create prediction contests.</p>
              </div>
            </div>

          </div>
          
        </div>
  )
}

export default HomePage