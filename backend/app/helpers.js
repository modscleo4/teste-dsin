function daysDiff(date1, date2) {
    const date1_notime = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2_notime = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const FULL_DAY = 1000 * 60 * 60 * 24;
    const days = (date2_notime.getTime() - date1_notime.getTime()) / FULL_DAY;

    return Math.floor(days);
}

exports.daysDiff = daysDiff
