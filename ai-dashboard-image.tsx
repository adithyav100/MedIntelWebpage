import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Activity } from 'lucide-react';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const AIDashboardImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(localStorage.getItem('ai_dashboard_img'));
  const [loading, setLoading] = useState(!localStorage.getItem('ai_dashboard_img'));

  useEffect(() => {
    if (imageUrl) return;

    const generateImage = async () => {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A futuristic, ultra-modern medical intelligence dashboard interface on a dark background, glowing cyan and green data visualizations, glassmorphism UI, high tech, cinematic lighting, highly detailed, professional UI/UX design.',
              },
            ],
          },
        });
        
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const url = `data:image/png;base64,${base64EncodeString}`;
            setImageUrl(url);
            localStorage.setItem('ai_dashboard_img', url);
            setLoading(false);
            break;
          }
        }
      } catch (error) {
        console.error('Failed to generate image:', error);
        // Fallback to a high-quality stock image if generation fails
        setImageUrl('https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?q=80&w=2000&auto=format&fit=crop');
        setLoading(false);
      }
    };

    generateImage();
  }, [imageUrl]);

  if (loading) {
    return (
      <div className="mx-auto rounded-2xl h-full w-full min-h-[400px] bg-[#0a1526] flex flex-col items-center justify-center border border-white/10">
        <Activity className="w-10 h-10 text-cyan-400 animate-pulse mb-4" />
        <p className="text-cyan-400 font-medium">Generating AI Dashboard Interface...</p>
        <p className="text-gray-500 text-sm mt-2">Powered by Gemini 2.5 Flash Image</p>
      </div>
    );
  }

  return (
    <img
      src={imageUrl || ''}
      alt="AI Generated Medical Dashboard"
      className="mx-auto rounded-2xl object-cover h-full w-full object-center"
      draggable={false}
    />
  );
};
