import React from 'react';
import './Header.scss';

const Header = () => {
	return (
		<div className="header">
			<h1 className="header--title">Spacestagram</h1>
			<span className="header--credits">Nasa Api</span>
		</div>
	);
};

export default Header;
