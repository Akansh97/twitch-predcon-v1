import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'
import  serverConfig from '../config'
import TestResult from './AdminSubmitResult';

const { api_server } = serverConfig

const PredictResult = () => {
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
    
        // const checkContext = () => {
        //     console.log({
        //         twitchIdContext, 
        //         predictionsContext, 
        //     })
        // }

    useEffect(()=>{
        getData()
        // console.log('fetched', twitchIdContext, predictionsContext)
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
            // console.log({ 'type':typeof fetchedData, 'data fetched' : fetchedData})
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
            p-2 bg-slate-900  
            flex flex-row flex-wrap
            justify-center
            '> 
        {/* <Button onClick={checkContext}>check</Button>  */}
        {
            twitchIdContext 
            ?<>
                {/* <h1 className='p-2'>
                    User: {twitchIdContext.display_name}
                </h1> */}
                {
                    data.map((e) => 
                    <TestResult 
                        data={e} 
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