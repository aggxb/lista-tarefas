export const container = document.querySelector('.container');
export const listaTarefasContainer = document.querySelector('.lista-tarefas');
export const filtroBtns = document.querySelectorAll('[data-filtro]');

export const setLocalInfo = (chave, valor) => {
  localStorage.setItem(chave, valor);
};

export const getLocalInfo = (chave) => {
  const item = localStorage.getItem(chave);

  return item;
};

export const listarTarefas = (tarefas) => {
  const tarefasListadas = tarefas || JSON.parse(getLocalInfo('tarefas'));

  listaTarefasContainer.innerHTML = '';

  if (tarefasListadas.length) {
    tarefasListadas.forEach(({ nome, id, status }) => {
      const itemTarefa = document.createElement('li');
      itemTarefa.setAttribute('id', id);
      itemTarefa.classList.add('tarefa');
      itemTarefa.setAttribute('data-status', `${status ? 'concluida' : ''}`);

      itemTarefa.innerHTML = `
        <div class="tarefa-info">
          <div class="tarefa-checkbox" role="checkbox" aria-label="Marcar tarefa como concluída/pendente"></div>
          <p>${nome}</p>
        </div>
        <div class="funcoes-tarefa">
          <button class="editar-tarefa-btn" aria-label="Editar tarefa"><i class="fa-solid fa-pencil"></i></button>
          <button class="modal-excluir-tarefa-btn" aria-label="Excluir tarefa"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;

      listaTarefasContainer.appendChild(itemTarefa);
    });
  } else {
    const msgListaVazia = document.createElement('p');
    msgListaVazia.classList.add('msg-lista-vazia');

    msgListaVazia.innerHTML = 'Lista Vazia';

    listaTarefasContainer.appendChild(msgListaVazia);
  }
};

export const definirTemaInicial = () => {
  const temaLocal = getLocalInfo('tema');

  if (temaLocal === 'claro') {
    container.classList.add('tema-claro');
  }
};

export const definirFiltroInicial = () => {
  const tarefas = JSON.parse(getLocalInfo('tarefas'));
  const tarefasPendentes = tarefas.filter((tarefa) => tarefa.status === false);
  const tarefasConcluidas = tarefas.filter((tarefa) => tarefa.status === true);

  const filtroLocal = getLocalInfo('filtro');

  if (filtroLocal) {
    if (filtroLocal === 'pendentes') {
      filtroBtns[1].classList.add('ativo');
      listarTarefas(tarefasPendentes);
    } else if (filtroLocal === 'concluidas') {
      filtroBtns[2].classList.add('ativo');
      listarTarefas(tarefasConcluidas);
    } else {
      filtroBtns[0].classList.add('ativo');
      listarTarefas();
    }
  }
};
