import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff/server';
import { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { AuthFormError } from '../../components/auth-form-error/auth-error';
import { Navigate } from 'react-router-dom';
import { H2 } from '../../components/h2/h2';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants/role';
import {useResetForm} from '../../hooks/use-reset-form';

const regFormSchema = yup.object().shape({
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
    passcheck: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required'),
});


const RegistrationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
            passcheck: '',
        },
        resolver: yupResolver(regFormSchema),
    });

    const [serverError, setServerError] = useState(null);

    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    useResetForm(reset);

    const onSubmit = ({ login, password }) => {
        server.register(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Error request: ${error}`);
                return;
            }
            dispatch(setUser(res));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Registration</H2>
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
                <Input
                    type="password"
                    placeholder="Password check"
                    {...register('passcheck', {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Register
                </Button>

                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}

            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
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
