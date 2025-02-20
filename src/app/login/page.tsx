"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input, PasswordInput } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

import { FaGithub, FaDiscord } from "react-icons/fa";
import Link from "next/link"

const formSchema = z.object({
    email: z.string().min(1, {

        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
})

export default function LoginPage() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
  
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-slate-900 p-8 rounded-lg">
                <h1 className="text-center font-bold text-xl pb-4">Welcome back</h1>


                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput {...field}/>
                                    </FormControl>
                                    <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormDescription className="pt-5 gap-3">
                            <Button type="submit" className="w-full">Login</Button>

                            <Separator className="mt-3 mb-4 " />
                            <p className="justify-center flex">or continue with</p>
                            <div className="p-4 flex gap-6 items-center justify-center">
                                <Link href={`${process.env.NODE_ENV === 'production' 
                                    ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL 
                                    : process.env.NEXT_PUBLIC_DEV_BACKEND_URL}/api/auth/github`}>
                                    <FaGithub size={24} />
                                </Link>
                                <Link href={`${process.env.NODE_ENV === 'production'
                                    ? process.env.NEXT_PUBLIC_PROD_BACKEND_URL
                                    : process.env.NEXT_PUBLIC_DEV_BACKEND_URL}/api/auth/discord`}>
                                    <FaDiscord size={24} />
                                </Link>
                            </div>
                        </FormDescription>
                    </form>
                </Form>
            </div>
        </div>
    )
}
