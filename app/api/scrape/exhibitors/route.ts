import { fetchAllExhibitors } from "@/lib/scraper/fetchExhibitors";

export async function POST() {
const exhibitors = await fetchAllExhibitors();

return Response.json({
count: exhibitors.length,
sample: exhibitors.slice(0, 2),
 });

}