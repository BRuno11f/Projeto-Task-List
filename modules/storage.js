import { Task } from "./Task.js";

export class SaveAndLoad {
    constructor(key = 'tasks') {
        this.key = key;
    }

    saveLocal(tasks) {
        localStorage.setItem(this.key, JSON.stringify(tasks));
    }

    loadLocal() {
        const data = localStorage.getItem(this.key);
        if(data) {
            const tarefasParse = JSON.parse(data);
            return tarefasParse.map(tarefas => new Task(tarefas.id, tarefas.descricao, tarefas.status));
        }
        return []
        }
    
    clearLocal() {
        localStorage.removeItem(this.key);
    }
    }
