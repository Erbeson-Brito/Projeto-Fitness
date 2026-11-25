// Conteúdo informativo por faixa de IMC (orientações gerais, sem dietas prescritas)
const FAIXAS = {
  abaixo: {
    nome: "Abaixo do peso", faixa: "< 18,5", objetivo: "Ganhar peso com segurança", cor: "acc",
    acoes: ["Procure um médico para avaliar a causa.", "Divida a alimentação em refeições regulares.", "Inclua treinos de força para ganhar massa."],
    alimentacao: ["Não pule refeições, principalmente o café da manhã.", "Priorize alimentos nutritivos e energéticos: arroz, batata, ovos, castanhas e azeite.", "Inclua proteína e laticínios nas refeições principais."],
    casa: [["Agachamento leve","Pernas, sem carga"],["Flexão na parede","Peito e braços"],["Prancha com apoio","Core"],["Caminhada leve","Condicionamento"],["Alongamento","Mobilidade"]],
    academia: [["Leg press leve","Pernas, com carga baixa"],["Supino com halteres leves","Peito"],["Puxada na polia","Costas"],["Máquina de remada","Costas e postura"],["Esteira leve","Condicionamento"]],
    treinos: ["Musculação ou exercícios com o próprio peso, 2 a 3 vezes por semana.", "Caminhada leve, sem excesso de cardio.", "Descanso entre os treinos para recuperar a musculatura."],
    ganhar: "Ganhar peso de forma gradual, com alimentação nutritiva e treinos de força, é o caminho. Evite ganhar peso às pressas.",
    atencao: "Procure um médico para investigar a causa, principalmente se a perda de peso não for intencional."
  },
  normal: {
    nome: "Peso normal", faixa: "18,5 a 24,9", objetivo: "Manter o peso", cor: "blue",
    acoes: ["Mantenha uma alimentação variada e equilibrada.", "Faça atividade física todos os dias.", "Acompanhe seu peso com calma, sem obsessão."],
    alimentacao: ["Monte o prato com grãos integrais, legumes, verduras e frutas.", "Inclua proteína em todas as refeições, como ovos, feijão, peixes ou carnes magras.", "Use ultraprocessados com moderação e prefira água para se hidratar."],
    casa: [["Agachamento","Pernas e glúteos"],["Flexão de braço","Peito, ombros e braços"],["Prancha","Core e postura"],["Afundo","Pernas e equilíbrio"],["Caminhada rápida","Condicionamento"]],
    academia: [["Leg press","Pernas"],["Supino na máquina","Peito"],["Puxada na polia","Costas"],["Remada","Costas e postura"],["Esteira ou bicicleta","Condicionamento"]],
    treinos: ["Atividade moderada por pelo menos 150 minutos por semana, como caminhada rápida.", "Treinos de força 2 vezes por semana, para os principais grupos musculares.", "Alongamento e descanso adequado entre os treinos."],
    ganhar: "Seu IMC está na faixa de referência. Não é preciso ganhar nem perder peso só pelo número. Foque na disposição, na composição corporal e nos exames de rotina.",
    atencao: "Mantenha check-ups anuais e avaliações de rotina com um médico."
  },
  sobrepeso: {
    nome: "Sobrepeso", faixa: "25 a 29,9", objetivo: "Perder peso gradualmente", cor: "blue2",
    acoes: ["Reduza ultraprocessados, doces e bebidas açucaradas.", "Aumente a atividade física aos poucos.", "Faça exames de rotina e converse com um médico."],
    alimentacao: ["Priorize vegetais, frutas, feijão e grãos integrais.", "Reduza refrigerantes, frituras e ultraprocessados.", "Coma com calma e pare quando estiver satisfeito.", "Um nutricionista ajuda a montar um plano individual."],
    casa: [["Caminhada em ritmo moderado","150 min por semana"],["Agachamento com apoio","Pernas e glúteos"],["Prancha","Core e postura"],["Subir escadas","Condicionamento"],["Afundo apoiado","Pernas e equilíbrio"]],
    academia: [["Bicicleta ergométrica","Condicionamento, sem impacto"],["Leg press","Pernas"],["Puxada na polia","Costas"],["Remada sentada","Costas e postura"],["Esteira em ritmo moderado","Condicionamento"]],
    treinos: ["Caminhada ou bicicleta por 150 minutos por semana, em ritmo moderado.", "Treinos de força 2 vezes por semana para preservar a musculatura.", "Aumente a intensidade aos poucos."],
    ganhar: "Perder peso em ritmo gradual, com reeducação alimentar e atividade física regular, costuma trazer resultados mais duradouros.",
    atencao: "Verifique pressão, glicemia e colesterol com um médico, pois o excesso de peso pode afetar esses valores."
  },
  obesidade: {
    nome: "Obesidade", faixa: "30 ou mais", objetivo: "Reduzir peso com acompanhamento", cor: "dark",
    acoes: ["Procure um médico antes de iniciar mudanças.", "Busque acompanhamento com nutricionista e educador físico.", "Comece com mudanças pequenas e constantes."],
    alimentacao: ["Procure um plano alimentar individual, feito por nutricionista.", "Evite dietas da moda e restrições extremas.", "Foque em hábitos: refeições regulares, menos ultraprocessados e mais água."],
    casa: [["Caminhada leve","Início gradual"],["Elevação de panturrilha","Pernas"],["Prancha com apoio de joelhos","Core"],["Alongamento","Mobilidade"],["Exercícios sentados","Força sem impacto"]],
    academia: [["Bicicleta ergométrica","Baixo impacto"],["Leg press leve","Pernas"],["Puxada na polia leve","Costas"],["Esteira em ritmo leve","Condicionamento"],["Hidroginástica ou natação","Se disponível"]],
    treinos: ["Comece com atividades leves, como caminhada, natação ou bicicleta.", "Progrida aos poucos, com orientação de um educador físico.", "Inclua força 2 vezes por semana quando estiver adaptado."],
    ganhar: "A redução de peso deve ser feita com acompanhamento de médico, nutricionista e educador físico, com um plano individual.",
    atencao: "Existem tratamentos médicos para a obesidade, e eles devem ser avaliados por um profissional."
  }
};

