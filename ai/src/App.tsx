import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import { cleanGeneratedCode } from './components/clean';
import type { GenerationState } from './types';

const jsxToPreviewHtml = (code: string) =>
  code
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\bclassName=/g, 'class=')
    .replace(/\bhtmlFor=/g, 'for=')
    .replace(/\s(?:on[A-Z]\w*|key)=\{[^}]*\}/g, '')
    .replace(/\s(?:on[A-Z]\w*|key)="[^"]*"/g, '');

const buildPreviewDocument = (code: string) => {
  const html = jsxToPreviewHtml(code);

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      html, body {
        margin: 0;
        min-height: 100%;
        background: #11151f;
        color: white;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      body {
        display: grid;
        place-items: center;
        padding: 32px;
      }
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`;
};

const getGeminiFailureMessage = (data: any, fallback: string) => {
  if (data?.error?.message) {
    return data.error.message;
  }

  if (data?.promptFeedback?.blockReason) {
    return `Gemini blocked the prompt: ${data.promptFeedback.blockReason}`;
  }

  const finishReason = data?.candidates?.[0]?.finishReason;
  if (finishReason) {
    return `Gemini finished without text. Reason: ${finishReason}`;
  }

  return fallback;
};

const GeneratedOutput = ({
  code,
  view,
  onViewChange,
}: {
  code: string;
  view: 'preview' | 'code';
  onViewChange: (view: 'preview' | 'code') => void;
}) => (
  <div className="flex h-full min-h-0 flex-col">
    <div className="border-b border-gray-800 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-200">Generated component</p>
      </div>

      <div className="grid grid-cols-2 rounded-lg bg-gray-950 p-1">
        <button
          type="button"
          onClick={() => onViewChange('preview')}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            view === 'preview'
              ? 'bg-violet-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => onViewChange('code')}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            view === 'code'
              ? 'bg-violet-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Code
        </button>
      </div>
    </div>

    <div className="min-h-0 flex-1 overflow-hidden">
      {view === 'preview' ? (
        <iframe
          title="Generated component preview"
          className="h-full w-full bg-gray-950"
          sandbox="allow-scripts"
          srcDoc={buildPreviewDocument(code)}
        />
      ) : (
        <pre className="h-full overflow-auto bg-gray-950 p-4 text-sm leading-6 text-green-400">
          <code>{code}</code>
        </pre>
      )}
    </div>
  </div>
);

export const App = () => {
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem('gemini_api_key') ?? ''
  );

  const [generationState, setGenerationState] =
    useState<GenerationState>({ status: 'idle' });
  const [outputView, setOutputView] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);


  const handleGenerate = useCallback(
    async (prompt: string) => {
      // console.log("BUTTON CLICKED");
      if (!apiKey) {
        setGenerationState({
          status: 'error',
          message: 'Please enter your API key',
        });
        return;
      }

      setGenerationState({ status: 'loading' });

      // console.log(apiKey);


      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `
You are a React UI generator.

Return ONLY valid JSX.
No explanations.
No markdown.
No code fences.
No imports.

The output MUST start with <div> and end with </div>.

Use Tailwind CSS.

Component:
${prompt}
                      `,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        console.log("FULL GEMINI RESPONSE:", data);

        if (!response.ok) {
          setGenerationState({
            status: 'error',
            message: getGeminiFailureMessage(
              data,
              `Gemini request failed with status ${response.status}.`
            ),
          });
          return;
        }

        const raw =
          data?.candidates
            ?.flatMap((c: any) => c.content?.parts || [])
            ?.map((p: any) => p.text || '')
            ?.join('\n') || '';

        if (!raw) {
          console.log("Empty response from Gemini:", data);
          setGenerationState({
            status: 'error',
            message: getGeminiFailureMessage(
              data,
              'Gemini returned no code text. Try a more specific component prompt.'
            ),
          });
          return;
        }

        const code = cleanGeneratedCode(raw);

        if (!code) {
          setGenerationState({
            status: 'error',
            message: 'Failed to clean generated code.',
          });
          return;
        }

        setOutputView('preview');
        setGenerationState({ status: 'success', code, prompt });

      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Generation failed';

        setGenerationState({ status: 'error', message });
      }
    },
    [apiKey]
  );

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
     
      <Sidebar
        onGenerate={handleGenerate}
        isLoading={generationState.status === 'loading'}
        apiKey={apiKey}
        onApiKeySave={setApiKey}
      />


      <main className="flex-1 flex items-center justify-center bg-gray-950 p-8 overflow-auto">
        {generationState.status === 'idle' && (
          <p className="text-gray-500">
            Describe a component to generate code
          </p>
        )}

        {generationState.status === 'loading' && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Generating...</p>
          </div>
        )}

        {generationState.status === 'error' && (
          <p className="text-red-400">
            {generationState.message}
          </p>
        )}

        {generationState.status === 'success' && (
          <div className="max-w-xl text-center">
            <p className="text-lg font-medium text-gray-200">
              Component generated
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Use the Preview and Code buttons in the right panel.
            </p>
          </div>
        )}
      </main>

      <aside className="w-[430px] bg-gray-900 border-l border-gray-800">
        {generationState.status === 'success' ? (
          <GeneratedOutput
            code={generationState.code}
            view={outputView}
            onViewChange={setOutputView}
          />
        ) : (
          <div className="h-full" />
        )}
      </aside>
      
    </div>
  );
};
