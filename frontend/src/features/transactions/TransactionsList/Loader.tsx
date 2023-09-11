import { Skeleton } from "@/components/ui/skeleton"
const Loader = () => {
  return (
    <div className='w-[79%] mx-auto mb-10'>
        <Skeleton className="h-10 w-full mb-8" />
        <Skeleton className="h-10 w-full mb-8" />
        <Skeleton className="h-10 w-full mb-8" />
        <Skeleton className="h-10 w-full mb-8" />
    </div>
  )
}

export default Loader