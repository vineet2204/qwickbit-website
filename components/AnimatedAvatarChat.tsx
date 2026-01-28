'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  timestamp: number;
}

const AnimatedAvatar404: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const isMutedRef = useRef(true);
  const speechQueue = useRef<string[]>([]);
  const isSpeaking = useRef(false);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const chatMessages = [
    "Hi! Welcome to Qwickbit Technologies",
    "We build smart AI-powered solutions",
    "Custom software, web & app development",
    "AI automation to scale your business",
    "From idea to deployment—end to end",
    "Data-driven. Scalable. Secure.",
    "Need an AI or tech solution?",
    "Let's transform your business with AI",
    "Innovation starts here at Qwickbit",
    "How can we help you today?"
  ];

  // Get professional male voice
  const getProfessionalMaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    
    if (!voices || voices.length === 0) {
      console.log("No voices available");
      return null;
    }

    // Filter for English male voices
    const maleVoices = voices.filter(voice => 
      voice.lang.startsWith('en-US') || voice.lang.startsWith('en_US') || voice.lang.startsWith('en-GB') || voice.lang.startsWith('en-')
    ).filter(voice => 
      voice.name.toLowerCase().includes('male') ||
      voice.name.toLowerCase().includes('david') ||
      voice.name.toLowerCase().includes('mark') ||
      voice.name.toLowerCase().includes('daniel') ||
      voice.name.toLowerCase().includes('james') ||
      voice.name.toLowerCase().includes('google uk english male') ||
      voice.name.toLowerCase().includes('microsoft david') ||
      voice.name.toLowerCase().includes('alex') ||
      !voice.name.toLowerCase().includes('female')
    );

    // Preferred professional male voices
    const preferredVoices = [
      'Microsoft David Desktop',
      'Microsoft David',
      'Google UK English Male',
      'Google US English Male',
      'Alex',
      'Daniel',
      'James',
      'David',
      'Mark'
    ];

    // Try to find preferred voices first
    for (const preferredName of preferredVoices) {
      const found = maleVoices.find(v => 
        v.name.toLowerCase().includes(preferredName.toLowerCase())
      );
      if (found) {
        console.log("Selected voice:", found.name);
        return found;
      }
    }

    // If no preferred voice found, use first male voice
    if (maleVoices.length > 0) {
      console.log("Selected voice:", maleVoices[0].name);
      return maleVoices[0];
    }

    // Fallback to any English voice
    const enUSVoice = voices.find(v => 
      v.lang.startsWith('en-US') || v.lang.startsWith('en_US')
    );
    if (enUSVoice) {
      console.log("Selected fallback voice:", enUSVoice.name);
      return enUSVoice;
    }
    
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    console.log("Selected default voice:", englishVoice?.name || voices[0].name);
    return englishVoice || voices[0];
  };

  // Load voices
  useEffect(() => {
    if (!window.speechSynthesis) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoiceEnabled(true);
        console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  // Stop all speech
  const stopAllSpeech = () => {
    speechQueue.current = [];
    window.speechSynthesis.cancel();
    isSpeaking.current = false;
    currentUtterance.current = null;
  };

  // Handle scroll to stop speech
  useEffect(() => {
    const handleScroll = () => {
      if (isSpeaking.current || window.speechSynthesis.speaking) {
        stopAllSpeech();
      }
    };

    const scrollContainer = document.querySelector('[data-scroll-container]');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Detect popup/modal openings
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasDialog = document.querySelector('dialog[open]');
      const hasModal = document.querySelector('[role="dialog"]');
      const hasPopup = document.querySelector('[role="alertdialog"]');
      
      if (hasDialog || hasModal || hasPopup) {
        if (isSpeaking.current || window.speechSynthesis.speaking) {
          stopAllSpeech();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  // Process speech queue
  const processQueue = () => {
    if (isSpeaking.current || speechQueue.current.length === 0 || !voiceEnabled || isMutedRef.current) {
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    isSpeaking.current = true;
    const text = speechQueue.current.shift()!;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Professional male voice settings
      utterance.rate = 0.95;  // Slightly slower for professional tone
      utterance.pitch = 0.85; // Lower pitch for male voice
      utterance.volume = 1;

      const maleVoice = getProfessionalMaleVoice();
      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      currentUtterance.current = utterance;

      utterance.onstart = () => {
        if (isMutedRef.current) {
          window.speechSynthesis.cancel();
          return;
        }
      };

      utterance.onend = () => {
        isSpeaking.current = false;
        currentUtterance.current = null;
        if (!isMutedRef.current) {
          setTimeout(processQueue, 100);
        }
      };

      utterance.onerror = (event) => {
        if (event.error && event.error !== 'canceled') {
          console.log("Speech error:", event.error);
        }
        isSpeaking.current = false;
        currentUtterance.current = null;
        if (!isMutedRef.current) {
          setTimeout(processQueue, 50);
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log("Failed to create utterance:", error);
      isSpeaking.current = false;
      if (!isMutedRef.current) {
        setTimeout(processQueue, 50);
      }
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || isMutedRef.current) return;
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    speechQueue.current.push(text);
    processQueue();
  };

  // Handle mute button click
  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    isMutedRef.current = newMutedState;
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      stopAllSpeech();
    } else {
      processQueue();
    }
  };

  // Start chat sequence
  useEffect(() => {
    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const showNextMessage = () => {
      const msg = chatMessages[index];
      setCurrentMessage("");

      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex < msg.length) {
          setCurrentMessage(msg.substring(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);

          speakText(msg);

          timeoutId = setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { text: msg, timestamp: Date.now() }
            ]);

            setCurrentMessage("");
            index++;

            if (index >= chatMessages.length) index = 0;
            timeoutId = setTimeout(showNextMessage, 2000);
          }, 1500);
        }
      }, 50);
    };

    timeoutId = setTimeout(showNextMessage, 1000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      stopAllSpeech();
    };
  }, []);

  return (
    <div 
      ref={scrollContainerRef}
      className="flex items-center justify-center min-h-screen overflow-hidden  p-8"
    >
      <style jsx>{`
        .container404 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .error404page {
          width: 400px;
          height: 500px;
          position: relative;
          transform: scale(0.6);
          margin-bottom:200px;
        }

        .body404,
        .head404,
        .eyes404,
        .leftarm404,
        .rightarm404,
        .chair404,
        .leftshoe404,
        .rightshoe404,
        .legs404,
        .laptop404 {
          background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/15979/404-character-new.png) 0 0 no-repeat;
          width: 200px;
          height: 200px;
        }

        .newcharacter404,
        .torso404,
        .body404,
        .head404,
        .eyes404,
        .leftarm404,
        .rightarm404,
        .chair404,
        .leftshoe404,
        .rightshoe404,
        .legs404,
        .laptop404 {
          background-size: 750px;
          position: absolute;
          display: block;
        }

        .newcharacter404 {
          width: 400px;
          height: 800px;
          left: 50%;
          top: 20px;
          margin-left: -200px;
        }

        .torso404 {
          position: absolute;
          display: block;
          top: 138px;
          left: 0px;
          width: 389px;
          height: 252px;
          animation: sway 20s ease infinite;
          transform-origin: 50% 100%;
        }

        .body404 {
          position: absolute;
          display: block;
          top: 0px;
          left: 0px;
          width: 389px;
          height: 253px;
        }

        .head404 {
          position: absolute;
          top: -148px;
          left: 106px;
          width: 160px;
          height: 194px;
          background-position: 0px -265px;
          transform-origin: 50% 85%;
          animation: headTilt 20s ease infinite;
        }

        .eyes404 {
          position: absolute;
          top: 92px;
          left: 34px;
          width: 73px;
          height: 18px;
          background-position: -162px -350px;
          animation: blink404 10s steps(1) infinite, pan 10s ease-in-out infinite;
        }

        .leftarm404 {
          position: absolute;
          top: 159px;
          left: 0;
          width: 165px;
          height: 73px;
          background-position: -265px -341px;
          transform-origin: 9% 35%;
          transform: rotateZ(0deg);
          animation: typeLeft 0.4s linear infinite;
        }

        .rightarm404 {
          position: absolute;
          top: 148px;
          left: 231px;
          width: 157px;
          height: 91px;
          background-position: -442px -323px;
          transform-origin: 90% 25%;
          animation: typeRight 0.4s linear infinite;
        }

        .chair404 {
          position: absolute;
          top: 430px;
          left: 55px;
          width: 260px;
          height: 365px;
          background-position: -12px -697px;
        }

        .legs404 {
          position: absolute;
          top: 378px;
          left: 4px;
          width: 370px;
          height: 247px;
          background-position: -381px -443px;
        }

        .leftshoe404 {
          position: absolute;
          top: 591px;
          left: 54px;
          width: 130px;
          height: 92px;
          background-position: -315px -749px;
        }

        .rightshoe404 {
          position: absolute;
          top: 594px;
          left: 187px;
          width: 135px;
          height: 81px;
          background-position: -453px -749px;
          transform-origin: 35% 12%;
          animation: tapRight 1s linear infinite;
        }

        .laptop404 {
          position: absolute;
          top: 186px;
          left: 9px;
          width: 365px;
          height: 216px;
          background-position: -2px -466px;
          transform-origin: 50% 100%;
          animation: tapWobble 0.4s linear infinite;
        }

        @keyframes sway {
          0% { transform: rotateZ(0deg); }
          20% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(4deg); }
          45% { transform: rotateZ(4deg); }
          50% { transform: rotateZ(0deg); }
          70% { transform: rotateZ(0deg); }
          75% { transform: rotateZ(-4deg); }
          90% { transform: rotateZ(-4deg); }
          100% { transform: rotateZ(0deg); }
        }

        @keyframes headTilt {
          0% { transform: rotateZ(0deg); }
          20% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(-4deg); }
          35% { transform: rotateZ(-4deg); }
          38% { transform: rotateZ(2deg); }
          42% { transform: rotateZ(2deg); }
          45% { transform: rotateZ(-4deg); }
          50% { transform: rotateZ(0deg); }
          70% { transform: rotateZ(0deg); }
          82% { transform: rotateZ(0deg); }
          85% { transform: rotateZ(4deg); }
          90% { transform: rotateZ(4deg); }
          100% { transform: rotateZ(0deg); }
        }

        @keyframes typeLeft {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(7deg); }
          75% { transform: rotateZ(-6deg); }
          100% { transform: rotateZ(0deg); }
        }

        @keyframes typeRight {
          0% { transform: rotateZ(0deg); }
          25% { transform: rotateZ(-6deg); }
          75% { transform: rotateZ(7deg); }
          100% { transform: rotateZ(0deg); }
        }

        @keyframes tapWobble {
          0% { transform: rotateZ(-0.2deg); }
          50% { transform: rotateZ(0.2deg); }
          100% { transform: rotateZ(-0.2deg); }
        }

        @keyframes tapRight {
          0% { transform: rotateZ(0deg); }
          90% { transform: rotateZ(-6deg); }
          100% { transform: rotateZ(0deg); }
        }

        @keyframes blink404 {
          0% { background-position: -162px -350px; }
          94% { background-position: -162px -350px; }
          98% { background-position: -162px -368px; }
          100% { background-position: -162px -350px; }
        }

        @keyframes pan {
          0% { transform: translateX(-2px); }
          49% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          99% { transform: translateX(2px); }
          100% { transform: translateX(-2px); }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="relative flex flex-col items-center gap-8">
        {/* Mute/Unmute Button */}
        <button
          onClick={handleMuteToggle}
          className={`fixed top-16 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-200 ${
            isMuted 
              ? 'bg-gray-500 hover:bg-gray-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
          title={isMuted ? 'Click to start speech' : 'Click to stop speech'}
          aria-label={isMuted ? 'Click to start speech' : 'Click to stop speech'}
        >
          {isMuted ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        {/* Current Message Display */}
        <div className="absolute  left-1/2 transform -translate-x-1/2 w-96 max-w-[90vw] z-10">  
          {currentMessage && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl px-6 py-4 border-2 border-blue-300">
              <p className="text-white text-lg font-medium">
                {currentMessage}
                <span className="inline-block w-1 h-5 bg-white ml-1 animate-pulse"></span>
              </p>
            </div>
          )}
        </div>

        {/* 404 Character Avatar */}
        <div className="container404">
          <div className="error404page">
            <div className="newcharacter404">
              <div className="chair404"></div>
              <div className="leftshoe404"></div>
              <div className="rightshoe404"></div>
              <div className="legs404"></div>
              <div className="torso404">
                <div className="body404"></div>
                <div className="leftarm404"></div>
                <div className="rightarm404"></div>
                <div className="head404">
                  <div className="eyes404"></div>
                </div>
              </div>
              <div className="laptop404"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedAvatar404;