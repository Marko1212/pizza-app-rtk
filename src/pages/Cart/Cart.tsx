import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

export function Cart() {
	const navigate = useNavigate();

	return (
		<>
			<h1>Cart</h1>
			<Button onClick={()=>navigate('/') /* navigate(-1) */} appearance='big'>Retour au menu</Button>
		</>
	);
}
