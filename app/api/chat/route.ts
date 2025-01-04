import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { Pinecone } from "@pinecone-database/pinecone"
import { PineconeStore } from "@langchain/pinecone"
import { OpenAIEmbeddings } from "@langchain/openai"
import { extractKeywords } from '@/app/utils/keywordExtractor';

interface Article {
    content: string;
    title: string;
    fullArticleNumber: string;
    description: string;
}

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()
        const latestMessage = messages[messages.length - 1]?.content

        if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX || !process.env.OPENAI_API_KEY) {
            throw new Error("Missing environment variables")
        }

        const pinecone = new Pinecone()

        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "text-embedding-3-small"
        })

        try {
            const vectorStore = new PineconeStore(embeddings, {
                pineconeIndex: pinecone.index(process.env.PINECONE_INDEX as string)
            })

            const results = await vectorStore.maxMarginalRelevanceSearch(latestMessage, {
                k: 3,
                fetchK: 20,
                lambda: 0.7  
            })

            const articles = results.map(doc => ({
                title: doc.metadata.title,
                fullArticleNumber: doc.metadata.fullArticleNumber,
                description: doc.metadata.articleDescription,
                content: doc.metadata.articleContent
            }))

            const keywords = extractKeywords(latestMessage);

            const highlightContent = (article: Article) => article.content.split(' ').map((word: string) => {
                const wordLower = word.toLowerCase().replace(/[^\w]/g, '');
                return keywords.includes(wordLower) ? 
                    `==${word}==` : 
                    word;
            }).join(' ');

            const highlightedContent = articles.map(highlightContent);

            const template = {
                role: "system",
                content: `You are a professional BC Tenancy Law Assistant. I will provide you with 3 relevant articles. Please respond in the following way:

                        1. First, show the most relevant article in a blockquote:
                        > Document: ${articles[0].title}  
                        > Article Number: ${articles[0].fullArticleNumber}  
                        > Description: ${articles[0].description}  
                        and explain article content ${highlightedContent[0]} in a way that is easy to understand.

                        2. Then ask if the user is satisfied with this answer. If not, show the second article and explain the content in a way that is easy to understand.
                        If they're still not satisfied with the second article, show the third one and explain the content in a way that is easy to understand.
                        If they're not satisfied with any of the three articles, suggest they rephrase their question.

                        Alternative Article 2:
                        Document: ${articles[1].title}
                        Article Number: ${articles[1].fullArticleNumber}
                        Description: ${articles[1].description}
                        Content: ${highlightedContent[1]}

                        Alternative Article 3:
                        Document: ${articles[2].title}
                        Article Number: ${articles[2].fullArticleNumber}
                        Description: ${articles[2].description}
                        Content: ${highlightedContent[2]}

                        Remember:
                        - Only show one article at a time
                        - Wait for user feedback before showing the next one
                        - Format the response in markdown, and bold the keywords in your explanation

                        User Question: ${latestMessage}`
            }

            const response = await streamText({
                model: openai("gpt-4-turbo-preview"),
                messages: [template, ...messages],
            })

            return response.toDataStreamResponse()
        } catch (error) {
            console.error("Error querying Pinecone:", error)
        }
    } catch (error) {
        console.error("API route error:", error)
        return new Response(
            JSON.stringify({ error: "An error occurred processing your request" }), 
            { status: 500 }
        )
    }
}