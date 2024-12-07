import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CachedProduct {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface CacheState {
    products: CachedProduct[];
}

const initialState: CacheState = {
    products: [],
};

const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        setCachedProducts: (state, action: PayloadAction<CachedProduct[]>) => {
            state.products = action.payload;
        },
        clearCache: (state) => {
            state.products = [];
        },
    },
});

export const { setCachedProducts, clearCache } = cacheSlice.actions;
export default cacheSlice.reducer;
