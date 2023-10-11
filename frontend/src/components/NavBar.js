
import TwitchLogin from './TwitchLogin'
import logo2 from './logo2.png'
import {Link} from 'react-router-dom'

import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
    

const Navbar = () => {
    const {
        isAdmin
    } = useContext(UserContext)

    useEffect(() => {}, [isAdmin])

    return <div className=''>
    <div className="
            
            navbar flex flex-row justify-between  
            w-full h-10 bg-black text-white 
             pb-10 mb-1 pt-1
        ">
        
        <Link className='' to='/home'>
            <img className="app-logo w-12 ml-6 mt-1  h-12 z-20 absolute cursor-pointer" src = {logo2} alt='logo'/>
            <h1 className='
                hidden md:flex 
                md:text-3xl md:font-bold ml-20 
              md:text-lime-400 
              '>
                PredCon
            </h1>
        </Link>
        <div className='flex flex-row z-10 nav-links mx-2 mb-1 
         
                text-xs sm:text-xs md:text-lg lg:text-lg
            '>
            <Link to='/predict'>
                <p className='
                    font-medium uppercase  ml-2 my-2 md:my-1 hover:cursor-pointer
                    hover:border-b-purple-400 hover:border-b-4 px-4 hover:rounded-sm py-1
                '>
                    Predict
                </p>
            </Link>
            <Link to='/leaderboard'>
                <p className='
                    font-medium uppercase ml-1  my-2 md:my-1  hover:cursor-pointer
                    hover:border-b-purple-400 hover:border-b-4 px-4 hover:rounded-sm py-1
                    '>
                    Leaderboard
                </p>
            </Link>
            
            {
                isAdmin 
                ?
                <>
                    <Link to='/admin'>
                        <p className='
                            font-medium uppercase my-2 md:my-1 mr-2 my-1 hover:cursor-pointer
                            hover:border-b-purple-400 hover:border-b-4 px-4 hover:rounded-sm py-1
                            '>
                            admin
                        </p>
                    </Link>
                </>
                :<></>
            }
        </div>
    </div>
    <TwitchLogin />
    
    </div>

}

export default Navbar