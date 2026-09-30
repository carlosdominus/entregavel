/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  CalendarCheck,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
  Library,
  Play,
  Plus,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
} from 'lucide-react';
import { BlueprintInspector } from './components/BlueprintInspector';
import { BarrigaZeroPdfEmbed } from './components/BarrigaZeroPdfEmbed';
import { OnboardingModal } from './components/OnboardingModal';
import { VideoAulaQH3X } from './components/VideoAulaQH3X';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import {
  BONUS_GUIDES_PDF,
  INITIAL_CHECKINS,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_SESSIONS,
  INITIAL_USER_PROFILE,
  WORKOUTS_CATALOG,
} from './data/fit30Data';
import {
  BonusGuidePDF,
  CommunityPost,
  DailyCheckIn,
  ExecutionMode,
  TimeWindow,
  UserProfile,
  Workout,
  WorkoutSessionLog,
} from './types/fit30';

type NavDestination = 'hoje' | 'biblioteca' | 'bonus' | 'progresso' | 'comunidade';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavDestination>('hoje');
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [selectedDailyWindow, setSelectedDailyWindow] = useState<TimeWindow>(30);
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isBlueprintOpen, setIsBlueprintOpen] = useState<boolean>(false);

  // Library filter state
  const [durationFilter, setDurationFilter] = useState<'all' | 5 | 10 | 30>('all');
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'qh3x_diario' | 'dia_corrido' | 'barriga_zero'
  >('all');

  // Progress & Check-in state
  const [sessions, setSessions] = useState<WorkoutSessionLog[]>(INITIAL_SESSIONS);
  const [checkIns, setCheckIns] = useState<DailyCheckIn[]>(INITIAL_CHECKINS);
  const [newEnergy, setNewEnergy] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [newPosture, setNewPosture] = useState<'alinhada' | 'cansada' | 'rigida'>('alinhada');
  const [newWaist, setNewWaist] = useState<string>('79.0');
  const [newCheckinNote, setNewCheckinNote] = useState<string>('');
  const [checkinSavedBanner, setCheckinSavedBanner] = useState<boolean>(false);

  // Community state
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [newPostText, setNewPostText] = useState<string>('');
  const [newPostDuration, setNewPostDuration] = useState<string>('30 min (QH3X Completo)');

  // Bonus PDF Reader state
  const [selectedGuide, setSelectedGuide] = useState<BonusGuidePDF>(BONUS_GUIDES_PDF[0]);
  const [checkedGuideItems, setCheckedGuideItems] = useState<Record<string, boolean>>({
    'pdf_barriga_zero-0': true,
  });

  // Recommended workout on Home based on selectedDailyWindow (30, 10, or 5 min)
  const dailyRecommendedWorkout = useMemo(() => {
    if (selectedDailyWindow === 30) {
      return WORKOUTS_CATALOG.find((w) => w.id === 'wk_qh3x_dia_14') || WORKOUTS_CATALOG[0];
    }
    if (selectedDailyWindow === 10) {
      return WORKOUTS_CATALOG.find((w) => w.id === 'wk_expresso_10') || WORKOUTS_CATALOG[1];
    }
    return WORKOUTS_CATALOG.find((w) => w.id === 'wk_expresso_5') || WORKOUTS_CATALOG[2];
  }, [selectedDailyWindow]);

  const barrigaZeroWorkout = useMemo(
    () => WORKOUTS_CATALOG.find((w) => w.id === 'wk_barriga_zero_1') || WORKOUTS_CATALOG[3],
    []
  );

  const barrigaZeroIntermediateWorkout = useMemo(
    () => WORKOUTS_CATALOG.find((w) => w.id === 'wk_barriga_zero_2') || WORKOUTS_CATALOG[4] || WORKOUTS_CATALOG[3],
    []
  );

  const filteredLibraryWorkouts = useMemo(() => {
    return WORKOUTS_CATALOG.filter((w) => {
      const matchDuration = durationFilter === 'all' || w.durationMinutes === durationFilter;
      const matchCat = categoryFilter === 'all' || w.category === categoryFilter;
      return matchDuration && matchCat;
    });
  }, [durationFilter, categoryFilter]);

  const handleCompleteOnboarding = (
    updated: Partial<UserProfile>,
    completedFirstWorkout: boolean
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated,
      completedSessionsCount: completedFirstWorkout
        ? prev.completedSessionsCount + 1
        : prev.completedSessionsCount,
    }));
    if (updated.preferredDuration) {
      setSelectedDailyWindow(updated.preferredDuration);
    }
    if (completedFirstWorkout) {
      const quickLog: WorkoutSessionLog = {
        id: `sess_${Date.now()}`,
        userId: userProfile.id,
        workoutId: 'wk_expresso_5',
        workoutTitle: 'Primeiro Sucesso: Destravar Escápulas & Respiração Costal 360°',
        completedAt: 'Agora · Onboarding Concluído',
        durationMinutes: 5,
        executionModeUsed: updated.defaultExecutionMode || 'low_impact',
        perceivedEffort: 'leve',
        jointComfort: 'confortavel',
      };
      setSessions((prev) => [quickLog, ...prev]);
    }
  };

  const handleCompleteWorkout = (
    newSession: Omit<WorkoutSessionLog, 'id' | 'userId' | 'completedAt'>
  ) => {
    const entry: WorkoutSessionLog = {
      ...newSession,
      id: `sess_${Date.now()}`,
      userId: userProfile.id,
      completedAt: 'Hoje · Agora mesmo',
    };
    setSessions((prev) => [entry, ...prev]);
    setUserProfile((prev) => ({
      ...prev,
      completedSessionsCount: prev.completedSessionsCount + 1,
    }));
    setActiveNav('progresso');
  };

  const handleSaveCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWaist = parseFloat(newWaist.replace(',', '.'));
    const entry: DailyCheckIn = {
      id: `chk_${Date.now()}`,
      date: 'Hoje · Novo Registro',
      energyLevel: newEnergy,
      postureFeeling: newPosture,
      waistMeasureCm: !isNaN(parsedWaist) ? parsedWaist : undefined,
      notes:
        newCheckinNote.trim() ||
        'Mantendo constância com foco em postura, força articular e respiração.',
    };
    setCheckIns((prev) => [entry, ...prev]);
    setNewCheckinNote('');
    setCheckinSavedBanner(true);
    setTimeout(() => setCheckinSavedBanner(false), 3000);
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    const created: CommunityPost = {
      id: `post_${Date.now()}`,
      authorName: userProfile.name,
      authorAge: 42,
      authorContext: 'Constância QH3X · Cuidado Articular',
      timeAgo: 'Agora mesmo',
      workoutCompleted: newPostDuration,
      durationUsed: newPostDuration.split(' ')[0] + ' min',
      content: newPostText.trim(),
      encouragementsCount: 1,
      encouragedByMe: true,
    };
    setPosts((prev) => [created, ...prev]);
    setNewPostText('');
  };

  const toggleEncouragePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const nextState = !p.encouragedByMe;
        return {
          ...p,
          encouragedByMe: nextState,
          encouragementsCount: nextState
            ? p.encouragementsCount + 1
            : Math.max(0, p.encouragementsCount - 1),
        };
      })
    );
  };

  const modeLabelMap: Record<ExecutionMode, string> = {
    standard: 'Padrão Progressivo',
    low_impact: 'Baixo Impacto (Sem Saltos)',
    regression: 'Regressão Articular (Cadeira/Apoio)',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] pb-20 md:pb-12">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hoje"
          onClick={(e) => {
            e.preventDefault();
            setActiveNav('hoje');
          }}
          className="text-xl font-display font-semibold tracking-tight text-slate-900 whitespace-nowrap"
        >
          Fit em 30
        </a>

        {/* Zone 2: 5 clean text navigation links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          aria-label="Navegação Principal"
        >
          {[
            { id: 'hoje' as const, label: 'Hoje' },
            { id: 'biblioteca' as const, label: 'Biblioteca' },
            { id: 'bonus' as const, label: 'Barriga Zero' },
            { id: 'progresso' as const, label: 'Progresso' },
            { id: 'comunidade' as const, label: 'Comunidade' },
          ].map((item) => {
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`min-h-[44px] px-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  active
                    ? 'border-[#0F766E] text-slate-900 font-semibold'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 2 Primary Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            className="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Onboarding (3 min)
          </button>
          <button
            type="button"
            onClick={() => setIsBlueprintOpen(true)}
            className="min-h-[40px] px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            Especificação & Wireframes
          </button>
        </div>
      </header>

      {/* Main Content Container (1200px max-width desktop presence) */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 flex-1 space-y-10">
        {/* =========================================================
            TELA 1: HOME / TREINO DO DIA (MÉTODO QH3X)
           ========================================================= */}
        {activeNav === 'hoje' && (
          <div className="space-y-10">
            {/* Greeting + Realistic Routine Time Selector */}
            <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs font-medium text-slate-500">
                  Método QH3X · Olá, {userProfile.name} · {userProfile.streakWeeks} semanas de constância
                  <span aria-hidden="true"> · </span>
                  Modo padrão: <span className="text-[#0F766E] font-semibold">{modeLabelMap[userProfile.defaultExecutionMode]}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-display font-semibold text-slate-900 tracking-tight">
                  Quanto tempo você tem para cuidar de você hoje?
                </h1>
                <p className="text-sm sm:text-base text-slate-600">
                  Nos dias corridos, diminuímos o tempo para manter o hábito. Escolha sua janela de hoje e o treino se adapta imediatamente.
                </p>
              </div>

              {/* Interactive Time Selector (Segmented Functional Buttons) */}
              <div className="space-y-1.5 shrink-0">
                <span className="text-xs font-semibold text-slate-600 block">
                  Alternar duração do treino de hoje:
                </span>
                <div
                  className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-200/70 rounded-xl"
                  role="group"
                  aria-label="Escolher duração do treino de hoje"
                >
                  {[
                    { mins: 30 as TimeWindow, label: '30 min Completo' },
                    { mins: 10 as TimeWindow, label: '10 min Corrido' },
                    { mins: 5 as TimeWindow, label: '5 min Destravar' },
                  ].map((opt) => {
                    const active = selectedDailyWindow === opt.mins;
                    return (
                      <button
                        key={opt.mins}
                        type="button"
                        onClick={() => setSelectedDailyWindow(opt.mins)}
                        className={`min-h-[46px] px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                          active
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Primary Focal Anchor: Today's Workout Hero Card */}
            <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] bg-slate-900">
                <img
                  src={dailyRecommendedWorkout.imageUrl}
                  alt={dailyRecommendedWorkout.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <div className="text-xs text-teal-300 font-medium">
                    {dailyRecommendedWorkout.categoryLabel} · {dailyRecommendedWorkout.blocksSummary}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white mt-1">
                    {dailyRecommendedWorkout.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-xl">
                    {dailyRecommendedWorkout.subtitle}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div>
                    <div className="text-xs font-semibold text-[#0F766E]">
                      Estrutura da Sessão ({dailyRecommendedWorkout.durationMinutes} minutos)
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Equipamento: {dailyRecommendedWorkout.equipment}
                    </p>
                  </div>

                  {/* Unboxed clean list of blocks */}
                  <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                    {dailyRecommendedWorkout.exercises.map((ex, index) => (
                      <div key={ex.id} className="py-3 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-xs font-semibold text-slate-900">
                            0{index + 1}. Bloco {ex.block} — {ex.targetArea}
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {ex.variations[userProfile.defaultExecutionMode].title}
                          </div>
                        </div>
                        <span className="font-mono text-xs text-slate-500 tabular-nums shrink-0">
                          {ex.durationSeconds}s
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                    <span>
                      Inclui alternância em 1 toque para <strong>Baixo Impacto</strong> e{' '}
                      <strong>Regressão na Cadeira</strong> durante todo o vídeo.
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveWorkout(dailyRecommendedWorkout)}
                    className="w-full min-h-[52px] px-6 py-3.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-colors whitespace-nowrap shadow-sm"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Iniciar Treino de Hoje ({dailyRecommendedWorkout.durationMinutes} min)
                  </button>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsOnboardingOpen(true)}
                      className="hover:text-slate-900 underline underline-offset-4"
                    >
                      Ajustar sensibilidade ({userProfile.jointSensitivities.join(', ')})
                    </button>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveNav('bonus')}
                        className="text-[#9A4329] font-semibold hover:underline underline-offset-4"
                      >
                        Abrir PDF Barriga Zero (10 págs)
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveWorkout(barrigaZeroWorkout)}
                        className="text-[#0F766E] font-semibold hover:underline underline-offset-4"
                      >
                        + Treino Barriga Zero (10m)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Official Embedded Video Lesson QH3X (03:00) */}
            <VideoAulaQH3X
              onStartVideoWorkout={() => setActiveWorkout(WORKOUTS_CATALOG[0])}
            />

            {/* Method Explanation Strip: Why QH3X works for 30-55 without joint pain */}
            <section className="pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="text-xl font-display font-semibold text-slate-900">
                    Como funciona a tríade QH3X de 30 minutos
                  </h2>
                  <p className="text-sm text-slate-600">
                    Três blocos de 10 minutos desenhados para mulheres de 30 a 55 anos: postura, força muscular e fôlego sem impacto.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBlueprintOpen(true)}
                  className="text-xs font-semibold text-[#0F766E] hover:underline underline-offset-4 self-start sm:self-auto"
                >
                  Ver Arquitetura & Wireframes do MVP →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: '01. Bloco Q (10 min)',
                    title: 'Preparação & Mobilidade Articular',
                    desc: 'Destrava coluna torácica, quadris e escápulas. Prepara tendões e articulações para que você nunca inicie o treino de força com o corpo rígido.',
                    meta: 'Lubrificação articular · Respiração costal',
                  },
                  {
                    step: '02. Bloco H (10 min)',
                    title: 'Força & Hipertrofia Protetora',
                    desc: 'Movimentos controlados (cadência 3-1-1) essenciais a partir dos 35+ anos para proteger joelhos e lombar, preservar massa magra e sustentar a postura.',
                    meta: 'Com pesos leves ou peso corporal · Opção na cadeira',
                  },
                  {
                    step: '03. Bloco 3X (10 min)',
                    title: 'Intervalos Metabólicos Sem Saltos',
                    desc: 'Estímulo cardiorrespiratório em intervalos ritmados com zero impacto vertical, respeitando o assoalho pélvico e os joelhos.',
                    meta: 'Mais disposição diária · Zero impacto articular',
                  },
                ].map((block) => (
                  <div
                    key={block.step}
                    className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-[#0F766E]">{block.step}</div>
                      <h3 className="text-lg font-display font-semibold text-slate-900">
                        {block.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{block.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                      {block.meta}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            TELA 3: BIBLIOTECA DE TREINOS
           ========================================================= */}
        {activeNav === 'biblioteca' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="text-xs font-medium text-slate-500">
                  Catálogo Adaptativo · Todas as sessões possuem versão Padrão, Baixo Impacto e Regressão
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 mt-1">
                  Biblioteca de Treinos QH3X
                </h1>
              </div>

              {/* Interactive Filter Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl">
                  {[
                    { id: 'all' as const, label: 'Todos os Tempos' },
                    { id: 30 as const, label: '30 min' },
                    { id: 10 as const, label: '10 min' },
                    { id: 5 as const, label: '5 min' },
                  ].map((btn) => (
                    <button
                      key={String(btn.id)}
                      type="button"
                      onClick={() => setDurationFilter(btn.id)}
                      className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        durationFilter === btn.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-xl">
                  {[
                    { id: 'all' as const, label: 'Todas Categorias' },
                    { id: 'qh3x_diario' as const, label: 'QH3X Completo' },
                    { id: 'dia_corrido' as const, label: 'Dia Corrido' },
                    { id: 'barriga_zero' as const, label: 'Barriga Zero' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`min-h-[40px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        categoryFilter === cat.id
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filteredLibraryWorkouts.length === 0 ? (
              <div className="p-12 bg-white border border-slate-200 rounded-2xl text-center space-y-3">
                <p className="text-base font-semibold text-slate-900">
                  Nenhum treino encontrado para essa combinação de filtros.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDurationFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#0F766E] text-white text-xs font-semibold"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLibraryWorkouts.map((wk) => (
                  <article
                    key={wk.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/9] bg-slate-900">
                        <img
                          src={wk.imageUrl}
                          alt={wk.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-5">
                          <div className="text-xs text-white font-medium">
                            <span className="font-mono tabular-nums font-semibold">
                              {wk.durationMinutes} min
                            </span>
                            <span aria-hidden="true"> · </span>
                            <span>{wk.blocksSummary}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="text-xs text-[#0F766E] font-semibold">
                          {wk.categoryLabel}
                        </div>
                        <h2 className="text-xl font-display font-semibold text-slate-900">
                          {wk.title}
                        </h2>
                        <p className="text-sm text-slate-600 leading-relaxed">{wk.subtitle}</p>
                        <div className="pt-2 text-xs text-slate-500">
                          Indicado para: {wk.recommendedFor.join(' · ')}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 truncate">{wk.equipment}</span>
                      <button
                        type="button"
                        onClick={() => setActiveWorkout(wk)}
                        className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Abrir no Player
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TELA 6: ÁREA DE BÔNUS (PROTOCOLO BARRIGA ZERO & PDF EMBED)
           ========================================================= */}
        {activeNav === 'bonus' && (
          <div className="space-y-10">
            {/* Protocolo Barriga Zero Feature Card */}
            <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative min-h-[240px] bg-slate-900">
                <img
                  src={barrigaZeroWorkout.imageUrl}
                  alt={barrigaZeroWorkout.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs text-teal-300 font-semibold">
                    Protocolo Oficial Integrado · PDF Completo + Player Guiado
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-semibold mt-1">
                    Barriga Zero: Controle Abdominal, Postura & Movimento
                  </h1>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-2.5">
                  <div className="text-xs font-semibold text-[#9A4329]">
                    Sem Promessas Milagrosas · Consistência, Respiração e Movimento Inteligente
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Abaixo está o <strong>PDF oficial de 10 páginas do Protocolo Barriga Zero</strong> integrado diretamente ao aplicativo. Você pode ler página por página, ampliar a fonte ou iniciar o <strong>Protocolo Básico (Pág. 4)</strong> e o <strong>Protocolo Intermediário (Pág. 5)</strong> direto no Player com cronômetro.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveWorkout(barrigaZeroWorkout)}
                    className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Praticar Protocolo Básico (8–10 min)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveWorkout(barrigaZeroIntermediateWorkout)}
                    className="min-h-[48px] px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Praticar Protocolo Intermediário (10 min)
                  </button>
                </div>
              </div>
            </section>

            {/* EMBEDDED 10-PAGE BARRIGA ZERO PDF */}
            <section aria-label="PDF Barriga Zero Integrado">
              <BarrigaZeroPdfEmbed
                onStartBasicProtocol={() => setActiveWorkout(barrigaZeroWorkout)}
                onStartIntermediateProtocol={() =>
                  setActiveWorkout(barrigaZeroIntermediateWorkout)
                }
              />
            </section>

            {/* Interactive PDF Guides & Checklists */}
            <section className="space-y-6">
              <div>
                <h2 className="text-xl font-display font-semibold text-slate-900">
                  Manuais Práticos & Guias de Consulta Rápida (PDF Interativo)
                </h2>
                <p className="text-sm text-slate-600">
                  Selecione um guia abaixo para ler os pontos-chave e marcar seu checklist prático da semana.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Guide Selector Column */}
                <div className="lg:col-span-5 space-y-3">
                  {BONUS_GUIDES_PDF.map((guide, idx) => {
                    const isSelected = selectedGuide.id === guide.id;
                    return (
                      <button
                        key={guide.id}
                        type="button"
                        onClick={() => setSelectedGuide(guide)}
                        className={`w-full text-left p-5 rounded-2xl border transition-colors ${
                          isSelected
                            ? 'bg-white border-[#0F766E] shadow-sm'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs text-[#0F766E] font-semibold">
                          0{idx + 1}. {guide.category} · {guide.readTime} · {guide.pagesCount} pág.
                        </div>
                        <div className="text-base font-display font-semibold text-slate-900 mt-1">
                          {guide.title}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{guide.subtitle}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Active Guide Reader Column */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="text-xs text-slate-500">
                      Leitor Rápido Fit em 30 · {selectedGuide.category} ({selectedGuide.pagesCount} páginas)
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-slate-900 mt-1">
                      {selectedGuide.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-700">
                      Principais Aprendizados Práticos:
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedGuide.keyTakeaways.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed"
                        >
                          <span className="font-mono text-xs font-semibold text-[#0F766E] mt-1">
                            0{i + 1}.
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <h4 className="text-xs font-semibold text-slate-700">
                      Checklist de Aplicação na Sua Rotina (toque para marcar):
                    </h4>
                    <div className="space-y-2">
                      {selectedGuide.practicalChecklist.map((checkItem, idx) => {
                        const key = `${selectedGuide.id}-${idx}`;
                        const checked = !!checkedGuideItems[key];
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={() =>
                              setCheckedGuideItems((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                              }))
                            }
                            className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-colors min-h-[48px] ${
                              checked
                                ? 'bg-[#0F766E]/5 border-[#0F766E] text-slate-900'
                                : 'border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                                checked
                                  ? 'bg-[#0F766E] border-[#0F766E] text-white'
                                  : 'border-slate-300'
                              }`}
                            >
                              {checked && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className="text-xs sm:text-sm">{checkItem}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================================
            TELA 4: PROGRESSO E CHECK-IN (CONSTÂNCIA, POSTURA E MEDIDAS)
           ========================================================= */}
        {activeNav === 'progresso' && (
          <div className="space-y-10">
            <div className="pb-6 border-b border-slate-200">
              <div className="text-xs font-medium text-slate-500">
                Acompanhamento Realista · Foco em disposição, conforto articular, postura e redução gradual de medidas
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 mt-1">
                Seu Progresso & Check-in Semanal
              </h1>
            </div>

            {/* Top Metric Summary Strip (Tabular Numerals) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                <div className="text-xs font-medium text-slate-500">Semanas de Constância</div>
                <div className="font-mono text-3xl font-semibold text-slate-900 tabular-nums mt-1">
                  {userProfile.streakWeeks} semanas
                </div>
                <div className="text-xs text-[#0F766E] mt-2">
                  Combinando treinos de 30m e 10m sem abandonar
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                <div className="text-xs font-medium text-slate-500">Sessões Concluídas</div>
                <div className="font-mono text-3xl font-semibold text-slate-900 tabular-nums mt-1">
                  {userProfile.completedSessionsCount} treinos
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  100% realizados com proteção articular ativa
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                <div className="text-xs font-medium text-slate-500">
                  Evolução de Cintura (Desde Semana 1)
                </div>
                <div className="font-mono text-3xl font-semibold text-[#0F766E] tabular-nums mt-1">
                  -2,5 cm
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  82,0 cm → 79,5 cm · Postura e controle abdominal
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Weekly Check-in Form */}
              <form
                onSubmit={handleSaveCheckIn}
                className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 self-start"
              >
                <div>
                  <h2 className="text-lg font-display font-semibold text-slate-900">
                    Registrar Check-in de Hoje
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Acompanhe como seu corpo está respondendo em energia, postura e medidas.
                  </p>
                </div>

                {checkinSavedBanner && (
                  <div className="p-3.5 rounded-xl bg-[#0F766E]/10 border border-[#0F766E] text-xs font-semibold text-[#0F766E] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Check-in registrado com sucesso no seu histórico!
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Nível de Disposição e Energia no Dia (1 a 5):
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {([1, 2, 3, 4, 5] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setNewEnergy(lvl)}
                        className={`min-h-[44px] rounded-xl font-mono text-sm font-semibold border transition-colors ${
                          newEnergy === lvl
                            ? 'bg-[#0F766E] text-white border-[#0F766E]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Como está sua percepção de postura e coluna hoje?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'alinhada' as const, label: 'Mais Alinhada' },
                      { id: 'cansada' as const, label: 'Um Pouco Cansada' },
                      { id: 'rigida' as const, label: 'Rígida (Pedindo Bloco Q)' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setNewPosture(p.id)}
                        className={`min-h-[44px] px-2.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                          newPosture === p.id
                            ? 'bg-[#0F766E]/10 border-[#0F766E] text-[#0F766E]'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="waist-input"
                    className="text-xs font-semibold text-slate-700 block"
                  >
                    Medida de Cintura em cm (opcional, apenas se mediu hoje):
                  </label>
                  <input
                    id="waist-input"
                    type="text"
                    value={newWaist}
                    onChange={(e) => setNewWaist(e.target.value)}
                    placeholder="Ex: 79.0"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-sm focus:outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="checkin-note"
                    className="text-xs font-semibold text-slate-700 block"
                  >
                    Observação do corpo (sono, disposição, articulações):
                  </label>
                  <textarea
                    id="checkin-note"
                    rows={2}
                    value={newCheckinNote}
                    onChange={(e) => setNewCheckinNote(e.target.value)}
                    placeholder="Ex: Dormi melhor e fiz o Bloco H sem desconforto no joelho..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-sm transition-colors"
                >
                  Salvar Check-in de Progresso
                </button>
              </form>

              {/* Right: Session Logs & Weekly Check-ins */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-lg font-display font-semibold text-slate-900">
                    Histórico Recente de Treinos & Conforto Articular
                  </h2>
                  <div className="divide-y divide-slate-100">
                    {sessions.map((sess) => (
                      <div
                        key={sess.id}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {sess.workoutTitle}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {sess.completedAt} · Modo: {modeLabelMap[sess.executionModeUsed]} · Articulações:{' '}
                            <span className="text-[#0F766E] font-medium">
                              {sess.jointComfort === 'confortavel'
                                ? '100% Confortável'
                                : sess.jointComfort === 'adaptei_movimento'
                                ? 'Adaptado com Segurança'
                                : 'Leve Sensibilidade'}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-semibold text-slate-700 tabular-nums shrink-0">
                          {sess.durationMinutes} min
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-lg font-display font-semibold text-slate-900">
                    Linha do Tempo de Check-ins (Energia, Postura e Medidas)
                  </h2>
                  <div className="divide-y divide-slate-100">
                    {checkIns.map((chk) => (
                      <div key={chk.id} className="py-4 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-semibold text-slate-900">{chk.date}</span>
                          <span className="text-slate-600 font-mono tabular-nums">
                            Energia: {chk.energyLevel}/5 · Postura: {chk.postureFeeling}
                            {chk.waistMeasureCm ? ` · Cintura: ${chk.waistMeasureCm} cm` : ''}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600">{chk.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            TELA 5: COMUNIDADE (VERSÃO SIMPLES — MURAL DE CONSTÂNCIA)
           ========================================================= */}
        {activeNav === 'comunidade' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="pb-6 border-b border-slate-200">
              <div className="text-xs font-medium text-slate-500">
                Ambiente Seguro e Sem Comparações Estéticas · Celebramos a constância possível (5, 10 ou 30 minutos)
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-semibold text-slate-900 mt-1">
                Comunidade de Constância Fit em 30
              </h1>
            </div>

            {/* New Post Composer */}
            <form
              onSubmit={handlePublishPost}
              className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label
                  htmlFor="community-post-input"
                  className="text-sm font-semibold text-slate-900"
                >
                  Compartilhe seu treino concluído hoje:
                </label>
                <select
                  value={newPostDuration}
                  onChange={(e) => setNewPostDuration(e.target.value)}
                  className="min-h-[40px] px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 bg-slate-50"
                  aria-label="Selecionar treino realizado"
                >
                  <option value="30 min (QH3X Completo)">30 min — QH3X Completo</option>
                  <option value="10 min (Versão Dia Corrido)">10 min — Versão Dia Corrido</option>
                  <option value="5 min (Pausa Destravar)">5 min — Pausa Destravar</option>
                  <option value="10 min (Protocolo Barriga Zero)">10 min — Protocolo Barriga Zero</option>
                </select>
              </div>

              <textarea
                id="community-post-input"
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Conte como você adaptou o treino para sua rotina ou como seu corpo se sentiu depois..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0F766E]"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Publicar no Mural de Constância
                </button>
              </div>
            </form>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {post.authorName}, {post.authorAge} anos
                      </div>
                      <div className="text-xs text-slate-500">
                        {post.authorContext} · {post.timeAgo} · Concluiu:{' '}
                        <span className="text-[#0F766E] font-medium">{post.workoutCompleted}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">{post.content}</p>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => toggleEncouragePost(post.id)}
                      className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                        post.encouragedByMe
                          ? 'bg-[#0F766E]/10 text-[#0F766E]'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${post.encouragedByMe ? 'fill-current' : ''}`}
                      />
                      Apoiar Constância ({post.encouragementsCount})
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar (<= 15% viewport height cap) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-5 items-center h-16 px-2"
        aria-label="Navegação Inferior Mobile"
      >
        {[
          { id: 'hoje' as const, label: 'Hoje', icon: Play },
          { id: 'biblioteca' as const, label: 'Biblioteca', icon: Library },
          { id: 'bonus' as const, label: 'Barriga Zero', icon: BookOpen },
          { id: 'progresso' as const, label: 'Progresso', icon: CalendarCheck },
          { id: 'comunidade' as const, label: 'Comunidade', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeNav === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveNav(tab.id)}
              className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
                active ? 'text-[#0F766E] font-semibold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] tracking-tight mt-0.5 truncate">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Interactive Modals: Onboarding (3-5m), Workout Player (Tela 2), and Blueprint (Items 1-7) */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        userProfile={userProfile}
        onCompleteOnboarding={handleCompleteOnboarding}
      />

      <WorkoutPlayerModal
        workout={activeWorkout}
        defaultMode={userProfile.defaultExecutionMode}
        onClose={() => setActiveWorkout(null)}
        onCompleteWorkout={handleCompleteWorkout}
      />

      <BlueprintInspector
        isOpen={isBlueprintOpen}
        onClose={() => setIsBlueprintOpen(false)}
      />
    </div>
  );
}
