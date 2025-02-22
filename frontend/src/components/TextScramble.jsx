import React, { useEffect, useRef, useState } from 'react';

const TextScramble = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const intervalRef = useRef(null);
  const frameRef = useRef(0);
  const queueRef = useRef([]);
  const originalTextRef = useRef(text);

  useEffect(() => {
    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < originalTextRef.current.length; i++) {
        const targetChar = originalTextRef.current[i];
        const currentChar = queueRef.current[i];

        if (currentChar === targetChar) {
          complete++;
          output += currentChar;
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
          queueRef.current[i] = targetChar;
        }
      }

      setDisplayText(output);

      if (complete === originalTextRef.current.length) {
        clearInterval(intervalRef.current);
      }
    };

    queueRef.current = new Array(text.length).fill('');
    intervalRef.current = setInterval(update, 50);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [text]);

  return <span>{displayText}</span>;
};

export default TextScramble;
