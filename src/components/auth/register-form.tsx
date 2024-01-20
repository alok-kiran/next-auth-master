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
import { RegisterSchema } from '../../../schemas';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { register } from '../../../actions/register';


const RegisterForm: React.FC = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const [isPending, startTransition] = useTransition();
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            register(values).then((res) => {
                if (res.success) {
                    setSuccess(res.data.message);
                    form.reset();
                }
            }).catch((err) => {
                setError(err.message);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel='Create an account'
            backButtonLabel="Already have an account?"
            backButtonHref='/login'
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
                            name={"name"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name" className=' text-black'>Name</FormLabel>
                                    <FormControl
                                        {...field}
                                        id="name"
                                    >
                                        <Input
                                            {...field}
                                            placeholder='john doe'
                                            type='text'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default RegisterForm;
