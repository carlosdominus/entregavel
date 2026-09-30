import React, { useState } from 'react';
import {
  Check,
  Copy,
  Database,
  FileCode2,
  GitBranch,
  LayoutTemplate,
  ListChecks,
  MessageSquareHeart,
  Sparkles,
  X,
} from 'lucide-react';
import { PROMPT_PROXIMA_ETAPA } from '../data/fit30Data';

interface BlueprintInspectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintInspector: React.FC<BlueprintInspectorProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'ia_onboarding' | 'wireframes' | 'mvp_v2' | 'microcopy' | 'schema' | 'prompt'
  >('ia_onboarding');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(PROMPT_PROXIMA_ETAPA);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="blueprint-title"
    >
      <div className="w-full max-w-6xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <div>
            <div className="text-xs font-semibold text-[#0F766E]">
              Especificação Completa de Produto & Engenharia (Entregáveis 1 a 7)
            </div>
            <h2
              id="blueprint-title"
              className="text-lg sm:text-xl font-display font-semibold text-slate-900"
            >
              Blueprint MVP — Fit em 30 (Método QH3X · Público Feminino 30–55)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Fechar documentação do produto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white overflow-x-auto shrink-0">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'ia_onboarding' as const, label: '1 & 2. Arquitetura + Onboarding', icon: GitBranch },
              { id: 'wireframes' as const, label: '3. Wireframes Textuais (6 Telas)', icon: LayoutTemplate },
              { id: 'mvp_v2' as const, label: '4. Matriz MVP vs. V2', icon: ListChecks },
              { id: 'microcopy' as const, label: '5. Tom de Voz & Microcopy (30–55)', icon: MessageSquareHeart },
              { id: 'schema' as const, label: '6. Estrutura de Dados (Schema)', icon: Database },
              { id: 'prompt' as const, label: '7. Prompt Próxima Etapa', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-sm text-slate-700">
          {activeTab === 'ia_onboarding' && (
            <div className="space-y-8">
              <section className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-slate-900">
                  1. Arquitetura de Informação Completa do MVP & Fluxo do Usuário
                </h3>
                <p>
                  A arquitetura foi desenhada com <strong>baixa carga cognitiva</strong> (máximo de 5 destinos primários) para evitar paralisia de decisão em mulheres com rotina intensa:
                </p>
                <div className="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
                  <pre>{`[Acesso / Login Mágico]
       │
       ▼
[ONBOARDING 3-5 MIN] ──► (3 Perguntas Rápidas: Fase + Articulações + Tempo)
       │
       ▼
[PRIMEIRO SUCESSO < 5 MIN] ──► (Prática Guiada 60s–4m: Destravar Coluna & Respiração Costal)
       │
       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ NAVEGAÇÃO PRINCIPAL (5 Pilares de Acesso Direto)                             │
├────────────────┬─────────────────┬──────────────────┬────────────────────────┤
│ 1. HOJE (Home) │ 2. BIBLIOTECA   │ 3. BARRIGA ZERO  │ 4. PROGRESSO &         │
│ (Treino do Dia)│ (Catálogo QH3X) │ (Bônus & PDFs)   │    COMUNIDADE          │
└───────┬────────┴────────┬────────┴────────┬─────────┴───────────┬────────────┘
        │                 │                 │                     │
        ▼                 ▼                 ▼                     ▼
  • Seletor de      • Filtro Rápido   • Protocolo Core      • Check-in de 10s
    Tempo Hoje:       por Tempo         e Respiração          (Disposição, Postura,
    [30m | 10m | 5m]  (5, 10, 30 min)   Diafragmática         Medida de Cintura)
        │           • Filtro por      • Guias PDF           • Mural Simples de
        ▼             Articulação       Práticos              Constância Real
  [PLAYER QH3X COM CRONÔMETRO + BOTÃO BAIXO IMPACTO / REGRESSÃO EM TEMPO REAL]`}</pre>
                </div>
              </section>

              <section className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="text-xl font-display font-semibold text-slate-900">
                  2. Onboarding Ideal de 3 a 5 Minutos (Zero Atrito + 1ª Vitória Imediata)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-xs font-semibold text-[#0F766E]">Minuto 0:00 – 0:30</div>
                    <div className="font-semibold text-slate-900 mt-1">1. Fase & Contexto</div>
                    <p className="text-xs text-slate-600 mt-1">
                      1 toque: Rotina intensa, Climatério/Menopausa, Pós-parto ou Retomada gradual. Sem pedir peso obrigatório na largada.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-xs font-semibold text-[#0F766E]">Minuto 0:30 – 1:00</div>
                    <div className="font-semibold text-slate-900 mt-1">2. Mapa Articular</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Múltipla escolha: Joelhos, Lombar, Ombros/Cervical, Assoalho Pélvico ou Nenhuma. Define automaticamente o modo padrão do Player.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                    <div className="text-xs font-semibold text-[#0F766E]">Minuto 1:00 – 1:30</div>
                    <div className="font-semibold text-slate-900 mt-1">3. Janela Realista</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Escolha entre 30 min (QH3X completo), 10 min (Dia Corrido) ou 5 min (Destravar), validando que qualquer duração mantém a constância.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#0F766E] bg-[#0F766E]/5">
                    <div className="text-xs font-semibold text-[#0F766E]">Minuto 1:30 – 4:30</div>
                    <div className="font-semibold text-slate-900 mt-1">4. Primeiro Sucesso!</div>
                    <p className="text-xs text-slate-700 mt-1">
                      Prática imediata de Respiração Costal 360° + Destravar Escápulas (em pé ou sentada). A usuária sente alívio real nas costas antes do 5º minuto.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'wireframes' && (
            <div className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-slate-900">
                3. Wireframes Textuais Detalhados das 6 Telas Principais
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Tela 1: Home / Treino do Dia',
                    ascii: `+-------------------------------------------------------+
| Fit em 30        Hoje · Biblioteca · Barriga Zero     |
+-------------------------------------------------------+
| Bom dia, Cláudia · Semana 3 de Constância             |
| "Quando o dia aperta, diminuímos o tempo, não o hábito"|
|                                                       |
| [Seletor Rápido de Tempo Hoje - Botões 48px]          |
| (● 30 min Completo) (○ 10 min Corrido) (○ 5 min Leve) |
|                                                       |
| +---------------------------------------------------+ |
| | FOTO EDITORIAL + SCRIM ESCURO LEGÍVEL             | |
| | Treino do Dia · 10m Bloco Q + 10m H + 10m 3X      | |
| | QH3X Completo: Força Postural & Membros Inferiores| |
| | Adaptação pré-ativada: Baixo Impacto (Joelhos)    | |
| | [ ▶ INICIAR TREINO DE HOJE (Botão Largo 52px) ]   | |
| +---------------------------------------------------+ |
|                                                       |
| Resumo dos 3 Blocos:                                  |
| 01. Bloco Q (10m): Mobilidade Torácica e Quadril      |
| 02. Bloco H (10m): Agachamento e Remada Controlada    |
| 03. Bloco 3X (10m): Intervalos Sem Saltos             |
+-------------------------------------------------------+`,
                  },
                  {
                    title: 'Tela 2: Player de Vídeo com Cronômetro QH3X',
                    ascii: `+-------------------------------------------------------+
| Bloco H (Força) · Exercício 2 de 4           [Fechar] |
+-------------------------------------------------------+
| +---------------------------------------------------+ |
| | VÍDEO DEMONSTRATIVO (Loop Limpo, Sem Distração)   | |
| | Modo Ativo: Regressão Articular (Cadeira)         | |
| | Sentar e Levantar da Cadeira (Box Squat)          | |
| +---------------------------------------------------+ |
|                                                       |
| ADAPTAÇÃO EM TEMPO REAL (Toque para trocar):          |
| [ Padrão ]  [ Baixo Impacto ]  [● Regressão Cadeira ] |
|                                                       |
| CRONÔMETRO TABULAR GRANDE:                            |
|      00:45        [ ⏮ ] [ ⏸ PAUSAR ] [ +15s ] [ ⏭ ]  |
|                                                       |
| • Execução: Toque o assento com controle e suba.      |
| • Respiração: Expire antes de iniciar a subida.       |
| • Proteção: Reduz sobrecarga patelar nos joelhos.     |
|                                                       |
| [ ✓ CONCLUIR TREINO E REGISTRAR SENSAÇÃO (52px) ]     |
+-------------------------------------------------------+`,
                  },
                  {
                    title: 'Tela 3: Biblioteca de Treinos',
                    ascii: `+-------------------------------------------------------+
| Biblioteca QH3X — Escolha pelo seu tempo e corpo hoje |
+-------------------------------------------------------+
| FILTRO DE TEMPO: [Todos] [30 min] [10 min] [5 min]    |
| FILTRO DE FOCO:  [Todos] [Joelhos/Lombar] [Core]      |
|                                                       |
| +---------------------------------------------------+ |
| | [Foto 4:3] 30 min · Bloco Q + H + 3X              | |
| | QH3X Completo: Força Postural & Membros Inferiores| |
| | Opções: Padrão · Baixo Impacto · Cadeira          | |
| |                              [ Abrir Player ▶ ]   | |
| +---------------------------------------------------+ |
| +---------------------------------------------------+ |
| | [Foto 4:3] 10 min · Versão Dia Corrido            | |
| | QH3X Essencial: Destravar & Força Global          | |
| | Equipamento: Apenas peso do corpo                 | |
| |                              [ Abrir Player ▶ ]   | |
| +---------------------------------------------------+ |
+-------------------------------------------------------+`,
                  },
                  {
                    title: 'Tela 4: Progresso e Check-in (Sem Culpa)',
                    ascii: `+-------------------------------------------------------+
| Sua Constância & Evolução Real                        |
+-------------------------------------------------------+
| Semanas Ativas: 3 sem  | Sessões: 11 | Cintura: -2,5cm|
|                                                       |
| +---------------------------------------------------+ |
| | NOVO CHECK-IN DA SEMANA (Leva 20 segundos)        | |
| | Nível de Disposição: [1] [2] [3] [●4] [5]         | |
| | Sensação Postural:   [● Mais Alinhada] [Cansada]  | |
| | Medida Cintura (Opcional): [ 79.5 cm ]            | |
| | [ Salvar Registro de Evolução ]                   | |
| +---------------------------------------------------+ |
|                                                       |
| Histórico de Sessões & Conforto Articular:            |
| • Hoje: QH3X 30m · Modo Baixo Impacto · Confortável   |
| • Ontem: Barriga Zero 10m · Modo Padrão · Confortável |
+-------------------------------------------------------+`,
                  },
                  {
                    title: 'Tela 5: Comunidade (Mural de Constância Simples)',
                    ascii: `+-------------------------------------------------------+
| Comunidade Fit em 30 — Mulheres Reais em Movimento    |
+-------------------------------------------------------+
| Compartilhe sua vitória de hoje (5, 10 ou 30 min):    |
| [ Campo de texto acolhedor...                       ] |
| [ Publicar Minha Constância ]                         |
|                                                       |
| ----------------------------------------------------- |
| Renata Vasconcelos, 46 anos · Climatério · Há 2h      |
| Concluiu: QH3X Completo (30 min) — Modo Baixo Impacto |
| "Trocar para a regressão na cadeira no Bloco H salvou |
|  meu joelho e completei 3 semanas seguidas!"          |
| [ ♥ Apoiar Constância (24) ]                          |
| ----------------------------------------------------- |
| Patrícia Alencar, 52 anos · Foco em Postura · Ontem   |
| Concluiu: Pausa Ativa de 5 Minutos                    |
| "5 minutos bem feitos tiraram o peso da culpa."       |
| [ ♥ Apoiar Constância (31) ]                          |
+-------------------------------------------------------+`,
                  },
                  {
                    title: 'Tela 6: Área de Bônus (Barriga Zero & Guias PDF)',
                    ascii: `+-------------------------------------------------------+
| Protocolo Barriga Zero & Materiais Práticos (PDFs)    |
+-------------------------------------------------------+
| +---------------------------------------------------+ |
| | DESTAQUE: PROTOCOLO BARRIGA ZERO (10 MIN)         | |
| | Respiração costal 360°, controle da pressão       | |
| | intra-abdominal e estabilidade pélvica segura.    | |
| | [ ▶ Praticar Barriga Zero Agora (10 min) ]        | |
| +---------------------------------------------------+ |
|                                                       |
| GUIAS PRÁTICOS DE LEITURA RÁPIDA (PDF / Leitor Web):  |
| 01. Manual Barriga Zero: Respiração e Postura (14p)   |
|     [ Ler Resumo Prático & Checklist ]                |
| 02. Guia de Adaptação Articular: Joelhos e Lombar     |
|     [ Ler Resumo Prático & Checklist ]                |
| 03. Força & Disposição dos 35 aos 55+ (Bloco H)       |
|     [ Ler Resumo Prático & Checklist ]                |
+-------------------------------------------------------+`,
                  },
                ].map((wf) => (
                  <div
                    key={wf.title}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2"
                  >
                    <div className="font-semibold text-slate-900">{wf.title}</div>
                    <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] leading-snug overflow-x-auto">
                      {wf.ascii}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mvp_v2' && (
            <div className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-slate-900">
                4. Funcionalidades Obrigatórias do MVP vs. Versão 2 (Roadmap)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-[#0F766E] bg-[#0F766E]/5 space-y-4">
                  <div className="text-xs font-semibold text-[#0F766E]">
                    ESCOPO OBRIGATÓRIO DO MVP (Lançamento Enxuto e Funcional)
                  </div>
                  <h4 className="text-lg font-display font-semibold text-slate-900">
                    Foco em Hábito Diário, Segurança Articular e Retenção nos Primeiros 5 Minutos
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800">
                    <li>
                      <strong>1. Onboarding de 3 perguntas + 1º Treino de 4 min:</strong> Garante vitória imediata e pré-configura o modo articular.
                    </li>
                    <li>
                      <strong>2. Seletor de Tempo Diário na Home (30 / 10 / 5 min):</strong> Adapta o treino do dia à rotina real sem gerar sensação de falha.
                    </li>
                    <li>
                      <strong>3. Player QH3X com Cronômetro e Toggle de Regressão:</strong> Alternância instantânea entre Padrão, Baixo Impacto e Regressão Articular.
                    </li>
                    <li>
                      <strong>4. Módulo Barriga Zero + Leitor de Guias PDF:</strong> Entrega imediata do bônus prometido com checklists práticos.
                    </li>
                    <li>
                      <strong>5. Check-in Semanal de Disposição, Postura e Cintura:</strong> Métricas que valorizam saúde real em vez de apenas balança.
                    </li>
                    <li>
                      <strong>6. Mural Simples de Constância (Comunidade V1):</strong> Feed único de celebração de treinos concluídos com botão de incentivo ("Apoiar").
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                  <div className="text-xs font-semibold text-slate-500">
                    FICA PARA A VERSÃO 2 (Pós-Validação de Retenção D30)
                  </div>
                  <h4 className="text-lg font-display font-semibold text-slate-900">
                    Funcionalidades Secundárias (Evitar Complexidade Prematura)
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li>
                      <strong>• Integração com Apple Watch / Garmin / Strava:</strong> Desnecessário no MVP; foco deve ser percepção subjetiva de esforço e conforto articular.
                    </li>
                    <li>
                      <strong>• Download Offline Nativo de Vídeos 4K:</strong> No MVP, vídeos curtos em loop otimizado (HLS/MP4 leve) resolvem 95% dos casos.
                    </li>
                    <li>
                      <strong>• Calendário Menstrual / Hormonal Automatizado:</strong> Na V1 a própria usuária escolhe 5, 10 ou 30 min conforme sua energia do dia.
                    </li>
                    <li>
                      <strong>• Chat Privado (DM), Grupos por Cidade e Comentários Aninhados:</strong> Aumenta custo de moderação; o Mural de Constância simples é mais acolhedor.
                    </li>
                    <li>
                      <strong>• Calculadora de Macronutrientes / Dieta Restritiva:</strong> Fora do escopo central do método QH3X.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'microcopy' && (
            <div className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-slate-900">
                5. Linguagem de Interface (Tom de Voz & Microcopy para Mulheres 30–55)
              </h3>
              <p>
                Diretriz central: <strong>Madura, respeitosa, clara e baseada em biomecânica real.</strong> Nunca infantilizar, nunca usar jargão agressivo de fisiculturismo ("no pain no gain") e jamais usar promessas pseudocientíficas.
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-900 text-xs font-semibold border-b border-slate-200">
                      <th className="p-4">Contexto na Tela</th>
                      <th className="p-4 text-red-700">❌ Linguagem Proibida (Evitar Sempre)</th>
                      <th className="p-4 text-[#0F766E]">✅ Microcopy Fit em 30 (Aprovada)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Dia corrido / Falta de tempo</td>
                      <td className="p-4 text-slate-500">"Sem desculpas! Quem quer dá um jeito de treinar 1 hora."</td>
                      <td className="p-4 text-slate-900 font-medium">"Dia cheio por aí? Faça a versão de 10 minutos hoje. Reduzimos o tempo, nunca o seu cuidado."</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Bloco 3X (Intervalos)</td>
                      <td className="p-4 text-slate-500">"Ative o receptor TRPV1 e queime gordura por 48 horas seguidas!"</td>
                      <td className="p-4 text-slate-900 font-medium">"Bloco 3X: Estímulo cardiorrespiratório inteligente e sem saltos para melhorar seu fôlego e disposição diária."</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Protocolo Barriga Zero</td>
                      <td className="p-4 text-slate-500">"Feche sua diástase em 7 dias e conquiste a barriga negativa!"</td>
                      <td className="p-4 text-slate-900 font-medium">"Controle abdominal profundo: organize a pressão interna, fortaleça o transverso e melhore sua estabilidade postural."</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-slate-900">Botão de Regressão Articular</td>
                      <td className="p-4 text-slate-500">"Modo Iniciante / Versão Fraca"</td>
                      <td className="p-4 text-slate-900 font-medium">"Regressão Articular (Proteção de Joelhos e Lombar) — Mesmo estímulo muscular com menor sobrecarga."</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-semibold text-slate-900">
                  6. Estrutura de Dados Mínima do MVP (Usuária, Treinos, Sessões e Check-ins)
                </h3>
                <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                  <FileCode2 className="w-4 h-4" /> PostgreSQL / Firestore / TypeScript Ready
                </span>
              </div>
              <pre className="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto">
                {`// 1. USUÁRIA (users)
interface UserProfile {
  id: string;
  name: string;
  ageRange: '30-37' | '38-45' | '46-55';
  lifeStage: 'rotina_intensa' | 'pos_parto' | 'climatério_menopausa' | 'retomada_gradual';
  jointSensitivities: Array<'nenhuma' | 'joelhos' | 'lombar' | 'ombros_cervical' | 'assoalho_pelvico'>;
  preferredDuration: 5 | 10 | 30;
  defaultExecutionMode: 'standard' | 'low_impact' | 'regression';
  onboardingCompleted: boolean;
  firstWinCompleted: boolean;
}

// 2. TREINOS & BLOCOS QH3X (workouts & workout_exercises)
interface Workout {
  id: string;
  title: string;
  category: 'qh3x_diario' | 'dia_corrido' | 'barriga_zero' | 'mobilidade_postura';
  durationMinutes: 5 | 10 | 30;
  exercises: Array<{
    id: string;
    order: number;
    block: 'Q' | 'H' | '3X' | 'CORE'; // Q=Movimento, H=Força, 3X=Intervalos
    durationSeconds: number;
    restSeconds: number;
    variations: {
      standard: ExerciseVariation;   // Progressão Padrão
      low_impact: ExerciseVariation; // Sem Saltos
      regression: ExerciseVariation; // Cadeira / Articulações Protegidas
    };
  }>;
}

// 3. SESSÕES CONCLUÍDAS (workout_sessions)
interface WorkoutSessionLog {
  id: string;
  userId: string;
  workoutId: string;
  completedAt: string; // ISO-8601
  durationMinutes: number;
  executionModeUsed: 'standard' | 'low_impact' | 'regression';
  perceivedEffort: 'leve' | 'moderado_bom' | 'desafiador';
  jointComfort: 'confortavel' | 'adaptei_movimento' | 'leve_tensao';
}

// 4. CHECK-INS SEMANAIS DE EVOLUÇÃO (daily_checkins)
interface DailyCheckIn {
  id: string;
  userId: string;
  date: string;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  postureFeeling: 'alinhada' | 'cansada' | 'rigida';
  waistMeasureCm?: number; // Opcional, foco em redução gradual de medidas
  notes: string;
}`}
              </pre>
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-display font-semibold text-slate-900">
                    7. Prompt Pronto para a Próxima Etapa (Geração / Expansão de Código)
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Copie este prompt para continuar evoluindo o protótipo ou integrar banco de dados e autenticação.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white font-semibold text-xs flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-4 h-4" />
                      Prompt Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar Prompt Pronto
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                {PROMPT_PROXIMA_ETAPA}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
