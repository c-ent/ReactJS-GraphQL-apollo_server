import React, { useState } from 'react'
import {gql, useMutation} from '@apollo/client'
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

const AddTask = ({refetchTasks}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userId, setUserId] = useState(1);

    const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);

    const handleCreateTask = () => {
        createTask({
          variables: {
            title,
            description,
            user_id: userId,
          },
        })
        ;
      }
      refetchTasks();;
  return (
    <div className='mx-auto border-collapse border border-black'>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateTask();
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
      <button type="submit">Create</button>
    </form>
  </div>
  )
}

export default AddTask
