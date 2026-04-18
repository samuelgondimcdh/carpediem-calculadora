import { useState, useMemo, useEffect } from 'react';

const IMOVEIS_INICIAIS = [
  {
    id: 'wgratitude',
    nome: 'Wgratitude 1006',
    bairro: 'Manaíra',
    preco: 800000,
    quartos: 3,
    receitaMensal: 106311 / 12,
    receitaAnual: 106311,
    condominio: 1400,
    iptu: 300,
    internet: 99,
    energia: 650,
    outros: 150,
    pctCarta: 100,
  },
  {
    id: 'mardisa',
    nome: 'Mardisa Design 807',
    bairro: 'Cabo Branco',
    preco: 800000,
    quartos: 2,
    receitaMensal: 70124 / 12,
    receitaAnual: 70124,
    condominio: 900,
    iptu: 250,
    internet: 99,
    energia: 450,
    outros: 150,
    pctCarta: 100,
  },
  {
    id: 'altagarden',
    nome: 'AltaGarden 108',
    bairro: 'Bessa',
    preco: 470000,
    quartos: 1,
    receitaMensal: 53768 / 12,
    receitaAnual: 53768,
    condominio: 500,
    iptu: 100,
    internet: 99,
    energia: 280,
    outros: 150,
    pctCarta: 100,
  },
  {
    id: 'beachhaus',
    nome: 'BeachHaus 411',
    bairro: 'Bessa',
    preco: 680000,
    quartos: 1,
    receitaMensal: 51623 / 12,
    receitaAnual: 51623,
    condominio: 550,
    iptu: 120,
    internet: 99,
    energia: 280,
    outros: 150,
    pctCarta: 100,
  },
];

// Paleta
const C = {
  navy: '#0A2540',
  navyMed: '#1E3A5F',
  navyMuted: '#4A5568',
  slate: '#94A3B8',
  orange: '#E85C3F',
  orangeDark: '#C84A2E',
  orangeLight: '#FCE8E1',
  orangeBg: '#FEF4EF',
  navyBg: '#F0F4F9',
  navyTint: '#E8EEF5',
  bg: '#FAFAF7',
  surface: '#FFFFFF',
  positive: '#1F7A4C',
  negative: '#B84242',
  border: 'rgba(10, 37, 64, 0.08)',
  borderMed: 'rgba(10, 37, 64, 0.14)',
};

const FONT = "'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif";

const fmt = (v) => {
  if (v === null || v === undefined || isNaN(v)) return '—';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);
};

const fmtNum = (v, dec = 1) => {
  if (v === null || v === undefined || isNaN(v)) return '—';
  return v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
};

