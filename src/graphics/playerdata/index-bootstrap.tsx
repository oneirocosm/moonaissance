import React from 'react';
import { createRoot } from 'react-dom/client';
import { Index } from './Index';

const root = createRoot(document.getElementById('rootplayerdata')!);
root.render(<Index />);

