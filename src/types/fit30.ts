export type LifeStage =
  | 'rotina_intensa'
  | 'pos_parto'
  | 'climatério_menopausa'
  | 'retomada_gradual';

export type JointSensitivity =
  | 'nenhuma'
  | 'joelhos'
  | 'lombar'
  | 'ombros_cervical'
  | 'assoalho_pelvico';

export type TimeWindow = 5 | 10 | 30;

export type ExecutionMode = 'standard' | 'low_impact' | 'regression';

export type QH3XBlockType = 'Q' | 'H' | '3X' | 'CORE';

export interface UserProfile {
  id: string;
  name: string;
  ageRange: '30-37' | '38-45' | '46-55';
  lifeStage: LifeStage;
  jointSensitivities: JointSensitivity[];
  preferredDuration: TimeWindow;
  defaultExecutionMode: ExecutionMode;
  onboardingCompleted: boolean;
  firstWinCompleted: boolean;
  streakWeeks: number;
  completedSessionsCount: number;
}

export interface ExerciseVariation {
  mode: ExecutionMode;
  label: string;
  title: string;
  executionCue: string;
  breathingCue: string;
  jointSafetyNote: string;
  cadence: string;
}

export interface WorkoutExercise {
  id: string;
  order: number;
  block: QH3XBlockType;
  blockLabel: string;
  durationSeconds: number;
  restSeconds: number;
  targetArea: string;
  variations: Record<ExecutionMode, ExerciseVariation>;
}

export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  category: 'qh3x_diario' | 'dia_corrido' | 'barriga_zero' | 'mobilidade_postura';
  categoryLabel: string;
  durationMinutes: 5 | 10 | 15 | 30;
  blocksSummary: string;
  focusLabel: string;
  recommendedFor: string[];
  imageUrl: string;
  equipment: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutSessionLog {
  id: string;
  userId: string;
  workoutId: string;
  workoutTitle: string;
  completedAt: string;
  durationMinutes: number;
  executionModeUsed: ExecutionMode;
  perceivedEffort: 'leve' | 'moderado_bom' | 'desafiador';
  jointComfort: 'confortavel' | 'leve_tensao' | 'adaptei_movimento';
}

export interface DailyCheckIn {
  id: string;
  date: string;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  postureFeeling: 'alinhada' | 'cansada' | 'rigida';
  waistMeasureCm?: number;
  notes: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAge: number;
  authorContext: string;
  timeAgo: string;
  workoutCompleted: string;
  durationUsed: string;
  content: string;
  encouragementsCount: number;
  encouragedByMe?: boolean;
}

export interface BonusGuidePDF {
  id: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  pagesCount: number;
  keyTakeaways: string[];
  practicalChecklist: string[];
}
