import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as ChevronUpIcon } from '../../svgs/chevron-up.svg';
import cx from 'classnames';
import styles from './index.module.scss';

export default function Onboarding() {
  const addCommandButton = useRef<HTMLAnchorElement>(null);
  const [isFocusedOnURLBar, setIsFocusedOnURLBar] = useState(false);
  const hiddenInput = useRef<HTMLInputElement>(null);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (addCommandButton.current) {
      addCommandButton.current.focus();
    }

    localStorage.setItem('tab-completion-enabled', 'true');
  }, []);

  useEffect(() => {
    function handleBlur() {
      if (document.activeElement === hiddenInput.current) {
        setIsFocusedOnURLBar(true);
      }
    }

    if (hiddenInput.current) {
      const hiddenInputCurrent = hiddenInput.current;
      hiddenInput.current.focus();

      hiddenInput.current.addEventListener('blur', handleBlur);

      return () => {
        hiddenInputCurrent.removeEventListener('blur', handleBlur);
      };
    }
  }, []);

  const modifierKey = window.navigator.platform === 'MacIntel' ? 'Cmd' : 'Ctrl';

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'l' && (e.metaKey || e.ctrlKey)) {
        setIsFocusedOnURLBar(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel('main-channel');

    channel.onmessage = function ({ data }) {
      if (data === 'first-redirect') {
        setHasRedirected(true);
      }
    };
  }, []);

  return (
    <div
      className={cx(
        styles.wrapper,
        isFocusedOnURLBar && styles.focusedOnUrlBar,
        hasRedirected && styles.hasRedirected
      )}
    >
      <div className={styles.animatedChevron}>
        <ChevronUpIcon style={{ width: '25px' }} />
        <div>{modifierKey}+L</div>
      </div>
      <div className={styles.content}>
        <p>
          Let's try it out!{' '}
          <span role="img" aria-label="rainbow">
            🌈
          </span>
        </p>
        <ol>
          <li className={styles.step1}>
            Focus on Chrome's Address bar ({modifierKey}+L)
          </li>
          <li>
            Type <code>fj</code>
          </li>
          <li>
            Hit the <code>Tab</code> key
          </li>
          <li>
            Type a trigger (<strong>docs new</strong>, for example)
          </li>
          <li>
            Hit <code>{modifierKey}</code>+<code>Enter</code> and Google docs
            will open up.
            <div className={styles.mutedText}>
              You can hit Enter but then you will leave this page...
            </div>
          </li>
        </ol>
        {hasRedirected && (
          <>
            <p>Cool, huh?</p>
            <p>Now let's add you first command!</p>
            <a
              className={styles.button}
              ref={addCommandButton}
              href="/add-first-command"
            >
              Add Command
            </a>
          </>
        )}
        {!hasRedirected && (
          <div className={styles.gutter}>
            {' '}
            <a href="/add-first-command">Skip this step</a>
          </div>
        )}
      </div>
      <input ref={hiddenInput} className={styles.hidden} />
    </div>
  );
}
