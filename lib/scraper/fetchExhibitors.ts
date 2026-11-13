const API_URL = "https://mmiconnect.in/graphql";
const PAGE_SIZE = 100;

//whole company only details type we receive as a response
export type ExhibitorRecord = { 
	id: number;
  companyName: string;
  country: string | null;
  squareLogo: string | null;
  userId: string | null;
  showId: number | null;
  exhibitorDetail: {
  boothNo: string | null;
  hallNo: string | null;
  exhibitorType: string | null;
  sponsorship: string | null;
  } | null;
  show: {
    showName: string;
    startDate: string | null;
    endDate: string | null;
  } | null;
}


//through this we are telling what we want to  MMI website by calling their api.
const QUERY = `query getExhibitorListForGroup($where: [WhereExpression!], $first: Int, $after: Int, $group: String) {
  catalogueQueries {
    exhibitorsWithWishListGroup(first: $first, where: $where, after: $after, group: $group) {
      totalCount
      exhibitors {
        customer {
          id
          companyName
          country
          squareLogo
          userId
          showId
          exhibitorDetail { exhibitorType sponsorship boothNo hallNo }
          show { showName startDate endDate }
        }
      }
    }
  }
}`;

//whole response format we receive from our request..
type PageResponse = {
  data: {
    catalogueQueries: {
      exhibitorsWithWishListGroup: {
        totalCount: number;
        exhibitors: { customer: ExhibitorRecord }[];
      };
    };
  };
};

async function fetchPage(after: number) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      operationName: "getExhibitorListForGroup",
      query: QUERY,
      variables: { where: [], group: "ep-blr-2026", first: PAGE_SIZE, after },
    }),
  });
  if (!res.ok) throw new Error(`API returned HTTP ${res.status}`);
  const json = (await res.json()) as PageResponse;
  return json.data.catalogueQueries.exhibitorsWithWishListGroup;
}

export async function fetchAllExhibitors(): Promise<ExhibitorRecord[]> {
  const all: ExhibitorRecord[] = [];
  let after = -1;
  let total = 1;

  while (after < total) {
    const page = await fetchPage(after);
    total = page.totalCount;

    if (page.exhibitors.length === 0) break;

    for (const item of page.exhibitors) {
      all.push(item.customer);
    }

    after = after + PAGE_SIZE;
  }

  return all;
}



