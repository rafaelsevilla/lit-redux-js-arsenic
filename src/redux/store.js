import create from 'zustand/vanilla';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

export const store = create(devtools((set) => ({
  data: {
    count: 0,
    text: ""
  },
  set: fn => set(produce(fn))
})));
