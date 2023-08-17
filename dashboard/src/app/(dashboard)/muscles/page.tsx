// const muscles = [
//   {id: 'shoulders', name: 'Deltóides'},
//   {id: 'chest', name: 'Peitorais'},
//   {id: 'biceps', name: 'Bíceps'},
//   {id: 'triceps', name: 'Tríceps'},
//   {id: 'back', name: 'Costas'},
//   {id: 'legs', name: 'Pernas'},
//   {id: 'calves', name: 'Panturrilhas'},
//   {id: 'abs', name: 'Abdominais'},
// ]

import { cookies } from "next/dist/client/components/headers";
import { redirect } from 'next/navigation';
import { AUTH_TOKEN_COOKIE } from "../../../constants/cookies";
import { API_GATEWAY_URL } from "../../../constants/gateways";
import CreateMuscleForm from "./CreateMuscleForm";

const fetchMuscles = async (token: string) => {
  const response = await fetch(`${API_GATEWAY_URL}/muscles`, {
    headers: { authorization: `Bearer ${token}` }
  });

  if (response.status >= 400) {
    return []
  }

  const data = await response.json();
  return data;
}

type Muscle = {
  id: string;
  name: string;
}


export default async function Muscles() {
  const tokenCookie = cookies().get(AUTH_TOKEN_COOKIE)

  if(!tokenCookie) {
    redirect('/login')
  }

  const muscles = await fetchMuscles(tokenCookie.value) as Muscle[];
  return (
    <section>
      <h2 className="text-center font-semibold mb-10">Músculos cadastrados</h2>
      <CreateMuscleForm />
      <ul className="flex flex-wrap gap-3 my-10">
        {muscles.map(muscle => (
          <li
            className="flex gap-10 items-center bg-stone-950 text-white px-5 py-3 rounded-2xl" 
            key={muscle.id}>
            <p className="text-lg">{muscle.name}</p>
            <div className="flex gap-3">
              <button type="button" className="bg-stone-800 text-white px-3 py-1 rounded-md hover:scale-105 active:opacity-80">Editar</button>
              <button type="button" className="bg-stone-800 text-white px-3 py-1 rounded-md hover:scale-105 active:opacity-80">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
