import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiClient {
    private client: AxiosInstance;
    private static instance: ApiClient;

    private constructor() {
        const url = process.env.NODE_ENV === 'production' 
            ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL 
            : process.env.NEXT_PUBLIC_DEV_BACKEND_URL;
            
        this.client = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    async get<T>(url: string, params?: any): Promise<{ data: T; status: number }> {
        try {
            const response: AxiosResponse<T> = await this.client.get(url, { params });
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async post<T>(url: string, data: any): Promise<{ data: T; status: number }> {
        try {
            const response: AxiosResponse<T> = await this.client.post(url, data);
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async put<T>(url: string, data: any): Promise<{ data: T; status: number }> {
        try {
            const response: AxiosResponse<T> = await this.client.put(url, data);
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async delete<T>(url: string): Promise<{ data: T; status: number }> {
        try {
            const response: AxiosResponse<T> = await this.client.delete(url);
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    async patch<T>(url: string, data: any): Promise<{ data: T; status: number }> {
        try {
            const response: AxiosResponse<T> = await this.client.patch(url, data);
            return { data: response.data, status: response.status };
        } catch (error) {
            this.handleError(error);
            throw error;
        }
    }

    private handleError(error: any): void {
        if (error.response) {
            console.error(`Request failed with status: ${error.response.status}`);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}

const api = ApiClient.getInstance();
export default api;
