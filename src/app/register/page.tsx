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

import Link from "next/link"
import { FaDiscord, FaGithub } from "react-icons/fa"

import api from "@/lib/api"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string()
        .min(1, { message: "Please confirm your password" }),
    fullname: z.string()
        .min(1, { message: "Full name is required" })
        .max(50, { message: "Full name must be less than 50 characters" }),
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be less than 20 characters" })
        .regex(/^[a-zA-Z0-9_-]+$/, { message: "Username can only contain letters, numbers, underscores and dashes" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function RegisterPage() {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            fullname: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { confirmPassword, ...dataToSend } = values;
            const response = await api.post(
                "/auth/register",
                JSON.stringify(dataToSend)
            )
            if (response.status === 201) {
                router.push("/")
            } else {

            }

        } catch (error) {
            console.error('Registration error:', error);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-slate-900 p-8 rounded-lg w-[500px]">
                <h1 className="text-center font-bold text-xl pb-4">Register</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormDescription className="pt-5">
                            <Button type="submit" className="w-full">Register</Button>

                            <Separator className="mt-3 mb-4" />
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
