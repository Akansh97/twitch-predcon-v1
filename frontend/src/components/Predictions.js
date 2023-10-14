import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import  serverConfig from '../config'
import PredictionCard from './PredictionCard';

const { api_server } = serverConfig

const Predictions = () => {
    const [data, setData] = useState([])
    const {
            twitchIdContext, 
            predictionsContext, 
            setPredictionsContext
        } = useContext(UserContext)

        // id, login, 
        // display_name, type, 
        // broadcaster_type, description, 
        // profile_image_url, offline_image_url, 
        // view_count, created_at
    

    useEffect(()=>{
        getData()
        // console.log('fetched', twitchIdContext, predictionsContext)
    }, [])

    useEffect(() => {}, [twitchIdContext])


    const getData = async() => {
        try {
            const rawdata = await fetch(`${api_server}/api/getPredictions`, {
                method : 'get',
                headers :{
                    'Content-Type' : 'application/json'
                }
            })
            const fetchedData = await rawdata.json()
            fetchedData.result.multiSelect = true
            setData(fetchedData.result)
            setPredictionsContext(fetchedData.result)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className='bg-slate-900'>
        <h1 className='
            text-white text-center uppercase text-xl
             bg-slate-800 p-2 mb-1
            
        '>
            Active Contests 
            
            <SportsEsportsIcon sx={{
                marginBottom:"5px",
                marginLeft : '10px'
            }} />
        </h1>
        <h1 className='
            text-white text-center  text-sm
             bg-slate-800 p-2 mb-4
            
            '>Predict the Future, Win the Game!</h1>
        <div className='
            py-2 pl-2 pr-1 flex flex-row flex-wrap
             justify-center mt-2 
        '>  
        
        {
            twitchIdContext 
            ?<>
                {
                    data.map((e) => 
                    <PredictionCard 
                        data={e} 
                        userContext = {twitchIdContext}
                        predictionsContext = {predictionsContext}
                    /> )
                }
            </>
            :
            <h1 className='text-red-500'>
                Please Login with Twitch !
            </h1>
        }
        </div>
        </div>
    )
}

export default Predictions