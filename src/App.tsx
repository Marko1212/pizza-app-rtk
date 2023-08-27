import { MouseEvent, useEffect, useState } from 'react';
import Button from './components/Button/Button';

function App() {
	// tuple
	const [counter, setCounter] = useState<number>(0);
	/* useEffect(() => {}, []); */ // pas de typisation supplémentaire

	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={() => setCounter(2) /* addCounter */}>Bouton</Button>
		</>
	);
}

export default App;
