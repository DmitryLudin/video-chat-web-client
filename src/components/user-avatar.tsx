import { Avatar } from '@mui/material';
import { useMemo } from 'react';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

type TProps = {
  name: string;
  displayName?: string;
  width?: number;
};

export function UserAvatar({ name, displayName, width = 40 }: TProps) {
  const bgColor = useMemo(
    () => stringToColor(displayName || name),
    [displayName, name]
  );
  const shortName = useMemo(() => {
    if (displayName) {
      const displayNameSplit = displayName.split(' ');
      return displayNameSplit.map((str) => str[0]).join('');
    }

    return name[0];
  }, [displayName, name]);

  return (
    <Avatar sx={{ bgcolor: bgColor, width, height: width }}>
      {shortName.toUpperCase()}
    </Avatar>
  );
}
