import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';

export function Layout() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles.sidebar}>
				<div className={styles['user']}>
					<img
						className={styles.avatar}
						src='/avatar.png'
						alt='Avatar utilisateur'
					/>
					<div className={styles.name}>Victor Hugo</div>
					<div className={styles.email}>victor@hugo.fr</div>
				</div>
				<div className={styles['menu']}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src='/menu-icon.svg' alt='Icône du menu' />
						Menu
					</NavLink>
					<NavLink
						to='/cart'
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src='/cart-icon.svg' alt='Icône de la corbeille' />
						Cart
					</NavLink>
				</div>
				<Button className={styles.exit} onClick={logout}>
					<img src='/exit-icon.svg' alt='Icône de la sortie' />
					Sortie
				</Button>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}
