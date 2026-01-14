'use server';

/**
 * @fileOverview A chatbot for answering FAQs about Suprabha Electricals.
 *
 * - answerFaq - A function that answers FAQs about Suprabha Electricals.
 * - AnswerFaqInput - The input type for the answerFaq function.
 * - AnswerFaqOutput - The return type for the answerFaq function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFaqInputSchema = z.object({
  query: z.string().describe('The user query about Suprabha Electricals.'),
});
export type AnswerFaqInput = z.infer<typeof AnswerFaqInputSchema>;

const AnswerFaqOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query.'),
});
export type AnswerFaqOutput = z.infer<typeof AnswerFaqOutputSchema>;

const GetProjectPortfolioSchema = z.object({
  projectPortfolio: z.string().describe('The project portfolio of Suprabha Electricals.'),
});

const getProjectPortfolio = ai.defineTool({
  name: 'getProjectPortfolio',
  description: 'Retrieves the project portfolio of Suprabha Electricals.',
  inputSchema: z.object({}),
  outputSchema: GetProjectPortfolioSchema,
}, async () => {
  // Placeholder implementation - replace with actual data retrieval logic
  const projectPortfolio = `Suprabha Electricals has worked on projects like Geological survey of India Bangalore, CII bangalore, NIT surathkal and so many others where we set up auditoriums and new wing of a NIT surathkal`;
  return {projectPortfolio};
});

export async function answerFaq(input: AnswerFaqInput): Promise<AnswerFaqOutput> {
  return answerFaqFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerFaqPrompt',
  input: {schema: AnswerFaqInputSchema},
  output: {schema: AnswerFaqOutputSchema},
  tools: [getProjectPortfolio],
  system: `You are a chatbot answering questions about Suprabha Electricals.
  Suprabha Electricals is an electrical contractor focusing on government electrical projects in Karnataka, India.
  Contact Details: Number- +91 9448075362; Suprabhaele@gmail.com.
  Working hours: 10AM to 6PM. We do not do emergency support.

  If the user asks about projects, use the getProjectPortfolio tool to get information about Suprabha Electricals' project history.
  Use the tool result to inform your answer, but do not directly repeat the portfolio.`, // instruction to use tool if the user asks about projects
  prompt: `{{query}}`,
});

const answerFaqFlow = ai.defineFlow(
  {
    name: 'answerFaqFlow',
    inputSchema: AnswerFaqInputSchema,
    outputSchema: AnswerFaqOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
