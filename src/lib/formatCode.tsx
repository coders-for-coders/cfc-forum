import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

 
function formatCode(text: string) {
    const parts = text.split(/(```[\s\S]*?```)/g); 

    const formatInline = (content: string) => {
        return content
            .replace(/^###\s(.+)$/gm, '<h3 class="text-xl font-semibold mt-6 mb-2">$1</h3>')
            .replace(/^##\s(.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-3">$1</h2>')
            .replace(/^#\s(.+)$/gm, '<h1 class="text-3xl font-extrabold mt-10 mb-4">$1</h1>')

            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em class="font-semibold italic">$1</em></strong>')

            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

            .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

            .replace(/`([^`]+)`/g, '<code class="rounded px-1.5 py-0.5 font-mono text-sm">$1</code>');
    };

    return (
        <div className="prose prose-zinc max-w-none">
            {parts.map((part, index) => {
                const match = part.match(/```(\w+)?\n([\s\S]*?)```/); 
                if (match) {
                    const [, lang, code] = match;
                    return (
                        <div className="my-4 rounded-lg overflow-hidden shadow" key={index}>
                            <SyntaxHighlighter
                                language={lang || 'typescript'}
                                style={tomorrow}
                                customStyle={{ borderRadius: '0.5rem', margin: 0 }}
                            >
                                {code.trim()}
                            </SyntaxHighlighter>
                        </div>
                    );
                }
                return (
                    <div
                        key={index}
                        className="space-y-4 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatInline(part) }}
                    />
                );
            })}
        </div>
    );
}

export default formatCode;
