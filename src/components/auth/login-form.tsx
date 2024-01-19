"use client"
import React, { useState } from 'react';
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


const LoginForm: React.FC = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
        console.log(values);
    };

    return (
        <CardWrapper
            headerLabel='Welcome back!'
            backButtonLabel='Create an account'
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError
                        message=''
                    />
                    <FormSuccess
                        message=''
                    />
                    <Button type='submit' className='w-full'>
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
