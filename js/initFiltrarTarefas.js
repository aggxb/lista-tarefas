import { definirFiltroInicial, filtroBtns, getLocalInfo, listarTarefas, setLocalInfo } from "./util.js";

const initFiltrarTarefas = () => {
  definirFiltroInicial();
  
  const filtrarTarefas = (tipo) => {
    const tarefasLocais = JSON.parse(getLocalInfo('tarefas'))
    const tarefasPendentes = tarefasLocais.filter((tarefa) => tarefa.status === false);
    const tarefasConcluidas = tarefasLocais.filter((tarefa) => tarefa.status === true);

    if (tipo === 'pendentes') {
      listarTarefas(tarefasPendentes);
    } else if (tipo === 'concluidas') {
      listarTarefas(tarefasConcluidas);
    } else {
      listarTarefas();
    }

    setLocalInfo('filtro', tipo)
  };

  filtroBtns.forEach((btn) => {
    const tipo = btn.getAttribute('data-filtro');

    btn.addEventListener('click', () => {
      filtroBtns.forEach((btn) => btn.classList.remove('ativo'));

      btn.classList.add('ativo');
      filtrarTarefas(tipo);
    });
  });
};

export default initFiltrarTarefas;
