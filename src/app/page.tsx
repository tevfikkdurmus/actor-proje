import ActorCard from "@/components/actorCard";
import Search from "@/components/search";

export default async function Home({ searchParams }: { searchParams: any }) {
  const { name, gender } = await searchParams;
  const queryParams = new URLSearchParams();
  if (name) queryParams.append("name", name);
  if (gender) queryParams.append("gender", gender);

  const actors = await (
    await fetch(`http://localhost:5000/actors?${queryParams.toString()}`)
  ).json();

  return (
    <div className="w-full max-w-[1200px] m-auto flex flex-col items-center">
      <div className="w-[90%] lg:w-[90%] sm:h-[50px] h-auto flex flex-col sm:flex-row md:mt-0 mt-5">
        <Search />
      </div>
      <div className="flex flex-wrap w-full md:mt-0 mt-5">
        {actors.datas.map((item: any) => (
          <ActorCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
