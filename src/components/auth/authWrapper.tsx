"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/store';
import api from '@/lib/api';

interface User {
    id: string;
}

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: userData } = await api.get('/api/user');
                dispatch(setUser(userData  as User));
            } catch (error) {
                console.error('Auth check failed:', error);
                dispatch(setUser(null));
            }
        };

        checkAuth();
    }, [dispatch]);

    return <>{children}</>;
}