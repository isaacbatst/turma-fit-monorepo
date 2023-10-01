'use client'
import React, { PropsWithChildren } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { AiOutlineMenu } from 'react-icons/ai';

type Props = {
  id: string
}

export function SortableItem({id, children}: PropsWithChildren<Props>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div  ref={setNodeRef}  style={style} className='flex items-center gap-3'>
      <AiOutlineMenu  {...listeners} {...attributes} />
      {children}
    </div>
  );
}