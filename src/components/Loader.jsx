const Loader = () => {
  return (
    <div className="flex gap-2 justify-center items-center h-40">
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.15s]"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]"></div>
    </div>
  )
}

export default Loader

