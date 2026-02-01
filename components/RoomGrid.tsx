// components/RoomGrid.tsx
"use client";

import { Room, Participant } from "livekit-client";
import { useEffect, useState } from "react";
import { ParticipantTile } from "./ParticipantTile";

export function RoomGrid({ room }: { room: Room }) {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    function syncParticipants() {
      setParticipants([
        room.localParticipant,
        ...Array.from(room.remoteParticipants.values()),
      ]);
    }

    syncParticipants();

    room.on("participantConnected", syncParticipants);
    room.on("participantDisconnected", syncParticipants);

    return () => {
      room.off("participantConnected", syncParticipants);
      room.off("participantDisconnected", syncParticipants);
    };
  }, [room]);

  return (
    <div className="room-grid">
      {participants.map((p) => (
        <ParticipantTile key={p.identity} participant={p} />
      ))}
    </div>
  );
}
