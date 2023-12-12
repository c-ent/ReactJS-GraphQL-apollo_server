import React from 'react'
import { useCharacters } from '../hooks/useCharacters'

export default function CharactersList() {
    const {error, data, loading} = useCharacters()

    if (loading) return <p>Loading...</p>

    if (error) return <p>error...</p>

return (
    <div>
        {data.characters.results.map(character => (
            <div key={character.id}>
                <img src={character.image} alt={character.name} />
                <p>{character.name}</p>
            </div>
        ))     
        }
    </div>
  )
}
