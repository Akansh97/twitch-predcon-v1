import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'
import ResultBox from './ResultBox'
import  serverConfig from '../config'

const { api_server } = serverConfig

const PredictResult = () => {
    const [data, setData] = useState([])
    const {
            twitchIdContext, 
            predictionsContext, 
            setPredictionsContext
        } = useContext(UserContext)

    useEffect(()=>{
        getData()
    }, [])

    useEffect(() => {}, [twitchIdContext, predictionsContext])

    const getData = async() => {
        try {
            const rawdata = await fetch(`${api_server}/api/getPredictions`, {
                method : 'get',
                headers :{
                    'Content-Type' : 'application/json'
                }
            })
            const fetchedData = await rawdata.json()
            setData(fetchedData.result)
            setPredictionsContext(fetchedData.result)
        } catch (error) {
            alert(error)
        }
    }



    return (
        <>
            <h1 className='
            text-white text-center uppercase text-xl
             bg-slate-800 p-2 mb-1
            
            '>
            Admin 
            
            <AdminPanelSettingsIcon sx={{
                marginBottom:"5px",
                marginLeft : '10px'
                }} />
            
            </h1>
            <h1 className='
            text-white text-center capitalize text-sm
             bg-slate-800 p-2 mb-4
            
            '>submit prediction result</h1>
        
        <div className='
            p-2 bg-slate-900 text-white 
            flex flex-row flex-wrap
            justify-center
            '> 

        {
            twitchIdContext 
            ?<>
                {
                    data.map((e) => 
                    <ResultBox 
                        data={e} 
                        userContext = {twitchIdContext}
                        predictionsContext = {predictionsContext}
                    /> )
                }
                
            </>
            :
            <h1>
                Please Login with Twitch !
            </h1>
        }
        </div>
        </>
    )
}

export default PredictResult