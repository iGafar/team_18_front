
export default function getUpdatedNewsAndTags(dbData, currentUser) {
    let allowedSites = []
    let allowedSitesObjIdActive = {}
    let allowedTags = []
    const userFilters = currentUser.filterSettings
    const adminSitesMap = dbData.sites.reduce((map, site) => ({...map, [site.id]: site }), {});

    // если есть настройки фильтра в сторе(и LS), проверяем что изменилось в админке
    if (Object.keys(userFilters).length) {
        const userSitesMap = userFilters.sites.reduce((map, site) => ({...map, [site.id]: site }), {});
        const adminTagsMap = dbData.tags.reduce((map, tag) => ({...map, [tag.id]: tag}), {});
        const userTagsMap = userFilters.tags.reduce((map, tag) => ({...map, [tag.id]: tag}), {});

        for (let siteId in adminSitesMap) {
            if (adminSitesMap[siteId].is_active) {
                allowedSites.push(userSitesMap[siteId] ? userSitesMap[siteId] : adminSitesMap[siteId])
            }
        }
        for (let tagId in adminTagsMap) {
            if (adminTagsMap[tagId].is_active) {
                allowedTags.push(userTagsMap[tagId] ? userTagsMap[tagId] : adminTagsMap[tagId])
            }
        }
    } else {
        // если нет, берем данные из админки
        allowedSites = dbData.sites.filter(site => site.is_active);
        allowedTags = dbData.tags.filter(tag => tag.is_active);
    }
    allowedSitesObjIdActive = allowedSites.reduce((obj, site) => ({...obj, [site.id]:site.is_active}), {})

    return { allowedSites, allowedTags, allowedSitesObjIdActive }
}