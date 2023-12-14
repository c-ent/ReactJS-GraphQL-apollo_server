import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      title
      description
      user_id
    }
  }
`;

const DeleteTask = ({ id,refetchTasks }) => {
  const [deleteTask] = useMutation(DELETE_TASK);

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ variables: { id } });
      refetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <button onClick={handleDeleteTask}>Delete</button>
  );
};

export default DeleteTask;
