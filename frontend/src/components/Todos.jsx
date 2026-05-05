import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";

function Todos() {
  const token = localStorage.getItem("token");
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setTodos(data);
      } else {
        setError("Failed to fetch todos");
      }
    } catch (err) {
      setError("Network error. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // CREATE todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newTodo)
      });

      if (res.ok) {
        const data = await res.json();
        setTodos([data.todo, ...todos]);
        setNewTodo({ title: "", description: "" });
      }
    } catch (err) {
      setError("Failed to create todo");
    }
  };

  // TOGGLE todo
  const handleToggle = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}/toggle`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setTodos(todos.map(todo => 
          todo._id === id ? data.todo : todo
        ));
      }
    } catch (err) {
      setError("Failed to toggle todo");
    }
  };

  // Start editing
  const startEditing = (todo) => {
    setEditingTodo(todo._id);
    setEditData({ title: todo.title, description: todo.description });
  };

  // UPDATE todo
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });

      if (res.ok) {
        const data = await res.json();
        setTodos(todos.map(todo => 
          todo._id === id ? data.todo : todo
        ));
        setEditingTodo(null);
      }
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  // DELETE todo
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (res.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      }
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Todos</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Todo Form */}
      <form onSubmit={handleCreateTodo} className="mb-8 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <textarea
            placeholder="Add a description (optional)"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Add Todo
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <p className="mt-2">No todos yet. Create your first todo above!</p>
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo._id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                todo.completed ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300 hover:shadow-md"
              }`}
            >
              {editingTodo === todo._id ? (
                // Edit Mode
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="2"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(todo._id)}
                      className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition-colors duration-200 text-sm font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTodo(null)}
                      className="bg-gray-500 text-white px-4 py-1.5 rounded hover:bg-gray-600 transition-colors duration-200 text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggle(todo._id)}
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${
                        todo.completed ? "line-through text-gray-500" : "text-gray-800"
                      }`}>
                        {todo.title}
                      </h3>
                      {todo.description && (
                        <p className={`mt-1 text-sm ${
                          todo.completed ? "line-through text-gray-400" : "text-gray-600"
                        }`}>
                          {todo.description}
                        </p>
                      )}
                      <p className="mt-2 text-xs text-gray-400">
                        Created: {new Date(todo.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(todo)}
                      className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="px-3 py-1.5 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todos;