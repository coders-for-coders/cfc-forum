"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface QuestionProps {
    id: string,
    votes: {
        up: number,
        down: number
    };
    answers: {
        count: number,
        answers: object[]
    };
    views: number;
    title: string;
    description: string;
    tags: string[];
    author: {
        _id: string,
        username: string,
        avatar: string,
        reputation: number
    }, 
    createdAt: Date,
    updatedAt: Date
}

export const Question: React.FC<QuestionProps> = ({
    id,
    votes,
    answers,
    views,
    title,
    description,
    tags,
    author,
    createdAt,
    updatedAt
}) => {
    return (
        <Card className="p-6 rounded-2xl shadow-lg border bg-background transition-all hover:shadow-xl">

            <CardContent className="flex gap-6 p-0">
                {/* Stats */}
                <div className="flex flex-col gap-4 text-sm min-w-[100px] text-center">
                    <div>
                        <p className="text-lg font-semibold text-primary">{votes.up}</p>
                        <p className="text-muted-foreground">votes</p>
                    </div>
                    <div
                        className={cn(
                            "p-2 rounded-md text-sm font-medium",
                            answers.count > 0
                                ? "text-green-600"
                                : "bg-secondary text-muted-foreground"
                        )}
                    >
                        <p className="text-lg font-semibold">{answers.count}</p>
                        <p>answer{answers.count !== 1 && "s"}</p>
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-primary">{views}</p>
                        <p className="text-muted-foreground">views</p>
                    </div>
                </div>

                <div className="flex-1 space-y-4">

                    <Link
                        href={`/questions/${id}`}
                        className="text-xl font-semibold hover:text-primary hover:underline transition-colors"
                    >
                        {title}
                    </Link>

                    <Separator />
                    <div>
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                            {description.length > 500
                                ? `${description.substring(0, 500)}...`
                                : description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 bottom-0">
                        {tags.map((tag, index) => (
                            <Link href={"ss"} key={`${tag}-${index}`}>
                                <Badge
                                    variant="outline"
                                    className="hover:bg-primary/10 px-2 text-[10px] cursor-pointer transition"
                                >
                                    {tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                        {author.avatar ? (
                            <Avatar>
                                <AvatarImage src={author.avatar} alt={`${author.username}'s avatar`} />
                                <AvatarFallback className="bg-primary/10 text-lg text-primary">
                                    {author.username[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <Avatar>
                                <AvatarFallback className="bg-primary/10 text-lg text-primary">
                                    {author.username[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        )}

                        <span className="text-primary font-medium hover:underline cursor-pointer">
                            {author.username}
                        </span>
                        {author.reputation && <span>{author.reputation}</span>}
                        <span>
                            {(() => {
                                const now = new Date();
                                const date = new Date(updatedAt);
                                const isUpdated = new Date(createdAt).toISOString() !== new Date(updatedAt).toISOString();
                                const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
                                
                                if (diffInMinutes < 1440 && date.getDate() === now.getDate()) {
                                    if (diffInMinutes < 1) return `${isUpdated ? 'updated' : 'asked'} just now`;
                                    if (diffInMinutes < 60) return `${isUpdated ? 'updated' : 'asked'} ${diffInMinutes} min ago`;
                                    return `${isUpdated ? 'updated' : 'asked'} ${Math.floor(diffInMinutes / 60)} hours ago`;
                                }
                                
                                return `${isUpdated ? 'updated' : 'asked'} ${date.toLocaleDateString('en-US', { 
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}`;
                            })()}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card >
    );
};
;
