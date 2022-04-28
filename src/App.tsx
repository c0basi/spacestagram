import React from 'react';
import './App.scss';
import Animation from './backgroundAnimation/Animation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DataSection from './components/DataSection/DataSection';
import UtilityBar from './components/UtilityBar/UtilityBar';

function App() {
	return (
		<div className="App">
			<Animation />
			<Header />
			<DataSection />
			<Footer />
		</div>
	);
}

export default App;
