import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

console.log('--- INDEX.TSX STARTING ---');

const container = document.getElementById('root');
if (!container) {
  console.error('--- ROOT CONTAINER NOT FOUND ---');
  throw new Error('Failed to find the root element');
}

console.log('--- RENDERING APP ---');
const root = createRoot(container);

// Test if anything renders at all
// root.render(<h1 style={{color: "red", backgroundColor: "yellow", padding: "20px", position: "fixed", top: 0, left: 0, zIndex: 9999}}>HELLO WORLD - IF YOU SEE THIS, REACT IS WORKING</h1>);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorker.unregister();
