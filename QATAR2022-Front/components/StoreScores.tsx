import * as React from 'react'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import contractAbi from "../contractAbi.json";
import addressesData from "../addresses.json";

export function StoreScores() {
 
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    addressOrName: addressesData.contractAddress,
    contractInterface: contractAbi,
    functionName: "storeScores",
    // empty array is all users
    args: [[]],
    enabled: true,
  })

  const { data, error, isError, write } = useContractWrite(config)
 
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
 
  return (
    <div onClick={write} className='text-qatarRed bg-qatarSilver rounded-lg p-3 w-60 text-center text-lg hover:bg-qatarRed hover:text-qatarSilver cursor-pointer'>
      <strong>
        {isLoading ? 'Storing scores...' : 'Store scores'}
        {isSuccess && (
        <div>
          Successfully stored!
        </div>
      )}
      </strong>
      {/*
      isPrepareError shows up when an error is found in the preparation of the transaction.
      isError shows up when clicking
        */}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message?.match(/reverted with custom error \'.*?\'/)}</div>
      )}
    </div>
  )
}