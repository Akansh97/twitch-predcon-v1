import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
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

            <Link to='/predict' className='text-center mb-10 md:mb-20 mt-12'>
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