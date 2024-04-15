import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Button } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const RightPanel = () => {

    const handleChangeTheme=() =>{
        console.log("Handle Change Theme")
    }

  return (
    <div className='py-5 sticky top-0'>
        <div className='relative flex items-center'>
            <input type='text'className='py-3 rounded-full text-gray-500 w-full pl-12' />
            <div className='absolute top-0 left-0 pl-3 pt-3 '>
                <SearchIcon className='text-gray-500'/>
            </div>
            <div>
            <Brightness4Icon
            className='ml-3 cursor-pointer'
            onClick={handleChangeTheme}
            />
            </div>
        </div>
        <section className='my-5'>
            <h1 className='text-xl font-bold'>
                Get Verified
            </h1>
            <h1 className='font-bold my-2'>
                Subscribe to Unlock New Features
            </h1>
            <Button
            variant='contatined'
            sx={{padding:"10px",
                paddingX:"20px",
                borderRadius:"25px",                
                bgcolor: "#05c653" }}>
                Get Verified
            </Button>
        </section>
        <section className='mt-7 space-y-5'>
            <h1 className='font-bold text-xl py-1'>
                What's Happening
            </h1>
            <div>
                <p className='text-sm'>
                    FIFA Women's World Cup · LIVE  
                </p>
                <p className='font-bold'>
                    Philippine Vs Switzerland
                </p>
            </div>
            {[1,1,1].map((item)=>
                <div className='flex justify-between w-full'>
                    <div>
                        <p>
                            Entertainment · Trending
                        </p>
                        <p className='font-bold'>
                            #TheMarvels
                        </p>
                        <p>
                            34.3k Post
                        </p>
                    </div>
                    <MoreHorizIcon/>
                </div>
            )}
        </section>
    </div>
  )
}

export default RightPanel