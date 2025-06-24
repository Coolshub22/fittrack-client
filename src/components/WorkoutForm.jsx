import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const WorkoutForm = ({ initialData, onSubmit, isSubmitting, pageTitle, actionText }) => {
  const [formData, setFormData] = useState({ name: '', date: '', notes: '' });

  useEffect(() => {
    const defaultDate = new Date().toISOString().split('T')[0];
    setFormData({
      name: initialData?.name || '',
      date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : defaultDate,
      notes: initialData?.notes || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-slate-100 mb-6">{pageTitle}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Workout Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 border-slate-700 rounded-md p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="e.g., Morning Run"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full bg-slate-800 border-slate-700 rounded-md p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-1">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full bg-slate-800 border-slate-700 rounded-md p-3 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            placeholder="Any details about your session..."
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : (
              <>
                <Save size={18} /> {actionText}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};


export default function App() {
    const [submitting, setSubmitting] = useState(false);
    const editData = { name: 'Leg Day', date: '2025-06-23', notes: 'Squats, deadlifts, and lunges.' };

    const handleFormSubmit = (data) => {
        setSubmitting(true);
        console.log("Form Data Submitted:", data);
        setTimeout(() => {
            alert(`Submitted data: ${JSON.stringify(data, null, 2)}`);
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div className="bg-slate-900 min-h-screen p-8 font-sans">
            <div className="max-w-2xl mx-auto space-y-12">
                <WorkoutForm
                    onSubmit={handleFormSubmit}
                    isSubmitting={submitting}
                    pageTitle="Log a New Workout"
                    actionText="Create Workout"
                />
                <hr className="border-slate-700"/>
                <WorkoutForm
                    initialData={editData}
                    onSubmit={handleFormSubmit}
                    isSubmitting={submitting}
                    pageTitle="Edit Workout"
                    actionText="Save Changes"
                />
            </div>
        </div>
    );
}
