import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Menu.module.css';

export function Menu() {
	return (
		<>
			<div className={styles['head']}>
				<Heading>Menu</Heading>
			</div>
			<div>
				<ProductCard
					id={1}
					name='Un vrai plaisir'
					description='tomates, olives, roquette, salami'
					rating={4.5}
					price={13}
					image='/product-demo.png'
				/>
			</div>
		</>
	);
}
