import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import styles from '../Login/Login.module.css';
import { FormEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, register, userActions } from '../../store/user.slice';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

export function Register() {
	/* const [error, setError] = useState<string | null>(); */
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	/* const jwt = useSelector((s: RootState) => s.user.jwt);
	const registerErrorMessage = useSelector((s: RootState) => s.user.registerErrorMessage); */
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		/* 		const email = target.email.value;
		const password = target.password.value;
		console.log(email);
		console.log(password); */
		const { email, password, name } = target;
		/* 		console.log(email.value);
		console.log(password.value); */
		dispatch(register({ email: email.value, password: password.value, name: name.value }));
	};

	return (
		<div className={styles['login']}>
			<Heading>Inscription</Heading>
			{registerErrorMessage && (
				<div className={styles.error}>{registerErrorMessage}</div>
			)}
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
				<div className={styles['field']}>
					<label htmlFor='name'>Votre nom</label>
					<input
						id='name'
						name='name'
						placeholder='Nom'
						className={styles['input']}
					/>
				</div>
				<Button appearance='big'>Inscription</Button>
			</form>
			<div className={styles['links']}>
				<div>Vous avez un compte?</div>
				<Link to='/auth/login'>Se connecter</Link>
			</div>
		</div>
	);
}
