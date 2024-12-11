import ActorCard from "@/components/actorCard";
import Search from "@/components/search";

export default async function Home({ searchParams }: { searchParams: any }) {
  const { name } = await searchParams;
  const actors = await (
    await fetch(`http://localhost:5000/actors${name ? "?name=" + name : ""}`)
  ).json();

  return (
    <div className="w-full max-w-[1200px] m-auto flex flex-col items-center">
      <Search />
      <div className="flex flex-wrap w-full">
        {actors.datas.map((item: any) => (
          <ActorCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
