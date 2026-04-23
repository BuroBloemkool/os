import { Sidebar } from '@/components/sidebar';
import { ContentPlanner } from '@/components/content-planner';

export default function ContentPlannerPage() {
  return (
    <main className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8">
        <ContentPlanner />
      </div>
    </main>
  );
}