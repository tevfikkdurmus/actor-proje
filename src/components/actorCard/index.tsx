import Image from "next/image";

export default function Page({ data }: { data: any }) {
  return (
    <div className="w-full lg:w-1/3 md:w-1/2 p-1">
      <div className="flex bg-slate-300">
        <img
          src={data.actorPhoto}
          className="w-[200px] h-[200px] p-3 object-cover object-center"
        />
        <div className="py-5">
          <span className="font-bold text-[18px]">{data.isim}</span>
        </div>
      </div>
    </div>
  );
}
