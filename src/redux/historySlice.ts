import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialHistoryState: any[] = [];


const historySlice = createSlice({

    name: 'history',

    initialState: initialHistoryState,

    reducers: {

      addToHistory: (state, action: PayloadAction<any>) => {

        return [action.payload, ...state.filter((item) => item.id !== action.payload.id)];

      },

    },
    
  });


  export const { addToHistory } = historySlice.actions;
  export default historySlice.reducer;