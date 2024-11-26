import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface SettingState {
  theme: string
}

// Define the initial state using that type
const initialState: SettingState = {
  theme: "Light",
}

export const settingSlice = createSlice({
  name: 'setting',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    UpdateTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
  },
})

export const { UpdateTheme } = settingSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default settingSlice.reducer