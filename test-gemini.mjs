import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  console.log('No API key found in env!');
  process.exit(1);
}

async function test() {
  try {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'Who is Ojas Kulkarni?',
    });
    console.log('SUCCESS:', text);
  } catch (error) {
    console.error('ERROR:', error.message);
  }
}

test();
