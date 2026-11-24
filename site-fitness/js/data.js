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
  ["Alimentação equilibrada", "Como montar refeições variadas e reduzir ultraprocessados."],
  ["Atividade física", "Como encaixar o movimento na rotina, mesmo com pouco tempo."],
  ["Treinos em casa", "Exercícios com o próprio peso para começar sem equipamentos."],
  ["Treinos na academia", "Como organizar a rotina e pedir orientação no início."],
  ["Hidratação", "Sinais de sede, dicas para beber água e formas de variar."],
  ["Descanso e sono", "Por que dormir bem influencia energia, humor e recuperação."]
];

const FRASES = [
  "Pequenas escolhas repetidas todos os dias mudam a sua história.",
  "Constância vale mais do que perfeição.",
  "A constância vence a intensidade.",
  "Você não precisa ser perfeito, só precisa começar."
];
