import React, { useState, useEffect } from 'react';
import { getCommands, getQuery } from '../../utils';
import Suggestions from '../../components/Suggestions';

export default function Redirecting() {
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const commands = getCommands();
    const query = getQuery();
    const command = commands.find(command => command.trigger === query);

    if (!command) {
      setShowSuggestions(true);
    }
  }, []);

  if (!showSuggestions) {
    return null;
  } else {
    return <Suggestions />;
  }
}
