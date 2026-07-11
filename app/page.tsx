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
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: 'url(/StockSnap_O23H6MFZTV.jpg)'}}>
      <header className="sticky top-0 z-50 w-full bg-blue-950 flex flex-row items-center justify-between py-6 px-8">
        <a href="/" className="text-4xl font-bold text-white whitespace-nowrap hover:text-yellow-400 transition-colors">ETEC 565</a>
        <p className="text-base text-yellow-400 text-right max-w-2xl">Ethical, Critical, and Professional Use of Generative AI in Teaching and Learning</p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 bg-black/60 rounded-lg m-6 backdrop-blur-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
            Assignments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignments.map((assignment) => (
              <a
                key={assignment.id}
                href={assignment.slug ? `/assignments/${assignment.slug}` : "#"}
                className="bg-cover bg-center rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-shadow hover:border-blue-300 dark:hover:border-blue-700 group"
                style={{backgroundImage: 'url(/StockSnap_H5CCPV9ZFQ.jpg)'}}
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