function Slider({ label, value, onChange, min, max, step = 1, suffix = '', fmt: fmtFn }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', color: C.navyMuted, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: '20px', fontWeight: 700, color: C.navy, letterSpacing: '-0.01em' }}>
          {fmtFn ? fmtFn(value) : `${value}${suffix}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: C.orange, cursor: 'pointer' }}
      />
    </div>
  );
}

function InputMoney({ label, value, onChange, hint }) {
  const [focused, setFocused] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const formatted = value != null ? value.toLocaleString('pt-BR') : '0';

  const handleFocus = (e) => {
    setFocused(true);
    setInputVal(value === 0 ? '' : String(value));
    e.target.style.borderColor = C.orange;
  };

  const handleBlur = (e) => {
    setFocused(false);
    e.target.style.borderColor = C.border;
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    setInputVal(raw);
    const cleaned = raw.replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
    const num = parseFloat(cleaned);
    if (!isNaN(num)) onChange(num);
    else if (raw === '') onChange(0);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '11px', color: C.navyMuted, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', color: C.slate, fontWeight: 500 }}>R$</span>
        <input
          type="text"
          value={focused ? inputVal : formatted}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            width: '100%',
            padding: '12px 14px 12px 40px',
            borderRadius: '8px',
            border: `1.5px solid ${C.border}`,
            fontSize: '17px',
            fontFamily: FONT,
            backgroundColor: C.surface,
            color: C.navy,
            fontWeight: 600,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
        />
      </div>
      {hint && <div style={{ fontSize: '11px', color: C.slate, marginTop: '6px', fontWeight: 400 }}>{hint}</div>}
    </div>
  );
}

function InputNumber({ label, value, onChange, suffix }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '11px', color: C.navyMuted, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ position: 'relative' }}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          style={{
            width: '100%',
            padding: '12px 14px',
            paddingRight: suffix ? '66px' : '14px',
            borderRadius: '8px',
            border: `1.5px solid ${C.border}`,
            fontSize: '17px',
            fontFamily: FONT,
            backgroundColor: C.surface,
            color: C.navy,
            fontWeight: 600,
            boxSizing: 'border-box',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => e.target.style.borderColor = C.orange}
          onBlur={(e) => e.target.style.borderColor = C.border}
        />
        {suffix && (
          <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: C.slate, fontWeight: 500 }}>{suffix}</span>
        )}
      </div>
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div style={{
      display: 'inline-flex',
      backgroundColor: C.navyBg,
      borderRadius: '8px',
      padding: '4px',
      gap: '3px',
    }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            border: 'none',
            padding: '8px 18px',
            borderRadius: '5px',
            backgroundColor: value === opt.value ? C.navy : 'transparent',
            color: value === opt.value ? C.surface : C.navyMuted,
            fontSize: '13px',
            fontWeight: value === opt.value ? 600 : 500,
            cursor: 'pointer',
            fontFamily: FONT,
            transition: 'all 0.15s ease',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CardRow({ label, value, strong, negative, positive, small }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: small ? '4px 0' : '6px 0',
      fontSize: small ? '12px' : '13px',
      gap: '8px',
    }}>
      <span style={{ color: small ? C.slate : C.navyMuted, fontWeight: 400 }}>{label}</span>
      <span style={{
        fontWeight: strong ? 700 : 500,
        color: negative ? C.negative : positive ? C.positive : C.navy,
        fontSize: strong ? '15px' : small ? '12px' : '13px',
        textAlign: 'right',
        letterSpacing: strong ? '-0.01em' : 0,
      }}>
        {value}
      </span>
    </div>
  );
}

function InlineEdit({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '86px',
        border: `1px solid ${C.border}`,
        borderRadius: '5px',
        padding: '3px 8px',
        fontSize: '12px',
        fontFamily: FONT,
        fontWeight: 600,
        textAlign: 'right',
        color: C.navy,
        backgroundColor: C.bg,
        outline: 'none',
      }}
      onFocus={(e) => e.target.style.borderColor = C.orange}
      onBlur={(e) => e.target.style.borderColor = C.border}
    />
  );
}

function InlineEditText({ value, onChange, width = 120, size = 'small' }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: `${width}px`,
        border: `1px solid ${C.border}`,
        borderRadius: '5px',
        padding: size === 'large' ? '6px 10px' : '3px 8px',
        fontSize: size === 'large' ? '15px' : '12px',
        fontFamily: FONT,
        fontWeight: size === 'large' ? 700 : 600,
        color: C.navy,
        backgroundColor: C.bg,
        outline: 'none',
      }}
      onFocus={(e) => e.target.style.borderColor = C.orange}
      onBlur={(e) => e.target.style.borderColor = C.border}
    />
  );
}

function InlineEditMoney({ value, onChange, width = 120 }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', fontSize: '11px', color: C.slate, fontWeight: 500, pointerEvents: 'none' }}>R$</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: `${width}px`,
          border: `1px solid ${C.border}`,
          borderRadius: '5px',
          padding: '3px 8px 3px 30px',
          fontSize: '12px',
          fontFamily: FONT,
          fontWeight: 600,
          textAlign: 'right',
          color: C.navy,
          backgroundColor: C.bg,
          outline: 'none',
        }}
        onFocus={(e) => e.target.style.borderColor = C.orange}
        onBlur={(e) => e.target.style.borderColor = C.border}
      />
    </div>
  );
}

function SectionLabel({ children, accent }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '22px',
    }}>
      <div style={{ width: '24px', height: '2px', backgroundColor: accent ? C.orange : C.navy }} />
      <div style={{
        fontSize: '11px',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: C.navy,
        fontWeight: 700,
      }}>
        {children}
      </div>
    </div>
  );
}

export default function Calculadora() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap';
    document.head.appendChild(link);
  }, []);

  const [valorCarta, setValorCarta] = useState(600000);
  const [parcelaCarta, setParcelaCarta] = useState(4200);
  const [parcelasRestantes, setParcelasRestantes] = useState(180);
  const [status, setStatus] = useState('contemplada');
  const [lanceContemplar, setLanceContemplar] = useState(0);

  const CARPEDIEM_FEE = 20;

  const [imoveis, setImoveis] = useState(IMOVEIS_INICIAIS);

  const calculos = useMemo(() => {
    return imoveis.map(im => {
      const pctCarta = im.pctCarta / 100;
      const valorCartaAlocado = valorCarta * pctCarta;
      const parcelaAlocada = parcelaCarta * pctCarta;
      const lanceAlocado = status === 'em_andamento' ? lanceContemplar * pctCarta : 0;

      const complemento = Math.max(0, im.preco - valorCartaAlocado);
      const sobraCarta = Math.max(0, valorCartaAlocado - im.preco);
      const desembolsoInicial = complemento + lanceAlocado;

      const totalParcelasRestantes = parcelaAlocada * parcelasRestantes;

      const taxaCarp = im.receitaMensal * CARPEDIEM_FEE / 100;
      const custosOperacionais = taxaCarp + im.condominio + im.iptu + im.internet + im.energia + im.outros;
      const receitaLiqOperacional = im.receitaMensal - custosOperacionais;

      const cashflowMensal = receitaLiqOperacional - parcelaAlocada;
      const cashflowAnual = cashflowMensal * 12;

      const paybackAnos = cashflowMensal > 0 ? desembolsoInicial / cashflowAnual : null;
      const yieldBruto = (im.receitaAnual / im.preco) * 100;
      const yieldEntrada = (cashflowMensal > 0 && desembolsoInicial > 0) ? (cashflowAnual / desembolsoInicial) * 100 : null;
      const coberturaParcela = parcelaAlocada > 0 ? (receitaLiqOperacional / parcelaAlocada) * 100 : null;
      const paga = cashflowMensal >= 0;

      return {
        ...im,
        valorCartaAlocado, parcelaAlocada, lanceAlocado,
        complemento, sobraCarta, desembolsoInicial,
        totalParcelasRestantes,
        taxaCarp, custosOperacionais, receitaLiqOperacional,
        cashflowMensal, cashflowAnual, paybackAnos, yieldBruto, yieldEntrada, coberturaParcela, paga,
      };
    });
  }, [imoveis, valorCarta, parcelaCarta, parcelasRestantes, status, lanceContemplar]);

  const updateImovel = (id, field, value) => {
    setImoveis(prev => prev.map(im => {
      if (im.id !== id) return im;
      const isTextField = field === 'nome' || field === 'bairro';
      const v = isTextField ? value : (Number(value) || 0);
      const update = { [field]: v };
      if (field === 'receitaMensal') {
        update.receitaAnual = v * 12;
      }
      return { ...im, ...update };
    }));
  };

  const addImovel = () => {
    const id = `custom_${Date.now()}`;
    setImoveis(prev => [...prev, {
      id,
      nome: 'Novo imóvel',
      bairro: 'Bairro',
      preco: 500000,
      quartos: 1,
      receitaMensal: 5000,
      receitaAnual: 60000,
      condominio: 500,
      iptu: 150,
      internet: 99,
      energia: 250,
      outros: 150,
      pctCarta: 100,
      custom: true,
    }]);
  };

  const removeImovel = (id) => {
    setImoveis(prev => prev.filter(im => im.id !== id));
  };

  const vencedorCashflow = [...calculos].sort((a, b) => b.cashflowMensal - a.cashflowMensal)[0];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: C.bg,
      padding: '40px 20px',
      fontFamily: FONT,
      color: C.navy,
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '16px',
          }}>
            <div style={{ width: '32px', height: '3px', backgroundColor: C.orange }} />
            <div style={{
              fontSize: '11px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: C.navyMuted,
              fontWeight: 700,
            }}>
              Carpediem Homes · Investimento via consórcio
            </div>
          </div>
          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            margin: 0,
            color: C.navy,
          }}>
            O produto <span style={{ color: C.orange, fontStyle: 'italic', fontWeight: 700 }}>se paga?</span>
          </h1>
          <p style={{
            fontSize: '16px',
            color: C.navyMuted,
            marginTop: '16px',
            maxWidth: '640px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            Calculadora comparativa dos quatro imóveis à venda em João Pessoa,
            com aquisição via carta de consórcio. Informe os dados da sua carta
            e ajuste quanto será alocada em cada imóvel.
          </p>
        </div>

        {/* Carta de consórcio */}
        <div style={{
          backgroundColor: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '14px',
          padding: '28px 32px',
          marginBottom: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: C.navy,
          }} />
          <SectionLabel>Carta de consórcio</SectionLabel>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '8px 32px',
          }}>
            <InputMoney
              label="Valor da carta"
              value={valorCarta}
              onChange={setValorCarta}
              hint="Crédito disponível"
            />
            <InputMoney
              label="Parcela mensal"
              value={parcelaCarta}
              onChange={setParcelaCarta}
              hint="Valor atual da parcela"
            />
            <InputNumber
              label="Parcelas restantes"
              value={parcelasRestantes}
              onChange={setParcelasRestantes}
              suffix="meses"
            />
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', color: C.navyMuted, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
                Status
              </div>
              <Segmented
                options={[
                  { value: 'contemplada', label: 'Contemplada' },
                  { value: 'em_andamento', label: 'Em andamento' },
                ]}
                value={status}
                onChange={setStatus}
              />
            </div>
          </div>

          {status === 'em_andamento' && (
            <div style={{
              backgroundColor: C.orangeBg,
              borderLeft: `3px solid ${C.orange}`,
              borderRadius: '8px',
              padding: '18px 22px',
              marginTop: '8px',
            }}>
              <div style={{ fontSize: '12px', color: C.orangeDark, marginBottom: '12px', lineHeight: 1.5, fontWeight: 500 }}>
                Carta não contemplada: para usar o crédito é preciso ofertar lance ou aguardar sorteio.
              </div>
              <div style={{ maxWidth: '300px' }}>
                <InputMoney
                  label="Lance para contemplar"
                  value={lanceContemplar}
                  onChange={setLanceContemplar}
                  hint="Recursos próprios usados no lance"
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '36px' }} />

        {/* Cards dos imóveis */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '18px',
          marginBottom: '36px',
        }}>
          {calculos.map((c) => {
            const isVencedor = c.id === vencedorCashflow.id;
            return (
              <div key={c.id} style={{
                backgroundColor: C.surface,
                border: `1px solid ${isVencedor ? C.orange : C.border}`,
                borderRadius: '14px',
                padding: '26px',
                position: 'relative',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
              }}>
                {isVencedor && (
                  <>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      backgroundColor: C.orange,
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      right: '20px',
                      backgroundColor: C.orange,
                      color: C.surface,
                      fontSize: '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontWeight: 700,
                    }}>
                      Melhor cashflow
                    </div>
                  </>
                )}

                {c.custom && !isVencedor && (
                  <button
                    onClick={() => removeImovel(c.id)}
                    title="Remover imóvel"
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      width: '28px',
                      height: '28px',
                      border: `1px solid ${C.border}`,
                      borderRadius: '50%',
                      backgroundColor: C.surface,
                      color: C.navyMuted,
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 400,
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => { e.target.style.borderColor = C.orange; e.target.style.color = C.orange; }}
                    onMouseLeave={(e) => { e.target.style.borderColor = C.border; e.target.style.color = C.navyMuted; }}
                  >
                    ×
                  </button>
                )}

                <div style={{ marginBottom: '16px', paddingTop: isVencedor ? '18px' : 0 }}>
                  {c.custom ? (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <InlineEditText value={c.bairro} onChange={(v) => updateImovel(c.id, 'bairro', v)} width={110} />
                        <span style={{ fontSize: '10px', color: C.slate, fontWeight: 700 }}>·</span>
                        <InlineEdit value={c.quartos} onChange={(v) => updateImovel(c.id, 'quartos', v)} />
                        <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.slate, fontWeight: 700 }}>
                          {c.quartos === 1 ? 'quarto' : 'quartos'}
                        </span>
                      </div>
                      <div style={{ marginBottom: '8px' }}>
                        <InlineEditText value={c.nome} onChange={(v) => updateImovel(c.id, 'nome', v)} width={240} size="large" />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: C.navyMuted, fontWeight: 500 }}>Preço:</span>
                        <InlineEditMoney value={c.preco} onChange={(v) => updateImovel(c.id, 'preco', v)} width={130} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                        <span style={{ fontSize: '11px', color: C.navyMuted, fontWeight: 500 }}>Receita mensal:</span>
                        <InlineEditMoney value={Math.round(c.receitaMensal)} onChange={(v) => updateImovel(c.id, 'receitaMensal', v)} width={130} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.slate, marginBottom: '6px', fontWeight: 700 }}>
                        {c.bairro} · {c.quartos} {c.quartos === 1 ? 'quarto' : 'quartos'}
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: C.navy,
                        lineHeight: 1.15,
                      }}>
                        {c.nome}
                      </div>
                      <div style={{ fontSize: '13px', color: C.navyMuted, marginTop: '6px', fontWeight: 500 }}>
                        {fmt(c.preco)}
                      </div>
                    </>
                  )}
                </div>

                {/* Cashflow destaque */}
                <div style={{
                  backgroundColor: c.paga ? C.navyTint : C.orangeBg,
                  borderRadius: '10px',
                  padding: '16px 18px',
                  marginBottom: '20px',
                  borderLeft: `3px solid ${c.paga ? C.navy : C.orange}`,
                }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.navyMuted, marginBottom: '4px', fontWeight: 700 }}>
                    Cashflow mensal
                  </div>
                  <div style={{
                    fontSize: '30px',
                    fontWeight: 800,
                    color: c.paga ? C.positive : C.negative,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}>
                    {c.cashflowMensal >= 0 ? '+' : ''}{fmt(c.cashflowMensal)}
                  </div>
                  <div style={{ fontSize: '11px', color: C.navyMuted, marginTop: '6px', fontWeight: 500 }}>
                    {c.paga ? 'o produto se paga' : 'déficit — investidor cobre a diferença'}
                  </div>
                </div>

                <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.navyMuted, marginBottom: '10px', fontWeight: 700 }}>
                  Alocação da carta
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: C.navyMuted, fontWeight: 500 }}>% alocado neste imóvel</span>
                    <span style={{ fontSize: '17px', color: C.navy, fontWeight: 700, letterSpacing: '-0.01em' }}>{c.pctCarta}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={c.pctCarta}
                    onChange={(e) => updateImovel(c.id, 'pctCarta', e.target.value)}
                    style={{ width: '100%', accentColor: C.orange, cursor: 'pointer' }}
                  />
                </div>

                <CardRow label="Valor da carta alocado" value={fmt(c.valorCartaAlocado)} small />
                {c.complemento > 0 && (
                  <CardRow label="Complemento (recursos próprios)" value={fmt(c.complemento)} small negative />
                )}
                {c.sobraCarta > 0 && (
                  <CardRow label="Sobra da carta (não usada)" value={fmt(c.sobraCarta)} small />
                )}
                {c.lanceAlocado > 0 && (
                  <CardRow label="Lance para contemplar" value={fmt(c.lanceAlocado)} small negative />
                )}
                <div style={{ borderTop: `1px solid ${C.border}`, margin: '8px 0' }} />
                <CardRow label="Desembolso inicial total" value={fmt(c.desembolsoInicial)} strong />

                <div style={{ marginTop: '18px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.navyMuted, marginBottom: '8px', fontWeight: 700 }}>
                    Receita mensal
                  </div>
                  <CardRow label="Receita bruta hospedagem" value={fmt(c.receitaMensal)} />
                  <CardRow label="Custos de administração (20%)" value={`− ${fmt(c.taxaCarp)}`} small />
                  <CardRow label="Condomínio" value={<InlineEdit value={c.condominio} onChange={(v) => updateImovel(c.id, 'condominio', v)} />} small />
                  <CardRow label="IPTU (mensal)" value={<InlineEdit value={c.iptu} onChange={(v) => updateImovel(c.id, 'iptu', v)} />} small />
                  <CardRow label="Internet" value={<InlineEdit value={c.internet} onChange={(v) => updateImovel(c.id, 'internet', v)} />} small />
                  <CardRow label="Energia" value={<InlineEdit value={c.energia} onChange={(v) => updateImovel(c.id, 'energia', v)} />} small />
                  <CardRow label="Outros" value={<InlineEdit value={c.outros} onChange={(v) => updateImovel(c.id, 'outros', v)} />} small />
                  <div style={{ borderTop: `1px solid ${C.border}`, margin: '8px 0' }} />
                  <CardRow label="Receita líquida operacional" value={fmt(c.receitaLiqOperacional)} strong />
                  <CardRow label="Parcela consórcio" value={`− ${fmt(c.parcelaAlocada)}`} />
                </div>

                <div style={{ borderTop: `1px solid ${C.border}`, margin: '16px 0 12px' }} />
                <div style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.navyMuted, marginBottom: '8px', fontWeight: 700 }}>
                  Indicadores
                </div>
                <CardRow label="Yield bruto (s/ preço)" value={`${fmtNum(c.yieldBruto)}%`} />
                <CardRow
                  label="Cobertura da parcela"
                  value={c.coberturaParcela ? `${fmtNum(c.coberturaParcela, 0)}%` : '—'}
                  positive={c.coberturaParcela >= 100}
                  negative={c.coberturaParcela < 100}
                />
                <CardRow
                  label="Retorno sobre entrada"
                  value={c.yieldEntrada ? `${fmtNum(c.yieldEntrada)}% a.a.` : '—'}
                  positive={c.paga}
                />
                <CardRow
                  label="Payback da entrada"
                  value={c.paybackAnos ? `${fmtNum(c.paybackAnos)} anos` : '—'}
                />
                <CardRow
                  label="Total pago (carta completa)"
                  value={fmt(c.desembolsoInicial + c.totalParcelasRestantes)}
                  small
                />
              </div>
            );
          })}

          {/* Card "adicionar imóvel" */}
          <button
            onClick={addImovel}
            style={{
              backgroundColor: 'transparent',
              border: `2px dashed ${C.borderMed}`,
              borderRadius: '14px',
              padding: '26px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '280px',
              color: C.navyMuted,
              fontFamily: FONT,
              transition: 'all 0.2s ease',
              gap: '12px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = C.orange;
              e.currentTarget.style.color = C.orange;
              e.currentTarget.style.backgroundColor = C.orangeBg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = C.borderMed;
              e.currentTarget.style.color = C.navyMuted;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div style={{
              fontSize: '48px',
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>+</div>
            <div style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}>
              Adicionar imóvel
            </div>
            <div style={{
              fontSize: '11px',
              fontWeight: 400,
              color: C.slate,
              textAlign: 'center',
              maxWidth: '200px',
              lineHeight: 1.4,
            }}>
              Simular um imóvel não cadastrado no portfólio
            </div>
          </button>
        </div>

        {/* Notas metodológicas */}
        <div style={{
          backgroundColor: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '14px',
          padding: '24px 28px',
          fontSize: '13px',
          color: C.navyMuted,
          lineHeight: 1.7,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '4px',
            height: '100%',
            backgroundColor: C.orange,
          }} />
          <SectionLabel accent>Notas metodológicas</SectionLabel>
          <div>
            <strong style={{ color: C.navy, fontWeight: 700 }}>Alocação da carta</strong>: o slider de cada imóvel define qual fração da carta está comprometida com aquele imóvel. Para avaliar um imóvel isoladamente, deixe em 100%. Para simular divisão entre os 4, ajuste os percentuais de modo a somar 100% no total.
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong style={{ color: C.navy, fontWeight: 700 }}>Complemento</strong>: quando a carta alocada é menor que o preço do imóvel, o investidor precisa desembolsar a diferença à vista.
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong style={{ color: C.navy, fontWeight: 700 }}>Cobertura da parcela</strong>: quanto da parcela do consórcio a receita líquida operacional (já descontados custos de administração, condomínio, IPTU e utilidades) é capaz de cobrir. Acima de 100%, a operação se paga.
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong style={{ color: C.navy, fontWeight: 700 }}>Condomínio e IPTU</strong> são estimativas editáveis — recomendo validar com o financeiro antes do pitch ao investidor.
          </div>
          <div style={{ marginTop: '10px' }}>
            <strong style={{ color: C.navy, fontWeight: 700 }}>Não considerado</strong>: ITBI e custos de transferência, imposto de renda do investidor, manutenção / reposição de enxoval, correção anual das parcelas do consórcio, valorização do imóvel, reajuste de ADR e vacância extraordinária.
          </div>
        </div>

      </div>
    </div>
  );
}
