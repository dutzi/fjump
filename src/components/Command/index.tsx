import React, { useState } from 'react';
import styles from './index.module.scss';
import { ICommand } from '../../types';
import { addSchemaToURL, isDarkMode } from '../../utils';
import CommandEditor from '../CommandEditor';

export default function Command({
  command,
  index,
  editable,
  onDelete,
  onChange,
}: {
  command: ICommand;
  index: number;
  editable?: boolean;
  onDelete?: (index: number) => void;
  onChange: (command: ICommand) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const iconColor = isDarkMode() ? 'ffffff' : '000000';

  function handleEdit() {
    setIsEditing(true);
  }

  let content;

  function handleSubmitEdit(command: ICommand) {
    setIsEditing(false);
    onChange(command);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  if (isEditing) {
    content = (
      <>
        <CommandEditor
          command={command}
          onSubmit={handleSubmitEdit}
          onCancel={handleCancelEdit}
        />
      </>
    );
  } else {
    content = (
      <>
        <div className={styles.trigger}>{command.trigger}</div>
        {command.description && (
          <div className={styles.description}>{command.description}</div>
        )}
        <div className={styles.url}>
          <a
            href={addSchemaToURL(command.url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {command.url}
          </a>
        </div>
        {editable && (
          <div className={styles.commandActions}>
            <button className={styles.button} onClick={handleEdit}>
              <img src={`https://icon.now.sh/edit/${iconColor}`} alt="Edit" />
            </button>
            <button
              className={styles.button}
              onClick={onDelete?.bind(null, index)}
            >
              <img
                src={`https://icon.now.sh/delete_forever/${iconColor}`}
                alt="Delete"
              />
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <li key={command.trigger} className={styles.wrapper}>
      {content}
    </li>
  );
}
