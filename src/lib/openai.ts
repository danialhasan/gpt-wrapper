import OpenAI from 'openai';

export class OpenAIWrapper {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async chat(prompt: string): Promise<string> {
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0]?.message?.content || '';
  }
}

export const createAI = (apiKey: string) => new OpenAIWrapper(apiKey);