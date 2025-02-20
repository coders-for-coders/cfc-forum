'use client';
import { Question } from "@/components/question/Question";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface QuestionData {
    _id: string,
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
        avatar: string
        reputation: number
    },
    createdAt: Date,
    updatedAt: Date
}

export default function Questions() {
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get('/api/question');
                setQuestions(response.data as QuestionData[]);
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>

            <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
                <div className="my-4 text-xl">
                    <h1>Latest Questions</h1>
                </div>
                {questions.map((question, index) => (
                    <Question
                        key={index}
                        id={question._id}
                        votes={question.votes}
                        answers={question.answers}
                        views={question.views}
                        title={question.title}
                        description={question.description}
                        tags={question.tags}
                        author={question.author}
                        createdAt={question.createdAt}
                        updatedAt={question.updatedAt}
                    />
                ))}
            </div>
        </>
    );
}
