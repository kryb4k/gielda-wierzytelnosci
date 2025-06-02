import {API_ENDPOINTS} from "../constants/endpoints.ts";
import {ERROR_MESSAGES} from "../constants/error_messages.ts";

export interface DebtResponse {
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

export async function fetchTop10Debts(): Promise<DebtResponse[]> {
    const res = await fetch(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.RECRUITMENT + API_ENDPOINTS.TOP_10);
    if (!res.ok) {
        throw new Error(ERROR_MESSAGES.LOADING_ERROR);
    }
    return await res.json();
}

export async function fetchDebts(query: string): Promise<DebtResponse[]> {
    if (query.length < 3) {
        throw new Error(ERROR_MESSAGES.QUERY_TOO_SHORT);
    }

    const res = await fetch(API_ENDPOINTS.BASE_URL + API_ENDPOINTS.RECRUITMENT + API_ENDPOINTS.SEARCH, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phrase: query}),
    });

    if (res.status === 405) {
        throw new Error(ERROR_MESSAGES.QUERY_TOO_SHORT);
    }

    if (!res.ok) {
        throw new Error(ERROR_MESSAGES.LOADING_ERROR);
    }

    return await res.json();
}
