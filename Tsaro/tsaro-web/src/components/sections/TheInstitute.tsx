export default function TheInstitute({ content }: { content?: any }) {
  return (
    <section id="institute" className="py-24 px-6 md:px-12 bg-[#1A1A17] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="md:w-7/12">
                    <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
                        {content?.headline || (
                            <>
                                Where the next<br />generation of this work<br />gets built.
                            </>
                        )}
                    </h2>
                </div>
                <div className="md:w-4/12">
                    <p className="text-textMuted text-sm leading-relaxed max-w-sm">
                        {content?.text_1 || "Two standing platforms, separately run, feeding expertise back into everything above."}
                    </p>
                </div>
            </div>

            {/* 2-Column Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded-sm">
                
                {/* Tsaro Academy */}
                <div className="p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors group">
                    <div>
                        <a href="https://academy.tsaroglobaldefence.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6 hover:text-white transition-colors">
                            ACADEMY.TSAROGLOBALDEFENCE.COM 
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Tsaro Academy
                        </h3>
                        <p className="text-textMuted text-sm leading-relaxed mb-12">
                            Professional certification and command-tier training for the institutions we work with — run as its own school, not a page on this site.
                        </p>
                    </div>
                    <div>
                        <a href="/academy" className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1">
                            VISIT ACADEMY <span className="font-normal">→</span>
                        </a>
                    </div>
                </div>

                {/* Tsaro Conversations */}
                <div className="p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                    <div>
                        <a href="https://conversations.tsaroglobaldefence.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6 hover:text-white transition-colors">
                            CONVERSATIONS.TSAROGLOBALDEFENCE.COM 
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Tsaro Security Conversations
                        </h3>
                        <p className="text-textMuted text-sm leading-relaxed mb-12">
                            A standing forum convening policymakers and practitioners across national, continental, and global tiers.
                        </p>
                    </div>
                    <div>
                        <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1">
                            VISIT CONVERSATIONS <span className="font-normal">→</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}
