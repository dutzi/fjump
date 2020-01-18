import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { ICommand } from '../../types';
import CommandsList from '../../components/CommandsList';
import existingCommands from '../../existing-commands';
import CommandEditor from '../../components/CommandEditor';
import { getCommands, setCommands } from '../../utils';
import Footer from '../../components/Footer';

export default function MyCommands() {
  const [userCommands, setUserCommands] = useState<ICommand[]>([]);
  const [showNewCommandEditor, setShowNewCommandEditor] = useState(false);

  useEffect(loadCommands, []);

  function loadCommands() {
    setUserCommands(getCommands());
  }

  function addCommand(command: ICommand) {
    const commands = getCommands();
    commands.push(command);
    setCommands(commands);
  }

  function handleSubmitNewCommand(command: ICommand) {
    setShowNewCommandEditor(false);
    addCommand(command);
    loadCommands();
  }

  function handleAddCommand() {
    setShowNewCommandEditor(true);
  }

  function handleCancelEditNewCommand() {
    setShowNewCommandEditor(false);
  }

  function handleEdit(index: number, command: ICommand) {
    const commands = getCommands();
    commands[index] = command;
    setCommands(commands);
    loadCommands();
  }

  function handleDelete(index: number) {
    const commands = getCommands();
    commands.splice(index, 1);
    setCommands(commands);
    loadCommands();
  }

  return (
    <div className={styles.wrapper}>
      {userCommands.length === 0 && (
        <div className={styles.emptyState}>
          <p>You haven't set up any commands.</p>
          <p>You can still use the existing commands listed below.</p>
        </div>
      )}
      {userCommands.length > 0 && <p>Your Commands:</p>}

      <CommandsList
        commands={userCommands}
        editable
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showNewCommandEditor && (
        <CommandEditor
          newCommand
          onSubmit={handleSubmitNewCommand}
          onCancel={handleCancelEditNewCommand}
        />
      )}

      {!showNewCommandEditor && (
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={handleAddCommand}>
            Add Command
          </button>
        </div>
      )}

      <p>Existing Commands:</p>
      <div className={styles.description}>
        These commands come built in. If you have a suggestion for a new one,
        please head over to{' '}
        <a href="https://github.com/dutzi/fjump/issues/new?labels=Command+Suggestion&template=command-suggestion.md">
          the repo
        </a>{' '}
        and file an issue!
      </div>
      <CommandsList commands={existingCommands} />
      <Footer />
    </div>
  );
}
