import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import styles from './Login.module.css';
import { FormEvent } from 'react';

export function Login() {
	const submit = (e: FormEvent) => {
		e.preventDefault();
		console.log(e);
	};

	return (
		<div className={styles['login']}>
			<Heading>Connexion</Heading>
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
