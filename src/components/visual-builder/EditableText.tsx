import React, { useRef, useEffect } from 'react';

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
  className?: string;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export default function EditableText({ text, onSave, className = '', tagName = 'span' }: EditableTextProps) {
  const elementRef = useRef<HTMLElement>(null);

  const handleBlur = () => {
    if (elementRef.current) {
      const newText = elementRef.current.innerText;
      if (newText !== text) {
        onSave(newText);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  // Sync internal text if external text changes (e.g. from a template load)
  useEffect(() => {
    if (elementRef.current && elementRef.current.innerText !== text) {
      elementRef.current.innerText = text;
    }
  }, [text]);

  return React.createElement(tagName, {
    ref: elementRef,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    className: `outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-primary rounded px-1 transition-all ${className} hover:bg-accent/5 cursor-text`,
    dangerouslySetInnerHTML: { __html: text } // Use innerHTML to handle initial state, but innerText for saving to avoid HTML injection unless needed
  });
}
