import heroQh3xImg from '../assets/images/hero_qh3x_daily_1790801080218.jpg';
import thumbBarrigaZeroImg from '../assets/images/thumb_barriga_zero_1790801092923.jpg';
import thumbForcaArticularImg from '../assets/images/thumb_forca_articular_1790801103042.jpg';
import thumbExpresso10minImg from '../assets/images/thumb_expresso_10min_1790801113838.jpg';
import {
  BonusGuidePDF,
  CommunityPost,
  DailyCheckIn,
  UserProfile,
  Workout,
  WorkoutSessionLog,
} from '../types/fit30';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_claudia_42',
  name: 'Cláudia Mendes',
  ageRange: '38-45',
  lifeStage: 'rotina_intensa',
  jointSensitivities: ['joelhos', 'lombar'],
  preferredDuration: 30,
  defaultExecutionMode: 'low_impact',
  onboardingCompleted: true,
  firstWinCompleted: true,
  streakWeeks: 3,
  completedSessionsCount: 11,
};

export const WORKOUTS_CATALOG: Workout[] = [
  {
    id: 'wk_qh3x_dia_14',
    title: 'QH3X Completo: Força Postural & Membros Inferiores',
    subtitle:
      'Sessão diária estruturada em 3 blocos de 10 minutos para estabilidade de quadril, força muscular protetora e condicionamento sem saltos.',
    category: 'qh3x_diario',
    categoryLabel: 'Treino do Dia · Método QH3X',
    durationMinutes: 30,
    blocksSummary: '10m Bloco Q · 10m Bloco H · 10m Bloco 3X',
    focusLabel: 'Estabilidade de joelhos, força de glúteos e postura torácica',
    recommendedFor: ['Rotina de 30 min', 'Proteção de joelhos', 'Menopausa & Força'],
    imageUrl: heroQh3xImg,
    equipment: 'Tapete + 1 par de halteres leves (ou garrafas de água) + cadeira firme',
    exercises: [
      {
        id: 'ex_q1',
        order: 1,
        block: 'Q',
        blockLabel: 'Bloco Q — Preparação & Movimento (10 min)',
        durationSeconds: 60,
        restSeconds: 15,
        targetArea: 'Mobilidade Torácica e Quadril',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Fluido)',
            title: 'Mobilidade Gato-Camelo + Abertura Torácica em 4 Apoios',
            executionCue:
              'Em 4 apoios, alterne a curvatura suave da coluna e abra o peito girando o tronco lentamente para cada lado.',
            breathingCue: 'Inspire abrindo as costelas; solte o ar longo ao girar o tronco.',
            jointSafetyNote: 'Mantenha os punhos alinhados ligeiramente à frente dos ombros para reduzir pressão.',
            cadence: 'Ritmo calmo · 6 repetições por lado',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto',
            title: 'Abertura Torácica em Pé com Apoio na Parede',
            executionCue:
              'Em pé ao lado da parede, mantenha a pelve estável e gire o braço abrindo o peitoral sem forçar a lombar.',
            breathingCue: 'Inspire pelo nariz em 3 segundos; expire pela boca relaxando os ombros.',
            jointSafetyNote: 'Zero apoio sobre joelhos ou punhos no chão.',
            cadence: 'Ritmo controlado · 8 repetições lentas',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão Articular (Sentada)',
            title: 'Mobilidade Escapular e Torácica Sentada na Cadeira',
            executionCue:
              'Sentada com ísquios apoiados na cadeira e pés firmes no chão, faça rotações suaves da caixa torácica com mãos nos ombros.',
            breathingCue: 'Expire suavemente recolhendo o baixo ventre ao girar.',
            jointSafetyNote: 'Ideal para dias de sensibilidade lombar ou desconforto nos joelhos.',
            cadence: 'Amplitude confortável · 6 repetições',
          },
        },
      },
      {
        id: 'ex_h1',
        order: 2,
        block: 'H',
        blockLabel: 'Bloco H — Força & Hipertrofia Protetora (10 min)',
        durationSeconds: 45,
        restSeconds: 20,
        targetArea: 'Glúteos, Coxas e Estabilidade de Core',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Com Carga)',
            title: 'Agachamento Taça Controlado (Tempo 3-1-1)',
            executionCue:
              'Segure um peso próximo ao esterno, desça em 3 segundos mantendo joelhos alinhados com o 2º dedo do pé e suba empurrando o chão.',
            breathingCue: 'Inspire na descida; inicie a expiração antes de subir para estabilizar o abdômen.',
            jointSafetyNote: 'Mantenha o tronco íntegro sem arquear a lombar no ponto mais baixo.',
            cadence: '3s descida · 1s pausa · 1s subida',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Peso Corporal)',
            title: 'Agachamento Funcional Livre com Pausa Isométrica',
            executionCue:
              'Sem carga externa, desça até a amplitude onde seus calcanhares permanecem 100% firmes no solo.',
            breathingCue: 'Solte o ar ativando o assoalho pélvico na subida.',
            jointSafetyNote: 'Movimento silencioso e contínuo, sem trancos nos joelhos.',
            cadence: 'Cadência fluida · 10 a 12 repetições',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão Articular (Cadeira)',
            title: 'Sentar e Levantar da Cadeira (Box Squat Assistido)',
            executionCue:
              'Toque suavemente o assento da cadeira com o quadril, controle o peso nos calcanhares e suba sem projetar os joelhos para dentro.',
            breathingCue: 'Expire durante toda a fase de subida.',
            jointSafetyNote: 'Reduz em até 40% a sobrecarga patelar nos joelhos mantendo o estímulo muscular.',
            cadence: 'Amplitude guiada pela cadeira · 8 a 10 repetições',
          },
        },
      },
      {
        id: 'ex_h2',
        order: 3,
        block: 'H',
        blockLabel: 'Bloco H — Força & Hipertrofia Protetora (10 min)',
        durationSeconds: 45,
        restSeconds: 20,
        targetArea: 'Costas, Postura e Cintura Escapular',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Halteres)',
            title: 'Remada Curvada Bilateral com Pausa Escapular',
            executionCue:
              'Incline o tronco a 45° dobrando o quadril, puxe os cotovelos rente às costelas e sustente 1 segundo aproximando as escápulas.',
            breathingCue: 'Solte o ar ao puxar; inspire retornando devagar.',
            jointSafetyNote: 'Pescoço longo olhando para o chão a 1 metro à frente.',
            cadence: '2s puxada · 1s topo · 2s retorno',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Unilateral Apoiada)',
            title: 'Remada Unilateral com Mão Apoiada na Cadeira',
            executionCue:
              'Apoie uma mão no assento da cadeira para retirar qualquer tensão da coluna lombar enquanto trabalha um braço por vez.',
            breathingCue: 'Expiração ativa mantendo costelas fechadas.',
            jointSafetyNote: 'Suporte total para a coluna lombar.',
            cadence: '45 segundos distribuídos com troca na metade',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão Articular (Em Pé)',
            title: 'Retração Escapular em Pé + Puxada W sem Carga',
            executionCue:
              'Em pé ou sentada com coluna ereta, forme um "W" com os braços ativando o meio das costas sem sobrecarregar ombros ou lombar.',
            breathingCue: 'Respiração fluida sem prender o ar.',
            jointSafetyNote: 'Indicada para tensão cervical ou hérnia lombar sensível.',
            cadence: 'Contração consciente de 3 segundos no final',
          },
        },
      },
      {
        id: 'ex_3x1',
        order: 4,
        block: '3X',
        blockLabel: 'Bloco 3X — Intervalos Metabólicos Sem Impacto (10 min)',
        durationSeconds: 40,
        restSeconds: 20,
        targetArea: 'Capacidade Cardiorrespiratória & Disposição',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Dinâmico Sem Salto)',
            title: 'Passada Lateral Rápida + Alcance Diagonal de Braços',
            executionCue:
              'Desloque-se lateralmente mantendo leve flexão de quadril e alcance o braço na diagonal, acelerando o ritmo sem tirar os dois pés do chão.',
            breathingCue: 'Mantenha respiração rítmica nasal-bucal.',
            jointSafetyNote: 'Estímulo cardiovascular intenso com zero impacto vertical nas articulações e assoalho pélvico.',
            cadence: 'Ritmo vigoroso · 40s ativo / 20s pausa',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Cadenciado)',
            title: 'Toque Lateral de Pé + Elevação Frontal de Braços',
            executionCue:
              'Mantenha o centro de gravidade alto, toque a ponta do pé ao lado coordenando com braços na linha dos ombros.',
            breathingCue: 'Expire a cada dois toques laterais.',
            jointSafetyNote: 'Protege tornozelos, joelhos e evita pressão intra-abdominal excessiva.',
            cadence: 'Ritmo constante e confortável',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão Articular (Marcha Estacionária)',
            title: 'Marcha Atlética Controlada no Lugar + Bombeamento de Braços',
            executionCue:
              'Eleve suavemente os joelhos em marcha no lugar, mantendo postura alta e movimento coordenado dos cotovelos.',
            breathingCue: 'Inspire em 3 passos, expire em 3 passos.',
            jointSafetyNote: '100% previsível e estável para equilíbrio e articulações sensíveis.',
            cadence: 'Cadência moderada contínua',
          },
        },
      },
    ],
  },
  {
    id: 'wk_expresso_10',
    title: 'QH3X Dia Corrido: 10 Minutos Essenciais',
    subtitle:
      'Para os dias de agenda cheia: 3 minutos de destravamento articular + 4 minutos de força global + 3 minutos de circulação ativa.',
    category: 'dia_corrido',
    categoryLabel: 'Versão 10 Minutos · Dia Corrido',
    durationMinutes: 10,
    blocksSummary: '3m Bloco Q · 4m Bloco H · 3m Bloco 3X',
    focusLabel: 'Manutenção de constância, energia imediata e alívio de rigidez',
    recommendedFor: ['Agenda apertada', 'Pausa no home office', 'Manter o hábito'],
    imageUrl: thumbExpresso10minImg,
    equipment: 'Nenhum equipamento (apenas peso do corpo)',
    exercises: [
      {
        id: 'ex_10_1',
        order: 1,
        block: 'Q',
        blockLabel: 'Bloco Q — Destravar (3 min)',
        durationSeconds: 60,
        restSeconds: 10,
        targetArea: 'Coluna, Quadril e Ombros',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão',
            title: 'Círculos Escapulares + Inclinação Lateral Dinâmica',
            executionCue: 'Solte a tensão acumulada no pescoço e alongue a cadeia lateral respirando fundo.',
            breathingCue: 'Inspire expandindo as costelas laterais.',
            jointSafetyNote: 'Movimento suave sem forçar o final da amplitude.',
            cadence: 'Contínuo por 60 segundos',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto',
            title: 'Mobilidade Cervical e Escapular em Pé',
            executionCue: 'Pés na largura do quadril, joelhos destravados e foco em soltar os trapézios.',
            breathingCue: 'Expiração longa soltando o peso dos ombros.',
            jointSafetyNote: 'Sem flexão de joelhos.',
            cadence: 'Ritmo calmo',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão (Sentada)',
            title: 'Espreguiçamento Guiado na Cadeira de Trabalho',
            executionCue: 'Faça diretamente da cadeira do escritório para aliviar a compressão lombar.',
            breathingCue: '3 ciclos de respiração profunda.',
            jointSafetyNote: 'Zero impacto.',
            cadence: 'Suave e restaurador',
          },
        },
      },
      {
        id: 'ex_10_2',
        order: 2,
        block: 'H',
        blockLabel: 'Bloco H — Força Global (4 min)',
        durationSeconds: 50,
        restSeconds: 15,
        targetArea: 'Pernas, Glúteos e Core',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão',
            title: 'Agachamento + Elevação nos Calcanhares (Panturrilha)',
            executionCue: 'Agache com controle e, ao retornar ao topo, suba na ponta dos pés ativando panturrilhas.',
            breathingCue: 'Expire ao subir.',
            jointSafetyNote: 'Ativa o retorno venoso das pernas após horas sentada.',
            cadence: '12 repetições completas',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto',
            title: 'Meio Agachamento Controlado + Postura Alta',
            executionCue: 'Reduza a descida pela metade mantendo contração firme de glúteos no topo.',
            breathingCue: 'Expire fechando as costelas.',
            jointSafetyNote: 'Protege os joelhos em dias de cansaço.',
            cadence: '10 repetições pausadas',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão Articular',
            title: 'Ponte de Glúteos no Tapete ou Sentar/Levantar com Apoio',
            executionCue: 'Use as mãos apoiadas no encosto de uma cadeira firme para assistir a subida.',
            breathingCue: 'Respiração contínua.',
            jointSafetyNote: 'Estabilidade máxima.',
            cadence: '8 repetições confortáveis',
          },
        },
      },
    ],
  },
  {
    id: 'wk_expresso_5',
    title: 'Pausa Ativa de 5 Minutos: Destravar Lombar & Postura',
    subtitle:
      'O mínimo viável para não quebrar o ritmo: alívio imediato de sensação de peso nas costas e ativação gentil da disposição.',
    category: 'dia_corrido',
    categoryLabel: 'Versão 5 Minutos · Primeiro Sucesso',
    durationMinutes: 5,
    blocksSummary: '5m Bloco Q + Respiração Costal',
    focusLabel: 'Alívio de tensão lombar, alinhamento cervical e energia',
    recommendedFor: ['Primeiro treino (Onboarding)', 'Dias de baixa energia', 'Pós-expediente'],
    imageUrl: thumbForcaArticularImg,
    equipment: 'Nenhum equipamento necessário',
    exercises: [
      {
        id: 'ex_5_1',
        order: 1,
        block: 'Q',
        blockLabel: 'Bloco Único — Destravar & Respirar (5 min)',
        durationSeconds: 60,
        restSeconds: 10,
        targetArea: 'Diafragma, Coluna Torácica e Quadril',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão',
            title: 'Respiração Costal 360° + Deslizamento Escapular',
            executionCue:
              'Mãos nas costelas baixas: sinta a expansão lateral ao inspirar e o recolhimento natural do abdômen ao soltar o ar.',
            breathingCue: 'Inspire em 4s pelo nariz · Expire em 6s pela boca entreaberta.',
            jointSafetyNote: 'Acalma o sistema nervoso e organiza a postura imediatamente.',
            cadence: '6 ciclos respiratórios completos',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto',
            title: 'Respiração Costal em Pé com Joelhos Destravados',
            executionCue: 'Cresça o topo da cabeça em direção ao teto enquanto relaxa a mandíbula e os ombros.',
            breathingCue: 'Inspire 4s · Expire 6s.',
            jointSafetyNote: 'Pode ser feito descalça ou no trabalho.',
            cadence: '6 ciclos',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão (Deitada ou Sentada)',
            title: 'Respiração Diafragmática Deitada com Pernas Apoiadas',
            executionCue: 'Deite-se de barriga para cima com as panturrilhas apoiadas no sofá ou cadeira para descanso lombar total.',
            breathingCue: 'Solte o ar esvaziando as costelas sem empurrar o abdômen para fora.',
            jointSafetyNote: 'Alívio imediato para lombar cansada.',
            cadence: '6 ciclos lentos',
          },
        },
      },
    ],
  },
  {
    id: 'wk_barriga_zero_1',
    title: 'Protocolo Barriga Zero: Controle Abdominal & Respiração Costal',
    subtitle:
      'Treino técnico de 10 minutos focado no transverso abdominal, organização da pressão intra-abdominal e postura pélvica — sem abdominais tradicionais que estufam a barriga.',
    category: 'barriga_zero',
    categoryLabel: 'Protocolo Extra · Barriga Zero',
    durationMinutes: 10,
    blocksSummary: '10m Core Profundo, Respiração & Postura',
    focusLabel: 'Controle abdominal profundo, proteção do assoalho pélvico e redução de cintura postural',
    recommendedFor: ['Pós-parto', 'Controle abdominal', 'Proteção lombar'],
    imageUrl: thumbBarrigaZeroImg,
    equipment: 'Tapete ou superfície confortável',
    exercises: [
      {
        id: 'ex_bz_1',
        order: 1,
        block: 'CORE',
        blockLabel: 'Barriga Zero — Ativação do Cinturão Natural (10 min)',
        durationSeconds: 45,
        restSeconds: 15,
        targetArea: 'Transverso Abdominal e Assoalho Pélvico',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Decúbito Dorsal)',
            title: 'Expiração Ativa em Zíper + Deslizamento Alternado de Calcanhar',
            executionCue:
              'Deitada de costas com joelhos flexionados, inicie a expiração ativando suavemente de baixo para cima (como fechar um zíper) enquanto desliza um calcanhar sem mover a pelve.',
            breathingCue: 'Expire ANTES e DURANTE o movimento da perna; inspire parada.',
            jointSafetyNote:
              'Nunca prenda o ar (evite manobra de Valsalva). Se notar abaulamento no centro do abdômen, reduza a amplitude.',
            cadence: 'Lento e técnico · 5 repetições por perna',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Isométrico)',
            title: 'Conexão Costelas-Pelve em Supino (Sem Movimento de Pernas)',
            executionCue:
              'Mantenha os dois pés apoiados no chão e concentre-se 100% na ativação profunda do transverso durante a expiração prolongada.',
            breathingCue: 'Expire em 6 segundos sentindo a cintura afinar suavemente.',
            jointSafetyNote: 'Segurança total para pós-parto e reeducação da parede abdominal.',
            cadence: '8 respirações técnicas guiadas',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão (Sentada / Parede)',
            title: 'Alinhamento Costal com Costas Apoiadas na Parede',
            executionCue:
              'Sentada ou em pé encostada na parede, alinhe sacro e meio das costas enquanto pratica o recolhimento suave na expiração.',
            breathingCue: 'Sopro suave pela boca sem tensionar pescoço.',
            jointSafetyNote: 'Ideal para quem não deseja deitar no chão.',
            cadence: '8 ciclos conscientes',
          },
        },
      },
    ],
  },
];

