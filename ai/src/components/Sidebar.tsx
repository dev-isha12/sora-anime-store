import aiSrc from './ai.svg'
import { useState, FormEvent } from 'react';
import '../index.css'

interface Props {
    apiKey: string;
    onApiKeySave: (key: string) => void;
    onGenerate: (prompt: string) => void;
    isLoading: boolean;
}

const EXAMPLE_PROMPTS = [
  'A dark pricing card with monthly/annual toggle',
  'A user profile card with avatar and social links',
  'A notification toast with progress bar',
  'A login form with email and password',
  'A testimonial card with star ratings',
  'A stats dashboard card with charts',
];

export default function Sidebar({
    apiKey,
    onApiKeySave,
    onGenerate,
    isLoading,
}: Props) {
    const [input, setInput] = useState('');
    const [keyValue, setKeyValue] = useState(apiKey || '');
    const [showKey, setShowKey] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onGenerate(input.trim());
    };

    return (
            <aside className="first">
                <img src={aiSrc} alt="" className='img' />
                <div className="line"></div>
                <div className="open">Gemini API Key</div>
                <div className='over'>
                    <div className="one">
                        <input
                            type={showKey ? "text" : "password"}
                            value={keyValue}
                            onChange={(e) => setKeyValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="show" onClick={() => setShowKey(!showKey)}>
                            {showKey ? "Hide" : "Show"}
                        </button>
                    </div>
                    <div>
                        <button className="save" onClick={() => {
                            localStorage.setItem('gemini_api_key', keyValue);
                            onApiKeySave(keyValue);
                        }}>Save</button>
                    </div>
                </div>
                <div className="li"></div>
                <form onSubmit={handleSubmit}>
                    <div className="ui">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe a UI component..."
                        />
                    </div>
                    <div className="generate">
                        <button type='submit' disabled={!input.trim() || isLoading}>
                            {isLoading ? "generating..." : "Generate Components"}
                        </button>
                    </div>
                </form>
                <div className="try">Try an example:</div>

               
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                    <div
                        key={index}
                        className="block-one"
                        onClick={() => setInput(prompt)} 
                        style={{ cursor: 'pointer' }}
                    >
                        {prompt}
                    </div>
                ))}

            </aside>
    );
}
