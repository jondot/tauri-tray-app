import { classed } from '@tw-classed/react'

export const SkeletonView = classed.div('animate-pulse rounded-md bg-muted')

function range(count: number) {
  return Array(count)
    .fill(1)
    .map((_, index) => index + 1)
}

export const SkeletonText = ({
  numLines = 1,
  isLoaded = false,
  children,
}: {
  numLines: number
  isLoaded?: boolean
  children: React.ReactNode
}) => {
  if (isLoaded) {
    return <>{children}</>
  }
  const numbers = range(numLines)
  return (
    <div className="space-y-2">
      {numbers.map((num, _idx) =>
        num === numLines && num > 1 ? (
          <SkeletonView key={num} className="h-4 w-[70%]" />
        ) : (
          <SkeletonView key={num} className="h-4 w-full" />
        )
      )}
    </div>
  )
}
