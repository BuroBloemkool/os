import { activeDeliverables, happeningNow, quickActions } from '@/lib/dummy-data';

const statusStyle: Record<string, string> = {
  'On Track': 'bg-emerald-100 text-emerald-700',
  'Needs Review': 'bg-amber-100 text-amber-700',
  'At Risk': 'bg-rose-100 text-rose-700'
};

export function DashboardSection() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">What&apos;s happening now</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {happeningNow.map((item) => (
              <li className="rounded-lg bg-slate-50 p-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Quick actions</h2>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                className="rounded-lg bg-slateBrand px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                key={action}
                type="button"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Active deliverables</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="pb-2">Deliverable</th>
                <th className="pb-2">Owner</th>
                <th className="pb-2">Due</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {activeDeliverables.map((item) => (
                <tr className="border-t border-slate-100" key={item.id}>
                  <td className="py-3 font-medium">{item.name}</td>
                  <td className="py-3">{item.owner}</td>
                  <td className="py-3">{item.dueDate}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusStyle[item.status]}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
