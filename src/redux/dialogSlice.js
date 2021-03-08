import { createSlice } from '@reduxjs/toolkit';

const dialogSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, list: [] },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setTo: (state, action) => {
      state.value = action.payload;
    },
    addToList: (state, action) => {
      // debugger
      state.list.push(action.payload);
    },
    removeFromList: (state, action) => {
      state.list.splice(action.payload, 1);
    }
  },
});

const incrementIfOdd = () => (dispatch, getState) => {
    const state = getState();
    if (state.counter.value % 2 === 0) {
      return;
    }
    dispatch(actions.increment());
};

const incrementAsync = (delay = 1000) => (dispatch) =>
  setTimeout(() => dispatch(actions.increment()), delay);

export default dialogSlice.reducer;
export const actions = {...dialogSlice.actions, incrementAsync, incrementIfOdd};
export const selectors = {value: (state) => state.counter.value};
