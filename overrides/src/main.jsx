import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './mobile-inspector.css';
import './mobile-viewport.css';
import './globe-controls.css';
import './apple-preview.css';
import './apple-filters.css';
import './apple-detail.css';
import './apple-sky.css';

createRoot(document.getElementById('root')).render(<App/>);
