# OpenRouter Free Models

OpenRouter provides access to several free models. Here are some good options:

## Recommended Free Models

1. **Google Gemini 2.0 Flash (Experimental)** - Best overall free option

   - Model: `google/gemini-2.0-flash-exp:free`
   - Fast, capable, good for reasoning tasks

2. **Google Gemini Flash 1.5**

   - Model: `google/gemini-flash-1.5:free`
   - Reliable, good balance of speed and quality

3. **Meta Llama 3.2 90B Vision**

   - Model: `meta-llama/llama-3.2-90b-vision-instruct:free`
   - Good for creative writing

4. **Mistral 7B**
   - Model: `mistralai/mistral-7b-instruct:free`
   - Fast, good for simple tasks

## How to Use

1. Sign up at https://openrouter.ai/ (free account)
2. Get your API key from https://openrouter.ai/keys
3. Edit `backend\.env`:
   ```
   OPENROUTER_API_KEY=your_key_here
   LLM_PROVIDER=openrouter
   MODEL_NAME=google/gemini-2.0-flash-exp:free
   ```

## Switching Models

To try different models, just change the `MODEL_NAME` in your `.env` file:

```
MODEL_NAME=google/gemini-flash-1.5:free
```

Or use OpenAI/Anthropic by changing:

```
LLM_PROVIDER=openai
MODEL_NAME=gpt-4o-mini
OPENAI_API_KEY=your_key
```

See all available models at: https://openrouter.ai/models?order=newest&supported_parameters=tools
