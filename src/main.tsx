import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './contexts/LanguageContext'

// Polyfill for React 19 compatibility with react-quill
// @ts-ignore
if (!ReactDOM.findDOMNode) {
  // @ts-ignore
  ReactDOM.findDOMNode = (node: any) => {
    if (node == null) return null;
    if (node.nodeType === 1) return node;
    return node.stateNode || null;
  };
}

createRoot(document.getElementById('root')!).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
)
