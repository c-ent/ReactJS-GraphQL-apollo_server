import React from 'react'
import {useCharacter} from '../hooks/useCharacter'
import {useParams} from 'react-router'
export default function Character() {
  const {id} = useParams();
  const {data,loading,error} = useCharacter(id)
  if (loading) return <p>Loading...</p>

  if (error) return <p>error...</p>
  console.log(data)

  if (!data || !data.character) return <p>Not found</p>;
  return (
    <div>
       <div key={data.id}>
                <img src={data.character.image} alt={data.character.name} />
                <p>{data.character.name}</p>
                <p>{data.character.episode.map(episode =>{
                  return <div key={data.id}>
                    {episode.name}-<b>{episode.episode}</b>
                  </div>
                })}</p>
        </div>
    </div>
  )
}
