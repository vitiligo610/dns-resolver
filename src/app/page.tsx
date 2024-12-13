import DNSTable from "@/components/table/dns-table";
import Toolbar from "@/components/toolbar";

const Home = async ({
  searchParams
}: {
  searchParams?: {
    query?: string;
  }
}) => {
  const params = await searchParams;
  const query = params?.query || "";

  return (
    <div className="h-20 flex flex-col gap-8">
      <Toolbar />
      <DNSTable query={query} />
    </div>
  );
}

export default Home;