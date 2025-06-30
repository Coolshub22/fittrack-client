import React from 'react';
import { Dumbbell, Edit, Trash2 } from 'lucide-react';

export default function ExerciseCard({ exercise, onEdit, onDelete }) {
  const {
    id,
    name,
    type,
  } = exercise;

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-5 flex flex-col justify-between h-full transition-transform hover:scale-[1.02]">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <Dumbbell className="text-sky-400" size={20} />
        </div>

        <p className="text-sm text-gray-400 mb-1">
          <span className="font-medium text-gray-300">Type:</span> {type}
        </p>
        
      </div>

      <div className="flex justify-end gap-3 mt-auto pt-2">
        <button
          onClick={() => onEdit(exercise)}
          className="p-2 rounded bg-sky-600 hover:bg-sky-500 text-white transition"
          aria-label={`Edit ${name}`}
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-2 rounded bg-red-600 hover:bg-red-500 text-white transition"
          aria-label={`Delete ${name}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
