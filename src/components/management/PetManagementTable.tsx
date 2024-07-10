import { PetRow } from './PetRow';
import { useForm } from 'react-hook-form';
import Pagination from '../general/Pagination';
import { IApiResponse, IGetPetsResponseModel, IPaginationModel } from '@/interfaces';
import { QueryProvider } from '../general/QueryProvider';
import { useQuery } from '@/utils/hooks';
import { PAGE_SIZE, QUERY_KEYS } from '@/utils/constants';
import { getPets } from '@/services/api';
import { useState } from 'react';
import { LoadingScreen } from '../general/LoadingScreen';

export const PetManagementTable = QueryProvider(() => {
  // FORMS
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 5,
    }
  });

  // STATES
  const [pets, setPets] = useState<IGetPetsResponseModel[]>();

  // QUERIES
  const getPetsQuery = useQuery<IApiResponse<IGetPetsResponseModel[]>>(
    [QUERY_KEYS.GET_PETS, paginationForm.watch('pageIndex')],
    () => getPets({
      pageIndex: paginationForm.watch('pageIndex'),
      pageSize: PAGE_SIZE,
    }),
    {
      onSuccess: res => {
        const pageNumber = res.data.pageNumber;
        setPets(res.data.data);
        pageNumber && paginationForm.setValue('pageNumber', pageNumber);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div className="w-full text-sm border border-gray-300 p-4 rounded overflow-x-scroll flex-nowrap">
        <ul className="w-[1280px] flex items-center justify-start font-semibold mb-4">
          <li className="w-1/12">Profile</li>
          <li className="w-2/12">Tên</li>
          <li className="w-1/12">Loài</li>
          <li className="w-2/12">Giống</li>
          <li className="w-1/12 flex justify-center">Sẵn sàng</li>
          <li className="w-1/12">Lượt xem</li>
          <li className="w-1/12">Ngày tạo</li>
          <li className="w-1/12">Ngày cập nhật</li>
          <li className="w-1/12 flex justify-center">Chủ sở hữu</li>
          <li className="w-1/12 flex justify-center">Vô hiệu hoá</li>
        </ul>
        {
          !getPetsQuery.isLoading && pets && pets.map(pet =>
            <PetRow key={pet.id} {...pet} />
          )
        }
      </div>

      <div className='w-full flex justify-center'>
        <Pagination
          paginationForm={paginationForm}
          show={true}
          disable={getPetsQuery.isLoading}
        />
      </div>

      <LoadingScreen show={getPetsQuery.isLoading} />
    </>
  );
});