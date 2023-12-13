import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import AddTask from './AddTask'
import { useTaskLists } from '../hooks/useTaskLists'
import DeleteTask from './DeleteTask'
import EditTask from './EditTask'

export default function TaskList() {
    const {error, data, loading, refetchTasks} = useTaskLists()
    if (loading) return <p>Loading...</p>
    if (error) return <p>error...</p>
return (
    <div >
        <Search/>
        <AddTask refetchTasks={refetchTasks} />
        <table className='mx-auto border-collapse border border-black'>
  <thead>
    <tr>
      <th className='border p-1 border-black'>ID</th>
      <th className='border p-1 border-black'>Title</th>
      <th className='border p-1 border-black'>Description</th>
      <th className='border p-1 border-black'>Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.tasks.map((task) => (
      <tr key={task.id}>
        <td className='border p-1 border-black text-blue-700'>
          <Link to={`/${task.id}`}>{task.id}</Link>
        </td>
        <td className='border p-1 border-black'>{task.title}</td>
        <td className='border p-1 border-black'>{task.description}</td>
        <td className='border p-1 border-black'>
            {/* EditTask component usage */}
            <EditTask
              taskId={task.id}
              initialTitle={task.title}
              initialDescription={task.description}
              initialUserId={task.user_id}
              refetchTasks={refetchTasks}
            />
          </td>
        <td className='border p-1 border-black'> <DeleteTask id={task.id} refetchTasks={refetchTasks}/></td>
       
      </tr>
    ))}
  </tbody>
</table>
    </div>
  )
}
