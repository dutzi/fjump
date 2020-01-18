import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';

export default function SetupStart() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.setup}>
        <p>
          Welcome to f
          <sup className={styles.mutedText}>
            a
            <sup>
              s<sup>t</sup>
            </sup>
          </sup>
          ju.mp, first lets enable tab to search.
        </p>
        <p>
          To do that, simply <strong>hit enter.</strong>
        </p>
      </div>
      <form>
        <input
          ref={inputRef}
          name="q"
          className={styles.input}
          value="example command"
        />
      </form>
    </div>
  );
}
