"use client"

import { Provider } from 'react-redux';
import store from '../all-notes/store';

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}