import connectToDB from "@/utils/database";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";
import GameRoom from "@/models/gameRoom";

export async function POST(req) {
  const { roomId, currentPlayer, role, ability } = await req.json();
  try {
    await connectToDB();
    const gameRoom = await GameRoom.findOne({ _id: roomId });

    const player = gameRoom.players.find((player) => player.id === currentPlayer.id) || {};
    if (Object.keys(player).length > 0) {
      const playerIdx = gameRoom.players.indexOf(player);
      gameRoom.players.splice(playerIdx, 1);
      player.role = role;
      (player.ability = ability), gameRoom.players.push(player);
      await gameRoom.save();
      await pusherServer.trigger(roomId, "player-joined", player);
      return NextResponse.json({ message: "Role update!" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Role update failed" }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ message: "Error in creating game room " + err }, { status: 500 });
  }
}
