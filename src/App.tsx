import React from 'react';
import './App.css';
import Sidebar from 'components/Sidebar/Sidebar'

function App() {
  return (
    <div className="App">
      <Sidebar dark open={true}>Sidebar content</Sidebar>
    </div>
  );
}

export default App;
