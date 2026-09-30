import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  FileText,
  Layers,
  Minimize2,
  Play,
  Printer,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import thumbBarrigaZeroImg from '../assets/images/thumb_barriga_zero_1790801092923.jpg';

interface BarrigaZeroPdfEmbedProps {
  onStartBasicProtocol: () => void;
  onStartIntermediateProtocol: () => void;
}

export const BarrigaZeroPdfEmbed: React.FC<BarrigaZeroPdfEmbedProps> = ({
  onStartBasicProtocol,
  onStartIntermediateProtocol,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'single_page' | 'continuous'>('continuous');
  const [zoomLevel, setZoomLevel] = useState<'normal' | 'large'>('normal');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalPages = 10;

  const pageTitles: { page: number; title: string; subtitle: string }[] = [
    { page: 1, title: 'Capa — Barriga Zero', subtitle: 'Protocolo prático de controle abdominal' },
    { page: 2, title: 'Causas & O Que Pode Fazer', subtitle: 'Volume abdominal: Pode vs. Não Pode' },
    { page: 3, title: 'Respiração e Pressão', subtitle: 'Exercício base: Expiração com ativação suave' },
    { page: 4, title: 'Protocolo Básico (8–10 min)', subtitle: 'Iniciante ou pós-parto autorizado (6 passos)' },
    { page: 5, title: 'Protocolo Intermediário', subtitle: 'Progressão de estabilidade e core (6 passos)' },
    { page: 6, title: 'Progressões e Regressões', subtitle: 'Sinais de evolução vs. quando regredir' },
    { page: 7, title: 'Integração QH3X & Alimentação', subtitle: 'Rotina de treinos e hábitos anti-distensão' },
    { page: 8, title: 'Inchaço e Intestino', subtitle: '4 fatores de observação e retenção' },
    { page: 9, title: 'Perguntas Frequentes (FAQ)', subtitle: 'Crunch, cinta, hipopressivos e prazos' },
    { page: 10, title: 'Sinais de Alerta', subtitle: 'Quando procurar fisioterapeuta pélvica ou médico' },
  ];

  const handlePageJump = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (viewMode === 'continuous') {
      const el = document.getElementById(`bz-pdf-page-${pageNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const renderPage = (pageNum: number) => {
    const textScale = zoomLevel === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base';

    switch (pageNum) {
      case 1:
        return (
          <div
            id="bz-pdf-page-1"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="p-8 sm:p-12 space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
                <span>DOCUMENTO OFICIAL · PROTOCOLO BARRIGA ZERO</span>
                <span>PÁGINA 1 / 10</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display font-semibold text-[#9A4329] tracking-tight pt-2">
                Barriga Zero
              </h2>
              <p className="text-lg sm:text-xl font-display italic text-[#3D3530]">
                Protocolo prático de controle abdominal, postura e movimento
              </p>
              <div className={`space-y-4 text-[#3D3530] max-w-2xl leading-relaxed ${textScale}`}>
                <p>
                  Um protocolo simples e seguro para melhorar o controle da parede abdominal, a postura e a função do core.
                </p>
                <p>
                  Sem promessas milagrosas. Com foco em consistência, respiração e movimento inteligente.
                </p>
                <p>
                  Feito para mulheres que querem se sentir mais fortes, estáveis e confortáveis no próprio corpo.
                </p>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 w-full bg-[#E5DEC9]">
              <img
                src={thumbBarrigaZeroImg}
                alt="Mulher praticando alongamento e controle postural em ambiente iluminado"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div
            id="bz-pdf-page-2"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · FUNDAMENTOS</span>
              <span>PÁGINA 2 / 10</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#9A4329]">
                O que realmente causa volume abdominal
              </h2>
              <p className={`text-[#3D3530] ${textScale}`}>
                A aparência da barriga quase nunca tem uma única causa. Os fatores mais comuns são:
              </p>

              <div className="bg-[#EADFD7] rounded-xl p-6">
                <ul className={`space-y-2 text-[#2A2421] list-disc pl-5 ${textScale}`}>
                  <li>Gordura subcutânea e visceral</li>
                  <li>Distensão intestinal, gases ou constipação</li>
                  <li>Retenção de líquidos</li>
                  <li>Postura (anteversão pélvica ou caixa torácica projetada)</li>
                  <li>Baixa coordenação ou força do core</li>
                  <li>Diástase dos retos abdominais</li>
                  <li>Pós-parto recente</li>
                  <li>Mudanças hormonais da perimenopausa e menopausa</li>
                  <li>Estresse, sono ruim e alimentação desorganizada</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-display italic text-[#3D3530]">
                O que este protocolo pode e não pode fazer
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#E6EDE3] border border-[#C9D8C3] rounded-xl p-6 space-y-3">
                  <div className="text-xs font-bold tracking-wider uppercase text-[#2F5233]">
                    PODE:
                  </div>
                  <ul className={`space-y-2 text-[#2A2421] list-disc pl-5 ${textScale}`}>
                    <li>Melhorar o controle da parede abdominal</li>
                    <li>Reduzir sensação de peso e abaulamento</li>
                    <li>Ajudar na postura e na estabilidade do tronco</li>
                    <li>Diminuir desconforto lombar em muitos casos</li>
                    <li>Preparar o corpo para treinos mais desafiadores com segurança</li>
                    <li>
                      Apoiar a redução de circunferência ao longo do tempo quando houver perda global de gordura
                    </li>
                  </ul>
                </div>

                <div className="bg-[#EADFD7] border border-[#DECBC0] rounded-xl p-6 space-y-3">
                  <div className="text-xs font-bold tracking-wider uppercase text-[#9A4329]">
                    NÃO PODE:
                  </div>
                  <ul className={`space-y-2 text-[#2A2421] list-disc pl-5 ${textScale}`}>
                    <li>Eliminar gordura localizada em poucos dias</li>
                    <li>“Fechar” qualquer diástase de forma garantida</li>
                    <li>
                      Substituir avaliação médica ou fisioterapia pélvica quando houver sintomas importantes
                    </li>
                    <li>
                      Compensar privação de sono, alimentação muito restritiva ou estresse crônico
                    </li>
                  </ul>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4A403A] pt-2 leading-relaxed border-t border-[#DDD5C7]">
                O treino sozinho não “seca” a barriga de forma localizada. A redução de gordura acontece de forma global, influenciada por alimentação, movimento, sono e genética. O que este protocolo faz bem é melhorar controle, postura e função — o que já muda a aparência e o conforto de muita gente.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div
            id="bz-pdf-page-3"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · TÉCNICA BASE</span>
              <span>PÁGINA 3 / 10</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#9A4329]">
                Respiração e pressão: a base de tudo
              </h2>
              <p className="text-base sm:text-lg text-[#2A2421] font-medium">
                A pressão intra-abdominal não precisa ser eliminada. Ela precisa ser controlada.
              </p>
              <p className={`text-[#4A403A] ${textScale}`}>
                <strong>Regra prática:</strong> respire, mantenha o controle e pare se sentir abaulamento forte, dor, peso vaginal ou perda urinária.
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#9A4329]">
                Exercício base – Expiração com ativação suave
              </h3>

              <div className="border-l-2 border-[#9A4329] pl-6 space-y-5">
                {[
                  'Deite com os joelhos flexionados e pés no chão.',
                  'Inspire pelo nariz sem elevar demais os ombros.',
                  'Expire lentamente pela boca.',
                  'Durante a expiração, imagine a parte inferior do abdômen se aproximando suavemente da coluna (sem sugar com força máxima).',
                  'Relaxe completamente na inspiração.',
                ].map((instruction, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="font-display text-2xl font-semibold text-[#9A4329] shrink-0 leading-none mt-0.5">
                      {idx + 1}
                    </span>
                    <p className={`text-[#2A2421] ${textScale}`}>{instruction}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <p className="font-semibold text-[#2A2421]">Faça 5 a 10 repetições.</p>
                <button
                  type="button"
                  onClick={onStartBasicProtocol}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#9A4329] hover:bg-[#7F351F] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Praticar com Cronômetro Guiado
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div
            id="bz-pdf-page-4"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · FASE 1</span>
              <span>PÁGINA 4 / 10</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#9A4329]">
                Protocolo Básico (iniciante ou pós-parto autorizado)
              </h2>
              <p className={`text-[#3D3530] ${textScale}`}>
                Faça 3 a 5 vezes por semana. Duração aproximada: <strong>8–10 minutos</strong>.
              </p>
            </div>

            <div className="border-l-2 border-[#9A4329] pl-6 space-y-5">
              {[
                'Respiração tridimensional – 5 ciclos',
                'Expiração com ativação suave – 5 a 8 repetições',
                'Ativação do assoalho pélvico – 5 contrações de 3 a 5 segundos (relaxe completamente entre elas)',
                'Deslizamento de calcanhar (heel slide) – 2 séries de 6 a 10 por lado',
                'Ponte de glúteos – 2 séries de 10 a 15',
                'Dead bug bem regressivo (só braços ou calcanhar tocando o solo) – 2 séries de 6 a 8 por lado',
              ].map((stepText, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="font-display text-2xl font-semibold text-[#9A4329] shrink-0 leading-none mt-0.5">
                    {idx + 1}
                  </span>
                  <p className={`text-[#2A2421] ${textScale}`}>{stepText}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#9A4329]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs sm:text-sm italic text-[#3D3530]">
                Foque em qualidade, não em quantidade. Se aparecer abaulamento, reduza a amplitude ou volte para a respiração.
              </p>
              <button
                type="button"
                onClick={onStartBasicProtocol}
                className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Abrir Protocolo Básico no Player (8–10 min)
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div
            id="bz-pdf-page-5"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · FASE 2</span>
              <span>PÁGINA 5 / 10</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#9A4329]">
                Protocolo Intermediário
              </h2>
              <p className={`text-[#3D3530] ${textScale}`}>
                Quando o básico estiver confortável e sem sintomas:
              </p>
            </div>

            <div className="border-l-2 border-[#9A4329] pl-6 space-y-5">
              {[
                'Respiração + ativação suave – 5 ciclos',
                'Dead bug completo (braços e pernas controlados) – 2 a 3 séries de 6 a 8 por lado',
                'Pallof press leve (elástico ou cabo) – 2 séries de 8 a 12 por lado',
                'Prancha inclinada (mãos em superfície elevada) – 2 séries de 15 a 25 segundos',
                'Caminhada lateral com miniband ou suitcase carry leve – 2 séries de 20 a 30 segundos por lado',
                'Ponte de glúteos com pausa no topo – 2 séries de 10 a 12',
              ].map((stepText, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <span className="font-display text-2xl font-semibold text-[#9A4329] shrink-0 leading-none mt-0.5">
                    {idx + 1}
                  </span>
                  <p className={`text-[#2A2421] ${textScale}`}>{stepText}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#DDD5C7] flex justify-end">
              <button
                type="button"
                onClick={onStartIntermediateProtocol}
                className="min-h-[46px] px-5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Abrir Protocolo Intermediário no Player
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div
            id="bz-pdf-page-6"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · SEGURANÇA E AUTOAVALIAÇÃO</span>
              <span>PÁGINA 6 / 10</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#9A4329]">
              Progressões e regressões
            </h2>

            <div className="bg-[#E6EDE3] border border-[#C9D8C3] rounded-xl p-6">
              <p className={`text-[#2A2421] leading-relaxed ${textScale}`}>
                <strong>Sinal de progresso:</strong> menos abaulamento, melhor controle na expiração, mais tolerância a caminhada e treino, menos dor lombar, sensação de estabilidade.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-[#2A2421]">
                Regredisse imediatamente se houver:
              </h3>

              <div className="divide-y divide-[#DDD5C7] border-t border-b border-[#DDD5C7]">
                {[
                  'Abaulamento ou “doming” persistente',
                  'Dor abdominal ou lombar',
                  'Sensação de peso ou pressão vaginal',
                  'Perda urinária',
                  'Respiração presa',
                  'Dor na cicatriz de cesariana',
                ].map((item, idx) => (
                  <div key={idx} className={`py-3.5 flex items-center gap-3 ${textScale}`}>
                    <span className="w-2 h-2 rounded-full bg-[#9A4329] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#9A4329]/40">
              <p className="text-xs sm:text-sm italic text-[#3D3530]">
                Progressão segura: aumente séries ou tempo apenas quando a técnica estiver estável e sem sintomas.
              </p>
            </div>
          </div>
        );

      case 7:
        return (
          <div
            id="bz-pdf-page-7"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · ROTINA INTEGRADA</span>
              <span>PÁGINA 7 / 10</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display font-semibold text-[#9A4329]">
                Como integrar com o QH3X
              </h2>

              <div className="space-y-3">
                {[
                  'Antes do treino: 3 a 5 minutos de respiração + ativação (ótimo para “ligar” o core).',
                  'Depois do treino: 5 a 10 minutos do protocolo completo.',
                  'Dias sem treino: sessão curta de respiração + mobilidade + ponte.',
                  'Pós-parto: só comece após liberação médica e avance devagar.',
                ].map((box, i) => (
                  <div
                    key={i}
                    className={`bg-[#E6EDE3] border border-[#C9D8C3] rounded-xl p-4 text-[#2A2421] ${textScale}`}
                  >
                    {box}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#9A4329]">
                Alimentação simples que ajuda
              </h3>
              <p className={`text-[#3D3530] ${textScale}`}>
                Não é dieta restritiva. São hábitos que reduzem distensão e apoiam a composição corporal:
              </p>

              <div className="bg-[#EADFD7] rounded-xl p-6">
                <ul className={`space-y-2.5 text-[#2A2421] list-disc pl-5 ${textScale}`}>
                  <li>Proteína em todas as refeições principais</li>
                  <li>Frutas, verduras e fibras todos os dias</li>
                  <li>Água ao longo do dia</li>
                  <li>
                    Reduzir álcool e alimentos que individualmente aumentam gases ou inchaço
                  </li>
                  <li>
                    Evitar longos períodos em jejum extremo se isso piorar energia ou sono
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div
            id="bz-pdf-page-8"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-8 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · DIGESTÃO E RETENÇÃO</span>
              <span>PÁGINA 8 / 10</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#9A4329]">
                Inchaço e intestino
              </h2>
              <p className="text-base sm:text-lg text-[#2A2421]">
                Muitas “barrigas” são mais intestino e retenção do que gordura.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#5A4E46]">
                OBSERVE:
              </div>
              <div className="divide-y divide-[#DDD5C7] border-t border-b border-[#DDD5C7]">
                {[
                  'Regularidade intestinal',
                  'Alimentos que aumentam gases',
                  'Consumo de sódio e álcool',
                  'Qualidade do sono',
                ].map((obs, idx) => (
                  <div key={idx} className={`py-3.5 flex items-center gap-3 ${textScale}`}>
                    <span className="w-2 h-2 rounded-full bg-[#9A4329] shrink-0" />
                    <span>{obs}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#EADFD7] border-t-2 border-[#9A4329] rounded-b-xl p-5 text-center">
              <p className="text-sm sm:text-base italic font-medium text-[#2A2421]">
                Se o inchaço for intenso, persistente ou acompanhado de dor, procure avaliação médica.
              </p>
            </div>
          </div>
        );

      case 9:
        return (
          <div
            id="bz-pdf-page-9"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-6 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · DÚVIDAS COMUNS</span>
              <span>PÁGINA 9 / 10</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#9A4329]">
              FAQ
            </h2>

            <div className="space-y-4">
              <div className="bg-[#E6EDE3] rounded-xl p-6 space-y-2">
                <h3 className="text-lg sm:text-xl font-display italic font-semibold text-[#2A2421]">
                  Posso fazer crunch?
                </h3>
                <p className={`text-[#2A2421] ${textScale}`}>
                  Só se não houver abaulamento, dor ou pressão pélvica. Comece com versões controladas e priorize o core profundo.
                </p>
              </div>

              <div className="bg-[#EADFD7] rounded-xl p-6 space-y-2">
                <h3 className="text-lg sm:text-xl font-display italic font-semibold text-[#2A2421]">
                  Cinta funciona?
                </h3>
                <p className={`text-[#2A2421] ${textScale}`}>
                  Pode dar suporte temporário, mas não substitui o treino de controle.
                </p>
              </div>

              <div className="bg-[#E6EDE3] rounded-xl p-6 space-y-2">
                <h3 className="text-lg sm:text-xl font-display italic font-semibold text-[#2A2421]">
                  Hipopressivos resolvem tudo?
                </h3>
                <p className={`text-[#2A2421] ${textScale}`}>
                  Não. São uma ferramenta, não uma solução universal.
                </p>
              </div>

              <div className="bg-[#EADFD7] rounded-xl p-6 space-y-2">
                <h3 className="text-lg sm:text-xl font-display italic font-semibold text-[#2A2421]">
                  Quando vou ver resultado?
                </h3>
                <p className={`text-[#2A2421] ${textScale}`}>
                  Melhora de controle e postura pode aparecer em 2–4 semanas de consistência. Mudança de circunferência depende de perda global de gordura e leva mais tempo.
                </p>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div
            id="bz-pdf-page-10"
            className="bg-[#F3EFE6] text-[#2A2421] border border-[#DDD5C7] rounded-2xl p-8 sm:p-12 space-y-6 shadow-sm"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#7C6A5E]">
              <span>BARRIGA ZERO · ORIENTAÇÃO CLÍNICA</span>
              <span>PÁGINA 10 / 10</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-display font-semibold text-[#9A4329]">
                Sinais de alerta – procure profissional
              </h2>
              <p className={`text-[#3D3530] ${textScale}`}>
                Procure fisioterapeuta pélvica ou médico se houver:
              </p>
            </div>

            <div className="space-y-2.5">
              {[
                'Diástase sintomática persistente',
                'Incontinência',
                'Dor pélvica',
                'Sensação de peso vaginal',
                'Suspeita de prolapso ou hérnia',
                'Pós-parto recente com dúvida de progressão',
                'Dor ou abaulamento que pioram com o exercício',
              ].map((alertItem, idx) => (
                <div
                  key={idx}
                  className={`bg-[#EADFD7] rounded-lg px-5 py-3.5 text-[#2A2421] font-medium ${textScale}`}
                >
                  {alertItem}
                </div>
              ))}
            </div>

            <div className="bg-[#9A4329] text-white rounded-xl p-6 mt-4">
              <p className="text-sm sm:text-base font-medium leading-relaxed">
                Este protocolo é educativo e de apoio. Não substitui avaliação individualizada.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950/95 overflow-y-auto p-4 sm:p-8'
          : 'space-y-6'
      }
    >
      <div
        className={`bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm ${
          isFullscreen ? 'max-w-6xl mx-auto' : ''
        }`}
      >
        {/* Top Embedded PDF Toolbar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="w-5 h-5 text-teal-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-semibold truncate">
                Barriga-Zero-Protocolo-Oficial.pdf
              </div>
              <div className="text-[11px] text-slate-400">
                Documento Integrado · 10 Páginas · Leitura & Prática Direta no App
              </div>
            </div>
          </div>

          {/* Reader Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('continuous')}
                className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  viewMode === 'continuous'
                    ? 'bg-[#0F766E] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Rolagem (10 págs)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('single_page')}
                className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  viewMode === 'single_page'
                    ? 'bg-[#0F766E] text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Página por Página
              </button>
            </div>

            {/* Font Size / Zoom Toggle */}
            <button
              type="button"
              onClick={() => setZoomLevel((z) => (z === 'normal' ? 'large' : 'normal'))}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
              title="Alternar tamanho do texto para leitura confortável"
            >
              {zoomLevel === 'normal' ? (
                <>
                  <ZoomIn className="w-4 h-4" />
                  Fonte Maior
                </>
              ) : (
                <>
                  <ZoomOut className="w-4 h-4" />
                  Fonte Padrão
                </>
              )}
            </button>

            {/* Print / Save PDF */}
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              Imprimir / Salvar
            </button>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  Sair da Tela Cheia
                </>
              ) : (
                <>
                  <Expand className="w-4 h-4" />
                  Tela Cheia
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main PDF Viewer Body: Sidebar Thumbnails/Index + Document Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-100">
          {/* Left Page Index Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white p-4 space-y-2 max-h-[320px] lg:max-h-[780px] overflow-y-auto">
            <div className="text-xs font-semibold text-slate-500 px-2 py-1">
              Sumário do PDF (10 Páginas)
            </div>
            {pageTitles.map((item) => {
              const active = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handlePageJump(item.page)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors flex items-start gap-3 min-h-[52px] ${
                    active
                      ? 'border-[#9A4329] bg-[#F3EFE6]/70 text-slate-900'
                      : 'border-transparent hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-semibold px-2 py-1 rounded-md shrink-0 ${
                      active
                        ? 'bg-[#9A4329] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String(item.page).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      {item.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Right PDF Pages Viewport */}
          <div className="lg:col-span-8 xl:col-span-9 p-4 sm:p-8 max-h-[780px] overflow-y-auto space-y-8">
            {viewMode === 'single_page' ? (
              <div className="space-y-6">
                {renderPage(currentPage)}

                {/* Single-Page Bottom Pagination Controls */}
                <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="min-h-[44px] px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Página Anterior
                  </button>

                  <span className="font-mono text-xs font-semibold text-slate-700 tabular-nums">
                    Página {currentPage} de {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1.5"
                  >
                    Próxima Página
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((pageNum) => (
                  <div
                    key={pageNum}
                    onMouseEnter={() => setCurrentPage(pageNum)}
                  >
                    {renderPage(pageNum)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
