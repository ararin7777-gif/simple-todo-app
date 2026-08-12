"use client";

import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
      <path
        d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0-.8 12.2A2 2 0 0 1 15.2 21H8.8a2 2 0 0 1-2-1.8L6 7h12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data: Todo[]) => {
        if (cancelled) return;
        setTodos(data);
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todos),
    });
  }, [todos, loaded]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            ToDo リスト
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {!loaded
              ? "読み込み中..."
              : todos.length === 0
              ? "今日のタスクを追加しましょう"
              : `残り ${remaining} 件 / 全 ${todos.length} 件`}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-xl shadow-slate-200/50 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-800/70 dark:shadow-none sm:p-5">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
              placeholder="新しいタスクを入力..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
            />
            <button
              onClick={addTodo}
              disabled={!input.trim()}
              aria-label="タスクを追加"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-slate-700"
            >
              <PlusIcon />
            </button>
          </div>

          <ul className="mt-4 flex flex-col gap-1.5">
            {loaded && todos.length === 0 && (
              <li className="py-10 text-center text-sm text-slate-400 dark:text-slate-500">
                タスクはまだありません
              </li>
            )}

            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-700/40"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={
                    todo.completed ? "未完了に戻す" : "完了にする"
                  }
                  className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                    todo.completed
                      ? "border-indigo-500 bg-indigo-500 text-white"
                      : "border-slate-300 text-transparent hover:border-indigo-400 dark:border-slate-500"
                  }`}
                >
                  <CheckIcon />
                </button>

                <span
                  className={`flex-1 break-all text-sm transition ${
                    todo.completed
                      ? "text-slate-400 line-through dark:text-slate-500"
                      : "text-slate-700 dark:text-slate-200"
                  }`}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="タスクを削除"
                  className="shrink-0 text-slate-300 opacity-0 transition hover:text-rose-500 group-hover:opacity-100 dark:text-slate-500"
                >
                  <TrashIcon />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
          データはすべての端末で共有されます
        </p>
      </div>
    </main>
  );
}
