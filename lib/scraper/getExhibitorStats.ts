import { prisma } from "@/lib/prisma";

export async function getExhibitorStats() {

	const [exhibitorCount, shows] = await Promise.all([
		prisma.exhibitor.count(),
    prisma.show.findMany({ orderBy: { startDate: "asc" } }),
	])

	return { exhibitorCount, shows };

	
}

export async function getFooterExhibitors(limit = 12) {
  return prisma.exhibitor.findMany({
    take: limit,
    orderBy: { companyName: "asc" },
    select: {
      id: true,
      companyName: true,
      boothNo: true,
      country: { select: { name: true } },
    },
  });
}