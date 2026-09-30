import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  FileVideo,
  Link2,
  Pause,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Upload,
  Volume2,
  VolumeX,
} from 'lucide-react';
import heroQh3xImg from '../assets/images/hero_qh3x_daily_1790801080218.jpg';
import thumbExpresso10minImg from '../assets/images/thumb_expresso_10min_1790801113838.jpg';
import thumbForcaArticularImg from '../assets/images/thumb_forca_articular_1790801103042.jpg';
import thumbBarrigaZeroImg from '../assets/images/thumb_barriga_zero_1790801092923.jpg';

export interface VideoChapter {
  id: string;
  title: string;
  shortLabel: string;
  startTime: number; // seconds
  endTime: number; // seconds
  timeFormatted: string;
  protocolSummary: string;
  transcript: string;
  exercisesList: string[];
  safetyCue: string;
  visualImg: string;
}

export const VIDEO_AULA_CHAPTERS: VideoChapter[] = [
  {
    id: 'cap_intro',
    title: '1. Como Estruturar o Método QH3X (30 Minutos)',
    shortLabel: '00:00 · Introdução QH3X',
    startTime: 0,
    endTime: 48,
    timeFormatted: '00:00 – 00:48',
    protocolSummary: '3 Blocos de 10 minutos: Q (Queima/Preparação) + H (Hipertrofia) + 3X (Aceleração)',
    transcript:
      'Você vai aprender exatamente como estruturar o QH3X: o treino de 30 minutos dividido em três blocos de 10 minutos — Queima, Hipertrofia e Aceleração. O objetivo não é treinar até a exaustão: é trabalhar com intensidade controlada, boa técnica e recuperação. O Bloco Q é de Queima e Preparação (10 min de movimento contínuo para elevar a temperatura corporal e preparar articulações e músculos). O Bloco H é de Hipertrofia (10 min de força com ênfase em glúteos, posteriores de cocha e core). E o Bloco 3X é de Aceleração (10 min de intervalos curtos para elevar a demanda cardiorrespiratória).',
    exercisesList: [
      'Bloco Q (10 min): Queima e Preparação articular e muscular',
      'Bloco H (10 min): Hipertrofia com foco em glúteos, posteriores e core',
      'Bloco 3X (10 min): Aceleração cardiorrespiratória em intervalos curtos',
    ],
    safetyCue:
      'O objetivo não é treinar até a exaustão, e sim trabalhar com intensidade controlada, boa técnica e recuperação.',
    visualImg: heroQh3xImg,
  },
  {
    id: 'cap_bloco_q',
    title: '2. Bloco Q — Queima e Preparação (10 min)',
    shortLabel: '00:48 · Bloco Q (40s/20s)',
    startTime: 48,
    endTime: 82,
    timeFormatted: '00:48 – 01:22',
    protocolSummary: '40 segundos de trabalho · 20 segundos de transição · Faça 2 voltas',
    transcript:
      'Vamos começar pelo Bloco Q: Queima e Preparação. O formato é simples: 40 segundos de trabalho e 20 segundos de transição. Faça duas voltas. Os exercícios de exemplo são: 1) Marcha rápida com balanço dos braços; 2) Agachamento com alcance acima da cabeça; 3) Step touch lateral; 4) Elevação alternada de joelhos; e 5) Hinge de quadril (que é o movimento de empurrar o quadril para trás). Mantenha o tronco estável, aterrissagem suave e respire de forma controlada. Se precisar, reduza a amplitude. O objetivo é chegar aquecida, não ofegante.',
    exercisesList: [
      '1. Marcha rápida com balanço dos braços (40s ativo / 20s transição)',
      '2. Agachamento com alcance acima da cabeça (40s ativo / 20s transição)',
      '3. Step touch lateral (40s ativo / 20s transição)',
      '4. Elevação alternada de joelhos (40s ativo / 20s transição)',
      '5. Hinge de quadril — empurrar o quadril para trás (40s ativo / 20s transição)',
    ],
    safetyCue:
      'Mantenha o tronco estável, aterrissagem suave e respire de forma controlada. O objetivo é chegar aquecida, não ofegante.',
    visualImg: thumbExpresso10minImg,
  },
  {
    id: 'cap_bloco_h',
    title: '3. Bloco H — Hipertrofia e Força (10 min)',
    shortLabel: '01:22 · Bloco H (Força)',
    startTime: 82,
    endTime: 122,
    timeFormatted: '01:22 – 02:02',
    protocolSummary: '2 a 4 exercícios · 2 a 3 séries de 8 a 15 repetições · 30 a 60s descanso · Esforço 6–8/10',
    transcript:
      'Agora o Bloco H: Hipertrofia e Força. Aqui o foco é tensão muscular controlada. Escolha de 2 a 4 exercícios. Faça de 2 a 3 séries de 8 a 15 repetições, com 30 a 60 segundos de descanso. Uma sequência boa para glúteos e core é: Hip thrust ou Ponte de glúteos (12 a 15 repetições), Terra romeno (8 a 12 repetições), Remada com elástico (10 a 15 repetições) e Dead bug (6 a 10 repetições por lado). Mantenha a técnica: se a forma começar a cair, pare a série. A intensidade ideal fica entre 6 e 8 numa escala de esforço de 1 a 10.',
    exercisesList: [
      '1. Hip thrust ou Ponte de glúteos — 12 a 15 repetições',
      '2. Terra romeno — 8 a 12 repetições',
      '3. Remada com elástico — 10 a 15 repetições',
      '4. Dead bug — 6 a 10 repetições por lado',
    ],
    safetyCue:
      'Se a forma começar a cair, pare a série. Intensidade ideal entre 6 e 8 na escala de 1 a 10.',
    visualImg: thumbForcaArticularImg,
  },
  {
    id: 'cap_bloco_3x',
    title: '4. Bloco 3X — Aceleração Cardiorrespiratória (10 min)',
    shortLabel: '02:02 · Bloco 3X (20s/40s)',
    startTime: 122,
    endTime: 149,
    timeFormatted: '02:02 – 02:29',
    protocolSummary: '20 segundos de esforço · 40 segundos de recuperação ativa · 8 a 10 rodadas',
    transcript:
      'Por fim, o Bloco 3X: Aceleração. O formato recomendado para a maioria é: 20 segundos de esforço e 40 segundos de recuperação ativa. Faça de 8 a 10 rodadas. Exemplos de movimentos: Step-up alternado, Agachamento com elevação de joelhos, Remada rápida com elástico, e Marcha inclinada ou Polichinelo sem salto. Use a versão sem impacto se tiver qualquer desconforto articular. O mais importante é a consistência ao longo das semanas.',
    exercisesList: [
      '1. Step-up alternado (20s esforço / 40s recuperação ativa)',
      '2. Agachamento com elevação de joelhos (20s esforço / 40s recuperação ativa)',
      '3. Remada rápida com elástico (20s esforço / 40s recuperação ativa)',
      '4. Marcha inclinada ou Polichinelo sem salto (20s esforço / 40s recuperação ativa)',
    ],
    safetyCue:
      'Use a versão sem impacto se tiver qualquer desconforto articular. O mais importante é a consistência ao longo das semanas.',
    visualImg: heroQh3xImg,
  },
  {
    id: 'cap_individualizacao',
    title: '5. Como Individualizar & Sinais de Alerta',
    shortLabel: '02:29 · Individualização',
    startTime: 149,
    endTime: 180,
    timeFormatted: '02:29 – 03:00',
    protocolSummary: 'Adaptação por nível (Iniciante vs. Intermediária/Avançada) e Segurança Clínica',
    transcript:
      'Como individualizar: se você é iniciante, comece com menor amplitude e menos rodadas. Se é intermediária ou avançada, aumente a carga, a velocidade ou reduza o descanso aos poucos. Pare imediatamente se sentir dor aguda, tontura, falta de ar desproporcional, abaulamento intenso na linha média ou perda urinária. O sucesso do método está em terminar o treino conseguindo se recuperar para o dia seguinte. Resumo rápido: 10 minutos de preparação, 10 minutos de força e 10 minutos de intervalos.',
    exercisesList: [
      'Iniciante: menor amplitude e menos rodadas',
      'Intermediária / Avançada: aumentar carga, velocidade ou reduzir descanso gradualmente',
      'Resumo QH3X: 10 min Preparação (Q) + 10 min Força (H) + 10 min Intervalos (3X)',
    ],
    safetyCue:
      'Pare imediatamente se sentir dor aguda, tontura, falta de ar desproporcional, abaulamento intenso na linha média ou perda urinária.',
    visualImg: thumbBarrigaZeroImg,
  },
];

