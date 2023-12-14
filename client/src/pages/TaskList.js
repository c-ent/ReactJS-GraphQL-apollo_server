import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../components/Search'

import { useTaskLists } from '../hooks/useTaskLists'
import DeleteTask from '../components/DeleteTask'
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import EditModal from '../components/EditModal'
import AddModal from '../components/AddModal'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function TaskList() {
    const {user,handleLogout } = useAuth();
    const {error, data, loading, refetchTasks} = useTaskLists()
    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>


return (
<div className='mx-auto w-96 p-8 bg-white rounded-md shadow-md'>
  <div className='flex justify-between items-center mb-4'>
    <p className='font-semibold'>Hi, {user.name}</p>
    <button onClick={handleLogout} className='bg-[#00A896] rounded-md text-white px-1'>
      <LogoutOutlinedIcon/>
    </button>
  </div>
  <div className='flex justify-between items-center'>
    <p className='font-bold text-lg'>Tasks</p>
    <AddModal user={user} refetchTasks={refetchTasks} />
  </div>
  <Search />
  <ul className='mt-4'>
    {data.tasks.map((task) => (
      <li key={task.id} className='border-b border-gray-200 py-2'>
        <Link to={`/${task.id}`} className='text-blue-700'>
          {task.title}
        </Link>
        <p className='text-gray-500 mt-1'>{task.description}</p>
        <div className='flex justify-between items-center mt-2'>
          <div className='text-gray-600'>{`User_ID: ${task.user_id}`}</div>
          <div className='flex space-x-2'>
            <EditModal
              taskId={task.id}
              initialTitle={task.title}
              initialDescription={task.description}
              initialUserId={task.user_id}
              refetchTasks={refetchTasks}
            />
            <DeleteTask id={task.id} refetchTasks={refetchTasks} />
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>

  )
}
