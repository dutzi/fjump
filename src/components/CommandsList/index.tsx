import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { ICommand } from '../../types';
import { getCommands, setCommands, addSchemaToURL } from '../../utils';
import CommandEditor from '../CommandEditor';
import Command from '../Command';

export default function CommandsList({
  commands,
  onEdit,
  onDelete,
  editable,
}: {
  commands: ICommand[];
  onEdit?: (index: number, command: ICommand) => void;
  onDelete?: (index: number) => void;
  editable?: boolean;
}) {
  function handleChange(index: number, command: ICommand) {
    onEdit!(index, command);
  }

  return (
    <div className={styles.wrapper}>
      <ol className={styles.commands}>
        {commands.map((command, index) => (
          <Command
            command={command}
            index={index}
            onChange={handleChange.bind(null, index)}
            onDelete={onDelete}
            editable={editable}
          />
        ))}
      </ol>
    </div>
  );
}
