function App() {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-zinc-500">
      <h1 className="text-2xl py-2 text-white font-bold">Login Form</h1>
      <div className="w-64 h-auto space-y-4 bg-white rounded-xl shadow-lg shadow-zinc-900 p-4">
        <div className="space-y-2">
          <p className="font-bold capitalize">username / email</p>
          <input
            className="h-8 text-sm w-full border-2 border-zinc-500 rounded-md"
            type="text"
            placeholder="Enter your Username or Email"
          />
        </div>
        <div className="space-y-2">
          <p className="font-bold capitalize">Password</p>
          <input
            className="h-8 text-sm w-full border-2 border-zinc-500 rounded-md"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <button className="h-10 w-full bg-zinc-500 font-bold text-white mt-4 py-2 rounded-lg">
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
