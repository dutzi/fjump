import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { ICommand } from '../../types';

export default function CommandEditor({
  command,
  newCommand,
  onSubmit,
  onCancel,
  fullWidth,
}: {
  command?: ICommand;
  newCommand?: boolean;
  onSubmit: (command: ICommand) => void;
  onCancel: () => void;
  fullWidth?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);

  const [trigger, setTrigger] = useState(command?.trigger ?? '');
  const [url, setUrl] = useState(command?.url ?? '');

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ trigger, url, executeCount: command?.executeCount ?? 0 });
  }

  function handleCancel(e: React.MouseEvent) {
    e.preventDefault();
    onCancel();
  }

  const isSubmitDisabled = !trigger.trim() || !url.trim();

  return (
    <div
      className={cx(
        styles.wrapper,
        newCommand && styles.new,
        fullWidth && styles.fullWidth
      )}
    >
      {newCommand && !command && <p>Create a new command:</p>}
      {newCommand && command && (
        <p>
          Create a new command for <strong>{command.url}:</strong>
        </p>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.label}>
          <label htmlFor="trigger">Trigger</label>
        </div>
        <input
          ref={input}
          id="trigger"
          className={styles.input}
          value={trigger}
          onChange={e => setTrigger(e.currentTarget.value)}
          placeholder={'"docs new", for example'}
        ></input>
        <div className={styles.label}>
          <label htmlFor="url">URL</label>
        </div>
        <input
          id="url"
          className={styles.input}
          value={url}
          onChange={e => setUrl(e.currentTarget.value)}
          placeholder={'https://docs.google.com/document/u/0/create'}
        ></input>
        <div className={styles.actions}>
          {!(newCommand && command) && (
            <a
              href="#cancel"
              className={styles.mutedLink}
              onClick={handleCancel}
            >
              Cancel
            </a>
          )}
          <div className="margin-v-sm" />
          <input
            className={styles.primaryButton}
            type="submit"
            value={newCommand ? 'Add' : 'Update'}
            disabled={isSubmitDisabled}
          />
        </div>
      </form>
    </div>
  );
}
