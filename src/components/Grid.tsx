import React from 'react';
import styles from '../styles/Grid.module.less';
import {useSortableData} from '../hooks/useSortableData';
import {LoadingSpinner} from "./LoadingSpinner.tsx";
import {MESSAGES} from "../constants/messages.ts";
import {ERROR_MESSAGES} from "../constants/error_messages.ts";

interface DebtRecord {
    Id: number;
    Number: string;
    Name: string;
    Value: number;
    NIP: string;
    Date: string;
    DocumentType: string;
    Price: number;
    Address: string;
}

interface DebtTableProps {
    data: DebtRecord[];
    loading?: boolean;
    initialSort?: {
        key: keyof DebtRecord;
        direction: 'asc' | 'desc';
    };
}

const formatDate = (iso: string): string => {
    const date = new Date(iso);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
};

export const Grid: React.FC<DebtTableProps> = ({data, loading = false, initialSort}) => {
    const {items, requestSort, sortConfig} = useSortableData<DebtRecord>(data, initialSort);

    const getSortIndicator = (key: keyof DebtRecord) => {
        if (!sortConfig || sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    };

    if (loading) {
        return (
            <div className={styles['grid__container']}>
                <div className={styles['grid__loading']}>
                    <LoadingSpinner size="large"/>
                </div>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className={styles['grid__container']}>
                <p className={styles['grid__no-data']}>
                    {ERROR_MESSAGES.NO_RECORDS_FOUND}
                </p>
            </div>
        );
    }

    return (
        <div className={styles['grid__container']}>
            <table className={styles['grid__table']}>
                <thead className={styles['grid__table-head']}>
                <tr>
                    <th onClick={() => requestSort('Name')}>
                        {MESSAGES.DEBT_GRID.DEBTOR}{getSortIndicator('Name')}
                    </th>
                    <th onClick={() => requestSort('NIP')}>
                        {MESSAGES.DEBT_GRID.NIP}{getSortIndicator('NIP')}
                    </th>
                    <th onClick={() => requestSort('Value')}>
                        {MESSAGES.DEBT_GRID.DEPT_AMOUNT}{getSortIndicator('Value')}
                    </th>
                    <th onClick={() => requestSort('Date')}>
                        {MESSAGES.DEBT_GRID.DATE_OF_OBLIGATION}{getSortIndicator('Date')}
                    </th>
                </tr>
                </thead>
                <tbody className={styles['grid__table-body']}>
                {items.map((record) => (
                    <tr key={record.Id}>
                        <td>{record.Name}</td>
                        <td>{record.NIP}</td>
                        <td>{record.Value}</td>
                        <td>{formatDate(record.Date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
