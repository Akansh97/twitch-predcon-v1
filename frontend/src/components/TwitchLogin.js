import twitchLogo from './twitch-logo.png'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

import  serverConfig from '../config'

const { api_server, twitchRedirectURI } = serverConfig


const TwitchLogin = () => {
    const {
        twitchIdContext, setTwitchIdContext, setAdmin
    } = useContext(UserContext)
    
    const [twitchUser, setTwitchUser] = useState();
    const [, setTwitchUserId] = useState();
    const [, setTwitchUserLogin] = useState();
    const [twitchUserName, setTwitchUserName] = useState();
    const [twitchUserProfileImageUrl, setTwitchUserProfileImageUrl] = useState();
    const [loginError, setLoginError] = useState()
    const [, setAuthToken] = useState()
    const [, setLoggedIn] = useState(false)
  
    const getTwitchUserData = async(authTokenLoaded) => {
      
    //   console.log({"fn":authTokenLoaded})
      const rawdata = await fetch(`${api_server}/api/getTwitchUser/${authTokenLoaded}`, {
        method : "get",
        contentType : "application/json"
      })
      const resp = await rawdata.json()
        
            if(resp.error)
              setLoginError(resp.error)
            else
            { 
                console.log(resp)
                const {
                        id, login, display_name, profile_image_url
                    } = resp.data[0]
                setLoggedIn(true)
                setTwitchUserId(id)
                setTwitchUserLogin(login)
                setTwitchUserName(display_name)
                setTwitchUserProfileImageUrl(profile_image_url)
                setTwitchUser(resp.data[0])
                setTwitchIdContext(resp.data[0])

                const sessionData = {
                    id,
                    login,
                    display_name,
                    profile_image_url,
                }

                sessionStorage.setItem(
                    'twitchContext', JSON.stringify(sessionData)
                )
                
                const twId = id.toString()
                
                const rawrep = await fetch(`${api_server}/api/addUser`, {
                    method:'POST',
                    headers :{
                        'Content-Type' : 'application/json'
                    },
                    body :JSON.stringify({
                        name :display_name,
                        twitchId : twId,
                        
                    })
                })
                const response = await rawrep.json()
                // setTwitchIdContext(response)
                // console.log({'adduser':response})
                // alert(response.message)

                const twid2 = id.toString()
                const raw = await fetch(`${api_server}/api/getAdminDetails/${twid2}`,
                    {
                        method : 'get',
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }
                )
                const response2 = await raw.json()
                // console.log({"res2":response2.result[0].admin})
                setAdmin(response2.result[0].admin)
            }
        
    }
  
    useEffect(() => {

        const storedContext = JSON.parse(
            sessionStorage.getItem('twitchContext')
        )

        if(!storedContext) {

            if(document.location.hash && !twitchUser)
            {
                const url = document.location.hash
                const query = url.toString().substr(1) 
                let result = [];
                query.split("&").forEach(function(part) {
                var item = part.split("=");
                result[item[0]] = decodeURIComponent(item[1]);
                });
                // console.log({"ans": result.access_token})
        
                const authTokenLoaded = result.access_token
                if(!twitchIdContext)
                {
                    setAuthToken(authTokenLoaded)
                    localStorage.setItem('authTokenLoaded', 
                    JSON.stringify(authTokenLoaded))
                    getTwitchUserData(authTokenLoaded)
    
                }
            }

        }

        else {
            const {
                id, login, display_name, profile_image_url
            } = storedContext

            setLoggedIn(true)
            setTwitchUserId(id)
            setTwitchUserLogin(login)
            setTwitchUserName(display_name)
            setTwitchUserProfileImageUrl(profile_image_url)
            setTwitchUser(storedContext)
            setTwitchIdContext(storedContext)
        }

        if(storedContext) 
        {
            const twid = storedContext.id
            getAdminDetails(twid)
        }

    }, [])

    const getAdminDetails = async(id) => {
        const twid2 = id.toString()
        const raw = await fetch(`${api_server}/api/getAdminDetails/${twid2}`,
            {
                method : 'get',
                headers : {
                    'Content-Type' : 'application.json'
                }
            }
        )
        const response2 = await raw.json()
        // console.log({"res2":response2.result[0].admin})
        setAdmin(response2.result[0].admin)
    }

    return (
      
        <div className='
            flex flex-col border-b-2 border-b-blue-500 
             mb-2
            '>
            { 
                twitchUser 
                ? <></>
                : 
                <>
                    <div className='flex flex-col items-center justify-center'>
                    <a
                        id = 'twitchLoginAnchor'
                        className={`
                            bg-purple-700 text-slate-300
                            px-2 py-1 w-full text-center
                            text-sm
                            h-24
                            cursor:pointer
                            hover:bg-purple-600 hover:text-slate-200
                        ` }
                        href={`${twitchRedirectURI}`}>
                        <p className='block'>                    
                        <img src={twitchLogo} alt='twitchLogo'
                        className='w-14 h-14 inline'
                        /></p>
                        Connect with Twitch
                  </a> 
                  </div>
                </>
            }
            
          {/* <button onClick={() => setAuthToken(document.location.hash)}>
            Get Token
          </button>
          <button onClick ={getTwitchUserData}>Get User</button> */}
            {
              loginError 
                ? 
                  <h1>Error : {loginError}</h1>
                : 
                  twitchUser 
                  ? 
                    <div className='text-white flex flex-col  
                        h-22 justify-center items-center bg-black'>
                      {/* <div className=''> */}
                        <button 
                            className= {`
                                flex self-end uppercase mr-2 mt-1 cursor-pointer text-xs
                                 text-red-500 
                                  px-2 py-1 rounded-sm
                                   
                                 hover:text-white hover:bg-red-700 }
                            `}
                            onClick = {() => 
                               {    
                                    setTwitchUser()
                                    setTwitchIdContext('')
                                    setAdmin(false)
                                    sessionStorage.clear()
                                    document.location.hash = ''
                                    return console.log('logged out')
                                }
                            }
                        >
                            logout
                        </button>
                        <img className='w-8 h-8  rounded-full' 
                          src={twitchUserProfileImageUrl} alt='profile_pic'/>
                        {/* <p className=' text-sm'>{twitchUserId}</p>
                        <p className=' text-sm'>{twitchUserLogin}</p> */}
                        <h2 className=' mt-1 mb-4 text-xs'>{twitchUserName}</h2>
                      {/* </div> */}
                    </div>
                  :
                    <> </>
            }

            
        </div>
        
      
    );
  }


export default TwitchLogin