'use client';
import React, { useEffect, useState, useRef } from 'react';
import { decryptMultiLayer, encryptionLayers } from '@/lib/encryption';

function AutoExpandingTextarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onInput={adjustHeight}
      className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 resize-none overflow-hidden min-h-[2.5rem]"
      placeholder={placeholder}
      rows={1}
    />
  );
}

function AutoExpandingDisplay({
  text,
  placeholder,
  isError,
}: {
  text: string;
  placeholder?: string;
  isError?: boolean;
}) {
  return (
    <div className={`w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 min-h-[2.5rem] break-words ${isError ? 'border-red-500 dark:border-red-500' : ''}`}>
      {text || placeholder}
    </div>
  );
}

function Button({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      type='button'
      disabled={disabled}
      className='relative flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed'
    >
      {children}
    </button>
  );
}

function isValidBase64(str: string) {
  try {
    // Check if the string is valid base64
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(str)) return false;
    
    // Try to decode it
    atob(str);
    return true;
  } catch {
    return false;
  }
}

export function DecryptionPanel() {
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Get the encrypted text from localStorage
    const storedText = localStorage.getItem('encryptedText');
    if (storedText) {
      setEncryptedText(storedText);
      try {
        // Automatically decrypt the text
        const decrypted = decryptMultiLayer(storedText, encryptionLayers.length);
        setDecryptedText(decrypted);
        setError('');
      } catch {
        setError('Invalid encrypted text format');
        setDecryptedText('');
      }
    }
  }, []);

  const handleDecrypt = () => {
    if (!encryptedText) {
      setError('Please enter encrypted text');
      return;
    }

    if (!isValidBase64(encryptedText)) {
      setError('Invalid encrypted text format');
      setDecryptedText('');
      return;
    }

    try {
      const decrypted = decryptMultiLayer(encryptedText, encryptionLayers.length);
      setDecryptedText(decrypted);
      setError('');
    } catch {
      setError('Failed to decrypt text');
      setDecryptedText('');
    }
  };

  return (
    <div className='w-[364px] overflow-hidden rounded-xl border border-zinc-950/10 bg-white dark:bg-zinc-700'>
      <div className='px-4 pt-4'>
        <h3 className='mb-0.5 font-medium text-zinc-800 dark:text-zinc-100'>
          Decryption Results
        </h3>
        <div className='text-zinc-600 dark:text-zinc-400 space-y-4'>
          <div>
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Encrypted Text</h4>
            <AutoExpandingTextarea
              value={encryptedText}
              onChange={(e) => {
                setEncryptedText(e.target.value);
                setError('');
              }}
              placeholder="Enter encrypted text..."
            />
          </div>

          <div>
            <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Decrypted Text</h4>
            <AutoExpandingDisplay
              text={decryptedText}
              placeholder="No decrypted text yet"
              isError={!!error}
            />
            {error && (
              <div className="text-sm text-red-500 mt-1">
                {error}
              </div>
            )}
          </div>

          {encryptedText && !error && (
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Applied layers: {encryptionLayers.map(layer => layer.name).reverse().join(' → ')}
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-end p-4'>
        <Button 
          onClick={handleDecrypt}
          disabled={!encryptedText}
        >
          Decrypt
        </Button>
      </div>
    </div>
  );
} 