export const INITIAL_SESSIONS: WorkoutSessionLog[] = [
  {
    id: 'sess_01',
    userId: 'usr_claudia_42',
    workoutId: 'wk_qh3x_dia_14',
    workoutTitle: 'QH3X Completo: Força Postural & Membros Inferiores',
    completedAt: 'Hoje · 07:40',
    durationMinutes: 30,
    executionModeUsed: 'low_impact',
    perceivedEffort: 'moderado_bom',
    jointComfort: 'confortavel',
  },
  {
    id: 'sess_02',
    userId: 'usr_claudia_42',
    workoutId: 'wk_barriga_zero_1',
    workoutTitle: 'Protocolo Barriga Zero: Controle Abdominal & Respiração Costal',
    completedAt: 'Ontem · 19:15',
    durationMinutes: 10,
    executionModeUsed: 'standard',
    perceivedEffort: 'leve',
    jointComfort: 'confortavel',
  },
  {
    id: 'sess_03',
    userId: 'usr_claudia_42',
    workoutId: 'wk_expresso_10',
    workoutTitle: 'QH3X Dia Corrido: 10 Minutos Essenciais',
    completedAt: 'Terça-feira · 12:30',
    durationMinutes: 10,
    executionModeUsed: 'regression',
    perceivedEffort: 'moderado_bom',
    jointComfort: 'adaptei_movimento',
  },
];

