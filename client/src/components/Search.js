import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const SEARCH_TASKS = gql`
  query Tasks($query: String!) {
      tasks(query: $query) {
        id
        title
        description
        user_id
      }
  }
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [getTasks, { loading, error, data }] = useLazyQuery(SEARCH_TASKS, {
    variables: {
      query: searchQuery,
    },
  });


  return (
    <div >
      <div className='flex my-2 space-x-2'>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        className='w-full border border-black rounded-md'
       
      />
      <button onClick={() => getTasks()}><SearchOutlinedIcon/></button>
      </div>
    

      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {data && (
        <ul>
          {data.tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
