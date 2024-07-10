import { ClipLoader } from 'react-spinners';

export const LoadingScreen = ({ show }: { show: boolean }) => {
  return show
    ? <div className='flex justify-center items-center absolute left-0 right-0 top-0 bottom-0'>
      <ClipLoader
        color={'#000000'}
        size={40}
      />
    </div>
    : <></>;
};