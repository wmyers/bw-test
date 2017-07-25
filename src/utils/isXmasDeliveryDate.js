const isXmasDeliveryDate = (date, today) => {
  const dateToCheck = new Date(date);
  if (dateToCheck >= today) {
    const yearToCheck = dateToCheck.getFullYear();
    const dayToCheck = dateToCheck.setHours(0,0,0,0);
    const startXmasCharging = new Date(yearToCheck, 11, 23).setHours(0,0,0,0);
    const endXmasCharging = new Date(yearToCheck, 0, 3).setHours(23,59,59,999);
    if (dayToCheck >= startXmasCharging || dayToCheck <= endXmasCharging) {
      return true;
    }
  }
  return false;
}

export default isXmasDeliveryDate;