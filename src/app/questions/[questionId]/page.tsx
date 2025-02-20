
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import api from "@/lib/api";
import formatCode from "@/lib/formatCode";


interface PageProps {
    params: {
        questionId: string
    }
}

interface Author {
    username: string
    avatar: string
    reputation: number
}

interface Question {
    id: string
    title: string
    description: string
    author: Author
    createdAt: string
}

export async function generateMetadata({ params }: PageProps) {
    const {questionId} = await params
    const question = await getQuestion(questionId);
    return {
        title: question.title,
        description: question.description.substring(0, 160),
    };
}

async function getQuestion(questionId: string): Promise<Question> {
    const res = await api.get(`/api/question/${questionId}`)
    return res.data as Question
}

async function getQuestionAnswers(questionId: string): Promise<any> {
    const res = await api.get(`/api/answer/all/${questionId}`)
    return res.data as any
}

export default async function QuestionPage({ params }: PageProps) {
    const {questionId} = await params
    const question = await getQuestion(questionId)
    const answers = await getQuestionAnswers(questionId)
    return (
        <div className="container mx-auto py-8 space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={question.author.avatar} />
                            {/* <AvatarFallback>{question.author.username[0]}</AvatarFallback> */}
                        </Avatar>
                        <div>
                            <CardTitle>{question.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {/* Posted by {question.author.username} on {new Date(question.createdAt).toLocaleDateString()} */}
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>

                    {formatCode(question.description)}
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Answers</h2>
                <Separator />
                
                {/* {answers.map((answer: any) => (
                    <Card key={answer.id}>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar>
                                    <AvatarImage src={answer.author.avatar} />
                                    <AvatarFallback>{answer.author.username[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">{answers.author.username}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(answer.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <p>{answer.content}</p>
                        </CardContent>
                    </Card>
                ))} */}

                <Button className="w-full">Add Answer</Button>
            </div>
        </div>
    )
}
