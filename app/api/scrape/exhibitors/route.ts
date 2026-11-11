import { fetchAllExhibitors } from "@/lib/scraper/fetchExhibitors";
import { saveExhibitors } from "@/lib/scraper/saveExhibitors";

export async function POST() {

	try {
   const exhibitors = await fetchAllExhibitors();
   const summary = await saveExhibitors(exhibitors);
   return Response.json({ message: "Scrape complete", summary: summary });

	} catch (error) {

		console.log("Scrape failed:", error);
    return Response.json({ error: "Scrape failed" }, { status: 500 });

	}




}