import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { ICommand } from '../../types';

const imageSeqeunce = [
  {
    caption: 'You have a new tab open in Chrome',
    subCaption: 'You can easily focus on the URL bar by hitting Cmd+L',
  },
  {
    caption: "With fjump set up, you type 'fj' in URL bar",
  },
  {
    caption: 'You then hit Tab',
    subCaption: 'Chrome will offer to "Search fju.mp"',
  },
  {
    caption:
      'You type a command trigger, for example, "docs new" and hit Enter',
    subCaption:
      'A command trigger is simply a string that tells fju.mp where you want to go',
  },
  {
    caption: "Chrome will send you to 'fju.mp/?q=docs+new'",
  },
  {
    caption:
      'fjump will parse the command trigger and send you to the desired URL',
  },
];

export default function Animation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      return;
    }

    const interval = setInterval(() => {
      if (currentStep === imageSeqeunce.length - 1) {
        setCurrentStep(0);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentStep, pause]);

  function handleNext() {
    setPause(true);
    setCurrentStep(
      currentStep === imageSeqeunce.length - 1 ? 0 : currentStep + 1
    );
  }

  function handlePrev() {
    setPause(true);
    setCurrentStep(
      currentStep === 0 ? imageSeqeunce.length - 1 : currentStep - 1
    );
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.prevButton} onClick={handlePrev}>
        ←
      </button>
      <div className={styles.counter}>
        {currentStep + 1} of {imageSeqeunce.length}
      </div>
      <img
        className={styles.image}
        src={`/what-is-fjump/step${currentStep + 1}.png`}
        alt={imageSeqeunce[currentStep].caption}
      />
      <button className={styles.nextButton} onClick={handleNext}>
        →
      </button>
      <div className={styles.caption}>{imageSeqeunce[currentStep].caption}</div>
      <div className={styles.subCaption}>
        {imageSeqeunce[currentStep].subCaption}
      </div>
    </div>
  );
}
