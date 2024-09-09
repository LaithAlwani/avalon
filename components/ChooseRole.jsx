import { FaUser, FaUserSecret } from "react-icons/fa6";

export default function ChooseRole({ chooseRole }) {
  return (
    <>
      <h3>please choose a role</h3>
      <span onClick={() => chooseRole("loyal")}>
        <FaUser size={128} color="#47a5cb" />
      </span>
      <span onClick={() => chooseRole("minion")}>
        <FaUserSecret size={128} color="#984141" />
      </span>
      <span onClick={() => chooseRole("loyal","merlin")}>
        <h3>Merlin</h3>
      </span>
      <span onClick={() => chooseRole("minion","assassin")}>
        <h3>assassin</h3>
      </span>
      <span onClick={() => chooseRole("minion","mordred")}>
        <h3>Mordred</h3>
      </span>
      <span onClick={() => chooseRole("minion","morgana")}>
        <h3>Morgana</h3>
      </span>
      <span onClick={() => chooseRole("minion","oberon")}>
        <h3>Oberon</h3>
      </span>
      <span onClick={() => chooseRole("loyal","percival")}>
        <h3>Percival</h3>
      </span>
    </>
  );
}
