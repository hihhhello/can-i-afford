'use client';

import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { classNames, formatUSDCompact } from 'hihhhello-utils';
import { twMerge } from 'tailwind-merge';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);

  const [purchaseName, setPurchaseName] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [purchaseType, setPurchaseType] = useState<'cash' | 'credit'>();
  const [canAfford, setCanAfford] = useState<boolean>();

  return (
    <div className="flex items-center justify-center flex-1">
      <div>
        {canAfford === undefined && currentStep === 1 && (
          <form
            className="flex gap-2 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentStep(2);
            }}
          >
            <h1 className="flex-1 whitespace-nowrap text-5xl">Can I Afford</h1>

            <input
              className="text-5xl text-center border-b-2 border-b-black outline-none"
              value={purchaseName}
              onChange={(e) => setPurchaseName(e.target.value)}
            />

            <button
              type="submit"
              className={twMerge(
                'h-11 w-11 invisible',
                purchaseName && 'visible',
              )}
            >
              <ArrowRightIcon />
            </button>
          </form>
        )}

        {canAfford === undefined && currentStep === 2 && (
          <form
            className="flex gap-2 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentStep(3);
            }}
          >
            <h1 className="flex-1 whitespace-nowrap text-5xl">
              The price is $
            </h1>

            <input
              className="text-5xl text-center border-b-2 border-b-black outline-none"
              value={purchasePrice}
              onChange={(e) => {
                const decimalRegex = /^\d*\.?\d*$/;

                if (!decimalRegex.test(e.target.value)) {
                  return;
                }

                setPurchasePrice(e.target.value);
              }}
            />

            <button
              type="submit"
              className={twMerge(
                'h-11 w-11 invisible',
                purchasePrice && 'visible',
              )}
            >
              <ArrowRightIcon />
            </button>
          </form>
        )}

        {canAfford === undefined && currentStep === 3 && (
          <form
            className="flex gap-8 items-center"
            onSubmit={(e) => {
              e.preventDefault();

              if (purchaseType === 'credit') {
                setCanAfford(false);
                return;
              }

              setCurrentStep(3);
            }}
          >
            <h1 className="flex-1 whitespace-nowrap text-5xl">
              I can pay with
            </h1>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setPurchaseType('cash')}
                className={twMerge(
                  'px-4 py-2 text-3xl font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700',
                  purchaseType === 'cash' &&
                    'bg-blue-700 text-white focus:text-white hover:bg-blue-700 hover:text-white',
                )}
              >
                Cash
              </button>
              <button
                type="button"
                onClick={() => setPurchaseType('credit')}
                className={twMerge(
                  'px-4 py-2 text-3xl font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700',
                  purchaseType === 'credit' &&
                    'bg-blue-700 text-white focus:text-white hover:bg-blue-700 hover:text-white',
                )}
              >
                Credit
              </button>
            </div>

            <button
              type="submit"
              className={twMerge(
                'h-11 w-11 invisible',
                purchaseType && 'visible',
              )}
            >
              <ArrowRightIcon />
            </button>
          </form>
        )}

        {canAfford !== undefined && !canAfford && (
          <div>
            <h1 className="text-5xl mb-10">
              Sorry, you can&apos;t afford{' '}
              <span className="font-bold">
                {formatUSDCompact(Number(purchasePrice))} {purchaseName}
              </span>{' '}
              right now.
            </h1>

            <div className="flex gap-4">
              <button
                className="text-3xl
              text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setCanAfford(undefined);
                  setCurrentStep(1);
                  setPurchaseName('');
                  setPurchasePrice('');
                  setPurchaseType(undefined);
                }}
              >
                Retry
              </button>

              <button
                className="text-3xl
              text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  setCanAfford(undefined);
                  setCurrentStep(3);
                }}
              >
                Go One Step back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
