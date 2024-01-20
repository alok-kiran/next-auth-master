"use client"
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { CardWrapper } from './card-wrapper';
import { LoginSchema } from '../../../schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '../../../actions/login';


const LoginForm: React.FC = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            login(values).then((res) => {
                if (res.success) {
                    setSuccess('Logged in successfully!');
                    form.reset();
                }
            }).catch((err) => {
                setError(err.message);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel='Welcome back!'
            backButtonLabel="don't have an account?"
            backButtonHref='/register'
            showSocial

        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-6"
                >
                    <div className=' space-y-4'>
                        <FormField
                            control={form.control}
                            name={"email"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email" className=' text-black'>Email</FormLabel>
                                    <FormControl
                                        {...field}
                                        id="email"
                                    >
                                        <Input
                                            {...field}
                                            placeholder='john.doe@gmail.com'
                                            type='email'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password" className=' text-black'>Password</FormLabel>
                                    <FormControl
                                        {...field}
                                        id="password"
                                    >
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='********'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError
                        message={error}
                    />
                    <FormSuccess
                        message={success}
                    />
                    <Button type='submit' className='w-full' disabled={isPending}>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
