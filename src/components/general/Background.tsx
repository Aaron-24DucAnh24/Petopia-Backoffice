import { STATIC_URLS } from '../../utils/constants';
import Image from 'next/image';

export const Background = () => {
  return (
    <div className="fix flex top-0 left-0 right-0 bottom-0">
      <div className="bg-white h-screen w-1/2">
        <div className="h-screen relative">
          <Image
            className="object-cover"
            alt="bg1"
            src={STATIC_URLS.BG2}
            fill={true}
          ></Image>
        </div>
      </div>
      <div className="bg-yellow-300 h-screen w-1/2">
        <div className="h-screen relative">
          <Image
            className="object-cover"
            alt="bg2"
            src={STATIC_URLS.BG1}
            fill={true}
          ></Image>
        </div>
      </div>
    </div>
  );
};