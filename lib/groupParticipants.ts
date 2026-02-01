

export function groupParticipants(participants: { user_id: string }[]) {
  const groups: string[][] = [];
  let i = 0;

  while (i < participants.length) {
    const remaining = participants.length - i;

    if (remaining >= 6 || remaining === 4 || remaining === 5) {
      const size = remaining >= 6 ? 6 : remaining;
      groups.push(participants.slice(i, i + size).map(p => p.user_id));
      i += size;
    } else {
      // remaining 1–3
      if (groups.length === 0) {
        groups.push(participants.slice(i).map(p => p.user_id));
      } else {
        groups[groups.length - 1].push(
          ...participants.slice(i).map(p => p.user_id)
        );
      }
      break;
    }
  }

  return groups;
}
