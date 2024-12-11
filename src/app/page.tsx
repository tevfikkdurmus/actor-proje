import ActorCard from "@/components/actorCard";
import Search from "@/components/search";
import Pagination from "@/components/pagination";

export default async function Home({ searchParams }: { searchParams: any }) {
  const { name, gender, page } = await searchParams;
  const queryParams = new URLSearchParams();
  if (name) queryParams.append("name", name);
  if (gender) queryParams.append("gender", gender);
  if (page) queryParams.append("page", page);

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
      <Pagination
        activePagee={page ? page : 1}
        pageCount={Math.ceil(actors.totalCount / actors.pageSize) == 1 ? 0 : Math.ceil(actors.totalCount / actors.pageSize)}
      />
    </div>
  );
}
