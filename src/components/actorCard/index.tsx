import Image from "next/image";

export default function Page({ data }: { data: any }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 p-1">
      <div className="flex bg-slate-300">
        <img
          src={data.actorPhoto}
          className="w-[200px] h-[200px] p-3 object-cover object-center"
        />
        <div className="py-5">
          <span className="font-bold text-[18px]">{data.isim}</span>
          <ul className="list-disc list-inside">
            {
              data.filmler.map((item: any)=> (
                <li key={item.id}>{item.name}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}
