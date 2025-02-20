import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/api";
import formatCode from "@/lib/formatCode";
import { Metadata, ResolvingMetadata } from "next";


type Params = Promise<{ questionId: string }>;

interface Author {
    username: string;
    avatar: string;
    reputation: number;
}

interface Question {
    id: string;
    title: string;
    description: string;
    author: Author;
    createdAt: string;
}

interface Votes {
    up: number;
    down: number;
}

export interface Comment {
    content: string;
    author: string;
    post: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
    isDeleted: boolean;
    parentComment?: string;
}

interface Answer {
    _id: string;
    content: string;
    comments: Comment[];
    author: Author;
    question: string;
    votes: Votes;
    createdAt: string;
    updatedAt: string;
}

export async function generateMetadata(
    { params }: { params: Params }
): Promise<Metadata> {
    const { questionId } = await params;
    const question = await getQuestion(questionId);
    return {
        title: question.title,
        description: question.description.substring(0, 160),
    };
}

async function getQuestion(questionId: string): Promise<Question> {
    const res = await api.get(`/api/question/${questionId}`);
    return res.data as Question;
}

async function getQuestionAnswers(questionId: string): Promise<Answer[]> {
    const res = await api.get(`/api/answer/all/${questionId}`);
    return res.data as Answer[];
}


export default async function Page({
    params,
}: {
    params: Params;
}) {
    const { questionId } = await params;
    const question = await getQuestion(questionId);
    const answers = await getQuestionAnswers(questionId);

    return (
        <div className="container mx-auto py-8 space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={question.author.avatar} alt={question.author.username} />
                            <AvatarFallback>{question.author.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{question.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Posted by {question.author.username} on{" "}
                                {new Date(question.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>{formatCode(question.description)}</CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Answers</h2>
                <Separator />

                {answers.map((answer) => (
                    <Card key={answer._id}>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                    <AvatarImage src={answer.author.avatar} alt={answer.author.username} />
                                    <AvatarFallback>{answer.author.username[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{answer.author.username}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(answer.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="font-medium">
                                        {answer.votes.up - answer.votes.down}
                                    </span>
                                </div>
                                <p>{answer.content}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Button className="w-full">Add Answer</Button>
            </div>
        </div>
    );
}
