import React from 'react';
import styles from './index.module.scss';

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <a href="/">Home</a>
      <a href="/learn-more">Learn More</a>
      <a href="https://github.com/dutzi/fjump">Github</a>
    </div>
  );
}
