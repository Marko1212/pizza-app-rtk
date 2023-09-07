import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import ProductCard from '../../components/ProductCard/ProductCard';

export function Product() {
	const { id } = useParams();
	console.log(id);

	const [product, setProduct] = useState<Product | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();

	const getProduct = async (id: number) => {
		try {
			setIsLoading(true);
			setError(undefined);
			setProduct(undefined);
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});
			const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
			setProduct(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	useEffect(() => {
		console.log(id);
		if (id) getProduct(+id);
	}, [id]);

	return (
		<>
			<div>
				{error && <>{error}</>}
				{!isLoading && product && (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						description={product.ingredients.join(', ')}
						rating={product.rating}
						price={product.price}
						image={product.image}
					/>
				)}
				{isLoading && <>On charge le produit...</>}
			</div>
		</>
	);
}
