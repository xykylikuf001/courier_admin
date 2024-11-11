'use client';

import {useEffect} from 'react';
import PageLayout from '@/components/PageLayout';

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({error, reset}: Props) {
//   const t = useTranslations('Error');

  useEffect(() => {
    console.error(error);

  }, [error]);

  return (
    <PageLayout title={"Title"}>
      <div>
            <button
              className="text-white underline underline-offset-2"
              onClick={reset}
              type="button"
            >
              Reset
            </button>
      </div>
    </PageLayout>
  );
}