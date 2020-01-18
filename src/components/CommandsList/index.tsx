import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { ICommand } from '../../types';
import { getCommands, setCommands, addSchemaToURL } from '../../utils';
import CommandEditor from '../CommandEditor';

export default function CommandsList({
  commands,
  onEdit,
  onDelete,
  editable,
}: {
  commands: ICommand[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
  editable?: boolean;
}) {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.commands}>
        {commands.map((command, index) => (
          <li key={command.trigger} className={styles.command}>
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
                <button
                  className={styles.button}
                  onClick={onEdit?.bind(null, index)}
                >
                  <img src="https://icon.now.sh/edit" alt="Edit" />
                </button>
                <button
                  className={styles.button}
                  onClick={onDelete?.bind(null, index)}
                >
                  <img src="https://icon.now.sh/delete_forever" alt="Delete" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
