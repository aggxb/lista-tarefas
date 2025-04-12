import { definirFiltroInicial, getLocalInfo, listaTarefasContainer, setLocalInfo } from './util.js';

const initConcluirTarefa = () => {
  const gerenciarTarefa = (tarefa) => {
    const status = 'data-status';

    if (!tarefa.getAttribute(status)) {
      tarefa.setAttribute('data-status', 'concluida');
      atualizarStatus(tarefa.id, true);
    } else {
      tarefa.setAttribute('data-status', '');
      atualizarStatus(tarefa.id, false);
    }
  };
  
  const atualizarStatus = (id, status) => {
    const tarefas = JSON.parse(getLocalInfo('tarefas'));
    const tarefaAtualizada = tarefas.find((tarefa) => +tarefa.id === +id);
    tarefaAtualizada.status = status;
    
    setLocalInfo('tarefas', JSON.stringify(tarefas));
    definirFiltroInicial();
  };
  
  listaTarefasContainer.addEventListener('click', ({ target }) => {
    if (target.classList.contains('tarefa-checkbox')) {
      const tarefa = target.parentElement.parentElement;
      
      gerenciarTarefa(tarefa);
    }
  });
};

export default initConcluirTarefa;
