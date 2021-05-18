import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

/* COMPONENTD */
import Header from './components/Header'
import Home from './components/Home'

/* CSS */
import './App.css';

function App() {
  return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route>
						<Home path="/" />
					</Route>
				</Switch>
			</Router>
		</div>
  );
}

export default App;
