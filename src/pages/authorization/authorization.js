import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {server} from '../../bff/server';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Link, Navigate } from 'react-router-dom';
import { H2 } from '../../components/h2/h2';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants/role';

const authFormSchema = yup.object().shape({
    login: yup
    .string()
    .matches(/^\w+$/, 'Invalid login format')
    .required('Login is required')
    .min(3, 'Login must be at least 3 characters')
    .max(15, 'Login must be at most 15 characters'),
    password: yup
    .string()
    .matches(/^[\w#%]+$/, 'Invalid password format')
    .max(20, 'Password must be at most 20 characters')
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 20 px 0;
    font-size: 18px;
    `;

const ErrorMessage = styled.div`
    width: 100%;
    background-color: #fcadad;
    margin: 10px 0;
    padding: 10px;
    font-size: 18px;
    `;

const AuthorizationContainer = ({className}) => {
   const{
    register,
    reset,
    handleSubmit,
    formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
            password: ''
        },
        resolver: yupResolver(authFormSchema),
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();
    const store = useStore();
    const roleId = useSelector(selectUserRole);


    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;

        return store.subscribe(() => {
            let previousWasLogout = currentWasLogout;
            currentWasLogout = store.getState().app.wasLogout;
            if (previousWasLogout !== currentWasLogout) {
                reset();
            }
        });
    }, [reset,store])

    const onSubmit = ({login, password}) => {
        server.authorize(login, password).then(({error, res}) => {
            if (error) {
                setServerError(`Error request: ${error}`);
                return;
            }
            dispatch(setUser(res));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return < Navigate to="/"  />;
    }

    return (
        <div className={className}>
            <H2>Authorization Page</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Login"
                    {...register('login', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    {...register('password', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Submit
                </Button>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <StyledLink to="/register">Register</StyledLink>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        width: 260px;
    }
}`;