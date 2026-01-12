/**
 * Footer component - Displays site information, links, and disclaimers
 */
export const Footer = () => {
  return (
    <footer className="w-full border-t border-purple-500/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Site name and disclaimer */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <h3 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Crown
              </span>
            </h3>
            <p className="text-sm text-gray-400">
              This site is not affiliated with Riot Games
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex flex-col  gap-3">
            <a
              href="https://www.leagueoflegends.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-medium"
            >
              League of Legends
            </a>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span>Made by</span>
              <a
                href="https://www.sacha-marits.be"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Sacha Marits
              </a>
            </div>
          </div>

          {/* Right side - Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/GROAHHH"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter/X"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
