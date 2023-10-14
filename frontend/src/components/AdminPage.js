import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import ListItemText from '@mui/material/ListItemText';
// import EditIcon from '@mui/icons-material/Edit';
import { Button, ListItem, TextField } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
// import Predictions from './Predictions';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import  serverConfig from '../config'

const { api_server } = serverConfig

const AdminPage = () => {

    const [input, setInput] = useState('')
    const [contestants, setContestants] = useState({})
    const [idCounter, setIdCounter] = useState(1)
    const [title,setTitle] = useState()
    const [multiSelect, setMultiSelect] = useState(false)
    const [expire, setExpire] = useState()
    const [limit, setLimit] = useState(1)
    // const [remRef, setRemRef] = useState()

    const {
        isAdmin
    } = useContext(UserContext)

    useEffect(()=> {
        //console.log('REFRESHED')
    },[contestants, expire])

    const changeHandler = (e) => {
        //console.log({'name': e.target.name, 'value':e.target.value})
        if(e.target.name === 'contestantName')
            setInput(e.target.value)
        else if(e.target.name === 'predictionTitle')
            setTitle(e.target.value)
    }

    const removeHandler = (e) => {
        const deleteId = e.target.id
        //console.log("rem", deleteId)
        const newObj = {...contestants}
        delete newObj[deleteId]
        setContestants(newObj)
    }

    const check = () => {
        const data = {
            names : Object.values(contestants),
            active: true,
            title : title,
            multiSelect,
            expire
        } 
        console.log(data)
    }

    const submitPred = async() => {
        const element = document.getElementById('predForm')
        element.style.display ='none'
        const data = {
            names : Object.values(contestants),
            active: true,
            title : title,
            multiSelect,
            expire,
            limit
        } 
        console.log(data)
        //console.log(data)

        const resp = await fetch(`${api_server}/api/addPrediction`, 
            {    
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({ data, multiSelect })
            }
        )
        const res = await resp.json()
        
        if(res.result)  {
            alert("PREDICTION ADDED  !")
            setContestants({})
            setExpire()
            setTitle('')
            setLimit(1)
        }
        else alert(res.error)

        
    }

    const submitHandler = () => {
        if(input) {
            const element = document.getElementById('predForm')
            element.style.display ='flex'
            const id = `inp-${idCounter}` 
            setIdCounter(prev => prev + 1)
            let tempData = {}
            tempData[id] = input
            setContestants({ 
                ...contestants, 
                ...tempData
            })
            setInput('')
        }
        else {
            alert("Blank input !")
        }
    }

    return <>
    
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
                '>
                    Add New Contest/ Submit result for active contests
            </h1>

                    
            {/* <button className='bg-white p-4' onClick={check}> check</button> */}
            
            
            <div className='
                p-8 w-full flex flex-col items-center' >
            {
                isAdmin
                ?
                <div className='
                flex flex-col items-center bg-slate-200
                p-4 sm:p-2 rounded-xl w-fit
            '>


                    <div className='
                        flex flex-col  bg-white
                        py-4 px-0  sm:px-4 lg:px-8 rounded-md min-w-custom-sm lg:min-w-custom-md  
                    '>
                    <h1
                        className='mx-2 mb-10 mt-4 text-center text-black 
                            text-2xl sm:text-2xl md:text-3xl lg:text-4xl
                            border-b-2 border-b-black pb-3
                            '
                    >
                        Add New Contest
                    </h1>

                    <div className='
                        bg-slate-200 p-2 text-black flex flex-row gap-2 justify-around
                        mb-4
                        '>
                        <div>
                        <input className='mr-2' checked = {multiSelect ? true : false} type='checkbox' id='multi' name='multi' onClick={() => setMultiSelect(prev => !prev)}/>
                        <label htmlFor='multi'>Multi Select</label>
                        
                        
                        
                        </div>
                        <div>
                        <input className='mr-2' checked = {multiSelect ? false : true} type='checkbox' id='single' name='single' onClick={() => setMultiSelect(prev => !prev)} />
                        <label htmlFor='single'>Single Option</label>
                        </div>
                    </div>

                    {
                        multiSelect 
                        ?   <div className='
                                bg-slate-200 p-2 text-black flex flex-row gap-2 justify-around
                                mb-4
                            '>
                                <div>
                                <label htmlFor='limit' className='p-2'>Set Option Limit : </label>
                                <input type = 'text' className={`px-2 py-1 text-md text-center w-14 mr-2 rounded-md`}  name='limit' placeholder='' value= {limit} onChange={ (e) => setLimit(e.target.value) }/>
                                </div>
                                {limit && limit < idCounter - 1 ? <h1 className='py-1'>✅</h1> : <h1 className='py-1'> ❌ <span className='text-sm  font-semibold'> Add Options </span> </h1>}
                            </div>
                        : <></>

                    }


                    <div className=' flex flex-col gap-2 mb-4 bg-slate-200 px-4 pt-2 pb-4'>
                        <h1>Prediction Close Time</h1>
                        <form onSubmit={(e) => {e.preventDefault(); console.log(e.target[0].value); setExpire(e.target[0].value)}}
                            className='flex justify-between'
                        >
                        <input className='p-2' type="datetime-local" id="datetimeInput" onChange={(e) => setExpire(e.target.value)} value={expire}/>
                        {
                            !expire 
                            ? <button className='py-2 px-8 rounded-md text-center bg-green-300 hover:bg-green-400 hover:text-white' type='submit'>Set</button>
                            : <h1 className='text-center font-medium text-lg pt-2' >✅ Set</h1>
                        }
                        {/* <button className='py-2 px-4 text-center bg-green-300' type='submit'>Submit</button> */}
                        </form>
                    </div>

                    <TextField variant='outlined' label='Prediction Title'
                        placeholder='Enter Prediction Title'
                        onChange = {changeHandler}
                        name = 'predictionTitle'
                        value = {title}
                        sx ={{

                            input: { color: 'black' },
                            borderColor: "white",
                            marginBottom:"1rem",
                            '&::placeholder': {
                                textOverflow: 'ellipsis !important',
                                color: 'black'
                            }

                        }}
                    />

                    <TextField variant='outlined' label='Option'
                        placeholder='Option'
                        name = 'contestantName'
                        onChange = {changeHandler}
                        value = {input}
                        sx ={{

                            input: { color: 'black' },
                            // borderColor: "white",
                            marginBottom:"1rem",
                            '&::placeholder': {
                                textOverflow: 'ellipsis !important',
                                color: 'black'
                            }

                        }}
                    />
                    

                    <Button variant='outlined'
                        onClick={submitHandler}
                        sx ={{
                            marginTop: "8px"
                        }}
                    >
                        Add option
                    </Button>

                    {/* <Button 
                        variant = 'outlined'
                        sx ={{

                            marginTop: "4px"
                        }}        
                        onClick={() => //console.log(contestants)}>
                            Check
                    </Button> */}
                    
                    
                    <div className=' pb-2 mb-2 border-b-2 border-black'>
                    <Button fullWidth
                        variant = 'contained'
                        sx ={{
                            marginTop: "8px",
                            marginBottom: "10px"
                        }}        
                        onClick={submitPred}>
                            Add Contest
                    </Button>
                    </div>
                    {/* <br></br> */}

                    <Link to='/predictionResult'>
                        <Button fullWidth
                            variant = 'contained'
                            // color = 'success'
                            sx ={{
                                marginTop: "4px",
                                marginBottom: "8px",
                                backgroundColor:"black"
                            }}       
                            endIcon = {<LaunchIcon />} 
                            >
                               🎯 Submit Contest Result
                        </Button>
                    </Link>
                    
                    {/* </div> */}
                    
                    <br></br>
                    <div id='predForm' className='
                                hidden flex-col  bg-white
                                p-4 rounded-sm border-black border-2 
                            '>
                    { title 
                        ? 
                        <h1 className='uppercase font-bold' >{title}</h1> 
                        : 
                        <><h1 className='uppercase font-bold' >Predict</h1></> 
                    }
                    
                    {
                        contestants 
                        ?
                        Object.entries(contestants).map((value) => {
                            return  <div className='
                            '>
                            
                            <div className='flex flex-row
                                border-black border-2
                                rounded-md mb-2  my-4
                                uppercase bg-black
                                hover:cursor-pointer
                                hover:bg-slate-950
                                text-white
                            '>
                                    <RemoveCircleOutlineTwoToneIcon id={value[0]} color='warning'
                                        sx = {{ fontWeight : 'medium', fontSize :30 ,
                                                marginTop : "4px",
                                                marginLeft:"10px",
                                                border : "20px",
                                                borderColor: "black",
                                                '&:hover': {
                                                    color: 'red',
                                                    
                                                    cursor : 'pointer',
                                                }
                                            }}
                                        onClick={(e) => removeHandler(e)}
                                    />
                                    
                                    <ListItem
                                    > 
                                        { value[1] } 
                                    </ListItem>

                                    
                                    
                                    {/* <RemoveCircleOutlineTwoToneIcon id={value[0]} color='warning'
                                        sx = {{ fontWeight : 'medium', fontSize :30 ,
                                                marginTop : "4px",
                                                marginRight:"14px",
                                                border : "20px",
                                                borderColor: "black",
                                                '&:hover': {
                                                    color: 'red',
                                                    
                                                    cursor : 'pointer',
                                                }
                                            }}
                                        onClick={(e) => removeHandler(e)}
                                    /> */}
                                </div>
                            </div>
                        })
                        : <></>
                    }
                    </div>

                </div>
                </div>
                : <h1 className='text-red-500'>Login with Admin Account !</h1>
                }
            
        </div>
    </>
}

export default AdminPage