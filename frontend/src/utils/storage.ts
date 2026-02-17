import { Task } from "../types";

const STORAGE_KEY = "ketcher_demo_tasks";

export const storageService = {
  // 获取所有任务
  getTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("读取任务失败:", error);
      return [];
    }
  },

  // 保存所有任务
  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("保存任务失败:", error);
    }
  },

  // 清空所有任务
  clearTasks(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // 初始化演示数据
  initDemoData(): Task[] {
    const demoTasks: Task[] = [
      { id: "task-1", title: "Mol-0001", status: "NEW", source: { smiles: "CCO" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-2", title: "Mol-0002", status: "NEW", source: { smiles: "c1ccccc1" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-3", title: "Mol-0003", status: "NEW", source: { smiles: "C1CCCCC1" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-4", title: "Mol-0004", status: "NEW", source: { smiles: "CC(C)O" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-5", title: "Mol-0005", status: "NEW", source: { smiles: "C1=CC=C(C=C1)O" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-6", title: "Mol-0006", status: "NEW", source: { smiles: "CC(=O)O" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-7", title: "Mol-0007", status: "NEW", source: { smiles: "C1CCCNC1" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-8", title: "Mol-0008", status: "NEW", source: { smiles: "CC(C)(C)O" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-9", title: "Mol-0009", status: "NEW", source: { smiles: "c1ccc2ccccc2c1" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
      { id: "task-10", title: "Mol-0010", status: "NEW", source: { smiles: "CC(=O)C" }, annotation: null, review: null, context: { ph: null, solvent: null, temperature: null } },
    ];
    this.saveTasks(demoTasks);
    return demoTasks;
  },
};