export const INITIAL_CHECKINS: DailyCheckIn[] = [
  {
    id: 'chk_1',
    date: 'Semana 3 (Atual)',
    energyLevel: 4,
    postureFeeling: 'alinhada',
    waistMeasureCm: 79.5,
    notes: 'Senti menos rigidez na lombar ao acordar e consegui fazer os 3 blocos sem dor no joelho direito.',
  },
  {
    id: 'chk_2',
    date: 'Semana 2',
    energyLevel: 4,
    postureFeeling: 'alinhada',
    waistMeasureCm: 80.5,
    notes: 'Nos dias corridos usei o treino de 10 minutos no intervalo do almoço. Mantive a constância.',
  },
  {
    id: 'chk_3',
    date: 'Semana 1 (Início)',
    energyLevel: 2,
    postureFeeling: 'cansada',
    waistMeasureCm: 82.0,
    notes: 'Começando com calma usando as opções de baixo impacto.',
  },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_1',
    authorName: 'Renata Vasconcelos',
    authorAge: 46,
    authorContext: 'Climatério · Sensibilidade nos joelhos',
    timeAgo: 'Há 2 horas',
    workoutCompleted: 'QH3X Completo (30 min) — Modo Baixo Impacto',
    durationUsed: '30 min',
    content:
      'Pela primeira vez em anos consegui completar 3 semanas seguidas sem abandonar na segunda-feira. Trocar para a regressão na cadeira no Bloco H salvou meu joelho e sinto minhas pernas firmes.',
    encouragementsCount: 24,
    encouragedByMe: false,
  },
  {
    id: 'post_2',
    authorName: 'Luciana Prado',
    authorAge: 36,
    authorContext: 'Pós-parto (1 ano) · Rotina corporativa',
    timeAgo: 'Há 5 horas',
    workoutCompleted: 'QH3X Dia Corrido (10 min) + Barriga Zero (10 min)',
    durationUsed: '20 min',
    content:
      'Hoje o dia estava caótico, quase não treinei. Fiz a versão de 10 minutos + o protocolo Barriga Zero antes do banho. Minha postura sentada no computador já mudou completamente.',
    encouragementsCount: 19,
    encouragedByMe: true,
  },
  {
    id: 'post_3',
    authorName: 'Patrícia Alencar',
    authorAge: 52,
    authorContext: 'Foco em força, postura e disposição',
    timeAgo: 'Ontem',
    workoutCompleted: 'Pausa Ativa de 5 Minutos',
    durationUsed: '5 min',
    content:
      'A regra de ouro de que "5 minutos bem feitos valem mais que zero" tirou o peso da culpa. Comecei pelos 5 minutos naquele dia cansativo e terminei me sentindo renovada.',
    encouragementsCount: 31,
    encouragedByMe: false,
  },
];

