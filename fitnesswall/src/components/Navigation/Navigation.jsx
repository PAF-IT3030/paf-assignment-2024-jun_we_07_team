import React from 'react'
import { navigationMenu } from './NavigationMenu'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Create Mui Custom Theme
const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: '#05c653', //background color
            '&:hover': {
              backgroundColor: '#04c353', //hover color
            },
          },
        },
      },
    },
  });

function Navigation() {
    const navigate=useNavigate();
  return (
    <div className='h-screen sticky top-0' >
        <div>
            <div className='py-5'>
                <img src='logo.png' alt='logo' height={50} width={50} />
            </div>
            <div className='space-y-6'>

                {navigationMenu.map((item)=> <div className='cursor-pointer flex space-x-3 items-center'
                onClick={()=>item.title==="Profile"?navigate(`/profile/${5}`)
                :navigate(item.path)} >
                    {item.icon}
                    <p className='text-xl'>{item.title}</p>

                </div>)}
            </div>

            <div className='py-10'>
                <ThemeProvider theme={theme}>
                    <Button
                    sx={{width:"100%", borderRadius:"30px", py:"15px", bgcolor:"#05c653"}}
                    variant='contained'
                    >
                        
                        <b>Post</b>

                    </Button>
                </ThemeProvider>
            </div>
            
        </div>
    </div>
  )
}

export default Navigation