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
    title: 'Barriga Zero — Protocolo Básico (Iniciante ou Pós-Parto Autorizado)',
    subtitle:
      'Faça 3 a 5 vezes por semana (8–10 minutos). Sequência oficial das 6 etapas da Página 4 do PDF Barriga Zero, com foco em qualidade e controle de pressão intra-abdominal.',
    category: 'barriga_zero',
    categoryLabel: 'Protocolo Barriga Zero · Básico (Pág. 4 do PDF)',
    durationMinutes: 10,
    blocksSummary: '6 Etapas Oficiais · Respiração, Assoalho Pélvico, Heel Slide, Ponte e Dead Bug Regressivo',
    focusLabel: 'Controle da parede abdominal, redução de sensação de peso/abaulamento e estabilidade do tronco',
    recommendedFor: ['Iniciante', 'Pós-parto autorizado', 'Controle abdominal profundo'],
    imageUrl: thumbBarrigaZeroImg,
    equipment: 'Tapete ou superfície firme',
    exercises: [
      {
        id: 'ex_bz_1',
        order: 1,
        block: 'CORE',
        blockLabel: 'Passo 1 e 2 — Respiração Tridimensional + Expiração com Ativação Suave',
        durationSeconds: 60,
        restSeconds: 15,
        targetArea: 'Diafragma e Parede Abdominal Profunda',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Deitada)',
            title: 'Respiração 3D (5 ciclos) + Expiração com Ativação Suave (5 a 8 reps)',
            executionCue:
              'Deite com joelhos flexionados e pés no chão. Inspire pelo nariz sem elevar os ombros. Expire lentamente pela boca imaginando a parte inferior do abdômen se aproximando suavemente da coluna (sem sugar com força máxima). Relaxe completamente na inspiração.',
            breathingCue: '5 ciclos de respiração 3D seguidos de 5 a 8 repetições com ativação suave.',
            jointSafetyNote:
              'Regra prática: respire, mantenha o controle e pare se sentir abaulamento forte, dor, peso vaginal ou perda urinária.',
            cadence: '5 a 8 repetições lentas e conscientes',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Guiado)',
            title: 'Expiração Suave sem Força Máxima (Foco em Relaxar na Inspiração)',
            executionCue:
              'Mantenha pés apoiados no solo e concentre-se em soltar toda a tensão na fase inspiratória antes de ativar suavemente na expiração.',
            breathingCue: 'Inspire relaxando · Expire aproximando suavemente o baixo ventre da coluna.',
            jointSafetyNote: 'Zero estufamento ou pressão para baixo.',
            cadence: '5 a 8 repetições',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão (Apoio Lombar)',
            title: 'Respiração Base com Panturrilhas Apoiadas ou Travesseiro',
            executionCue:
              'Se sentir desconforto ao deitar no solo, apoie as pernas em uma almofada firme para relaxar totalmente a coluna lombar.',
            breathingCue: 'Expiração suave pela boca.',
            jointSafetyNote: 'Foque em qualidade, não em quantidade.',
            cadence: '5 ciclos completos',
          },
        },
      },
      {
        id: 'ex_bz_2',
        order: 2,
        block: 'CORE',
        blockLabel: 'Passo 3 e 4 — Assoalho Pélvico + Deslizamento de Calcanhar (Heel Slide)',
        durationSeconds: 60,
        restSeconds: 15,
        targetArea: 'Assoalho Pélvico e Controle Pélvico Antirrotação',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Heel Slide)',
            title: 'Ativação Pélvica (5x 3–5s) + Deslizamento de Calcanhar (2x 6–10/lado)',
            executionCue:
              'Faça 5 contrações do assoalho pélvico de 3 a 5 segundos (relaxando completamente entre elas). Em seguida, deslize um calcanhar pelo chão durante a expiração suave mantendo a pelve estável.',
            breathingCue: 'Expire enquanto desliza o calcanhar; inspire relaxando ao retornar.',
            jointSafetyNote: 'Se aparecer abaulamento ("doming"), reduza a distância do deslizamento.',
            cadence: '2 séries de 6 a 10 por lado',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Curta Amplitude)',
            title: 'Heel Slide de Curta Amplitude + Relaxamento Pélvico Completo',
            executionCue:
              'Deslize o calcanhar apenas metade do caminho para garantir zero compensação na coluna lombar.',
            breathingCue: 'Expire durante toda a fase de movimento.',
            jointSafetyNote: 'Priorize o relaxamento completo entre cada contração.',
            cadence: '6 repetições por lado',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão (Só Ativação)',
            title: 'Ativação do Assoalho Pélvico (5 Contrações de 3 a 5s)',
            executionCue:
              'Mantenha os dois pés parados no chão e pratique apenas as 5 contrações suaves de 3 a 5 segundos com relaxamento total entre elas.',
            breathingCue: 'Nunca prenda a respiração.',
            jointSafetyNote: 'Retorne a esta etapa sempre que notar fadiga.',
            cadence: '5 contrações de 3 a 5s',
          },
        },
      },
      {
        id: 'ex_bz_3',
        order: 3,
        block: 'CORE',
        blockLabel: 'Passo 5 e 6 — Ponte de Glúteos + Dead Bug Bem Regressivo',
        durationSeconds: 60,
        restSeconds: 15,
        targetArea: 'Glúteos, Estabilidade de Tronco e Parede Abdominal',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Protocolo Básico)',
            title: 'Ponte de Glúteos (2x 10–15) + Dead Bug Regressivo (2x 6–8/lado)',
            executionCue:
              'Eleve o quadril em ponte (10 a 15 reps). Depois, no Dead Bug regressivo, mova apenas os braços ou toque suavemente um calcanhar de cada vez no solo mantendo o controle abdominal.',
            breathingCue: 'Solte o ar ao mover o braço ou tocar o calcanhar no chão.',
            jointSafetyNote: 'Se aparecer abaulamento, faça o Dead Bug movendo apenas os braços com pés no chão.',
            cadence: '2 séries de 6 a 8 por lado',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Só Braços)',
            title: 'Ponte de Glúteos + Dead Bug Só de Braços (Pés no Solo)',
            executionCue:
              'Mantenha os pés apoiados no chão após a ponte e leve um braço de cada vez para trás da cabeça durante a expiração sem arquear as costelas.',
            breathingCue: 'Expire mantendo as costelas conectadas à pelve.',
            jointSafetyNote: 'Protege 100% a linha alba e a lombar.',
            cadence: '2 séries de 6 a 8 por lado',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão (Ponte Curta)',
            title: 'Ponte de Glúteos Suave + Respiração de Controle',
            executionCue:
              'Eleve o quadril apenas até alinhar com o tronco, sem hiperestender a lombar, focando na estabilidade pélvica.',
            breathingCue: 'Expire ao subir o quadril.',
            jointSafetyNote: 'Zero pressão vaginal ou dor lombar.',
            cadence: '2 séries de 10 repetições',
          },
        },
      },
    ],
  },
  {
    id: 'wk_barriga_zero_2',
    title: 'Barriga Zero — Protocolo Intermediário (Core & Estabilidade)',
    subtitle:
      'Para quando o protocolo básico estiver confortável e sem sintomas. Inclui Dead Bug completo, Pallof Press leve, Prancha Inclinada e Caminhada Lateral.',
    category: 'barriga_zero',
    categoryLabel: 'Protocolo Barriga Zero · Intermediário (Pág. 5 do PDF)',
    durationMinutes: 10,
    blocksSummary: '6 Etapas Oficiais · Dead Bug, Pallof Press, Prancha Inclinada e Ponte com Pausa',
    focusLabel: 'Força e coordenação do core para preparar o corpo para treinos mais desafiadores',
    recommendedFor: ['Básico dominado sem sintomas', 'Integração pós-treino QH3X', 'Estabilidade de tronco'],
    imageUrl: thumbBarrigaZeroImg,
    equipment: 'Tapete + elástico leve (miniband) ou pesinho leve + superfície elevada (sofá/cadeira)',
    exercises: [
      {
        id: 'ex_bzi_1',
        order: 1,
        block: 'CORE',
        blockLabel: 'Passos 1 e 2 — Respiração (5 ciclos) + Dead Bug Completo',
        durationSeconds: 60,
        restSeconds: 15,
        targetArea: 'Coordenação Contralateral e Controle de Pressão',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Braços e Pernas)',
            title: 'Respiração + Dead Bug Completo Controlado (2–3x 6–8/lado)',
            executionCue:
              'Inicie com 5 ciclos de respiração + ativação suave. Em seguida, estenda braço e perna opostos de forma controlada sem perder o apoio neutro da coluna.',
            breathingCue: 'Expire lentamente durante toda a extensão do braço e da perna.',
            jointSafetyNote: 'Regresse imediatamente se houver abaulamento ("doming") ou respiração presa.',
            cadence: '2 a 3 séries de 6 a 8 por lado',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto',
            title: 'Dead Bug com Joelho Semiflexionado',
            executionCue: 'Mantenha o joelho a 90° ao tocar o calcanhar próximo ao chão para reduzir a alavanca na lombar.',
            breathingCue: 'Expiração contínua.',
            jointSafetyNote: 'Controle total antes de esticar a perna completa.',
            cadence: '6 a 8 por lado',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão (Voltar ao Básico)',
            title: 'Dead Bug Regressivo (Só Braços ou Heel Slide)',
            executionCue: 'Volte para o deslizamento de calcanhar pelo solo mantendo 100% de qualidade técnica.',
            breathingCue: 'Expire sem prender o ar.',
            jointSafetyNote: 'Aumente a dificuldade apenas quando a técnica estiver estável.',
            cadence: '6 por lado',
          },
        },
      },
      {
        id: 'ex_bzi_2',
        order: 2,
        block: 'CORE',
        blockLabel: 'Passos 3 e 4 — Pallof Press Leve + Prancha Inclinada',
        durationSeconds: 50,
        restSeconds: 15,
        targetArea: 'Antirrotação de Tronco e Parede Abdominal Anterior',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão (Intermediário)',
            title: 'Pallof Press Leve (2x 8–12/lado) + Prancha Inclinada (2x 15–25s)',
            executionCue:
              'Com elástico leve, estenda os braços à frente do peito resistindo à rotação. Depois, apoie as mãos em superfície elevada (cadeira firme ou sofá) em prancha inclinada por 15 a 25 segundos.',
            breathingCue: 'Respire normalmente durante a prancha inclinada — nunca prenda o ar.',
            jointSafetyNote: 'A superfície elevada reduz a pressão intra-abdominal em comparação à prancha no chão.',
            cadence: '8–12 reps/lado + 15–25s isometria',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto (Inclinada Alta)',
            title: 'Prancha Inclinada na Parede ou Mesa Alta (15s)',
            executionCue: 'Use um apoio mais alto para manter a parede abdominal plana e sem abaulamento.',
            breathingCue: 'Ciclos respiratórios calmos.',
            jointSafetyNote: 'Zero sobrecarga em punhos e lombar.',
            cadence: '2 séries de 15 segundos',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão',
            title: 'Pressão Isométrica de Palmas em Pé (Ativação de Core)',
            executionCue: 'Em pé com postura alta, pressione uma palma contra a outra em frente ao esterno durante a expiração.',
            breathingCue: 'Expire em 5 segundos.',
            jointSafetyNote: 'Segurança total para punhos e ombros.',
            cadence: '8 repetições de 5s',
          },
        },
      },
      {
        id: 'ex_bzi_3',
        order: 3,
        block: 'CORE',
        blockLabel: 'Passos 5 e 6 — Caminhada Lateral / Suitcase Carry + Ponte com Pausa',
        durationSeconds: 60,
        restSeconds: 15,
        targetArea: 'Glúteo Médio, Oblíquos e Estabilidade Pélvica',
        variations: {
          standard: {
            mode: 'standard',
            label: 'Padrão',
            title: 'Caminhada Lateral / Suitcase Carry (20–30s) + Ponte com Pausa (2x 10–12)',
            executionCue:
              'Caminhe lateralmente com miniband ou segurando 1 peso leve em apenas uma das mãos (sem inclinar o tronco). Finalize com ponte de glúteos sustentando pausa no topo.',
            breathingCue: 'Respire de forma fluida mantendo o tronco alinhado.',
            jointSafetyNote: 'Excelente para transferir o controle abdominal para a caminhada e treinos em pé.',
            cadence: '20–30s por lado + 10 a 12 pontes',
          },
          low_impact: {
            mode: 'low_impact',
            label: 'Baixo Impacto',
            title: 'Passada Lateral sem Elástico + Ponte com Pausa de 2s',
            executionCue: 'Foque no controle postural da pelve durante o deslocamento lateral e na pausa no topo da ponte.',
            breathingCue: 'Expire ao subir o quadril.',
            jointSafetyNote: 'Estabilidade articular sem impacto.',
            cadence: '2 séries completas',
          },
          regression: {
            mode: 'regression',
            label: 'Regressão',
            title: 'Ponte de Glúteos Controlada no Tapete (10 repetições)',
            executionCue: 'Realize apenas a ponte com pausa de 2 segundos no topo sentindo glúteos e core trabalharem juntos.',
            breathingCue: 'Expiração suave no topo.',
            jointSafetyNote: 'Alívio e estabilidade para a coluna lombar.',
            cadence: '10 a 12 repetições',
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
