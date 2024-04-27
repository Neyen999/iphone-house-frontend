

export function mapSalesToActivities(sales: any): Activity[] {
  return sales.map((sale: any) => ({
    productOrItem: sale.product,
    date: sale.date
  }));
}

export function mapRepairsToActivities(repairs: any): Activity[] {
  return repairs.map((repair: any) => ({
    productOrItem: repair.item,
    date: repair.date
  }));
}
