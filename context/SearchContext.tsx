"use client";

import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext<{ searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> } | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);
