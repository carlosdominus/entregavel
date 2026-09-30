import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ExecutionMode,
  JointSensitivity,
  LifeStage,
  TimeWindow,
  UserProfile,
} from '../types/fit30';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onCompleteOnboarding: (updated: Partial<UserProfile>, completedFirstWorkout: boolean) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onCompleteOnboarding,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [lifeStage, setLifeStage] = useState<LifeStage>(userProfile.lifeStage);
  const [sensitivities, setSensitivities] = useState<JointSensitivity[]>(
    userProfile.jointSensitivities
  );
  const [preferredDuration, setPreferredDuration] = useState<TimeWindow>(
    userProfile.preferredDuration
  );
  const [firstWinMode, setFirstWinMode] = useState<ExecutionMode>('low_impact');
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setStep(5);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  if (!isOpen) return null;

  const toggleSensitivity = (item: JointSensitivity) => {
    if (item === 'nenhuma') {
      setSensitivities(['nenhuma']);
      return;
    }
    const filtered = sensitivities.filter((s) => s !== 'nenhuma');
    if (filtered.includes(item)) {
      const next = filtered.filter((s) => s !== item);
      setSensitivities(next.length > 0 ? next : ['nenhuma']);
    } else {
      setSensitivities([...filtered, item]);
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const recommendedMode: ExecutionMode = sensitivities.includes('joelhos') || sensitivities.includes('lombar')
    ? 'regression'
    : sensitivities.includes('nenhuma')
    ? 'standard'
    : 'low_impact';

  const handleFinishAll = (completedQuickSession: boolean) => {
    onCompleteOnboarding(
      {
        lifeStage,
        jointSensitivities: sensitivities,
        preferredDuration,
        defaultExecutionMode: recommendedMode,
        onboardingCompleted: true,
        firstWinCompleted: completedQuickSession,
      },
      completedQuickSession
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="text-xs font-medium text-slate-600">
            Onboarding Fit em 30 · Passo {step} de 5 · Tempo estimado: 3 a 5 min
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-lg transition-colors"
            aria-label="Fechar configuração inicial"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100">
          <div
            className="h-full bg-[#0F766E] transition-transform duration-200 origin-left"
            style={{ transform: `scaleX(${step / 5})` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#0F766E]">
                  Pergunta 1 de 3 · Individualização Real
                </p>
                <h2
                  id="onboarding-title"
                  className="text-2xl font-display font-semibold text-slate-900 mt-1"
                >
                  Qual momento melhor descreve sua fase atual?
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Ajustamos o ritmo dos blocos Q, H e 3X para respeitar sua recuperação e energia diária.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    id: 'rotina_intensa' as LifeStage,
                    title: 'Rotina intensa de trabalho e casa (30–55 anos)',
                    desc: 'Quero ganhar força, postura e disposição sem perder horas na academia.',
                  },
                  {
                    id: 'climatério_menopausa' as LifeStage,
                    title: 'Climatério ou Menopausa (38–55+ anos)',
                    desc: 'Foco em preservar massa muscular, saúde óssea, sono e reduzir dores articulares.',
                  },
                  {
                    id: 'pos_parto' as LifeStage,
                    title: 'Pós-parto ou Reeducação Abdominal',
                    desc: 'Foco em estabilidade pélvica, respiração costal e protocolo Barriga Zero seguro.',
                  },
                  {
                    id: 'retomada_gradual' as LifeStage,
                    title: 'Retomando após meses parada',
                    desc: 'Quero começar pelo básico seguro, sem impacto e sem dores no dia seguinte.',
                  },
                ].map((opt) => {
                  const active = lifeStage === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLifeStage(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-colors min-h-[64px] flex items-start justify-between gap-4 ${
                        active
                          ? 'border-[#0F766E] bg-[#0F766E]/5 text-slate-900'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-base text-slate-900">{opt.title}</div>
                        <div className="text-sm text-slate-600 mt-0.5">{opt.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                          active ? 'border-[#0F766E] bg-[#0F766E] text-white' : 'border-slate-300'
                        }`}
                      >
                        {active && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  Continuar para Cuidado Articular
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#0F766E]">
                  Pergunta 2 de 3 · Mapa de Segurança Articular
                </p>
                <h2 className="text-2xl font-display font-semibold text-slate-900 mt-1">
                  Alguma região pede atenção ou adaptação hoje?
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Você pode marcar mais de uma opção. O player já deixará a regressão ou baixo impacto pré-selecionada para você.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'joelhos' as JointSensitivity,
                    title: 'Joelhos sensíveis',
                    sub: 'Ativa opção na cadeira e sem saltos',
                  },
                  {
                    id: 'lombar' as JointSensitivity,
                    title: 'Coluna lombar',
                    sub: 'Prioriza apoio e estabilidade de core',
                  },
                  {
                    id: 'ombros_cervical' as JointSensitivity,
                    title: 'Ombros ou Cervical',
                    sub: 'Reduz sobrecarga acima da cabeça',
                  },
                  {
                    id: 'assoalho_pelvico' as JointSensitivity,
                    title: 'Controle Abdominal / Pélvico',
                    sub: 'Ajusta pressão intra-abdominal',
                  },
                  {
                    id: 'nenhuma' as JointSensitivity,
                    title: 'Nenhuma sensibilidade hoje',
                    sub: 'Execução padrão com progressão gradual',
                  },
                ].map((item) => {
                  const selected = sensitivities.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleSensitivity(item.id)}
                      className={`p-4 rounded-xl border text-left transition-colors min-h-[64px] ${
                        selected
                          ? 'border-[#0F766E] bg-[#0F766E]/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-slate-900">{item.title}</span>
                        <span className="text-xs font-medium text-[#0F766E]">
                          {selected ? 'Selecionado' : 'Selecionar'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{item.sub}</p>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="min-h-[48px] px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFirstWinMode(recommendedMode);
                    setStep(3);
                  }}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  Continuar para Seu Tempo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#0F766E]">
                  Pergunta 3 de 3 · Constância Possível
                </p>
                <h2 className="text-2xl font-display font-semibold text-slate-900 mt-1">
                  Qual formato cabe melhor na sua rotina da semana?
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Você pode mudar a duração todos os dias na tela inicial conforme sua agenda.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  {
                    mins: 30 as TimeWindow,
                    title: '30 minutos — Método QH3X Completo (Q + H + 3X)',
                    desc: '10 min Mobilidade + 10 min Força + 10 min Intervalos sem impacto.',
                  },
                  {
                    mins: 10 as TimeWindow,
                    title: '10 minutos — Versão Dia Corrido',
                    desc: 'Sessão condensada para manter o ritmo em dias de trabalho intenso.',
                  },
                  {
                    mins: 5 as TimeWindow,
                    title: '5 minutos — Pausa Destravar & Respiração',
                    desc: 'O mínimo viável para aliviar tensão nas costas e manter o hábito vivo.',
                  },
                ].map((t) => {
                  const active = preferredDuration === t.mins;
                  return (
                    <button
                      key={t.mins}
                      type="button"
                      onClick={() => setPreferredDuration(t.mins)}
                      className={`p-4 rounded-xl border text-left transition-colors min-h-[64px] flex items-center justify-between ${
                        active
                          ? 'border-[#0F766E] bg-[#0F766E]/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-semibold text-base text-slate-900">{t.title}</div>
                        <div className="text-sm text-slate-600 mt-0.5">{t.desc}</div>
                      </div>
                      <span className="font-mono text-sm font-semibold text-[#0F766E] shrink-0 ml-4">
                        {t.mins} min
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">Sua recomendação está pronta:</strong> Configuramos o modo{' '}
                  <span className="font-semibold text-[#0F766E]">
                    {recommendedMode === 'regression'
                      ? 'Regressão Articular Protegida'
                      : recommendedMode === 'low_impact'
                      ? 'Baixo Impacto (Sem Saltos)'
                      : 'Padrão Progressivo'}
                  </span>{' '}
                  como padrão. Agora vamos conquistar seu <strong>1º sucesso em 1 minuto prático</strong>!
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="min-h-[48px] px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTimerSeconds(60);
                    setIsRunning(false);
                    setStep(4);
                  }}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  Iniciar Primeiro Treino Rápido (Agora)
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-[#0F766E]">
                    Primeiro Sucesso nos Primeiros 5 Minutos · Bloco Q + Barriga Zero
                  </p>
                  <h2 className="text-xl sm:text-2xl font-display font-semibold text-slate-900 mt-1">
                    Destravar Escápulas & Respiração Costal 360°
                  </h2>
                </div>
                <div className="font-mono text-3xl font-semibold text-slate-900 tabular-nums bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                  {formatTime(timerSeconds)}
                </div>
              </div>

              {/* Adaptation Mode Selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600 block">
                  Escolha como prefere fazer agora (toque para adaptar):
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
                  {[
                    { id: 'standard' as ExecutionMode, label: 'Em Pé (Padrão)' },
                    { id: 'low_impact' as ExecutionMode, label: 'Baixo Impacto' },
                    { id: 'regression' as ExecutionMode, label: 'Sentada na Cadeira' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFirstWinMode(m.id)}
                      className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap truncate ${
                        firstWinMode === m.id
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instruction Card */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-sm font-semibold text-slate-900">
                  {firstWinMode === 'regression'
                    ? 'Sentada na cadeira com pés firmes no chão:'
                    : firstWinMode === 'low_impact'
                    ? 'Em pé com joelhos destravados e ombros longe das orelhas:'
                    : 'Em pé ou no tapete com postura alongada:'}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  1. Apoie as mãos nas costelas laterais. Inspire pelo nariz em <strong>4 segundos</strong> sentindo as costelas abrirem para os lados (sem estufar a barriga).
                  <br />
                  2. Solte o ar pela boca em <strong>6 segundos</strong> como se fechasse um zíper suave do púbis até o umbigo, girando os ombros para trás.
                </p>
                <div className="text-xs text-[#0F766E] font-medium pt-1">
                  Benefício imediato: Descomprime a região lombar, reduz a tensão no trapézio e ativa o cinturão abdominal natural.
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRunning(!isRunning)}
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isRunning ? 'Pausar Cronômetro' : 'Iniciar 60s Guiados'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRunning(false);
                      setTimerSeconds(60);
                    }}
                    className="min-h-[48px] px-3 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900"
                    aria-label="Reiniciar tempo"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsRunning(false);
                    setStep(5);
                  }}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Já fiz! Concluir 1º Treino
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0F766E]/10 text-[#0F766E] flex items-center justify-center mx-auto">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <p className="text-xs font-semibold text-[#0F766E]">
                  Primeiro Sucesso Concluído em Menos de 5 Minutos
                </p>
                <h2 className="text-2xl font-display font-semibold text-slate-900">
                  Parabéns pelo primeiro passo! Seu plano QH3X está personalizado.
                </h2>
                <p className="text-sm text-slate-600">
                  Sem promessas milagrosas e sem dor articular: sua jornada começa com um passo real que você já deu hoje.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-1.5 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900">Modo padrão configurado:</strong>{' '}
                  {recommendedMode === 'regression'
                    ? 'Regressão Articular (Cadeira / Apoio)'
                    : recommendedMode === 'low_impact'
                    ? 'Baixo Impacto (Sem Saltos)'
                    : 'Padrão Progressivo'}
                </div>
                <div>
                  <strong className="text-slate-900">Meta de rotina:</strong> Sessões de {preferredDuration} min com opção de 5 ou 10 min nos dias corridos.
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => handleFinishAll(true)}
                  className="min-h-[48px] px-8 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  Ir para Minha Home & Treino do Dia
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
