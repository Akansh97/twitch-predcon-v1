import React, { useEffect, useState } from 'react'
import  serverConfig from '../config'

const { api_server } = serverConfig



const PredictionCard = (props) => {

    const {data, userContext} = props
    // console.log("data:", data)
    
    const [active,setActive] = useState(data.active)
    const predId = data._id
    const expire = data.expire
    
    
    
    const o1 = data.contestants
    const o2 = o1.map(e => {
        e.selected = false
        e.id =  e._id
        return e
    })
    const title = data.title

    const [ selectedOptions, setSelectedOptions ] = useState([])
    const [ multiSelect, setMultiSelect ]= useState(data.multiSelect)
    const [ options, setOptions ] = useState(o2)
    const [ initial, setInitial ] = useState(o2) 

    const [limit, setLimit] = useState(data.limit)

    const clickHandler = ( e, option ) => {
        
        if(multiSelect === true) 
        {
            console.log(option)
            if(option.selected === false){

                if(selectedOptions.length > 0)
                {
                    setSelectedOptions(prev => {
                        return [...prev, option.id]
                    })
                }
                else {
                    setSelectedOptions([option.id])
                }

                setOptions(prev => {
                
                    const temp = prev.map(e => {
                        if(e.id === option.id) {
                            const {selected, ...n} = e
                            n.selected = true
                            return n
                        }
                        return e
                    })

                    return [...temp]
                })
            }
            else if (option.selected === true) {

                if(selectedOptions.length > 0)
                {
                    setSelectedOptions(prev => {
                        const t = prev.filter(e => e !==  option.id)
                        return t
                    })
                }


                setOptions(prev => {
                
                    const temp = prev.map(e => {
                        if(e.id === option.id) {
                            const {selected, ...n} = e
                            n.selected = false
                            return n
                        }
                        return e
                    })

                    return [...temp]
                })
            }
        }
        
        else if (multiSelect === false) {

            setSelectedOptions([option.id])
            setOptions(prev => {
                
                const temp = prev.map(e => {
                    if(e.id === option.id) {
                        const {selected, ...n} = e
                        n.selected = true
                        return n
                    }
                    const {selected, ...n} = e
                    n.selected = false
                    return n
                })

                return [...temp]
            })
        }
    }

    const submitHandler = async () => {

        console.log({
            predId : predId,
            option : selectedOptions,
            twitchId : userContext.id
        })

        setActive(prev => !prev)
        // resetForm()

        const rawresp = await fetch(`${api_server}/api/addBet`, {
            method:'PATCH',
            headers :{
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify({
                predId : predId,
                option : selectedOptions,
                twitchId : userContext.id
            })
        })

        const resp = await rawresp.json()
        // console.log(resp)
        alert(resp.message)
    }

    useEffect(() => {
        // console.log({'options' : options, 'multi' : multiSelect})
    }, [options, multiSelect, selectedOptions, active])

    let formattedDate = data.dateTime
    const convertDate = (v) => {
        
        const utcDateStr = v
        const utcDate = new Date(utcDateStr);

        // Convert to UTC+5:30
        // utcDate.setMinutes(utcDate.getMinutes() + 330); // 5 hours and 30 minutes

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        formattedDate = new Intl.DateTimeFormat('en-GB', options).format(utcDate);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const parts = formattedDate.split('/');
        const monthIndex = parseInt(parts[1]) - 1;
        parts[1] = months[monthIndex];
        const finalFormattedDate = parts.join(' - ');

        return finalFormattedDate;

        // return formattedDate
    }

    // convertDate()
    
    const resetForm = () => {
        alert(`select max ${limit} options`)
        setSelectedOptions([])
        setOptions(initial)
    }

    return (<>
        {
            active 
                ? <div className='
                            flex flex-col px-12 py-8 
                            max-w-custom-sm 
                            sm:max-w-custom-sm md:max-w-custom-md 3xl:max-w-custom-lg 
                            min-w-custom-sm
                            sm:min-w-custom-sm md:min-w-custom-md 3xl:min-w-custom-lg 
                            border-slate-700 border-2 mb-2 rounded-md
                            bg-slate-100 mr-2 
                '>

                <h1 className = 'mb-2 text-black capitalize border-b-4  border-black pb-2 font-semibold text-2xl'>{active} {title} </h1>

                <div className='mb-2 py-2 flex flex-col  gap-1'>
                    
                    {/* <div className='flex flex-row bg-white px-2'>
                        <h1 className = ' text-slate-800 font-bold text-sm'>Start time:  </h1>
                        <h1 className = ' text-slate-800 text-sm ml-2'>{convertDate(data.dateTime)} </h1>
                    </div> */}
                    <div className='flex flex-row'>
                        <h1 className = ' text-red-700 font-bold text-sm'>End Time:  </h1>
                        <h1 className = 'flex justify-end font-bold text-slate-800 text-sm ml-2'>{convertDate(expire)} </h1>
                    </div>
                </div>

                <div className='
                    text-red font-semibold flex flex-row justify-end
                    w-full mb-4 text-white
                    '>
                    <div className='text-xs w-full bg-slate-800 px-4 py-2 '>
                        {
                            multiSelect 
                            ? <h1 >☑️ 🎫 Multi Select : {limit} <span>{ limit > 1 ? 'Options' : 'Option'}</span> </h1>
                            : <h1 >🎟️ Single Option </h1>
                        }
                    </div>
                </div>
                {
                    options 
                    ? options.map( option => {
                        return (
                        <div className={`
                                hover: cursor-pointer
                                pl-8
                                py-2 px-4
                                mb-4 
                                 border-2 border-black
                                ${
                                    option.selected
                                    ? 'bg-green-600 text-white '
                                    : 'hover:bg-green-300 bg-white '
                                }
                            `}
                        id = {option.id}
                        onClick ={(e) => clickHandler(e, option)}
                        >
                            {option.name}
                        </div>
                        )
                    })
                    :<></>
                }

                <button 
                    className='bg-blue-600
                        hover:bg-blue-500
                        hover: cursor-pointer
                        text-white
                        border-2 border-slate-900
                        p-2
                        mt-4
                        mb-8

                    '
                    onClick={() => {selectedOptions.length > limit ? resetForm() : submitHandler() }}>
                    Submit
                </button>

            </div>
        
            :<></>
        }
    </>
    )
}

export default PredictionCard