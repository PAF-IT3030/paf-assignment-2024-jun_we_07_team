import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: 4
};

export default function SubscriptionModal({handleClose, open}) {

  const features = [
    "Prioritized rankings in conversations and search.",
    "See approximately twice as many Posts between ads in your For You and Following timelines.",
    "Add bold and italic text in your Posts.",
    "Post longer videos and 1080p videos uploads.",
    "All the existing Green features, including Edit Post, Bookmark Folders and early access to new features."
  ]

  const [plan, setPlan]=React.useState("Annually")

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='flex items-center space-x-3'>
            <IconButton onClick={handleClose} aria-label='delete'>
              <CloseIcon/>                    
            </IconButton>
          </div>
          <div className='flex justify-center py-10'>
            <div className='w-[80%] space-y-10'>
              <div className='p-5 rounded-md flex items-center justify-between bg-green-50 shadow-lg'>
                <h1 className='text-xl pr-5'>
                  Green subscribers with a verified phone number will get a green checkmark once approved.
                </h1>
                <img className='w-24 h-24' src="../verified.png" alt="Profile Varification Icon"/>
              </div>
              <div className='flex justify-between border rounded-full border-green-600 px-5 py-3'>
                <div>
                  <span
                  onClick={()=>setPlan("Annually")}
                  className={`${plan==="Annually" ? "text-black" : "text-gray-400"} cursor-pointer`}>
                    Annually
                  </span>
                  <span
                  className='text-blue-500 text-sm ml-5'>
                    SAVE 10%
                  </span>
                </div>
                <p
                onClick={()=>setPlan("Monthly")}
                className={`${plan==="Monthly" ? "text-black" : "text-gray-400"} cursor-pointer`}>
                  Monthly
                </p>
              </div>
              <div className='space-y-3'>
                { features.map((item)=>
                  <div className='flex items-center space-x-5'>
                  <FiberManualRecordIcon sx={{width:"7px", height:"7px"}}/>
                  <p className='text-xs'>
                    {item}
                  </p>
                </div>
                )}
              </div>
              <div className='cursor-pointer flex justify-center bg-green-500 text-white rounded-full px-5 py-3'>
                <span className='line-through italic'>
                  $110.00
                </span>
                <span className='px-5'>
                  $100.00/Monthly
                </span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}