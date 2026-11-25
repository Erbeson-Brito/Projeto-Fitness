# HealthMeta: Sua meta, seu centro, sua força

Site de saúde e fitness que calcula o IMC do usuário e mostra orientações gerais de alimentação, atividade física, hidratação e treinos para casa ou academia, de acordo com a faixa do resultado.

> Projeto de estudo em HTML, CSS e JavaScript puros, sem banco de dados e sem backend. As orientações são gerais e não substituem acompanhamento de médico, nutricionista ou educador físico.

## Funcionalidades

- **Calculadora de IMC** com peso, altura e idade, com validação dos campos.
- **Orientações por faixa**: o que fazer, alimentação, treinos e se é preciso ganhar ou perder peso.
- **Boas práticas** com tópicos sobre alimentação, atividade física, hidratação e constância, além de frases motivacionais.
- **Treinos** em casa ou na academia. Visitantes veem exercícios gerais. Usuários logados veem exercícios da faixa do último IMC salvo.
- **Cadastro e login** para salvar o IMC no histórico.
- **Histórico** dos cálculos salvos, com opção de apagar tudo.
- **Layout responsivo**, pensado para celular e desktop.

## Como funciona o IMC

| Faixa | IMC |
|---|---|
| Abaixo do peso | menor que 18,5 |
| Peso normal | 18,5 a 24,9 |
| Sobrepeso | 25 a 29,9 |
| Obesidade | 30 ou mais |

O resultado não é salvo automaticamente. Para guardar o cálculo, o usuário precisa estar logado e clicar em **Salvar no histórico**.

## Como executar

Não há instalação nem dependências.

1. Baixe ou clone o repositório.
2. Abra `index.html` no navegador.

Para evitar problemas de caminho, recomendo usar uma extensão como o **Live Server** do VS Code.

## Estrutura

```
site-fitness-html/
├── index.html        # Estrutura de todas as páginas (SPA com roteamento por hash)
├── css/
│   └── style.css     # Estilos e layout responsivo
├── js/
│   ├── data.js       # Textos e dados das faixas, tópicos e frases
│   └── app.js        # Lógica: IMC, login, histórico e treinos
└── README.md
```

## Armazenamento local

Os dados ficam no `localStorage` do navegador:

| Chave | Conteúdo |
|---|---|
| `healthmeta_users` | Usuários cadastrados |
| `healthmeta_session` | E-mail do usuário logado |
| `healthmeta_hist_<email>` | Histórico de IMC de cada usuário |

Como os dados ficam no navegador, eles não são compartilhados entre dispositivos e somem se o navegador limpar os dados do site.

## Limitações conhecidas

- **Senhas em texto puro.** Este é um protótipo. Antes de qualquer uso real, é preciso um backend com senhas protegidas por hash, como bcrypt.
- **Sem servidor e sem banco de dados.** Tudo roda no navegador.
- **Sem validação de e-mail real.** Qualquer endereço com `@` é aceito.

## Próximos passos

### Vincular a vendas

A ideia é transformar o site também em uma loja de produtos de saúde e fitness, ligada às orientações de cada faixa do IMC. Por exemplo, para a faixa de sobrepeso, o site poderia sugerir produtos como equipamentos para treino em casa ou suplementos indicados por um profissional.

Para isso, seria preciso:

- Um **catálogo de produtos** com nome, preço, imagem, estoque e a faixa de IMC para a qual cada item faz sentido.
- Um **carrinho e um fluxo de compra**, com cálculo de frete e confirmação do pedido.
- Um **gateway de pagamento** (como Mercado Pago ou Stripe), para que os dados de cartão nunca passem pelo código do site.
- Um **controle de estoque** que baixa a quantidade a cada venda e avisa quando um produto acaba.
- Um **backend com banco de dados**, para guardar usuários, pedidos e produtos com segurança.

Como o site hoje não tem backend, essa etapa depende da primeira: uma API e um banco de dados com autenticação segura.

## Autor

Erbeson Brito de Souza, 22 anos, estudante da Faculdade de Análise e Desenvolvimento de Sistemas (ADS).

## Licença

Uso livre para estudo. Defina a licença antes de publicar o projeto como open source.
