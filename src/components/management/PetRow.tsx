'use client';

import Image from 'next/image';
import { DisableButton } from './DisableButton';
import { FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { IGetPetsResponseModel } from '@/interfaces';
import { PET_SPECIES, STATIC_URLS } from '@/utils/constants';

export const PetRow = (props: IGetPetsResponseModel) => {

  const handleUserVisitProfile = () => {
    window.open(`${process.env.NEXT_PUBLIC_FO_ENDPOINT}/user/${props.ownerId}`);
  };

  const handlePetVisitProfile = () => {
    window.open(`${process.env.NEXT_PUBLIC_FO_ENDPOINT}/pet/${props.id}`);
  };

  const getSpecieName = (specie: PET_SPECIES) => {
    if (specie === PET_SPECIES.CAT) return 'Mèo';
    if (specie === PET_SPECIES.DOG) return 'Chó';
    return 'Khác';
  };

  const getUpdateDate = (date: string) => {
    let result = new Date(props.isUpdatedAt).toLocaleDateString();
    if (result === '1/1/1') return '...';
    return result;
  };

  return (
    <ul className="w-[1280px] flex items-center justify-start mb-1">
      <li className="w-1/12 flex justify-start">
        <div
          className='w-8 h-8 relative cursor-pointer'
          onClick={handlePetVisitProfile}
        >
          <Image
            className='object-cover rounded-full'
            fill
            src={props.image || STATIC_URLS.NO_AVATAR}
            alt={props.image || STATIC_URLS.NO_AVATAR}
          />
        </div>
      </li>
      <li className="w-2/12">{props.name}</li>
      <li className="w-1/12">
        {getSpecieName(props.species)}
      </li>
      <li className="w-2/12">{props.breed}</li>
      <li className="w-1/12 flex justify-center">
        {
          props.isAvailable
            ? <FaCheck color='#92c5fd' />
            : <IoClose color='red' />
        }
      </li>
      <li className="w-1/12">{props.view}</li>
      <li className="w-1/12">
        {new Date(props.isCreatedAt).toLocaleDateString()}
      </li>
      <li className="w-1/12">
        {getUpdateDate(props.isUpdatedAt)}
      </li>
      <li className="w-1/12 flex justify-center">
        <div
          className='w-8 h-8 relative cursor-pointer'
          onClick={handleUserVisitProfile}
        >
          <Image
            className='object-cover rounded-full'
            fill
            src={props.ownerImage || STATIC_URLS.NO_AVATAR}
            alt={props.ownerImage || STATIC_URLS.NO_AVATAR}
          />
        </div>
      </li>
      <li className="w-1/12 flex justify-center">
        {
          <DisableButton id={props.id} type={'pet'} isDeactivated={props.isDeleted} />
        }
      </li>
    </ul>
  );
};