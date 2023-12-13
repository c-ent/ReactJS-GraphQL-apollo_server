import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      <button onClick={() => getTasks()}>Search</button>

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
