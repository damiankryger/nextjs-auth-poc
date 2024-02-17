'use client'

import {Form, Formik, FormikHelpers} from "formik";
import {Button, Input} from "@nextui-org/react";
import {signIn} from "next-auth/react";
import * as Yup from "yup"

interface Values {
    email: string,
    password: string
}

interface Props {
    searchParams: { error?: string }
}

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required(),
    password: Yup.string()
        .required()
})

const Login = ({searchParams}: Props) => {
    const handleSubmit = async (
        values: Values,
        formikHelpers: FormikHelpers<Values>
    ) => {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: '/'
        })
    }

    return <div className={'w-screen h-screen flex items-center justify-center'}>
        <div className={'border rounded-xl py-4 px-8 shadow-2xl'}>
            <h1 className={'text-center mb-8 font-bold text-2xl'}>Next.js Auth PoC</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={SignInSchema}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    ({errors, touched, handleChange, handleBlur}) => {
                        return <Form>
                            <Input
                                type={'email'}
                                variant={'flat'}
                                label={'Email'}
                                name={'email'}
                                placeholder={'Enter your email'}
                                className={'w-64 mb-4'}
                                isInvalid={Boolean(errors.email)}
                                errorMessage={errors.email}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                            <Input
                                type={'password'}
                                variant={'flat'}
                                label={'Password'}
                                name={'password'}
                                placeholder={'Enter your password'}
                                className={'w-64 mb-8'}
                                isInvalid={Boolean(errors.password)}
                                errorMessage={errors.password}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                            <Button color={'primary'} className={'w-64'} type={'submit'}>Log in</Button>
                        </Form>
                    }
                }
            </Formik>
        </div>
    </div>
}

export default Login