export default function ExerciseList() {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      name: 'Push-ups',
      category: 'Strength',
      muscleGroup: 'Chest',
      equipment: 'None (Bodyweight)',
      difficulty: 'beginner',
      instructions: 'Start in a plank position. Lower your body until your chest nearly touches the floor, then push back up to starting position.'
    },
    {
      id: 2,
      name: 'Squats',
      category: 'Strength',
      muscleGroup: 'Legs',
      equipment: 'None (Bodyweight)',
      difficulty: 'beginner',
      instructions: 'Stand with feet shoulder-width apart. Lower your body as if sitting back into a chair, then return to standing position.'
    },
    {
      id: 3,
      name: 'Deadlifts',
      category: 'Strength',
      muscleGroup: 'Back',
      equipment: 'Barbell',
      difficulty: 'intermediate',
      instructions: 'Stand with feet hip-width apart, grip the barbell. Keep your back straight as you lift the weight by extending your hips and knees.'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterMuscle, setFilterMuscle] = useState('');

  // Filter exercises based on search and filters
  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.instructions.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || exercise.category === filterCategory;
    const matchesMuscle = !filterMuscle || exercise.muscleGroup === filterMuscle;
    
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  const handleAddExercise = (exerciseData) => {
    const newExercise = {
      ...exerciseData,
      id: Math.max(...exercises.map(e => e.id), 0) + 1
    };
    setExercises([...exercises, newExercise]);
    setShowForm(false);
  };

  const handleEditExercise = (exerciseData) => {
    setExercises(exercises.map(ex => 
      ex.id === editingExercise.id ? { ...exerciseData, id: editingExercise.id } : ex
    ));
    setEditingExercise(null);
    setShowForm(false);
  };

  const handleDeleteExercise = (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };

  const startEdit = (exercise) => {
    setEditingExercise(exercise);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingExercise(null);
  };

  const categories = ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Sports', 'Functional'];
  const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core', 'Full Body', 'Cardio'];

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Exercise Library</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-medium"
          >
            Add Exercise
          </button>
        </div>

        {showForm && (
          <div className="mb-6">
            <ExerciseForm
              exercise={editingExercise}
              mode={editingExercise ? 'edit' : 'create'}
              onSubmit={editingExercise ? handleEditExercise : handleAddExercise}
              onCancel={cancelForm}
            />
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Search</label>
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Muscle Group</label>
              <select
                value={filterMuscle}
                onChange={(e) => setFilterMuscle(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value="">All Muscle Groups</option>
                {muscleGroups.map(muscle => (
                  <option key={muscle} value={muscle}>{muscle}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Exercise Count */}
        <div className="mb-4">
          <p className="text-gray-400">
            Showing {filteredExercises.length} of {exercises.length} exercises
          </p>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onEdit={startEdit}
              onDelete={handleDeleteExercise}
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No exercises found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('');
                setFilterMuscle('');
              }}
              className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}