import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-[--subtle] space-y-2">
          <div className="text-sm font-medium tracking-wide">
            <a 
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[--accent-2] hover:text-[--accent-2] transition-colors"
            >
              CC BY-NC-SA 4.0
            </a>
          </div>
          <div className="text-sm">
            Build with <a 
              href="https://astro.build/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[--accent-2] hover:text-[--accent-2] transition-colors"
            >
              Astro
            </a> & <a 
              href="https://github.com/SanXiaoXing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[--accent-2] hover:text-[--accent-2] transition-colors"
            >
              SanXiaoXing
            </a>.
          </div>
          <div className="text-sm">
            © {new Date().getFullYear() > 2025 ? `2025 — ${new Date().getFullYear()}` : '2025'}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;