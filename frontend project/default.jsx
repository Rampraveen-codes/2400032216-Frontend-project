import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function CoursesPage() {
  const { data, error } = useSWR('/api/courses', fetcher);

  if (error) return <div>Error loading courses</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.courses.map(c => (
          <CourseCard key={c.id} c={c} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ c }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <img src={c.thumbnail_url || '/placeholder.png'} className="h-40 w-full object-cover rounded" alt={c.title} />
      <h3 className="font-semibold mt-3">{c.title}</h3>
      <p className="text-sm text-gray-600">{c.short_description}</p>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm font-medium text-indigo-600">{c.price ? ₹${c.price} : 'Free'}</span>
        <a href={/courses/${c.id}} className="text-sm text-blue-600">Open</a>
      </div>
    </div>
  );
}