const navItems = [
  { label: 'Dashboard', href: '#' },
  { label: 'Content Planner', href: '#' },
  { label: 'Deliverables', href: '#' },
  { label: 'Settings', href: '#' }
];

export function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-wide text-slate-500">Client Portal</p>
        <h1 className="text-xl font-semibold text-slateBrand">Studio HQ</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <a
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
              index === 0 ? 'bg-blue-50 text-accent' : 'text-slate-600 hover:bg-slate-100'
            }`}
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
