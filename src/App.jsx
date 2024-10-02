// src/App.jsx
import React from 'react';
import NavBar from './Components/NavBar';
import UrlShortneing from './Components/UrlShortneing';

function App() {
    return (
        <> 
            <NavBar />
            <div>
                <UrlShortneing />
            </div>
        </>
    );
}

export default App;
