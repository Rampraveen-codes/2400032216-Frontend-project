import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/api/profile').then(r => r.json()).then(setProfile);
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {profile.name || profile.email}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Enrolled" value={profile.enrolledCount || 0} />
        <Stat title="Courses" value={profile.instructorCourseCount || 0} />
        <Stat title="Progress" value={${profile.overallProgress || 0}%} />
      </div>
      <section className="mt-6">
        <h3 className="text-lg font-semibold">Recent activity</h3>
        <ul className="mt-2 text-sm text-gray-600">
          {(profile.recentActivity || []).map((a, i) => (<li key={i}>{a}</li>))}
        </ul>
      </section>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}