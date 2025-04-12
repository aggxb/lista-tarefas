import {
  getLocalInfo,
  listarTarefas,
  listaTarefasContainer,
  setLocalInfo,
} from './util.js';

const initGerenciarTarefa = () => {
  const form = document.querySelector('.adicionar-tarefa-form');
  const inputNome = form.querySelector('div input');
  
  const adicionarTarefa = (event) => {
    event.preventDefault();
    const tarefas = JSON.parse(getLocalInfo('tarefas'));
    const nomeTarefa = inputNome.value;

    const msgErro = form.querySelector('.msg-erro');

    if (nomeTarefa) {
      msgErro.classList.remove('ativo');
      if (tarefas) {
        tarefas.push({ nome: nomeTarefa, id: Date.now(), status: false });
        setLocalInfo('tarefas', JSON.stringify(tarefas));
      } else {
        setLocalInfo(
          'tarefas',
          JSON.stringify([{ nome: nomeTarefa, id: Date.now(), status: false }]),
        );
      }
      listarTarefas();
      inputNome.value = '';
    } else {
      msgErro.classList.add('ativo');
    }
  };

  const editarTarefa = (event) => {
    event.preventDefault();

    const tarefas = JSON.parse(getLocalInfo('tarefas'));
    const tarefaId = form.getAttribute('data-edicao-id');
    const tarefaModificada = tarefas.find(
      (tarefa) => +tarefa.id === +tarefaId,
    );
    tarefaModificada.nome = inputNome.value;

    setLocalInfo('tarefas', JSON.stringify(tarefas));
    listarTarefas();
    inputNome.value = '';

    form.removeAttribute('data-edicao-id');
  };

  window.addEventListener('keydown', ({key}) => {
    if (key === 'Escape' && form.hasAttribute('data-edicao-id')) {
      form.removeAttribute('data-edicao-id');
      inputNome.value = '';
    }
  })

  listaTarefasContainer.addEventListener('click', ({ target }) => {
    let tarefa;

    if (target.closest('.editar-tarefa-btn')) {
      tarefa = target.closest('.tarefa');
      const tarefaNome = tarefa.querySelector('p').innerText;
      const tarefaId = tarefa.id;

      inputNome.value = tarefaNome;

      form.setAttribute('data-edicao-id', `${tarefaId}`);
    }
  });

  form.addEventListener('submit', (event) => {
    if (form.hasAttribute('data-edicao-id')) {
      editarTarefa(event);
    } else {
      adicionarTarefa(event);
    }
  });
};

export default initGerenciarTarefa;
