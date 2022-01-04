export default function Card({children, header}) {
  return (
    <div className="border rounded-xl shadow-md bg-white overflow-hidden">
      <div className="p-5 border-b">
        {header}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}
