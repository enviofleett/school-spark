export default function AuthorityBar({ content }: { content?: any }) {
  // Can be configured from CMS in future
  return (
    <section className="bg-deepGray border-y border-white/5 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 text-xs font-mono font-semibold tracking-widest text-textMuted uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brandRed"></span>
                <span>OPERATIONAL ACCREDITATION & CAPABILITY</span>
            </div>

            <div className="w-full overflow-hidden relative flex">
                <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> Dual USA & Nigeria Headquarters
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> Certified Security Specialists
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> 24/7 Strategic Threat Monitoring
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> Tactical Hardware Integration
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> National Defense Advisory
                    </div>

                    {/* Duplicate for infinite marquee */}
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> Dual USA & Nigeria Headquarters
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> Certified Security Specialists
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> 24/7 Strategic Threat Monitoring
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> Tactical Hardware Integration
                    </div>
                    <div className="flex items-center gap-2 text-textLight/80 font-medium text-xs uppercase tracking-wider">
                        <span className="text-textMuted">—</span> National Defense Advisory
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
