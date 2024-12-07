import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface location{
  latitude: number | null;
  longitude: number | null;
}

interface SettingState {
  theme: string,
  location: location
}

const initialState: SettingState = {
  theme: "Light",
  location: {
    latitude: null,
    longitude: null,
  },
}

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    UpdateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    UpdateLocation: (state, action: PayloadAction<location>) => {
      state.location = action.payload
    },
    
  },
})

export const { UpdateTheme, UpdateLocation } = settingSlice.actions

export default settingSlice.reducer