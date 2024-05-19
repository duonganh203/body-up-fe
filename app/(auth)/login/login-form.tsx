"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas";
import { handleLogin } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const { login } = useAuthStore((store) => store);
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            isRemember: false,
        },
    });
    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        startTransition(async () => {
            await handleLogin(data).then((res) => {
                login(res?.payload.token);
                router.push("/my-fitness-journey");
            });
        });
    };
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-5 mt-2'
                >
                    <div className='space-y-3'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='email'
                                            placeholder='E-mail'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='Password'
                                            className='bg-transparent hover:ring-1 hover:ring-black'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <FormField
                                    control={form.control}
                                    name='isRemember'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                {/* @ts-ignore */}
                                                <Input
                                                    {...field}
                                                    type='checkbox'
                                                    className='bg-transparent'
                                                    id='isRemember'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                ></FormField>
                                <label
                                    htmlFor='isRemember'
                                    className='text-sm ml-1 cursor-pointer'
                                >
                                    Keep me signed in
                                </label>
                            </div>
                            <Link
                                href='/forgot-password'
                                className='text-sm underline'
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <Button
                        type='submit'
                        variant='primary'
                        size='full'
                        disabled={isPending}
                    >
                        Log in
                    </Button>
                    <div className=''>
                        <div className='flex items-center justify-center space-x-1'>
                            <div className='h-[1px] w-full bg-[#e0e0e0]'></div>
                            <span className='text-sm'>or</span>
                            <div className='h-[1px] w-full bg-[#e0e0e0]'></div>
                        </div>
                    </div>
                    <Button
                        variant='primaryOutline'
                        size='full'
                        className='text-sm font-medium'
                        disabled={isPending}
                    >
                        <Image
                            src='/google-c.svg'
                            alt='Google'
                            width={24}
                            height={24}
                            className='mr-2'
                        />
                        Log in with Google
                    </Button>
                </form>
            </Form>
        </>
    );
};
