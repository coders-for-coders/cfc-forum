"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export function NavBar() {
    const stateuser = useSelector((state: any) => state.auth.user)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        setUser(stateuser)
    }, [stateuser])

    return (
        // <div className="sticky top-0 bg-transparent container flex justify-center">
        <div className="sticky top-0 bg-transparent container flex justify-center mx-auto">
            <header className="flex h-20 w-full items-center justify-between px-4 md:px-6">
                <nav className="flex items-center gap-2">
                    <Link href="/" className="text-lg font-semibold flex items-center gap-2" prefetch={false}>
                        {/*  */}
                        <span className="text-xl md:text-xl lg:text-2xl">QnA</span>
                    </Link>
                </nav>


                <div className="flex-1 max-w-md mx-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-10 rounded-full focus:ring-0 focus:ring-offset-0"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    {user ? (
                        <div className="flex items-center bg-indigo-950 rounded-full p-1">
                            <Avatar className="cursor-pointer bg-indigo-700">
                                <AvatarImage src={user.avatar || "/default-avatar.png"} alt="Profile" />
                                <AvatarFallback>
                                    {user.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <span className="px-2 font-bold">{user.username}</span>
                        </div>
                    ) : (
                        <Button asChild variant="default">
                            <Link href="/login" prefetch={false}>
                                Login
                            </Link>
                        </Button>
                    )}
                </div>
            </header>
        </div>
    )
}
