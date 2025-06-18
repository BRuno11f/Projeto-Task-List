//escuta

import { TaskManager } from "./modules/TaskManager.js";

const taskManager = new TaskManager();

const textUsuario = document.getElementById('tarefaText');
const areaLista = document.getElementById('textTarefa');

const botaoTaskAll = document.getElementById('taskAll');
const botaoTaskDone = document.getElementById('taskDone');
const botaoTaskPending = document.getElementById('taskPending');

let filtroAtual = 'todas';

function getListaFiltrada() {
    if (filtroAtual === 'todas') return taskManager.filtroTodas();
    if (filtroAtual === 'pendentes') return taskManager.filtroPendentes();
    if (filtroAtual === 'concluidas') return taskManager.filtroConcluidas();
}

function formatarTarefas(listaTarefas) {
    areaLista.innerHTML = '';

    listaTarefas.slice().reverse().forEach(tarefa => {
        const divTarefa = document.createElement('div');
        const spanTarefa = document.createElement('span');
        const label = document.createElement('label');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.status;
        checkbox.dataset.id = tarefa.id;
        checkbox.addEventListener('change', (event) => {
            taskManager.alterarStatus(Number(event.target.dataset.id));
            formatarTarefas(getListaFiltrada());
        });
    
        
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'X';
        botaoRemover.className = 'remove-botao'
        botaoRemover.dataset.id = tarefa.id;
        botaoRemover.addEventListener('click', (event) => {
            taskManager.removerTarefa(Number(event.target.dataset.id));
            formatarTarefas(getListaFiltrada());
        });
        

        label.className = 'checkbox-label';
        divTarefa.className = 'tarefa-espaco';
        spanTarefa.className = 'texto-tarefa';
        spanTarefa.className = tarefa.status ? 'concluida' : 'texto-tarefa';
        

        label.appendChild(checkbox);
        spanTarefa.textContent = tarefa.descricao;
        divTarefa.appendChild(label);
        divTarefa.appendChild(spanTarefa);
        divTarefa.appendChild(botaoRemover);
        areaLista.appendChild(divTarefa);
    });
}

formatarTarefas(taskManager.listarTarefas());

textUsuario.addEventListener('keydown', (event) => {
    const tarefa = textUsuario.value.trim();
    if (event.key === 'Enter') {
        if (tarefa) {
            taskManager.addTarefa(tarefa);
            textUsuario.value = '';
            formatarTarefas(getListaFiltrada());
        }
    }
});

botaoTaskAll.addEventListener('click', () => {
    filtroAtual = 'todas';
    formatarTarefas(taskManager.filtroTodas());
});

botaoTaskDone.addEventListener('click', () => {
    filtroAtual = 'concluidas';
    formatarTarefas(taskManager.filtroConcluidas());
});

botaoTaskPending.addEventListener('click', () => {
    filtroAtual = 'pendentes';
    formatarTarefas(taskManager.filtroPendentes());
});

