import React, { useState } from 'react'
import {gql, useLazyQuery} from '@apollo/client'


const GET_CHARACTER_LOCATIONS = gql`
    query GetCharacterLocations($name: String!){
    characters(filter: {name: $name}){
        results{
            location{
                name
            }
        }
    }
}
`;


const Search = () => {
    const [name,setName] =useState("")

    const [getLocations,{loading,error,data}] = useLazyQuery(
        GET_CHARACTER_LOCATIONS,
        {
            variables:{
                name,
            },
        })

  return (
    <div>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
      <button onClick={()=>getLocations()}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error...</p>}
      {data &&(
        <ul>
            {data.characters.results.map((character)=>{
                return<li>{character.location.name}</li>
            })}
        </ul>
      )}
    </div>
  )
}

export default Search
