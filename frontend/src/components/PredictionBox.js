import { Button } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import  serverConfig from '../config'

const { api_server } = serverConfig

const PredictionBox = (props) => {
    const {data, userContext} = props

    const [active,setActive] = useState(data.active)
    const predId = data._id
    
    
    const options = data.contestants
    const title = data.title

    const [selectedOption, setSelectedOption] = useState('')

    useEffect(() => {}, [active])

    const selectOption = (props) => {
        const {optId, prevOpt} = props
        const element = document.getElementById(optId)
        element.style.backgroundColor = 'green'
        element.style.color = 'white'

        if(prevOpt){
            const element = document.getElementById(prevOpt)
            element.style.backgroundColor = ''
            element.style.color = 'black'
        }
    }

    const submitHandler = async () => {

        setActive(prev => !prev)

        const rawresp = await fetch(`${api_server}/api/addBet`, {
            method:'PATCH',
            headers :{
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify({
                predId : predId,
                option : selectedOption,
                twitchId : userContext.id
            })
        })

        const resp = await rawresp.json()
        
        alert(resp.message)
    }

    let formattedDate = ''
    const convertDate = () => {
        const utcDateStr = data.dateTime;
        const utcDate = new Date(utcDateStr);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };

        formattedDate = new Intl.DateTimeFormat('en-US', options).format(utcDate);

    }

    convertDate()


    return <>
        {
            active === true
            ?
        
    <div className='
            flex flex-col px-12 py-8 
            max-w-custom-sm 
            sm:max-w-custom-sm md:max-w-custom-md lg:max-w-custom-lg 
            min-w-custom-sm
            sm:min-w-custom-sm md:min-w-custom-md lg:min-w-custom-lg 
            border-slate-700 border-2 mb-2 rounded
            bg-slate-900 mr-2
        '>

                <h1 className = 'mb-2 text-white capitalize text-xl'>{active} {title} </h1>
                <h1 className = 'mb-2 text-slate-400 text-sm'>{formattedDate} </h1>
                {
                    options.map((opt) => {
                        return <div id={`${opt._id}`} key={`${opt._id}`}
                            onClick= {() => {
                                setSelectedOption(opt._id)
                                selectedOption 
                                ? selectOption({optId: opt._id, prevOpt:selectedOption})
                                : selectOption({optId: opt._id})                        
                            }}
                            className = {`
                                border-2 border-slate-700 py-2 px-4
                                text-white
                                mb-4 uppercase hover:cursor-pointer
                                hover:bg-green-500

                            `}
                        >
                            {opt.name}
                        </div>
                    })
                }

                <Button variant='contained' key={`btn-${predId}`}
                    onClick ={submitHandler}
                    sx ={{
                        marginTop:"10px"
                    }}
                >
                    Submit
                </Button>
            
            </div>
        :    
        <> </> 

        }
    </>
}

export default PredictionBox