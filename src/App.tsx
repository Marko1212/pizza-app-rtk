import { MouseEvent, useEffect, useState } from 'react';
import Button from './components/Button/Button';
import Input from './components/Input/Input';

function App() {
	// tuple
	const [counter, setCounter] = useState<number>(0);
	/* useEffect(() => {}, []); */ // pas de typisation supplémentaire

	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={/* () => setCounter(2)  */ addCounter}>Bouton</Button>
			<Button appearance='big' onClick={/* () => setCounter(2)  */ addCounter}>
				Bouton
			</Button>
			<Input placeholder='Email' />
		</>
	);
}

export default App;
