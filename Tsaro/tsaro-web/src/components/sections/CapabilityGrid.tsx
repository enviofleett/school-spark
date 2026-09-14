export default function CapabilityGrid({ content }: { content?: any }) {
  return (
    <section id="capabilities" className="py-24 px-6 md:px-12 bg-obsidian relative">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                <div className="md:w-1/2">
                    <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
                        {content?.title || (
                            <>
                                Two disciplines. <br />
                                One accountable firm.
                            </>
                        )}
                    </h2>
                </div>
                <div className="md:w-1/3">
                    <p className="text-textMuted text-sm leading-relaxed">
                        {content?.subtitle || "Most advisors stop at the strategy. We stay for the delivery."}
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 rounded-sm">
                
                {/* Arm 01 */}
                <div className="p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors group">
                    <div>
                        <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-8">
                            ARM 01
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Strategy & Public Sector Advisory
                        </h3>
                        <p className="text-textMuted text-sm leading-relaxed mb-12">
                            Policy design, regulatory structure, and the institutional groundwork a government needs settled before anything can be built on top of it.
                        </p>
                    </div>
                    <div>
                        <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1">
                            EXPLORE <span className="font-normal">→</span>
                        </a>
                    </div>
                </div>

                {/* Arm 02 */}
                <div className="p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors group">
                    <div>
                        <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-8">
                            ARM 02
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Delivery, Procurement & Construction
                        </h3>
                        <p className="text-textMuted text-sm leading-relaxed mb-12">
                            Programme management, supply chain, and construction oversight that carries a strategy through to something a minister can actually point to.
                        </p>
                    </div>
                    <div>
                        <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1">
                            EXPLORE <span className="font-normal">→</span>
                        </a>
                    </div>
                </div>

                {/* Arm 03 */}
                <div id="academy" className="p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors group">
                    <div>
                        <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-8">
                            ARM 03
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Institute
                        </h3>
                        <p className="text-textMuted text-sm leading-relaxed mb-12">
                            A talent and convening arm — training programmes and a standing forum for the people who will run what we help build.
                        </p>
                    </div>
                    <div>
                        <a href="/academy" className="inline-flex items-center gap-2 text-xs font-bold text-white tracking-widest uppercase border-b border-transparent group-hover:border-white transition-all pb-1">
                            EXPLORE <span className="font-normal">→</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}
