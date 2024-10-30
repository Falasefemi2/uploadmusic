/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";


import React from 'react';
import { parseAsString, useQueryState } from "nuqs";
import { Search } from "lucide-react";
import { Input } from "./ui/input";


const AppSearch = () => {
    const [searchQuery, setSearchQuery] = useQueryState('q', parseAsString
        .withOptions({ shallow: false })
        .withDefault("")
    );

    return (
        <div className="w-full max-w-2xl space-y-4">
            <div className="relative">
                <Input
                    type="text"
                    value={searchQuery || ''}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search music"
                    className="w-full pl-10"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>
        </div>

    );
};

export default AppSearch;