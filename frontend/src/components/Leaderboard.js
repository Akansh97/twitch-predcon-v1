// import { LeaderboardOutlined } from '@mui/icons-material'
import React, {  useEffect, useState } from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import  serverConfig from '../config'

const { api_server } = serverConfig



const Leaderboard = () => {

    const [data, setData] = useState([])

    useEffect(()=>{
        getData()
    }, [])

    const getData = async() => {
        try {
            const rawdata = await fetch(`${api_server}/api/getLeaderboard`, {
                method : 'get',
                headers :{
                    'Content-Type' : 'application/json'
                }
            })
            const fetchedData = await rawdata.json()
            
            setData(fetchedData.result)
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }


  
    return (
        <div className='bg-slate-900'>
        <h1 className='
            text-white text-center uppercase text-xl
            bg-slate-800 p-2 mb-1
        '>
            leaderboard 
            <EmojiEventsIcon sx={{
                marginBottom:"5px",
                marginLeft : '10px'
            }}/>
        </h1>

        <h1 className='
            text-white text-center text-sm
             bg-slate-800 p-2 mb-4
            
            '>Champion of Champions!
        </h1>

        

    {/* sm md lg xl
    <!-- Width of 16 by default, 32 on medium screens, and 48 on large screens -->
    <img class="w-16 md:w-32 lg:w-48" src="..."></img> */}

        <div className='m-auto 
            sm:max-w-custom-sm md:max-w-custom-md lg:max-w-custom-lg xl:max-w-custom-xl'>
            
            <div className='
                text-black
                min-w-custom-sm
                sm:min-w-custom-sm md:min-w-custom-md lg:min-w-custom-lg xl:min-w-custom-xl
                flex flex-col
                '>
                <div className='
                    border-black border-2 my-2 py-2 pl-4 pr-6 
                    flex flex-row justify-between
                    text-white
                    bg-neutral-800
                
                '>
                <h1 className='text-md sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold uppercase'>Position</h1>
                <h1 className='text-md sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold uppercase'>Name</h1>
                <h1 className='text-md sm:text-sm md:text-md lg:text-lg xl:text-xl font-bold uppercase'>Score</h1>
                </div>
                {
                    data.length === 0
                    ? <></>
                    :
                    data.map((e,index) => {
                        return <div className='
                            border-black border-2 my-2 py-2 pl-8 pr-8 
                            flex flex-row justify-between
                            bg-neutral-200
                            sm:text-sm md:text-md lg:text-lg xl:text-xl 
                            font-medium
                        '>
                            <h1>{index + 1}</h1>
                            <h1 >{e.name}</h1>
                            <h2 >{e.wins.score}</h2>
                        </div>
                        }
                    )
                }

            </div>
        
        </div>
        </div>
    )
}

export default Leaderboard