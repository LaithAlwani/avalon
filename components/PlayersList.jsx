import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PlayersList({ players, currentPlayer }) {
  const isVisble = (player) => {
    if (
      currentPlayer?.ability === "percival" &&
      (player?.ability === "merlin" || player?.ability === "morgana")
    )
      return (
        <>
          <img
            src="/char/merlin.webp"
            alt="loyal"
            style={{ width: "64px", borderRadius: "0.5rem" }}
          />
          <img src="/char/loyal_symbol.webp" alt="loyal" style={{ width: "80px" }} />
        </>
      );
    if (
      currentPlayer?.ability === "merlin" &&
      player?.role === "minion" &&
      player?.ability != "mordred" &&
      player?.ability != "oberon"
    )
      return <img src="/char/minion_symbol.webp" alt="minion" style={{ width: "72px" }} />;

    if (
      currentPlayer?.role === "minion" &&
      currentPlayer?.ability != "oberon" &&
      player?.role === "minion" &&
      player?.ability != "oberon"
    )
      return <img src="/char/minion_symbol.webp" alt="minion" style={{ width: "72px" }} />;
    // else return <img src="/char/loyal_symbol.webp" alt="loyal" style={{ width: "80px" }} />;
    else return null;
  };
  return (
    <ul>
      {currentPlayer && (
        <li
          className="current-player">
          <CurrentPlayer currentPlayer={currentPlayer} />
        </li>
      )}
      {players &&
        players.length > 0 &&
        players
          .filter((player) => currentPlayer?.id != player?.id)
          .map((player) => (
            <li key={player.id} className="player">
              <Player player={player} isVisble={isVisble} />
            </li>
          ))}
    </ul>
  );
}

const Player = ({ player, isVisble }) => {
  return (
    <>
      <span>
        <img src={player.avatar} alt="" className="avatar" />
        {player?.username}
      </span>
      <span>{isVisble(player)}</span>
    </>
  );
};

const CurrentPlayer = ({ currentPlayer }) => {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <div className={`current-player-container ${hidden ? "show" : ""}`}>
        {currentPlayer.ability && (
          <img
            src={`/char/${currentPlayer.ability}.webp`}
            alt="loyal"
            style={{ width: "128px", borderRadius: "0.5rem" }}
          />
        )}
        {currentPlayer.role && (
          <img
            src={`/char/${currentPlayer.role}_symbol.webp`}
            alt="loyal"
            style={{ width: "128px" }}
          />
        )}
      </div>
      <span onClick={() => setHidden(!hidden)}>
        {!hidden ? <FaEye size={32} /> : <FaEyeSlash size={32} />}
      </span>
    </>
  );
};
