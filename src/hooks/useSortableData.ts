import {useState, useMemo, useEffect} from 'react';

export interface SortConfig<T> {
    key: keyof T;
    direction: 'asc' | 'desc';
}

const ASC_ORDER = 'asc';
const DESC_ORDER = 'desc';
export const useSortableData = <T>(
    items: T[],
    initialSort?: SortConfig<T>
) => {
    const [sortConfig, setSortConfig] = useState<SortConfig<T> | undefined>(initialSort);

    useEffect(() => {
        setSortConfig(initialSort);
    }, [initialSort]);

    const sortedItems = useMemo(() => {
        const sortableItems = [...items];
        if (sortConfig !== undefined) {
            sortableItems.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                if (typeof aVal === 'string' && typeof bVal === 'string') {
                    return sortConfig.direction === ASC_ORDER
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal);
                }

                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return sortConfig.direction === ASC_ORDER ? aVal - bVal : bVal - aVal;
                }

                if (aVal instanceof Date && bVal instanceof Date) {
                    return sortConfig.direction === ASC_ORDER
                        ? aVal.getTime() - bVal.getTime()
                        : bVal.getTime() - aVal.getTime();
                }

                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = ASC_ORDER;
        if (sortConfig && sortConfig.key === key && sortConfig.direction === ASC_ORDER) {
            direction = DESC_ORDER;
        }
        setSortConfig({key, direction});
    };

    return {items: sortedItems, requestSort, sortConfig};
};
