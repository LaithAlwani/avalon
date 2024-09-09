export default function PlayersList({ players, currentPlayer }) {
  const isVisble = (player) => {
    if (
      currentPlayer?.ability === "percival" &&
      (player?.ability === "merlin" || player?.ability === "morgana")
    )
      return " (Merlin)";
    if (
      currentPlayer?.ability === "merlin" &&
      player?.role === "minion" &&
      player?.ability != "mordred" &&
      player?.ability != "oberon"
    )
      return ` (${player.role})`;
    if (
      currentPlayer?.role === "minion" &&
      currentPlayer?.ability != "oberon" &&
      player?.role === "minion" &&
      player?.ability != "oberon"
    )
      return ` (${player.role})`;
    else return "";
  };
  return (
    <ul>
      {currentPlayer && (
        <li>
          {" "}
          <img src={currentPlayer?.avatar} alt="" className="avatar" /> {currentPlayer?.username} (
          {currentPlayer.role}) {currentPlayer.ability && `(${currentPlayer?.ability})`}
        </li>
      )}
      {players &&
        players.length > 0 &&
        players
          .filter((player) => currentPlayer?.id != player?.id)
          .map((player) => (
            <li key={player.id}>
              <img src={player.avatar} alt="" className="avatar" />
              <span>
                {player?.username}
                {isVisble(player)}
              </span>
            </li>
          ))}
    </ul>
  );
}
