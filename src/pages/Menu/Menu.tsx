import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const getMenu = async () => {
		try {
			const res = await fetch(`${PREFIX}/products`);
			if (!res.ok) {
				return;
			}
			const data = (await res.json()) as Product[];
			console.log(data);
			setProducts(data);
		} catch (e) {
			console.error(e);
			return;
		}
	};

	useEffect(() => {
		getMenu();
	}, []);

	return (
		<>
			<div className={styles['head']}>
				<Heading>Menu</Heading>
			</div>
			<div>
				{products.map((p) => (
					<ProductCard
						key={p.id}
						id={p.id}
						name={p.name}
						description={p.ingredients.join(', ')}
						rating={p.rating}
						price={p.price}
						image={p.image}
					/>
				))}
			</div>
		</>
	);
}
