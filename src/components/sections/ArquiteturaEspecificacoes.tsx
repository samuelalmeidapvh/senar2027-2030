import React, { useState } from 'react';
import { ESPECIFICACOES_TECNICAS } from '../../data/initialStrategicData';
import { 
  Database, 
  Layout, 
  Code2, 
  ShieldCheck, 
  Copy, 
  Check, 
  FileCode,
  Terminal
} from 'lucide-react';

export const ArquiteturaEspecificacoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="especificacoes-api" className="w-full scroll-mt-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <FileCode className="w-3.5 h-3.5 text-emerald-600" />
            <span>Documentação Técnica de Engenharia de Software</span>
            <span aria-hidden="true">·</span>
            <span>Entregáveis Arquiteturais</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 text-balance">
            Modelagem de Dados, APIs & Especificações Técnicas
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            Consulte os quatro pilares arquiteturais entregues para o sistema SENAR-AR/RO: esquema relacional PostgreSQL DDL, estrutura de componentes frontend, payloads de API REST/JSON e segurança JWT/RBAC.
          </p>
        </div>

        <button
          onClick={() => {
            let content = '';
            if (activeTab === 'A') content = ESPECIFICACOES_TECNICAS.ddlPostgreSql;
            if (activeTab === 'B') content = ESPECIFICACOES_TECNICAS.frontendArchitectureMarkdown;
            if (activeTab === 'C') content = JSON.stringify(ESPECIFICACOES_TECNICAS.apiSchemas, null, 2);
            if (activeTab === 'D') content = JSON.stringify(ESPECIFICACOES_TECNICAS.segurancaERbac, null, 2);
            copyToClipboard(content);
          }}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Especificação da Aba'}</span>
        </button>
      </div>

      {/* 4 Tabs representing the 4 requested deliverables */}
      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-100 rounded-xl mt-8">
        <button
          onClick={() => setActiveTab('A')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'A'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-4 h-4 text-[#006837]" />
          <span>A) Modelagem Banco de Dados (DDL SQL)</span>
        </button>

        <button
          onClick={() => setActiveTab('B')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'B'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layout className="w-4 h-4 text-[#008744]" />
          <span>B) Estrutura Frontend & Componentes</span>
        </button>

        <button
          onClick={() => setActiveTab('C')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'C'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Code2 className="w-4 h-4 text-blue-600" />
          <span>C) Payloads de API (JSON Schemas)</span>
        </button>

        <button
          onClick={() => setActiveTab('D')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'D'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>D) Segurança JWT & Matriz RBAC</span>
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="mt-6">
        
        {/* TAB A: DDL SQL */}
        {activeTab === 'A' && (
          <div className="bg-slate-950 rounded-2xl p-6 text-slate-200 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>schema_bsc_senar_ro.sql · PostgreSQL 16+ / Google Cloud SQL</span>
              </div>
              <span className="text-emerald-400">10 Tabelas Relacionais + Enums + Índices</span>
            </div>
            <pre className="mt-4 text-xs font-mono text-emerald-300/90 overflow-x-auto leading-relaxed max-h-[500px] p-2">
              <code>{ESPECIFICACOES_TECNICAS.ddlPostgreSql}</code>
            </pre>
          </div>
        )}

        {/* TAB B: Frontend Architecture */}
        {activeTab === 'B' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Diretrizes de Implementação Frontend & Árvore de Componentes
            </h3>
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs whitespace-pre-line">
                {ESPECIFICACOES_TECNICAS.frontendArchitectureMarkdown}
              </div>
            </div>
          </div>
        )}

        {/* TAB C: API Schemas */}
        {activeTab === 'C' && (
          <div className="space-y-6">
            {Object.entries(ESPECIFICACOES_TECNICAS.apiSchemas).map(([key, schema]: [string, any]) => (
              <div key={key} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-mono text-xs font-bold text-[#006837] bg-emerald-50 px-2.5 py-1 rounded">
                    {schema.endpoint}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{schema.descricao}</span>
                </div>
                <div className="mt-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Payload Estruturado:
                  </span>
                  <pre className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-[300px]">
                    <code>{JSON.stringify(schema.exemploResponse || schema.payloadRequest, null, 2)}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB D: Security & RBAC */}
        {activeTab === 'D' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Arquitetura de Segurança, JWT e Controle de Acesso Baseado em Funções (RBAC)
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Mecanismos implementados para garantir a integridade dos dados estratégicos e governança entre as unidades do organograma do SENAR-RO.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Assinatura</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">HMAC-SHA256</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Access Token com claim de role e unidade</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Expiração</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">30 min (Access) / 7 dias (Refresh)</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Mitigação de replay attacks e sessão segura</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Cabeçalho HTTP</span>
                <span className="text-xs font-bold text-[#006837] mt-1 block">Authorization: Bearer &lt;token&gt;</span>
                <span className="text-[11px] text-slate-500 mt-0.5 block">Validado no middleware Express server-side</span>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Matriz de Perfis e Permissões do Organograma:
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Perfil (Role)</th>
                    <th className="p-3">Descrição / Cargo</th>
                    <th className="p-3">Permissões Específicas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {ESPECIFICACOES_TECNICAS.segurancaERbac.matrizPermissoes.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#006837]">{m.perfil}</td>
                      <td className="p-3 font-medium text-slate-900">{m.descricao}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5">
                          {m.permissoes.map((p, j) => (
                            <span key={j} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