interface VideoAulaQH3XProps {
  onStartVideoWorkout: () => void;
}

function normalizeEmbedUrl(rawUrl: string): { type: 'iframe' | 'video'; src: string } | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // YouTube watch or youtu.be link -> convert to embed
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    return { type: 'iframe', src: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0` };
  }

  // Vimeo link -> convert to player.vimeo.com
  const vimeoMatch = trimmed.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch && !trimmed.includes('player.vimeo.com')) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Google Drive file view link -> convert to preview
  const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return { type: 'iframe', src: `https://drive.google.com/file/d/${driveMatch[1]}/preview` };
  }

  // Direct video file (.mp4, .webm, .mov, blob:)
  if (
    trimmed.startsWith('blob:') ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed)
  ) {
    return { type: 'video', src: trimmed };
  }

  // Otherwise treat as iframe embed URL (Panda Video, Vturb, Loom, Wistia, etc.)
  return { type: 'iframe', src: trimmed };
}

export const VideoAulaQH3X: React.FC<VideoAulaQH3XProps> = ({ onStartVideoWorkout }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [customVideoUrl, setCustomVideoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('fit30_video_aula_url') || '';
    } catch {
      return '';
    }
  });
  const [urlInputDraft, setUrlInputDraft] = useState<string>(customVideoUrl);
  const [showEmbedConfig, setShowEmbedConfig] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const totalDuration = 180; // 03:00

  const currentChapter =
    VIDEO_AULA_CHAPTERS.find(
      (c) => currentTime >= c.startTime && currentTime < c.endTime
    ) || VIDEO_AULA_CHAPTERS[VIDEO_AULA_CHAPTERS.length - 1];

  // Timer for built-in interactive lesson player
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration - 1) {
          setIsPlaying(false);
          return totalDuration;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Optional speech synthesis when playing guided mode
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    if (!isPlaying || !voiceEnabled || customVideoUrl) {
      window.speechSynthesis.cancel();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentChapter.transcript);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05;
    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentChapter.id, isPlaying, voiceEnabled, customVideoUrl]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectChapter = (chapter: VideoChapter) => {
    setCurrentTime(chapter.startTime);
  };

  const handleSaveEmbedUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = urlInputDraft.trim();
    setCustomVideoUrl(cleaned);
    try {
      localStorage.setItem('fit30_video_aula_url', cleaned);
    } catch {
      // ignore storage error
    }
    setShowEmbedConfig(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setCustomVideoUrl(blobUrl);
    setUrlInputDraft(file.name);
    setShowEmbedConfig(false);
  };

  const parsedEmbed = normalizeEmbedUrl(customVideoUrl);

  return (
    <section
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
      aria-label="Vídeo-Aula Oficial do Método QH3X"
    >
      {/* Top Header Bar */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0F766E] flex items-center justify-center text-white shrink-0">
            <FileVideo className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-teal-300 font-semibold">
              Vídeo-Aula Oficial (03:00) · Como Estruturar o Treino QH3X
            </div>
            <h2 className="text-base sm:text-lg font-display font-semibold text-white">
              Queima (10m) + Hipertrofia (10m) + Aceleração 3X (10m)
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5 text-teal-400" />
            Selecionar Vídeo (.mp4)
          </button>

          <button
            type="button"
            onClick={() => setShowEmbedConfig(!showEmbedConfig)}
            className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Link2 className="w-3.5 h-3.5 text-teal-400" />
            {customVideoUrl ? 'Trocar Link de Embed' : 'Colar Link de Embed'}
          </button>
        </div>
      </div>

      {/* Optional Embed Link Configuration Drawer */}
      {showEmbedConfig && (
        <form
          onSubmit={handleSaveEmbedUrl}
          className="p-4 sm:px-6 bg-slate-100 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <div className="flex-1">
            <label htmlFor="video-embed-url-input" className="text-xs font-semibold text-slate-700 block mb-1">
              Cole o link da sua vídeo-aula (YouTube, Vimeo, Panda Video, Vturb, Google Drive ou .mp4 direto):
            </label>
            <input
              id="video-embed-url-input"
              type="text"
              value={urlInputDraft}
              onChange={(e) => setUrlInputDraft(e.target.value)}
              placeholder="Ex: https://www.youtube.com/watch?v=... ou selecione o arquivo .mp4 no botão acima"
              className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>
          <div className="flex items-center gap-2 sm:self-end">
            {customVideoUrl && (
              <button
                type="button"
                onClick={() => {
                  setCustomVideoUrl('');
                  setUrlInputDraft('');
                  try {
                    localStorage.removeItem('fit30_video_aula_url');
                  } catch {
                    // ignore
                  }
                  setShowEmbedConfig(false);
                }}
                className="min-h-[42px] px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Usar Player Guiado Padrão
              </button>
            )}
            <button
              type="submit"
              className="min-h-[42px] px-5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold whitespace-nowrap"
            >
              Incorporar Vídeo
            </button>
          </div>
        </form>
      )}

      {/* Main Content Grid: Video Player (Left 7 cols) + Interactive Chapters & Exercises (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Video Viewport */}
        <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between space-y-5">
          {parsedEmbed ? (
            <div className="space-y-3">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 shadow-inner">
                {parsedEmbed.type === 'video' ? (
                  <video
                    src={parsedEmbed.src}
                    controls
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  >
                    Seu navegador não suporta reprodução de vídeo nativa.
                  </video>
                ) : (
                  <iframe
                    src={parsedEmbed.src}
                    title="Vídeo-Aula Oficial Método QH3X"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Vídeo incorporado ativo · Duração da aula: 03:00</span>
                <button
                  type="button"
                  onClick={() => setShowEmbedConfig(true)}
                  className="text-[#0F766E] font-semibold hover:underline"
                >
                  Alterar fonte do vídeo
                </button>
              </div>
            </div>
          ) : (
            /* Built-in Interactive Guided Video Aula Player with Chapters & Closed Captions */
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
                <img
                  src={currentChapter.visualImg}
                  alt={currentChapter.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25 flex flex-col justify-between p-5 sm:p-6 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-teal-300">
                      {currentChapter.timeFormatted} · {currentChapter.shortLabel}
                    </span>
                    <span className="font-mono text-xs tabular-nums bg-black/60 px-2.5 py-1 rounded-md border border-white/15">
                      {formatSeconds(currentTime)} / 03:00
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-2xl font-display font-semibold text-white">
                      {currentChapter.title}
                    </h3>
                    <div className="text-xs text-teal-200 font-medium">
                      {currentChapter.protocolSummary}
                    </div>
                    {/* Synchronized Caption Box */}
                    <div className="p-3.5 rounded-xl bg-black/70 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed max-h-28 overflow-y-auto">
                      “{currentChapter.transcript}”
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrubber & Transport Controls */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-slate-600 tabular-nums">
                    {formatSeconds(currentTime)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={totalDuration}
                    value={currentTime}
                    onChange={(e) => setCurrentTime(Number(e.target.value))}
                    aria-label="Linha do tempo da vídeo-aula"
                    className="flex-1 accent-[#0F766E] cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <span className="font-mono text-xs text-slate-500 tabular-nums">03:00</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (currentTime >= totalDuration) setCurrentTime(0);
                        setIsPlaying(!isPlaying);
                      }}
                      className="min-h-[44px] px-5 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs flex items-center gap-2 transition-colors whitespace-nowrap"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Pausar Aula
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          Assistir Aula Guiada
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentTime(0);
                      }}
                      className="min-h-[44px] px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                      aria-label="Reiniciar vídeo-aula"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      voiceEnabled
                        ? 'border-[#0F766E] bg-[#0F766E]/10 text-[#0F766E]'
                        : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {voiceEnabled ? (
                      <>
                        <Volume2 className="w-4 h-4" />
                        Narração em Voz Ativa
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-4 h-4" />
                        Ativar Narração em Voz
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Chapter Exercise Breakdown */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0F766E]">
                Exercícios Demonstrados neste Trecho ({currentChapter.timeFormatted})
              </span>
              <span className="text-xs text-slate-500">Toque nos capítulos ao lado para avançar</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800">
              {currentChapter.exercisesList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-200/80 flex items-start gap-2 text-xs text-slate-600">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Orientação de Segurança da Aula:</strong> {currentChapter.safetyCue}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Chapters (00:00 to 03:00) + Launch Workout CTA */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-500">
                Capítulos da Vídeo-Aula (00:00 – 03:00)
              </div>
              <h3 className="text-lg font-display font-semibold text-slate-900 mt-0.5">
                Roteiro Completo: Q + H + 3X
              </h3>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {VIDEO_AULA_CHAPTERS.map((chap) => {
                const isSelected = currentChapter.id === chap.id;
                return (
                  <button
                    key={chap.id}
                    type="button"
                    onClick={() => handleSelectChapter(chap)}
                    className={`w-full text-left p-4 transition-colors flex items-start justify-between gap-3 min-h-[64px] ${
                      isSelected
                        ? 'bg-[#0F766E]/8 text-slate-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-semibold text-[#0F766E]">
                        {chap.timeFormatted}
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {chap.title}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {chap.protocolSummary}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-slate-400 shrink-0 mt-1">
                      ▶
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-600">
              Pronta para colocar a aula em prática? O treino completo com os <strong>13 movimentos oficiais do vídeo</strong> já está configurado no cronômetro:
            </div>
            <button
              type="button"
              onClick={onStartVideoWorkout}
              className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              Praticar Treino Oficial da Vídeo-Aula (30 min)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
