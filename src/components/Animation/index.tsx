import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';

const imageSeqeunce = [
  {
    caption: 'Say you want to create a new Google document...',
  },
  {
    caption: 'Using fjump, you type <code>fj</code> in the URL bar...',
  },
  {
    caption: 'You then hit <code>Tab</code>...',
    subCaption: 'Chrome will offer to "Search fju.mp"',
  },
  {
    caption:
      'You type <strong>"docs new"</strong> and hit <code>Enter</code>...',
    // subCaption:
    //   'A command trigger is simply a string that tells fju.mp where you want to go',
  },
  {
    caption:
      'Chrome will open <a href="https://fju.mp/?q=docs+new">https://fju.mp/?q=<strong>docs+new</strong></a>',
  },
  {
    caption:
      "fjump will parse the query string and send you to the URL that creates a new Google document. That's it!",
  },
];

export default function Animation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasPaused, sethasPaused] = useState(false);
  const counter = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasPlayed || hasPaused) {
      return;
    }

    const interval = setInterval(() => {
      if (currentStep === imageSeqeunce.length - 1) {
        clearInterval(interval);
      } else {
        setCurrentStep(currentStep + 1);
        restartCounterAnimation();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentStep, hasPlayed, hasPaused]);

  function stopCounterAnimation() {
    if (counter.current) {
      counter.current.classList.remove(styles.animate);
    }
  }

  function restartCounterAnimation() {
    if (counter.current) {
      stopCounterAnimation();
      setTimeout(() => {
        if (counter.current) {
          counter.current.classList.add(styles.animate);
        }
      }, 10);
    }
  }

  function handleNext() {
    sethasPaused(true);
    stopCounterAnimation();
    setCurrentStep(
      currentStep === imageSeqeunce.length - 1 ? 0 : currentStep + 1
    );
  }

  function handlePrev() {
    sethasPaused(true);
    setCurrentStep(
      currentStep === 0 ? imageSeqeunce.length - 1 : currentStep - 1
    );
  }

  function handlePlay() {
    setHasPlayed(true);
    stopCounterAnimation();
    setTimeout(() => {
      restartCounterAnimation();
    }, 10);
  }

  return (
    <div className={styles.wrapper}>
      {hasPlayed && (
        <button className={styles.prevButton} onClick={handlePrev}>
          ←
        </button>
      )}
      {!hasPlayed && (
        <button className={styles.playButton} onClick={handlePlay}>
          ▶
        </button>
      )}
      {hasPlayed && (
        <div className={styles.counter} ref={counter}>
          <div>
            {currentStep + 1} of {imageSeqeunce.length}
          </div>
        </div>
      )}
      <img
        className={styles.image}
        src={`/what-is-fjump/step${currentStep + 1}.png`}
        alt={imageSeqeunce[currentStep].caption}
      />
      {hasPlayed && (
        <button className={styles.nextButton} onClick={handleNext}>
          →
        </button>
      )}
      {hasPlayed && (
        <>
          <div
            className={styles.caption}
            dangerouslySetInnerHTML={{
              __html: imageSeqeunce[currentStep].caption,
            }}
          ></div>
          <div
            className={styles.subCaption}
            dangerouslySetInnerHTML={{
              __html: imageSeqeunce[currentStep].subCaption ?? '',
            }}
          ></div>
        </>
      )}
    </div>
  );
}
