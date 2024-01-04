import React from 'react';

const CharacterList = ({ characters }) => (
  <ul>
    {characters.map((character) => (
      <li key={character.name}>{character.name}</li>
    ))}
  </ul>
);

export default CharacterList;