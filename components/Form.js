export const Input = (props) => {
  return <input {...props} className="form-text rounded-lg border-gray-200 focus:border-indigo-100 focus:ring focus:ring-indigo-100 w-full transition duration-300" />
}

export const Label = ({ children, ...props }) => {
  return <label {...props} className="text-sm mb-1 block">
    {children}
  </label>
}

export const Button = ({ children, ...props }) => {
  return <button {...props} className="px-4 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white focus:ring focus:ring-indigo-100 focus:outline-none">
    {children}
  </button>
}

export const Errors = ({ message }) => {
  return <div className="mt-2 text-rose-500 font-medium text-sm">{message}</div>
}
