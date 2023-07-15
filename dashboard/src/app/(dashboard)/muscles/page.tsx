const muscles = [
  {id: 'shoulders', name: 'Deltóides'},
  {id: 'chest', name: 'Peitorais'},
  {id: 'biceps', name: 'Bíceps'},
  {id: 'triceps', name: 'Tríceps'},
  {id: 'back', name: 'Costas'},
  {id: 'legs', name: 'Pernas'},
  {id: 'calves', name: 'Panturrilhas'},
  {id: 'abs', name: 'Abdominais'},
]


export default function Muscles() {
  return (
    <ul className="flex flex-wrap gap-3">
      {muscles.map(muscle => (
        <li
          className="flex gap-10 items-center bg-stone-900 text-white px-5 py-3 rounded-2xl" 
          key={muscle.id}>
          <p>{muscle.name}</p>
          <div className="flex gap-3">
            <button className="bg-stone-800 text-white px-3 py-1 rounded-md">Editar</button>
            <button className="bg-stone-800 text-white px-3 py-1 rounded-md">Excluir</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
