interface Post {
    title: string;
    excerpt: string;
    url: string;
  }
  
  const posts: Post[] = [
    { title: 'Top Web Trends 2025', excerpt: 'Explore the latest trends...', url: '#' },
    { title: 'App Dev Best Practices', excerpt: 'Tips for successful apps.', url: '#' },
  ];
  
  export default function Blog() {
    return (
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Latest Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <a href={post.url} className="text-indigo-600 hover:text-indigo-500">Read More</a>
            </div>
          ))}
        </div>
      </div>
    );
  }