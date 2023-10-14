import GitHubIcon from '@mui/icons-material/GitHub';
import stark from './stark.png'
import beast from './beast.png'

import React from 'react'

const Footer = () => {

    const footerRef = {
        render : false,
        content : ''
    }

  return (
    <div className='
    text-black top-auto bg-white mt-auto
'>
    <div className='bg-white flex 
            flex-row justify-between 
            px-4 py-2 md:py-4 lg:py-6
             border-t-lime-400 border-t-2
        '>

        <div className='
            flex flex-col sm:flex-row 
             gap-1 lg:pt-2
            '>
            <div className='text-sm md:text-normal lg:text-lg xl:text-xl'>
                Created by
            </div>

            <div className='
                flex flex-row justify-center
                gap-1
                '>
                <a href='https://www.twitch.tv/aka_stark'
                    className='
                    hover:cursor-pointer
                    '
                >    
                    <img
                        className='
                            h-6 w-6 rounded-full
                            md:ml-2
                        ' 
                        src={stark}
                        alt='stark-twitch'
                    />
                </a>

                <div className='
                    text-center font-semibold
                    text-sm md:text-normal lg:text-lg xl:text-xl 
                    ml-1 
                '>
                    <a href='https://www.twitch.tv/aka_stark'
                        className='
                        hover:cursor-pointer
                        hover:border-b-purple-500 hover:border-b-2
                        hover:py-1
                        '
                    >
                    Aka_Stark
                    </a>
                </div>
            </div>


        </div>

        {
            footerRef.render
            ?
            
                <div className='
                    flex flex-col sm:flex-row 
                    gap-1 lg:pt-2
                    '>
                    <div className='text-sm md:text-normal lg:text-lg xl:text-xl'>
                        for
                    </div>

                    <div className='
                        flex flex-row justify-center
                        gap-1
                        '>
                        <a href='https://www.twitch.tv/beaststatsofficial'
                            className='
                            hover:cursor-pointer
                            '
                        >
                        <img
                            className='
                                h-6 w-6 rounded-full
                                md:ml-2
                            ' 
                            src={beast}
                            alt='stark-twitch'
                        />
                        </a>

                        <div className='
                            text-center font-semibold
                            text-sm md:text-normal lg:text-lg xl:text-xl
                            ml-1
                        '> <a href='https://www.twitch.tv/beaststatsofficial'
                                className='
                                hover:cursor-pointer
                                hover:border-b-purple-500 hover:border-b-2
                                py-1
                                '
                            >
                            {footerRef.content}
                            </a>
                        </div>
                    </div>

                </div>
            : <></>
        }
        

    </div>

    {/* <div className='flex flex-row bg-white-800 
        justify-between pt-2 pb-4 px-4'>
        <div className=' '>
            <h1>Created by 
                <a className=' 
                pb-4 pr-4 hover:cursor-pointer  ml-2
                hover:border-b-purple-500 hover:border-b-2' 
                href='https://www.twitch.tv/aka_stark'>
                    <span>
                        <img src={stark}
                            className='
                                border-2 border-slate-800
                                ml-1 mr-2 rounded-full h-8 w-8 inline
                            '
                            alt='stark-profile'/>
                    </span> 
                    <span className='font-bold'>Aka_Stark</span>
                </a>
            </h1>
        </div>
        <div className=' '>
        <h1 className=''>for 
            
        <a className=' 
            pb-4 pr-4 hover:cursor-pointer  ml-2
            hover:border-b-purple-500 hover:border-b-2' 
            href='https://www.twitch.tv/beaststatsofficial'>
                
            <span>
                <img src={beast}
                    className='
                    border-2 border-slate-800
                    ml-1 mr-2 rounded-full h-8 w-8 inline'
                alt='stark-profile'/>
            </span> 
            
            <span className='font-bold'>BeastStats</span>
            
        </a>

        </h1>
        </div>
    </div> */}

    <div className='
        text-black py-4 bg-slate-200 text-center
        hover:cursor-pointer border-b-4
        hover:bg-slate-300
        hover:border-b-purple-500 hover:border-b-4
        '>
        <a href='https://github.com/Akansh97'>
            <h1>Github</h1>
            <GitHubIcon />
        </a>
    </div>
    

</div>
  )
}

export default Footer