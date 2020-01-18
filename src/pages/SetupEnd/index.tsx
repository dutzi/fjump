import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';

export default function SetupEnd() {
  const addCommandButton = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (addCommandButton.current) {
      addCommandButton.current.focus();
    }

    localStorage.setItem('tab-completion-enabled', 'true');
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.setup}>
        <p>
          That was easy{' '}
          <span role="img" aria-label="rainbow">
            🌈
          </span>
        </p>
        <p>
          You can now focus on Chrome's URL bar (Cmd+L), type <code>fj</code>{' '}
          and then hit <code>tab</code>, type a command, hit <code>enter</code>{' '}
          and you'll be quickly redirected to the command's URL.
        </p>
        <p>
          Now let's add commands, <strong>hit enter</strong> again!
        </p>
        <a
          className={styles.button}
          ref={addCommandButton}
          href="/add-first-command"
        >
          Add Command
        </a>
      </div>
    </div>
  );
}
