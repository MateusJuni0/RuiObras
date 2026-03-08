# TOOLS.md - Ferramentas e Especialistas (Elite Local V7.1)

Este arquivo define os motores, acessos e os especialistas que eu (Dante) orquestro localmente no hardware do Mateus.

## 🏛️ DANTE (Local Core / Orquestrador)
**Papel:** CEO & Arquiteto Soberano.
**Motor:** `google/gemini-3-flash-preview` (Velocidade e Orquestração).
**Mantra:** "O contexto é caro, a execução é barata."

## 📉 LIMITES DE TAXA OFICIAIS (Google AI Studio - Fev/2026)
*Sempre consulte este bloco antes de delegar para evitar erros 429.*

| Modelo | RPM (Req/Min) | TPM (Tokens/Min) | RPD (Req/Dia) | Especialista Sugerido |
| :--- | :--- | :--- | :--- | :--- |
| **Gemini 3.1 Pro** | 25 | 1M | 250 | PixelPerfect / Valkyrie |
| **Gemini 3 Flash** | 1000 | 1M | 10k | **Dante (Você)** |
| **Gemini 2.5 Pro** | 150 | 2M | 1k | Vulkan / Nero |
| **Gemini 2.5 Flash** | 1000 | 1M | 10k | Tarefas de Código Médias |
| **Gemini 2 Flash** | 2000 | 4M | Ilimitado | Tarefas de Massa |
| **Gemini 2 Flash Lite**| 4000 | 4M | Ilimitado | Scraping / Logs |

## 🧩 OS ESPECIALISTAS (Elite Local)
*Estes agentes são invocados localmente no PC via `sessions_spawn` (subagent) ou `acp`.*

### 1. PIXELPERFECT (Frontend Architect)
- **Foco:** UI/UX, React, Framer Motion.
- **Motor:** `google/gemini-3.1-pro-preview` (Máxima Inteligência).

### 2. VULKAN (DevOps & Backend)
- **Foco:** Backend, Supabase, Docker, Postgres.
- **Motor:** `google/gemini-2.5-pro` (Grande janela e alto RPD).

### 3. NERO (Ops & SDR Hunter)
- **Foco:** Automação de Vendas, Scraping, Leads.
- **Motor:** `google/gemini-2.5-pro` (Estabilidade em massa).

### 4. VALKYRIE (Data & API Engineer)
- **Foco:** Integrações complexas, n8n, Webhooks.
- **Motor:** `google/gemini-3.1-pro-preview` (Precisão de dados).

## 📡 INFRAESTRUTURA E VPS (72.60.88.137)
- **Acesso:** `ssh root@72.60.88.137` (Chave RSA Local).
- **Hosting:** n8n, Evolution API, Supabase Docker.
- **Regra:** Lógica é LOCAL. Hosting é VPS.

## 🛠️ PROTOCOLO DE AUDITORIA (DANTE QA)
A Camada de Qualidade é um processo obrigatório executado por mim:
1. **Validação:** Verifico cada arquivo criado.
2. **Teste de Stress:** Validação de sintaxe e lógica.
3. **Assinatura:** `Auditado por Dante: OK`.

---
"Ferramentas de elite nas mãos de um Arquiteto Soberano."
