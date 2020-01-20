import React from 'react';
import styles from './index.module.scss';
import Footer from '../../components/Footer';
import { useIsActiveUser } from '../../hooks';

export default function LearnMore() {
  const isActiveUser = useIsActiveUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.explaination}>
        <h1>Why fjump?</h1>
        <p>
          F and j keys are easily accessible when{' '}
          <a href="https://en.wikipedia.org/wiki/Touch_typing">touch typing</a>{' '}
          thanks to their raised dot or bar.
        </p>
        <p>
          Also, because of how the keys are laid out, typing f, followed by j,
          followed by tab is pretty fast.
        </p>
        <h1>fjump is fast</h1>
        <p>
          Your fjump configurations (i.e., the commands you have defined) are
          stored within your local storage. No need to wait for server
          authentication (you don't even need to set up an account).
        </p>
        <p>
          Also, as soon as the main html file gets loaded, the URL is parsed so
          you get redirected almost instantly.
        </p>
        <h1>fjump is free</h1>
        <p>
          fjump is <a href="https://github.com/dutzi/fjump">open source</a> and
          free (and will always be free).
        </p>
        <h1>Also...</h1>
        <h2>Fuzzy Search</h2>
        <p>
          fjump uses fuzzy search when looking up which command to run, if no
          command found it will serve you a list of the closest commands
          available, and will redirect you to the closest one within 1 second.
          Within that 1 second you can use the arrow keys to choose a different
          command, or refine your query by retyping the trigger.
        </p>
        <h2>Adding Commands</h2>
        <p>
          You can add commands by navigating to <a href="/">fjump.to</a> and
          clicking on Add Command, <em>or</em> you can save some clicks by
          copying the URL you want the command to redirect you to and hitting{' '}
          <code>f</code>, <code>j</code> and <code>Tab</code>, pasting the URL
          and then hitting <code>Enter</code>. fjump will offer creating a new
          command with that URL so all you need to do is enter a trigger and hit{' '}
          <code>Enter</code> to submit.
        </p>
      </div>
      {isActiveUser && <Footer />}
    </div>
  );
}
