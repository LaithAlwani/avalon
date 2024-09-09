"use client";
import { useState, useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { MdOutlineExitToApp } from "react-icons/md";
import PlayersList from "@/components/PlayersList";

import ChooseRole from "@/components/ChooseRole";

export default function GamePage({ params }) {
  const router = useRouter();
  const [gameRoom, setGameRoom] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const { isLoaded, user } = useUser();
  const { roomId } = params;

  const updateRoom = async () => {
    const res = await fetch(`/api/game/${roomId}`);
    if (res.ok) {
      const data = await res.json();
      setGameRoom(data[0]);
      setCurrentPlayer(data[0]?.players.find((player) => player.id === user?.id));
    }
  };

  const leaveRoom = async () => {
    const res = await fetch("/api/player/remove", {
      method: "POST",
      body: JSON.stringify({ user, roomId }),
    });
    if (res.ok) {
      router.push("/lobby");
    }
  };

  const customToast = (player, message, duration) => {
    toast.custom(
      <div className="custom-toast">
        <img src={player.avatar} alt="" className="avatar" />
        <p>
          {player.username} {message}
        </p>
      </div>,
      { duration: duration || 2000, id: player.id }
    );
  };

  const chooseRole = async (role, ability) => {
    setCurrentPlayer({ ...currentPlayer, role, ability });
    await fetch("/api/player/update", {
      method: "POST",
      body: JSON.stringify({ roomId, currentPlayer, role, ability }),
    });
  };

  useEffect(() => {
    user && updateRoom();

    pusherClient.subscribe(roomId);

    pusherClient.bind("player-joined", (player) => {
      updateRoom();
      if (isLoaded) {
        if (user.id === player.id) {
          toast.success(`joined Room`, { id: player.id });
        } else {
          customToast(player, "has joined");
        }
      }
    });

    pusherClient.bind("player-left", (player) => {
      updateRoom();
      if (isLoaded) {
        if (user?.id === player.id) {
          customToast(player, "you left the Room");
        } else {
          customToast(player, "has left");
        }
      }
    });

    pusherClient.bind("room-deleted", (gameRoom) => {
      toast.success("room has been delete", { id: gameRoom._id });
      router.push("/lobby");
    });

    pusherClient.bind("game-started", (gameRoom) => {
      updateRoom();
      toast.success(`${gameRoom.name} has started!`, { id: gameRoom._id });
    });

    return () => {
      pusherClient.unsubscribe(roomId);
    };
  }, [user]);

  return (
    <section>
      <h2>{gameRoom.name}</h2>
      <MdOutlineExitToApp size={28} className="btn-leave" onClick={leaveRoom} />
      {isLoaded && !currentPlayer?.role ? (
        <ChooseRole chooseRole={chooseRole} />
      ) : (
        <PlayersList players={gameRoom.players} currentPlayer={currentPlayer} />
      )}

    </section>
  );
}
