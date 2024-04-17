import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from 'formik'

//Create Mui Custom Theme
const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: "#05c653", //background color
            "&:hover": {
              backgroundColor: "#04c353", //hover color
            },
          },
        },
      },
    },
  });

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4
};

export default function ReplyModal({handleClose, open}) {

    const navigate = useNavigate()

    const handleSubmit=(values) =>{
        console.log("values ", values)
    }

    const formik=useFormik({
        initialValues:{
            content:"",
            image:"",
            postId: 4
        },
        onSubmit:handleSubmit
    })

    const [uplodingImage, setUploadingImage]=React.useState(false);
    const [selectImage, setSelectedImage]=React.useState("");

    const handleSelectImage=(event) =>{
        setUploadingImage(true);
        const imgURL=event.target.files[0]
        formik.setFieldValue("image",imgURL);
        setSelectedImage(imgURL);
        setUploadingImage(false);
    }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='flex space-x-5'>
            <Avatar
                onClick={() => navigate('/profile/${6}')}
                className='cursor-pointer'
                alt="username"
                src="/UserAvatar.png"
            />
            <div className='w-full'>
                <div className='flex justify-between items-center'>
                    <div className='flex cursor-pointer items-center space-x-2'>
                        <span className='font-semibold'>Tharaka Madushanka Wanshathilaka</span>
                        <span className='text-gray-600'>@TheLionKIng .2m</span>
                        <img className='ml-2 w-5 h-5' src="/verified.png" alt="Profile Varification Icon" />
                    </div>
                </div>
                <div className='mt-2'>
                    <div onClick={()=>navigate(`/post/${3}`)} className='cursor-pointer'>
                        <p className='mb-2 p-0'>
                            Social Media App - Full Stack Project with Springboot & React
                        </p>
                    </div>
                </div>
            </div>
        </div>
         <section className={'py-10'}>
            <div className='flex space-x-5'>
                <Avatar alt="username" src="../UserAvatar.png" />
                <div className='w-full'>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <input type="text" name='content' placeholder='Whats Up?'
                            className={'border-none outline-none text-xl bg-transparent'}
                            {...formik.getFieldProps("content")}/>
                            {formik.errors.content && formik.touched.content && (
                                <span className='text-red-500'>{formik.errors.content}</span>
                            )}
                        </div>
                        {/*
                        <div>
                            <img src="" alt="" />
                        </div>
                        */}
                        <div className='flex justify-between items-center mt-5'>
                            <div className='flex space-x-5 items-center'>
                                <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                                    <ImageIcon className='text-[#05c653]'/>
                                    <input type="file" name='imageFile' className='hidden' onChange={handleSelectImage}></input>
                                </label>
                                <FmdGoodIcon className='text-[#05c653]'/>
                                <TagFacesIcon className='text-[#05c653]'/>
                            </div>
                            <div>
                                <ThemeProvider theme={theme}>
                                    <Button
                                        sx={{
                                            width: "100%",
                                            borderRadius: "20px",
                                            paddingY: "8px",
                                            paddingX: "20px",
                                            bgcolor: "#05c653",                                            
                                        }}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Post
                                    </Button>
                                </ThemeProvider>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>         
        </Box>
      </Modal>
    </div>
  );
}