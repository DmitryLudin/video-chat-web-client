import React from 'react';
import { useParams } from 'react-router-dom';

export function MeetingPage() {
  const params = useParams();

  return <div>Meeting {params.id}</div>;
}
