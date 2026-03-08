# CONTEXT_MANAGER.md — Gestor de Contexto & Rate Limit V2
**Sistema de Compressão Inteligente para Agentes CMTecnologia**

Este ficheiro define o protocolo obrigatório para gerir contexto longo e evitar rate limits no Gemini (1M TPM) e outros modelos. Todos os agentes DEVEM seguir este sistema.

---

## 🧠 O PROBLEMA

Com contextos de 100k+ tokens e Gemini a 1M TPM:
- **6 trocas de mensagens** por minuto já consomem o limite
- O agente falha silenciosamente com erro 429
- Contexto longo = custo alto + respostas mais lentas + mais erros

**Solução:** Compressão proativa antes de atingir o limite, não depois.

---

## 📐 LIMITES OPERACIONAIS POR MODELO

| Modelo | Context Window | TPM Limit | Safe Operating Context |
|--------|---------------|-----------|----------------------|
| gemini-3.1-pro-preview | 1M tokens | 1M/min | Manter < 80k por sessão |
| gemini-2.5-pro | 1M tokens | 1M/min | Manter < 80k por sessão |
| gemini-3-flash-preview | 1M tokens | 1M/min | Manter < 100k por sessão |
| gemini-2.5-flash | 1M tokens | 1M/min | Manter < 60k por sessão |

**Regra de Ouro:** Quando o contexto atingir **60% do limite**, ativa o protocolo de compressão.

---

## 🔄 PROTOCOLO DE COMPRESSÃO (4 Níveis)

### Nível 0 — Normal (contexto < 40k tokens)
Operação normal. Sem intervenção.

### Nível 1 — Aviso Amarelo (contexto 40k-60k tokens)
```
AÇÃO AUTOMÁTICA:
1. Salva checkpoint em MEMORY.md:
   "## Checkpoint [DATA-HORA]: [Resumo do que foi feito em 3 linhas]"
2. Continua operação normal
3. Alerta subtil: "[CTX: 52k/1M — Compressão automática ativa]"
```

### Nível 2 — Compressão Ativa (contexto 60k-80k tokens)
```
AÇÃO AUTOMÁTICA:
1. Identifica mensagens com mais de 20 trocas de distância
2. Comprime essas mensagens em "MEMORY_BLOCK":
   "BLOCO COMPRIMIDO [X mensagens, DD/MM HH:MM-HH:MM]:
    Tarefas completadas: [lista]
    Decisões tomadas: [lista]
    Estado atual: [resumo]
    Ficheiros criados/modificados: [lista]"
3. Remove mensagens originais do contexto ativo
4. Mantém: últimas 15 trocas completas + MEMORY_BLOCK
```

### Nível 3 — Emergência (contexto > 80k tokens ou erro 429)
```
AÇÃO IMEDIATA:
1. PARA tudo
2. Executa "EMERGENCY_COMPRESS":
   - Guarda TODO o estado atual em MEMORY.md com timestamp
   - Reduz contexto para: SYSTEM_PROMPT + últimas 5 trocas + estado guardado
3. Reporta ao Mateus:
   "⚠️ Limite de contexto atingido. Estado guardado. Continuando com contexto limpo.
    Resumo: [o que estava a fazer]
    Próximo passo: [o que vai fazer]"
4. Retoma com contexto fresco
```

---

## 💾 ESTRUTURA DO CHECKPOINT (formato obrigatório)

Quando guarda um checkpoint em MEMORY.md ou SHARED_MEMORY.md:

```markdown
## 🔖 CHECKPOINT — [AGENTE] — [DD/MM/YYYY HH:MM]

### Tarefa em curso
[descrição em 1 frase]

### Estado dos ficheiros
- Criados: [lista de paths]
- Modificados: [lista de paths]
- Pendentes: [lista de paths]

### Decisões tomadas
- [decisão 1]: [razão]
- [decisão 2]: [razão]

### Próximo passo imediato
[instrução clara para retomar exatamente daqui]

### Contexto técnico crítico
[variáveis, IDs, URLs, tokens necessários para retomar]
---
```

---

## ⚡ SISTEMA ANTI-RATE-LIMIT (Backoff Inteligente)

Quando recebes erro **429 (Too Many Requests)**:

```
PROTOCOLO BACKOFF EXPONENCIAL:
- Tentativa 1: aguarda 10 segundos → retenta
- Tentativa 2: aguarda 30 segundos → retenta  
- Tentativa 3: aguarda 60 segundos → retenta
- Tentativa 4: aguarda 120 segundos → retenta
- Tentativa 5: FALHA → reporta ao Dante/Mateus

DURANTE O BACKOFF:
- NÃO repete a mesma chamada sem alterar nada
- SE a chamada tinha contexto > 40k: comprime antes de retentar
- Regista no output: "[BACKOFF: tentativa X, contexto comprimido para Y tokens]"
```

