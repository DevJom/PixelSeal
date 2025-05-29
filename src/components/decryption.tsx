'use client';
import React, { useEffect, useState, useRef } from 'react';
import { TransitionPanel } from '@/components/transition-panel';
import useMeasure from 'react-use-measure';
import { encryptMultiLayer, encryptionLayers } from '@/lib/encryption';
import { useRouter } from 'next/navigation';

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      type='button'
      className='relative flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800'
    >
      {children}
    </button>
  );
}

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
      className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 resize-none overflow-hidden"
      placeholder={placeholder}
      rows={1}
    />
  );
}

function AutoExpandingDisplay({
  text,
  placeholder,
}: {
  text: string;
  placeholder?: string;
}) {
  const displayRef = useRef<HTMLDivElement>(null);

  const adjustHeight = () => {
    const display = displayRef.current;
    if (display) {
      display.style.height = 'auto';
      display.style.minHeight = '2.5rem'; // Minimum height for empty state
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text]);

  return (
    <div
      ref={displayRef}
      className="w-full p-2 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 min-h-[2.5rem] break-words"
    >
      {text || placeholder}
    </div>
  );
}

export function DecryptionPanel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();
  const [plainText, setPlainText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [activeLayers, setActiveLayers] = useState<string[]>([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(encryptedText);
  };

  const handleDecrypt = () => {
    if (encryptedText) {
      // Store the encrypted text in localStorage before navigation
      localStorage.setItem('encryptedText', encryptedText);
      router.push('/decrypt');
    }
  };

  const handleSetActiveIndex = (newIndex: number) => {
    if (newIndex === 1 && !plainText) return; // Prevent moving to next step without text
    
    if (newIndex === 1) {
      // Apply all encryption layers when moving to the encrypted text view
      const newEncryptedText = encryptMultiLayer(plainText, encryptionLayers.length);
      setEncryptedText(newEncryptedText);
      setActiveLayers(encryptionLayers.map(layer => layer.name));
    }
    
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex < 0) setActiveIndex(0);
    if (activeIndex >= FEATURES.length) setActiveIndex(FEATURES.length - 1);
  }, [activeIndex]);

  const FEATURES = [
    {
      title: 'Enter Text',
      description: (
        <div className="space-y-4">
          <AutoExpandingTextarea
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            placeholder="Enter text to encrypt..."
          />
        </div>
      ),
    },
    {
      title: 'Encrypted Text',
      description: (
        <div className="space-y-4">
          <AutoExpandingDisplay
            text={encryptedText}
            placeholder="No encrypted text yet"
          />
          {activeLayers.length > 0 && (
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Applied layers: {activeLayers.join(' → ')}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className='w-[364px] overflow-hidden rounded-xl border border-zinc-950/10 bg-white dark:bg-zinc-700'>
      <TransitionPanel
        activeIndex={activeIndex}
        variants={{
          enter: (direction) => ({
            x: direction > 0 ? 364 : -364,
            opacity: 0,
            height: bounds.height > 0 ? bounds.height : 'auto',
            position: 'initial',
          }),
          center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : 'auto',
          },
          exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 364 : -364,
            opacity: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          }),
        }}
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        custom={direction}
      >
        {FEATURES.map((feature, index) => (
          <div key={index} className='px-4 pt-4' ref={ref}>
            <h3 className='mb-0.5 font-medium text-zinc-800 dark:text-zinc-100'>
              {feature.title}
            </h3>
            <div className='text-zinc-600 dark:text-zinc-400'>
              {feature.description}
            </div>
          </div>
        ))}
      </TransitionPanel>
      <div className='flex justify-between p-4'>
        <div className="flex gap-2">
          {activeIndex > 0 && (
            <>
              <Button onClick={() => handleSetActiveIndex(activeIndex - 1)}>
                Previous
              </Button>
              <Button onClick={handleCopy}>
                Copy
              </Button>
            </>
          )}
        </div>
        <Button
          onClick={() =>
            activeIndex === FEATURES.length - 1
              ? handleDecrypt()
              : handleSetActiveIndex(activeIndex + 1)
          }
        >
          {activeIndex === FEATURES.length - 1 ? 'Decrypt' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
