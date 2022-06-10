export const getBrandName = (brands, brandId) => {
  const brandName = brands.filter(brand => brand.id === brandId);
  return brandName;
}