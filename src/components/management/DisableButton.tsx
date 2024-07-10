import { IActivateRequestModel, IApiResponse } from '@/interfaces';
import { activateUser } from '@/services/api';
import { useMutation } from '@/utils/hooks';
import { useState } from 'react';
import {
  FaEye as ShownIcon,
  FaEyeSlash as HiddenIcon
} from 'react-icons/fa6';
import { ClipLoader } from 'react-spinners';

interface IDisableButton {
  isDeactivated: boolean,
  id: string,
  type: 'user' | 'blog' | 'pet'
}

export const DisableButton = (props: IDisableButton) => {
  const { id, type } = props;
  const [isDeactivated, setIsDeactivated] = useState<boolean>(props.isDeactivated);

  const activateUserMutation = useMutation<IApiResponse<boolean>, IActivateRequestModel>(
    activateUser,
    {
      onSuccess: res => setIsDeactivated(res.data.data)
    }
  );

  return (
    <div className='cursor-pointer' onClick={() => {
      activateUserMutation.mutate({
        id: id,
        type: type,
      });
    }}>
      {
        !activateUserMutation.isLoading && isDeactivated && <HiddenIcon color='red' />
      }
      {
        !activateUserMutation.isLoading && !isDeactivated && <ShownIcon color='#92c5fd' />
      }
      {
        activateUserMutation.isLoading && <ClipLoader color={'#000000'} size={14} />
      }
    </div>
  );
};