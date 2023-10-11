import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Button, ListItem, TextField } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
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

    const {
        isAdmin
    } = useContext(UserContext)

    useEffect(()=> {

    },[contestants])

    const changeHandler = (e) => {
        if(e.target.name === 'contestantName')
            setInput(e.target.value)
        else if(e.target.name === 'predictionTitle')
            setTitle(e.target.value)
    }

    const removeHandler = (e) => {
        const deleteId = e.target.id
        const newObj = {...contestants}
        delete newObj[deleteId]
        setContestants(newObj)
    }

    const submitPred = async() => {
        const element = document.getElementById('predForm')
        element.style.display ='none'
        const data = {
            names : Object.values(contestants),
            active: true,
            title : title
        } 

        const resp = await fetch(`${api_server}/api/addPrediction`, 
            {    
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({ data })
            }
        )
        const res = await resp.json()
        
        if(res.result)  alert("PREDICTION ADDED  !")
        else alert(res.error)
        setContestants({})
        setTitle('')
        
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
                    
                    '>Add New Prediction/ Submit result for active prediction</h1>
            
            <div className='
                p-8 w-full flex flex-col items-center' >
            {
                isAdmin
                ?
                <div className='
                flex flex-col items-center bg-slate-200
                p-4 rounded-xl w-fit
            '>


                    <div className='
                        flex flex-col  bg-white
                        py-4 px-8 rounded-md min-w-custom-sm md:min-w-custom-md  
                    '>
                    <h1
                        className='mx-2 mb-10 mt-4 text-center text-black 
                            text-2xl sm:text-2xl md:text-3xl lg:text-4xl'
                    >
                        Add New Prediction
                    </h1>
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

                    <Button fullWidth
                        variant = 'contained'
                        sx ={{
                            marginTop: "8px",
                            marginBottom: "20px"
                        }}        
                        onClick={submitPred}>
                            Add Prediction
                    </Button>
                    

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
                                Submit Prediction Result
                        </Button>
                    </Link>
                    
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