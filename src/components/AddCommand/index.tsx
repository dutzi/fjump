import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { ICommand } from '../../types';
import CommandEditor from '../CommandEditor';
import { getQuery, getCommands, setCommands } from '../../utils';

export default function AddCommand() {
  const query = getQuery();

  function handleSubmit(command: ICommand) {
    const commands = getCommands();
    commands.push(command);
    setCommands(commands);
    window.location.search = 'q=' + command.trigger;
  }

  function handleCancel() {}

  return (
    <div className={styles.wrapper}>
      <CommandEditor
        newCommand
        fullWidth
        command={{ trigger: '', url: query!, executeCount: 0 }}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
