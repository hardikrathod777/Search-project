export const Catagories = () => {

    let data = initialUsers;

    let Citys = [];

    data.forEach(d => {
        Citys = [...Citys, d.city];
    });

    let UniqueCity = new Set(Citys);


    return Array.from(UniqueCity);

}