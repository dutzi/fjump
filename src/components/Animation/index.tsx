import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import styles from './index.module.scss';
import { ICommand } from '../../types';

export default function Animation() {
  const urlBar = useRef<HTMLDivElement>(null);

  return <div className={styles.wrapper}></div>;
}
