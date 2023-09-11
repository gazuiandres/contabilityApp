import { Skeleton } from "@/components/ui/skeleton";
const Loader = () => {
  return (
    <div className="w-[79%] h-52 mx-auto mb-10">
      <Skeleton className=" h-12 w-[50%] mx-auto mb-10" />
      <Skeleton className=" h-full w-full" />
    </div>
  );
};

export default Loader;
