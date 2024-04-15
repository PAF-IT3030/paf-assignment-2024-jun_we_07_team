import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Button } from '@mui/material';

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
                borderRadius:"25px" }}>
                Get Verified
            </Button>
        </section>
    </div>
  )
}

export default RightPanel