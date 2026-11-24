(function () {
  "use strict";

  // ---------- armazenamento local (sem banco de dados) ----------
  // Usado só neste navegador. Sem login, nada é salvo.
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* armazenamento indisponível */ }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (e) { /* ignora */ }
    }
  };

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // ---------- sessão ----------
  function usuarioAtual() {
    const email = store.get("metacore_session", null);
    if (!email) return null;
    const users = store.get("metacore_users", {});
    return users[email] ? { email, nome: users[email].nome } : null;
  }
  function historicoKey(email) { return "metacore_hist_" + email; }
  function getHistorico() {
    const u = usuarioAtual();
    return u ? store.get(historicoKey(u.email), []) : [];
  }
  function setHistorico(lista) {
    const u = usuarioAtual();
    if (u) store.set(historicoKey(u.email), lista);
  }

  // ---------- utilidades ----------
  function classificar(imc) {
    if (imc < 18.5) return "abaixo";
    if (imc < 25) return "normal";
    if (imc < 30) return "sobrepeso";
    return "obesidade";
  }
  function fmt(n, casas) {
    return Number(n).toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }
  function dataHoje() {
    return new Date().toLocaleDateString("pt-BR");
  }
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v; else node.setAttribute(k, v);
    });
    (children || []).forEach((c) => {
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }
  function lista(items) {
    return el("ul", { class: "lista" }, items.map((t) => el("li", null, [t])));
  }

  // ---------- rotas ----------
  const VIEWS = ["inicio", "calculadora", "boas-praticas", "treinos", "entrar", "historico"];
  const PROTEGIDAS = ["historico"];

  function mostrar(rota) {
    if (!VIEWS.includes(rota)) rota = "inicio";
    if (PROTEGIDAS.includes(rota) && !usuarioAtual()) {
      mostrarAviso("Entre na sua conta para ver o histórico.");
      rota = "entrar";
    }
    $$(".view").forEach((v) => v.classList.toggle("active", v.id === rota));
    $$(".menu a").forEach((a) => a.classList.toggle("ativo", a.getAttribute("href") === "#" + rota));
    if (rota === "historico") renderHistorico();
    if (rota === "treinos") renderTreinos();
    if (rota === "inicio") renderUltimoIMC();
    window.scrollTo(0, 0);
  }
  function mostrarAviso(msg) {
    const box = $("#aviso-entrar");
    if (box) { box.textContent = msg; box.hidden = false; }
  }

  // ---------- cabeçalho / sessão ----------
  function atualizarCabecalho() {
    const u = usuarioAtual();
    $("#userLabel").hidden = !u;
    if (u) $("#userLabel").textContent = "Olá, " + u.nome;
    $("#authLink").hidden = !!u;
    $("#logoutBtn").hidden = !u;
    $$("[data-auth]").forEach((a) => { a.hidden = !u; });
    renderUltimoIMC();
    renderTreinos();
  }

  // ---------- calculadora ----------
  function lerNumero(id) {
    const v = String($("#" + id).value).replace(",", ".").trim();
    return v === "" ? NaN : Number(v);
  }
  function validar(peso, altura) {
    if (!(peso >= 20 && peso <= 300)) return "Informe um peso entre 20 e 300 kg.";
    if (!(altura >= 100 && altura <= 250)) return "Informe uma altura entre 100 e 250 cm.";
    return "";
  }

  function renderResultado(r) {
    const F = FAIXAS[r.chave];
    const box = $("#resultado");
    $("#resultado-vazio").hidden = true;
    box.hidden = false;
    box.innerHTML = "";

    const topo = el("section", { class: "resultado-topo card" }, [
      el("p", { class: "eyebrow" }, ["Seu IMC"]),
      el("p", { class: "imc-valor" }, [fmt(r.imc, 1)]),
      el("span", { class: "badge badge-" + F.cor }, [F.nome]),
      el("p", { class: "muted" }, ["Faixa de referência: " + F.faixa + " · Peso " + fmt(r.peso, 1) + " kg · Altura " + r.altura + " cm"]),
      el("div", { class: "escala" }, ["abaixo", "normal", "sobrepeso", "obesidade"].map((k, i) =>
        el("span", { class: "seg seg-" + i + (k === r.chave ? " seg-atual" : "") }, [FAIXAS[k].nome])
      ))
    ]);

    const fazer = el("section", { class: "card" }, [
      el("h2", null, ["O que fazer agora"]),
      el("ol", { class: "passos" }, F.acoes.map((t) => el("li", null, [t])))
    ]);

    const ganhar = el("section", { class: "banda-conteudo" }, [
      el("h2", null, ["Ganhar ou perder peso?"]),
      el("p", { class: "objetivo" }, [F.objetivo]),
      el("p", null, [F.ganhar])
    ]);

    const faixa = el("section", { class: "faixa card" }, [
      el("div", { class: "faixa-lateral faixa-" + F.cor }, [
        el("h2", null, [F.nome]),
        el("p", null, ["IMC " + F.faixa]),
        el("p", { class: "rotulo" }, ["Objetivo"]),
        el("p", null, [F.objetivo])
      ]),
      el("div", { class: "faixa-colunas" }, [
        el("div", null, [el("h3", null, ["Alimentação"]), lista(F.alimentacao)]),
        el("div", null, [el("h3", null, ["Treinos"]), lista(F.treinos)]),
        el("div", null, [el("h3", null, ["Atenção"]), el("p", null, [F.atencao])])
      ])
    ]);

    const aviso = el("p", { class: "aviso" }, [
      "O IMC não diferencia massa muscular de gordura e não substitui uma avaliação de saúde."
    ]);

    box.append(topo, fazer);
    const ganharFull = $("#ganhar-full");
    ganharFull.innerHTML = "";
    ganharFull.append(ganhar);
    ganharFull.hidden = false;
    const faixaFull = $("#faixa-full");
    faixaFull.innerHTML = "";
    faixaFull.append(faixa, aviso);
    faixaFull.hidden = false;

    if (usuarioAtual()) {
      const btn = el("button", { class: "btn btn-primary btn-bloco", type: "button" }, ["Salvar no histórico"]);
      btn.addEventListener("click", () => {
        const lista = getHistorico();
        lista.push({ data: dataHoje(), ts: Date.now(), peso: r.peso, altura: r.altura, imc: Number(r.imc.toFixed(1)), chave: r.chave });
        setHistorico(lista);
        renderUltimoIMC();
        btn.textContent = "Salvo no histórico ✓";
        btn.disabled = true;
      });
      box.append(btn);
    } else {
      box.append(el("p", { class: "nota" }, [
        "Este resultado aparece só nesta tela. Ao sair ou recarregar a página, ele some. ",
        el("a", { href: "#entrar" }, ["Entre na sua conta"]),
        " para salvar seu histórico."
      ]));
    }
  }

  function onCalcular(ev) {
    ev.preventDefault();
    const peso = lerNumero("peso");
    const altura = lerNumero("altura");
    const erro = validar(peso, altura);
    const msg = $("#erro-calc");
    if (erro) { msg.textContent = erro; msg.hidden = false; $("#resultado").hidden = true; $("#faixa-full").hidden = true; $("#ganhar-full").hidden = true; $("#resultado-vazio").hidden = false; return; }
    msg.hidden = true;

    const alturaM = altura / 100;
    const imc = peso / (alturaM * alturaM);
    const chave = classificar(imc);
    const r = { peso, altura, imc, chave };

    renderResultado(r);
  }

  // ---------- início: último IMC salvo (só logado) ----------
  function renderUltimoIMC() {
    const box = $("#ultimo-imc");
    if (!box) return;
    const lista = getHistorico();
    if (!usuarioAtual() || lista.length === 0) { box.hidden = true; return; }
    const ult = lista.reduce((a, b) => (a.ts > b.ts ? a : b));
    box.hidden = false;
    box.innerHTML = "";
    box.append(
      el("p", { class: "eyebrow" }, ["Seu último IMC"]),
      el("p", { class: "imc-valor imc-pequeno" }, [fmt(ult.imc, 1)]),
      el("span", { class: "badge badge-" + FAIXAS[ult.chave].cor }, [FAIXAS[ult.chave].nome]),
      el("p", { class: "muted" }, ["Calculado em " + ult.data]),
      el("a", { class: "btn btn-outline", href: "#historico" }, ["Ver histórico"])
    );
  }

  // ---------- treinos: mesmo layout; logados veem exercícios pela faixa do IMC ----------
  let treinosOriginais = null;
  function renderTreinos() {
    const casa = $("#lista-casa"), acad = $("#lista-academia");
    if (!casa || !acad) return;
    if (!treinosOriginais) treinosOriginais = [casa.innerHTML, acad.innerHTML];
    const hist = usuarioAtual() ? getHistorico() : [];
    if (hist.length === 0) {
      casa.innerHTML = treinosOriginais[0]; acad.innerHTML = treinosOriginais[1];
      return;
    }
    const ult = hist.reduce((x, y) => (x.ts > y.ts ? x : y));
    const F = FAIXAS[ult.chave];
    const itens = (lst) => lst.map(([n, s]) => el("li", null, [el("strong", null, [n]), el("span", null, [s])]));
    casa.replaceChildren(...itens(F.casa));
    acad.replaceChildren(...itens(F.academia));
  }

  // ---------- histórico ----------
  function renderHistorico() {
    const box = $("#lista-historico");
    const lista = getHistorico().slice().sort((a, b) => b.ts - a.ts);
    box.innerHTML = "";
    if (lista.length === 0) {
      box.append(el("p", { class: "muted" }, ["Nenhum cálculo salvo ainda. Faça um cálculo na calculadora."]));
      return;
    }
    const tabela = el("table", { class: "tabela" }, [
      el("thead", null, [el("tr", null, ["Data", "Peso (kg)", "Altura (cm)", "IMC", "Faixa"].map((t) => el("th", null, [t])))]),
      el("tbody", null, lista.map((h) => el("tr", null, [
        el("td", null, [h.data]),
        el("td", null, [fmt(h.peso, 1)]),
        el("td", null, [String(h.altura)]),
        el("td", null, [fmt(h.imc, 1)]),
        el("td", null, [FAIXAS[h.chave].nome])
      ])))
    ]);
    box.append(tabela);
  }

  // ---------- login / cadastro (protótipo local) ----------
  function trocarAba(aba) {
    $$(".tab").forEach((t) => t.classList.toggle("ativo", t.dataset.aba === aba));
    $("#form-entrar").hidden = aba !== "entrar";
    $("#form-cadastrar").hidden = aba !== "cadastrar";
    $("#msg-auth").hidden = true;
  }
  function msgAuth(texto, ok) {
    const m = $("#msg-auth");
    m.textContent = texto; m.hidden = false; m.className = "msg " + (ok ? "ok" : "erro");
  }
  function onCadastrar(ev) {
    ev.preventDefault();
    const nome = $("#cad-nome").value.trim();
    const email = $("#cad-email").value.trim().toLowerCase();
    const senha = $("#cad-senha").value;
    if (!nome || !email.includes("@") || senha.length < 6) {
      msgAuth("Preencha nome, e-mail válido e uma senha com pelo menos 6 caracteres.", false); return;
    }
    const users = store.get("metacore_users", {});
    if (users[email]) { msgAuth("Já existe uma conta com este e-mail.", false); return; }
    users[email] = { nome, senha };
    store.set("metacore_users", users);
    store.set("metacore_session", email);
    ev.target.reset();
    atualizarCabecalho();
    mostrar("calculadora");
  }
  function onEntrar(ev) {
    ev.preventDefault();
    const email = $("#login-email").value.trim().toLowerCase();
    const senha = $("#login-senha").value;
    const users = store.get("metacore_users", {});
    if (!users[email] || users[email].senha !== senha) { msgAuth("E-mail ou senha incorretos.", false); return; }
    store.set("metacore_session", email);
    ev.target.reset();
    atualizarCabecalho();
    mostrar("inicio");
  }
  function onSair() {
    store.remove("metacore_session");
    $("#resultado").hidden = true;
    $("#faixa-full").hidden = true; $("#ganhar-full").hidden = true;
    $("#resultado-vazio").hidden = false;
    atualizarCabecalho();
    mostrar("inicio");
  }

  // ---------- conteúdo estático ----------
  function montarConteudoEstatico() {
    const topicos = $("#lista-topicos");
    TOPICOS.forEach(([t, d]) => topicos.append(el("article", { class: "card topico" }, [
      el("h3", null, [t]), el("p", null, [d]), el("a", { href: "#calculadora" }, ["Calcular meu IMC →"])
    ])));
    const frases = $("#lista-frases");
    FRASES.forEach((f) => frases.append(el("blockquote", { class: "frase" }, [f])));
  }

  // ---------- inicialização ----------
  document.addEventListener("DOMContentLoaded", () => {
    montarConteudoEstatico();
    $("#form-calc").addEventListener("submit", onCalcular);
    $("#form-cadastrar").addEventListener("submit", onCadastrar);
    $("#form-entrar").addEventListener("submit", onEntrar);
    $("#logoutBtn").addEventListener("click", onSair);
    $$(".tab").forEach((t) => t.addEventListener("click", () => trocarAba(t.dataset.aba)));
    $("#limpar-historico").addEventListener("click", () => {
      if (confirm("Apagar todo o seu histórico?")) { setHistorico([]); renderHistorico(); renderUltimoIMC(); }
    });
    window.addEventListener("hashchange", () => mostrar(location.hash.replace("#", "") || "inicio"));
    atualizarCabecalho();
    mostrar(location.hash.replace("#", "") || "inicio");
  });
})();
