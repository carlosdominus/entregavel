import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  ShieldAlert,
  Wind,
  X,
} from 'lucide-react';
import {
  ExecutionMode,
  Workout,
  WorkoutSessionLog,
} from '../types/fit30';

interface WorkoutPlayerModalProps {
  workout: Workout | null;
  defaultMode: ExecutionMode;
  onClose: () => void;
  onCompleteWorkout: (session: Omit<WorkoutSessionLog, 'id' | 'userId' | 'completedAt'>) => void;
}

export const WorkoutPlayerModal: React.FC<WorkoutPlayerModalProps> = ({
  workout,
  defaultMode,
  onClose,
  onCompleteWorkout,
}) => {
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [executionMode, setExecutionMode] = useState<ExecutionMode>(defaultMode);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(45);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPostCheckin, setShowPostCheckin] = useState<boolean>(false);
  const [perceivedEffort, setPerceivedEffort] =
    useState<WorkoutSessionLog['perceivedEffort']>('moderado_bom');
  const [jointComfort, setJointComfort] =
    useState<WorkoutSessionLog['jointComfort']>('confortavel');

  useEffect(() => {
    if (workout && workout.exercises.length > 0) {
      setExerciseIndex(0);
      setExecutionMode(defaultMode);
      setIsResting(false);
      setSecondsLeft(workout.exercises[0].durationSeconds);
      setIsPlaying(false);
      setShowPostCheckin(false);
    }
  }, [workout, defaultMode]);

  useEffect(() => {
    if (!isPlaying || !workout) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const currentEx = workout.exercises[exerciseIndex];
          if (!isResting && currentEx.restSeconds > 0) {
            setIsResting(true);
            return currentEx.restSeconds;
          }
          if (exerciseIndex < workout.exercises.length - 1) {
            const nextIdx = exerciseIndex + 1;
            setExerciseIndex(nextIdx);
            setIsResting(false);
            return workout.exercises[nextIdx].durationSeconds;
          }
          setIsPlaying(false);
          setShowPostCheckin(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, isResting, exerciseIndex, workout]);

  if (!workout) return null;

  const currentExercise = workout.exercises[exerciseIndex] || workout.exercises[0];
  const currentVariation = currentExercise.variations[executionMode];

  const handleSelectExercise = (idx: number) => {
    setExerciseIndex(idx);
    setIsResting(false);
    setSecondsLeft(workout.exercises[idx].durationSeconds);
    setIsPlaying(false);
  };

  const formatClock = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleConfirmFinish = () => {
    onCompleteWorkout({
      workoutId: workout.id,
      workoutTitle: workout.title,
      durationMinutes: workout.durationMinutes,
      executionModeUsed: executionMode,
      perceivedEffort,
      jointComfort,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="player-workout-title"
    >
      <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl my-auto">
        {/* Top Player Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="min-w-0">
            <div className="text-xs text-slate-500">
              {workout.categoryLabel} · {workout.durationMinutes} min · Exercício {exerciseIndex + 1} de{' '}
              {workout.exercises.length}
            </div>
            <h2
              id="player-workout-title"
              className="text-lg font-display font-semibold text-slate-900 truncate"
            >
              {workout.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Fechar player de treino"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showPostCheckin ? (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left / Main Visual & Timer Area */}
            <div className="lg:col-span-7 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between space-y-6">
              {/* Visual Frame with Measured Scrim */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video border border-slate-200">
                <img
                  src={workout.imageUrl}
                  alt={currentVariation.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 flex flex-col justify-between p-5 text-white">
                  <div className="flex items-center justify-between gap-2 text-xs font-medium text-slate-200">
                    <span>{currentExercise.blockLabel}</span>
                    <span>Foco: {currentExercise.targetArea}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold">
                      {isResting
                        ? 'Intervalo Recuperativo — Respire Fundo'
                        : `Modo Ativo: ${currentVariation.label}`}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white">
                      {currentVariation.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-200">
                      Cadência sugerida: {currentVariation.cadence}
                    </p>
                  </div>
                </div>
              </div>

              {/* Real-Time Low Impact & Regression Switcher */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    Adaptação Articular Instantânea (mude a qualquer momento):
                  </span>
                  <span className="text-xs text-[#0F766E] font-medium">
                    Sempre sem impacto excessivo
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-xl">
                  {(
                    [
                      { id: 'standard', label: 'Padrão (Progressão)' },
                      { id: 'low_impact', label: 'Baixo Impacto (Zero Salto)' },
                      { id: 'regression', label: 'Regressão (Cadeira / Apoio)' },
                    ] as { id: ExecutionMode; label: string }[]
                  ).map((tab) => {
                    const active = executionMode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setExecutionMode(tab.id)}
                        className={`min-h-[46px] px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap truncate ${
                          active
                            ? 'bg-[#0F766E] text-white shadow-sm'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Giant Accessible Timer & Transport Controls */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-medium text-slate-500">
                    {isResting ? 'Tempo de Descanso' : 'Cronômetro do Bloco'}
                  </div>
                  <div className="font-mono text-4xl sm:text-5xl font-semibold text-slate-900 tabular-nums tracking-tight mt-0.5">
                    {formatClock(secondsLeft)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectExercise(Math.max(0, exerciseIndex - 1))
                    }
                    disabled={exerciseIndex === 0}
                    className="min-h-[48px] min-w-[48px] px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-white disabled:opacity-40 flex items-center justify-center"
                    aria-label="Exercício anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="min-h-[48px] px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Iniciar Tempo
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSecondsLeft((s) => s + 15)}
                    className="min-h-[48px] px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white transition-colors whitespace-nowrap"
                  >
                    +15s Respiro
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setIsResting(false);
                      setSecondsLeft(currentExercise.durationSeconds);
                    }}
                    className="min-h-[48px] min-w-[48px] px-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white flex items-center justify-center"
                    aria-label="Reiniciar cronômetro do exercício"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (exerciseIndex < workout.exercises.length - 1) {
                        handleSelectExercise(exerciseIndex + 1);
                      } else {
                        setShowPostCheckin(true);
                      }
                    }}
                    className="min-h-[48px] min-w-[48px] px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-white flex items-center justify-center"
                    aria-label="Próximo exercício"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Technical Cues, Breathing & Exercise Queue */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500">
                    Orientação Técnica ({currentVariation.label})
                  </h4>
                  <p className="text-sm text-slate-800 mt-1.5 leading-relaxed">
                    {currentVariation.executionCue}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Wind className="w-4 h-4 text-[#0F766E] shrink-0 mt-1" />
                    <div className="text-xs text-slate-700">
                      <strong className="text-slate-900">Respiração & Core:</strong>{' '}
                      {currentVariation.breathingCue}
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/80">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <div className="text-xs text-slate-700">
                      <strong className="text-slate-900">Proteção Articular:</strong>{' '}
                      {currentVariation.jointSafetyNote}
                    </div>
                  </div>
                </div>

                {/* Exercise Sequence List */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-500">
                    Sequência dos Blocos QH3X nesta Sessão
                  </div>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {workout.exercises.map((ex, idx) => {
                      const isCurrent = idx === exerciseIndex;
                      return (
                        <button
                          key={ex.id}
                          type="button"
                          onClick={() => handleSelectExercise(idx)}
                          className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors min-h-[52px] ${
                            isCurrent
                              ? 'bg-[#0F766E]/8 text-slate-900 font-semibold'
                              : 'hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="text-xs text-[#0F766E]">
                              Bloco {ex.block} · {ex.targetArea}
                            </div>
                            <div className="text-sm truncate">
                              {idx + 1}. {ex.variations[executionMode].title}
                            </div>
                          </div>
                          <span className="font-mono text-xs tabular-nums text-slate-500 shrink-0">
                            {ex.durationSeconds}s
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setShowPostCheckin(true);
                  }}
                  className="w-full min-h-[52px] px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  Concluir Treino e Registrar Check-in Rápido
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Post-Workout Quick Check-in (2 taps) */
          <div className="p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#0F766E]">
                Sessão Concluída · Registro de Segurança e Constância
              </p>
              <h3 className="text-2xl font-display font-semibold text-slate-900">
                Muito bem! Como seu corpo respondeu ao treino de hoje?
              </h3>
              <p className="text-sm text-slate-600">
                Esse registro leva 10 segundos e ajuda a ajustar suas próximas recomendações.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">
                1. Sensação de esforço global:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'leve' as const, label: 'Leve e Restaurador', sub: 'Termino com mais energia' },
                  { id: 'moderado_bom' as const, label: 'Na Medida Certa', sub: 'Músculos ativos, fôlego bom' },
                  { id: 'desafiador' as const, label: 'Intenso Hoje', sub: 'Exigiu mais concentração' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPerceivedEffort(opt.id)}
                    className={`p-4 rounded-xl border text-left min-h-[64px] transition-colors ${
                      perceivedEffort === opt.id
                        ? 'border-[#0F766E] bg-[#0F766E]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">
                2. Conforto das articulações (joelhos, lombar e ombros):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'confortavel' as const, label: '100% Confortável', sub: 'Zero desconforto articular' },
                  { id: 'adaptei_movimento' as const, label: 'Usei Regressão e Ficou Ótimo', sub: 'Adaptação funcionou bem' },
                  { id: 'leve_tensao' as const, label: 'Senti Sensibilidade', sub: 'Sugerir mais regressões amanhã' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setJointComfort(opt.id)}
                    className={`p-4 rounded-xl border text-left min-h-[64px] transition-colors ${
                      jointComfort === opt.id
                        ? 'border-[#0F766E] bg-[#0F766E]/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-semibold text-slate-900">{opt.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowPostCheckin(false)}
                className="min-h-[48px] px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Voltar ao Player
              </button>
              <button
                type="button"
                onClick={handleConfirmFinish}
                className="min-h-[48px] px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm transition-colors whitespace-nowrap"
              >
                Salvar Sessão no Meu Progresso
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
