import React from 'react';
import './App.scss';
import Animation from './backgroundAnimation/Animation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DataSection from './components/DataSection/DataSection';
function App() {
	return (
		<div className="App">
			{/* <div className="stars"></div>
			<div className="twinkling"></div> */}
			<Animation />
			<Header />
			<div>Make some food</div>
			<DataSection />
			<Footer />
		</div>
	);
}

export default App;
