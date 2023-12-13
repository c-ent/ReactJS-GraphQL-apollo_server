import React, { useState } from 'react';
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

const EditTask = ({ taskId, initialTitle, initialDescription, initialUserId, refetchTasks }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [userId, setUserId] = useState(initialUserId);

  const [editTask, { loading, error }] = useMutation(EDIT_TASK);

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
        refetchTasks();
      })
      .catch((error) => {
        console.error('Error editing task:', error);
      });
  };

  return (
    <div className='mx-auto border-collapse border border-black'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditTask();
        }}
        className='w-full max-w-sm mx-auto'
      >
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-black'
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border-2 border-black'
          />
        </label>
        <br />
        <label>
          User ID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className='border-2 border-black'
          />
        </label>
        <br />
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default EditTask;
