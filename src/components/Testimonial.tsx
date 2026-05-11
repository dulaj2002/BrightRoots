import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, rating }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{content}"</p>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
};

export default Testimonial;