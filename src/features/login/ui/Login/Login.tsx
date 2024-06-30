import { Form, Formik } from 'formik';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-toast';
import * as Yup from 'yup';

import { LoginParams } from '@features/login/model/LoginParams';

import { useAppDispatch } from '@shared/config/redux';
import { useLoginMutation } from '@shared/config/redux/services/authService';
import { login } from '@shared/config/redux/slices/authSlice';
import { getBemClasses, TokenService, typedMemo } from '@shared/lib';
import { ClassNameProps, TestProps } from '@shared/types';
import { Button, FlexContainer, FormField, Input, Modal, Text } from '@shared/ui';

import styles from './Login.module.css';

export type Props = ClassNameProps & TestProps & Readonly<{}>;

const initialValue: LoginParams = {
    username: '',
    password: '',
};

const validationSchema = Yup.object({
    username: Yup.string().required(' '),
    password: Yup.string().required(' '),
});

export const Login: FC<Props> = typedMemo(function Login({
    className,
    'data-testid': dataTestId = 'Login',
}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen(isOpen => !isOpen), []);
    const [loginServer] = useLoginMutation();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: LoginParams) => {
        loginServer(data)
            .unwrap()
            .then(result => {
                if (result.token) {
                    dispatch(login());
                    TokenService.setToken(result.token);
                }
            })
            .catch(error => {
                toast.error('Вы ввели неверный пароль или почту');
            });
    }, [loginServer, dispatch]);

    return (
        <>
            <Button onClick={toggleIsOpen}>
                Войти
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={toggleIsOpen}
                className={getBemClasses(styles, null, null, className)}
            >
                <Formik
                    initialValues={initialValue}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {() => (
                        <Form className={getBemClasses(styles, 'form')}>
                            <Text className={getBemClasses(styles, 'title')}>
                                Авторизация
                            </Text>

                            <FlexContainer
                                direction="column"
                                gap="m"
                            >
                                <FormField<string>
                                    name='username'
                                    label="Логин"
                                    required
                                    content={
                                        ({ value, onChange, isInvalid }) => (
                                            <Input
                                                value={value}
                                                onChange={event => onChange(event.target.value)}
                                                onBlur={event => onChange(event.target.value.trim())}
                                                invalid={isInvalid}
                                            />
                                        )
                                    }
                                />
                                <FormField<string>
                                    name='password'
                                    required
                                    label="Пароль"
                                    content={
                                        ({ value, onChange, isInvalid }) => (
                                            <Input
                                                type="password"
                                                value={value}
                                                onChange={event => onChange(event.target.value)}
                                                onBlur={event => onChange(event.target.value.trim())}
                                                invalid={isInvalid}
                                            />
                                        )
                                    }
                                />
                            </FlexContainer>
                            <FlexContainer direction="row" gap="xs">
                                <Button type="submit">
                                    Войти
                                </Button>
                                <Button variant="bordered" onClick={toggleIsOpen}>
                                    Отменить
                                </Button>
                            </FlexContainer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    );
});
