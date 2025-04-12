import { excluirTarefa } from './initExcluirTarefa.js';
import { listaTarefasContainer } from './util.js';

const initGerenciarModal = () => {
  const modal = document.querySelector('#modal');

  listaTarefasContainer.addEventListener('click', ({ target }) => {
    let tarefa;
    if (target.classList.contains('modal-excluir-tarefa-btn')) {
      tarefa = target.parentElement.parentElement;
    } else if (
      target.parentElement.classList.contains('modal-excluir-tarefa-btn')
    ) {
      tarefa = target.parentElement.parentElement.parentElement;
    }

    modal.showModal();
    modal.addEventListener('click', ({ target }) => {
      if (target.classList.contains('confirmar-exclusao-btn')) {
        excluirTarefa(tarefa.id);
        modal.close();
      } else if (
        target === modal ||
        target.parentElement.classList.contains('fechar-modal-btn') ||
        target.classList.contains('fechar-modal-btn')
      ) {
        modal.close();
      }
    });
  });
};

export default initGerenciarModal;
