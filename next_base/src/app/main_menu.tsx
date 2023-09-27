export function MainMenu() {
  let stateProxy: string = "difficulty";

  return (
    <div
      id="background"
      className="w-full h-full flex items-center bg-hexTri bg-[length:1400px_840px] bg-center animate-marqee overflow-hidden"
    >
      <div
        id="menu-bar"
        className="w-full h-2/5 border border-black bg-sky-500"
      >
        {stateProxy === "title" && <TitleScreen />}
        {stateProxy === "player" && <PlayerSelect />}
        {stateProxy === "difficulty" && <DiffilultySelect />}
      </div>
    </div>
  );
}

function TitleScreen() {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-col"
    >
      <h1
        id="title"
        className="text-zinc-900 text-center mb-1 cursor-pointer text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
      >
        HEX
      </h1>
      <h2
        id="sub-title"
        className="font-mono text-zinc-950 text-center animate-pulse cursor-pointer text-lg sm:text-xl md:text-3xl lg:text-4xl"
      >
        <em>Click to start</em>
      </h2>
    </section>
  );
}

function PlayerSelect() {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-col"
    >
      <button
        id="vsAI"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-sky-400 hover:bg-blue-300 text-black font-mono text-xl sm:text-2xl md:text-3xl"
      >
        1 Player
      </button>
      <button
        id="vsPlayer"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-sky-400 hover:bg-blue-300 text-black font-mono text-xl sm:text-2xl md:text-3xl"
      >
        2 Players
      </button>
    </section>
  );
}

function DiffilultySelect() {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-wrap flex-col"
    >
      <button
        id="easy"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-sky-700 hover:bg-blue-300 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
      >
        Easy (6x6)
      </button>
      <button
        id="normal"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-sky-700 hover:bg-blue-300 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
      >
        Normal (9x9)
      </button>
      <button
        id="hard"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-sky-700 hover:bg-blue-300 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
      >
        Hard (14x14)
      </button>
      <button
        id="back"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-orange-800 hover:bg-yellow-500 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
      >
        Back
      </button>
    </section>
  );
}
