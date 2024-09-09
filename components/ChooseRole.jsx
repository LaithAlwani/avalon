import Image from "next/image";
import { FaUser, FaUserSecret } from "react-icons/fa6";

export default function ChooseRole({ chooseRole }) {
  return (
    <>
      <h2>please choose a role</h2>
      <div className="characters-grid">
        <div className="character-img-wrapper" onClick={() => chooseRole("loyal")}>
          <Image src="/char/loyal_servent.webp" alt="loyal" fill />
        </div>
        <div className="character-img-wrapper" onClick={() => chooseRole("minion")}>
          <Image src="/char/minion_of_mordred.webp" alt="minion" fill />
        </div>
        <div className="character-img-wrapper" onClick={() => chooseRole("loyal", "merlin")}>
          <Image src="/char/merlin.webp" alt="merlin" fill />
        </div>
        <div className="character-img-wrapper" onClick={() => chooseRole("minion", "assassin")}>
          <Image src="/char/assassin.webp" alt="assassin" fill />
        </div>
        <div className="character-img-wrapper" onClick={() => chooseRole("loyal", "percival")}>
          <Image src="/char/percival.webp" alt="percival" fill />
        </div>
        <div className="character-img-wrapper" onClick={() => chooseRole("minion", "morgana")}>
          <Image src="/char/morgana.webp" alt="morgana" fill />
        </div>
        <div className="character-img-wrapper" onClick={() => chooseRole("minion", "mordred")}>
          <Image src="/char/mordred.webp" alt="mordred" fill />
        </div>
        <div className="character-img-wrapper" onClick={() => chooseRole("minion", "oberon")}>
          <Image src="/char/oberon.webp" alt="oberon" fill />
        </div>      
      </div>
    </>
  );
}
