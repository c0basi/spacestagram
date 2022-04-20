import React from 'react';
import './App.scss';
import Animation from './backgroundAnimation/Animation';
import Header from './components/Header/Header';
function App() {
	return (
		<div className="App">
			{/* <div className="stars"></div>
			<div className="twinkling"></div> */}
			<Animation />
			<Header />
			<div>Make some food</div>
		</div>
	);
}

export default App;
