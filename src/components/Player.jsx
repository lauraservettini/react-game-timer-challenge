import {useState, useRef} from 'react';

export default function Player() {
  const newPlayerName = useRef();

  const [ playerName, setPlayerName] = useState();

  function handleClick(){
    setPlayerName(newPlayerName.current.value);
    newPlayerName.current.value = '';
  }

    return (
    <section id="player">
      <h2>Welcome {playerName ? playerName : 'unknown entity'}</h2>
      <p>
        <input ref={newPlayerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
