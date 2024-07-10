import { Gauge } from '@mui/x-charts';

interface IParameterCard {
  value: number;
  label: string;
  desc?: string;
  unit?: string;
  special?: boolean;
}

export const ParameterCard = (props: IParameterCard) => {
  const { value, label, desc = '', unit = '', special = false } = props;

  return (
    <div className="w-1/3 flex items-start mb-6 flex-col space-y-1">
      <div className="uppercase font-semibold text-xs">
        {label}
      </div>
      <div className="flex justify-center items-center font-bold">
        {
          special ?
            <Gauge
              width={100}
              height={100}
              value={value}
              text={() => `${value} ${unit}`}
            />
            :
            <>
              <div className="underline text-lg mr-1">
                {unit}
              </div>
              <div className="text-xl">
                {value.toLocaleString()}
              </div>
            </>
        }
      </div>
      <div className="text-sm text-gray-500">
        {desc}
      </div>
    </div>
  );
};  