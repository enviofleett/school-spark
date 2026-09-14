export default function Commitments({ content }: { content?: any }) {
  return (
    <section id="commitments" className="py-24 px-6 md:px-12 bg-obsidian relative">
        <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-20 gap-8">
                <div className="md:w-1/2">
                    <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
                        {content?.headline || (
                            <>
                                What we won't do<br />differently for speed.
                            </>
                        )}
                    </h2>
                </div>
                <div className="md:w-1/3">
                    <p className="text-textMuted text-sm leading-relaxed">
                        {content?.text_1 || "Three commitments that hold regardless of client, sector, or deadline."}
                    </p>
                </div>
            </div>

            {/* 2x2 Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                
                {/* Item 01 */}
                <div className="border-t border-white/10 pt-8">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        01
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        One firm, start to finish
                    </h3>
                    <p className="text-textMuted text-sm leading-relaxed">
                        The team that designs the strategy stays accountable through delivery — not passed to a separate contractor at the point of highest risk.
                    </p>
                </div>

                {/* Item 02 */}
                <div className="border-t border-white/10 pt-8">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        02
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Independence where it's structurally required
                    </h3>
                    <p className="text-textMuted text-sm leading-relaxed">
                        Advisory and commercial roles are formally separated wherever both exist on the same engagement.
                    </p>
                </div>

                {/* Item 03 */}
                <div className="border-t border-white/10 pt-8">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        03
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Nothing built without governance to run it
                    </h3>
                    <p className="text-textMuted text-sm leading-relaxed">
                        Physical delivery never outruns the institutional capacity to operate what's been delivered.
                    </p>
                </div>

                {/* Item 04 */}
                <div className="border-t border-white/10 pt-8">
                    <div className="text-[11px] font-mono text-brandRed font-semibold tracking-widest uppercase mb-6">
                        04
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                        Built for the record
                    </h3>
                    <p className="text-textMuted text-sm leading-relaxed">
                        Every recommendation is documented to withstand scrutiny long after the engagement ends.
                    </p>
                </div>

            </div>
        </div>
    </section>
  )
}
