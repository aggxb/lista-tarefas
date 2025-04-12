import { container, definirTemaInicial, setLocalInfo } from "./util.js";

const initAlternarTema = () => {
  definirTemaInicial();
  
  const alternarTemaBtn = document.querySelector('.alternar-tema-btn');

  const alternarTema = () => {
    container.classList.toggle('tema-claro');

    if (container.classList.contains('tema-claro')) {
      setLocalInfo('tema', 'claro')
    } else {
      setLocalInfo('tema', 'escuro')
    }
  };

  alternarTemaBtn.addEventListener('click', alternarTema);
};

export default initAlternarTema;
