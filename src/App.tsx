import React from 'react';
import './App.scss';
import Animation from './backgroundAnimation/Animation';
function App() {
	return (
		<div className="App">
			{/* <div className="stars"></div>
			<div className="twinkling"></div> */}
			<Animation />
			<div>Make some food</div>
		</div>
	);
}

export default App;
