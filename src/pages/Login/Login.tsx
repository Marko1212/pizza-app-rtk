import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import styles from './Login.module.css';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		/* 		const email = target.email.value;
		const password = target.password.value;
		console.log(email);
		console.log(password); */
		const { email, password } = target;
		/* 		console.log(email.value);
		console.log(password.value); */
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/login`, {
				email,
				password
			});
			console.log(data);
			localStorage.setItem('jwt', data.accessToken);
			dispatch(userActions.addJwt(data.accessToken));
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				console.log(e);
				setError(e.response?.data);
			}
		}
	};

	return (
		<div className={styles['login']}>
			<Heading>Connexion</Heading>
			{error && <div className={styles.error}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Votre email</label>
					<input
						id='email'
						name='email'
						type='email'
						placeholder='Email'
						className={styles['input']}
					/>
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Votre mot de passe</label>
					<input
						id='password'
						name='password'
						type='password'
						placeholder='Mot de passe'
						className={styles['input']}
					/>
				</div>
				<Button appearance='big'>Connexion</Button>
			</form>
			<div className={styles['links']}>
				<div>Pas de compte?</div>
				<Link to='/auth/register'>S'inscrire</Link>
			</div>
		</div>
	);
}
