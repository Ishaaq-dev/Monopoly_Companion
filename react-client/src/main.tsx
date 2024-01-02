import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createClient, Provider, cacheExchange,fetchExchange } from 'urql';
import './index.css'

const client = createClient({
  url: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
  exchanges: [cacheExchange,fetchExchange]
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)
