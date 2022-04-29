import React from 'react';
import './App.scss';
import Animation from './backgroundAnimation/Animation';
import DataSection from './components/DataSection/DataSection';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

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
