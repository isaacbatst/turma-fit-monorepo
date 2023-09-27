'use client'
import { Skeleton } from 'antd'
import { useMoviments } from '../../../hooks/useMoviments'
import MovimentListItem from './MovimentListItem'

const MovimentsList = () => {
  const { moviments = [], isLoading } = useMoviments()
  return isLoading 
    ? <>
      <li className='flex flex-col gap-3 bg-slate-300 bg-opacity-10 border border-stone-400 border-opacity-30  p-5 rounded-lg self-start'>
        <Skeleton active /></li>
      <li className='flex flex-col gap-3 bg-slate-300 bg-opacity-10 border border-stone-400 border-opacity-30  p-5 rounded-lg self-start'>
        <Skeleton active /></li>
      <li className='flex flex-col gap-3 bg-slate-300 bg-opacity-10 border border-stone-400 border-opacity-30  p-5 rounded-lg self-start'>
        <Skeleton active /></li>
    </>
    :
    (
      moviments.map((moviment, index) => <MovimentListItem index={index + 1} moviment={moviment} key={moviment.id} />)
    )
}

export default MovimentsList