const TOPICOS = [
  ["Alimentação equilibrada", "Como montar refeições variadas e reduzir ultraprocessados.", [
    "Uma alimentação equilibrada combina grupos diferentes de alimentos em cada refeição: grãos integrais, legumes, verduras, frutas, feijão e uma fonte de proteína. Essa variedade ajuda o corpo a receber vitaminas, minerais e energia de forma constante.",
    "Ultraprocessados, como biscoitos recheados, refrigerantes e embutidos, costumam ter muito açúcar, sal e gordura e pouca fibra. Não é preciso eliminá-los, mas reduzir a frequência já faz diferença. Prefira preparar a comida em casa sempre que possível e observe como você se sente depois das refeições."
  ]],
  ["Atividade física", "Como encaixar o movimento na rotina, mesmo com pouco tempo.", [
    "A atividade física não precisa começar com treinos longos. Caminhar até o trabalho, subir escadas, fazer pausas para se mover e dançar em casa já contam como movimento e ajudam a melhorar a disposição.",
    "A recomendação geral para adultos é de cerca de 150 minutos de atividade moderada por semana, distribuídos em vários dias, além de exercícios de força pelo menos duas vezes por semana. Comece com o que cabe na sua rotina e aumente aos poucos."
  ]],
  ["Treinos em casa", "Exercícios com o próprio peso para começar sem equipamentos.", [
    "Treinos com o próprio peso são uma boa forma de começar, porque não exigem equipamentos nem academia. Agachamento, flexão de braço, prancha e afundo trabalham pernas, peito, braços e core.",
    "Para progredir, aumente as repetições ou o tempo de execução, diminua o descanso entre as séries ou escolha variações mais difíceis. Faça o movimento com calma e controle, e pare se sentir dor. Se tiver alguma condição de saúde, converse com um médico antes de começar."
  ]],
  ["Treinos na academia", "Como organizar a rotina e pedir orientação no início.", [
    "Na academia, a principal dúvida costuma ser por onde começar. Uma boa ideia é pedir uma avaliação com um educador físico, que pode indicar máquinas, cargas iniciais e a frequência ideal para o seu objetivo.",
    "Organize a rotina em dias fixos, com treinos para os principais grupos musculares, e anote as cargas usadas. Assim fica fácil ver a evolução e ajustar o treino com segurança ao longo das semanas."
  ]],
  ["Hidratação", "Sinais de sede, dicas para beber água e formas de variar.", [
    "A sede é um sinal de que o corpo precisa de água, mas ela aparece quando a hidratação já está baixa. Urina clara e de cor amarelo-claro costuma indicar boa hidratação. Beber água ao longo do dia é mais eficiente do que beber muito de uma vez.",
    "Se a água não agrada, experimente adicionar rodelas de limão, pepino ou hortelã, ou prefira água com gás. Frutas e verduras também ajudam, porque têm bastante água na composição. Em dias de calor ou de treino, aumente a ingestão."
  ]],
  ["Descanso e sono", "Por que dormir bem influencia energia, humor e recuperação.", [
    "Durante o sono, o corpo recupera músculos, consolida a memória e regula hormônios ligados à fome e ao humor. Dormir mal pode aumentar o cansaço, a irritabilidade e a vontade de comer alimentos calóricos.",
    "Para melhorar o sono, mantenha horários regulares para dormir e acordar, reduza telas antes de deitar e evite cafeína no fim da tarde. Se o problema persistir por semanas, procure um médico."
  ]]
];

const FRASES = [
  "Pequenas escolhas repetidas todos os dias mudam a sua história.",
  "Constância vale mais do que perfeição.",
  "A constância vence a intensidade.",
  "Você não precisa ser perfeito, só precisa começar."
];
