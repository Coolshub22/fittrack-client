import React from 'react';
import { Calendar, FileText, Trash2, Edit } from 'lucide-react';

export default function WorkoutCard({ workout, onSelect, onDelete }) {
  const { id, workout_name, date, notes } = workout;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDelete = (e) => {
    e.stopPropagation(); 
    if (window.confirm('Are you sure you want to delete this workout? This action cannot be undone.')) {
        onDelete(id);
    }
  };
  
  const handleEdit = (e) => {
      e.stopPropagation(); // Prevent the card's onSelect from firing
      onSelect(id, true); // The 'true' flag indicates an edit action
  }

  return (
    <div 
      onClick={() => onSelect(id, false)} // The 'false' flag indicates a view action
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      role="button"
      tabIndex="0"
      aria-label={`View details for ${workout_name}`}
    >
      <div className="p-6 flex-grow flex flex-col">
        {/* Card Header */}
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-2">{workout_name}</h3>
            <div className="flex space-x-2 flex-shrink-0">
                <button 
                  onClick={handleEdit} 
                  className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors" 
                  aria-label={`Edit ${workout_name}`}
                >
                    <Edit size={18}/>
                </button>
                <button 
                  onClick={handleDelete} 
                  className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-gray-700 transition-colors" 
                  aria-label={`Delete ${workout_name}`}
                >
                    <Trash2 size={18}/>
                </button>
            </div>
        </div>

        {/* Card Body */}
        <div className="flex-grow">
            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 text-sm">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                <FileText 
                  className="inline h-4 w-4 mr-2 flex-shrink-0" 
                  style={{verticalAlign: 'text-top'}}
                />
                {notes || "No notes for this workout."}
            </p>
        </div>
      </div>
    </div>
  );
};
