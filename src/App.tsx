import {useState, useEffect} from 'react';
import {SearchBar} from "./components/SearchBar.tsx";
import {Grid} from "./components/Grid.tsx";
import {type DebtResponse, fetchDebts, fetchTop10Debts} from "./hooks/useDepts.ts";
import type {SortConfig} from "./hooks/useSortableData.ts";
import {ERROR_MESSAGES} from "./constants/error_messages.ts";

export const App = () => {
    const [data, setData] = useState<DebtResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState<SortConfig<DebtResponse> | undefined>({key: 'Name', direction: 'asc'});

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError('');
        try {
            if (!query.trim()) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            let results: DebtResponse[] = [];

            if (query.trim().length < 3) {
                results = await fetchTop10Debts();
            } else {
                results = await fetchDebts(query);
            }

            setData(results);
            setSortConfig({key: 'Name', direction: 'asc'});
        } catch (err: any) {
            setError(err.message || ERROR_MESSAGES.UNKNOWN_ERROR);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            try {
                const top10 = await fetchTop10Debts();
                setData(top10);
            } catch (err) {
                setError(ERROR_MESSAGES.NO_INITIAL_DATA);
            } finally {
                setLoading(false);
            }
        };
        fetchInitial();
    }, []);

    return (
        <div>
            <SearchBar onSearch={handleSearch} loading={loading}/>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <Grid data={data} loading={loading} initialSort={sortConfig}/>
        </div>
    );
};
