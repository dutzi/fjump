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
    subCaption: 'Chrome will offer to "Search fjump.xyz"',
  },
  {
    caption:
      'You type <strong>"docs new"</strong> and hit <code>Enter</code>...',
    // subCaption:
    //   'A command trigger is simply a string that tells fjump.xyz where you want to go',
  },
  {
    caption:
      'Chrome will open <a href="https://fjump.xyz/?q=docs+new">https://fjump.xyz/?q=<strong>docs+new</strong></a>',
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
          <svg>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#1F1F1F"
              d="M84.15,26.4v6.35c0,2.833-0.15,5.967-0.45,9.4c-0.133,1.7-0.267,3.117-0.4,4.25l-0.15,0.95c-0.167,0.767-0.367,1.517-0.6,2.25c-0.667,2.367-1.533,4.083-2.6,5.15c-1.367,1.4-2.967,2.383-4.8,2.95c-0.633,0.2-1.316,0.333-2.05,0.4c-0.767,0.1-1.3,0.167-1.6,0.2c-4.9,0.367-11.283,0.617-19.15,0.75c-2.434,0.034-4.883,0.067-7.35,0.1h-2.95C38.417,59.117,34.5,59.067,30.3,59c-8.433-0.167-14.05-0.383-16.85-0.65c-0.067-0.033-0.667-0.117-1.8-0.25c-0.9-0.133-1.683-0.283-2.35-0.45c-2.066-0.533-3.783-1.5-5.15-2.9c-1.033-1.067-1.9-2.783-2.6-5.15C1.317,48.867,1.133,48.117,1,47.35L0.8,46.4c-0.133-1.133-0.267-2.55-0.4-4.25C0.133,38.717,0,35.583,0,32.75V26.4c0-2.833,0.133-5.95,0.4-9.35l0.4-4.25c0.167-0.966,0.417-2.05,0.75-3.25c0.7-2.333,1.567-4.033,2.6-5.1c1.367-1.434,2.967-2.434,4.8-3c0.633-0.167,1.333-0.3,2.1-0.4c0.4-0.066,0.917-0.133,1.55-0.2c4.9-0.333,11.283-0.567,19.15-0.7C35.65,0.05,39.083,0,42.05,0L45,0.05c2.467,0,4.933,0.034,7.4,0.1c7.833,0.133,14.2,0.367,19.1,0.7c0.3,0.033,0.833,0.1,1.6,0.2c0.733,0.1,1.417,0.233,2.05,0.4c1.833,0.566,3.434,1.566,4.8,3c1.066,1.066,1.933,2.767,2.6,5.1c0.367,1.2,0.617,2.284,0.75,3.25l0.4,4.25C84,20.45,84.15,23.567,84.15,26.4z M33.3,41.4L56,29.6L33.3,17.75V41.4z"
            ></path>
            <polygon
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#FFFFFF"
              points="33.3,41.4 33.3,17.75 56,29.6"
            ></polygon>
          </svg>
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
        <div className={styles.stepDetails}>
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
        </div>
      )}
    </div>
  );
}
