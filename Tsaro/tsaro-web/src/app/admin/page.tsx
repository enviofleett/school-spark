export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Command Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stat Cards */}
        <div className="capability-card p-6 rounded-lg">
          <h3 className="text-textMuted text-sm font-medium uppercase tracking-wider mb-2">Total Pages</h3>
          <p className="text-4xl font-bold text-white">5</p>
        </div>
        
        <div className="capability-card p-6 rounded-lg">
          <h3 className="text-textMuted text-sm font-medium uppercase tracking-wider mb-2">Active Menus</h3>
          <p className="text-4xl font-bold text-white">2</p>
        </div>
        
        <div className="capability-card p-6 rounded-lg">
          <h3 className="text-textMuted text-sm font-medium uppercase tracking-wider mb-2">System Status</h3>
          <p className="text-2xl font-bold text-green-500 flex items-center gap-2 mt-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            Operational
          </p>
        </div>
      </div>

      <div className="mt-10 bg-charcoal border border-white/10 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
        <p className="text-textLight text-sm">No recent activity detected. The CMS is ready for configuration.</p>
      </div>
    </div>
  )
}
