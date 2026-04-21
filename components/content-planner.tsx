import { plannedPosts, plannerDays } from '@/lib/dummy-data';

const postStatusStyle: Record<string, string> = {
  Draft: 'bg-slate-100 text-slate-700',
  Scheduled: 'bg-blue-100 text-blue-700',
  'Needs Feedback': 'bg-amber-100 text-amber-700'
};

export function ContentPlanner() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Content planner</h2>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-7">
          {plannerDays.map((day) => (
            <div className="rounded-lg border border-slate-100 p-3 text-center" key={`${day.label}-${day.date}`}>
              <p className="text-xs uppercase text-slate-500">{day.label}</p>
              <p className="text-lg font-semibold">{day.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {plannedPosts.map((post) => (
          <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" key={post.id}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">{post.date}</p>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${postStatusStyle[post.status]}`}>
                {post.status}
              </span>
            </div>
            <h3 className="mb-2 text-base font-semibold">{post.title}</h3>
            <p className="mb-4 text-sm text-slate-600">{post.caption}</p>
            <div className="flex gap-2">
              <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white" type="button">
                Approve
              </button>
              <button
                className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700"
                type="button"
              >
                Request edits
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
