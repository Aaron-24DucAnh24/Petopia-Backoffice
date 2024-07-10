import { useForm } from 'react-hook-form';
import Pagination from '../general/Pagination';
import { UpgradeRow } from './UpgradeRow';
import { IApiResponse, IGetUpgradeRequestResponseModel, IPaginationModel } from '@/interfaces';
import { useState } from 'react';
import { useQuery } from '@/utils/hooks';
import { PAGE_SIZE, QUERY_KEYS } from '@/utils/constants';
import { LoadingScreen } from '../general/LoadingScreen';
import { getRequests } from '@/services/api';
import { QueryProvider } from '../general/QueryProvider';

export const UpgradeManagementTable = QueryProvider(() => {
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 5,
    }
  });

  // STATES
  const [requests, setRequests] = useState<IGetUpgradeRequestResponseModel[]>();

  // QUERIES
  const getUpgradeRequestsQuery = useQuery<IApiResponse<IGetUpgradeRequestResponseModel[]>>(
    [QUERY_KEYS.GET_UPGRADE_REQUESTS, paginationForm.watch('pageIndex')],
    () => getRequests({
      pageIndex: paginationForm.watch('pageIndex'),
      pageSize: PAGE_SIZE,
    }),
    {
      onSuccess: res => {
        const pageNumber = res.data.pageNumber;
        setRequests(res.data.data);
        pageNumber && paginationForm.setValue('pageNumber', pageNumber);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div className="w-full text-sm border border-gray-300 p-4 rounded overflow-x-scroll flex-nowrap">
        <ul className="w-[1880px] flex items-center justify-start font-semibold mb-4">
          <li className="w-1/12">Profile</li>
          <li className="w-2/12 pr-3">Email</li>
          <li className="w-2/12">SĐT</li>
          <li className="w-2/12">Ngày tạo</li>
          <li className="w-4/12 pr-3">Địa chỉ</li>
          <li className="w-3/12 pr-3">Tên</li>
          <li className="w-3/12 pr-3">Pháp nhân</li>
          <li className="w-2/12 pr-3">Website</li>
          <li className="w-2/12">MST</li>
          <li className="w-2/12">Loại</li>
          <li className="w-4/12 pr-3">Mô tả</li>
          <li className="w-1/12 flex justify-center">Duyệt</li>
        </ul>
        {
          !getUpgradeRequestsQuery.isLoading && requests && requests.map(value =>
            <UpgradeRow key={value.id} {...value} query={getUpgradeRequestsQuery} />
          )
        }
      </div>

      <div className='w-full flex justify-center'>
        <Pagination
          paginationForm={paginationForm}
          show={true}
          disable={false}
        />
      </div>

      <LoadingScreen show={getUpgradeRequestsQuery.isLoading} />
    </>
  );
});