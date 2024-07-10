import { useForm } from 'react-hook-form';
import Pagination from '../general/Pagination';
import { UserRow } from './UserRow';
import QueryButton from '../general/QueryButton';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import { CreateAdminForm } from './CreateAdminForm';
import { IApiResponse, IGetUsersResponseModel, IPaginationModel, IPaginationRequest } from '@/interfaces';
import { PAGE_SIZE, QUERY_KEYS, USER_ROLE } from '@/utils/constants';
import { useMutation, useQuery } from '@/utils/hooks';
import { createAdmin, getUsers } from '@/services/api';
import { QueryProvider } from '../general/QueryProvider';
import { LoadingScreen } from '../general/LoadingScreen';
import { Alert } from '../general/Alert';

interface IUserManagementTable {
  type: USER_ROLE
}

export const UserManagementTable = QueryProvider(({ type }: IUserManagementTable) => {
  // FORMS
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 5,
    }
  });

  const getUsersRequestForm = useForm<IPaginationRequest<{ role: USER_ROLE }>>({
    defaultValues: {
      pageIndex: 1,
      pageSize: PAGE_SIZE,
      orderBy: '',
      filter: { role: type }
    }
  });

  // STATES
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [users, setUsers] = useState<IGetUsersResponseModel[]>();
  const [alertShow, setAlertShow] = useState<boolean>(false);

  // QUERIES
  const getUsersQuery = useQuery<IApiResponse<IGetUsersResponseModel[]>>(
    [QUERY_KEYS.GET_DASHBOARD, paginationForm.watch('pageIndex')],
    () => getUsers(getUsersRequestForm.getValues()),
    {
      onSuccess: res => {
        setUsers(res.data.data);
        res.data.pageNumber && paginationForm.setValue('pageNumber', res.data.pageNumber);
      },
      refetchOnWindowFocus: false,
    }
  );

  const createAdminMutation = useMutation<IApiResponse<boolean>, string>(
    createAdmin, {
    onSuccess: () => {
      setShowPopup(false);
      setAlertShow(true);
    }
  }
  );

  return (
    <>
      <div className="w-full text-sm border border-gray-300 p-4 rounded">
        <ul className="w-full flex items-center justify-start font-semibold mb-4">
          <li className="w-1/12">
            <div className='overflow-x-scroll no-scrollbar text-nowrap'>Profile</div>
          </li>
          <li className="w-2/12 pr-3">
            <div className='overflow-x-scroll no-scrollbar text-nowrap'>Tên</div>
          </li>
          <li className="w-2/12 pr-3">
            <div className='overflow-x-scroll no-scrollbar text-nowrap'>Email</div>
          </li>
          <li className="w-2/12 pr-3">
            <div className='overflow-x-scroll no-scrollbar text-nowrap'>
              {type === USER_ROLE.ORGANIZATION ? 'Loại tổ chức' : 'SĐT'}
            </div>
          </li>
          <li className="w-4/12 pr-3">
            <div className='overflow-x-scroll no-scrollbar text-nowrap'>Địa chỉ</div>
          </li>
          <li className="w-1/12 pr-3">
            <div className='overflow-x-scroll no-scrollbar text-nowrap'>Ngày tạo</div>
          </li>
          {
            type !== USER_ROLE.SYSTEM_ADMIN && <li className="w-1/12 flex justify-center">
              <div className='overflow-x-scroll no-scrollbar text-nowrap'>Vô hiệu hoá</div>
            </li>
          }
          {
            type === USER_ROLE.SYSTEM_ADMIN &&
            <li className="w-1/12">
              <QueryButton name={'+Thêm'} action={() => setShowPopup(true)} />
            </li>
          }
        </ul>
        {
          !getUsersQuery.isLoading && users && users.map(user =>
            <UserRow key={user.id} data={{ ...user }} type={type} />
          )
        }
      </div>

      <div className='w-full flex justify-center'>
        <Pagination
          paginationForm={paginationForm}
          show={!!users}
          disable={getUsersQuery.isLoading}
        />
      </div>

      <Popup
        modal
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
        open={showPopup}
        onClose={() => setShowPopup(false)}
      >
        <CreateAdminForm onSubmit={(email: string) => createAdminMutation.mutate(email)} />
      </Popup>

      <Alert
        message={'Thêm admin thành công'}
        show={alertShow}
        setShow={setAlertShow}
      />

      <LoadingScreen show={getUsersQuery.isLoading} />
    </>
  );
});