import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { gql, useMutation } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';

const CREATE_TASK = gql`
    mutation CreateTask($title: String!, $description: String!, $user_id: Int!){
        createTask(
            title: $title,
            description: $description,
            user_id: $user_id
          ) {
             id
             title
             description
             user_id
          }
    }
`

const AddModal = ({user,refetchTasks}) => {
  //
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);

  const handleCreateTask = () => {
      createTask({
        variables: {
          title,
          description,
          user_id: user.id,
        },
      })
      ;
      handleClose();
    }
   
    refetchTasks();;
 
  //

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <>
        <button onClick={handleOpen} className='bg-[#E2EBFA] rounded-lg text-[#0041FB] px-2 py-1 flex items-center' >
            <AddIcon/> Add Task
        </button>
      <Modal
        open={open}
        onClose={handleClose}
      >
          <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50" 
            width={400} 
            boxShadow={24} pt={2} px={4} pb={3}
          >

            <form onSubmit={(e) => {e.preventDefault();handleCreateTask();}} className='flex-col' >
                <div>
                    <p>Task Title</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-black'
                    />
                </div>

                <div>
                <p>Task Description</p>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border-2 border-black'
                    />
                </div>

                <button type="submit">Create</button>
            </form>

    </Box>
      </Modal>
    </>
  );
};
export default AddModal;