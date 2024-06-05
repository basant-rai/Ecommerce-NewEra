import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ICount {
  count: number
}

const initialState: ICount = {
  count: 0
}

const CountSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<ICount>) => {
      state.count = action.payload.count
    }
  }
})

export const { setCount } = CountSlice.actions;
export default CountSlice.reducer
