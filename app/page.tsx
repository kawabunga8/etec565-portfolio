export default function Home() {
  const assignments = [
    {
      id: 1,
      slug: "assignment-1",
      title: "Investigating Biases and Blind Spots in AI Systems",
      description: "Examining hidden assumptions in AI-generated report card comments through testing with ChatGPT, Gemini, and Claude.",
      status: "Completed",
      date: "Summer 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/StockSnap_V9L6XXK3LB.jpg)'}}>
      <header className="w-full h-32 bg-blue-950 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">ETEC 565</h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 bg-black/60 rounded-lg m-6 backdrop-blur-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
            Assignments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignments.map((assignment) => (
              <a
                key={assignment.id}
                href={assignment.slug ? `/assignments/${assignment.slug}` : "#"}
                className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow hover:border-blue-300 dark:hover:border-blue-700 group"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {assignment.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {assignment.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-500">
                    {assignment.date}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {assignment.status}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