export const BONUS_GUIDES_PDF: BonusGuidePDF[] = [
  {
    id: 'pdf_barriga_zero',
    title: 'Manual Prático Barriga Zero: Respiração, Postura e Controle Abdominal',
    subtitle: 'Como organizar a pressão intra-abdominal no dia a dia sem abdominais tradicionais.',
    readTime: 'Leitura de 6 min',
    category: 'Protocolo Barriga Zero',
    pagesCount: 14,
    keyTakeaways: [
      'Por que abdominais tradicionais (crunches) podem aumentar o estufamento abdominal quando falta controle de pressão.',
      'Técnica da Expiração em Zíper: ativando assoalho pélvico e transverso abdominal em sinergia.',
      'Postura no trabalho e ao carregar peso: como proteger a coluna lombar e manter a cintura ativa.',
    ],
    practicalChecklist: [
      'Evitar prender a respiração durante esforços (exalar sempre na fase mais difícil do movimento).',
      'Praticar 5 minutos de respiração costal 360° ao menos 3 vezes por semana.',
      'Crescer o topo da cabeça antes de iniciar qualquer exercício do Bloco H.',
    ],
  },
  {
    id: 'pdf_articulacoes',
    title: 'Guia de Adaptação Articular: Joelhos, Lombar e Ombros Sem Dor',
    subtitle: 'Como escolher entre Padrão, Baixo Impacto e Regressão conforme a resposta do seu corpo no dia.',
    readTime: 'Leitura de 5 min',
    category: 'Segurança & Individualização',
    pagesCount: 10,
    keyTakeaways: [
      'Diferença clara entre esforço muscular produtivo (bem-vindo) e pontada articular (sinal para regredir).',
      'Regra do Apoio na Cadeira: como manter 100% do ganho de força reduzindo a compressão patelar.',
      'Autonomia diária: por que usar a Regressão na TPM ou em dias de pouco sono acelera seus resultados no longo prazo.',
    ],
    practicalChecklist: [
      'Testar as 2 primeiras repetições sem carga para avaliar como estão as articulações hoje.',
      'Acionar o botão "Baixo Impacto" no Player sempre que preferir zero saltos.',
      'Registrar o conforto articular no check-in pós-treino.',
    ],
  },
  {
    id: 'pdf_menopausa_forca',
    title: 'Força & Disposição dos 35 aos 55+: O Papel do Bloco H na Saúde Feminina',
    subtitle: 'Preservação de massa magra, saúde óssea e organização da rotina real.',
    readTime: 'Leitura de 7 min',
    category: 'Saúde Feminina 30–55',
    pagesCount: 16,
    keyTakeaways: [
      'A importância da cadência controlada (Tempo 3-1-1) para estimular músculos e tendões com pesos moderados em casa.',
      'Como os 3 blocos de 10 minutos (Q + H + 3X) entregam mobilidade, força e fôlego sem exaustão pós-treino.',
      'Estratégia do Mínimo Viável: como usar as sessões de 5 e 10 minutos para nunca perder o hábito.',
    ],
    practicalChecklist: [
      'Priorizar ao menos 3 blocos H por semana para manutenção de força e postura.',
      'Acompanhar evolução pela disposição diária, caimento das roupas e medida de cintura (sem obsessão pela balança).',
    ],
  },
];

