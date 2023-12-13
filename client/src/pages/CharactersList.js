import React from 'react'
import { useCharacters } from '../hooks/useCharacters'
import { Link } from 'react-router-dom'
import Search from './Search'
import AddTask from './AddTask'

export default function CharactersList() {
    // const {error, data, loading} = useCharacters()

    // if (loading) return <p>Loading...</p>

    // if (error) return <p>error...</p>

return (
    <div>
        {/* <Search /> */}
        <AddTask />
        {/* {data.characters.results.map(character => (
            <Link to={`/${character.id}`}>	
            <div key={character.id}>
                <p>{character.id}</p>
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
            </div>
            </Link>
        ))     
        } */}
    </div>
  )
}
