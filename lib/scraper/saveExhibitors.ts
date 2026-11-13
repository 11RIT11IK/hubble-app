import { prisma } from "@/lib/prisma";
import type { ExhibitorRecord } from "./fetchExhibitors";

function toDate(value: string | null | undefined): Date | null {
  if (!value) return null;
  return new Date(value.endsWith("Z") ? value : value + "Z");
}

export async function saveExhibitors(records: ExhibitorRecord[]) {

	//TO AVOID DUPLICATE SHOWIDS
	const showIds = new Set<number>();
  
	 for (const r of records) {
    if (r.showId === null || r.show === null) continue;
    if (showIds.has(r.showId)) continue;

    const showData = {
      name: r.show.showName,
      startDate: toDate(r.show.startDate),
      endDate: toDate(r.show.endDate),
    };
    await prisma.show.upsert({
      where: { id: r.showId },
      update: showData,
      create: { id: r.showId, ...showData },
    });
    showIds.add(r.showId);
  }

 //COUNTRIES
	const countryIds = new Map<string, number>();
  for (const r of records) {
    const name = r.country?.trim();
    if (!name || countryIds.has(name)) continue;

    const country = await prisma.country.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    countryIds.set(name, country.id);
  }


	//HALLS
	 const hallIds = new Map<string, number>();
  for (const r of records) {
    const hallNo = r.exhibitorDetail?.hallNo?.trim();
    if (!hallNo || hallIds.has(hallNo)) continue;

    const hall = await prisma.hall.upsert({
      where: { hallNo },
      update: {},
      create: { hallNo },
    });
    hallIds.set(hallNo, hall.id);
  }

	//Exhibitors

	 for (const r of records) {
    const detail = r.exhibitorDetail;
    const country = r.country?.trim();
    const hallNo = detail?.hallNo?.trim();

    const data = {
      companyName: r.companyName.trim(),
      logoUrl: r.squareLogo,
      userId: r.userId,
      boothNo: detail?.boothNo ?? null,
      exhibitorType: detail?.exhibitorType ?? null,
      sponsorship: detail?.sponsorship ?? null,
      showId: r.showId !== null && showIds.has(r.showId) ? r.showId : null,
      countryId: country ? (countryIds.get(country) ?? null) : null,
      hallId: hallNo ? (hallIds.get(hallNo) ?? null) : null,
    };

    await prisma.exhibitor.upsert({
      where: { id: r.id },
      update: data,
      create: { id: r.id, ...data },
    });
  }

	  return {
    exhibitors: records.length,
    shows: showIds.size,
    countries: countryIds.size,
    halls: hallIds.size,
  };

}

