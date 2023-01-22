import * as React from 'react'
import { useRouter } from 'next/router'
import { useAnimeDetail } from '@app/services/main/hooks'

import Image from 'next/image'
import { PageLoader } from '@components/page-loader'
import { HiOutlinePrinter } from 'react-icons/hi'

const Info = (props: { title: string; value: string | number }) => (
  <p className="text-gray-500">
    <strong>{props.title}:</strong> {props.value}
  </p>
)

const Genre = (props: { value: string }) => (
  <div className="mt-3 lg:mt-0 px-4 mr-3 py-2 shadow-lg rounded-lg flex items-center justify-center bg-gray-700">
    <p className="text-white font-bold">{props.value}</p>
  </div>
)

export const AnimeDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const animeId = id as string

  const { data, isLoading } = useAnimeDetail(animeId)
  const animeData = data?.data
  const image = data?.data.images.webp?.large_image_url || data?.data.images.jpg.large_image_url
  const title = data?.data.title

  return isLoading ? (
    <PageLoader />
  ) : (
    <>
      <div className="flex flex-col lg:flex-row justift-center items-center py-12">
        <div>
          {image && <Image className="rounded-lg" src={image} height={350} width={250} alt={`${title}-img`} />}
          <div className="py-4 mt-4 px-2 rounded-lg bg-yellow-500 flex items-center justify-center">
            <HiOutlinePrinter className="text-white text-2xl" />
            <p className="lg:ml-4 font-extrabold text-xl text-white">Print</p>
          </div>
        </div>
        <div className="lg:ml-8 mt-8 lg:mt-0 p-8 shadow-lg rounded-lg w-full">
          <p className="text-xl font-bold">{title}</p>
          <div className="pt-4">
            <Info title="Score" value={animeData?.score || '-'} />
            <Info title="Episodes" value={animeData?.episodes || '-'} />
            <Info title="Status" value={animeData?.status || '-'} />
            <Info title="Source" value={animeData?.source || '-'} />
            <p className="font-bold text-gray-500">{animeData?.rating}</p>
            <div className="flex mt-6 flex-wrap">
              {animeData?.genres.map((item, index) => (
                <Genre key={index} value={item.name} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 shadow-lg rounded-lg w-full">
        <p className="font-bold text-lg lg:text-2xl text-gray-600">Synopsis:</p>
        <p className="text-gray-500 pt-8 text-sm lg:text-base text-justify">{animeData?.synopsis || '-'}</p>
      </div>
    </>
  )
}

export default AnimeDetail
