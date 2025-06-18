//logica de add a lista, logica dos filtros e atualiza o estado da tarefa e remover
import { Task } from "./Task.js";
import { SaveAndLoad } from "./storage.js";

export class TaskManager {
    constructor () {
        this.tarefas = [];
        this.SaveAndLoad = new SaveAndLoad();
        this.tarefas = this.SaveAndLoad.loadLocal();
    }
 
    addTarefa(descricao) {
        try {console.log('Adicionando nova tarefa');

            const novaTarefa = new Task(Date.now(), descricao);
            this.tarefas.push(novaTarefa);
            this.SaveAndLoad.saveLocal(this.tarefas);
        } catch (error) {
            console.error('Erro ao adicionar nova tarefa', error.message);
        }

    }

    removerTarefa(id) {
        try {console.log('Removendo tarefa com ID:', id);

            const excluirTarefa = this.tarefas.findIndex(tarefa => tarefa.id === id);
            if(excluirTarefa !== -1) {
                this.tarefas.splice(excluirTarefa, 1);
                this.SaveAndLoad.saveLocal(this.tarefas);
            console.log('Tarefa removida ID:', id);
            }
        } catch (erro) {
            console.error('Erro ao remover tarefa', erro.message);
        }
    }

    filtroTodas() {
        try { console.log('Filtrando tarefas para Todas');

            const tarefasTodas = this.tarefas.filter(tarefa => tarefa.status === false || tarefa.status === true);
            return tarefasTodas;
        } catch (error) {
            console.error('Erro ao filtrar as tarefas para todas', error.message);
        }
        
    }

    filtroPendentes() {
        try {console.log('Filtrando tarefas para Pendentes');

            const tarefasPendentes = this.tarefas.filter(tarefa => tarefa.status === false);
            return tarefasPendentes;
        } catch (error) {
            console.error('Erro ao filtrar as tarefas para Pendentes', error.message);
        }
    }

    filtroConcluidas() {
        try {console.log('Filtrando tarefas para Concluidas');

            const tarefasConcluidas = this.tarefas.filter(tarefa => tarefa.status === true);
            return tarefasConcluidas;
        } catch (error) {
            console.error('Erro ao filtrar as tarefas para Concluidas', error.message);
        }

    }

    alterarStatus(id) {
        try {console.log('Alternado status da tarefa com ID:', id);

            const tarefasStatus = this.tarefas.find(tarefa => tarefa.id === id);
            if(tarefasStatus){
            tarefasStatus.mudancaStatus();
            console.log(`Tarefa ID:${ id} alterado para`, tarefasStatus.status);
            this.SaveAndLoad.saveLocal(this.tarefas);
            } else {
                console.warn(`Tarefa com ID: ${id}, não encontrada`)
            }
        } catch (error) {
            console.error('Erro ao alterar o status da tarefa com ID:', id, error.message);
        }
    }

    listarTarefas() {
        try {console.log('Listando as tarefas');
            return this.tarefas;
        } catch (error) {
            console.error('Erro ao listar as tarefas', error.message);
        }
    }
}
