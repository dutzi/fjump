import React, { useState, useEffect } from 'react';
import { getCommands, getQuery } from '../../utils';
import Suggestions from '../../components/Suggestions';
import AddCommand from '../../components/AddCommand';

type TMode = 'show-suggestions' | 'add-command';

export default function Redirecting() {
  const [mode, setMode] = useState<TMode>();
  const query = getQuery();

  useEffect(() => {
    const commands = getCommands();
    const command = commands.find(command => command.trigger === query);

    if (!command) {
      if (query?.startsWith('http:') || query?.startsWith('https:')) {
        setMode('add-command');
      } else {
        setMode('show-suggestions');
      }
    }
  }, []);

  if ((window as any).dontDisplayApp) {
    return null;
  }

  if (mode === 'show-suggestions') {
    return <Suggestions />;
  } else if (mode === 'add-command') {
    return <AddCommand />;
  }

  return null;
}
