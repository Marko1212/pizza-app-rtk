import { useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';
import axios, { AxiosError } from 'axios';

export function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			setError(undefined);
			setProducts([]);
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
		/* try {
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
		} */
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
				{error && <>{error}</>}
				{!isLoading &&
					products.length !== 0 &&
					products.map((p) => (
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
				{isLoading && <>On charge les produits...</>}
			</div>
		</>
	);
}
