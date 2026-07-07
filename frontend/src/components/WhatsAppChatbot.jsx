import React, { useState } from 'react';

const WhatsAppChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (window.location.pathname.startsWith('/admin')) {
    return null;
  }

  const rawMessage = `Hello Ujjwal`;

  const whatsappUrl = `https://wa.me/918576084127?text=${encodeURIComponent(rawMessage)}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[360px] rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center border border-white/20">
                <img src="/logo.jpg" alt="OVS Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-body-md leading-tight">Ujjwal Pandey</h4>
                <p className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  CEO & Founder • Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="bg-[#ece5dd] p-4 flex-grow max-h-[300px] overflow-y-auto space-y-4 custom-scrollbar">
            {/* System Info */}
            <div className="text-center">
              <span className="bg-white/70 text-[10px] text-on-surface-variant/80 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                WhatsApp Chatbot
              </span>
            </div>

            {/* CEO Message */}
            <div className="flex gap-2 items-start max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex-shrink-0 border border-outline-variant/20">
                <img src="/logo.jpg" alt="OVS Logo" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white text-on-surface p-3 rounded-lg rounded-tl-none shadow-sm text-xs leading-relaxed space-y-1">
                <p className="font-semibold text-primary">Hello</p>
              </div>
            </div>
          </div>

          {/* Footer Input/Action Area */}
          <div className="p-3 bg-white border-t border-outline-variant/20 flex flex-col gap-2">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-all shadow-md active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              Continue to Chat / WhatsApp Us
            </a>
            <div className="flex justify-between text-[9px] text-on-surface-variant/60 px-1">
              <span>Typically replies instantly</span>
              <span>Secure connection</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25 group-hover:hidden"></div>
        <svg className="w-8 h-8 text-white fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.516.899 3.3 1.374 5.24 1.375 5.405 0 9.803-4.397 9.805-9.805.001-2.618-1.02-5.08-2.871-6.932-1.851-1.852-4.314-2.872-6.931-2.872-5.405 0-9.803 4.398-9.806 9.806 0 2.077.52 4.108 1.503 5.9l-.99 3.616 3.699-.971zm11.367-5.115c-.314-.157-1.859-.918-2.148-1.023-.288-.105-.499-.157-.709.157-.21.314-.813 1.023-.996 1.232-.183.21-.367.236-.681.079-.314-.157-1.325-.488-2.525-1.558-.933-.832-1.563-1.86-1.747-2.174-.183-.314-.02-.485.137-.642.142-.141.314-.367.471-.55.157-.184.21-.314.314-.524.105-.21.053-.393-.026-.55-.079-.157-.709-1.705-.971-2.334-.255-.612-.513-.529-.709-.538-.182-.008-.393-.01-.603-.01-.21 0-.551.079-.839.393s-1.101 1.075-1.101 2.622c0 1.547 1.127 3.044 1.284 3.254.157.21 2.217 3.386 5.371 4.748.75.324 1.335.518 1.791.663.753.239 1.438.205 1.98.124.605-.09 1.859-.76 2.121-1.496.262-.736.262-1.364.183-1.496-.079-.131-.288-.21-.603-.367z"></path>
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppChatbot;
