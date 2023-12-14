import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { gql, useMutation } from '@apollo/client';

const EDIT_TASK = gql`
  mutation EditTask($id: Int!, $title: String, $description: String, $user_id: Int) {
    editTask(id: $id, title: $title, description: $description, user_id: $user_id) {
      id
      title
      description
      user_id
    }
  }
`;

const EditModal = ({ taskId, initialTitle, initialDescription, initialUserId, refetchTasks }) => {
  //
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [userId, setUserId] = useState(initialUserId);
  const [editTask, { loading, error }] = useMutation(EDIT_TASK);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //

  const handleEditTask = () => {
    editTask({
      variables: {
        id: taskId,
        title,
        description,
        user_id: userId,
      },
    })
      .then(() => {
        // Optionally, you can handle successful editing, e.g., refetch the task list
        handleClose();
        refetchTasks();
      })
      .catch((error) => {
        console.error('Error editing task:', error);
      });
  };

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

<Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-50" 
            width={400} 
            boxShadow={24} pt={2} px={4} pb={3}
          >

            <form onSubmit={(e) => {e.preventDefault(); handleEditTask();}} className='flex-col' >
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

                <button type="submit">Update</button>
            </form>

    </Box>
      </Modal>
    </>
  );
};
export default EditModal;