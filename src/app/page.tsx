import ActorCard from "@/components/actorCard";
import Search from "@/components/search";
import GenderSelection from "@/components/genderSelection";

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
      <div className="w-[60%] h-[50px] flex flex-row">
        <Search />
        <GenderSelection />
      </div>
      <div className="flex flex-wrap w-full">
        {actors.datas.map((item: any) => (
          <ActorCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