export const PROMPT_PROXIMA_ETAPA = `Atue como um Engenheiro Frontend Sênior (React + TypeScript + Tailwind CSS) e Product Designer especialista em saúde feminina (público 30–55 anos).

Quero expandir e conectar ao backend o aplicativo "Fit em 30 (Método QH3X)" seguindo rigorosamente estas diretrizes de produto e design:

1. ARQUITETura E FLUXO PRINCIPAL:
- Navegação limpa em 5 pilares: Hoje (Treino do Dia QH3X), Biblioteca, Protocolo Barriga Zero (Bônus + PDFs), Progresso & Check-in, e Comunidade.
- Onboarding rápido de 3 passos (Fase de vida, Mapa de sensibilidade articular, Tempo disponível hoje) que desemboca imediatamente em um "Primeiro Treino Guiado de 4 Minutos" (Destravar Coluna & Respiração Costal) para garantir o primeiro sucesso da usuária nos primeiros 5 minutos de uso.

2. PLAYER QH3X ADAPTATIVO (CORE FEATURE):
- Divisão visual clara dos 3 blocos de 10 minutos: Bloco Q (Preparação/Movimento), Bloco H (Força/Hipertrofia Segura) e Bloco 3X (Intervalos Sem Impacto).
- Seletor em tempo real com 3 botões grandes e acessíveis (touch target >= 48px): [Padrão], [Baixo Impacto (Sem Saltos)] e [Regressão Articular (Joelhos/Lombar)]. Ao alternar, atualizar imediatamente a orientação técnica, cadência e dica respiratória do exercício atual.
- Seletor de rotina na Home: [30 min Completo], [10 min Dia Corrido], [5 min Destravar].

3. DIRETRIZES ÉTICAS E DE LINGUAGEM (OBRIGATÓRIO):
- Tom de voz acolhedor, técnico, maduro e respeitoso para mulheres de 30 a 55 anos.
- PROIBIDO usar termos pseudocientíficos ou promessas irreais como "ativar TRPV1", "queima de 48 horas", "derreter gordura" ou "fechar diástase".
- Usar terminologia correta: "controle abdominal profundo", "organização da pressão intra-abdominal", "força protetora articular" e "constância real".

4. DESIGN SYSTEM & ACESSIBILIDADE:
- Alto contraste WCAG AA/AAA, tipografia legível (Fraunces para títulos editoriais, Plus Jakarta Sans para leitura e JetBrains Mono tabular-nums para cronômetros).
- Botões amplos, poucos elementos por tela e persistência completa de sessões e check-ins de disposição/postura/medidas.`;
