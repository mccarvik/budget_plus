import { useState, useRef, useEffect } from 'react';
import './AudioRecorder.css';

const AudioRecorder = ({ onTranscriptUpdate }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = async (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(prev => {
          const updated = prev + finalTranscript;
          return updated;
        });

        // Send to LLM for processing when we have final results
        if (finalTranscript) {
          setIsProcessing(true);
          await processWithLLM(finalTranscript);
          setIsProcessing(false);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          // Ignore no-speech errors, just continue
          return;
        }
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        if (isRecording) {
          // Restart if we're still supposed to be recording
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const processWithLLM = async (text) => {
    try {
      const response = await fetch('http://localhost:8000/api/budgets/process-audio/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript: text }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.fields) {
          onTranscriptUpdate(data.fields);
        }
      }
    } catch (error) {
      console.error('Error processing with LLM:', error);
    }
  };

  const startRecording = async () => {
    try {
      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsRecording(true);
        setTranscript('');
      }

      // Initialize audio visualization
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      visualize();
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Please allow microphone access to use this feature.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsRecording(false);
  };

  const visualize = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Calculate average volume
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;
      
      // Update CSS variable for visualization
      const visualizer = document.querySelector('.audio-visualizer');
      if (visualizer) {
        const scale = 1 + (average / 128) * 0.5;
        visualizer.style.transform = `scale(${scale})`;
      }
    };

    draw();
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="audio-recorder">
      <button
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={handleToggleRecording}
      >
        <div className="audio-visualizer">
          <div className="mic-icon">
            {isRecording ? (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="currentColor"/>
                <path d="M17 11C17 14.31 14.31 17 11 17C7.69 17 5 14.31 5 11H3C3 15.42 6.58 19 11 19V23H13V19C17.42 19 21 15.42 21 11H19C19 14.31 16.31 17 13 17C9.69 17 7 14.31 7 11H17Z" fill="currentColor"/>
              </svg>
            )}
          </div>
        </div>
        <span className="record-text">
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </span>
      </button>
      
      {isProcessing && (
        <div className="processing-indicator">
          <div className="spinner"></div>
          <span>Processing with AI...</span>
        </div>
      )}
      
      {transcript && (
        <div className="transcript-display">
          <div className="transcript-header">Live Transcript:</div>
          <div className="transcript-text">{transcript}</div>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
