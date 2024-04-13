import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ImageIcon from '@mui/icons-material/Image'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import TagFacesIcon from '@mui/icons-material/TagFaces'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const HomeSection = () => {

    const [uplodingImage, setUploadingImage]=useState(false);
    const [selectImage, setSelectedImage]=useState("");

    const validationSchema=Yup.object().shape({
        content:Yup.string().required("Post text is required")
    })

    const handleSubmit=(values) =>{
        console.log("values ", values)
    }

    const formik=useFormik({
        initialValues:{
            content:"",
            image:""
        },
        onSubmit:handleSubmit,
        validationSchema,
    })

    const handleSelectImage=(event) =>{
        setUploadingImage(true);
        const imgURL=event.target.files[0]
        formik.setFieldValue("image",imgURL);
        setSelectedImage(imgURL);
        setUploadingImage(false);
    }

  return (
    <div className='space-y-5'>
        <section>
            <h1 className='py-5 text-xl font-bold opacity-90'>Home</h1>
        </section>
        <section className={'pb-10'}>
            <div className='flex space-x-5'>
                <Avatar alt="username" src="UserAvatar.png" />
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
                        <div>
                            <img src="" alt="" />
                        </div>
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
        <section>
            
        </section>
    </div>
  )
}

export default HomeSection