import React from 'react';
import styles from './index.module.scss';
import Footer from '../../components/Footer';
import { useIsActiveUser } from '../../hooks';

export default function LearnMore() {
  const isActiveUser = useIsActiveUser();

  return (
    <div className={styles.wrapper}>
      <div className={styles.explaination}>
        <h1>Why fju.mp?</h1>
        <p>
          First, f and j keys are easily accessible when{' '}
          <a href="https://en.wikipedia.org/wiki/Touch_typing">touch typing</a>{' '}
          thanks to their raised dot or bar.
        </p>
        <p>
          Second, because of how the keys are laid out, typing f, followed by j,
          followed by tab is pretty fast.
        </p>
        <p>And lastly, I was happy with the domain I found.</p>
        <h1>fjump is fast</h1>
        <p>
          Your fjump configurations (i.e., the commands you have defined) are
          stored within your local storage. No need to wait for server
          authentication (you don't even need to set up an account).
        </p>
        <p>
          Also, as soon as the main html file gets loaded, the URL is parsed and
          you get redirected almost instantly.
        </p>
        <h1>fjump is free</h1>
        <p>
          fjump is <a href="https://github.com/dutzi/fjump">open source</a> and
          free (and will always be free).
        </p>
      </div>
      {isActiveUser && <Footer />}
    </div>
  );
}
