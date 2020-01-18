import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { getQuery, getCommands, addSchemaToURL } from '../../utils';
import { ICommand } from '../../types';
import existingCommands from '../../existing-commands';
import fuzzy from 'fuzzy';

export default function Suggestions() {
  const input = useRef<HTMLInputElement>(null);
  const query = getQuery() || '';
  const [trigger, setTrigger] = useState(query);
  const [animating, setAnimating] = useState(false);
  const [userCommands, setUserCommands] = useState<ICommand[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [quickNavTrigger, setQuickNavTrigger] = useState('');
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const allCommands = [...userCommands, ...existingCommands];

  const relevantCommands = fuzzy.filter(trigger, allCommands, {
    pre: '<strong>',
    post: '</strong>',
    extract: (command: ICommand) => {
      return command.trigger;
    },
  });

  useEffect(() => {
    if (input.current) {
      input.current.focus();
      input.current.setSelectionRange(0, query.length);
    }
  }, [input, query]);

  useEffect(() => {
    if (relevantCommands.length && !hasUserInteracted) {
      setAnimating(true);
    }
  }, [relevantCommands, hasUserInteracted]);

  useEffect(() => {
    if (animating) {
      const timeout = setTimeout(() => {
        navigateToSelectedCommand();
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [animating]);

  useEffect(() => {
    setUserCommands(getCommands());
  }, []);

  function handleTriggerChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAnimating(false);
    setQuickNavTrigger('');
    setTrigger(e.target.value);
  }

  function updateQuickNavTrigger(newTrigger: string) {
    setQuickNavTrigger(newTrigger);
    setTimeout(() => {
      if (input.current) {
        input.current.setSelectionRange(0, newTrigger.length);
      }
    }, 0);
  }

  function navigateToSelectedCommand(newTab?: boolean) {
    const url = addSchemaToURL(relevantCommands[selectedIndex].original.url);
    if (newTab) {
      window.open(url);
    } else {
      window.location.href = url;
      setIsRedirecting(true);
    }
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // ignore modifier keys
    if ([68, 18, 68, 93, 91, 73, 16, 17].indexOf(e.keyCode) !== -1) {
      return;
    }

    if (e.keyCode !== 13) {
      setAnimating(false);
    } else {
      navigateToSelectedCommand(e.metaKey || e.ctrlKey);
      return;
    }

    if (relevantCommands.length) {
      if (e.keyCode === 38) {
        const newIndex = Math.min(
          selectedIndex === 0 ? relevantCommands.length - 1 : selectedIndex - 1,
          relevantCommands.length - 1
        );
        setSelectedIndex(newIndex);
        updateQuickNavTrigger(relevantCommands[newIndex].original.trigger);
        e.preventDefault();
      } else if (e.keyCode === 40) {
        const newIndex = Math.min(
          selectedIndex === relevantCommands.length - 1 ? 0 : selectedIndex + 1,
          relevantCommands.length - 1
        );
        setSelectedIndex(newIndex);
        updateQuickNavTrigger(relevantCommands[newIndex].original.trigger);
        e.preventDefault();
      }
    }

    setHasUserInteracted(true);
  }

  const actualSelectedIndex = Math.min(
    relevantCommands.length - 1,
    selectedIndex
  );
  // var relevantCommands = results.map(el => {
  //   return el.string;
  // });

  // console.log(matches);

  if (isRedirecting) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.inputProgress, animating && styles.animating)}>
        {/* <p>
        <strong>"{query}"</strong> tigger not found, redirecting to
        <strong>"{query}"</strong>
      </p> */}
        <div className={styles.inputWrapper}>
          <div className={styles.inputLabel}>Trigger</div>
          <input
            ref={input}
            className={styles.input}
            value={quickNavTrigger || trigger}
            onChange={handleTriggerChange}
            onKeyDown={handleTriggerKeyDown}
          />
        </div>
      </div>
      {/* <p>Type anyting to cancel the redirect</p> */}
      <div className={styles.commandsList}>
        {relevantCommands.map((command, index) => (
          <React.Fragment key={command.original.trigger}>
            <div
              className={cx(
                styles.trigger,
                actualSelectedIndex === index && styles.highlight
              )}
              dangerouslySetInnerHTML={{ __html: command.string }}
            ></div>
            {/* <div className={styles.arrow}>→</div> */}
            <div
              className={cx(
                styles.url,
                actualSelectedIndex === index && styles.highlight
              )}
            >
              {command.original.url}
            </div>
            <div
              className={cx(
                styles.selectedIndicator,
                actualSelectedIndex === index && styles.show
              )}
            >
              ⏎
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
