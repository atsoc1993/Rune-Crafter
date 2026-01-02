import { useState, type JSX } from "react";

type Props = {
  tabs: { name: string, forward: JSX.Element | undefined }[]
}

export default function Frame({ tabs }: Props) {
  const [tabSelected, setTabSelected] = useState<string>(tabs[0].name)
  const tabContentElement = tabs.filter(tab => tab.name === tabSelected)[0].forward

  return (
    <div className='h-full w-full bg-teal-900 p-6'>
      <div className='h-full w-full bg-teal-800 shadow-2xl shadow-teal-800 p-6 rounded-2xl'>
        <div className='h-full w-full bg-teal-700 shadow-2xl shadow-teal-700 p-6 rounded-2xl'>
          <div className='h-full w-full bg-teal-600 shadow-2xl shadow-teal-600 p-6 rounded-2xl'>
              <div className='h-1/6 w-full flex justify-evenly bg-teal-400 rounded-2xl'>
                {tabs.map(tab => (
                  <div key={tab.name}
                    onClick={() => setTabSelected(tab.name)}
                    className={'h-full w-2/6 text-center content-center rounded-2xl'
                      + (tabSelected === tab.name ? ' bg-red-200 text-white' : '')}>{tab.name}
                  </div>
                ))}
              </div>
              {tabContentElement}
            </div>
        </div>
      </div>
    </div>
  );
};