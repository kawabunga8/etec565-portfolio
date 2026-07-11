export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-row items-center justify-between gap-4 py-6 px-8" style={{backgroundColor: '#002145'}}>
      <a href="/" className="text-4xl font-bold text-white whitespace-nowrap hover:text-[#B4985B] transition-colors">ETEC 565</a>
      <div className="flex items-center gap-6">
        <p className="text-base text-[#B4985B] text-right max-w-2xl hidden md:block">Ethical, Critical, and Professional Use of Generative AI in Teaching and Learning</p>
        <a
          href="https://met-portfolio-ten.vercel.app"
          className="px-5 py-2 rounded-lg border border-[#B4985B] text-white font-medium whitespace-nowrap hover:bg-[#B4985B] hover:text-[#002145] transition-colors"
        >
          MET ePortfolio
        </a>
      </div>
    </header>
  );
}
