// components/ParticipantTile.tsx
"use client";

import { Participant, Track } from "livekit-client";
import { useEffect, useRef } from "react";

export function ParticipantTile({ participant, nameMap }: { participant: Participant, nameMap: Record<string, string> }) {
  const videoRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function attachTracks() {
      participant.trackPublications.forEach((pub) => {
        if (!pub.track) return;

        const el = pub.track.attach();

        if (pub.track.kind === Track.Kind.Video && videoRef.current) {
          videoRef.current.innerHTML = "";
          videoRef.current.appendChild(el);
        }

        if (pub.track.kind === Track.Kind.Audio && audioRef.current) {
          audioRef.current.innerHTML = "";
          audioRef.current.appendChild(el);
        }
      });
    }

    attachTracks();

    participant.on("trackSubscribed", attachTracks);
    participant.on("trackUnsubscribed", attachTracks);

    return () => {
      participant.off("trackSubscribed", attachTracks);
      participant.off("trackUnsubscribed", attachTracks);
    };
  }, [participant]);

  return (
    <div className="participant-tile">
      <div ref={videoRef} />
      <div ref={audioRef} />
      <div>{nameMap[participant.identity] ?? participant.identity}</div>
    </div>
  );
}
