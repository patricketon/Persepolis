"use client"
import { Room } from "livekit-client"
import { useState } from "react"

export function RoomControls({
  room,
  onLeave,
}: {
  room: Room
  onLeave: () => void
}) {
  const [muted, setMuted] = useState(false)

  return (
    <div className="controls">
      <button
        onClick={() => {
          room.localParticipant.setMicrophoneEnabled(muted)
          setMuted(!muted)
        }}
      >
        {muted ? "Unmute" : "Mute"}
      </button>

      <button
        onClick={() => {
          room.disconnect()
          onLeave()
        }}
      >
        Leave
      </button>
    </div>
  )
}
