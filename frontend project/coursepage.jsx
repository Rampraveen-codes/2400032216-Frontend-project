export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl p-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h2 className="text-4xl font-bold">EduPlatform</h2>
        <p className="mt-4 max-w-2xl">A modern LMS: courses, assignments, discussions and progress tracking.</p>
        <div className="mt-6 space-x-4">
          <a className="px-4 py-2 bg-white text-blue-600 rounded-lg" href="/account/signup">Sign up</a>
          <a className="px-4 py-2 border border-white rounded-lg" href="/courses">Browse courses</a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard title="Students" desc="Track progress, submit assignments and join discussions." />
        <FeatureCard title="Instructors" desc="Create courses, grade and manage content." />
        <FeatureCard title="Admin" desc="Manage users, categories and site settings." />
      </div>
    </section>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}