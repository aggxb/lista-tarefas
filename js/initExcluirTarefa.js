import {
  listaTarefasContainer,
  getLocalInfo,
  listarTarefas,
  setLocalInfo,
} from './util.js';

const initExcluirTarefa = () => {
  const modal = document.querySelector('#modal');

  const excluirTarefa = (id) => {
    const tarefas = JSON.parse(getLocalInfo('tarefas'));

    const tarefaExcluida = tarefas.find((tarefa) => +tarefa.id === +id);
    const tarefasAtualizadas = tarefas.filter(
      (tarefa) => tarefa !== tarefaExcluida,
    );

    setLocalInfo('tarefas', JSON.stringify(tarefasAtualizadas));
    listarTarefas();
  };

  let tarefaId = null;

  listaTarefasContainer.addEventListener('click', ({ target }) => {
    let tarefa;
    if (target.closest('.modal-excluir-tarefa-btn')) {
      tarefa = target.closest('.tarefa');
      tarefaId = tarefa.id;
      modal.showModal();
    }
  });

  modal.addEventListener('click', ({ target }) => {
    if (target.classList.contains('confirmar-exclusao-btn')) {
      excluirTarefa(tarefaId);
      modal.close();
      tarefaId = null;
    } else if (target === modal || target.closest('.fechar-modal-btn')) {
      modal.close();
      tarefaId = null;
    }
  });
};

export default initExcluirTarefa;