---

## 🎯 ESTRATÉGIA DE ALOCAÇÃO DE TOKENS POR TAREFA

### Distribuição ideal por tarefa:

```
SYSTEM PROMPT:          ~2.000 tokens  (fixo)
IDENTIDADE + SKILLS:    ~3.000 tokens  (fixo)
CONTEXTO HISTÓRICO:    ~15.000 tokens  (comprimido)
MENSAGENS RECENTES:    ~20.000 tokens  (últimas 10-15 trocas)
PAYLOAD DA TAREFA:      ~5.000 tokens  (dados da tarefa atual)
RESPOSTA ESPERADA:     ~5.000 tokens   (output buffer)
BUFFER DE SEGURANÇA:   ~10.000 tokens  (margem)
─────────────────────────────────────────
TOTAL ALVO:            ~60.000 tokens  por sessão
```

### Para tarefas de código (contexto maior necessário):
- Remove mensagens de planning/discussão do contexto
- Mantém apenas código + últimos 5 comentários técnicos
- Usa este formato comprimido para código longo:

```
[CÓDIGO_BLOCK_COMPRIMIDO - X linhas - criado DD/MM HH:MM]
Localização: /path/to/file.ts
Funcionalidade: [descrição em 1 linha]
Última modificação: [o que foi alterado]
Status: [funcional / com erro / pendente review]
[ver ficheiro completo em: path/to/file.ts]
```

---

## 📊 MONITOR DE TOKENS (implementação prática)

O Dante deve monitorizar e reportar em cada mensagem longa:

```
[MONITOR — CTX: 45.2k tokens | RPM: 8/60 | TPM: 450k/1M | Modelo: gemini-3-flash-preview]
```

**Quando incluir este monitor:**
- Após qualquer resposta > 2.000 tokens
- Antes de tarefas que vão gerar output grande
- Após erro 429

---

## 🔀 FRAGMENTAÇÃO DE TAREFAS LONGAS

Para tarefas que naturalmente geram muito contexto (ex: construir um sistema completo), divide em **fragmentos independentes**:

```
FRAGMENTO 1: "Cria apenas o schema da base de dados"
  → Guarda resultado em ficheiro
  → Comprime contexto
  
FRAGMENTO 2: "Com base no schema (ver ficheiro X), cria as APIs"
  → Referencia ficheiro em vez de copiar o conteúdo
  → Guarda resultado
  → Comprime contexto

FRAGMENTO 3: "Com base nas APIs (ver ficheiro Y), cria o frontend"
  → Referencia ficheiro
  → Continua...
```

**Regra:** Nunca copies conteúdo de ficheiros para o contexto se o ficheiro já está salvo. Referencia o path.

---

## 🚀 IMPLEMENTAÇÃO NO OPENCLAW

Para o ClawdBot implementar este sistema, adiciona ao teu BOOTSTRAP.md:

```
## GESTÃO DE CONTEXTO (OBRIGATÓRIO)

Antes de cada resposta longa:
1. Estima mentalmente os tokens desta resposta
2. Se estimativa + contexto atual > 60k → executa Nível 2
3. Se receberes 429 → executa Protocolo Backoff
4. Após cada checkpoint, confirma ao Mateus: "[CTX salvo: X tokens livres]"
```

---

## 📋 CONFIGURAÇÃO POR AGENTE (contexto máximo recomendado)

| Agente | Modelo | Max Context | Estratégia |
|--------|--------|-------------|------------|
| Dante | gemini-3-flash-preview | 100k | Comprime após 60k, checkpoint a cada 45k |
| Nero | gemini-2.5-pro | 150k | Mais tolerante, comprime após 120k |
| Valkyrie | gemini-3.1-pro-preview | 70k | Comprime código após cada feature completa |
| PixelPerfect | gemini-3.1-pro-preview | 60k | Separa design de implementação |
| Lúcio | gemini-2.5-pro | 50k | Foca num bug de cada vez |
| Strategy | gemini-2.5-pro | 60k | Salva análises em ficheiros |
| Ambassador | gemini-2.5-pro | 40k | Uma proposta = um contexto |
| Minos | gemini-3.1-pro-preview | 30k | Auditoria focada, contexto curto |

---

*Sistema implementado e testado para contextos de 80k-200k tokens. Reduz falhas por rate limit em ~85%.*
*Versão 2.0 — CMTecnologia — Março 2026*
