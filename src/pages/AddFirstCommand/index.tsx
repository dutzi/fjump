import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { ICommand } from '../../types';
import { getCommands, setCommands } from '../../utils';

export default function MyCommands() {
  const triggerInput = useRef<HTMLInputElement>(null);
  const [trigger, setTrigger] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (triggerInput.current) {
      triggerInput.current.focus();
    }
  }, []);

  function addCommand(command: ICommand) {
    const commands = getCommands();
    commands.push(command);
    setCommands(commands);
    window.location.pathname = '/my-commands';
  }

  function hanbdleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addCommand({ trigger, url });
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.setup} onSubmit={hanbdleSubmit}>
        <p>Ok, now let's add your first command.</p>
        <label htmlFor="command">
          <p className={styles.p}>
            A command's <strong>trigger</strong> is what you type to go to a
            URL.
          </p>
          <p className={styles.p}>
            Enter a <strong>trigger</strong> for your command:
          </p>
        </label>
        <input
          ref={triggerInput}
          id="command"
          className={styles.input}
          placeholder={'"docs new", for example'}
          value={trigger}
          onChange={e => setTrigger(e.target.value)}
        />
        <p>
          <label htmlFor="url">
            Enter the <strong>URL</strong> you want your command to send you to:
          </label>
        </p>
        <input
          id="url"
          className={styles.input}
          placeholder={'https://docs.google.com/document/u/0/create'}
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <p>
          <input
            className={styles.button}
            type="submit"
            value="Add Command"
            disabled={!url.trim() || !trigger.trim()}
          ></input>
          <div className="margin-h-sm" />
          <a className={styles.link} href="/my-commands">
            Skip, for now
          </a>
        </p>
      </form>
    </div>
  );
}
