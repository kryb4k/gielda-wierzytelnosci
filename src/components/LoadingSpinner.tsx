import React from 'react';
import styles from '../styles/LoadingSpinner.module.less';

interface LoadingSpinnerProps {
    size?: 'small' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'small' }) => {
    const spinnerClass = size === 'large'
        ? `${styles.spinner} ${styles['spinner--large']}`
        : `${styles.spinner} ${styles['spinner--small']}`;

    return <div className={spinnerClass} />;
};
