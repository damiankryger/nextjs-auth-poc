'use client'

import {Form, Formik} from "formik";
import {Button, Input} from "@nextui-org/react";

const Login = () => {
    return <div className={'w-screen h-screen flex items-center justify-center'}>
        <div className={'border rounded-xl py-4 px-8 shadow-2xl'}>
            <h1 className={'text-center mb-8 font-bold text-2xl'}>Next.js Auth PoC</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values, formikHelpers) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        formikHelpers.setSubmitting(false);
                    })
                }}
            >
                <Form>
                    <Input type={'email'} variant={'flat'} label={'Email'} placeholder={'Enter your email'} className={'w-64 mb-4'}/>
                    <Input type={'password'} variant={'flat'} label={'Password'} placeholder={'Enter your password'} className={'w-64 mb-8'}/>
                    <Button color={'primary'} className={'w-64'}>Log in</Button>
                </Form>
            </Formik>
        </div>
    </div>
}

export default Login