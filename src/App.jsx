// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ToastProvider } from '@/components/ui';

import { Home } from './pages/home';
export default function App() {
  return <ToastProvider>
      <Home />
    </ToastProvider>;
}