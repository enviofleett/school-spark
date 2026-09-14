export default function OperationalDifferentiator({ content }: { content?: any }) {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-charcoal/30 relative">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
                <div className="md:w-1/2">
                    <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
                        {content?.headline || (
                            <>
                                Five stages, the same<br />firm throughout.
                            </>
                        )}
                    </h2>
                </div>
                <div className="md:w-1/3">
                    <p className="text-textMuted text-sm leading-relaxed">
                        {content?.text_1 || "No handoff between the people who wrote the plan and the people who built it."}
                    </p>
                </div>
            </div>

            {/* 5-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-white/10 rounded-sm">
                
                {/* Stage 1 */}
                <div className="p-8 flex flex-col border-b sm:border-b-0 lg:border-r sm:border-r border-white/10 hover:bg-white/[0.02] transition-colors">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        N° 01
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Assess
                    </h3>
                    <p className="text-textMuted text-xs leading-relaxed">
                        Establish the real constraints — legal, fiscal, political — before proposing anything.
                    </p>
                </div>

                {/* Stage 2 */}
                <div className="p-8 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 hover:bg-white/[0.02] transition-colors">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        N° 02
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Design
                    </h3>
                    <p className="text-textMuted text-xs leading-relaxed">
                        Build the structure the solution will run inside, not just the solution itself.
                    </p>
                </div>

                {/* Stage 3 */}
                <div className="p-8 flex flex-col border-b sm:border-b-0 lg:border-b-0 sm:border-r lg:border-r border-white/10 hover:bg-white/[0.02] transition-colors">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        N° 03
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Mobilise
                    </h3>
                    <p className="text-textMuted text-xs leading-relaxed">
                        Procurement, staffing, and supply chain set up to carry the design forward.
                    </p>
                </div>

                {/* Stage 4 */}
                <div className="p-8 flex flex-col border-b sm:border-b-0 lg:border-b-0 lg:border-r border-white/10 hover:bg-white/[0.02] transition-colors">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        N° 04
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Deliver
                    </h3>
                    <p className="text-textMuted text-xs leading-relaxed">
                        Construction and implementation, managed by the firm that designed it.
                    </p>
                </div>

                {/* Stage 5 */}
                <div className="p-8 flex flex-col hover:bg-white/[0.02] transition-colors">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        N° 05
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Sustain
                    </h3>
                    <p className="text-textMuted text-xs leading-relaxed">
                        Training, certification, and operating support that outlast the engagement.
                    </p>
                </div>

            </div>
        </div>
    </section>
  )
}
