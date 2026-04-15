const QuizSkeleton   = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse">
    <div className="flex justify-between mb-4">
      <div className="h-4 w-3/5 bg-gray-100 rounded-lg" />
      <div className="h-5 w-16 bg-gray-100 rounded-full" />
    </div>
    <div className="h-3 w-full bg-gray-100 rounded mb-2" />
    <div className="h-3 w-4/5 bg-gray-100 rounded mb-6" />
    <div className="flex gap-2 mb-5">
      <div className="h-6 w-20 bg-gray-100 rounded-lg" />
      <div className="h-6 w-16 bg-gray-100 rounded-lg" />
    </div>
    <div className="h-10 w-full bg-gray-100 rounded-xl" />
  </div>
);

export default QuizSkeleton;